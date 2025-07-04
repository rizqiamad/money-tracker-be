import { Sequelize } from "sequelize";
import "../config/dotenv";

const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, DB_HOST, DB_PORT } = process.env;

const sq = new Sequelize(POSTGRES_DB as string, POSTGRES_USER as string, POSTGRES_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: "postgres",
  define: {
    freezeTableName: true,
  },
});

(async () => {
  try {
    await sq.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export { sq };
