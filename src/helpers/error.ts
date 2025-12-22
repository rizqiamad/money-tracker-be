import { NextFunction, Request, Response } from "express"

export class CustomError extends Error {
  status: number
  data: any[]

  constructor(status: number, msg: string, data?: any[]) {
    super(msg)
    this.status = status
    this.data = data || []
  }
}

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof CustomError) {
    res.status(err.status).send({ status: err.status, message: err.message, data: err.data })
  } else {
    res.status(500).send({ status: 500, message: "internal error" })
  }
}
