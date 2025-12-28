import { Express, Request } from "express"
import { IJwtPayload } from "../helpers/jsonwebtoken"

declare global {
  namespace Express {
    interface Request {
      user?: IJwtPayload | string
    }
  }
}
