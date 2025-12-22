import { useEffect, useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance";
import { FaUser, FaCamera, FaLock } from "react-icons/fa";
import { useAuth } from "../../AuthContext";
import { ToastContainer, toast } from "react-toastify";
import DashboardPopUp from "../DashboardPopUp";

export default function DashboardUser() {
  const { user, token } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  // Password state
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  // Form validation
  const [formErrors, setFormErrors] = useState({});
  const [updatePopup, setUpdatePopup] = useState(false);
  const [passwordPopup, setPasswordPopup] = useState(false);

  // Watch for dark mode
  useEffect(() => {
    const initialDark = document.documentElement.classList.contains("dark");
    setIsDark(initialDark);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.attributeName === "class") {
          const hasDark = document.documentElement.classList.contains("dark");
          setIsDark(hasDark);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await AxiosInstance.post(
          "/customer/find/user",
          {},
          {
            headers: {
              authorization: token,
            },
          }
        );
        if (response?.data?.data) {
          setUserData(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching user:", err.message);
        toast.error("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  // ========== PROFILE HANDLERS ==========
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUserData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const validateProfileForm = () => {
    const errors = {};
    if (!userData.name?.trim()) errors.name = "Name is required";
    if (!userData.email?.trim()) errors.email = "Email is required";
    if (userData.email && !userData.email.includes("@"))
      errors.email = "Valid email required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileSubmit = async () => {
    const token = localStorage.getItem("blogsite_jwt_token");
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("description", userData.description || "");
    if (userData.image && typeof userData.image !== "string") {
      formData.append("image", userData.image);
    }

    try {
      const response = await AxiosInstance.put(
        "/customer/update/user",
        formData,
        {
          headers: {
            authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.data) {
        toast.success("Profile updated successfully! ✨");
        setUpdatePopup(false);
        setFormErrors({});
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err?.response?.data?.message || "Failed to update profile");
    }
  };

  // ========== PASSWORD HANDLERS ==========
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePasswordForm = () => {
    const errors = {};
    if (!passwordForm.oldPassword.trim())
      errors.oldPassword = "Current password required";
    if (!passwordForm.newPassword.trim())
      errors.newPassword = "New password required";
    if (passwordForm.newPassword.length < 6)
      errors.newPassword = "Password must be at least 6 characters";
    if (passwordForm.newPassword !== passwordForm.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordSubmit = async () => {
    const token = localStorage.getItem("blogsite_jwt_token");

    try {
      const response = await AxiosInstance.post(
        "/customer/change-password",
        {
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (response?.data) {
        toast.success("Password changed successfully! 🔒");
        setPasswordPopup(false);
        setPasswordForm({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setPasswordErrors({});
      }
    } catch (err) {
      console.error("Password error:", err);
      toast.error(err?.response?.data?.message || "Failed to change password");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg text-gray-700 dark:text-gray-200">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full space-y-6">
        {/* HEADER */}
        <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 dark:text-orange-300 mb-1">
              Account Settings
            </p>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
              Profile
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage your personal information and security.
            </p>
          </div>
        </div>

        {/* PROFILE SECTION */}
        <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl p-5 sm:p-6 shadow-md">
          <div className="flex items-start gap-6 mb-6">
            {/* Profile Picture */}
            <div className="relative flex-shrink-0">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-orange-500/20 to-yellow-400/20 border-2 border-orange-100 dark:border-white/15 flex items-center justify-center overflow-hidden">
                {userData?.image && typeof userData.image === "string" ? (
                  <img
                    src={userData.image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : userData?.image ? (
                  <img
                    src={URL.createObjectURL(userData.image)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="w-16 h-16 text-orange-500/40" />
                )}
              </div>

              {/* Upload button */}
              <label
                htmlFor="image-input"
                className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center cursor-pointer shadow-lg hover:from-orange-600 hover:to-yellow-500 transition-all"
              >
                <FaCamera className="w-4 h-4 text-white" />
              </label>
              <input
                id="image-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Quick Info */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400 mb-1">
                Current User
              </p>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
                {userData?.name || "User"}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {userData?.email}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                Member since{" "}
                {userData?.createdAt
                  ? new Date(userData.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Form Grid */}
          <div className="space-y-4">
            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={userData?.name || ""}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded-2xl px-3 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
                  placeholder="Your name"
                />
                {formErrors.name && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData?.email || ""}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded-2xl px-3 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
                  placeholder="your@email.com"
                />
                {formErrors.email && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.email}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                Bio
              </label>
              <textarea
                name="description"
                value={userData?.description || ""}
                onChange={handleInputChange}
                className="w-full min-h-[100px] rounded-2xl px-3 py-2 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70 resize-y"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>

          {/* Update Button */}
          <div className="flex justify-end gap-3 mt-5">
            <button
              type="button"
              onClick={() => {
                if (validateProfileForm()) {
                  setUpdatePopup(true);
                }
              }}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold shadow-md shadow-orange-500/40 hover:from-orange-600 hover:to-yellow-500 transition-all"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-2xl border border-orange-100 dark:border-white/15 bg-white/80 dark:bg-black/40 text-sm font-semibold text-gray-800 dark:text-gray-100"
              onClick={() => setFormErrors({})}
            >
              Cancel
            </button>
          </div>

          {updatePopup && (
            <DashboardPopUp
              message="Do you want to update your profile?"
              onConfirm={handleProfileSubmit}
              onCancel={() => setUpdatePopup(false)}
            />
          )}
        </div>

        {/* SECURITY SECTION */}
        <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl p-5 sm:p-6 shadow-md">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 rounded-2xl bg-red-500/20 text-red-600 dark:text-red-400">
              <FaLock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-500 dark:text-red-300 mb-0.5">
                Security
              </p>
              <h3 className="text-lg font-black text-gray-900 dark:text-white">
                Change Password
              </h3>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Keep your account secure by updating your password regularly.
          </p>

          <div className="space-y-4">
            {/* Old Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                Current Password
              </label>
              <input
                type="password"
                name="oldPassword"
                value={passwordForm.oldPassword}
                onChange={handlePasswordChange}
                className="w-full h-10 rounded-2xl px-3 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
                placeholder="Enter current password"
              />
              {passwordErrors.oldPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {passwordErrors.oldPassword}
                </p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className="w-full h-10 rounded-2xl px-3 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
                placeholder="Enter new password"
              />
              {passwordErrors.newPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {passwordErrors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full h-10 rounded-2xl px-3 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
                placeholder="Confirm new password"
              />
              {passwordErrors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {passwordErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Change Password Button */}
          <div className="flex justify-end gap-3 mt-5">
            <button
              type="button"
              onClick={() => {
                if (validatePasswordForm()) {
                  setPasswordPopup(true);
                }
              }}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold shadow-md shadow-red-500/40 hover:from-red-600 hover:to-pink-500 transition-all"
            >
              Change Password
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-2xl border border-orange-100 dark:border-white/15 bg-white/80 dark:bg-black/40 text-sm font-semibold text-gray-800 dark:text-gray-100"
              onClick={() => setPasswordErrors({})}
            >
              Cancel
            </button>
          </div>

          {passwordPopup && (
            <DashboardPopUp
              message="Do you want to change your password?"
              onConfirm={handlePasswordSubmit}
              onCancel={() => setPasswordPopup(false)}
            />
          )}
        </div>

        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
}
