import { NextFunction, Request, Response } from "express";
import { BalanceType } from "../validators/balance.validator";
import PoolAccountsUsersModel from "../database/models/poolAccountUser.model";
import { sq } from "../database/db";
import { tipe } from "../helpers/tipe";

export class BalanceController {
  static async getBalances(req: Request, res: Response, next: NextFunction) {
    const user_id = req.user.id;
    try {
      const balances = await sq.query(
        `select pau.id, a.account_name as account, pau.total_balance, pau.created_at, pau.updated_at
        from pool_accounts_users pau 
        join accounts a on pau.account_id = a.id 
        where pau.user_id = :user_id and pau.deleted_at isnull
        order by pau.id`,
        tipe({ user_id })
      );
      res.status(200).send({ data: balances });
    } catch (err) {
      next(err);
    }
  }
  static async addBalance(req: Request<{}, {}, BalanceType>, res: Response, next: NextFunction) {
    const { account_id, initial_balance } = req.body;
    const user_id = req.user.id;
    try {
      const checkBalance: any[] = await sq.query(
        `select * 
        from pool_accounts_users pau 
        where pau.user_id = :user_id and pau.account_id = :account_id and pau.deleted_at isnull`,
        tipe({ user_id, account_id })
      );
      if (checkBalance.length) {
        res.status(400).send({ message: "You already have balances in this account" });
        return;
      }

      await PoolAccountsUsersModel.create({ user_id, account_id, initial_balance, actual_balance: initial_balance });
      res.status(200).send({ message: "success" });
    } catch (err) {
      next(err);
    }
  }
}
