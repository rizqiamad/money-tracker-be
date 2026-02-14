import { NextFunction, Request, Response } from "express"
import RecordModel from "./model"

export class Controller {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      await RecordModel.create(req.body)
      res.status(200).send({ status: 200, message: "success" })
    } catch (err) {
      next(err)
    }
  }
}
