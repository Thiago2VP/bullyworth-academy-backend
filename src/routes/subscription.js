import { Router } from "express";
import subscriptionControlller from "../controllers/Subscription.js";

import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.get("/", loginRequired, subscriptionControlller.index);
router.get("/byStudent/:student", loginRequired, subscriptionControlller.indexByStudent);
router.get("/byCourse/:course", loginRequired, subscriptionControlller.indexByCourse);
router.post("/", loginRequired, subscriptionControlller.insert);
router.put("/:id", loginRequired, subscriptionControlller.update);
router.delete("/:id", loginRequired, subscriptionControlller.delete);

export default router;
