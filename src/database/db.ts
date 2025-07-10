import { Sequelize } from "sequelize";
import "../config/dotenv";

const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, DB_HOST, DB_PORT } = process.env;

export const sq = new Sequelize(POSTGRES_DB as string, POSTGRES_USER as string, POSTGRES_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: "postgres",
  define: {
    freezeTableName: true,
  },
  logging: false,
});
