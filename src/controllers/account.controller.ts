import { NextFunction, Request, Response } from "express";
import { sq } from "../database/db";
import { tipe } from "../helpers/tipe";
import { AccountType } from "../validators/accounts.validators";
import AccountModel from "../database/models/account.model";

export class AccountController {
  static async getAccounts(_req: Request, res: Response, next: NextFunction) {
    try {
      const accounts = await sq.query(`select a.id, a.account_name as account from accounts a where a.deleted isnull;`, tipe());
      res.status(200).send({ data: accounts });
    } catch (err) {
      next(err);
    }
  }
  static async createAccount(req: Request<{}, {}, AccountType>, res: Response, next: NextFunction) {
    const { account_name } = req.body;
    try {
      await AccountModel.create({ account_name });
      res.status(200).send({ message: "success" });
    } catch (err) {
      next(err);
    }
  }
}
