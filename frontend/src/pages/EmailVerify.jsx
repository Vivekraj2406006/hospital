import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const EmailVerify = () => {
  const [otp, setOtp] = useState('');
  const { backendUrl, getUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, { otp });
      if (data.success) {
        toast.success('Email verified successfully!');
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-[#3b8686]/30 via-[#0e9aa7]/20 to-[#66c2c2]/30">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-12 relative z-10 border border-gray-100">
        <div className="flex flex-col items-center mb-6">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#399fa8]/10 mb-2">
            {/* You can add a hospital icon here if available */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#399fa8" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </span>
          <h2 className="text-3xl font-extrabold text-[#399fa8] mb-1 tracking-tight">Verify Email</h2>
          <p className="text-gray-500 text-center text-base">We have sent an OTP to your email. Please enter it below to verify your account.</p>
        </div>
        <form onSubmit={onSubmitHandler} className="space-y-5">
          <div className="relative">
            <input
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              type="text"
              placeholder="Enter OTP"
              className="pl-4 pr-4 py-3 w-full rounded-xl border border-gray-200 focus:border-[#399fa8] focus:ring-2 focus:ring-[#399fa8]/20 bg-gray-50 text-gray-900 placeholder-gray-400 transition"
              required
            />
          </div>
          <button className="w-full py-3 rounded-full bg-[#399fa8] text-white font-semibold shadow-lg hover:bg-[#2b7a78] transition">Verify</button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerify;
