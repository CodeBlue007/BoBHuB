const { Router } = require("express");
const { userController } = require("../controllers");
const { isLoggedIn, isNotLoggedIn, imageUploader } = require("../middlewares");

const userRouter = Router();

userRouter.post(
  "/join",
  imageUploader.single("profile"),
  isNotLoggedIn,
  userController.create
);
userRouter.get("/nicknames/:nickname", userController.checkNickname);
userRouter.get("/", isLoggedIn, userController.getById);
userRouter.patch("/", isLoggedIn, userController.update);
userRouter.delete("/", isLoggedIn, userController.delete);

const userAdminRouter = Router();

userAdminRouter.get("/", userController.getAllByAdmin);
userAdminRouter.patch("/:userId", userController.updateByAdmin);

module.exports = { userRouter, userAdminRouter };
