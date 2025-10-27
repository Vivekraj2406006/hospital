import Staff from "../models/staffModel.js";

export const listStaff = async (_req, res) => {
  try {
    const staff = await Staff.find().sort({ createdAt: -1 });
    return res.json(staff);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch staff", error: err.message });
  }
};

export const createStaff = async (req, res) => {
  try {
    const { name, role, department, contact } = req.body || {};
    if (!name) return res.status(400).json({ message: "Name is required" });

    const staff = await Staff.create({
      name: String(name).trim(),
      role: role || "Doctor",
      department,
      contact,
    });

    return res.status(201).json(staff);
  } catch (err) {
    return res.status(400).json({ message: "Failed to create staff", error: err.message });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const deleted = await Staff.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Staff not found" });
    return res.json({ message: "Staff deleted" });
  } catch (err) {
    return res.status(400).json({ message: "Failed to delete staff", error: err.message });
  }
};