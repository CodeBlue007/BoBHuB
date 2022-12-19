function errorHandler(error, req, res, next) {
  console.log("\x1b[33m%s\x1b[0m", error.stack);

  res.status(400).json({ result: "error", reason: error.message });
}

module.exports = { errorHandler };
