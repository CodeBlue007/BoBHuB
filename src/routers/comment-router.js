const { Router } = require("express");
const { commentController, shopController } = require("../controllers");
const { adminRequired, loginRequired } = require("../middlewares");

const commentRouter = Router();

commentRouter.get("/shopId");

commentRouter.post("/auth", loginRequired);
commentRouter.patch("/auth/:commentId", loginRequired);
commentRouter.delete("/auth/:commentId", loginRequired);

commentRouter.get("/admin", adminRequired);
commentRouter.delete("/admin/:commentId", adminRequired);

module.exports = { commentRouter };
