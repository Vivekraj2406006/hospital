import Patient from "../models/patientModel.js";

export const listPatients = async (_req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    return res.json(patients);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch patients", error: err.message });
  }
};

export const createPatient = async (req, res) => {
  try {
    const { name, age, email, department } = req.body || {};
    if (!name) return res.status(400).json({ message: "Name is required" });

    const patient = await Patient.create({
      name: String(name).trim(),
      age: age !== undefined && age !== "" ? Number(age) : undefined,
      email,
      department,
      loginTime: new Date(),
    });

    return res.status(201).json(patient);
  } catch (err) {
    return res.status(400).json({ message: "Failed to create patient", error: err.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const deleted = await Patient.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Patient not found" });
    return res.json({ message: "Patient deleted" });
  } catch (err) {
    return res.status(400).json({ message: "Failed to delete patient", error: err.message });
  }
};