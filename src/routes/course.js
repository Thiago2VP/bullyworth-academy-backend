import { Router } from "express";
import courseControlller from "../controllers/Course.js";

const router = new Router();

router.get("/test", courseControlller.testConnection);
router.get("/", courseControlller.index);
router.get("/:teacher", courseControlller.indexByTeacher);
router.post("/", courseControlller.insert);
router.put("/:id", courseControlller.update);
router.delete("/:id", courseControlller.delete);

export default router;
