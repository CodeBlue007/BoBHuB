const { Router } = require("express");
const { commentController } = require("../controllers");
const { isLoggedIn } = require("../middlewares");

const commentRouter = Router();

commentRouter.get("/", commentController.getByShopId);

commentRouter.post("/", isLoggedIn, commentController.create);
commentRouter.patch("/:commentId", isLoggedIn, commentController.updateByAuth);
commentRouter.delete("/:commentId", isLoggedIn, commentController.deleteByAuth);

const commentAdminRouter = Router();

commentAdminRouter.get("/", commentController.getAllByAdmin);
commentAdminRouter.delete("/:commentId", commentController.deleteByAdmin);

module.exports = { commentRouter, commentAdminRouter };
