import { Router } from "express";
import supportMaterialController from "../controllers/SupportMaterial.js";

const router = new Router();

router.get("/", supportMaterialController.index);
router.get("/:lesson", supportMaterialController.indexByLesson);
router.post("/", supportMaterialController.insert);
router.put("/:id", supportMaterialController.update);
router.delete("/:id", supportMaterialController.delete);

export default router;
