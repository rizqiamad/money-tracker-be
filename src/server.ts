import server from "./app"
import { connectDB, disconnectDB, sq } from "./config/connection"
import log from "./helpers/chalk"

const port: number = Number(process.env.APP_PORT) || 8080

function closeServer() {
  server.close(async () => {
    await disconnectDB()
    process.exit(0)
  })
}

;(async () => {
  // melakukan test apakah sudah bisa terhubung dengan database
  await connectDB()

  // menyalakan server
  server.listen(port, () => log.info(`[server]: listening on => ${process.env.APP_HOST}:${port}`))

  // set proses yang terjadi ketika server dimatikan menggunakan ctrl + c ataupun pm2
  process.on("SIGINT", closeServer)
  process.on("SIGTERM", closeServer)
})()
