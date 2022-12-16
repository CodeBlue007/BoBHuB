const { Router } = require("express");
const { userController } = require("../controllers");
// const { loginRequired } = require("../middlewares");

const userRouter = Router();
// loginRequired 넣어야함 + userId가 도메인에 노출 되면 안되네 생각해보니
// 지금 경로 수정 필요함
userRouter.post("/", userController.create);
userRouter.get("/auth/:userId", userController.getByUserId);
userRouter.patch("/auth/:userId", userController.update);
userRouter.delete("/auth/:userId", userController.delete);

module.exports = { userRouter };
