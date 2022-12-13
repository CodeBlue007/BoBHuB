const { Router } = require("express");
const { groupController } = require("../controllers");

const groupRouter = Router();

groupRouter.get("/");
groupRouter.get("/:groupId");

module.exports = { groupRouter };

// socket?
