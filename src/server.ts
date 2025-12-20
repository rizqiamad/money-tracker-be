import server from "./app"
import { sq } from "./config/connection"
import log from "./helpers/chalk"

const port: number = Number(process.env.APP_PORT) || 8080

;(async () => {
  console.log(`------------------DATABASE ${process.env.NODE_APP?.toUpperCase()}------------------`)
  try {
    await sq.authenticate()
    log.info(`[database]: database connected successfully`)
  } catch (err) {
    await sq.close()
    log.error(`[database]: failed connect to database`)
  }
  server.listen(port, () => log.info(`[server]: listening on => ${process.env.APP_HOST}:${port}`))
})()

const disconnectDB = async () => {
  await sq.close()
  log.info(`[database]: database disconnected`)
  process.exit(process.exitCode)
}

process.on("SIGINT", disconnectDB)
process.on("SIGTERM", disconnectDB)
