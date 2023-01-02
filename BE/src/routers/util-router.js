const { Router } = require("express");
const { utilController } = require("../controllers");

const utilRouter = Router();

utilRouter.post("/email/send-code", utilController.sendCode);
utilRouter.post("/email/check-code", utilController.checkCode);

module.exports = { utilRouter };
