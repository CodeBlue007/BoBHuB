const passport = require("passport");
const local = require("./localStrategy");
const { userModel } = require("../db/models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.userId);
  });

  passport.deserializeUser((userId, done) => {
    userModel
      .get({ userId })
      .then(([user]) => done(null, user))
      .catch((err) => done(err));
  });

  local();
};
