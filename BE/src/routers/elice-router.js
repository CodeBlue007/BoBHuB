const { Router } = require("express");
const { eliceController } = require("../controllers");

const eliceRouter = Router();

eliceRouter.get("/", eliceController.getAll);

const eliceAdminRouter = Router();

eliceAdminRouter.post("/", eliceController.create);
eliceAdminRouter.patch("/track", eliceController.updateTrack);
eliceAdminRouter.patch("/generation", eliceController.updateGeneration);
eliceAdminRouter.delete("/track", eliceController.deleteTrack);
eliceAdminRouter.delete("/generation", eliceController.deleteGeneration);

module.exports = { eliceRouter, eliceAdminRouter };
