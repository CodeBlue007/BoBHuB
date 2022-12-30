const { Router } = require("express");
const { foodController } = require("../controllers");
const { imageUploader } = require("../middlewares");

const foodRouter = Router();

foodRouter.get("/", foodController.getByShopId);

const foodAdminRouter = Router();

foodAdminRouter.post("/", imageUploader.single("picture"), foodController.create);
foodAdminRouter.patch("/:foodId", foodController.update);
foodAdminRouter.delete("/:foodId", foodController.deleteById);
foodAdminRouter.post(
  "/:foodId/image",
  imageUploader.single("picture"),
  foodController.updateImage
);

module.exports = { foodRouter, foodAdminRouter };
