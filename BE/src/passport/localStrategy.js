const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { userModel } = require("../db/models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const [exUser] = await userModel.get({ email });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              const message = encodeURIComponent("비밀번호가 일치하지 않습니다.");
              done(null, false, { message });
            }
          } else {
            const message = encodeURIComponent("가입되지 않은 회원입니다.");
            done(null, false, { message });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
