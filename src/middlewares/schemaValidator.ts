import { NextFunction, Request, Response } from "express";
import { z } from "zod/v4";

export function schemaValidator(Schema: z.ZodObject) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      Schema.parse(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
}
