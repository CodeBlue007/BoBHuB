const { generateRandomCode, mailSender } = require("../utils");
const { myCacheCheckperiod } = require("../utils");
const myCache = myCacheCheckperiod(60);
const { ErrorFactory, commonErrors } = require("../utils/error-factory");

class UtilService {
  async sendCode(unverifiedEmail) {
    try {
      const code = await generateRandomCode();
      const subject = `밥허브 메일 검증 코드 입니다. 1분안에 입력해주세요.`;
      const text = `-----------------------------
인증 코드 : ${code} 
-----------------------------`;
      const info = {
        email: unverifiedEmail,
        subject,
        text,
      };
      mailSender.sendGmail(info);
      myCache.set(unverifiedEmail, code);
      return { message: "인증코드를 발송했습니다. 1분 안에 입력해주세요." };
    } catch {
      throw new ErrorFactory(commonErrors.DB_ERROR, 500, "메일 전송에 오류가 있습니다.");
    }
  }

  async checkCode(email, unverifiedCode) {
    try {
      const code = myCache.get(email);
      let message;
      if (!code) message = "1분이 지났습니다.";
      else if (code == unverifiedCode) message = "인증되었습니다.";
      else message = "인증 코드가 일치하지 않습니다.";

      return { message };
    } catch {
      throw new ErrorFactory(commonErrors.DB_ERROR, 500, "메일 전송에 오류가 있습니다.");
    }
  }
}

const utilService = new UtilService();

module.exports = { utilService };
