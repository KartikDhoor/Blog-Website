import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../utils/AxiosInstance";
import { useAuth } from "../AuthContext";
import { ToastContainer, toast } from "react-toastify";

export default function Profile() {
  const { user, token } = useAuth();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const localToken = localStorage.getItem("blogsite_jwt_token");
    if (!localToken) {
      navigate("/login");
    } else {
      handleProfileData(localToken);
    }
  }, [navigate]);

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

  const updateUserProfile = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleUpdateProfile = async () => {
    if (!userData) return;
    try {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("name", userData.name || "");
      formData.append("email", userData.email || "");
      formData.append("phoneNo", userData.phoneNo || "");
      formData.append("introduction", userData.introduction || "");
      if (userData.image instanceof File) {
        formData.append("image", userData.image);
      }

      const response = await AxiosInstance.post(
        "/customer/profile/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      if (response.data.data) {
        setUserData(response.data.data);
        toast.success("Profile updated successfully");
      } else {
        console.error(response.data);
        toast.error("Failed to update profile");
      }
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Something went wrong while updating");
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 via-white to-yellow-50 dark:from-gray-950 dark:via-black dark:to-gray-900">
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200">
          Loading your profile...
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-yellow-50 dark:from-gray-950 dark:via-black dark:to-gray-900 pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/10 backdrop-blur-xl text-xs sm:text-sm font-semibold tracking-wide uppercase text-orange-600 dark:text-orange-300">
              Account
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
              Profile Settings
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Update your personal information and keep your account up to date.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-3xl bg-white/80 dark:bg-white/10 backdrop-blur-2xl border border-white/60 dark:border-white/15 shadow-2xl p-5 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
              {/* Avatar + upload */}
              <div className="flex flex-col items-center lg:items-start gap-4 lg:w-1/3">
                <div className="relative">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white/80 dark:border-white/20 shadow-xl">
                    {userData.image && !(userData.image instanceof File) ? (
                      <img
                        src={userData.image}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src="/user.png"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
                <label className="w-full">
                  <span className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Profile photo
                  </span>
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="block w-full text-xs sm:text-sm text-gray-700 dark:text-gray-200 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-orange-500/90 file:text-white hover:file:bg-orange-600/90 bg-white/70 dark:bg-black/40 border border-gray-200/70 dark:border-gray-700/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400/70"
                  />
                </label>
              </div>

              {/* Form fields */}
              <div className="lg:w-2/3 space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Full name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={userData.name || ""}
                    onChange={updateUserProfile}
                    className="w-full h-11 sm:h-12 px-3 sm:px-4 rounded-2xl bg-white/80 dark:bg-black/40 border border-gray-200/70 dark:border-gray-700/70 text-sm sm:text-base text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400/70 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    placeholder="Your full name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userData.email || ""}
                      onChange={updateUserProfile}
                      className="w-full h-11 sm:h-12 px-3 sm:px-4 rounded-2xl bg-white/80 dark:bg-black/40 border border-gray-200/70 dark:border-gray-700/70 text-sm sm:text-base text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400/70"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      name="phoneNo"
                      value={userData.phoneNo || ""}
                      onChange={updateUserProfile}
                      className="w-full h-11 sm:h-12 px-3 sm:px-4 rounded-2xl bg-white/80 dark:bg-black/40 border border-gray-200/70 dark:border-gray-700/70 text-sm sm:text-base text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400/70"
                      placeholder="+91 00000 00000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    About you
                  </label>
                  <textarea
                    name="introduction"
                    value={userData.introduction || ""}
                    onChange={updateUserProfile}
                    className="w-full min-h-[120px] sm:min-h-[150px] px-3 sm:px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-black/40 border border-gray-200/70 dark:border-gray-700/70 text-sm sm:text-base text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400/70 resize-y"
                    placeholder="Tell us a bit about yourself..."
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleUpdateProfile}
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-yellow-500 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          <ToastContainer position="bottom-right" />
        </div>
      </div>
    </>
  );
}
