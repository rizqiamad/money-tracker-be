import { NextFunction, Request, Response } from "express"
import { hashPassword } from "../../helpers/bcrypt"
import { MsUserModel } from "./model"
import { CustomError } from "../../helpers/error"

export class Controller {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body
      if (!username || !email || !password) {
        throw new CustomError(400, "payload is not valid")
      }
      const hashedPassword = await hashPassword(password)
      await MsUserModel.create({ username, email, password: hashedPassword })
      res.status(200).send({ status: 200, message: "success" })
    } catch (err) {
      next(err)
    }
  }
}
