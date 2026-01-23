import jwt, { JwtPayload } from "jsonwebtoken"

export interface IJwtPayload extends JwtPayload {
  id?: string
  email?: string
}

export function signJwt(payload: IJwtPayload) {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" })
}

export function verifyJwt(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!) as IJwtPayload
}
