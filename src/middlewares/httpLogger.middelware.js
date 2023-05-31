import logger from "../utils/logger.js";

const httpLogger = (req, res, next) => {
  logger.info(`[${req.method}] ${req.url}`);

  req.logger = logger;

  next();
};

export default httpLogger;
