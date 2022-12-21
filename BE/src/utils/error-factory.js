class ErrorFactory extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    // 이 오류생성자가 호출되기 전에 발생한 호출까지만 stack에 쌓는다(보안이슈)
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequest extends ErrorFactory {
  constructor(message) {
    if (message) super(message, 400);
    else super("Bad Request", 400, 400);
  }
}
class Unauthorized extends ErrorFactory {
  constructor(message) {
    if (message) super(message, 401);
    else super("Unauthorized", 401, 401);
  }
}
class Forbidden extends ErrorFactory {
  constructor(message) {
    if (message) super(message, 403);
    else super("Forbidden", 403, 403);
  }
}
class NotFound extends ErrorFactory {
  constructor(message) {
    if (message) super(message, 404);
    else super("NotFound", 404, 404);
  }
}

module.exports = { BadRequest, Unauthorized, Forbidden, NotFound };
