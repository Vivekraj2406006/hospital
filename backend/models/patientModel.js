import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    // Simple fields that match your UI
    name: { type: String, required: true, trim: true },
    age: { type: Number },
    email: { type: String, lowercase: true, trim: true },
    department: { type: String, trim: true },

    // Auto-set when created (used as "Login Time" in your UI)
    loginTime: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Normalize API output: add "id", drop _id/__v, and format loginTime to a display string
PatientSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    if (ret.loginTime) {
      try {
        ret.loginTime = new Date(ret.loginTime).toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
      } catch {}
    }
    return ret;
  },
});

const Patient = mongoose.model("Patient", PatientSchema);
export default Patient;