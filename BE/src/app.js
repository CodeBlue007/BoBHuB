const cors = require("cors");
const express = require("express");
const passport = require("passport");
const passportConfig = require("./passport");
const sessionConfig = require("./config/session.config");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("./db/models");
require("dotenv").config();
const {
  categoryRouter,
  shopRouter,
  foodRouter,
  userRouter,
  eliceRouter,
  loginRouter,
  commentRouter,
  partyRouter,
  adminRouter,
  utilRouter,
} = require("./routers");
const { errorLogger, errorHandler, isLoggedIn, isAdmin } = require("./middlewares");
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
app.use("/api/categories", categoryRouter);
app.use("/api/shops", shopRouter);
app.use("/api/food", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/elice", eliceRouter);
app.use("/api/comments", commentRouter);
app.use("/api/admin", isLoggedIn, isAdmin, adminRouter);
app.use("/api/parties", isLoggedIn, partyRouter);
// app.use("/api/utils", isLoggedIn, utilRouter);

app.use(errorLogger);
app.use(errorHandler);

module.exports = { app };
