import { NextFunction, Request, Response } from "express";
import { BalanceType } from "../validators/balance.validator";
import PoolAccountsUsersModel from "../database/models/poolAccountUser.model";

export class BalanceController {
  static async addBalance(req: Request<{}, {}, BalanceType>, res: Response, next: NextFunction) {
    const { user_id, account_id, total_balance } = req.body;
    try {
      await PoolAccountsUsersModel.create({ user_id, account_id, total_balance });
      res.status(200).send({ message: "success" });
    } catch (err) {
      next(err);
    }
  }
}
