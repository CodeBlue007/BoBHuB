const { Router } = require("express");
const { commentController } = require("../controllers");
const { isLoggedIn, isAdmin } = require("../middlewares");

const commentRouter = Router();
const commentAuthRouter = Router();
const commentAdminRouter = Router();

commentRouter.get("/:shopId", commentController.getByShopId);

commentRouter.use("/auth", isLoggedIn, commentAuthRouter);

commentAuthRouter.post("/:shopId", commentController.create);
commentAuthRouter.patch("/:commentId", commentController.updateByAuth);
commentAuthRouter.delete("/:commentId", commentController.deleteByAuth);

commentRouter.use("/admin", isLoggedIn, isAdmin, commentAdminRouter);

commentAdminRouter.get("/", commentController.getAllByAdmin);
commentAdminRouter.delete("/:commentId", commentController.deleteByAdmin);

module.exports = { commentRouter };
