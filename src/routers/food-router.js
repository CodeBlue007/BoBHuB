const { Router } = require("express");
const { foodController } = require("../controllers");
const { adminRequired } = require("../middlewares");

const foodRouter = Router();

foodRouter.get("/:shopId", foodController.getByShopId);

foodRouter.post("/admin", foodController.create);
foodRouter.patch("/admin/:foodId", foodController.update);
foodRouter.delete("/admin/:foodId", foodController.delete);

module.exports = { foodRouter };
