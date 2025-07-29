import { NextFunction, Request, Response } from "express";

export class RecordController {
  static async addRecord(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (err) {
      next(err);
    }
  }
}
