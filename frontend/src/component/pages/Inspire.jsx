import { TbBulbFilled } from "react-icons/tb";
import { GoStarFill } from "react-icons/go";
import { BsArrowUpRight } from "react-icons/bs"; // ✅ FIXED: Bs instead of Lu
import { GiConversation } from "react-icons/gi";

export default function Inspire() {
    return (
        <>
            <div className="min-h-screen pt-32 dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:text-white text-gray-900">
                {/* ✅ pt-32 = 128px top padding for floating navbar */}
                
                {/* Hero Banner */}
                <div className="dark:bg-gray-900/90 bg-slate-100/50 backdrop-blur-xl flex items-center border-b dark:border-gray-800 border-slate-200/50">
                    <div className="w-[90%] mx-auto py-12 lg:py-16">
                        <div className="lg:text-5xl md:text-3xl text-3xl font-medium mb-8 leading-tight">
                            <p>Unlock A world of</p>
                            <p className="lg:hidden md:hidden block mt-2">Knowledge</p>
                        </div>
                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            <div className="lg:w-[30%] lg:text-5xl md:text-3xl text-4xl font-medium lg:block hidden text-center">
                                <p>Knowledge</p>
                            </div>
                            <div className="lg:w-[70%] text-base lg:text-lg text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
                                <p>Explore the latest news from around the world. We bring you Up-To-The-Minute updates on the most significant events, trends, stories. Discover the world through our News Coverage.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="py-16">
                    <div className="w-[90%] mx-auto">
                        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
                            <div className="flex justify-center items-center md:border-r dark:border-gray-800 border-slate-200/50 py-12">
                                <div className="text-center">
                                    <p className="text-4xl lg:text-5xl font-bold dark:text-white text-gray-900 mb-4">
                                        300<span className="dark:text-amber-400 text-blue-500">+</span>
                                    </p>
                                    <p className="text-base dark:text-gray-400 text-gray-600 font-medium">Resources Available</p>
                                </div>
                            </div>
                            <div className="flex justify-center items-center md:border-r dark:border-gray-800 border-slate-200/50 py-12">
                                <div className="text-center">
                                    <p className="text-4xl lg:text-5xl font-bold dark:text-white text-gray-900 mb-4">
                                        12K<span className="dark:text-amber-400 text-blue-500">+</span>
                                    </p>
                                    <p className="text-base dark:text-gray-400 text-gray-600 font-medium">Total Downloads</p>
                                </div>
                            </div>
                            <div className="flex justify-center items-center md:border-r dark:border-gray-800 border-slate-200/50 py-12">
                                <div className="text-center">
                                    <p className="text-4xl lg:text-5xl font-bold dark:text-white text-gray-900 mb-4">
                                        10K<span className="dark:text-amber-400 text-blue-500">+</span>
                                    </p>
                                    <p className="text-base dark:text-gray-400 text-gray-600 font-medium">Active Users</p>
                                </div>
                            </div>
                            <div className="flex justify-center items-center py-12">
                                <div className="text-center">
                                    <p className="text-4xl lg:text-5xl font-bold dark:text-white text-gray-900 mb-4">
                                        100<span className="dark:text-amber-400 text-blue-500">+</span>
                                    </p>
                                    <p className="text-base dark:text-gray-400 text-gray-600 font-medium">Countries Usability</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* In Depth Reports Section */}
                <div className="dark:bg-gray-900/90 bg-slate-100/50 backdrop-blur-xl border-b dark:border-gray-800 border-slate-200/50">
                    <div className="w-[90%] mx-auto py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="lg:w-full w-full order-2 lg:order-1">
                            <button className="mb-6 px-4 py-2 dark:bg-gray-800/50 bg-slate-200/50 border dark:border-gray-700 border-slate-300 rounded-xl text-sm font-medium dark:text-gray-300 text-gray-700">
                                Dive into the details
                            </button>
                            <h2 className="text-4xl lg:text-5xl font-bold dark:text-white text-gray-900 leading-tight">
                                In Depth Reports And Analysis
                            </h2>
                        </div>
                    </div>
                </div>

                {/* AI Revolution Section */}
                <div className="py-16 border-b dark:border-gray-800 border-slate-200/50">
                    <div className="w-[90%] mx-auto flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-[40%] w-full order-2 lg:order-1 flex flex-col items-center lg:items-start">
                            <TbBulbFilled className="text-8xl dark:text-amber-400 text-blue-500 mb-6" />
                            <h3 className="text-3xl lg:text-4xl font-bold dark:text-white text-gray-900 mb-4 text-center lg:text-left">
                                AI Revolution
                            </h3>
                            <p className="text-lg dark:text-gray-400 text-gray-600 leading-relaxed text-center lg:text-left line-clamp-3">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, at eaque! Optio neque quia, ipsam veniam quae dolores nihil nobis natus iure, amet libero ullam ipsum illo ducimus asperiores quidem?
                            </p>
                        </div>
                        <div className="lg:w-[60%] w-full order-1 lg:order-2">
                            <img src="https://picsum.photos/1920/1080" className="w-full h-80 lg:h-96 object-cover rounded-3xl shadow-2xl hover:scale-105 transition-all duration-500" alt="AI Revolution" />
                            <div className="mt-8 p-6 dark:bg-gray-900/50 bg-slate-100/50 backdrop-blur-xl rounded-3xl border dark:border-gray-800 border-slate-200/50">
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="md:col-span-2 space-y-3">
                                        <h4 className="text-xl font-semibold dark:text-white text-gray-900">
                                            Delves into the transformative impact of AI
                                        </h4>
                                        <p className="text-base dark:text-gray-400 text-gray-600 line-clamp-3">
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo laboriosam aliquam et quidem nemo doloribus temporibus, consequatur placeat? Iure corrupti esse nostrum at quis.
                                        </p>
                                    </div>
                                    <div className="flex justify-center md:justify-end">
                                        <button className="flex items-center gap-2 px-6 py-3 dark:bg-gray-900 bg-slate-100 backdrop-blur-xl dark:border-gray-700 border-slate-200 rounded-2xl font-semibold dark:text-gray-300 text-gray-700 hover:dark:bg-orange-500/20 hover:bg-blue-500/20 hover:dark:text-orange-400 hover:text-blue-500 transition-all">
                                            Read Now
                                            <BsArrowUpRight className="text-xl dark:text-orange-400 text-blue-500" />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-6 grid md:grid-cols-3 gap-4 p-4 dark:bg-black/50 bg-slate-50/50 rounded-2xl border dark:border-gray-800 border-slate-200/50">
                                    <div className="text-center p-4 dark:bg-gray-900/70 bg-slate-100/70 rounded-xl border dark:border-gray-700 border-slate-200">
                                        <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Blog</p>
                                        <p className="text-lg font-semibold dark:text-white text-gray-900">50</p>
                                    </div>
                                    <div className="text-center p-4 dark:bg-gray-900/70 bg-slate-100/70 rounded-xl border dark:border-gray-700 border-slate-200">
                                        <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Avg Reading Length</p>
                                        <p className="text-lg font-semibold dark:text-white text-gray-900">30 Min</p>
                                    </div>
                                    <div className="text-center p-4 dark:bg-gray-900/70 bg-slate-100/70 rounded-xl border dark:border-gray-700 border-slate-200">
                                        <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Release Frequency</p>
                                        <p className="text-lg font-semibold dark:text-white text-gray-900">Weekly</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Conversation Section */}
                <div className="py-16 border-b dark:border-gray-800 border-slate-200/50">
                    <div className="w-[90%] mx-auto flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-[40%] w-full order-2 lg:order-1 flex flex-col items-center lg:items-start">
                            <GiConversation className="text-8xl dark:text-amber-400 text-blue-500 mb-6" />
                            <h3 className="text-3xl lg:text-4xl font-bold dark:text-white text-gray-900 mb-4 text-center lg:text-left">
                                AI Conversation
                            </h3>
                            <p className="text-lg dark:text-gray-400 text-gray-600 leading-relaxed text-center lg:text-left line-clamp-3">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, at eaque! Optio neque quia, ipsam veniam quae dolores nihil nobis natus iure, amet libero ullam ipsum illo ducimus asperiores quidem?
                            </p>
                        </div>
                        <div className="lg:w-[60%] w-full order-1 lg:order-2">
                            <img src="https://picsum.photos/1920/1080" className="w-full h-80 lg:h-96 object-cover rounded-3xl shadow-2xl hover:scale-105 transition-all duration-500" alt="AI Conversation" />
                            <div className="mt-8 p-6 dark:bg-gray-900/50 bg-slate-100/50 backdrop-blur-xl rounded-3xl border dark:border-gray-800 border-slate-200/50">
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="md:col-span-2 space-y-3">
                                        <h4 className="text-xl font-semibold dark:text-white text-gray-900">
                                            Delves into the transformative impact of AI
                                        </h4>
                                        <p className="text-base dark:text-gray-400 text-gray-600 line-clamp-3">
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo laboriosam aliquam et quidem nemo doloribus temporibus, consequatur placeat? Iure corrupti esse nostrum at quis.
                                        </p>
                                    </div>
                                    <div className="flex justify-center md:justify-end">
                                        <button className="flex items-center gap-2 px-6 py-3 dark:bg-gray-900 bg-slate-100 backdrop-blur-xl dark:border-gray-700 border-slate-200 rounded-2xl font-semibold dark:text-gray-300 text-gray-700 hover:dark:bg-orange-500/20 hover:bg-blue-500/20 hover:dark:text-orange-400 hover:text-blue-500 transition-all">
                                            Read Now
                                            <BsArrowUpRight className="text-xl dark:text-orange-400 text-blue-500" />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-6 grid md:grid-cols-3 gap-4 p-4 dark:bg-black/50 bg-slate-50/50 rounded-2xl border dark:border-gray-800 border-slate-200/50">
                                    <div className="text-center p-4 dark:bg-gray-900/70 bg-slate-100/70 rounded-xl border dark:border-gray-700 border-slate-200">
                                        <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Blog</p>
                                        <p className="text-lg font-semibold dark:text-white text-gray-900">50</p>
                                    </div>
                                    <div className="text-center p-4 dark:bg-gray-900/70 bg-slate-100/70 rounded-xl border dark:border-gray-700 border-slate-200">
                                        <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Avg Reading Length</p>
                                        <p className="text-lg font-semibold dark:text-white text-gray-900">30 Min</p>
                                    </div>
                                    <div className="text-center p-4 dark:bg-gray-900/70 bg-slate-100/70 rounded-xl border dark:border-gray-700 border-slate-200">
                                        <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Release Frequency</p>
                                        <p className="text-lg font-semibold dark:text-white text-gray-900">Weekly</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resources Grid */}
                <div className="py-16 pb-32">
                    <div className="w-[90%] mx-auto grid md:grid-cols-3 gap-8">
                        {[
                            { title: "FutureTech Trends 2024", img: "https://picsum.photos/1920/1080" },
                            { title: "FutureTech Trends 2024", img: "https://picsum.photos/1920/1080" },
                            { title: "FutureTech Trends 2024", img: "https://picsum.photos/1920/1080" }
                        ].map((resource, index) => (
                            <div key={index} className="group overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br dark:from-gray-900/50 from-slate-100/50 backdrop-blur-xl border dark:border-gray-800 border-slate-200/50">
                                <img src={resource.img} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" alt={resource.title} />
                                <div className="p-8">
                                    <h3 className="text-xl font-semibold dark:text-white text-gray-900 mb-4 group-hover:text-orange-500 transition-colors">{resource.title}</h3>
                                    <p className="text-base dark:text-gray-400 text-gray-600 line-clamp-3 mb-6 leading-relaxed">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque odio distinctio eaque perferendis laudantium labore nulla nemo deserunt, omnis aperiam quod laboriosam ipsa culpa sit obcaecati consectetur dolorem perspiciatis quas!
                                    </p>
                                    <div className="flex gap-4">
                                        <button className="flex-1 py-3 px-6 dark:border-gray-700 border-slate-200 rounded-xl dark:text-gray-300 text-gray-700 font-medium hover:dark:text-orange-400 hover:text-blue-500 hover:dark:bg-gray-800/50 hover:bg-slate-200/50 transition-all">
                                            View Details
                                        </button>
                                        <button className="flex-1 py-3 px-6 dark:border-gray-700 border-slate-200 rounded-xl dark:text-gray-300 text-gray-700 font-medium hover:dark:text-orange-400 hover:text-blue-500 hover:dark:bg-gray-800/50 hover:bg-slate-200/50 transition-all">
                                            Download Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
