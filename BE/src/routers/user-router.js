const { Router } = require("express");
const { userController } = require("../controllers");
const { isLoggedIn, isNotLoggedIn, imageUploader } = require("../middlewares");

const userRouter = Router();

userRouter.post(
  "/join",
  isNotLoggedIn,
  imageUploader.single("profile"),
  userController.create
);
userRouter.get("/nicknames/:nickname", userController.checkNickname);
userRouter.get("/emails/:email", userController.checkEmail);
userRouter.get("/", isLoggedIn, userController.getById);
userRouter.patch("/", isLoggedIn, userController.update);
userRouter.delete("/", isLoggedIn, userController.delete);
userRouter.post(
  "/image",
  isLoggedIn,
  imageUploader.single("profile"),
  userController.updateImage
);

const userAdminRouter = Router();

userAdminRouter.get("/", userController.getAllByAdmin);
userAdminRouter.patch("/:userId", userController.updateByAdmin);

module.exports = { userRouter, userAdminRouter };
