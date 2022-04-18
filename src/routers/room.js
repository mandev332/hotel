import Room from "../controllers/Room.js";
import { Router } from "express";
import test from "../check/check.js";

const router = Router();

router.get("/:roomNumber", Room.GET);
router.get("/", Room.GET);
router.post("/", test.Room, Room.POST);
router.put("/:roomNumber", test.Room, Room.PUT);
router.delete("/:roomNumber", Room.DELETE);

export default router;
