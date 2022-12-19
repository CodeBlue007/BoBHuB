const { Router } = require("express");
const { commentController } = require("../controllers");
const { isLoggedIn, isAdmin } = require("../middlewares");

const commentRouter = Router();
const commentAdminRouter = Router();

commentRouter.use("/admin", isLoggedIn, isAdmin, commentAdminRouter);

commentAdminRouter.get("/", commentController.getAllByAdmin);
commentAdminRouter.delete("/:commentId", commentController.deleteByAdmin);

commentRouter.get("/", commentController.getByShopId);

commentRouter.post("/", commentController.create);
commentRouter.patch("/:commentId", commentController.updateByAuth);
commentRouter.delete("/:commentId", commentController.deleteByAuth);

module.exports = { commentRouter };
