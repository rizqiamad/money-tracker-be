import dotenv from "dotenv"
dotenv.config({ path: `.env.${process.env.NODE_APP}` })
import express, { Application, Request, Response } from "express"
import { createServer, Server } from "http"
import morgan from "morgan"
import router from "."
import { errorHandler } from "./helpers/error"
import cookieParser from "cookie-parser"
import { validateBody } from "./middleware/body"
import cors from "cors"

const app: Application = express()
const server: Server = createServer(app)

app.use(cors({ credentials: true, origin: ["http://localhost:5173", "http://localhost:5432"] }))
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(validateBody)
app.use(morgan("dev"))
app.use(cookieParser())
app.use("/api", router)

app.use((_req: Request, res: Response) => {
  res.status(404).send({ status: 404, message: "url not found" })
})

app.use(errorHandler)

export default server
