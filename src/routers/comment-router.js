import { Router } from "express";
import { commentController, shopController } from "../controllers";
import { adminRequired, loginRequired } from "../middlewares";

const commentRouter = Router();

commentRouter.route("/shopId")
.get();

commentRouter.route("/auth", loginRequired)
.post()
.patch("/:commentId", )
.delete("/:commentId", );

commentRouter.route("/admin", adminRequired)
.get()
.delete("/:commentId", );

export { commentRouter };