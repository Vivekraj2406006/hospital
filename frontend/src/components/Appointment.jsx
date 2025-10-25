import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  department: "",
  date: "",
  message: "",
};

const Appointment = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState("");
  const { isLoggedIn, user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn || !user?.isAccountVerified) {
      alert("You must login and verify your account to submit an appointment request.");
      navigate('/login');
      return;
    }
    // ...existing code...
    console.log("Form data submitted:", formData);
    setStatus("Appointment request sent successfully!");
    setFormData(initialFormState);
  setTimeout(() => setStatus(""), 4000);
  };

  return (
    <section id="appointment" className="py-16 md:py-24 bg-[#3edae8] text-onPrimary">
      <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#f2f6f6] mb-2 tracking-tight">
              Book an Appointment
            </h2>
            <p className="text-lg text-gray-800 max-w-2xl mx-auto">
              Fill out the form below to request an appointment. Our team will get
              back to you shortly.
            </p>
        </div>

        <form
          id="appointment-form"
          onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white text-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-muted mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#399fa8] focus:ring-2 focus:ring-[#399fa8]/20 bg-gray-50 text-gray-900 placeholder-gray-400 transition"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-muted mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#399fa8] focus:ring-2 focus:ring-[#399fa8]/20 bg-gray-50 text-gray-900 placeholder-gray-400 transition"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-muted mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#399fa8] focus:ring-2 focus:ring-[#399fa8]/20 bg-gray-50 text-gray-900 placeholder-gray-400 transition"
                required
              />
            </div>

            {/* Department */}
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-muted mb-2"
              >
                Department
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#399fa8] focus:ring-2 focus:ring-[#399fa8]/20 bg-gray-50 text-gray-900 placeholder-gray-400 transition"
                required
              >
                <option value="">Select a Department</option>
                <option value="cardiology">Cardiology</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="neurology">Neurology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="general">General Checkup</option>
              </select>
            </div>

            {/* Preferred Date */}
            <div className="md:col-span-2">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-muted mb-2"
              >
                Preferred Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#399fa8] focus:ring-2 focus:ring-[#399fa8]/20 bg-gray-50 text-gray-900 placeholder-gray-400 transition"
                required
              />
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-muted mb-2"
              >
                Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#399fa8] focus:ring-2 focus:ring-[#399fa8]/20 bg-gray-50 text-gray-900 placeholder-gray-400 transition"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-8">
            <button
              type="submit"
                className="bg-[#41c1cd] w-full md:w-auto px-10 py-3 rounded-full text-lg font-semibold shadow-lg text-white hover:bg-[#2b7a78] transition"
            >
              Submit Request
            </button>
          </div>

          {/* Form Status Message */}
          <div id="form-status" className="text-center mt-4 h-6 text-success">
            {status}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Appointment;
