import { Router } from "express";
import { userController } from "../controllers";
import { loginRequired } from "../middlewares";

const userRouter = Router();

userRouter.route("/")
.post();

userRouter.route("/auth", loginRequired)
.get()
.patch()
.delete();

export { userRouter };