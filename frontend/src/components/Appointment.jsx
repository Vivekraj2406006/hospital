import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

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
    <section id="appointment" className="py-16 md:py-24 bg-gradient-to-br from-[#3b8686]/30 via-[#0e9aa7]/20 to-[#66c2c2]/30">
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
            className="relative max-w-2xl mx-auto bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-md text-gray-900 p-8 rounded-3xl shadow-[0_10px_30px_rgba(16,24,40,0.25)] border border-white/20 overflow-hidden transition-transform transform hover:scale-[1.01]"
        >
          {/* decorative blob */}
          <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-r from-[#39bfc4] to-[#0e9aa7] opacity-20 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-12 -left-10 w-56 h-56 rounded-full bg-gradient-to-r from-[#66c2c2] to-[#3b8686] opacity-14 blur-3xl" aria-hidden="true" />
          {/* Decorative accent stripe (left) */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#39bfc4] to-[#0e9aa7] rounded-l-3xl opacity-80" aria-hidden="true" />

          {/* Header row: logo left, centered title (responsive), badge right on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center mb-4">
            <div className="flex items-center md:justify-start justify-center">
              <img src={Logo} alt="SR Emergency Logo" className="w-20 h-20 object-contain" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#0e9aa7] tracking-tight">SR EMERGENCY</h3>
              <p className="mt-1 text-sm text-gray-600">Appointment Form</p>
            </div>
            <div className="hidden md:block" />
          </div>

          {/* subtle divider */}
          <div className="h-px bg-white/30 my-4 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Full Name</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0e9aa7]" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-transparent rounded-xl bg-white/80 text-gray-900 placeholder-gray-500 transition shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0e9aa7]/60"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Email Address</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0e9aa7]" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 8.5l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 19H3V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-transparent rounded-xl bg-white/80 text-gray-900 placeholder-gray-500 transition shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0e9aa7]/60"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Phone Number</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0e9aa7]" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.93.38 1.84.78 2.7a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l1.38-1.38a2 2 0 0 1 2.11-.45c.86.4 1.77.66 2.7.78A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-transparent rounded-xl bg-white/80 text-gray-900 placeholder-gray-500 transition shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0e9aa7]/60"
                  required
                />
              </div>
            </div>

            {/* Department */}
            <div>
              <label htmlFor="department" className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Department</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0e9aa7]" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 7v10a2 2 0 0 0 2 2h14V5H5a2 2 0 0 0-2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-transparent rounded-xl bg-white/80 text-gray-900 placeholder-gray-500 transition shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0e9aa7]/60"
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
            </div>

            {/* Preferred Date */}
            <div className="md:col-span-2">
              <label htmlFor="date" className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Preferred Date</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0e9aa7]" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-transparent rounded-xl bg-white/80 text-gray-900 placeholder-gray-500 transition shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0e9aa7]/60"
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Message (Optional)</label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full pl-4 pr-4 py-3 border border-transparent rounded-xl bg-white/80 text-gray-900 placeholder-gray-500 transition shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0e9aa7]/60"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-8">
            <button
              type="submit"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-lg font-semibold text-white shadow-2xl bg-gradient-to-r from-[#39bfc4] to-[#0e9aa7] hover:from-[#0e9aa7] hover:to-[#399fa8] transform hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-[#0e9aa7]/60"
            >
              <span>Submit Request</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          {/* Form Status Message */}
          <div id="form-status" className="text-center mt-4 h-6 text-success">
            {status}
          </div>

          {/* small contact hint */}
          <div className="text-center mt-3 text-sm text-gray-600">
            Prefer speaking to someone? Call our helpline anytime.
          </div>
        </form>
      </div>
    </section>
  );
};

export default Appointment;
