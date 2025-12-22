import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import AxiosInstance from "../utils/AxiosInstance";
import { useAuth } from "../AuthContext";

export default function OtpConformation() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const length = 6;
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputsRef = useRef([]);
  const [isDark, setIsDark] = useState(false);

  // Sync with global theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") === "dark";
    setIsDark(savedTheme);
  }, []);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!user || !user._id) {
        setMessage("User not found, please login again.");
        return;
      }

      const otpStr = Number(otp.join(""));
      const _id = user._id;

      const response = await AxiosInstance.post("/customer/otp", {
        _id,
        otp: otpStr,
      });

      const data = response.data.data;

      if (data.emailVerified) {
        navigate("/");
        return;
      } else {
        setMessage(data.message || "OTP verification failed.");
      }
    } catch (err) {
      console.log(err);
      setMessage(err.message || "Something went wrong.");
    }
  };

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, length);
    const pasteArray = pasteData.split("");

    if (pasteArray.every((char) => /^\d$/.test(char))) {
      const newOtp = new Array(length).fill("");
      pasteArray.forEach((char, i) => {
        if (i < length) newOtp[i] = char;
      });

      setOtp(newOtp);
      const nextIndex =
        pasteArray.length < length ? pasteArray.length : length - 1;
      inputsRef.current[nextIndex]?.focus();
    }
  };

  return (
    <div
      className={`min-h-screen w-full transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-900"
          : "bg-gradient-to-br from-orange-50 via-white to-yellow-50"
      }`}
    >
      {/* Header */}
      <div
        className={`h-[10vh] w-full transition-all duration-300 ${
          isDark ? "bg-black/80 backdrop-blur-xl" : "bg-white/80 backdrop-blur-xl"
        }`}
      >
        <div className="h-full w-[90%] mx-auto flex items-center">
          <Link to="/">
            <h1
              className={`text-3xl font-black tracking-[0.25rem] uppercase ${
                isDark
                  ? "bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent"
              }`}
            >
              NEURADHOOR
            </h1>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-auto w-[90%] lg:w-[80%] my-8 mx-auto rounded-3xl flex justify-center shadow-2xl overflow-hidden">
        {/* Left Side - Decorative */}
        <div
          className={`h-[80vh] w-[50%] lg:block md:block hidden ${
            isDark
              ? "bg-gradient-to-br from-black/90 to-gray-900/90"
              : "bg-gradient-to-br from-orange-500/20 to-yellow-500/20"
          } backdrop-blur-xl flex items-center justify-center`}
        >
          <div className="text-center px-8">
            <h2
              className={`text-4xl font-black mb-4 ${
                isDark ? "text-white/90" : "text-orange-600"
              }`}
            >
              Verify Your Email
            </h2>
            <p
              className={`text-lg ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              We&apos;ve sent a 6‑digit code to your email. Enter it to complete
              your sign in.
            </p>
          </div>
        </div>

        {/* Right Side - OTP Form */}
        <motion.div
          className={`h-[80vh] w-full lg:w-[50%] p-8 flex flex-col justify-center relative transition-all duration-300 ${
            isDark
              ? "bg-white/10 dark:bg-white/5 backdrop-blur-2xl border border-white/20"
              : "bg-white/90 backdrop-blur-2xl border border-orange-100 shadow-xl"
          }`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1
              className={`text-4xl font-black mb-2 ${
                isDark
                  ? "text-white bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent"
                  : "text-gray-900"
              }`}
            >
              OTP Verification
            </h1>
            {message && (
              <motion.p
                className={`mt-2 text-sm px-4 py-2 rounded-xl font-medium ${
                  isDark
                    ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                    : "bg-orange-100 text-orange-700 border border-orange-200"
                }`}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
              >
                {message}
              </motion.p>
            )}
          </div>

          <form className="space-y-6" onSubmit={handleOtpSubmit}>
            <p
              className={`text-sm text-center ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Enter the 6‑digit code we sent to your registered email.
            </p>

            {/* OTP inputs */}
            <div className="flex justify-center gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  maxLength={1}
                  className={`w-10 h-12 sm:w-12 sm:h-14 text-lg sm:text-xl font-semibold text-center rounded-2xl outline-none p-2 transition-all ${
                    isDark
                      ? "bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/70"
                      : "bg-white/60 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/70 shadow-sm"
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-between items-center text-sm">
              <span
                className={`${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Didn&apos;t receive the code?
              </span>
              <button
                type="button"
                className={`font-medium transition-all ${
                  isDark
                    ? "text-orange-400 hover:text-orange-300"
                    : "text-orange-600 hover:text-orange-500"
                }`}
                // onClick={handleResendOtp}
              >
                Resend OTP
              </button>
            </div>

            {/* Confirm Button */}
            <motion.button
              type="submit"
              className={`w-full py-4 px-8 text-xl font-bold rounded-2xl shadow-xl transition-all duration-300 ${
                isDark
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-yellow-500 hover:shadow-orange-500/40 hover:-translate-y-1 border border-white/20"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-yellow-500 hover:shadow-orange-500/40 hover:-translate-y-1 shadow-lg border border-orange-200"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Confirm
            </motion.button>
          </form>

          <p
            className={`text-center text-sm mt-8 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Wrong email?{" "}
            <Link
              to="/login"
              className={`font-semibold transition-all ${
                isDark
                  ? "text-orange-400 hover:text-orange-300"
                  : "text-orange-600 hover:text-orange-500"
              }`}
            >
              Go back to Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
