import { NextFunction, Request, Response } from "express";
import { HttpException } from "../errors/httpException";
import { sq } from "../database/db";
import { QueryTypes } from "sequelize";
import UserModel from "../database/models/user.model";
import { RegisterType } from "../validators/auth.validator";
import { hashPassword } from "../helpers/bcrypt";
import { sendEmail } from "../services/mailer";
import Handlebars from "handlebars";
import { resolve } from "path";

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
      const template = Handlebars.compile(resolve("..", "views", "emailVerification.hbs"));

      await sendEmail({
        from: "ahmadhanif759@gmail.com",
        to: email,
        subject: "Email verification",
        html: template({ username, verificationLink: "", year: new Date().getFullYear() }),
      });

      res.status(200).send({ message: "success" });
    } catch (err) {
      next(err);
    }
  }
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (err) {
      next(err);
    }
  }
}
