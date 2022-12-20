const { Router } = require("express");
const { shopController } = require("../controllers");
const { imageUploader } = require("../middlewares");

const shopRouter = Router();

shopRouter.get("/", shopController.getAll);
shopRouter.get("/total", shopController.count);
shopRouter.get("/:shopId", shopController.getByShopId);

const shopAdminRouter = Router();

shopAdminRouter.post(
  "/",
  imageUploader.fields([{ name: "menu" }, { name: "shopPicture" }]),
  shopController.create
);
shopAdminRouter.patch(
  "/:shopId",
  imageUploader.fields([{ name: "menu" }, { name: "shopPicture" }]),
  shopController.update
);
shopAdminRouter.delete("/:shopId", shopController.delete);

module.exports = { shopRouter, shopAdminRouter };
