const { utilService } = require("../services");
const { ErrorFactory, commonErrors } = require("../utils/error-factory");

class UtilController {
  async sendCode(req, res, next) {
    try {
      const unverifiedEmail = req.body.email;
      if (!unverifiedEmail)
        throw new ErrorFactory(
          commonErrors.BAD_REQUEST,
          400,
          "검증이 필요한 email을 보내주세요"
        );

      const result = await utilService.sendCode(unverifiedEmail);
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
  async checkCode(req, res, next) {
    try {
      const email = req.body.email;
      const unverifiedCode = req.body.code;
      if (!unverifiedCode)
        throw new ErrorFactory(commonErrors.BAD_REQUEST, 400, "전송된 인증코드를 보내주세요");

      const result = await utilService.checkCode(email, unverifiedCode);
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

const utilController = new UtilController();

module.exports = { utilController };
