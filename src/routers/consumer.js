import Consumer from "../controllers/Consumer.js";
import { Router } from "express";
import test from "../check/check.js";

const router = Router();

router.get("/:_id", Consumer.GET);
router.get("/", Consumer.GET);
router.post("/", test.Consumer, Consumer.POST);
router.put("/:_id", test.Consumer, Consumer.PUT);
router.delete("/:_id", Consumer.DELETE);

export default router;
