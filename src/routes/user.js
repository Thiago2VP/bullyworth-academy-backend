import { Router } from "express";
import userController from "../controllers/User.js";

import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.get("/", userController.index);
router.post("/", userController.insert);
router.put("/:email", loginRequired, userController.update);
router.put("/password/:email", loginRequired, userController.updatePassword);
router.delete("/:email", loginRequired, userController.delete);

export default router;
