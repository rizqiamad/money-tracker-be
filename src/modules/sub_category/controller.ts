import { NextFunction, Request, Response } from "express"
import { sq } from "../../config/connection"
import { tipe } from "../../helpers/tipe"

export class Controller {
  static async list(req: Request, res: Response, next: NextFunction) {
    const { sub_category_code, ms_category_code, sub_category_name } = req.body
    try {
      let value1 = ``

      if (sub_category_code) {
        value1 += ` and sc.sub_category_code = :sub_category_code`
      }
      if (ms_category_code) {
        value1 += ` and sc.ms_category_code = :ms_category_code`
      }
      if (sub_category_name) {
        value1 += ` and sc.sub_category_name ilike :sub_category_name`
      }

      const data = await sq.query(
        `select sc.sub_category_code,sc.ms_category_code,sc.sub_category_name from sub_category sc`,
        tipe({ sub_category_code, ms_category_code, sub_category_name: `%${sub_category_name}%` })
      )
      res.status(200).send({ status: 200, message: "success", data })
    } catch (err) {
      next(err)
    }
  }
}
