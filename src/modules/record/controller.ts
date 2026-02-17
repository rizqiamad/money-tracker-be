import { NextFunction, Request, Response } from "express"
import RecordModel from "./model"
import { sq } from "../../config/connection"
import UserAccountModel from "../user_account/model"

export class Controller {
  static async create(req: Request, res: Response, next: NextFunction) {
    const { from_user_account_id, to_user_account_id, amount, type } = req.body
    const t = await sq.transaction()
    try {
      if (type == "expense") await UserAccountModel.decrement("amount", { by: amount, where: { id: from_user_account_id }, transaction: t })
      else if (type == "income") await UserAccountModel.increment("amount", { by: amount, where: { id: from_user_account_id }, transaction: t })
      else if (type == "transfer") {
        await UserAccountModel.decrement("amount", { by: amount, where: { id: from_user_account_id }, transaction: t })
        await UserAccountModel.increment("amount", { by: amount, where: { id: to_user_account_id }, transaction: t })
      }
      await RecordModel.create(req.body, { transaction: t })
      await t.commit()
      res.status(200).send({ status: 200, message: "success" })
    } catch (err) {
      await t.rollback()
      next(err)
    }
  }
  static async list(req: Request, res: Response, next: NextFunction) {
    const { from_user_account_id, to_user_account_id, amount, type } = req.body
    const t = await sq.transaction()
    try {
      if (type == "expense") await UserAccountModel.decrement("amount", { by: amount, where: { id: from_user_account_id }, transaction: t })
      else if (type == "income") await UserAccountModel.increment("amount", { by: amount, where: { id: from_user_account_id }, transaction: t })
      else if (type == "transfer") {
        await UserAccountModel.decrement("amount", { by: amount, where: { id: from_user_account_id }, transaction: t })
        await UserAccountModel.increment("amount", { by: amount, where: { id: to_user_account_id }, transaction: t })
      }
      await RecordModel.create(req.body, { transaction: t })
      await t.commit()
      res.status(200).send({ status: 200, message: "success" })
    } catch (err) {
      await t.rollback()
      next(err)
    }
  }
}
