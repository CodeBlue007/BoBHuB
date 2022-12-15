const { Router } = require("express");
const { shopController, categoryController } = require("../controllers");
// const { adminRequired } = require("../middlewares");

const shopRouter = Router();
const shopAdminRouter = Router();

shopRouter.get("/", shopController.getAll);
// shopRouter.get("/:categoryId", shopController.getByCategoryId);
shopRouter.get("/:shopId", shopController.getByShopId);

shopRouter.use("/admin", shopAdminRouter); //인가 미들웨어 필요

shopAdminRouter.post("/", adminRequired);
shopAdminRouter.patch("/:shopId", adminRequired);
shopAdminRouter.delete("/:shopId", adminRequired);

module.exports = { shopRouter };
