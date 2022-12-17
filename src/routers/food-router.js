const { Router } = require("express");
const { foodController } = require("../controllers");
// const { adminRequired } = require("../middlewares");

const foodRouter = Router();
const foodAdminRouter = Router();

foodRouter.get("/:shopId", foodController.getByShopId);

foodRouter.use("/admin", foodAdminRouter);

foodAdminRouter.post("/:shopId", foodController.create);
foodAdminRouter.patch("/:foodId", foodController.update);
foodAdminRouter.delete("/:foodId", foodController.deleteById);

module.exports = { foodRouter };
