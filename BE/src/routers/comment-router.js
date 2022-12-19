const { Router } = require("express");
const { commentController } = require("../controllers");
const { isLoggedIn, isAdmin } = require("../middlewares");

const commentRouter = Router();
const commentAuthRouter = Router();
const commentAdminRouter = Router();

commentRouter.use("/admin", isLoggedIn, isAdmin, commentAdminRouter);

commentAdminRouter.get("/", commentController.getAllByAdmin);
commentAdminRouter.delete("/:commentId", commentController.deleteByAdmin);

commentRouter.get("/", commentController.getByShopId);

commentRouter.use("/auth", isLoggedIn, commentAuthRouter);

commentAuthRouter.post("/", commentController.create);
commentAuthRouter.patch("/:commentId", commentController.updateByAuth);
commentAuthRouter.delete("/:commentId", commentController.deleteByAuth);

module.exports = { commentRouter };
