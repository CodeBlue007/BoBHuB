const { Router } = require("express");
const { shopController } = require("../controllers");
const { isLoggedIn, isAdmin, imageUploader } = require("../middlewares");

const shopRouter = Router();
const shopAdminRouter = Router();

shopRouter.get("/", shopController.getAll);
shopRouter.get("/total", shopController.count);
shopRouter.get("/:shopId", shopController.getByShopId);

shopRouter.use("/admin", isLoggedIn, isAdmin, shopAdminRouter);

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

module.exports = { shopRouter };
