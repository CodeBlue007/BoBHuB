const { Router } = require("express");
const { foodController } = require("../controllers");
const { isLoggedIn, isAdmin } = require("../middlewares");

const foodRouter = Router();
const foodAdminRouter = Router();

foodRouter.get("/", foodController.getByShopId);

foodRouter.use("/admin", isLoggedIn, isAdmin, foodAdminRouter);

foodAdminRouter.post("/", foodController.create);
foodAdminRouter.patch("/:foodId", foodController.update);
foodAdminRouter.delete("/:foodId", foodController.deleteById);

module.exports = { foodRouter };
