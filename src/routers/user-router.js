const { Router } = require("express");
const { userController } = require("../controllers");
// const { loginRequired } = require("../middlewares");

const userRouter = Router();
// loginRequired 넣어야함
// 로그인 부분 구현 후, passport, session 적용해서 auth router 새로 할 예정
userRouter.post("/", userController.create);
userRouter.get("/nickNameCheck", userController.nickNameCheck);

// userRouter.get("/auth", userController.get);
// userRouter.patch("/auth", userController.update);
// userRouter.delete("/auth", userController.delete);

module.exports = { userRouter };
