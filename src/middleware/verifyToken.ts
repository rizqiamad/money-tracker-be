import { NextFunction, Request, Response } from "express"
import { verifyJwt } from "../helpers/jsonwebtoken"
import { CustomError } from "../helpers/error"
import { JsonWebTokenError } from "jsonwebtoken"

export function verfyToken(req: Request, _res: Response, next: NextFunction) {
  try {
    const payload = verifyJwt(req.cookies?.token)
    req.user = payload
    next()
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      next(new CustomError(401, "unauthorized"))
    }
  }
}
