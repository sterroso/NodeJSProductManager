import HttpStatus from "../constants/http.status.js";
import logger from "../utils/logger.js";

const errorLogger = (err, req, res, next) => {
  logger.error(err.stack);

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
};

export default errorLogger;
