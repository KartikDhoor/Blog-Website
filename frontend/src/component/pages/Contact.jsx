import { BsArrowUpRight } from "react-icons/bs"; // ✅ FIXED: Bs instead of Lu
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { GiBugleCall } from "react-icons/gi";
import Reviews from "./Reviews";

export default function Contact() {
    return (
        <>
            <div className="min-h-screen pt-32 dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:text-white text-gray-900">
                {/* ✅ pt-32 = 128px top padding for floating navbar */}
                
                {/* Contact Info Section */}
                <div className="py-20 border-b dark:border-gray-800 border-slate-200/50">
                    <div className="w-[90%] max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
                            {/* General Inquiries */}
                            <div className="group p-8 dark:bg-gray-900/50 bg-slate-100/50 backdrop-blur-xl rounded-3xl border dark:border-gray-800 border-slate-200/50 hover:shadow-2xl dark:hover:shadow-orange-500/20 hover:shadow-blue-500/20 transition-all duration-500">
                                <div className="text-center lg:text-left mb-6">
                                    <h3 className="text-2xl font-bold mb-4 dark:text-white text-gray-900">General Inquiries</h3>
                                </div>
                                <div className="space-y-4">
                                    <button className="w-full flex items-center justify-start gap-3 p-4 dark:bg-gray-800/50 bg-slate-200/50 border dark:border-gray-700 border-slate-300 rounded-2xl hover:dark:bg-orange-500/20 hover:bg-blue-500/20 transition-all group-hover:scale-[1.02]">
                                        <span className="text-left flex-1">contact@neuradhoor.com</span>
                                        <BsArrowUpRight className="text-xl dark:text-orange-400 text-blue-500" />
                                    </button>
                                    <button className="w-full flex items-center justify-start gap-3 p-4 dark:bg-gray-800/50 bg-slate-200/50 border dark:border-gray-700 border-slate-300 rounded-2xl hover:dark:bg-orange-500/20 hover:bg-blue-500/20 transition-all group-hover:scale-[1.02]">
                                        <span className="text-left flex-1">+91 99238 38448</span>
                                        <BsArrowUpRight className="text-xl dark:text-orange-400 text-blue-500" />
                                    </button>
                                </div>
                            </div>

                            {/* Technical Support */}
                            <div className="group p-8 dark:bg-gray-900/50 bg-slate-100/50 backdrop-blur-xl rounded-3xl border dark:border-gray-800 border-slate-200/50 hover:shadow-2xl dark:hover:shadow-orange-500/20 hover:shadow-blue-500/20 transition-all duration-500">
                                <div className="text-center lg:text-left mb-6">
                                    <h3 className="text-2xl font-bold mb-4 dark:text-white text-gray-900">Technical Support</h3>
                                </div>
                                <div className="space-y-4">
                                    <button className="w-full flex items-center justify-start gap-3 p-4 dark:bg-gray-800/50 bg-slate-200/50 border dark:border-gray-700 border-slate-300 rounded-2xl hover:dark:bg-orange-500/20 hover:bg-blue-500/20 transition-all group-hover:scale-[1.02]">
                                        <span className="text-left flex-1">support@neuradhoor.com</span>
                                        <BsArrowUpRight className="text-xl dark:text-orange-400 text-blue-500" />
                                    </button>
                                    <button className="w-full flex items-center justify-start gap-3 p-4 dark:bg-gray-800/50 bg-slate-200/50 border dark:border-gray-700 border-slate-300 rounded-2xl hover:dark:bg-orange-500/20 hover:bg-blue-500/20 transition-all group-hover:scale-[1.02]">
                                        <span className="text-left flex-1">+91 99238 38448</span>
                                        <BsArrowUpRight className="text-xl dark:text-orange-400 text-blue-500" />
                                    </button>
                                </div>
                            </div>

                            {/* Office Location */}
                            <div className="group p-8 dark:bg-gray-900/50 bg-slate-100/50 backdrop-blur-xl rounded-3xl border dark:border-gray-800 border-slate-200/50 hover:shadow-2xl dark:hover:shadow-orange-500/20 hover:shadow-blue-500/20 transition-all duration-500">
                                <div className="text-center lg:text-left mb-6">
                                    <h3 className="text-2xl font-bold mb-4 dark:text-white text-gray-900">Our Office</h3>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-gray-400 text-sm leading-relaxed">231 AI Tech Avenue<br/>Techvilla, 647878</p>
                                    <button className="w-full flex items-center justify-start gap-3 p-4 dark:bg-gray-800/50 bg-slate-200/50 border dark:border-gray-700 border-slate-300 rounded-2xl hover:dark:bg-orange-500/20 hover:bg-blue-500/20 transition-all group-hover:scale-[1.02]">
                                        <span className="text-left flex-1">Get Directions</span>
                                        <BsArrowUpRight className="text-xl dark:text-orange-400 text-blue-500" />
                                    </button>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="group p-8 dark:bg-gray-900/50 bg-slate-100/50 backdrop-blur-xl rounded-3xl border dark:border-gray-800 border-slate-200/50 hover:shadow-2xl dark:hover:shadow-orange-500/20 hover:shadow-blue-500/20 transition-all duration-500">
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold mb-6 dark:text-white text-gray-900">Connect With Us</h3>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <button className="p-4 dark:bg-gray-800/50 bg-slate-200/50 border dark:border-gray-700 border-slate-300 rounded-2xl hover:dark:bg-orange-500/20 hover:bg-blue-500/20 transition-all flex items-center justify-center">
                                        <FaTwitter className="text-2xl dark:text-gray-300 text-gray-700 hover:dark:text-orange-400 hover:text-blue-500" />
                                    </button>
                                    <button className="p-4 dark:bg-gray-800/50 bg-slate-200/50 border dark:border-gray-700 border-slate-300 rounded-2xl hover:dark:bg-orange-500/20 hover:bg-blue-500/20 transition-all flex items-center justify-center">
                                        <FaLinkedinIn className="text-2xl dark:text-gray-300 text-gray-700 hover:dark:text-orange-400 hover:text-blue-500" />
                                    </button>
                                    <button className="p-4 dark:bg-gray-800/50 bg-slate-200/50 border dark:border-gray-700 border-slate-300 rounded-2xl hover:dark:bg-orange-500/20 hover:bg-blue-500/20 transition-all flex items-center justify-center">
                                        <FaInstagram className="text-2xl dark:text-gray-300 text-gray-700 hover:dark:text-orange-400 hover:text-blue-500" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="py-20">
                    <div className="w-[90%] max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Side - Hero */}
                        <div className="lg:order-1 order-2">
                            <GiBugleCall className="text-9xl lg:text-[10rem] dark:text-amber-400 text-blue-500 mb-8 mx-auto lg:mx-0" />
                            <h2 className="text-4xl lg:text-6xl font-black dark:text-white text-gray-900 leading-tight mb-6">
                                Get in touch
                                <br />
                                <span className="dark:text-amber-400 text-blue-500">With the Team</span>
                            </h2>
                            <p className="text-xl dark:text-gray-400 text-gray-600 leading-relaxed max-w-lg">
                                Have a question or project idea? We'd love to hear from you. Send us a message and we'll respond within 24 hours.
                            </p>
                        </div>

                        {/* Right Side - Form */}
                        <div className="lg:order-2 order-1">
                            <div className="space-y-6 p-8 lg:p-12 dark:bg-gray-900/50 bg-slate-100/50 backdrop-blur-xl rounded-3xl border dark:border-gray-800 border-slate-200/50 shadow-2xl">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold dark:text-gray-300 text-gray-700 mb-2">First Name</label>
                                        <input 
                                            className="w-full p-4 rounded-2xl border dark:border-gray-700 border-slate-200 dark:bg-gray-900/70 bg-slate-100/70 backdrop-blur-xl dark:text-white text-gray-900 focus:dark:border-orange-400 focus:border-blue-400 focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 outline-none transition-all" 
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold dark:text-gray-300 text-gray-700 mb-2">Last Name</label>
                                        <input 
                                            className="w-full p-4 rounded-2xl border dark:border-gray-700 border-slate-200 dark:bg-gray-900/70 bg-slate-100/70 backdrop-blur-xl dark:text-white text-gray-900 focus:dark:border-orange-400 focus:border-blue-400 focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 outline-none transition-all" 
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold dark:text-gray-300 text-gray-700 mb-2">Email</label>
                                        <input 
                                            type="email"
                                            className="w-full p-4 rounded-2xl border dark:border-gray-700 border-slate-200 dark:bg-gray-900/70 bg-slate-100/70 backdrop-blur-xl dark:text-white text-gray-900 focus:dark:border-orange-400 focus:border-blue-400 focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 outline-none transition-all" 
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold dark:text-gray-300 text-gray-700 mb-2">Phone</label>
                                        <input 
                                            type="tel"
                                            className="w-full p-4 rounded-2xl border dark:border-gray-700 border-slate-200 dark:bg-gray-900/70 bg-slate-100/70 backdrop-blur-xl dark:text-white text-gray-900 focus:dark:border-orange-400 focus:border-blue-400 focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 outline-none transition-all" 
                                            placeholder="+91 99238 38448"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold dark:text-gray-300 text-gray-700 mb-2">Message</label>
                                    <textarea 
                                        rows={5}
                                        className="w-full p-4 rounded-2xl border dark:border-gray-700 border-slate-200 dark:bg-gray-900/70 bg-slate-100/70 backdrop-blur-xl dark:text-white text-gray-900 resize-vertical focus:dark:border-orange-400 focus:border-blue-400 focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 outline-none transition-all" 
                                        placeholder="Tell us about your project..."
                                    />
                                </div>

                                <div className="flex items-center gap-4 p-2 dark:bg-gray-900/30 bg-slate-100/30 rounded-2xl border dark:border-gray-700 border-slate-200">
                                    <input type="checkbox" className="w-5 h-5 rounded dark:bg-gray-800 bg-slate-200" />
                                    <label className="text-sm dark:text-gray-300 text-gray-700">
                                        I agree with the Terms and conditions and privacy policies
                                    </label>
                                </div>

                                <button className="w-full py-5 px-8 dark:bg-gradient-to-r from-orange-500 to-orange-600 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-xl rounded-3xl shadow-2xl dark:shadow-orange-500/25 shadow-blue-500/25 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Extended Content - FAQ Section */}
                <div className="py-20 border-t dark:border-gray-800 border-slate-200/50">
                    <div className="w-[90%] max-w-4xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl lg:text-5xl font-black dark:text-white text-gray-900 mb-6">
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
                                    answer: "Premium resources are available to subscribed members. Sign up for a plan to unlock ebooks, whitepapers, and exclusive reports."
                                },
                                {
                                    question: "What payment methods do you accept?",
                                    answer: "We accept all major credit cards, PayPal, and cryptocurrency payments for maximum flexibility."
                                },
                                {
                                    question: "Can I cancel my subscription anytime?",
                                    answer: "Yes! Cancel anytime with no questions asked. Your access continues until the end of your billing period."
                                },
                                {
                                    question: "Is there a free trial available?",
                                    answer: "Absolutely! All plans come with a 14-day free trial so you can explore premium content risk-free."
                                }
                            ].map((faq, index) => (
                                <div key={index} className="group dark:bg-gray-900/50 bg-slate-100/50 backdrop-blur-xl rounded-3xl p-8 border dark:border-gray-800 border-slate-200/50 hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-start justify-between cursor-pointer">
                                        <h4 className="text-xl font-semibold dark:text-white text-gray-900 flex-1 mr-4 group-hover:text-orange-500 transition-colors">
                                            {faq.question}
                                        </h4>
                                        <div className="text-2xl dark:text-gray-400 text-gray-600 group-hover:dark:text-orange-400 group-hover:text-blue-500 transition-colors">
                                            ▼
                                        </div>
                                    </div>
                                    <p className="mt-4 dark:text-gray-400 text-gray-600 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-96 overflow-hidden transition-all duration-500">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Reviews />
            </div>
        </>
    );
}
