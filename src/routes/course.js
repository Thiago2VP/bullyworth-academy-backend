import { Router } from "express";
import courseControlller from "../controllers/Course.js";

import teacherRequired from "../middlewares/teacherRequired.js";

const router = new Router();

router.get("/", courseControlller.index);
router.get("/:teacher", courseControlller.indexByTeacher);
router.post("/", teacherRequired, courseControlller.insert);
router.put("/:id", teacherRequired, courseControlller.update);
router.delete("/:id", teacherRequired, courseControlller.delete);

export default router;
