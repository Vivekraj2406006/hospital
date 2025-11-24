// import Logo from "../assets/logo.png";
// import React, { useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { AppContext } from '../context/AppContext';

// const EmailVerify = () => {
//   const [otp, setOtp] = useState('');
//   const { backendUrl, user, getUserData } = useContext(AppContext);
//   const navigate = useNavigate();

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     // trim and validate OTP
//     const trimmedOtp = otp.trim();
//     if (!trimmedOtp || trimmedOtp.length < 4) {
//       toast.error('Please enter a valid OTP.');
//       return;
//     }
//     setOtp(trimmedOtp);

//     if(user){
//       try {
//         axios.defaults.withCredentials = true;
//         const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, { otp });
//         if (data.success) {
//           toast.success('Email verified successfully!');
//           getUserData();
//           navigate('/');
//         } else {
//           toast.error(data.message);
//         }
//       } catch (error) {
//         toast.error(error.response?.data?.message || error.message);
//       }
//     }
//     else{
//       navigate('/');
//       toast.error("Sorry but 5 minutes have passed but the email is not verified. Please sign up again.");
//     }
//   };

//   const [secondsLeft, setSecondsLeft] = useState(0);
//   const [resending, setResending] = useState(false);

//   useEffect(() => {
//     if (secondsLeft <= 0) return;
//     const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
//     return () => clearTimeout(t);
//   }, [secondsLeft]);

//   // Auto-start timer when arriving from Google signup via query param ?from=google
//   useEffect(() => {
//     try {
//       const params = new URLSearchParams(window.location.search);
//       // auto-start timer when redirected from signup flows (google/register)
//       if (params.get('from')) {
//         setSecondsLeft(60);
//       }
//     } catch (e) {
//       // ignore
//     }
//   }, []);

//   const handleResend = async () => {
//     if (secondsLeft > 0 || resending) return;
//     try {
//       setResending(true);
//       axios.defaults.withCredentials = true;
//       const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`);
//       if (data.success) {
//         toast.success(data.message || 'OTP sent');
//         setSecondsLeft(60);
//       } else {
//         toast.error(data.message || 'Failed to send OTP');
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     } finally {
//       setResending(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen px-4 bg-linear-to-br from-[#3b8686]/30 via-[#0e9aa7]/20 to-[#66c2c2]/30">
//       <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-12 relative z-10 border border-gray-100">
//         <div className="flex flex-col items-center mb-6">
//           <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#399fa8]/10 mb-2">
//             <img src={Logo} alt="SR Emergency Logo" className="w-16 h-16 object-contain" />
//           </span>
//           <h2 className="text-3xl font-extrabold text-[#399fa8] mb-1 tracking-tight">Verify Email</h2>
//           <p className="text-gray-500 text-center text-base">We have sent an OTP to your email. Please enter it below to verify your account.</p>
//         </div>
//         <form onSubmit={onSubmitHandler} className="space-y-5">
//           <div className="relative">
//             <input
//               onChange={(e) => setOtp(e.target.value)}
//               value={otp}
//               type="text"
//               placeholder="Enter OTP"
//               className="pl-4 pr-4 py-3 w-full rounded-xl border border-gray-200 focus:border-[#399fa8] focus:ring-2 focus:ring-[#399fa8]/20 bg-gray-50 text-gray-900 placeholder-gray-400 transition"
//               required
//             />
//           </div>
//           <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#399fa8] to-[#0e9aa7] text-white font-bold text-lg shadow-md hover:from-[#0e9aa7] hover:to-[#399fa8] transition">Verify</button>
//         </form>
//         <div className="mt-4 flex flex-col items-center">
//           <button
//             onClick={handleResend}
//             disabled={secondsLeft > 0 || resending}
//             className={`mt-3 px-4 py-2 rounded-xl text-sm font-semibold shadow-md transition ${secondsLeft > 0 || resending ? 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-600 border border-gray-200' : 'bg-gradient-to-r from-[#399fa8] to-[#0e9aa7] text-white hover:from-[#0e9aa7] hover:to-[#399fa8]'}`}
//           >
//             {resending ? 'Sending...' : (
//               secondsLeft > 0 ? `Resend OTP in ${Math.floor(secondsLeft/60)}:${(secondsLeft%60).toString().padStart(2,'0')}` : 'Resend OTP'
//             )}
//           </button>
//           <p className="text-xs text-gray-500 mt-2">If you didn't receive the email, check your spam folder.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmailVerify;
