const { Router } = require("express");
const { utilController } = require("../controllers");

const utilRouter = Router();

utilRouter.get("/send-code", utilController.sendCode);
utilRouter.get("/code-verification", utilController.sendCode);

module.exports = { utilRouter };
