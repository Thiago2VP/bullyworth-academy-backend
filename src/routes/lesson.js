import { Router } from "express";
import lessonControlller from "../controllers/Lesson.js";

import teacherRequired from "../middlewares/teacherRequired.js";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.get("/", loginRequired, lessonControlller.index);
router.get("/:course", loginRequired, lessonControlller.indexByCourse);
router.post("/", teacherRequired, lessonControlller.insert);
router.put("/:id", teacherRequired, lessonControlller.update);
router.delete("/:id", teacherRequired, lessonControlller.delete);

export default router;
