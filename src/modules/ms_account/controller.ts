import { NextFunction, Request, Response } from "express"
import { sq } from "../../config/connection"
import { tipe } from "../../helpers/tipe"

export class Controller {
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, ms_account_code, ms_account_name } = req.body

      let filter = ``
      let filter2 = ``

      if (ms_account_code) {
        filter += ` and msa.ms_account_code = :ms_account_code`
      }
      if (ms_account_name) {
        filter += ` and msa.ms_account_name ilike :ms_account_name`
      }
      if (page && limit) {
        filter2 += ` offset :offset limit :limit`
      }

      const data = await sq.query(
        `select * from ms_account msa
        where msa.deleted_at isnull${filter}${filter2}`,
        tipe({ offset: (page - 1) * limit, limit, ms_account_code, ms_account_name })
      )

      if (page && limit) {
        const total: any[] = await sq.query(
          `select count(*)::int as count from ms_account msa
          where msa."deletedAt" isnull${filter}`,
          tipe({ ms_account_code, ms_account_name })
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
