import express from "express";
import {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";

const router = express.Router();

// TODO: Protect admin routes when auth middleware is ready
// import { protect, admin } from "../middleware/authMiddleware.js";
// router.get("/", protect, admin, getAppointments);
// router.patch("/:id/status", protect, admin, updateAppointmentStatus);

router.post("/", createAppointment);
router.get("/", getAppointments); // make protected for admin in production
router.patch("/:id/status", updateAppointmentStatus); // make protected for admin in production

export default router;