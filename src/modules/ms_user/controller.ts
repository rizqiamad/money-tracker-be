import { NextFunction, Request, Response } from "express"
import { hashPassword } from "../../helpers/bcrypt"
import { MsUserModel } from "./model"

export class Controller {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body
      const hashedPassword = await hashPassword(password)
      await MsUserModel.create({ username, email, password: hashedPassword })
      res.status(200).send({ status: 200, message: "success" })
    } catch (err) {
      next(err)
    }
  }
}
