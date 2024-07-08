import { Router } from "express";
import subscriptionControlller from "../controllers/Subscription.js";

import loginRequired from "../middlewares/loginRequired";
import teacherRequired from "../middlewares/teacherRequired.js";

const router = new Router();

router.get("/byStudent/:student", loginRequired, subscriptionControlller.indexByStudent);
router.get("/byCourse/:course", teacherRequired, subscriptionControlller.indexByCourse);
router.post("/", loginRequired, subscriptionControlller.insert);
router.put("/:id", loginRequired, subscriptionControlller.update);
router.delete("/:id", loginRequired, subscriptionControlller.delete);

export default router;
