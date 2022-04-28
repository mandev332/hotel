import Customer from "../controllers/Customer.js";
import { Router } from "express";
import test from "../check/check.js";

const router = Router();

router.get("/", Customer.GET);
router.get("/:_id", Customer.GET);
router.post("/", test.Customer, Customer.POST);
router.put("/:_id", test.Customer, Customer.PUT);
router.delete("/:_id", Customer.DELETE);

export default router;
