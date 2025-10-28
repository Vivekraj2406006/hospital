import { Router } from "express";
import { listStaff, createStaff, deleteStaff } from "../controllers/staffController.js";

const router = Router();

router.get("/", listStaff);
router.post("/", createStaff);
router.delete("/:id", deleteStaff);

export default router;