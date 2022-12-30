class ErrorFactory extends Error {
  constructor(name, statusCode, description) {
    super(description);
    this.name = name;
    this.statusCode = statusCode;
    this.message = description;

    Error.captureStackTrace(this);
  }
}

const commonErrors = {
  BAD_REQUEST: "Request is wrong",
  UNAUTHORIZED: "You are not authorized",
  FORBIDDEN: "You have no right to access",
  NOT_FOUND: "Resource not found Error",
  DB_ERROR : "Internal Server Error"
};

module.exports = { ErrorFactory, commonErrors };
