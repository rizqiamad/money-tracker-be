import chalk from "chalk"

const log = {
  info: (msg: any) => console.log(chalk.blue("[INFO]"), msg),
  warn: (msg: any) => console.log(chalk.yellow("[WARN]"), msg),
  error: (msg: any) => console.log(chalk.red("[ERROR]"), msg),
}

export default log
