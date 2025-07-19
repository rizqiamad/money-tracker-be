import * as jwt from "jsonwebtoken";

export interface IPayload {
  id: number | undefined;
  email: string;
  username: string;
}

export function generateToken(payload: IPayload) {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string);
}
