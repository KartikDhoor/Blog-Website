// ✅ ADDED: Email validation + Real-time feedback (password unchanged)
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoEyeOffOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { motion } from "framer-motion";
import AxiosInstance from "../utils/AxiosInstance";
import { useAuth } from '../AuthContext';

export default function Login() {
    const { updateToken, user } = useAuth();
    const navigate = useNavigate();
    const [passwordVisiblity, setPasswordVisiblity] = useState(false);
    const [message, setmessage] = useState("");
    const [userLoginForm, setUserLoginForm] = useState({
        email: "",
        password: "",
    });
    const [isDark, setIsDark] = useState(false);
    
    // ✅ NEW: Form validation states
    const [emailValid, setEmailValid] = useState(false);
    const [emailError, setEmailError] = useState("");

    // Email validation regex (strict but allows common formats)
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Sync with global theme
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') === 'dark';
        setIsDark(savedTheme);
    }, []);

    const passwordVisiblityToggle = () => {
        setPasswordVisiblity((preState) => !preState);
    };

    // ✅ UPDATED: Real-time email validation
    const userInputChange = (e) => {
        const { name, value } = e.target;
        setUserLoginForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Email validation (password untouched)
        if (name === 'email') {
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
    };

    // ✅ UPDATED: Form validation before API call
    const handleLogin = async (e) => {
        e.preventDefault();

        // Email check before sending
        if (!emailValid || userLoginForm.email === "") {
            setmessage("Please enter a valid email address");
            return;
        }

        // Both fields required (password unchanged)
        if (!userLoginForm.password.trim()) {
            setmessage("Password is required");
            return;
        }

        try {
            setmessage("Signing you in...");
            const response = await AxiosInstance.post("/customer/login", userLoginForm);
            
            if (response.data.success !== false) {
                const token = response.data?.token;
                const userType = response.data?.data?.userType;
                const userVerified = response.data?.data?.emailVerified;
                
                updateToken(token);
                
                if (userVerified == false) {
                    navigate("/otp");
                    return;
                }
                if (userType == 1) {
                    navigate("/dashboard");
                    return;
                }
                if (userType == 2) {
                    navigate("/");
                    return;
                }
                setmessage(response.data.message || "Login successful!");
            } else {
                setmessage(response.data.message || "Login failed");
            }
        } catch (err) {
            console.log(err);
            setmessage(err.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className={`min-h-screen w-full transition-all duration-300 ${isDark ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' : 'bg-gradient-to-br from-orange-50 via-white to-yellow-50'}`}>
            {/* Header - UNCHANGED */}
            <div className={`h-[8vh] sm:h-[10vh] w-full transition-all duration-300 ${isDark ? 'bg-black/80 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl'}`}>
                <div className="h-full w-[90%] mx-auto flex items-center px-4 sm:px-0">
                    <Link to='/'>
                        <h1 className={`text-xl sm:text-2xl lg:text-3xl font-black tracking-[0.1rem] sm:tracking-[0.25rem] uppercase ${isDark ? 'bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent'}`}>
                            NEURADHOOR
                        </h1>
                    </Link>
                </div>
            </div>

            {/* Main Content - UNCHANGED */}
            <div className="h-auto w-[95%] sm:w-[90%] lg:w-[80%] xl:w-[70%] my-6 sm:my-8 mx-auto rounded-2xl sm:rounded-3xl flex flex-col lg:flex-row justify-center shadow-xl sm:shadow-2xl overflow-hidden">
                {/* Left Side - UNCHANGED */}
                <motion.div 
                    className={`h-[60vh] sm:h-[70vh] lg:h-[80vh] w-full lg:w-[50%] ${isDark ? 'bg-gradient-to-br from-black/90 to-gray-900/90' : 'bg-gradient-to-br from-orange-500/20 to-yellow-500/20'} backdrop-blur-xl hidden lg:flex md:flex items-center justify-center p-6 sm:p-8`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center px-4 sm:px-8 max-w-md flex flex-col items-center justify-center">
                        <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-black mb-3 sm:mb-4 leading-tight ${isDark ? 'text-white/90' : 'text-orange-600'}`}>
                            Welcome Back
                        </h2>
                        <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Sign in to your account to continue your journey
                        </p>
                    </div>
                </motion.div>

                {/* Right Side - Form */}
                <motion.div 
                    className={`h-[60vh] sm:h-[70vh] lg:h-[80vh] w-full lg:w-[50%] p-6 sm:p-8 lg:p-12 flex flex-col justify-center relative transition-all duration-300 ${isDark ? 'bg-white/10 dark:bg-white/5 backdrop-blur-2xl border border-white/20' : 'bg-white/90 backdrop-blur-2xl border border-orange-100 shadow-xl'}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-6 sm:mb-8">
                        <h1 className={`text-3xl sm:text-4xl lg:text-4xl font-black mb-3 sm:mb-4 leading-tight ${isDark ? 'text-white bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent' : 'text-gray-900'}`}>
                            Login
                        </h1>
                        {message && (
                            <motion.p 
                                className={`text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl font-medium mx-4 ${isDark ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' : 'bg-orange-100 text-orange-700 border border-orange-200'}`}
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                            >
                                {message}
                            </motion.p>
                        )}
                    </div>

                    <form className="space-y-4 sm:space-y-6" onSubmit={handleLogin}>
                        {/* ✅ UPDATED: Email with validation feedback */}
                        <div>
                            <label className={`block text-xs sm:text-sm font-medium mb-2 px-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Email Address
                            </label>
                            <div className={`relative rounded-2xl sm:rounded-3xl border p-3 sm:p-4 transition-all ${
                                emailValid ? 'border-green-300 hover:border-green-400 focus-within:border-green-400' :
                                emailError ? 'border-red-300 hover:border-red-400 focus-within:border-red-400' :
                                isDark ? 'bg-white/5 border-white/20 hover:border-white/30 focus-within:border-orange-400' : 
                                'bg-white/50 border-gray-200 hover:border-orange-300 focus-within:border-orange-400 shadow-sm'
                            }`}>
                                <input 
                                    type="email" 
                                    className={`w-full bg-transparent outline-none text-base sm:text-lg px-2 sm:px-0 ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'} transition-all`}
                                    name='email' 
                                    value={userLoginForm.email} 
                                    onChange={userInputChange}
                                    placeholder="Enter your email"
                                    required
                                />
                                {/* ✅ Email validation indicator */}
                                {userLoginForm.email && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        {emailValid ? 
                                            <div className="w-5 h-5 text-green-500">✓</div> :
                                            emailError && <div className="w-5 h-5 text-red-500">✗</div>
                                        }
                                    </div>
                                )}
                            </div>
                            {/* ✅ Email error message */}
                            {emailError && (
                                <p className={`mt-1 text-xs ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                                    {emailError}
                                </p>
                            )}
                        </div>

                        {/* Password - UNCHANGED */}
                        <div>
                            <label className={`block text-xs sm:text-sm font-medium mb-2 px-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Password
                            </label>
                            <div className={`relative rounded-2xl sm:rounded-3xl border p-3 sm:p-4 transition-all ${isDark ? 'bg-white/5 border-white/20 hover:border-white/30 focus-within:border-orange-400' : 'bg-white/50 border-gray-200 hover:border-orange-300 focus-within:border-orange-400 shadow-sm'}`}>
                                <input 
                                    type={passwordVisiblity ? "text" : "password"} 
                                    className={`w-[85%] sm:w-[90%] bg-transparent outline-none text-base sm:text-lg pr-10 sm:pr-12 ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                                    name='password' 
                                    value={userLoginForm.password} 
                                    onChange={userInputChange}
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={passwordVisiblityToggle}
                                    className={`absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1 sm:p-2 rounded-lg transition-all ${isDark ? 'hover:bg-white/10 text-gray-300 hover:text-orange-400' : 'hover:bg-gray-200 text-gray-500 hover:text-orange-500'}`}
                                >
                                    {passwordVisiblity ? 
                                        <FaRegEye className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" /> : 
                                        <IoEyeOffOutline className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                                    }
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password - UNCHANGED */}
                        <div className="flex justify-between items-center text-xs sm:text-sm px-1">
                            <Link to="/forgot-password" className={`font-medium transition-all ${isDark ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-500'}`}>
                                Forgot Password?
                            </Link>
                        </div>

{/* Login Button */}
<motion.button
  type="submit"
  disabled={!emailValid || !userLoginForm.password.trim()}
  className={`
    w-full py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-xl font-bold
    rounded-2xl sm:rounded-3xl shadow-xl transition-all duration-300
    bg-gradient-to-r from-orange-500 to-orange-600 text-white
    border ${isDark ? 'border-white/20' : 'border-orange-200'}
    ${!emailValid || !userLoginForm.password.trim()
      ? 'cursor-not-allowed'
      : 'cursor-pointer hover:from-orange-600 hover:to-yellow-500 hover:shadow-orange-500/40 hover:-translate-y-1'
    }
  `}
  whileHover={
    !emailValid || !userLoginForm.password.trim()
      ? {}
      : { scale: 1.02 }
  }
  whileTap={
    !emailValid || !userLoginForm.password.trim()
      ? {}
      : { scale: 0.98 }
  }
>
  Sign In
</motion.button>


                    </form>

                    {/* Register Link - UNCHANGED */}
                    <p className={`text-center text-xs sm:text-sm mt-6 sm:mt-8 px-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Don't have an account?{' '}
                        <Link to='/register' className={`font-semibold transition-all ${isDark ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-500'}`}>
                            Create Account
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
