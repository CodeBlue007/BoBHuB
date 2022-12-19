const { Router } = require("express");
const { userController } = require("../controllers");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

const userRouter = Router();

userRouter.post("/join", isNotLoggedIn, userController.create);
userRouter.get("/nicknames/:nickname", userController.checkNickname);
userRouter.get("/:userId", isLoggedIn, userController.getById);
userRouter.patch("/:userId", isLoggedIn, userController.update);
userRouter.delete("/:userId", isLoggedIn, userController.delete);

const userAdminRouter = Router();

userAdminRouter.get("/", userController.getAllByAdmin);
userAdminRouter.patch("/:userId", userController.updateByAdmin);

module.exports = { userRouter, userAdminRouter };
