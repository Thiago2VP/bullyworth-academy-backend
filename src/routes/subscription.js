import { Router } from "express";
import subscriptionControlller from "../controllers/Subscription.js";

const router = new Router();

router.get("/", subscriptionControlller.index);
router.get("/byStudent/:student", subscriptionControlller.indexByStudent);
router.get("/byCourse/:course", subscriptionControlller.indexByCourse);
router.post("/", subscriptionControlller.insert);
router.put("/:id", subscriptionControlller.update);
router.delete("/:id", subscriptionControlller.delete);

export default router;
