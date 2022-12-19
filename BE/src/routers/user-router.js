const { Router } = require("express");
const { userController } = require("../controllers");
const { isLoggedIn, isNotLoggedIn, isAdmin } = require("../middlewares");

const userRouter = Router();
const userAuthRouter = Router();
const userAdminRouter = Router();

userRouter.post("/join", isNotLoggedIn, userController.create);
userRouter.get("/nickNameCheck", userController.nickNameCheck);

userRouter.use("/auth", isLoggedIn, userAuthRouter);

userAuthRouter.get("/", userController.getById);
userAuthRouter.patch("/", userController.update);
userAuthRouter.delete("/", userController.delete);

userRouter.use("/admin", isLoggedIn, isAdmin, userAdminRouter);

userAdminRouter.get("/", userController.getAllByAdmin);
userAdminRouter.patch("/:userId", userController.updateByAdmin);

module.exports = { userRouter };
