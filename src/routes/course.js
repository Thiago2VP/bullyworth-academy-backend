import { Router } from "express";
import courseControlller from "../controllers/Course.js";

import teacherRequired from "../middlewares/teacherRequired.js";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.get("/", courseControlller.index);
router.get("/:teacher", courseControlller.indexByTeacher);
router.get("/student/:student", loginRequired, courseControlller.indexByStudent);
router.post("/", teacherRequired, courseControlller.insert);
router.put("/:id", teacherRequired, courseControlller.update);
router.delete("/:id", teacherRequired, courseControlller.delete);

export default router;
