import Room from "../controllers/Room.js";
import { Router } from "express";
import test from "../check/check.js";

const router = Router();

router.get("/:id", Room.GET);
router.post("/", test.Room, Room.POST);
router.put("/:id", test.Room, Room.PUT);
router.delete("/:id", Room.DELETE);

export default router;
