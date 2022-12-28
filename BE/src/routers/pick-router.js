const { Router } = require("express");
const { pickController } = require("../controllers");

const pickRouter = Router();

pickRouter.post("/", pickController.join);
pickRouter.delete("/", pickController.leave);
pickRouter.get("/cps/:partyId", pickController.isCompletedParty);
pickRouter.delete("/cps", pickController.deleteCompletedParty);

module.exports = { pickRouter };
