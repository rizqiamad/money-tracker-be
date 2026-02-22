import { NextFunction, Request, Response } from "express"
import RecordModel from "./model"
import { sq } from "../../config/connection"
import UserAccountModel from "../user_account/model"
import { tipe } from "../../helpers/tipe"

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
    const {
      id,
      from_user_account_id,
      to_user_account_id,
      type,
      date_action,
      sub_category_code,
      description,
      search,
      order_by_name,
      order_by_value,
      current,
      limit,
    } = req.body
    try {
      let value1 = ``
      let value2 = ` order by r.date_action`

      if (id) {
        value1 += ` and r.id = :id`
      }
      if (from_user_account_id) {
        value1 += ` and r.from_user_account_id = :from_user_account_id`
      }
      if (to_user_account_id) {
        value1 += ` and r.to_user_account_id = :to_user_account_id`
      }
      if (type) {
        value1 += ` and r.type = :type`
      }
      if (date_action) {
        value1 += ` and r.date_action = :date_action`
      }
      if (sub_category_code) {
        value1 += ` and r.sub_category_code = :sub_category_code`
      }
      if (description) {
        value1 += ` and r.description ilike :description`
      }
      if (search) {
        value1 += ` and (r.description ilike :search or sc.sub_category_name ilike :search or ua.ms_account_code ilike :search or ua2.ms_account_code ilike :search)`
      }
      if (order_by_name && order_by_value) {
        if (order_by_name == "date_action") {
          value2 = ` order by r.date_action :order_by_value`
        }
      }
      if (current && limit) {
        value2 += ` offset :offset limit :limit`
      }

      const data = await sq.query(
        `select r.*,ua.ms_account_code from_user_account_name,ua2.ms_account_code to_user_account_name,sc.sub_category_name from record r 
        join user_account ua on ua.id = from_user_account_id 
        left join user_account ua2 on ua2.id = to_user_account_id 
        left join sub_category sc on sc.sub_category_code = r.sub_category_code
        where r.id notnull${value1}${value2}`,
        tipe({
          id,
          from_user_account_id,
          to_user_account_id,
          type,
          date_action,
          sub_category_code,
          description: `%${description}%`,
          search: `%${search}%`,
          order_by_value,
          offset: +limit * (+current - 1),
          limit,
        })
      )

      if (current && limit) {
        const count: any[] = await sq.query(
          `select count(*)::int total from record r 
          join user_account ua on ua.id = from_user_account_id 
          left join user_account ua2 on ua2.id = to_user_account_id 
          left join sub_category sc on sc.sub_category_code = r.sub_category_code
          where r.id notnull${value1}`,
          tipe({
            id,
            from_user_account_id,
            to_user_account_id,
            type,
            date_action,
            sub_category_code,
            description: `%${description}%`,
            search: `%${search}%`,
            order_by_value,
          })
        )

        return res.status(200).send({ status: 200, current: +current, total: count[0].total, message: "success", data })
      }
      res.status(200).send({ status: 200, message: "success", data })
    } catch (err) {
      next(err)
    }
  }
}
