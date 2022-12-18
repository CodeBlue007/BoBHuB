const cors = require("cors");
const express = require("express");
const passport = require("passport");
const passportConfig = require("./passport");
const sessionConfig = require("./config/session.config");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("./db/models");
const {
  categoryRouter,
  shopRouter,
  foodRouter,
  userRouter,
  eliceRouter,
  loginRouter,
  commentRouter,
} = require("./routers");

const { errorLogger, errorHandler } = require("./middlewares");

const app = express();
passportConfig();

app.use(cors());

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", loginRouter);
app.use("/api/category", categoryRouter);
app.use("/api/shop", shopRouter);
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
// app.use("/api/group", groupRouter);
app.use("/api/elice", eliceRouter);
app.use("/api/comment", commentRouter);

app.use(errorLogger);
app.use(errorHandler);

module.exports = { app };
