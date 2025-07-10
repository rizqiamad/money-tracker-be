import { sq } from "../database/db";

export async function connectDB() {
  try {
    await sq.authenticate();
    console.log("[Database]: Connection has been established successfully.");
  } catch (error) {
    console.error("[Database]: Unable to connect to the database:", error);
  }
}
