import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod/v4";
import { HttpException } from "../errors/httpException";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    res
      .status(400)
      .send({ errors: err.issues.map((iss) => ({ path: iss.path[0], message: iss.message })) });
    return;
  }
  if (err instanceof HttpException) {
    res.status(err.status).send({ message: err.message });
    return;
  }
  res.status(400).send(err);
}
