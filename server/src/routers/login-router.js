const { Router } = require("express");
const { loginController } = require("../controllers");
const { isNotLoggedIn, isLoggedIn } = require("../middlewares");

const loginRouter = Router();

loginRouter.post("/login", isNotLoggedIn, loginController.local);
loginRouter.get("/logout", isLoggedIn, loginController.logout);

module.exports = { loginRouter };
