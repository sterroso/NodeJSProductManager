import { format, createLogger, transports, config } from "winston";

import {
  loggingFormat,
  TIMESTAMP_FORMAT,
} from "../constants/logger.constants.js";

const { combine, timestamp, printf } = format;

const requestLogFormat = printf(({ level, message, timestamp }) =>
  loggingFormat({ level, message, timestamp })
);

const logger = createLogger({
  levels: config.npm.levels,
  format: combine(timestamp({ format: TIMESTAMP_FORMAT }), requestLogFormat),
  transports: [
    new transports.Console({ level: "debug" }),
    new transports.File({ filename: "logs/error.log", level: "warn" }),
    new transports.File({ filename: "logs/http.log", level: "http" }),
  ],
});

export default logger;
