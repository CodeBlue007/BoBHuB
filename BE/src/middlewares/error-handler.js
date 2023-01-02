const { logger } = require("../utils");

function errorHandler(error, req, res, next) {
  logger.error("\x1b[33m%s\x1b[0m", error.stack);
  logger.debug(error.statusCode, error.name, error.message);
  res.status(error.statusCode).json({ type: error.name, reason: error.message });
}

module.exports = { errorHandler };
