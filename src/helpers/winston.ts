import winston, { addColors } from "winston";
import { moment } from "./moment";
const { combine, timestamp, printf, colorize, align, prettyPrint } = winston.format;

addColors({
  info: "blue",
  warn: "yellow",
  error: "red",
  debug: "green",
});

const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({
      format: moment("DD-MM-YY HH:mm:ss"),
    }),
    align(),
    prettyPrint(),
    printf((info) => `[${info.timestamp}] (${info.level}): ${info.message}`),
    colorize({ all: true })
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
