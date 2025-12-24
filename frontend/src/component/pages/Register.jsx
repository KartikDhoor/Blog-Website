import { useState, useEffect } from "react";
import { IoEyeOffOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AxiosInstance from "../utils/AxiosInstance";
import { useAuth } from '../AuthContext';

export default function Register() {
    const { user, token, updateToken } = useAuth();
    const navigate = useNavigate();
    const [passwordVisiblity, setPasswordVisiblity] = useState(false);
    const [message, setmessage] = useState("");
    const [userRegisterForm, setUserRegisterForm] = useState({
        name: "",
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
        setUserRegisterForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            console.log(userRegisterForm);
            const response = await AxiosInstance.post("/customer/register", userRegisterForm);
            
            if (response) {
                console.log(response.data);
                const token = response.data?.token;
                console.log(token);
                updateToken(token);
                setmessage(response.data.message);
                navigate("/otp");
                return;
            }
        } catch (err) {
            console.log(err);
            setmessage(err.message);
        }
    };

    return (
        <div className={`min-h-screen w-full transition-all duration-300 ${isDark ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' : 'bg-gradient-to-br from-orange-50 via-white to-yellow-50'}`}>
            {/* Header */}
            <div className={`h-[8vh] sm:h-[10vh] w-full transition-all duration-300 ${isDark ? 'bg-black/80 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl'}`}>
                <div className="h-full w-[90%] mx-auto flex items-center px-4 sm:px-0">
                    <Link to='/'>
                        <h1 className={`text-xl sm:text-2xl lg:text-3xl font-black tracking-[0.1rem] sm:tracking-[0.25rem] uppercase ${isDark ? 'bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent'}`}>
                            NEURADHOOR
                        </h1>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="h-auto w-[95%] sm:w-[90%] lg:w-[80%] xl:w-[70%] my-6 sm:my-8 mx-auto rounded-2xl sm:rounded-3xl flex flex-col lg:flex-row justify-center shadow-xl sm:shadow-2xl overflow-hidden">
                {/* Left Side - Decorative */}
               

                {/* Right Side - Form */}
                <motion.div 
                    className={`h-[60vh] sm:h-[70vh] lg:h-[80vh] w-full lg:w-[50%] p-6 sm:p-8 lg:p-12 flex flex-col justify-center relative transition-all duration-300 ${isDark ? 'bg-white/10 dark:bg-white/5 backdrop-blur-2xl border border-white/20' : 'bg-white/90 backdrop-blur-2xl border border-orange-100 shadow-xl'}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-6 sm:mb-8">
                        <h1 className={`text-3xl sm:text-4xl lg:text-4xl font-black mb-3 sm:mb-4 leading-tight ${isDark ? 'text-white bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent' : 'text-gray-900'}`}>
                            Create Account
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

                    <form className="space-y-4 sm:space-y-6" onSubmit={handleRegister}>
                        {/* Name */}
                        <div>
                            <label className={`block text-xs sm:text-sm font-medium mb-2 px-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Full Name
                            </label>
                            <div className={`relative rounded-2xl sm:rounded-3xl border p-3 sm:p-4 transition-all ${isDark ? 'bg-white/5 border-white/20 hover:border-white/30 focus-within:border-orange-400' : 'bg-white/50 border-gray-200 hover:border-orange-300 focus-within:border-orange-400 shadow-sm'}`}>
                                <input 
                                    type="text" 
                                    className={`w-full bg-transparent outline-none text-base sm:text-lg px-2 sm:px-0 ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'} transition-all`}
                                    name='name' 
                                    value={userRegisterForm.name} 
                                    onChange={userInputChange}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className={`block text-xs sm:text-sm font-medium mb-2 px-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Email Address
                            </label>
                            <div className={`relative rounded-2xl sm:rounded-3xl border p-3 sm:p-4 transition-all ${isDark ? 'bg-white/5 border-white/20 hover:border-white/30 focus-within:border-orange-400' : 'bg-white/50 border-gray-200 hover:border-orange-300 focus-within:border-orange-400 shadow-sm'}`}>
                                <input 
                                    type="email" 
                                    className={`w-full bg-transparent outline-none text-base sm:text-lg px-2 sm:px-0 ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'} transition-all`}
                                    name='email' 
                                    value={userRegisterForm.email} 
                                    onChange={userInputChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className={`block text-xs sm:text-sm font-medium mb-2 px-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Password
                            </label>
                            <div className={`relative rounded-2xl sm:rounded-3xl border p-3 sm:p-4 transition-all ${isDark ? 'bg-white/5 border-white/20 hover:border-white/30 focus-within:border-orange-400' : 'bg-white/50 border-gray-200 hover:border-orange-300 focus-within:border-orange-400 shadow-sm'}`}>
                                <input 
                                    type={passwordVisiblity ? "text" : "password"} 
                                    className={`w-[85%] sm:w-[90%] bg-transparent outline-none text-base sm:text-lg pr-10 sm:pr-12 ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                                    name='password' 
                                    value={userRegisterForm.password} 
                                    onChange={userInputChange}
                                    placeholder="Create a password"
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

                        {/* Register Button */}
                        <motion.button 
                            type="submit"
                            className={`w-full py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-xl font-bold rounded-2xl sm:rounded-3xl shadow-xl transition-all duration-300 ${isDark ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-yellow-500 hover:shadow-orange-500/40 hover:-translate-y-1 border border-white/20' : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-yellow-500 hover:shadow-orange-500/40 hover:-translate-y-1 shadow-lg border border-orange-200'}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Create Account
                        </motion.button>
                    </form>

                    {/* Login Link */}
                    <p className={`text-center text-xs sm:text-sm mt-6 sm:mt-8 px-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Already have an account?{' '}
                        <Link to='/login' className={`font-semibold transition-all ${isDark ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-500'}`}>
                            Sign In
                        </Link>
                    </p>
                </motion.div>
                 <motion.div 
    className={`h-[60vh] sm:h-[70vh] lg:h-[80vh] w-full lg:w-[50%] ${isDark ? 'bg-gradient-to-br from-black/90 to-gray-900/90' : 'bg-gradient-to-br from-orange-500/20 to-orange-600/20'} backdrop-blur-xl hidden lg:flex md:flex items-center justify-center p-6 sm:p-8`}
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
>
    <div className="text-center px-4 sm:px-8 max-w-md flex flex-col items-center justify-center">
        <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-black mb-3 sm:mb-4 leading-tight ${isDark ? 'text-white/90' : 'text-orange-600'}`}>
            Join NEURADHOOR
        </h2>
        <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Create your account to start sharing your ideas and stories
        </p>
    </div>
</motion.div>

            </div>
        </div>
    );
}
