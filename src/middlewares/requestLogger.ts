import { NextFunction, Request, Response } from "express";
import logger from "../helpers/winston";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = new Date().getTime();
  res.on("finish", () => {
    const finish = new Date().getTime() - start;

    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} - ${finish}ms`);
  });
  next();
}
