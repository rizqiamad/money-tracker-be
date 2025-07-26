import { NextFunction, Request, Response } from "express";
import { sq } from "../database/db";
import { tipe } from "../helpers/tipe";

export class AccountController {
  static async getAccounts(req: Request, res: Response, next: NextFunction) {
    try {
      const accounts = await sq.query(`select account_name as account from accounts a;`, tipe());
      res.status(200).send({ data: accounts });
    } catch (err) {
      next(err);
    }
  }
}
