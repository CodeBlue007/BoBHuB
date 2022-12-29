const { Router } = require("express");
const { cpController } = require("../controllers");

const cpRouter = Router();

cpRouter.get("/", cpController.getCompletedParty);
cpRouter.get("/:partyId", cpController.isCompletedParty);
cpRouter.delete("/", cpController.deleteCompletedParty);

module.exports = { cpRouter };
