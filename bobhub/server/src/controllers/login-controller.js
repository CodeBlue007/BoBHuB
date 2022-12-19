const passport = require("passport");

class LoginController {
  local(req, res, next) {
    passport.authenticate("local", (authError, user, info) => {
      if (authError) {
        console.error(authError);
        return next(authError);
      }
      if (!user) {
        return res.redirect(`/?loginError=${info.message}`);
      }
      return req.login(user, (loginError) => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        return res.redirect("/"); //세션쿠키를 브라우저로 보냄
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
    res.redirect("/");
  }
}

const loginController = new LoginController();

module.exports = { loginController };
