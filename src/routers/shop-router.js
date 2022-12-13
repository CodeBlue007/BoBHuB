import { Router } from "express";
import { shopController, categoryController } from "../controllers";
import { adminRequired } from "../middlewares";

const shopRouter = Router();

shopRouter.route("/")
.get()
.get("/:categoryId", )
.get("/:shopId", );

shopRouter.route("/admin", adminRequired)
.post()
.patch("/:shopId", )
.delete("/:shopId", );

export { shopRouter };