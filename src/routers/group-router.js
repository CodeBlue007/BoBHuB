import { Router } from "express";
import { groupController } from "../controllers";

const groupRouter = Router();

groupRouter.route("/")
.get()
.get("/:groupId", );

export { groupRouter };

// socket?