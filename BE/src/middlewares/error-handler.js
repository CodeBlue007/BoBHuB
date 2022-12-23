function errorHandler(error, req, res, next) {
  console.log("\x1b[33m%s\x1b[0m", error.stack);
  console.log(error.statusCode, error.name, error.message);
  res.status(error.statusCode).json({ type: error.name, reason: error.message });
}

module.exports = { errorHandler };
