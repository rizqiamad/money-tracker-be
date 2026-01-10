import { NextFunction, Request, Response } from "express"
import UserAccountModel from "./model"
import { sq } from "../../config/connection"
import { tipe } from "../../helpers/tipe"

export class Controller {
  static async bulkCreate(req: Request, res: Response, next: NextFunction) {
    try {
      await UserAccountModel.bulkCreate(req.body)
      res.status(200).send({ status: 200, message: "success" })
    } catch (err) {
      next(err)
    }
  }
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, id, ms_user_id, ms_account_code } = req.body

      let filter = ``
      let filter2 = ``

      if (id) {
        filter += ` and ua.id = :id`
      }
      if (ms_user_id) {
        filter += ` and ua.ms_user_id = :ms_user_id`
      }
      if (ms_account_code) {
        filter += ` and ua.ms_account_code = :ms_account_code`
      }
      if (page && limit) {
        filter2 += ` offset :offset limit :limit`
      }

      const data = await sq.query(
        `select * from user_account ua
        where ua.deleted_at isnull${filter}${filter2}`,
        tipe({ offset: (page - 1) * limit, limit, id, ms_user_id, ms_account_code })
      )

      if (page && limit) {
        const total: any[] = await sq.query(
          `select count(*)::int as count from user_account ua
          where ua."deletedAt" isnull${filter}`,
          tipe({ id, ms_user_id, ms_account_code })
        )
        res.status(200).send({ status: 200, page: +page, total: total[0].count, message: "success", data })
        return
      }

      res.status(200).send({ status: 200, message: "success", data })
    } catch (err) {
      next(err)
    }
  }
}
