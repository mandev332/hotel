import Room from "../controllers/Room.js";
import { Router } from "express";
import test from "../check/check.js";

const router = Router();

router.get("/:roomNumber", Room.GET);
router.get("/", Room.GET);
router.post("/", test.Room, Room.POST);
router.put("/:_id", test.Room, Room.PUT);
router.delete("/:_id", Room.DELETE);

export default router;
