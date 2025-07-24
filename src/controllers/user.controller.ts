import { NextFunction, Request, Response } from "express";
import UserModel from "../database/models/user.model";

export class UserController {
  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (err) {}
  }
  static async getProfile(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user;
    try {
      const user = await UserModel.findByPk(id);
      res.status(200).send({ data: user });
    } catch (err) {
      next(err);
    }
  }
}
