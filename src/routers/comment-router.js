const { Router } = require("express");
const { commentController } = require("../controllers");
// const { adminRequired, loginRequired } = require("../middlewares");

const commentRouter = Router();
const commentAuthRouter = Router();
const commentAdminRouter = Router();

commentRouter.get("/shopId", commentController.getByShopId);

commentRouter.get("/auth", commentAuthRouter);

commentAuthRouter.post("/", commentController.create);
commentAuthRouter.patch("/:commentId", commentController.updateAuth);
commentAuthRouter.delete("/:commentId", commentController.deleteAuth);

commentRouter.get("/admin", commentAdminRouter);

commentAdminRouter.get("/", commentController.getAll);
commentAdminRouter.delete("/:commentId", commentController.delete);

module.exports = { commentRouter };
