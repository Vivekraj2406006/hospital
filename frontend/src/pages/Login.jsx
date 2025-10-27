import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { AppContext } from "../context/AppContext";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import Logo from "../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // admin credentials (from Vite env if provided)
  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'Admin123';

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, { name, email, password });
        if (data.success) {
          // Send OTP email after registration
          try {
            await axios.post(`${backendUrl}/api/auth/send-verify-otp`);
            toast.success("Registered! Please check your email for OTP.");
          } catch (otpError) {
            toast.error("Registered, but failed to send OTP email.");
          }
          navigate("/verify-email");
        } else {
          toast.error(data.message);
        }
      } else {
        // quick admin demo bypass: if user enters demo admin credentials, go to admin app
        if ((email || '').trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          try { sessionStorage.setItem('isAdmin', 'true'); } catch (e) {}
          toast.success('Admin login successful');
          navigate('/');
          return;
        }
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
        if (data.success) {
            if (!data.user.isAccountVerified) {
            // Send OTP email after registration
            try {
              await axios.post(`${backendUrl}/api/auth/send-verify-otp`);
              toast.success("Verify you email for login. Please check your email for OTP.");
            } catch (otpError) {
              toast.error("Failed to send OTP for email verification.");
            }
            navigate("/verify-email");
            }
            else{
              getUserData();
              navigate('/');
            }
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-[#3b8686]/30 via-[#0e9aa7]/20 to-[#66c2c2]/30 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-12 relative z-10 border border-gray-100">
        <div className="flex flex-col items-center mb-6">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#399fa8]/10 mb-2">
            <img src={Logo} alt="SR Emergency Logo" className="w-16 h-16 object-contain" />
          </span>
          <h2 className="text-3xl font-extrabold text-[#399fa8] mb-1 tracking-tight">
            {state === "Sign Up" ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-500 text-center text-base">
            {state === "Sign Up" ? "Join SR EMERGENCY Hospital" : "Login to your SR EMERGENCY account"}
          </p>
        </div>
        <form onSubmit={onSubmitHandler} className="space-y-5">
          {state === "Sign Up" && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#399fa8] w-5 h-5" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-200 focus:border-[#399fa8] focus:ring-2 focus:ring-[#399fa8]/20 bg-gray-50 text-gray-900 placeholder-gray-400 transition"
                required
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#399fa8] w-5 h-5" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-200 focus:border-[#399fa8] focus:ring-2 focus:ring-[#399fa8]/20 bg-gray-50 text-gray-900 placeholder-gray-400 transition"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#399fa8] w-5 h-5" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-200 focus:border-[#399fa8] focus:ring-2 focus:ring-[#399fa8]/20 bg-gray-50 text-gray-900 placeholder-gray-400 transition"
              required
            />
            {/* Show/hide password toggle is present for both login and signup */}
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#399fa8]"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-linear-to-r from-[hsl(185,49%,44%)] to-[hsl(185,85%,35%)] text-white font-bold text-lg shadow-md hover:from-[hsl(185,85%,34%)] hover:to-[hsl(185,49%,28%)] transition hover:cursor-pointer"
            >
              {state === "Sign Up" ? "Sign Up" : "Login"}
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center mt-6">
          <button
            onClick={() => navigate("/reset-password")}
            className="text-[#399fa8] hover:underline text-sm font-medium mb-2 hover:cursor-pointer"
            type="button"
          >
            Forgot Password?
          </button>
          {state === "Sign Up" ? (
            <p className="text-gray-500 text-center text-sm">
              Already have an account?{' '}
              <span
                onClick={() => setState("Login")}
                className="text-[#399fa8] font-semibold cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-gray-500 text-center text-sm">
              Don&apos;t have an account?{' '}
              <span
                onClick={() => setState("Sign Up")}
                className="text-[#399fa8] font-semibold cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
