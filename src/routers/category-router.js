const { Router } = require("express");
const { categoryController } = require("../controllers");
// const { adminRequired } = require("../middlewares");

const categoryRouter = Router();

categoryRouter.get("/", categoryController.getAll);

categoryRouter.post("/admin", categoryController.create);
categoryRouter.patch("/admin/:categoryId", categoryController.update);
categoryRouter.delete("/admin/:categoryId", categoryController.delete);

module.exports = { categoryRouter };
