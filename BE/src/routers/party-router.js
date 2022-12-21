const { Router } = require("express");
const { partyController } = require("../controllers");

const partyRouter = Router();

partyRouter.post("/", partyController.create);
partyRouter.get("/", partyController.getAll);
partyRouter.get("/:partyId", partyController.getById);
partyRouter.patch("/:partyId", partyController.update);
partyRouter.delete("/:partyId", partyController.delete);

module.exports = { partyRouter };
