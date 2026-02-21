import { NextFunction, Request, Response } from "express"
import UserAccountModel from "./model"
import { sq } from "../../config/connection"
import { tipe } from "../../helpers/tipe"
import { IJwtPayload } from "../../helpers/jsonwebtoken"
import RecordModel from "../record/model"
import { Op } from "sequelize"

export class Controller {
  static async bulkCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req?.user as IJwtPayload
      for (let i = 0; i < req.body.length; i++) {
        req.body[i].ms_user_id = id
      }
      await UserAccountModel.bulkCreate(req.body)
      res.status(200).send({ status: 200, message: "success" })
    } catch (err) {
      next(err)
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    const t = await sq.transaction()
    try {
      const { id } = req.params
      await RecordModel.destroy({ where: { [Op.or]: { from_user_account_id: id, to_user_account_id: id } }, transaction: t })
      await UserAccountModel.destroy({ where: { id }, transaction: t })
      await t.commit()
      res.status(200).send({ status: 200, message: "success" })
    } catch (err) {
      await t.rollback()
      next(err)
    }
  }
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { current, limit, id, ms_account_code } = req.body
      const { id: ms_user_id } = req?.user as IJwtPayload

      let filter = ``
      let filter2 = ``

      if (id) {
        filter += ` and ua.id = :id`
      }
      if (ms_account_code) {
        filter += ` and ua.ms_account_code = :ms_account_code`
      }
      if (current && limit) {
        filter2 += ` offset :offset limit :limit`
      }

      const data = await sq.query(
        `select ua.id,ua.ms_account_code,msa.ms_account_name,ua.amount::int from user_account ua
        join ms_account msa on msa.ms_account_code = ua.ms_account_code
        where ua.ms_user_id = :ms_user_id and ua.deleted_at isnull${filter}${filter2}`,
        tipe({ offset: (current - 1) * limit, limit, id, ms_user_id, ms_account_code })
      )

      if (current && limit) {
        const count: any[] = await sq.query(
          `select count(*)::int as total from user_account ua
          join ms_account msa on msa.ms_account_code = ua.ms_account_code
          where ua.ms_user_id = :ms_user_id and ua.deleted_at isnull${filter}`,
          tipe({ id, ms_user_id, ms_account_code })
        )
        return res.status(200).send({ status: 200, current: +current, total: count[0].total, message: "success", data })
      }

      res.status(200).send({ status: 200, message: "success", data })
    } catch (err) {
      next(err)
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { amount } = req.body
      const { id } = req.user as IJwtPayload

      await UserAccountModel.update({ amount }, { where: { ms_user_id: id } })
      res.status(200).send({ status: 200, message: "success" })
    } catch (err) {
      next(err)
    }
  }
}
