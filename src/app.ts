import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import "./config/dotenv";
import router from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { connectDB } from "./config/connectDB";
import cookieParser from "cookie-parser";
import logger from "./helpers/winston";
import { requestLogger } from "./middlewares/requestLogger";
import { HttpException } from "./errors/httpException";

const app: Application = express();
const PORT: number = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(requestLogger);
app.use("/api", router);
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new HttpException("Api not found", 404));
});
app.use(errorHandler);

async function initializeApp() {
  try {
    await connectDB();
    app.listen(PORT, () => logger.info(`[Server]: Your server running on => ${process.env.APP_URL}:${PORT}/api`));
  } catch {
    logger.error("[server]: Your server failed to run");
    process.exit(1);
  }
}

initializeApp();
