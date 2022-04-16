import Worker from "../controllers/Worker.js";
import { Router } from "express";
import test from "../check/check.js";

const router = Router();

router.get("/:id", Worker.GET);
router.post("/", test.Worker, Worker.POST);
router.put("/:id", test.Worker, Worker.PUT);
router.delete("/:id", Worker.DELETE);

export default router;
