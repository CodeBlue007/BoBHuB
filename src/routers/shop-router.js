const { Router } = require("express");
const { shopController, categoryController } = require("../controllers");
const { adminRequired } = require("../middlewares");

const shopRouter = Router();

shopRouter.get("/");
shopRouter.get("/:categoryId");
shopRouter.get("/:shopId");

shopRouter.post("/admin", adminRequired);
shopRouter.patch("/admin/:shopId", adminRequired);
shopRouter.delete("/admin/:shopId", adminRequired);

module.exports = { shopRouter };
