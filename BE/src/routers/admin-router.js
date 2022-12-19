const { Router } = require("express");
const { categoryAdminRouter } = require("./category-router");
const { commentAdminRouter } = require("./comment-router");
const { eliceAdminRouter } = require("./elice-router");
const { foodAdminRouter } = require("./food-router");
const { shopAdminRouter } = require("./shop-router");
const { userAdminRouter } = require("./user-router");

const adminRouter = Router();
userAdminRouter
adminRouter.use("/categories", categoryAdminRouter);
adminRouter.use("/comments", commentAdminRouter);
adminRouter.use("/elice", eliceAdminRouter);
adminRouter.use("/food", foodAdminRouter);
adminRouter.use("/shops", shopAdminRouter);
adminRouter.use("/users", userAdminRouter);


module.exports = { adminRouter };
