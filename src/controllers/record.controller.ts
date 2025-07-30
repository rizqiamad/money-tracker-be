import { NextFunction, Request, Response } from "express";
import { RecordType } from "../validators/record.validator";
import RecordModel from "../database/models/record.model";
import PoolAccountsUsersModel from "../database/models/poolAccountUser.model";
import { sq } from "../database/db";
import { tipe } from "../helpers/tipe";

export class RecordController {
  static async getRecords(req: Request, res: Response, next: NextFunction) {
    const user_id = req.user.id;
    try {
      const records = await sq.query(
        `select r.id, r."type", r.category, r.amount, r.description, r.created_at
        from records r
        join pool_accounts_users pau on r.pool_accounts_users_id = pau.id
        where pau.user_id = :user_id`,
        tipe({ user_id })
      );
      res.status(200).send({ data: records });
    } catch (err) {
      next(err);
    }
  }
  static async addRecord(req: Request<{}, {}, RecordType>, res: Response, next: NextFunction) {
    const { pool_accounts_users_id, type, category, amount, description } = req.body;
    const t = await sq.transaction();
    try {
      const balance = await PoolAccountsUsersModel.findByPk(pool_accounts_users_id, { transaction: t });

      if (!balance) {
        res.status(400).send({ message: "your data is not valid" });
        return;
      }

      if (type == "expenses") {
        balance.decrement("total_balance", { by: amount });
      } else {
        balance.increment("total_balance", { by: amount });
      }

      await balance.save({ transaction: t });

      await RecordModel.create({ pool_accounts_users_id, type, category, amount, description }, { transaction: t });
      await t.commit();
      res.status(200).send({ message: "success" });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
}
