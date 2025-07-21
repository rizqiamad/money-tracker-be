import { sq } from "../database/db";
import logger from "../helpers/winston";

export async function connectDB() {
  try {
    await sq.authenticate();
    logger.info("[Database]: Connection has been established successfully.");
  } catch (err) {
    logger.error("[Database]: Unable to connect to the database:", err);
    throw new Error("Failed connect to database");
  }
}
