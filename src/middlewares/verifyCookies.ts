import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../helpers/jsonwebtoken";
import { IUserPayload } from "../types/custom";

export function verifyCookies(req: Request, res: Response, next: NextFunction) {
  const { token } = req.cookies;
  try {
    const payload = verifyToken(token) as IUserPayload;
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
}
