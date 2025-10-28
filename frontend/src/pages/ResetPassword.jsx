
import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { AppContext } from "../context/AppContext";
import { Lock, Mail } from "lucide-react";

const ResetPassword = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [resending, setResending] = useState(false);
  const [email, setEmail] = useState("");
  const otpRef = useRef();
  const passwordRef = useRef();
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      if (!isOtpSent) {
        const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
        if (data.success) {
          toast.success('OTP sent to your email!');
          setIsOtpSent(true);
          setSecondsLeft(60);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, {
          email,
          otp: otpRef.current.value,
          newPassword: passwordRef.current.value
        });
        if (data.success) {
          toast.success('Password reset successfully!');
          navigate('/login');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // countdown timer for resend
  React.useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  const handleResend = async () => {
    if (secondsLeft > 0 || resending) return;
    try {
      setResending(true);
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
      if (data.success) {
        toast.success(data.message || 'OTP resent');
        setSecondsLeft(60);
      } else {
        toast.error(data.message || 'Failed to resend OTP');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#3b8686]/30 via-[#0e9aa7]/20 to-[#66c2c2]/30 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-12 relative z-10 border border-gray-100">
        <div className="flex flex-col items-center mb-6">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#399fa8]/10 mb-2">
            <Lock className="w-10 h-10 text-[#399fa8]" />
          </span>
          <h2 className="text-3xl font-extrabold text-[#399fa8] mb-1 tracking-tight">
            {!isOtpSent ? "Reset Password" : "Enter OTP"}
          </h2>
          <p className="text-gray-500 text-center text-base">
            {!isOtpSent ? "We will send you an OTP on your email" : "Enter the OTP sent to your email"}
          </p>
        </div>
        <form onSubmit={onSubmitHandler} className="space-y-5">
          {!isOtpSent ? (
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#399fa8] w-5 h-5" />
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                placeholder="Email Address"
                className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-200 focus:border-[#399fa8] focus:ring-2 focus:ring-[#399fa8]/20 bg-gray-50 text-gray-900 placeholder-gray-400 transition"
                required
              />
            </div>
          ) : (
            <>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#399fa8] w-5 h-5" />
                <input
                  ref={otpRef}
                  type="text"
                  placeholder="OTP"
                  className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-200 focus:border-[#399fa8] focus:ring-2 focus:ring-[#399fa8]/20 bg-gray-50 text-gray-900 placeholder-gray-400 transition mb-3"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#399fa8] w-5 h-5" />
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="New Password"
                  className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-200 focus:border-[#399fa8] focus:ring-2 focus:ring-[#399fa8]/20 bg-gray-50 text-gray-900 placeholder-gray-400 transition"
                  required
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={secondsLeft > 0 || resending}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold shadow-md transition ${secondsLeft > 0 || resending ? 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-600 border border-gray-200' : 'bg-gradient-to-r from-[#399fa8] to-[#0e9aa7] text-white hover:from-[#0e9aa7] hover:to-[#399fa8]'}`}
                >
                  {resending ? 'Sending...' : (secondsLeft > 0 ? `Resend OTP in ${Math.floor(secondsLeft/60)}:${(secondsLeft%60).toString().padStart(2,'0')}` : 'Resend OTP')}
                </button>
              </div>
            </>
          )}
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#399fa8] to-[#0e9aa7] text-white font-bold text-lg shadow-md hover:from-[#0e9aa7] hover:to-[#399fa8] transition">
            {!isOtpSent ? "Send OTP" : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
