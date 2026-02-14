import { NextFunction, Request, Response } from "express"
import { sq } from "../../config/connection"
import { tipe } from "../../helpers/tipe"

export class Controller {
  static async list(req: Request, res: Response, next: NextFunction) {
    const { ms_category_code, ms_category_name } = req.body
    try {
      let value1 = ``

      if (ms_category_code) {
        value1 += ` and mc.ms_category_code = :ms_category_code`
      }
      if (ms_category_name) {
        value1 += ` and mc.ms_category_name ilike :ms_category_name`
      }

      const data = await sq.query(
        `select mc.ms_category_code,mc.ms_category_name from ms_category mc`,
        tipe({ ms_category_code, ms_category_name: `%${ms_category_name}%` })
      )
      res.status(200).send({ status: 200, message: "success", data })
    } catch (err) {
      next(err)
    }
  }
}
