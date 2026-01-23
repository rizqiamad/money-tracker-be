import { NextFunction, Request, Response } from "express"
import { comparePassword, hashPassword } from "../../helpers/bcrypt"
import MsUserModel from "./model"
import { CustomError } from "../../helpers/error"
import UserOtpModel, { IUserOtp } from "../user_otp/model"
import { customAlphabet } from "nanoid"
import { sendEmail } from "../../helpers/nodemailer"
import { render } from "@react-email/components"
import { sq } from "../../config/connection"
import EmailOtp from "../../template/email_otp"
import EmailForgetPassword from "../../template/email_forgot_password"
import { IJwtPayload, signJwt, verifyJwt } from "../../helpers/jsonwebtoken"
import { tipe } from "../../helpers/tipe"
import { JsonWebTokenError } from "jsonwebtoken"

export class Controller {
  static async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { old_password, new_password } = req.body
      const { email } = req.user as IJwtPayload

      const user = await MsUserModel.findOne({ where: { email } })
      if (!user) {
        throw new CustomError(400, "email not found")
      }

      const is_match = await comparePassword(old_password, user?.dataValues.password as string)
      if (!is_match) {
        throw new CustomError(400, "your previous password is wrong")
      }

      const hashed_password = await hashPassword(new_password)
      await MsUserModel.update({ password: hashed_password }, { where: { email } })

      res.status(200).send({ status: 200, message: "success" })
    } catch (err) {
      next(err)
    }
  }
  static async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body

      const user = await MsUserModel.findOne({ where: { email } })
      if (!user) {
        throw new CustomError(400, "email not found")
      }

      const payload: IJwtPayload = { id: user.dataValues.id, email }
      const token = signJwt(payload)

      const link = `${process.env.FRONTEND_URL}/reset_password/${token}`
      // kirim link forget password melalui email yang didaftarkan
      const html = await render(EmailForgetPassword({ link, url: process.env.FRONTEND_URL }))
      await sendEmail({
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: "Forgot Password",
        html,
      })
      res.status(200).send({ status: 200, message: "please kindly check your email" })
    } catch (err) {
      next(err)
    }
  }
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const user = await MsUserModel.findOne({ where: { email } })
      if (!user) {
        throw new CustomError(400, "your credential is not valid")
      }

      const is_verified = await comparePassword(password, user.dataValues.password!)
      if (!is_verified) {
        throw new CustomError(400, "your credential is not valid")
      }

      if (user.dataValues.is_verified == 0) {
        throw new CustomError(400, "your email has not been verified yet")
      }

      const payload: IJwtPayload = { id: user.dataValues.id, username: user.dataValues.username, email: user.dataValues.email }
      const token = signJwt(payload)

      res
        .status(200)
        .cookie("token", token, { httpOnly: true, sameSite: true, maxAge: 1000 * 3600 * 24 })
        .send({ status: 200, message: "success" })
    } catch (err) {
      next(err)
    }
  }
  static async logout(_req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).clearCookie("token").send({ status: 200, message: "success" })
    } catch (err) {
      next(err)
    }
  }
  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { new_password, token } = req.body
      const { id: ms_user_id } = verifyJwt(token)

      const hashed_password = await hashPassword(new_password)
      await MsUserModel.update({ password: hashed_password }, { where: { id: ms_user_id } })

      res.status(200).send({ status: 200, message: "success" })
    } catch (err) {
      next(err)
    }
  }
  static async register(req: Request, res: Response, next: NextFunction) {
    const t = await sq.transaction()
    try {
      const { username, email, password } = req.body
      if (!username || !email || !password) {
        throw new CustomError(400, "payload is not valid")
      }

      const user = await MsUserModel.findOne({ where: { email } })
      if (user) {
        throw new CustomError(400, "your email has been registered")
      }

      // hash password dan create data untuk user
      const hashed_password = await hashPassword(password)
      const { id } = (await MsUserModel.create({ username, email, password: hashed_password }, { transaction: t })).dataValues

      // create otp untuk user
      const otp = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", 6)()
      await UserOtpModel.create(
        {
          ms_user_id: id,
          otp,
          otp_type: "email",
          expired_at: new Date(Date.now() + 5 * 60 * 1000),
        },
        { transaction: t }
      )

      // kirim otp melalui email yang didaftarkan
      const html = await render(EmailOtp({ otp, url: process.env.FRONTEND_URL }))
      await sendEmail({
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: "Your Otp Password For the registration, keep it secret",
        html,
      })

      const payload: IJwtPayload = { id, email }
      const token = signJwt(payload)

      t.commit()
      res.status(200).send({ status: 200, message: "otp code has been sent to your email", token })
      // res.status(200).send({ status: 200, message: "otp code has been sent to your email" })
    } catch (err) {
      t.rollback()
      next(err)
    }
  }
  static async resendOtp(req: Request, res: Response, next: NextFunction) {
    const t = await sq.transaction()
    try {
      const { otp_type, token } = req.body
      const { id: ms_user_id, email } = verifyJwt(token)
      await UserOtpModel.update({ used_at: new Date() }, { where: { ms_user_id, otp_type }, transaction: t })

      // create otp untuk user
      const otp = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", 8)()
      await UserOtpModel.create(
        {
          ms_user_id,
          otp,
          otp_type: "email",
          expired_at: new Date(Date.now() + 5 * 60 * 1000),
        },
        { transaction: t }
      )

      // kirim otp melalui email yang didaftarkan
      const html = await render(EmailOtp({ otp }))
      await sendEmail({
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: "Resend otp, keep it secret",
        html,
      })
      await t.commit()
      res.status(200).send({ status: 200, message: "otp code has been sent to your email" })
    } catch (err) {
      await t.rollback()
      next(err)
    }
  }
  static async verifyCookie(req: Request, res: Response, _next: NextFunction) {
    res.status(200).send({ status: 200, message: "success", data: req.user })
  }
  static async verifyOtp(req: Request, res: Response, next: NextFunction) {
    const t = await sq.transaction()
    try {
      const { otp, otp_type, token } = req.body
      const { id: ms_user_id } = verifyJwt(token)

      const actual_otp = (await sq.query(
        `select *
        from user_otp uo
        where uo.ms_user_id = :ms_user_id
          and uo.otp = :otp
          and uo.otp_type = :otp_type
          and uo.expired_at > now()
          and uo.used_at isnull`,
        tipe({ ms_user_id, otp, otp_type })
      )) as IUserOtp[]

      if (!actual_otp.length) {
        throw new CustomError(400, "otp is not valid")
      }

      await UserOtpModel.update({ used_at: new Date() }, { where: { id: actual_otp[0].id }, transaction: t })
      await MsUserModel.update({ is_verified: 1 }, { where: { id: ms_user_id }, transaction: t })
      await t.commit()
      res.status(200).send({ status: 200, message: "success" })
    } catch (err) {
      await t.rollback()
      next(err)
    }
  }
  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.body
      if (!token) {
        throw new CustomError(401, "credential is required")
      }
      verifyJwt(token)
      res.status(200).send({ status: 200, message: "success" })
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        next(new CustomError(401, "unauthorized"))
      } else {
        next(err)
      }
    }
  }
}
