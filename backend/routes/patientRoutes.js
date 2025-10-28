import { Router } from "express";
import { listPatients, createPatient, deletePatient } from "../controllers/patientController.js";

const router = Router();

router.get("/", listPatients);
router.post("/", createPatient);
router.delete("/:id", deletePatient);

export default router;