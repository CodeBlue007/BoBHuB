const { Router } = require("express");
const { pickController } = require("../controllers");

const pickRouter = Router();

pickRouter.post("/", pickController.join);
pickRouter.delete("/", pickController.leave);

module.exports = { pickRouter };
