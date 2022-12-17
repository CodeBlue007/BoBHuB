const { Router } = require("express");
const { eliceController } = require("../controllers");
// const { adminRequired } = require("../middlewares");

const eliceRouter = Router();
const eliceAdminRouter = Router();

eliceRouter.get("/", eliceController.getAll);

eliceRouter.use("/admin", eliceAdminRouter); //미들웨어 추가 필요

eliceAdminRouter.post("/", eliceController.create);
eliceAdminRouter.patch("/track", eliceController.updateTrack);
eliceAdminRouter.patch("/generation", eliceController.updateGeneration);
eliceAdminRouter.delete("/track", eliceController.deleteTrack);
eliceAdminRouter.delete("/generation", eliceController.deleteGeneration);

module.exports = { eliceRouter };