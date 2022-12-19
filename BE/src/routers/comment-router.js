const { Router } = require("express");
const { commentController } = require("../controllers");
const { isLoggedIn, isAdmin } = require("../middlewares");

const commentRouter = Router();
const commentAdminRouter = Router();

commentRouter.use("/admin", isLoggedIn, isAdmin, commentAdminRouter);

commentAdminRouter.get("/", commentController.getAllByAdmin);
commentAdminRouter.delete("/:commentId", commentController.deleteByAdmin);

commentRouter.get("/", commentController.getByShopId);

commentRouter.post("/", isLoggedIn, commentController.create);
commentRouter.patch("/:commentId", isLoggedIn, commentController.updateByAuth);
commentRouter.delete("/:commentId", isLoggedIn, commentController.deleteByAuth);

module.exports = { commentRouter };
