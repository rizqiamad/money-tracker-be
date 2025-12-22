import { Sequelize } from "sequelize"
import log from "../helpers/chalk"

export const sq = new Sequelize({
  dialect: "postgres",
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  logging: false,
  define: {
    freezeTableName: true,
  },
})

export async function connectDB() {
  console.log(`------------------DATABASE ${process.env.NODE_APP?.toUpperCase()}------------------`)
  try {
    await sq.authenticate()
    log.info(`[database]: database connected successfully`)
  } catch (err) {
    await sq.close()
    log.error(`[database]: failed connect to database because ${err}`)
    process.exit(1)
  }
}

export async function disconnectDB() {
  await sq.close()
  log.info(`[database]: database disconnected`)
}
