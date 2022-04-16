import Consumer from "../controllers/Consumer.js";
import { Router } from "express";
import test from "../check/check.js";

const router = Router();

router.get("/", Consumer.GET);
router.post("/", test.Consumer, Consumer.POST);
router.put("/", test.Consumer, Consumer.PUT);
router.delete("/", Consumer.DELETE);

export default router;
