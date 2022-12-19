const mysql = require("mysql2/promise");
const path = require("path");

const env = process.env.NODE_ENV || "development";
const config = require(path.resolve(__dirname, "../config/mysql.config.js"))(env);

const pool = mysql.createPool(config);

module.exports = { pool };
