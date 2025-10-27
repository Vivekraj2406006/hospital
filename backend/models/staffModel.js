import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema(
  {
    // Matches your UI
    name: { type: String, required: true, trim: true },
    role: { type: String, default: "Doctor", trim: true }, // e.g., Doctor/Nurse/Technician
    department: { type: String, trim: true },
    contact: { type: String, trim: true }, // phone/email text from UI
  },
  { timestamps: true }
);

StaffSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Staff = mongoose.model("Staff", StaffSchema);
export default Staff;