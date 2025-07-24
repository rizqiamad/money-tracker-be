import { JwtPayload } from "jsonwebtoken";

interface IUserPayload extends JwtPayload {
  id: number;
  email: string;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user: IUserPayload;
    }
  }
}
