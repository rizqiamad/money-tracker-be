import { NextFunction, Request, Response } from "express";
import { HttpException } from "../errors/httpException";
import { sq } from "../database/db";
import { QueryTypes } from "sequelize";
import UserModel from "../database/models/user.model";
import { LoginType, RegisterType } from "../validators/auth.validator";
import { comparePassword, hashPassword } from "../helpers/bcrypt";
import { generateToken } from "../helpers/jsonwebtoken";
import logger from "../helpers/winston";
// import { moment } from "../helpers/moment";
// import { sendEmail } from "../services/mailer";
// import Handlebars from "handlebars";
// import { resolve } from "path";

export class AuthController {
  static async register(req: Request<{}, {}, RegisterType>, res: Response, next: NextFunction) {
    const { username, email, password, no_handphone } = req.body;
    try {
      const checkAccount = await sq.query(
        "select * from users u where u.email = :email or u.no_handphone = :no_handphone",
        {
          replacements: { email, no_handphone },
          type: QueryTypes.SELECT,
        }
      );

      if (checkAccount.length) throw new HttpException("Your email or number already registered", 400);

      await UserModel.create({ username, email, password: hashPassword(password), no_handphone });

      // const template = Handlebars.compile(resolve("..", "views", "emailVerification.hbs"));
      // await sendEmail({
      //   from: "ahmadhanif759@gmail.com",
      //   to: email,
      //   subject: "Email verification",
      //   html: template({ username, verificationLink: "", year: moment("Y") }),
      // });

      res.status(200).send({ message: "Register success" });
    } catch (err) {
      next(err);
    }
  }
  static async login(req: Request<{}, {}, LoginType>, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ where: { email } });
      if (!user) throw new HttpException("Your credential is not valid", 401);

      const isMatch = comparePassword(password, user.dataValues.password);
      if (!isMatch) throw new HttpException("Your credential is not valid", 401);

      const token = generateToken({
        id: user.dataValues.id,
        email: user.dataValues.email,
        username: user.dataValues.username,
      });

      res
        .status(200)
        .cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })
        .send({ message: "Login success", data: { email: user.dataValues.email, username: user.dataValues.username } });
    } catch (err) {
      next(err);
    }
  }
}
