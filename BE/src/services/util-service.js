const { generateRandomCode, mailSender } = require("../utils");
const { ErrorFactory, commonErrors } = require("../utils/error-factory");

class UtilService {
  async sendCode(needVerifyEmail) {
    try {
      const code = await generateRandomCode();
      const subject = `밥허브 메일 검증 코드 입니다.`;
      const text = `-----------------------------
      인증 코드 : ${code} 
      -----------------------------`;
      const info = {
        email: needVerifyEmail,
        subject,
        text,
      };
      mailSender.sendGmail(info);
      return { code };
    } catch {
      throw new ErrorFactory(commonErrors.DB_ERROR, 500, "메일 전송에 오류가 있습니다.");
    }
  }
}

const utilService = new UtilService();

module.exports = { utilService };
