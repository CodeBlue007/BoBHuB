const passport = require("passport");
const { logger } = require("../utils");
class LoginController {
  login(req, res, next) {
    passport.authenticate("local", (authError, user, info) => {
      if (authError) {
        logger.error(authError);
        return next(authError);
      }
      if (!user) {
        logger.info(info.message);
        const result = {
          result: "loginError",
          message: info.message,
        };
        return res.status(200).json(result);
      }
      return req.login(user, (loginError) => {
        if (loginError) {
          logger.error(loginError);
          return next(loginError);
        }
        return res.status(200).json({
          result: "success",
          message: "로그인성공",
        });
      });
    })(req, res, next);
  }

  logout(req, res, next) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
    });
    res.clearCookie("connect.sid");
    res.status(200).json({
      result: "success",
      message: "로그아웃 성공",
    });
  }
}

const loginController = new LoginController();

module.exports = { loginController };
