import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  UserCheck,
  Activity,
  Trash2,
  UserPlus,
  Menu,
  X,
  CalendarDays,
  Mail,
  Phone,
} from "lucide-react";

// Backend base URL
const API_BASE = import.meta.env.VITE_API_BASE || "";

// Patient Add Modal (persists to backend)
const PatientLogin = ({ onClose, onPatientAdded }) => {
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    email: "",
    department: "Cardiology",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handlePatientLogin = async () => {
    setErr("");
    if (!patientData.name || !patientData.age || !patientData.email) {
      setErr("Please fill name, age and email");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/patients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: patientData.name,
          age: Number(patientData.age),
          email: patientData.email,
          department: patientData.department,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to add patient");
      onPatientAdded?.();
      onClose();
    } catch (e) {
      setErr(e.message || "Failed to add patient");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-4 md:p-6 w-full max-w-md max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Add Patient
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-3 md:space-y-4">
          {err && <div className="bg-red-50 text-red-600 p-2 rounded">{err}</div>}
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
              Patient Name
            </label>
            <input
              type="text"
              value={patientData.name}
              onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
              placeholder="Enter patient name"
            />
          </div>

          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              value={patientData.age}
              onChange={(e) => setPatientData({ ...patientData, age: e.target.value })}
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
              placeholder="Enter age"
            />
          </div>

          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={patientData.email}
              onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <select
              value={patientData.department}
              onChange={(e) => setPatientData({ ...patientData, department: e.target.value })}
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
            >
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Emergency">Emergency</option>
              <option value="General Medicine">General Medicine</option>
            </select>
          </div>

          <button
            onClick={handlePatientLogin}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-sm md:text-base disabled:opacity-60"
          >
            {loading ? "Saving..." : "Add Patient"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Login Component (unchanged demo)
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState(import.meta.env.VITE_ADMIN_EMAIL || "");
  const [password, setPassword] = useState(import.meta.env.VITE_ADMIN_PASSWORD || "");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (email && password) {
      sessionStorage.setItem("isAdmin", "true");
      onLogin();
    } else {
      setError("Enter email and password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Hospital Admin</h1>
          <p className="text-gray-600 mt-2">Management System</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="admin@hospital.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter password"
            />
          </div>

          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}

          <button onClick={handleSubmit} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
            Login
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo Credentials:</p>
          <p className="font-mono mt-1">admin@hospital.com / Admin123</p>
        </div>
      </div>
    </div>
  );
};

// Dashboard with real API for Patients/Staff
const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [staff, setStaff] = useState([]);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [showPatientLogin, setShowPatientLogin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    role: "Doctor",
    department: "",
    contact: "",
  });

  // Appointments state (already calling your backend)
  const [appointments, setAppointments] = useState([]);
  const [apptMeta, setApptMeta] = useState({ page: 1, pages: 1, total: 0, limit: 20 });
  const [apptLoading, setApptLoading] = useState(true);
  const [apptError, setApptError] = useState("");
  const [apptSort, setApptSort] = useState("-createdAt");

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    loadAppointments(1, apptMeta.limit || 20, apptSort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apptSort]);

  const refreshData = async () => {
    await Promise.all([loadPatients(), loadStaff()]);
    loadAppointments(1, 20, apptSort);
  };

  // Patients API
  async function loadPatients() {
    try {
      const res = await fetch(`${API_BASE}/api/patients`, { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to load patients");
      setPatients(data || []);
    } catch (e) {
      console.error(e);
      setPatients([]);
    }
  }

  async function deletePatient(id) {
    if (!window.confirm("Are you sure you want to remove this patient?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/patients/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to delete patient");
      await loadPatients();
    } catch (e) {
      alert(e.message || "Failed to delete patient");
    }
  }

  // Staff API
  async function loadStaff() {
    try {
      const res = await fetch(`${API_BASE}/api/staff`, { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to load staff");
      setStaff(data || []);
    } catch (e) {
      console.error(e);
      setStaff([]);
    }
  }

  async function addStaff() {
    if (!newStaff.name || !newStaff.department || !newStaff.contact) {
      alert("Please fill name, department and contact");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/staff`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newStaff),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to add staff");
      setNewStaff({ name: "", role: "Doctor", department: "", contact: "" });
      setShowAddStaff(false);
      await loadStaff();
    } catch (e) {
      alert(e.message || "Failed to add staff");
    }
  }

  async function deleteStaff(id) {
    if (!window.confirm("Are you sure you want to delete this staff member?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/staff/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to delete staff");
      await loadStaff();
    } catch (e) {
      alert(e.message || "Failed to delete staff");
    }
  }

  // Appointments API (unchanged)
  async function loadAppointments(page = 1, limit = 20, sort = "-createdAt") {
    setApptLoading(true);
    setApptError("");
    try {
      const q = new URLSearchParams({ page: String(page), limit: String(limit), sort });
      const res = await fetch(`${API_BASE}/api/appointments?${q.toString()}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to load appointments");
      setAppointments(data.data || []);
      setApptMeta(data.meta || { page, limit, pages: 1, total: (data.data || []).length });
    } catch (err) {
      setApptError(err.message || "Failed to load appointments");
    } finally {
      setApptLoading(false);
    }
  }

  async function updateAppointmentStatus(id, status) {
    try {
      const res = await fetch(`${API_BASE}/api/appointments/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to update status");
      await loadAppointments(apptMeta.page || 1, apptMeta.limit || 20, apptSort);
    } catch (err) {
      alert(err.message || "Failed to update status");
    }
  }

  const totalPatients = patients.length;
  const totalStaff = staff.length;
  const activeUsers = totalPatients + totalStaff;

  const deptData = patients.reduce((acc, p) => {
    acc[p.department || "-"] = (acc[p.department || "-"] || 0) + 1;
    return acc;
  }, {});
  const chartData = Object.entries(deptData).map(([name, patients]) => ({ name, patients }));

  const roleData = staff.reduce((acc, s) => {
    acc[s.role || "-"] = (acc[s.role || "-"] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.entries(roleData).map(([name, value]) => ({ name, value }));
  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <div className="flex h-screen bg-gray-100">
      {showPatientLogin && (
        <PatientLogin
          onClose={() => setShowPatientLogin(false)}
          onPatientAdded={loadPatients}
        />
      )}

      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="bg-indigo-900 text-white w-64 h-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Activity size={32} />
                  <h2 className="text-xl font-bold">Hospital Admin</h2>
                </div>
                <button onClick={() => setSidebarOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <nav className="space-y-2">
                <a href="#overview" onClick={() => setSidebarOpen(false)} className="block px-4 py-3 bg-indigo-800 rounded-lg">
                  Dashboard
                </a>
                <a href="#appointments" onClick={() => setSidebarOpen(false)} className="block px-4 py-3 hover:bg-indigo-800 rounded-lg transition-colors">
                  Appointments
                </a>
                <a href="#patients" onClick={() => setSidebarOpen(false)} className="block px-4 py-3 hover:bg-indigo-800 rounded-lg transition-colors">
                  Patients
                </a>
                <a href="#staff" onClick={() => setSidebarOpen(false)} className="block px-4 py-3 hover:bg-indigo-800 rounded-lg transition-colors">
                  Staff
                </a>
              </nav>
            </div>
          </div>
        </div>
      )}

      <div className="hidden md:block w-64 bg-gradient-to-r from-[#399fa8] to-[#0e9aa7] text-white">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <Activity size={32} />
            <h2 className="text-xl font-bold">Hospital Admin</h2>
          </div>

          <nav className="space-y-2">
            <a href="#overview" className="block px-4 py-3 bg-indigo-100 text-black rounded-lg">
              Dashboard
            </a>
            <a href="#appointments" className="block px-4 py-3 hover:bg-indigo-100 hover:text-black rounded-lg transition-colors">
              Appointments
            </a>
            <a href="#patients" className="block px-4 py-3 hover:bg-indigo-100 hover:text-black rounded-lg transition-colors">
              Patients
            </a>
            <a href="#staff" className="block px-4 py-3 hover:bg-indigo-100 hover:text-black rounded-lg transition-colors">
              Staff
            </a>
          </nav>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 md:px-6 py-4">
            <div className="flex items-center gap-2 md:gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600 hover:text-gray-900 md:hidden">
                <Menu size={24} />
              </button>
              <h1 className="text-lg md:text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div id="overview" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs md:text-sm">Patients Added</p>
                  <p className="text-2xl md:text-3xl font-bold text-indigo-600 mt-2">{patients.length}</p>
                </div>
                <div className="bg-indigo-100 p-3 md:p-4 rounded-full">
                  <UserCheck className="text-indigo-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs md:text-sm">Total Staff</p>
                  <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2">{staff.length}</p>
                </div>
                <div className="bg-green-100 p-3 md:p-4 rounded-full">
                  <Users className="text-green-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl shadow-md sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs md:text-sm">Active Users</p>
                  <p className="text-2xl md:text-3xl font-bold text-purple-600 mt-2">{patients.length + staff.length}</p>
                </div>
                <div className="bg-purple-100 p-3 md:p-4 rounded-full">
                  <Activity className="text-purple-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Appointments Section (unchanged logic) */}
          <div id="appointments" className="bg-white rounded-xl shadow-md mb-6 md:mb-8">
            <div className="p-4 md:p-6 border-b flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h2 className="text-lg md:text-xl font-bold">Appointments</h2>
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600">
                  Sort:
                  <select
                    value={apptSort}
                    onChange={(e) => setApptSort(e.target.value)}
                    className="ml-2 px-2 py-1 border rounded-md"
                  >
                    <option value="-createdAt">Newest</option>
                    <option value="createdAt">Oldest</option>
                    <option value="-appointmentDate">Appointment Date (desc)</option>
                    <option value="appointmentDate">Appointment Date (asc)</option>
                  </select>
                </label>
              </div>
            </div>

            {apptLoading ? (
              <div className="p-6 text-gray-500">Loading...</div>
            ) : apptError ? (
              <div className="p-6 text-red-600">Error: {apptError}</div>
            ) : appointments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Email</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Phone</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date/Time</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {appointments.map((a) => (
                      <tr key={a._id} className="hover:bg-gray-50">
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap font-medium text-sm">{a.patientName}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm hidden md:table-cell">
                          <a className="text-indigo-600 hover:underline inline-flex items-center gap-1" href={`mailto:${a.email}`}>
                            <Mail className="w-4 h-4" /> {a.email}
                          </a>
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm hidden lg:table-cell">
                          <a className="text-indigo-600 hover:underline inline-flex items-center gap-1" href={`tel:${a.phone}`}>
                            <Phone className="w-4 h-4" /> {a.phone}
                          </a>
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm">
                          <span className="inline-flex items-center gap-1">
                            <CalendarDays className="w-4 h-4 text-gray-500" />
                            {new Date(a.appointmentDate).toLocaleString()}
                          </span>
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                          <span className="px-2 md:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {a.department || "-"}
                          </span>
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 md:px-3 py-1 rounded-full text-xs capitalize ${
                              a.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : a.status === "cancelled"
                                ? "bg-red-100 text-red-800"
                                : a.status === "completed"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {a.status}
                          </span>
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                          <select
                            value={a.status}
                            onChange={(e) => updateAppointmentStatus(a._id, e.target.value)}
                            className="px-2 py-1 border rounded-md text-sm"
                          >
                            {["pending", "confirmed", "cancelled", "completed"].map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex items-center gap-2 p-4">
                  <button
                    disabled={(apptMeta.page || 1) <= 1}
                    onClick={() => loadAppointments((apptMeta.page || 1) - 1, apptMeta.limit || 20, apptSort)}
                    className="px-3 py-1 border rounded-md disabled:opacity-60"
                  >
                    Prev
                  </button>
                  <span className="text-sm">Page {apptMeta.page || 1} of {apptMeta.pages || 1}</span>
                  <button
                    disabled={(apptMeta.page || 1) >= (apptMeta.pages || 1)}
                    onClick={() => loadAppointments((apptMeta.page || 1) + 1, apptMeta.limit || 20, apptSort)}
                    className="px-3 py-1 border rounded-md disabled:opacity-60"
                  >
                    Next
                  </button>
                  <span className="ml-auto text-sm">
                    Total: <strong>{apptMeta.total || appointments.length}</strong>
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-8 md:p-12 text-center text-gray-500">
                <CalendarDays size={40} className="mx-auto mb-4 opacity-50 md:w-12 md:h-12" />
                <p className="text-base md:text-lg">No appointments yet</p>
                <p className="text-xs md:text-sm mt-2">Appointments booked from the website will appear here</p>
              </div>
            )}
          </div>

          {(chartData.length > 0 || pieData.length > 0) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              {chartData.length > 0 && (
                <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
                  <h3 className="text-base md:text-lg font-semibold mb-4">Patients by Department</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="patients" fill="#4F46E5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {pieData.length > 0 && (
                <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
                  <h3 className="text-base md:text-lg font-semibold mb-4">Staff Distribution</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          )}

          {/* Patients */}
          <div id="patients" className="bg-white rounded-xl shadow-md mb-6 md:mb-8">
            <div className="p-4 md:p-6 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h2 className="text-lg md:text-xl font-bold">Currently Added Patients</h2>
              <button
                onClick={() => setShowPatientLogin(true)}
                className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm md:text-base"
              >
                <UserPlus size={18} className="md:w-5 md:h-5" />
                <span className="hidden sm:inline">Patient</span>
              </button>
            </div>

            {patients.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Age</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Email</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Login Time</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {patients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-gray-50">
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap font-medium text-sm">{patient.name}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm hidden sm:table-cell">{patient.age ?? "-"}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm hidden md:table-cell">{patient.email || "-"}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                          <span className="px-2 md:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{patient.department || "-"}</span>
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-gray-600 text-sm hidden lg:table-cell">{patient.loginTime || "-"}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => deletePatient(patient.id)}
                            className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-xs md:text-sm"
                          >
                            <Trash2 size={14} className="md:w-4 md:h-4" />
                            <span className="hidden sm:inline">Remove</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 md:p-12 text-center text-gray-500">
                <UserCheck size={40} className="mx-auto mb-4 opacity-50 md:w-12 md:h-12" />
                <p className="text-base md:text-lg">No patients currently added</p>
                <p className="text-xs md:text-sm mt-2">Click "Patient" to add new patients</p>
              </div>
            )}
          </div>

          {/* Staff */}
          <div id="staff" className="bg-white rounded-xl shadow-md">
            <div className="p-4 md:p-6 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h2 className="text-lg md:text-xl font-bold">Staff Management</h2>
              <button
                onClick={() => setShowAddStaff(!showAddStaff)}
                className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-[#399fa8] to-[#0e9aa7] text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm md:text-base w-full sm:w-auto justify-center"
              >
                <UserPlus size={18} className="md:w-5 md:h-5" />
                Add Staff
              </button>
            </div>

            {showAddStaff && (
              <div className="p-4 md:p-6 bg-gray-50 border-b">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                    className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base"
                  />
                  <select
                    value={newStaff.role}
                    onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                    className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base"
                  >
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Technician">Technician</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Department"
                    value={newStaff.department}
                    onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                    className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base"
                  />
                  <input
                    type="tel"
                    placeholder="Contact"
                    value={newStaff.contact}
                    onChange={(e) => setNewStaff({ ...newStaff, contact: e.target.value })}
                    className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base"
                  />
                  <button
                    onClick={addStaff}
                    className="md:col-span-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm md:text-base"
                  >
                    Add Staff Member
                  </button>
                </div>
              </div>
            )}

            {staff.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Department</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Contact</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {staff.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50">
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap font-medium text-sm">{member.name}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 md:px-3 py-1 rounded-full text-xs ${
                              member.role === "Doctor"
                                ? "bg-purple-100 text-purple-800"
                                : member.role === "Nurse"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {member.role}
                          </span>
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm hidden sm:table-cell">{member.department}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm hidden md:table-cell">{member.contact}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => deleteStaff(member.id)}
                            className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-xs md:text-sm"
                          >
                            <Trash2 size={14} className="md:w-4 md:h-4" />
                            <span className="hidden sm:inline">Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 md:p-12 text-center text-gray-500">
                <Users size={40} className="mx-auto mb-4 opacity-50 md:w-12 md:h-12" />
                <p className="text-base md:text-lg">No staff members added yet</p>
                <p className="text-xs md:text-sm mt-2">Click "Add Staff" button to add staff members</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default function HospitalAdminApp() {
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return sessionStorage.getItem("isAdmin") === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!isAdmin) navigate("/");
  }, [isAdmin, navigate]);

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("isAdmin");
    } catch {}
    setIsAdmin(false);
    navigate("/");
  };

  if (!isAdmin) return null;
  return <Dashboard onLogout={handleLogout} />;
}