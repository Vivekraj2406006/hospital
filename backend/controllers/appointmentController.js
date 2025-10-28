import appointmentModel from "../models/appointmentModel.js";
import transporter from "../config/nodemailer.js";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const MAIL_FROM = process.env.SENDER_EMAIL || ADMIN_EMAIL || process.env.SMTP_USER;

const formatAppointmentHtml = (appt) => `
  <h2>New Appointment Booking</h2>
  <ul>
    <li><strong>Name:</strong> ${appt.patientName}</li>
    <li><strong>Email:</strong> ${appt.email}</li>
    <li><strong>Phone:</strong> ${appt.phone}</li>
    <li><strong>Date/Time:</strong> ${new Date(appt.appointmentDate).toLocaleString()}</li>
    ${appt.department ? `<li><strong>Department:</strong> ${appt.department}</li>` : ""}
    ${appt.doctor ? `<li><strong>Doctor:</strong> ${appt.doctor}</li>` : ""}
    ${appt.message ? `<li><strong>Message:</strong> ${appt.message}</li>` : ""}
    <li><strong>Status:</strong> ${appt.status}</li>
  </ul>
`;

const userConfirmationHtml = (appt) => `
  <h2>Your Appointment Request Was Received</h2>
  <p>Hi ${appt.patientName},</p>
  <p>Thank you for booking an appointment. Here are the details:</p>
  ${formatAppointmentHtml(appt)}
  <p>We will confirm your appointment shortly.</p>
`;

export const createAppointment = async (req, res) => {
  try {
    const {
      patientName,
      email,
      phone,
      appointmentDate,
      department,
      doctor,
      message,
    } = req.body;

    if (!patientName || !email || !phone || !appointmentDate) {
      return res
        .status(400)
        .json({ message: "Patient Name, email, phone, and Appointment Date are required." });
    }

    const appointment = await appointmentModel.create({
      patientName,
      email,
      phone,
      appointmentDate,
      department,
      doctor,
      message,
    });

    // Send emails without blocking the response
    const adminMailPromise =
      ADMIN_EMAIL &&
      transporter
        .sendMail({
          to: ADMIN_EMAIL,
          from: MAIL_FROM,
          subject: `New Appointment: ${appointment.patientName} (${new Date(
            appointment.appointmentDate
          ).toLocaleString()})`,
          html: formatAppointmentHtml(appointment),
        })
        .catch(console.error);

    const userMailPromise = transporter
      .sendMail({
        to: appointment.email,
        from: MAIL_FROM,
        subject: "Your appointment request has been received",
        html: userConfirmationHtml(appointment),
      })
      .catch(console.error);

    // Fire and forget
    Promise.all([adminMailPromise, userMailPromise]).catch(() => {});

    return res.status(201).json({ message: "Appointment created", data: appointment });
  } catch (err) {
    console.error("createAppointment error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "20", 10), 1), 100);
    const sort = req.query.sort || "-createdAt";

    const [items, total] = await Promise.all([
      appointmentModel.find().sort(sort).skip((page - 1) * limit).limit(limit),
      appointmentModel.countDocuments(),
    ]);

    return res.json({
      data: items,
      meta: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error("getAppointments error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // "pending" | "confirmed" | "cancelled" | "completed"
    if (!status) return res.status(400).json({ message: "status is required" });

    const updated = await appointmentModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Appointment not found" });

    return res.json({ message: "Status updated", data: updated });
  } catch (err) {
    console.error("updateAppointmentStatus error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};