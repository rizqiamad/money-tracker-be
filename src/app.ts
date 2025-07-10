import express, { Application, Request, Response } from "express";
import cors from "cors";
import "./config/dotenv";
import router from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { connectDB } from "./config/connectDB";

const app: Application = express();
const PORT: number = 8000;

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.get("/api", (_req: Request, res: Response) => {
  res.status(200).send({ message: "Your server successfully running" });
});
app.use(errorHandler);

async function initializeApp() {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`[Server]: Your server running on => http://localhost:${PORT}/api`)
    );
  } catch {
    process.exit(1);
  }
}

initializeApp();
