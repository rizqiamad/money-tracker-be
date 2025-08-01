import { NextFunction, Request, Response } from "express";
import { TransferLogType } from "../validators/transfer.validator ";
import TransferLogModel from "../database/models/transferLog.model";
import PoolAccountsUsersModel from "../database/models/poolAccountUser.model";
import { sq } from "../database/db";

export class TransferController {
  static async addLog(req: Request<{}, {}, TransferLogType>, res: Response, next: NextFunction) {
    const { pool_accounts_users_from_id, amount_sent, pool_accounts_users_to_id, amount_received, description } = req.body;
    const t = await sq.transaction();
    try {
      const senderBalance = await PoolAccountsUsersModel.findByPk(pool_accounts_users_from_id, { transaction: t });
      const receiverBalance = await PoolAccountsUsersModel.findByPk(pool_accounts_users_to_id, { transaction: t });

      if (!senderBalance || !receiverBalance) {
        res.status(400).send({ message: "your data is not valid" });
        return;
      }

      senderBalance.decrement("actual_balance", { by: amount_sent });
      receiverBalance.increment("actual_balance", { by: amount_received });

      await senderBalance.save({ transaction: t });
      await receiverBalance.save({ transaction: t });

      await TransferLogModel.create({ pool_accounts_users_from_id, amount_sent, pool_accounts_users_to_id, amount_received, description }, { transaction: t });
      t.commit();
      res.status(200).send({ message: "success" });
    } catch (err) {
      t.rollback();
      next(err);
    }
  }
}
