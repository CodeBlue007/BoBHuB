const { Router } = require("express");
const { commentController, shopController } = require("../controllers");
const { adminRequired, loginRequired } = require("../middlewares");

const commentRouter = Router();

commentRouter.get("/shopId", commentController.getById);

commentRouter.post("/auth", loginRequired, commentController.create);
commentRouter.patch("/auth/:commentId", loginRequired, commentController.update);
commentRouter.delete("/auth/:commentId", loginRequired, commentController.delete);

commentRouter.get("/admin", adminRequired, commentController.getAll);
commentRouter.delete("/admin/:commentId", adminRequired, commentController.delete);

module.exports = { commentRouter };
