const passport = require("passport");
const local = require("./localStrategy");
const { userModel } = require("../db/models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.userId);
  });

  passport.deserializeUser((userId, done) => {
    userModel // 있는지 확인
      .get({ userId }) // 여기서 db 조회를 꼭하고 넘어가야되는지,
      .then(([user]) => done(null, user))
      .catch((err) => done(err));
  });

  local();
};
