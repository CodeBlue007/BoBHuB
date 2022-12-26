const pino = require("pino");
const pretty = require("pino-pretty");
const stream = pretty({
  colorize: true,
});
exports.logger = pino({ level: process.env.LOG_LEVEL || "info" }, stream);
