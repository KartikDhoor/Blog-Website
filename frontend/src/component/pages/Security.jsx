import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../utils/AxiosInstance";
import { useAuth } from "../AuthContext";

export default function Security() {
  const { user, token } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  // sync theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") === "dark";
    setIsDark(savedTheme);
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      handleProfileData(token);
    }
  }, [token, navigate]);

  const handleProfileData = async (jwtToken) => {
    try {
      const response = await AxiosInstance.post(
        "/customer/find/user",
        {},
        {
          headers: {
            authorization: jwtToken,
          },
        }
      );
      if (response.data.data) {
        setUserData(response.data.data);
      } else {
        localStorage.removeItem("blogsite_jwt_token");
        navigate("/login");
      }
    } catch (error) {
      console.error("Token validation or user fetch failed:", error);
      localStorage.removeItem("blogsite_jwt_token");
      navigate("/login");
    }
  };

  if (userData == null) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark
            ? "bg-gradient-to-br from-gray-900 via-black to-gray-900"
            : "bg-gradient-to-br from-orange-50 via-white to-yellow-50"
        }`}
      >
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200">
          Loading security settings...
        </p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-900"
          : "bg-gradient-to-br from-orange-50 via-white to-yellow-50"
      }`}
    >
      {/* just top padding instead of header */}
      <div className="pt-40 pb-12 px-4">
        <div className="min-h-[calc(100vh-7rem)] flex items-start justify-center">
          <div
            className={`w-full max-w-xl rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border transition-all duration-300 ${
              isDark
                ? "bg-white/10 backdrop-blur-2xl border-white/15"
                : "bg-white/95 backdrop-blur-2xl border-orange-100"
            }`}
          >
            <div className="mb-6 text-center">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange-500/10 text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-300">
                Security
              </div>
              <h2
                className={`mt-4 text-2xl sm:text-3xl font-black ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Change Password
              </h2>
              <p
                className={`mt-2 text-sm sm:text-base ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Update your password to keep your account safe.
              </p>
            </div>

            <form className="space-y-5">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Old Password
                </label>
                <input
                  type="password"
                  className={`w-full h-11 sm:h-12 rounded-2xl px-3 sm:px-4 text-sm sm:text-base outline-none transition-all ${
                    isDark
                      ? "bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/70"
                      : "bg-white/70 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/70 shadow-sm"
                  }`}
                  placeholder="Enter your current password"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  New Password
                </label>
                <input
                  type="password"
                  className={`w-full h-11 sm:h-12 rounded-2xl px-3 sm:px-4 text-sm sm:text-base outline-none transition-all ${
                    isDark
                      ? "bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/70"
                      : "bg-white/70 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/70 shadow-sm"
                  }`}
                  placeholder="Enter a new password"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-2xl text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-yellow-500 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all"
                >
                  Save password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
