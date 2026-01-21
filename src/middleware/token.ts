import { NextFunction, Request, Response } from "express"
import { verifyJwt } from "../helpers/jsonwebtoken"
import { CustomError } from "../helpers/error"
import { JsonWebTokenError } from "jsonwebtoken"

export function verifyToken(req: Request, _res: Response, next: NextFunction) {
  try {
    const { token } = req.cookies
    if (!token) {
      throw new CustomError(401, "credential is required")
    }
    const payload = verifyJwt(token)
    req.user = payload
    next()
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      next(new CustomError(401, "unauthorized"))
    } else {
      next(err)
    }
  }
}
