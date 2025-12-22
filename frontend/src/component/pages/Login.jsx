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

    // Sync with global theme
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') === 'dark';
        setIsDark(savedTheme);
    }, []);

    const passwordVisiblityToggle = () => {
        setPasswordVisiblity((preState) => !preState);
    };

    const userInputChange = (e) => {
        const { name, value } = e.target;
        setUserLoginForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await AxiosInstance.post("/customer/login", userLoginForm);
            if (response) {
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
                setmessage(response.data.message);
            }
        } catch (err) {
            console.log(err);
            setmessage(err.message);
        }
    };

    return (
        <div className={`min-h-screen w-full transition-all duration-300 ${isDark ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' : 'bg-gradient-to-br from-orange-50 via-white to-yellow-50'}`}>
            {/* Header */}
            <div className={`h-[10vh] w-full transition-all duration-300 ${isDark ? 'bg-black/80 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl'}`}>
                <div className="h-full w-[90%] mx-auto flex items-center">
                    <Link to='/'>
                        <h1 className={`text-3xl font-black tracking-[0.25rem] uppercase ${isDark ? 'bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent'}`}>
                            NEURADHOOR
                        </h1>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="h-auto w-[90%] lg:w-[80%] my-8 mx-auto rounded-3xl flex justify-center shadow-2xl overflow-hidden">
                {/* Left Side - Decorative */}
                <div className={`h-[80vh] w-[50%] lg:block md:block hidden ${isDark ? 'bg-gradient-to-br from-black/90 to-gray-900/90' : 'bg-gradient-to-br from-orange-500/20 to-yellow-500/20'} backdrop-blur-xl flex items-center justify-center`}>
                    <div className="text-center px-8">
                        <h2 className={`text-4xl font-black mb-4 ${isDark ? 'text-white/90' : 'text-orange-600'}`}>
                            Welcome Back
                        </h2>
                        <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Sign in to your account to continue your journey
                        </p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <motion.div 
                    className={`h-[80vh] w-full lg:w-[50%] p-8 flex flex-col justify-center relative transition-all duration-300 ${isDark ? 'bg-white/10 dark:bg-white/5 backdrop-blur-2xl border border-white/20' : 'bg-white/90 backdrop-blur-2xl border border-orange-100 shadow-xl'}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-8">
                        <h1 className={`text-4xl font-black mb-2 ${isDark ? 'text-white bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent' : 'text-gray-900'}`}>
                            Login
                        </h1>
                        {message && (
                            <motion.p 
                                className={`text-sm px-4 py-2 rounded-xl font-medium ${isDark ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' : 'bg-orange-100 text-orange-700 border border-orange-200'}`}
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                            >
                                {message}
                            </motion.p>
                        )}
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        {/* Email */}
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Email Address
                            </label>
                            <div className={`relative rounded-2xl border p-4 transition-all ${isDark ? 'bg-white/5 border-white/20 hover:border-white/30 focus-within:border-orange-400' : 'bg-white/50 border-gray-200 hover:border-orange-300 focus-within:border-orange-400 shadow-sm'}`}>
                                <input 
                                    type="email" 
                                    className={`w-full bg-transparent outline-none text-lg ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'} transition-all`}
                                    name='email' 
                                    value={userLoginForm.email} 
                                    onChange={userInputChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Password
                            </label>
                            <div className={`relative rounded-2xl border p-4 transition-all ${isDark ? 'bg-white/5 border-white/20 hover:border-white/30 focus-within:border-orange-400' : 'bg-white/50 border-gray-200 hover:border-orange-300 focus-within:border-orange-400 shadow-sm'}`}>
                                <input 
                                    type={passwordVisiblity ? "text" : "password"} 
                                    className={`w-[90%] bg-transparent outline-none text-lg pr-12 ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                                    name='password' 
                                    value={userLoginForm.password} 
                                    onChange={userInputChange}
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={passwordVisiblityToggle}
                                    className={`absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-xl transition-all ${isDark ? 'hover:bg-white/10 text-gray-300 hover:text-orange-400' : 'hover:bg-gray-200 text-gray-500 hover:text-orange-500'}`}
                                >
                                    {passwordVisiblity ? 
                                        <FaRegEye className="w-6 h-6" /> : 
                                        <IoEyeOffOutline className="w-6 h-6" />
                                    }
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <Link to="/forgot-password" className={`font-medium transition-all ${isDark ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-500'}`}>
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <motion.button 
                            type="submit"
                            className={`w-full py-4 px-8 text-xl font-bold rounded-2xl shadow-xl transition-all duration-300 ${isDark ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-yellow-500 hover:shadow-orange-500/40 hover:-translate-y-1 border border-white/20' : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-yellow-500 hover:shadow-orange-500/40 hover:-translate-y-1 shadow-lg border border-orange-200'}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Sign In
                        </motion.button>
                    </form>

                    {/* Register Link */}
                    <p className={`text-center text-sm mt-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
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
