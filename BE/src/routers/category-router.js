const { Router } = require("express");
const { categoryController } = require("../controllers");

const categoryRouter = Router();

categoryRouter.get("/", categoryController.getAll);

const categoryAdminRouter = Router();

categoryAdminRouter.post("/", categoryController.create);
categoryAdminRouter.patch("/", categoryController.update);
categoryAdminRouter.delete("/", categoryController.delete);

module.exports = { categoryRouter, categoryAdminRouter };
