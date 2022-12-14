const { Router } = require("express");
const { categoryController } = require("../controllers");
const { adminRequired } = require("../middlewares");

const categoryRouter = Router();

categoryRouter.get("/");

categoryRouter.post("/admin", adminRequired);
categoryRouter.patch("/admin/:categoryId", adminRequired);
categoryRouter.delete("/admin/:categoryId", adminRequired);

module.exports = { categoryRouter };
