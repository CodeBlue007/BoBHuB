const passport = require("passport");
const { logger } = require("../utils");
const bobhubUrl = process.env.BOB_HUB_URL;
class LoginController {
  login(req, res, next) {
    passport.authenticate("local", (authError, user, info) => {
      if (authError) {
        logger.error(authError);
        return next(authError);
      }
      if (!user) {
        logger.info(info.message);
        return res.redirect(`${bobhubUrl}/login?loginError=${info.message}`);
      }
      return req.login(user, (loginError) => {
        if (loginError) {
          logger.error(loginError);
          return next(loginError);
        }
        return res.redirect(`${bobhubUrl}`); //세션쿠키를 브라우저로 보냄
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
    res.redirect(`${bobhubUrl}`);
  }
}

const loginController = new LoginController();

module.exports = { loginController };
