const { Router } = require("express");
const { shopController, categoryController } = require("../controllers");
const { adminRequired } = require("../middlewares");

const shopRouter = Router();

shopRouter.get("/", shopController.getAll);
// shopRouter.get("/:categoryId", shopController.getByCategoryId);
shopRouter.get("/:shopId", shopController.getByShopId);

shopRouter.post("/admin", adminRequired, shopController.create);
shopRouter.patch("/admin/:shopId", adminRequired, shopController.update);
shopRouter.delete("/admin/:shopId", adminRequired, shopController.delete);

module.exports = { shopRouter };
