import { NextFunction, Request, Response } from "express"
import { comparePassword, hashPassword } from "../../helpers/bcrypt"
import MsUserModel from "./model"
import { CustomError } from "../../helpers/error"
import UserOtpModel, { IUserOtp } from "../user_otp/model"
import { customAlphabet } from "nanoid"
import { sendEmail } from "../../helpers/nodemailer"
import { render } from "@react-email/components"
import { sq } from "../../config/connection"
import EmailOtp from "../../template/emailOtp"
import { IJwtPayload, signJwt, verifyJwt } from "../../helpers/jsonwebtoken"
import { tipe } from "../../helpers/tipe"

export class Controller {
  static async register(req: Request, res: Response, next: NextFunction) {
    const t = await sq.transaction()
    try {
      const { username, email, password } = req.body
      if (!username || !email || !password) {
        throw new CustomError(400, "payload is not valid")
      }

      // hash password dan create data untuk user
      const hashed_password = await hashPassword(password)
      const { id } = (await MsUserModel.create({ username, email, password: hashed_password }, { transaction: t })).dataValues

      // create otp untuk user
      const otp = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", 8)()
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
      const html = await render(EmailOtp({ otp }))
      await sendEmail({
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: "Your Otp Password For the registration, keep it secret",
        html,
      })
      t.commit()

      const payload: IJwtPayload = {
        id,
        email,
      }
      const token = signJwt(payload)

      res.status(200).send({ status: 200, message: "otp code has been sent to your email", token })
    } catch (err) {
      t.rollback()
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

      const is_verified = comparePassword(password, user.dataValues.password!)
      if (!is_verified) {
        throw new CustomError(400, "your credential is not valid")
      }

      if (user.dataValues.is_verified == 0) {
        throw new CustomError(400, "your email has not been verified yet")
      }

      const payload: IJwtPayload = {
        username: user.dataValues.username,
        email: user.dataValues.email,
      }
      const token = signJwt(payload)

      res
        .status(200)
        .cookie("token", token, { httpOnly: true, sameSite: true, maxAge: 1000 * 3600 * 24 })
        .send({ status: 200, message: "success" })
    } catch (err) {
      next(err)
    }
  }
  static async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { otp, otp_type, token } = req.body
      const { id: ms_user_id } = verifyJwt(token)

      const actual_otp = (await sq.query(
        `select *
        from user_otp uo
        where uo.ms_user_id = :ms_user_id
          and uo.otp = :otp
          and uo.otp_type = :otp_type
          and uo.expired_at < now()
          and uo.used_at isnull`,
        tipe({ ms_user_id, otp, otp_type })
      )) as IUserOtp[]

      if (!actual_otp) {
        throw new CustomError(400, "otp is not valid")
      }

      await UserOtpModel.update({ used_at: new Date() }, { where: { id: actual_otp[0].id } })
      res.status(200).send({ status: 200, message: "success" })
    } catch (err) {
      next(err)
    }
  }
  static async sendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { otp_type, token } = req.body
      const { id: ms_user_id, email } = verifyJwt(token)
      await UserOtpModel.update({ used_at: new Date() }, { where: { ms_user_id, otp_type } })

      // create otp untuk user
      const otp = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", 8)()
      await UserOtpModel.create({
        ms_user_id,
        otp,
        otp_type: "email",
        expired_at: new Date(Date.now() + 5 * 60 * 1000),
      })

      // kirim otp melalui email yang didaftarkan
      const html = await render(EmailOtp({ otp }))
      await sendEmail({
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: "Your Otp Password For the registration, keep it secret",
        html,
      })
      res.status(200).send({ status: 200, message: "otp code has been sent to your email" })
    } catch (err) {
      next(err)
    }
  }
}
