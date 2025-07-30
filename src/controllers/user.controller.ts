import { NextFunction, Request, Response } from "express";
import UserModel from "../database/models/user.model";

export class UserController {
  static async getProfile(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user;
    try {
      const user = await UserModel.findByPk(id);
      res.status(200).send({
        data: {
          id: user?.dataValues.id,
          username: user?.dataValues.username,
          email: user?.dataValues.email,
          no_handphone: user?.dataValues.no_handphone,
          created_at: user?.dataValues.created_at,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
