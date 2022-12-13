import { Router } from "express";
import { categoryController } from "../controllers";
import { adminRequired } from "../middlewares";

const categoryRouter = Router();

categoryRouter.route("/")
.get();

categoryRouter.route("/admin", adminRequired)
.post()
.patch("/:categoryId", )
.delete("/:categoryId", );

export { categoryRouter };