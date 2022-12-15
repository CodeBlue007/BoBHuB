const { Router } = require("express");
const { categoryController } = require("../controllers");
// const { adminRequired } = require("../middlewares");

const categoryRouter = Router();
const categoryAdminRouter = Router();

categoryRouter.get("/", categoryController.getAll);

categoryRouter.use("/admin", categoryAdminRouter); //미들웨어 추가 필요

categoryAdminRouter.post("/", categoryController.create);
categoryAdminRouter.patch("/:categoryId", categoryController.update);
categoryAdminRouter.delete("/:categoryId", categoryController.delete);

module.exports = { categoryRouter };
