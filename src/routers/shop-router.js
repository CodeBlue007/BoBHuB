const { Router } = require("express");
const { shopController, categoryController } = require("../controllers");
// const { adminRequired } = require("../middlewares");

const shopRouter = Router();
const shopAdminRouter = Router();

shopRouter.get("/");
shopRouter.get("/:categoryId");
shopRouter.get("/:shopId");

shopRouter.use("/admin", shopAdminRouter); //인가 미들웨어 필요

shopAdminRouter.post("/", adminRequired);
shopAdminRouter.patch("/:shopId", adminRequired);
shopAdminRouter.delete("/:shopId", adminRequired);

module.exports = { shopRouter };
