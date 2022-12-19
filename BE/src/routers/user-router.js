const { Router } = require("express");
const { userController } = require("../controllers");
const { isLoggedIn, isNotLoggedIn, isAdmin } = require("../middlewares");

const userRouter = Router();
const userAdminRouter = Router();

userRouter.use("/admin", isLoggedIn, isAdmin, userAdminRouter);

userAdminRouter.get("/", userController.getAllByAdmin);
userAdminRouter.patch("/:userId", userController.updateByAdmin);

userRouter.post("/join", isNotLoggedIn, userController.create);

userRouter.get("/nicknames/:nickname", userController.checkNickname);

userRouter.get("/:userId", isLoggedIn, userController.getById);
userRouter.patch("/:userId", isLoggedIn, userController.update);
userRouter.delete("/:userId", isLoggedIn, userController.delete);

module.exports = { userRouter };
