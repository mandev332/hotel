import Worker from "../controllers/Worker.js";
import { Router } from "express";
import test from "../check/check.js";

const router = Router();

router.get("/:_id", Worker.GET);
router.get("/", Worker.GET);
router.post("/", test.Worker, Worker.POST);
router.put("/:_id", test.Worker, Worker.PUT);
router.delete("/:_id", Worker.DELETE);

export default router;
