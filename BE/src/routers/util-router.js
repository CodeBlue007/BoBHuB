const { Router } = require("express");
const { utilController } = require("../controllers");

const utilRouter = Router();

utilRouter.get("/email-verification", utilController.sendCode);

module.exports = { utilRouter };
