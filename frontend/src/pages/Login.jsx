import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { AppContext } from "../context/AppContext";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import Logo from "../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, isLoggedIn, setIsLoggedIn, getUserData, logout } = useContext(AppContext);
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // admin credentials (from Vite env if provided)
  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'Admin123';

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      axios.defaults.withCredentials = true;
      if (state === "Sign Up") {
        // validate confirm password matches
        if (password !== confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, { name, email, password });
          if (data.success) {
          // Send OTP email after registration
          try {
            await axios.post(`${backendUrl}/api/auth/send-verify-otp`);
            axios.post(`${backendUrl}/api/users/delete-unverified-user`);
            toast.success("Registered! Please check your email for OTP and verify within 5 minutes.");
          } catch (otpError) {
            toast.error("Registered, but failed to send OTP email.");
          }
          getUserData();
          // navigate to verify page and indicate coming from registration so timer starts
          navigate("/verify-email?from=register");
          // clear confirm password after successful registration
          setConfirmPassword("");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
        if (data.success) {
            if (typeof data.isAdmin !== 'undefined' && data.isAdmin === true) {
              toast.success('Admin login successful');
              await getUserData();
              try { sessionStorage.setItem('isAdmin', 'true'); } catch (e) {}
              navigate('/admin');
              return;
            }
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
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    try {
      const action = state === 'Sign Up' ? 'signup' : 'login';
      const url = `${backendUrl}/api/auth/google?popup=1&action=${action}`;
      const width = 600;
      const height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2.5;
      const popup = window.open(url, 'google_oauth', `width=${width},height=${height},left=${left},top=${top}`);

      const handleMessage = async (event) => {
        // if (event.origin !== window.location.origin && event.origin !== "http://localhost:5173") return;
        try {
          if (!event.data) return;
          if (event.data.success) {
            toast.success(event.data.message);
            if(event.data.user.isAccountVerified){
              if (popup) popup.close();
              getUserData();
              navigate('/');
            }
            else{
              if (popup) popup.close();
              try {
                await axios.post(`${backendUrl}/api/auth/send-verify-otp`);
                toast.success("Verify you email for login. Please check your email for OTP.");
              } catch (otpError) {
                toast.error("Failed to send OTP for email verification.");
              }
              navigate("/verify-email");
            }
          } else {
            // show error/message from popup
            const msg = event.data.message || 'Google authentication failed';
            toast.error(msg);
            if (popup) popup.close();
          }
        } finally {
          window.removeEventListener('message', handleMessage);
        }
      };

      window.addEventListener('message', handleMessage);

      // Cleanup if user closes popup without completing
      const checkClosed = setInterval(() => {
        if (!popup) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
          return;
        }
        try {
          // Accessing popup.closed can throw under certain COOP/CORS configurations, so guard it.
          if (popup.closed) {
            clearInterval(checkClosed);
            window.removeEventListener('message', handleMessage);
          }
        } catch (err) {
          // If we can't access popup.closed, assume popup is unavailable/closed and cleanup.
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
        }
      }, 500);
    } catch (err) {
      toast.error('Unable to open Google login');
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-[#3b8686]/30 via-[#0e9aa7]/20 to-[#66c2c2]/30 px-4">
      {isLoggedIn && 
      navigate('/')}
      {!isLoggedIn && ( 
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
          {state === "Sign Up" && (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#399fa8] w-5 h-5" />
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-200 focus:border-[#399fa8] focus:ring-2 focus:ring-[#399fa8]/20 bg-gray-50 text-gray-900 placeholder-gray-400 transition"
                required
              />
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
          )}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-linear-to-r from-[hsl(185,49%,44%)] to-[hsl(185,85%,35%)] text-white font-bold text-lg shadow-md hover:from-[hsl(185,85%,34%)] hover:to-[hsl(185,49%,28%)] transition hover:cursor-pointer"
            >
              {state === "Sign Up" ? "Sign Up" : "Login"}
            </button>
          </div>
        </form>

        {/* Divider with OR between form and social login */}
        <div className="flex items-center gap-3 mt-6">
          <hr className="flex-1 border-t border-gray-200" />
          <span className="text-sm text-gray-400 font-medium">OR</span>
          <hr className="flex-1 border-t border-gray-200" />
        </div>

        <div className="flex items-center justify-center mt-4">
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full py-3 rounded-xl border border-gray-200 flex items-center justify-center gap-3 hover:shadow-md transition"
          >
            {/* Inline Google logo SVG (keeps bundle small and avoids adding new asset files) */}
            <svg className="w-6 h-6" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path fill="#4285F4" d="M533.5 278.4c0-18.8-1.6-37-4.7-54.6H272.1v103.3h147.1c-6.3 34-25.6 62.8-54.6 82v68.1h87.9c51.3-47.2 82-116.8 82-198.8z"/>
              <path fill="#34A853" d="M272.1 544.3c73.7 0 135.6-24.4 180.8-66.1l-87.9-68.1c-24.4 16.4-55.6 26-92.9 26-71.5 0-132.2-48.3-153.9-113.1H28.9v70.9C74.1 484.3 167.9 544.3 272.1 544.3z"/>
              <path fill="#FBBC05" d="M118.2 323.0c-10.9-32.6-10.9-67.6 0-100.2V151.9H28.9c-39.6 77.3-39.6 169.8 0 247.1l89.3-76.0z"/>
              <path fill="#EA4335" d="M272.1 107.7c39.9-.6 78.5 14.5 108 42.9l80.9-80.9C407.6 25.8 344.6 0 272.1 0 167.9 0 74.1 60 28.9 151.9l89.3 70.9c21.7-64.8 82.4-113.1 153.9-115.1z"/>
            </svg>
            <span className="text-sm font-medium">Continue with Google</span>
          </button>
        </div>
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
      </div> )}
    </div>
  );
};

export default Login;
