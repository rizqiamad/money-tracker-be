import moment from "moment";
import winston, { addColors } from "winston";
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
      format: moment().format("YY-MM-DD HH:mm:ss"),
    }),
    align(),
    prettyPrint(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
    colorize({ all: true })
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
