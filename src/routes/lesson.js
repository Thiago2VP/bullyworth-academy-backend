import { Router } from "express";
import lessonControlller from "../controllers/Lesson.js";

const router = new Router();

router.get("/", lessonControlller.index);
router.get("/:course", lessonControlller.indexByCourse);
router.post("/", lessonControlller.insert);
router.put("/:id", lessonControlller.update);
router.delete("/:id", lessonControlller.delete);

export default router;
