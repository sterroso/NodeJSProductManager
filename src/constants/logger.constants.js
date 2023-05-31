export const loggingFormat = ({ level, message, timestamp }) =>
  `${timestamp} ${level}: ${message}`;

export const TIMESTAMP_FORMAT = "YYYY-MM-DD HH:mm:ss";
