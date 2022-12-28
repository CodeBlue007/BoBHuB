const { Router } = require("express");
const { utilController } = require("../controllers");

const utilRouter = Router();

utilRouter.get("/email/send-code", utilController.sendCode);
utilRouter.get("/email/check-code", utilController.checkCode);

module.exports = { utilRouter };
