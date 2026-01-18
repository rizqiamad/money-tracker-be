import { IJwtPayload } from "../helpers/jsonwebtoken"

declare global {
  namespace Express {
    interface Request {
      user?: IJwtPayload | string
    }
  }
}
