import { NextFunction, Request, Response } from "express"

export function validateBody(req: Request, _res: Response, next: NextFunction) {
  if (!req.body || Object.keys(req.body).length === 0) {
    req.body = {} // Paksa jadi objek kosong jika undefined
  }
  next()
}
