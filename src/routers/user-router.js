const { Router } = require("express");
const { userController } = require("../controllers");
const { loginRequired } = require("../middlewares");

const userRouter = Router();

userRouter.post("/");
userRouter.get("/auth", loginRequired);
userRouter.patch("/auth", loginRequired);
userRouter.delete("/auth", loginRequired);

module.exports = { userRouter };
