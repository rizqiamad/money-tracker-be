import express, { Application, Request, Response } from "express";
import cors from "cors";
import "./config/dotenv";

const app: Application = express();
const PORT: number = 8000;

app.use(cors());

app.get("/api", (_req: Request, res: Response) => {
  res.status(200).send({ message: "Your server successfully running" });
});

app.listen(PORT, () => console.log(`Your server running on => http://localhost:${PORT}/api`));
