import { useState } from "react";
import { motion } from "framer-motion";
import { MdEmail, MdSupportAgent, MdLocationOn, MdShare } from "react-icons/md";
import { FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { GiBugleCall } from "react-icons/gi";
import { ToastContainer, toast } from "react-toastify";
import AxiosInstance from "../utils/AxiosInstance";
import Reviews from "./Reviews";

export default function Contact() {
  // ✅ Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });
  const [sending, setSending] = useState(false);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.firstName.trim()) {
      toast.error("First name is required");
      return;
    }
    if (!form.lastName.trim()) {
      toast.error("Last name is required");
      return;
    }
    if (!form.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!validateEmail(form.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!form.message.trim()) {
      toast.error("Message is required");
      return;
    }
    if (!form.agree) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    try {
      setSending(true);
      toast.info("Sending your message...");

      const res = await AxiosInstance.post("/customer/contact", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        message: form.message,
      });

      toast.dismiss();

      if (res.data.success) {
        toast.success(res.data.message || "Message sent successfully! We'll get back to you soon.");
        // Reset form
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          agree: false,
        });
      } else {
        toast.error(res.data.message || "Failed to send message");
      }
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error(
        err.response?.data?.message || "Something went wrong while sending your message"
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="min-h-screen pt-32 dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:text-white text-gray-900">
        {/* Contact Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-20 border-b dark:border-gray-800 border-slate-200/50"
        >
          <div className="w-[90%] max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid lg:grid-cols-4 md:grid-cols-2 gap-8"
            >
              {/* General Inquiries */}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="group p-8 dark:bg-gradient-to-br dark:from-gray-900/60 dark:to-gray-800/60 bg-gradient-to-br from-slate-100/60 to-white/60 backdrop-blur-xl rounded-3xl border dark:border-orange-500/30 border-blue-500/30 hover:shadow-2xl dark:hover:shadow-orange-500/25 hover:shadow-blue-500/25 transition-all duration-500 overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-center lg:text-left mb-6"
                >
                  <div className="w-16 h-16 mx-auto lg:mx-0 dark:bg-gradient-to-br dark:from-orange-500/30 dark:to-yellow-500/30 bg-gradient-to-br from-blue-500/30 to-indigo-500/30 p-4 rounded-2xl shadow-lg flex items-center justify-center mb-4">
                    <MdEmail className="w-8 h-8 dark:text-orange-400 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-black mb-2 dark:bg-gradient-to-r dark:from-orange-400 dark:via-yellow-400 dark:to-orange-500 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 bg-clip-text dark:text-transparent text-transparent">
                    General Inquiries
                  </h3>
                </motion.div>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-between gap-3 p-4 dark:bg-gradient-to-r dark:from-orange-500/10 dark:to-yellow-500/10 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border dark:border-orange-400/40 border-blue-400/40 rounded-xl hover:dark:bg-orange-500/20 hover:bg-blue-500/20 transition-all backdrop-blur-xl shadow-lg hover:shadow-xl text-sm"
                  >
                    <span className="flex-1 font-semibold dark:text-gray-100 text-gray-900 truncate pr-2 break-all">
                      contact@neuradhoor.com
                    </span>
                    <MdShare className="text-lg dark:text-orange-400 text-blue-500 flex-shrink-0" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-between gap-3 p-4 dark:bg-gradient-to-r dark:from-orange-500/10 dark:to-yellow-500/10 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border dark:border-orange-400/40 border-blue-400/40 rounded-xl hover:dark:bg-orange-500/20 hover:bg-blue-500/20 transition-all backdrop-blur-xl shadow-lg hover:shadow-xl text-sm"
                  >
                    <span className="flex-1 font-semibold dark:text-gray-100 text-gray-900 truncate pr-2">
                      +91 99238 38448
                    </span>
                    <MdShare className="text-lg dark:text-orange-400 text-blue-500 flex-shrink-0" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Technical Support */}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="group p-8 dark:bg-gradient-to-br dark:from-gray-900/60 dark:to-gray-800/60 bg-gradient-to-br from-slate-100/60 to-white/60 backdrop-blur-xl rounded-3xl border dark:border-orange-500/30 border-blue-500/30 hover:shadow-2xl dark:hover:shadow-orange-500/25 hover:shadow-blue-500/25 transition-all duration-500 overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-center lg:text-left mb-6"
                >
                  <div className="w-16 h-16 mx-auto lg:mx-0 dark:bg-gradient-to-br dark:from-orange-500/30 dark:to-yellow-500/30 bg-gradient-to-br from-blue-500/30 to-indigo-500/30 p-4 rounded-2xl shadow-lg flex items-center justify-center mb-4">
                    <MdSupportAgent className="w-8 h-8 dark:text-orange-400 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-black mb-2 dark:bg-gradient-to-r dark:from-orange-400 dark:via-yellow-400 dark:to-orange-500 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 bg-clip-text dark:text-transparent text-transparent">
                    Technical Support
                  </h3>
                </motion.div>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-between gap-3 p-4 dark:bg-gradient-to-r dark:from-orange-500/10 dark:to-yellow-500/10 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border dark:border-orange-400/40 border-blue-400/40 rounded-xl hover:dark:bg-orange-500/20 hover:bg-blue-500/20 transition-all backdrop-blur-xl shadow-lg hover:shadow-xl text-sm"
                  >
                    <span className="flex-1 font-semibold dark:text-gray-100 text-gray-900 truncate pr-2 break-all">
                      support@neuradhoor.com
                    </span>
                    <MdShare className="text-lg dark:text-orange-400 text-blue-500 flex-shrink-0" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-between gap-3 p-4 dark:bg-gradient-to-r dark:from-orange-500/10 dark:to-yellow-500/10 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border dark:border-orange-400/40 border-blue-400/40 rounded-xl hover:dark:bg-orange-500/20 hover:bg-blue-500/20 transition-all backdrop-blur-xl shadow-lg hover:shadow-xl text-sm"
                  >
                    <span className="flex-1 font-semibold dark:text-gray-100 text-gray-900 truncate pr-2">
                      +91 99238 38448
                    </span>
                    <MdShare className="text-lg dark:text-orange-400 text-blue-500 flex-shrink-0" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Office Location */}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="group p-8 dark:bg-gradient-to-br dark:from-gray-900/60 dark:to-gray-800/60 bg-gradient-to-br from-slate-100/60 to-white/60 backdrop-blur-xl rounded-3xl border dark:border-orange-500/30 border-blue-500/30 hover:shadow-2xl dark:hover:shadow-orange-500/25 hover:shadow-blue-500/25 transition-all duration-500 overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-center lg:text-left mb-6"
                >
                  <div className="w-16 h-16 mx-auto lg:mx-0 dark:bg-gradient-to-br dark:from-orange-500/30 dark:to-yellow-500/30 bg-gradient-to-br from-blue-500/30 to-indigo-500/30 p-4 rounded-2xl shadow-lg flex items-center justify-center mb-4">
                    <MdLocationOn className="w-8 h-8 dark:text-orange-400 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-black mb-2 dark:bg-gradient-to-r dark:from-orange-400 dark:via-yellow-400 dark:to-orange-500 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 bg-clip-text dark:text-transparent text-transparent">
                    Our Office
                  </h3>
                </motion.div>
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-semibold">
                    231 AI Tech Avenue
                    <br />
                    Techvilla, 647878
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-start gap-4 p-6 dark:bg-gradient-to-r dark:from-orange-500/10 dark:to-yellow-500/10 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border dark:border-orange-400/40 border-blue-400/40 rounded-2xl hover:dark:bg-orange-500/20 hover:bg-blue-500/20 transition-all backdrop-blur-xl shadow-lg hover:shadow-xl"
                  >
                    <span className="text-left flex-1 font-semibold dark:text-gray-100 text-gray-900">
                      Get Directions
                    </span>
                    <MdShare className="text-xl dark:text-orange-400 text-blue-500 shrink-0" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Social Media */}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="group p-8 dark:bg-gradient-to-br dark:from-gray-900/60 dark:to-gray-800/60 bg-gradient-to-br from-slate-100/60 to-white/60 backdrop-blur-xl rounded-3xl border dark:border-orange-500/30 border-blue-500/30 hover:shadow-2xl dark:hover:shadow-orange-500/25 hover:shadow-blue-500/25 transition-all duration-500 overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-center mb-8"
                >
                  <div className="w-16 h-16 mx-auto dark:bg-gradient-to-br dark:from-orange-500/30 dark:to-yellow-500/30 bg-gradient-to-br from-blue-500/30 to-indigo-500/30 p-4 rounded-2xl shadow-lg flex items-center justify-center mb-4">
                    <MdShare className="w-8 h-8 dark:text-orange-400 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-black mb-6 dark:bg-gradient-to-r dark:from-orange-400 dark:via-yellow-400 dark:to-orange-500 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 bg-clip-text dark:text-transparent text-transparent">
                    Connect With Us
                  </h3>
                </motion.div>
                <div className="grid grid-cols-3 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 dark:bg-gradient-to-r dark:from-orange-500/10 dark:to-yellow-500/10 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border dark:border-orange-400/40 border-blue-400/40 rounded-2xl hover:dark:bg-orange-500/20 hover:bg-blue-500/20 transition-all flex items-center justify-center shadow-lg hover:shadow-xl backdrop-blur-xl"
                  >
                    <FaTwitter className="text-2xl dark:text-orange-400 text-blue-500" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 dark:bg-gradient-to-r dark:from-orange-500/10 dark:to-yellow-500/10 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border dark:border-orange-400/40 border-blue-400/40 rounded-2xl hover:dark:bg-orange-500/20 hover:bg-blue-500/20 transition-all flex items-center justify-center shadow-lg hover:shadow-xl backdrop-blur-xl"
                  >
                    <FaLinkedinIn className="text-2xl dark:text-orange-400 text-blue-500" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 dark:bg-gradient-to-r dark:from-orange-500/10 dark:to-yellow-500/10 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border dark:border-orange-400/40 border-blue-400/40 rounded-2xl hover:dark:bg-orange-500/20 hover:bg-blue-500/20 transition-all flex items-center justify-center shadow-lg hover:shadow-xl backdrop-blur-xl"
                  >
                    <FaInstagram className="text-2xl dark:text-orange-400 text-blue-500" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact Form Section */}
        <div className="py-20">
          <div className="w-[90%] max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Hero */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:order-1 order-2"
            >
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <GiBugleCall className="text-9xl lg:text-[10rem] dark:text-orange-400 text-blue-500 mb-8 mx-auto lg:mx-0 drop-shadow-2xl" />
              </motion.div>
              <h2 className="text-4xl lg:text-6xl font-black dark:text-white text-gray-900 leading-tight mb-6">
                Get in touch
                <br />
                <span className="dark:bg-gradient-to-r dark:from-orange-400 dark:via-yellow-400 dark:to-orange-500 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 bg-clip-text dark:text-transparent text-transparent">
                  With the Team
                </span>
              </h2>
              <p className="text-xl dark:text-gray-400 text-gray-600 leading-relaxed max-w-lg">
                Have a question or project idea? We'd love to hear from you. Send us a message and we'll respond within 24 hours.
              </p>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:order-2 order-1"
            >
              <form
                onSubmit={handleSubmit}
                className="space-y-6 p-8 lg:p-12 dark:bg-gradient-to-br dark:from-gray-900/50 dark:to-gray-800/50 bg-gradient-to-br from-slate-100/50 to-white/50 backdrop-blur-xl rounded-3xl border dark:border-orange-500/30 border-blue-500/30 shadow-2xl"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold dark:text-gray-300 text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      disabled={sending}
                      className="w-full p-4 rounded-2xl border dark:border-gray-700 border-slate-200 dark:bg-gray-900/70 bg-slate-100/70 backdrop-blur-xl dark:text-white text-gray-900 focus:dark:border-orange-400 focus:border-blue-400 focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 outline-none transition-all disabled:opacity-60"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold dark:text-gray-300 text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      disabled={sending}
                      className="w-full p-4 rounded-2xl border dark:border-gray-700 border-slate-200 dark:bg-gray-900/70 bg-slate-100/70 backdrop-blur-xl dark:text-white text-gray-900 focus:dark:border-orange-400 focus:border-blue-400 focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 outline-none transition-all disabled:opacity-60"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold dark:text-gray-300 text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      disabled={sending}
                      className="w-full p-4 rounded-2xl border dark:border-gray-700 border-slate-200 dark:bg-gray-900/70 bg-slate-100/70 backdrop-blur-xl dark:text-white text-gray-900 focus:dark:border-orange-400 focus:border-blue-400 focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 outline-none transition-all disabled:opacity-60"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold dark:text-gray-300 text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      disabled={sending}
                      className="w-full p-4 rounded-2xl border dark:border-gray-700 border-slate-200 dark:bg-gray-900/70 bg-slate-100/70 backdrop-blur-xl dark:text-white text-gray-900 focus:dark:border-orange-400 focus:border-blue-400 focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 outline-none transition-all disabled:opacity-60"
                      placeholder="+91 99238 38448"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold dark:text-gray-300 text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    disabled={sending}
                    className="w-full p-4 rounded-2xl border dark:border-gray-700 border-slate-200 dark:bg-gray-900/70 bg-slate-100/70 backdrop-blur-xl dark:text-white text-gray-900 resize-vertical focus:dark:border-orange-400 focus:border-blue-400 focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 outline-none transition-all disabled:opacity-60"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <div className="flex items-center gap-4 p-2 dark:bg-gray-900/30 bg-slate-100/30 rounded-2xl border dark:border-gray-700 border-slate-200">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                    disabled={sending}
                    className="w-5 h-5 rounded dark:bg-gray-800 bg-slate-200 disabled:opacity-60 cursor-pointer"
                  />
                  <label className="text-sm dark:text-gray-300 text-gray-700 cursor-pointer">
                    I agree with the Terms and conditions and privacy policies
                  </label>
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={!sending ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!sending ? { scale: 0.98 } : {}}
                  className={`w-full py-5 px-8 dark:bg-gradient-to-r from-orange-500 to-orange-600 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-xl rounded-3xl shadow-2xl dark:shadow-orange-500/25 shadow-blue-500/25 transition-all duration-300
                    ${
                      sending
                        ? "opacity-90 cursor-not-allowed"
                        : "hover:shadow-xl hover:-translate-y-1"
                    }`}
                >
                  {sending ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-20 border-t dark:border-gray-800 border-slate-200/50"
        >
          <div className="w-[90%] max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-black dark:text-white text-gray-900 mb-6 dark:bg-gradient-to-r dark:from-orange-400 dark:via-yellow-400 dark:to-orange-500 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 bg-clip-text dark:text-transparent text-transparent">
                Frequently Asked Questions
              </h2>
              <p className="text-xl dark:text-gray-400 text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about our platform, resources, and services.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: "How do I access premium resources?",
                  answer:
                    "Premium resources are available to subscribed members. Sign up for a plan to unlock ebooks, whitepapers, and exclusive reports.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer:
                    "We accept all major credit cards, PayPal, and cryptocurrency payments for maximum flexibility.",
                },
                {
                  question: "Can I cancel my subscription anytime?",
                  answer:
                    "Yes! Cancel anytime with no questions asked. Your access continues until the end of your billing period.",
                },
                {
                  question: "Is there a free trial available?",
                  answer:
                    "Absolutely! All plans come with a 14-day free trial so you can explore premium content risk-free.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group dark:bg-gray-900/50 bg-slate-100/50 backdrop-blur-xl rounded-3xl p-8 border dark:border-gray-800 border-slate-200/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <h4 className="text-xl font-semibold dark:text-white text-gray-900 flex-1 mr-4 group-hover:dark:text-orange-400 group-hover:text-blue-500 transition-colors">
                      {faq.question}
                    </h4>
                    <div className="text-2xl dark:text-gray-400 text-gray-600 group-hover:dark:text-orange-400 group-hover:text-blue-500 transition-colors">
                      ▼
                    </div>
                  </div>
                  <p className="mt-4 dark:text-gray-400 text-gray-600 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-96 overflow-hidden transition-all duration-500">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <Reviews />
      </div>

      <ToastContainer position="bottom-right" />
    </>
  );
}
