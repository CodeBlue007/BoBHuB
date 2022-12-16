const { Router } = require("express");
const { shopController } = require("../controllers");
// const { adminRequired } = require("../middlewares");

const shopRouter = Router();
const shopAdminRouter = Router();

shopRouter.get("/", shopController.getAll);
shopRouter.get("/:shopId", shopController.getByShopId);

shopRouter.use("/admin", shopAdminRouter); //인가 미들웨어 필요

shopAdminRouter.post("/", shopController.create);
shopAdminRouter.patch("/:shopId", shopController.update);
shopAdminRouter.delete("/:shopId", shopController.delete);

module.exports = { shopRouter };
