import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOffOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { motion } from "framer-motion";
import AxiosInstance from "../utils/AxiosInstance";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(false);
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [emailValid, setEmailValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateOtp = (otp) => {
    return /^\d{6}$/.test(otp);
  };

  const validatePassword = (password) => {
    if (!password.trim()) return "New password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password)) return "Password must include at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must include at least one lowercase letter";
    if (!/\d/.test(password)) return "Password must include at least one number";
    if (!/[!@#$%^&*(),.?\":{}|<>_\-\\[\]\\/~`+=;']/g.test(password)) {
      return "Password must include at least one special character";
    }
    return "";
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") === "dark";
    setIsDark(savedTheme);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const nextValue = name === "otp" ? value.replace(/\D/g, "").slice(0, 6) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    if (name === "email") {
      const isValid = validateEmail(value);
      setEmailValid(isValid);

      if (value === "") {
        setEmailError("");
      } else if (!isValid) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    }

    if (name === "otp") {
      if (nextValue === "") {
        setOtpError("");
      } else if (!validateOtp(nextValue)) {
        setOtpError("OTP must be 6 digits");
      } else {
        setOtpError("");
      }
    }

    if (name === "newPassword") {
      setPasswordError(validatePassword(value));

      if (formData.confirmPassword && value !== formData.confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
      } else {
        setConfirmPasswordError("");
      }
    }

    if (name === "confirmPassword") {
      if (value !== formData.newPassword) {
        setConfirmPasswordError("Passwords do not match");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!formData.email || !emailValid) {
      setMessage("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      setMessage("Sending OTP...");

      const response = await AxiosInstance.post("/customer/forgot-password", {
        email: formData.email,
      });

      setMessage(
        response?.data?.message ||
          "If an account exists with this email, an OTP has been sent."
      );
      setStep(2);
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "Unable to send OTP right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!formData.email || !emailValid) {
      setMessage("Please enter a valid email address");
      return;
    }

    if (!validateOtp(formData.otp)) {
      setOtpError("OTP must be 6 digits");
      setMessage("Please enter a valid 6-digit OTP");
      return;
    }

    const pwdError = validatePassword(formData.newPassword);
    if (pwdError) {
      setPasswordError(pwdError);
      setMessage(pwdError);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setMessage("Resetting password...");

      const response = await AxiosInstance.post("/customer/reset-password", {
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });

      if (response?.data?.success) {
        setMessage(response.data.message || "Password reset successful");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setMessage(response?.data?.message || "Password reset failed");
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "Password reset failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const passwordVisibilityToggle = () => {
    setPasswordVisibility((prev) => !prev);
  };

  const confirmPasswordVisibilityToggle = () => {
    setConfirmPasswordVisibility((prev) => !prev);
  };

  const resetDisabled =
    loading ||
    !validateOtp(formData.otp) ||
    !!validatePassword(formData.newPassword) ||
    formData.newPassword !== formData.confirmPassword;

  return (
    <div
      className={`min-h-dvh w-full transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-950 via-black to-gray-900"
          : "bg-gradient-to-br from-orange-50 via-white to-yellow-50"
      }`}
    >
      <header
        className={`sticky top-0 z-20 w-full transition-all duration-300 ${
          isDark ? "bg-black/70 backdrop-blur-xl" : "bg-white/80 backdrop-blur-xl"
        } border-b ${isDark ? "border-white/10" : "border-orange-100"}`}
      >
        <div className="mx-auto flex h-16 sm:h-20 w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Link to="/" className="shrink-0">
            <h1
              className={`text-lg sm:text-2xl lg:text-3xl font-black tracking-[0.12rem] sm:tracking-[0.22rem] uppercase ${
                isDark
                  ? "bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent"
              }`}
            >
              NEURADHOOR
            </h1>
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl items-stretch px-3 py-4 sm:px-6 sm:py-8 lg:px-8">
        <div
          className={`grid w-full overflow-hidden rounded-3xl lg:rounded-[2rem] border shadow-xl sm:shadow-2xl ${
            isDark
              ? "border-white/10 bg-white/5"
              : "border-orange-100 bg-white/80"
          } lg:grid-cols-2`}
        >
          <motion.section
            className={`hidden lg:flex min-h-full items-center justify-center px-10 xl:px-14 py-14 ${
              isDark
                ? "bg-gradient-to-br from-black/90 to-gray-900/90"
                : "bg-gradient-to-br from-orange-500/15 to-yellow-500/20"
            }`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55 }}
          >
            <div className="mx-auto max-w-md text-center">
              <h2
                className={`text-3xl xl:text-4xl font-black leading-tight ${
                  isDark ? "text-white/95" : "text-orange-600"
                }`}
              >
                Reset Your Password
              </h2>
              <p
                className={`mt-4 text-base xl:text-lg leading-7 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Enter your email, receive a 6-digit OTP, and securely create a new password.
              </p>
            </div>
          </motion.section>

          <motion.section
            className={`flex min-h-[calc(100dvh-8rem)] sm:min-h-[calc(100dvh-10rem)] lg:min-h-0 items-center justify-center px-4 py-8 sm:px-8 sm:py-10 lg:px-10 xl:px-14 ${
              isDark
                ? "bg-white/10 backdrop-blur-2xl"
                : "bg-white/90 backdrop-blur-2xl"
            }`}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="w-full max-w-md">
              <div className="mb-6 sm:mb-8 text-center">
                <h1
                  className={`text-2xl sm:text-3xl lg:text-4xl font-black leading-tight ${
                    isDark
                      ? "bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent"
                      : "text-gray-900"
                  }`}
                >
                  {step === 1 ? "Forgot Password" : "Verify OTP"}
                </h1>

                <p
                  className={`mt-2 text-sm sm:text-base ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {step === 1
                    ? "We’ll send a verification code to your email."
                    : "Enter the OTP and create a new password."}
                </p>

                {message && (
                  <motion.p
                    className={`mt-4 rounded-2xl border px-3 py-3 text-xs sm:text-sm font-medium ${
                      isDark
                        ? "border-orange-500/30 bg-orange-500/15 text-orange-300"
                        : "border-orange-200 bg-orange-100 text-orange-700"
                    }`}
                    initial={{ scale: 0.96 }}
                    animate={{ scale: 1 }}
                  >
                    {message}
                  </motion.p>
                )}
              </div>

              {step === 1 ? (
                <form className="space-y-5 sm:space-y-6" onSubmit={handleSendOtp}>
                  <div>
                    <label
                      className={`mb-2 block px-1 text-xs sm:text-sm font-medium ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Email Address
                    </label>

                    <div
                      className={`relative rounded-2xl border p-3.5 sm:p-4 transition-all ${
                        emailValid
                          ? "border-green-400 focus-within:border-green-500"
                          : emailError
                          ? "border-red-400 focus-within:border-red-500"
                          : isDark
                          ? "border-white/20 bg-white/5 hover:border-white/30 focus-within:border-orange-400"
                          : "border-gray-200 bg-white/60 hover:border-orange-300 focus-within:border-orange-400 shadow-sm"
                      }`}
                    >
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                        className={`w-full bg-transparent pr-8 text-base sm:text-lg outline-none ${
                          isDark
                            ? "text-white placeholder-gray-400"
                            : "text-gray-900 placeholder-gray-500"
                        }`}
                      />

                      {formData.email && (
                        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm">
                          {emailValid ? (
                            <span className="text-green-500">✓</span>
                          ) : (
                            emailError && <span className="text-red-500">✗</span>
                          )}
                        </div>
                      )}
                    </div>

                    {emailError && (
                      <p
                        className={`mt-1.5 text-xs ${
                          isDark ? "text-red-400" : "text-red-600"
                        }`}
                      >
                        {emailError}
                      </p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={!emailValid || loading}
                    className={`w-full rounded-2xl border px-6 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-white shadow-xl transition-all duration-300 ${
                      isDark ? "border-white/20" : "border-orange-200"
                    } bg-gradient-to-r from-orange-500 to-orange-600 ${
                      !emailValid || loading
                        ? "cursor-not-allowed opacity-70"
                        : "cursor-pointer hover:-translate-y-0.5 hover:from-orange-600 hover:to-yellow-500 hover:shadow-orange-500/40"
                    }`}
                    whileHover={!emailValid || loading ? {} : { scale: 1.01 }}
                    whileTap={!emailValid || loading ? {} : { scale: 0.99 }}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </motion.button>
                </form>
              ) : (
                <form className="space-y-5 sm:space-y-6" onSubmit={handleResetPassword}>
                  <div>
                    <label
                      className={`mb-2 block px-1 text-xs sm:text-sm font-medium ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Email Address
                    </label>

                    <div
                      className={`rounded-2xl border p-3.5 sm:p-4 ${
                        isDark
                          ? "border-white/20 bg-white/5"
                          : "border-gray-200 bg-white/60 shadow-sm"
                      }`}
                    >
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        readOnly
                        className={`w-full bg-transparent text-base sm:text-lg outline-none ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className={`mb-2 block px-1 text-xs sm:text-sm font-medium ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      6-Digit OTP
                    </label>

                    <div
                      className={`rounded-2xl border p-3.5 sm:p-4 transition-all ${
                        otpError
                          ? "border-red-400 focus-within:border-red-500"
                          : isDark
                          ? "border-white/20 bg-white/5 hover:border-white/30 focus-within:border-orange-400"
                          : "border-gray-200 bg-white/60 hover:border-orange-300 focus-within:border-orange-400 shadow-sm"
                      }`}
                    >
                      <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={handleInputChange}
                        placeholder="123456"
                        maxLength={6}
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        required
                        className={`w-full bg-transparent text-center text-lg sm:text-xl tracking-[0.35rem] sm:tracking-[0.55rem] outline-none ${
                          isDark
                            ? "text-white placeholder-gray-400"
                            : "text-gray-900 placeholder-gray-500"
                        }`}
                      />
                    </div>

                    {otpError && (
                      <p
                        className={`mt-1.5 text-xs ${
                          isDark ? "text-red-400" : "text-red-600"
                        }`}
                      >
                        {otpError}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`mb-2 block px-1 text-xs sm:text-sm font-medium ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      New Password
                    </label>

                    <div
                      className={`relative rounded-2xl border p-3.5 sm:p-4 transition-all ${
                        passwordError
                          ? "border-red-400 focus-within:border-red-500"
                          : isDark
                          ? "border-white/20 bg-white/5 hover:border-white/30 focus-within:border-orange-400"
                          : "border-gray-200 bg-white/60 hover:border-orange-300 focus-within:border-orange-400 shadow-sm"
                      }`}
                    >
                      <input
                        type={passwordVisibility ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        placeholder="Create a new password"
                        autoComplete="new-password"
                        required
                        className={`w-full bg-transparent pr-12 text-base sm:text-lg outline-none ${
                          isDark
                            ? "text-white placeholder-gray-400"
                            : "text-gray-900 placeholder-gray-500"
                        }`}
                      />

                      <button
                        type="button"
                        onClick={passwordVisibilityToggle}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-xl p-2 transition-all ${
                          isDark
                            ? "text-gray-300 hover:bg-white/10 hover:text-orange-400"
                            : "text-gray-500 hover:bg-gray-200 hover:text-orange-500"
                        }`}
                      >
                        {passwordVisibility ? (
                          <FaRegEye className="h-5 w-5" />
                        ) : (
                          <IoEyeOffOutline className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    {passwordError && (
                      <p
                        className={`mt-1.5 text-xs ${
                          isDark ? "text-red-400" : "text-red-600"
                        }`}
                      >
                        {passwordError}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`mb-2 block px-1 text-xs sm:text-sm font-medium ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Confirm Password
                    </label>

                    <div
                      className={`relative rounded-2xl border p-3.5 sm:p-4 transition-all ${
                        confirmPasswordError
                          ? "border-red-400 focus-within:border-red-500"
                          : isDark
                          ? "border-white/20 bg-white/5 hover:border-white/30 focus-within:border-orange-400"
                          : "border-gray-200 bg-white/60 hover:border-orange-300 focus-within:border-orange-400 shadow-sm"
                      }`}
                    >
                      <input
                        type={confirmPasswordVisibility ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your new password"
                        autoComplete="new-password"
                        required
                        className={`w-full bg-transparent pr-12 text-base sm:text-lg outline-none ${
                          isDark
                            ? "text-white placeholder-gray-400"
                            : "text-gray-900 placeholder-gray-500"
                        }`}
                      />

                      <button
                        type="button"
                        onClick={confirmPasswordVisibilityToggle}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-xl p-2 transition-all ${
                          isDark
                            ? "text-gray-300 hover:bg-white/10 hover:text-orange-400"
                            : "text-gray-500 hover:bg-gray-200 hover:text-orange-500"
                        }`}
                      >
                        {confirmPasswordVisibility ? (
                          <FaRegEye className="h-5 w-5" />
                        ) : (
                          <IoEyeOffOutline className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    {confirmPasswordError && (
                      <p
                        className={`mt-1.5 text-xs ${
                          isDark ? "text-red-400" : "text-red-600"
                        }`}
                      >
                        {confirmPasswordError}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <motion.button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={loading}
                      className={`w-full rounded-2xl border px-5 py-3.5 text-sm sm:text-base font-semibold transition-all ${
                        isDark
                          ? "border-white/20 text-white hover:bg-white/10"
                          : "border-orange-200 text-orange-600 hover:bg-orange-50"
                      } ${loading ? "cursor-not-allowed opacity-70" : ""}`}
                      whileHover={loading ? {} : { scale: 1.01 }}
                      whileTap={loading ? {} : { scale: 0.99 }}
                    >
                      Resend OTP
                    </motion.button>

                    <motion.button
                      type="submit"
                      disabled={resetDisabled}
                      className={`w-full rounded-2xl border px-5 py-3.5 text-sm sm:text-base font-bold text-white shadow-xl transition-all duration-300 ${
                        isDark ? "border-white/20" : "border-orange-200"
                      } bg-gradient-to-r from-orange-500 to-orange-600 ${
                        resetDisabled
                          ? "cursor-not-allowed opacity-70"
                          : "cursor-pointer hover:-translate-y-0.5 hover:from-orange-600 hover:to-yellow-500 hover:shadow-orange-500/40"
                      }`}
                      whileHover={resetDisabled ? {} : { scale: 1.01 }}
                      whileTap={resetDisabled ? {} : { scale: 0.99 }}
                    >
                      {loading ? "Resetting..." : "Reset Password"}
                    </motion.button>
                  </div>
                </form>
              )}

              <p
                className={`mt-6 sm:mt-8 text-center text-xs sm:text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Remembered your password?{" "}
                <Link
                  to="/login"
                  className={`font-semibold transition-all ${
                    isDark
                      ? "text-orange-400 hover:text-orange-300"
                      : "text-orange-600 hover:text-orange-500"
                  }`}
                >
                  Back to Login
                </Link>
              </p>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}