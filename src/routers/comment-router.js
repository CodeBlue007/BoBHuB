const { Router } = require("express");
const { commentController } = require("../controllers");
const { isLoggedIn, isAdmin } = require("../middlewares");

const commentRouter = Router();
const commentAuthRouter = Router();
const commentAdminRouter = Router();

commentRouter.get("/:shopId", commentController.getByShopId);

commentRouter.use("/auth", isLoggedIn, commentAuthRouter);

commentAuthRouter.post("/:shopId", commentController.create);
commentAuthRouter.patch("/:commentId", commentController.updateAuth);
commentAuthRouter.delete("/:commentId", commentController.deleteAuth);

commentRouter.use("/admin", isLoggedIn, isAdmin, commentAdminRouter);

commentAdminRouter.get("/", commentController.getAll);
commentAdminRouter.delete("/:commentId", commentController.deleteById);

module.exports = { commentRouter };
