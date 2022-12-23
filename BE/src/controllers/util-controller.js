const { utilService } = require("../services");
const { BadRequest, NotFound } = require("../utils/error-factory");

class UtilController {
  async sendCode(req, res, next) {
    try {
      const needVerifyEmail = req.body.email;
      if (!needVerifyEmail) throw new BadRequest("검증이 필요한 email을 보내주세요");

      const codeObj = await utilService.sendCode(needVerifyEmail);
      return res.status(200).json(codeObj);
    } catch (e) {
      next(e);
    }
  }
}

const utilController = new UtilController();

module.exports = { utilController };
