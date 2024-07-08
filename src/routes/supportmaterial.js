import { Router } from "express";
import supportMaterialController from "../controllers/SupportMaterial.js";

import teacherRequired from "../middlewares/teacherRequired.js";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.get("/:user/:lesson", loginRequired, supportMaterialController.indexByLesson);
router.post("/", teacherRequired, supportMaterialController.insert);
router.put("/:id", teacherRequired, supportMaterialController.update);
router.delete("/:id", teacherRequired, supportMaterialController.delete);

export default router;
