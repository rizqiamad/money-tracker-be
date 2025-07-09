import { NextFunction, Request, Response } from "express";
import { HttpException } from "../errors/httpException";
import { sq } from "../database/db";
import { QueryTypes } from "sequelize";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    const { username, email, password, no_handphone } = req.body;
    try {
      const checkAccount = await sq.query("select * from ", {
        replacements: { email, no_handphone },
        type: QueryTypes.SELECT,
      });
      if (checkAccount) {
        throw new HttpException("You have account already registered", 400);
      }
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
