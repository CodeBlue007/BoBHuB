const { Router } = require("express");
const { pickController } = require("../controllers");

const pickRouter = Router();

pickRouter.post("/", pickController.join);
pickRouter.delete("/", pickController.leave);
pickRouter.get("/party-users", pickController.getByPartyId);

module.exports = { pickRouter };
