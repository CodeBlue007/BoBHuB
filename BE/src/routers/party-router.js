const { Router } = require("express");
const { partyController } = require("../controllers");
const { isLoggedIn } = require("../middlewares");

const partyRouter = Router();

partyRouter.post("/", isLoggedIn, partyController.create);
partyRouter.get("/", partyController.getAll);
partyRouter.get("/my-party", isLoggedIn, partyController.getByUserId);
partyRouter.get("/liked-party", isLoggedIn, partyController.getLikedParty);
partyRouter.get("/:partyId", partyController.getById);
partyRouter.patch("/:partyId", isLoggedIn, partyController.update);
partyRouter.delete("/:partyId", isLoggedIn, partyController.delete);

module.exports = { partyRouter };
