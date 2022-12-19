const { Router } = require("express");
const { foodController } = require("../controllers");
const { isLoggedIn, isAdmin } = require("../middlewares");

const foodRouter = Router();
const foodAdminRouter = Router();

foodRouter.get("/:shopId", foodController.getByShopId);

foodRouter.use("/admin", isLoggedIn, isAdmin, foodAdminRouter);

foodAdminRouter.post("/:shopId", foodController.create);
foodAdminRouter.patch("/:foodId", foodController.update);
foodAdminRouter.delete("/:foodId", foodController.deleteById);

module.exports = { foodRouter };
