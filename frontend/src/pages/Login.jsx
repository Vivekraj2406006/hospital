import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { AppContext } from "../context/AppContext";
import Logo from "../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, isLoggedIn, getUserData } = useContext(AppContext);
  const [state, setState] = useState("Login");

  // refs to hold popup and interval id so we can clean up from effects
  const popupRef = useRef(null);
  const intervalRef = useRef(null);
  const messageListenerRef = useRef(null);

  useEffect(() => {
    // redirect in effect instead of during render
    if (isLoggedIn) {
      navigate('/');
    }
    // cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (messageListenerRef.current) {
        window.removeEventListener('message', messageListenerRef.current);
      }
      try {
        if (popupRef.current && !popupRef.current.closed) popupRef.current.close();
      } catch (e) { /* ignore */ }
    };
  }, [isLoggedIn, navigate]);

  const handleGoogleLogin = () => {
    try {
      const action = state === 'Sign Up' ? 'signup' : 'login';
      const url = `${backendUrl}/api/auth/google?popup=1&action=${action}`;

      // Expected origin for postMessage validation: use your frontend origin.
      // In dev this will typically be window.location.origin. If your server uses a different FRONTEND_URL
      // make sure backend uses the same origin when calling postMessage.
      const expectedOrigin = backendUrl;

      // message handler (do NOT remove listener unconditionally)
      const handleMessage = async (event) => {
        // Validate origin first
        if (event.origin !== expectedOrigin) return;

        const data = event.data || {};
        // Only handle messages with the expected shape
        if (typeof data !== 'object' || (!data.success && !data.message)) return;

        // Remove listener once we handled a meaningful message
        window.removeEventListener('message', handleMessage);
        messageListenerRef.current = null;

        // Close popup if still open
        try { if (popupRef.current && !popupRef.current.closed) popupRef.current.close(); } catch (e) {}

        if (data.success) {
          toast.success(data.message || 'Logged in');
          // refresh user data, then navigate
          try { await getUserData(); } catch (e) { /* ignore */ }
          navigate('/');
        } else {
          // show error/message from popup
          const msg = data.message || 'Google authentication failed';
          toast.error(msg);
        }
      };

      // Register listener BEFORE opening popup to avoid a race.
      window.addEventListener('message', handleMessage, false);
      messageListenerRef.current = handleMessage;

      // Open popup
      const width = 600;
      const height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2.5;
      const popup = window.open(url, 'google_oauth', `width=${width},height=${height},left=${left},top=${top}`);
      popupRef.current = popup;

      if (!popup) {
        // popup blocked
        window.removeEventListener('message', handleMessage);
        messageListenerRef.current = null;
        toast.error('Popup blocked. Please allow popups for this site.');
        return;
      }

      // Poll popup closed state; if it closes without posting a message, clean up listener
      intervalRef.current = setInterval(() => {
        try {
          if (!popupRef.current || popupRef.current.closed) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            if (messageListenerRef.current) {
              window.removeEventListener('message', messageListenerRef.current);
              messageListenerRef.current = null;
            }
          }
        } catch (err) {
          // Access may be blocked by COOP when cross-origin; treat as closed
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          if (messageListenerRef.current) {
            window.removeEventListener('message', messageListenerRef.current);
            messageListenerRef.current = null;
          }
        }
      }, 500);
    } catch (err) {
      console.error(err);
      toast.error('Unable to open Google login');
      // ensure cleanup
      if (messageListenerRef.current) {
        window.removeEventListener('message', messageListenerRef.current);
        messageListenerRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#3b8686]/30 via-[#0e9aa7]/20 to-[#66c2c2]/30 px-4">
      {!isLoggedIn && (
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-12 relative z-10 border border-gray-100">
          <div className="flex flex-col items-center mb-10">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#399fa8]/10 mb-4">
              <img src={Logo} alt="SR Emergency Logo" className="w-16 h-16 object-contain" />
            </span>
            <h2 className="text-3xl font-extrabold text-[#399fa8] mb-2 tracking-tight">
              {state === "Sign Up" ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-500 text-center text-base">
              {state === "Sign Up" ? "Join SR EMERGENCY Hospital" : "Login to your SR EMERGENCY account"}
            </p>
          </div>

          <div className="flex items-center justify-center mt-4">
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full py-4 rounded-xl border border-gray-200 flex items-center justify-center gap-3 hover:shadow-md transition bg-white hover:bg-gray-50 cursor-pointer"
            >
              <svg className="w-6 h-6" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fill="#4285F4" d="M533.5 278.4c0-18.8-1.6-37-4.7-54.6H272.1v103.3h147.1c-6.3 34-25.6 62.8-54.6 82v68.1h87.9c51.3-47.2 82-116.8 82-198.8z"/>
                <path fill="#34A853" d="M272.1 544.3c73.7 0 135.6-24.4 180.8-66.1l-87.9-68.1c-24.4 16.4-55.6 26-92.9 26-71.5 0-132.2-48.3-153.9-113.1H28.9v70.9C74.1 484.3 167.9 544.3 272.1 544.3z"/>
                <path fill="#FBBC05" d="M118.2 323.0c-10.9-32.6-10.9-67.6 0-100.2V151.9H28.9c-39.6 77.3-39.6 169.8 0 247.1l89.3-76.0z"/>
                <path fill="#EA4335" d="M272.1 107.7c39.9-.6 78.5 14.5 108 42.9l80.9-80.9C407.6 25.8 344.6 0 272.1 0 167.9 0 74.1 60 28.9 151.9l89.3 70.9c21.7-64.8 82.4-113.1 153.9-115.1z"/>
              </svg>
              <span className="text-lg font-medium text-gray-700">
                {state === "Sign Up" ? "Sign up with Google" : "Login with Google"}
              </span>
            </button>
          </div>

          <div className="flex flex-col items-center mt-6">
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

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <button
              onClick={() => navigate('/admin')}
              className="w-full py-3 rounded-xl border border-[#399fa8] text-[#399fa8] font-semibold hover:bg-[#399fa8] hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Admin Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
