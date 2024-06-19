import { Router } from "express";
import userController from "../controllers/User.js";

const router = new Router();

router.get("/test", userController.testConnection);
router.get("/", userController.index);
router.post("/", userController.insert);
router.put("/:email", userController.update);
router.put("/password/:email", userController.updatePassword);
router.delete("/:email", userController.delete);

export default router;
