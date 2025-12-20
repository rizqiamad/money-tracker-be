import dotenv from "dotenv"
import express, { Application, Request, Response } from "express"
import { createServer, Server } from "http"

dotenv.config({ path: `.env.${process.env.NODE_APP}` })

const app: Application = express()
const server: Server = createServer(app)

app.use(express.json())
app.use(express.urlencoded())

app.get("/api/test", (_req: Request, res: Response) => {
  res.status(200).send({ message: "success" })
})

export default server
