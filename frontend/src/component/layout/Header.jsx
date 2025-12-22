import { Link, useNavigate } from "react-router-dom";
import { HiMiniBars4, HiSun, HiMoon } from "react-icons/hi2";
import { RxCrossCircled } from "react-icons/rx";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../AuthContext";

export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [dashboardLink, setDashboardLink] = useState(false);
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Load theme once
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") === "dark";
    setIsDark(savedTheme);
    if (savedTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  // auth state
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
      setDashboardLink(user.userType === 1);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("blogsite_jwt_token");
    navigate(0);
  };

  const handleTriggerEnter = () => setHovered(true);
  const handleTriggerLeave = () => setHovered(false);
  const handleDropdownEnter = () => setHovered(true);
  const handleDropdownLeave = () => setHovered(false);

  const toggleNav = () => setOpenMobileNav((prev) => !prev);

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl bg-white/85 dark:bg-black/80">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="group flex-shrink-0">
            <h1 className="text-2xl sm:text-3xl font-black tracking-[0.20rem] sm:tracking-[0.25rem] uppercase bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent group-hover:scale-105 transition-all">
              NEURADHOOR
            </h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            <div className="flex items-center gap-6 text-sm lg:text-lg font-medium dark:text-gray-300 text-gray-700">
              <Link
                to="/"
                className="px-4 py-2 rounded-xl hover:bg-white/20 dark:hover:bg-white/10 hover:text-white transition-all"
              >
                Home
              </Link>
              <Link
                to="/news"
                className="px-4 py-2 rounded-xl hover:bg-white/20 dark:hover:bg-white/10 hover:text-white transition-all"
              >
                News
              </Link>
              <Link
                to="/inspire"
                className="px-4 py-2 rounded-xl hover:bg-white/20 dark:hover:bg-white/10 hover:text-white transition-all"
              >
                Inspire
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 rounded-xl hover:bg-white/20 dark:hover:bg-white/10 hover:text-white transition-all"
              >
                Contact
              </Link>
            </div>
          </nav>

          {/* Right side (desktop only) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              className="relative rounded-2xl bg-white/20 hover:bg-white/30 dark:bg-black/30 dark:hover:bg-black/50 border border-white/20 dark:border-gray-700/50 shadow-lg overflow-hidden flex items-center justify-center"
              style={{ width: "44px", height: "44px" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <HiSun
                  className={`w-5 h-5 transition-all duration-500 ease-in-out ${
                    isDark
                      ? "opacity-0 scale-50 -rotate-90"
                      : "opacity-100 scale-100 rotate-0"
                  } text-yellow-400 drop-shadow-sm`}
                />
                <HiMoon
                  className={`w-5 h-5 transition-all duration-500 ease-in-out ${
                    isDark
                      ? "opacity-100 scale-100 rotate-0"
                      : "opacity-0 scale-50 rotate-90"
                  } text-purple-400 drop-shadow-sm`}
                />
              </div>
            </motion.button>

            {/* Auth / dropdown */}
            {isAuthenticated ? (
              <div className="relative">
                <div
                  className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl hover:scale-105 transition-all cursor-pointer group"
                  onMouseEnter={handleTriggerEnter}
                  onMouseLeave={handleTriggerLeave}
                >
                  {user?.name?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-black rounded-full animate-pulse" />
                {hovered && (
                  <motion.div
                    className="absolute top-full right-0 mt-2 w-72 bg-white/90 dark:bg-white/80 backdrop-blur-xl border border-white/50 dark:border-white/40 shadow-2xl rounded-2xl py-3 px-4"
                    style={{ minHeight: "160px" }}
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div className="absolute top-0 right-4 -translate-y-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-transparent border-b-white/90" />
                    <div className="space-y-1 pt-2">
                      <Link
                        to="/profile"
                        className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-900 transition-all duration-200 font-medium text-gray-700 dark:text-gray-800"
                        onClick={() => setHovered(false)}
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          P
                        </div>
                        Profile
                      </Link>
                      <Link
                        to="/security"
                        className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-900 transition-all duration-200 font-medium text-gray-700 dark:text-gray-800"
                        onClick={() => setHovered(false)}
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          S
                        </div>
                        Security
                      </Link>
                      {dashboardLink && (
                        <Link
                          to="/dashboard"
                          className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-gray-900 dark:hover:text-gray-900 transition-all duration-200 font-medium text-gray-700 dark:text-gray-800"
                          onClick={() => setHovered(false)}
                        >
                          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                            D
                          </div>
                          Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          handleLogout();
                          setHovered(false);
                        }}
                        className="group w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-700 dark:hover:text-red-300 transition-all duration-200 font-medium text-gray-700 dark:text-gray-800"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          L
                        </div>
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <motion.button
                  className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm lg:text-lg rounded-2xl shadow-lg hover:shadow-orange-500/40 hover:-translate-y-1 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Login
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <motion.button
            className="lg:hidden flex items-center justify-center p-2.5 rounded-2xl bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20 border border-white/30 shadow-lg"
            onClick={toggleNav}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <HiMiniBars4 className="w-6 h-6 text-orange-500" />
          </motion.button>
        </div>
      </header>

      {/* MOBILE SIDEBAR OUTSIDE HEADER */}
      {openMobileNav && (
        <motion.aside
          className="fixed inset-0 z-[60] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={toggleNav}
          />

          {/* Drawer */}
          <motion.div
            className="absolute right-0 top-0 h-full max-h-screen w-[85%] sm:w-[75%] bg-white/92 dark:bg-black/92 backdrop-blur-2xl border-l border-black/15 dark:border-white/15 shadow-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            {/* Drawer header with THEME TOGGLE */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/5 dark:border-white/10">
              <span className="text-lg font-black tracking-[0.18rem] text-orange-500">
                NEURADHOOR
              </span>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={toggleTheme}
                  className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/20 shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {isDark ? (
                    <HiSun className="w-5 h-5 text-yellow-300" />
                  ) : (
                    <HiMoon className="w-5 h-5 text-purple-300" />
                  )}
                </motion.button>
                <button
                  className="p-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-all"
                  onClick={toggleNav}
                >
                  <RxCrossCircled className="w-7 h-7 text-orange-500" />
                </button>
              </div>
            </div>

            {/* Links */}
            <nav className="flex-1 px-5 py-4 space-y-1 text-gray-900 dark:text-white overflow-y-auto">
              <Link
                to="/"
                className="block py-3 px-4 text-base sm:text-lg font-semibold rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-all"
                onClick={toggleNav}
              >
                Home
              </Link>
              <Link
                to="/news"
                className="block py-3 px-4 text-base sm:text-lg font-semibold rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-all"
                onClick={toggleNav}
              >
                News
              </Link>
              <Link
                to="/inspire"
                className="block py-3 px-4 text-base sm:text-lg font-semibold rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-all"
                onClick={toggleNav}
              >
                Inspire
              </Link>
              <Link
                to="/contact"
                className="block py-3 px-4 text-base sm:text-lg font-semibold rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-all"
                onClick={toggleNav}
              >
                Contact
              </Link>

              <div className="h-px bg-black/10 dark:bg-white/10 my-3" />

              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="block py-3 px-4 text-base sm:text-lg font-semibold rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-all"
                    onClick={toggleNav}
                  >
                    Profile
                  </Link>
                  {dashboardLink && (
                    <Link
                      to="/dashboard"
                      className="block py-3 px-4 text-base sm:text-lg font-semibold rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-all"
                      onClick={toggleNav}
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleNav();
                    }}
                    className="w-full text-left mt-2 py-3 px-4 text-base sm:text-lg font-semibold rounded-2xl hover:bg-red-500/10 text-red-600 dark:text-red-300 dark:hover:bg-red-500/20 transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block py-3 px-4 text-base sm:text-lg font-semibold rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-all"
                    onClick={toggleNav}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block py-3 px-4 text-base sm:text-lg font-semibold rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-all"
                    onClick={toggleNav}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </motion.div>
        </motion.aside>
      )}
    </>
  );
}
