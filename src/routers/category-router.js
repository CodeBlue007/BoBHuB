const { Router } = require("express");
const { categoryController } = require("../controllers");
const { adminRequired } = require("../middlewares");

const categoryRouter = Router();

categoryRouter.get("/", categoryController.getAll);

categoryRouter.post("/admin", adminRequired, categoryController.create);
categoryRouter.patch("/admin/:categoryId", adminRequired, categoryController.update);
categoryRouter.delete("/admin/:categoryId", adminRequired, categoryController.delete);

module.exports = { categoryRouter };
