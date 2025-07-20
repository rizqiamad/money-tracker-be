import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod/v4";
import { HttpException } from "../errors/httpException";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import logger from "../helpers/winston";

/**
 * 400: General error
 * 401: Unauthorized
 */

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);
  if (err instanceof ZodError) {
    res.status(400).send({ errors: err.issues.map((iss) => ({ path: iss.path[0], message: iss.message })) });
    return;
  }
  if (err instanceof HttpException) {
    res.status(err.status).send({ message: err.message });
    return;
  }
  if (err instanceof JsonWebTokenError) {
    res.status(401).send({ message: err.message });
    return;
  }
  if (err instanceof TokenExpiredError) {
    res.status(401).send({ message: err.message });
    return;
  }
  res.status(400).send(err);
}
