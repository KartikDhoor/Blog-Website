import { motion } from "framer-motion";
import { MdLightbulbOutline } from "react-icons/md";
import { BsArrowUpRight } from "react-icons/bs";
import { MdChatBubbleOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AxiosInstance from "../utils/AxiosInstance";

export default function Inspire() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Put your category ID here later
  const categoryId = "69e675b1afd297e396c1dc83";

  useEffect(() => {
    if (categoryId) {
      fetchInspireBlogs();
    }
  }, [categoryId]);

  const fetchInspireBlogs = async () => {
    try {
      const response = await AxiosInstance.post("/customer/blogs", {
        category: categoryId,
        limit: 5,
        page: 1,
        sortBy: "createdAt",
        order: "desc",
        status: "published",
      });

      if (response.data.success) {
        setBlogs(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching inspire blogs:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const featuredBlog = blogs[0];
  const secondBlog = blogs[1];
  const resourceBlogs = blogs.slice(2, 5);
  const categoryName = featuredBlog?.category?.categoryName || "Category";

  return (
    <>
      <div className="min-h-screen pt-32 dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:text-white text-gray-900">
        
        {/* Hero Banner - Animated */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="dark:bg-gray-900/90 bg-slate-100/50 backdrop-blur-xl flex items-center border-b dark:border-gray-800 border-slate-200/50"
        >
          <div className="w-[90%] mx-auto py-12 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="lg:text-5xl md:text-3xl text-3xl font-black mb-8 leading-tight dark:bg-gradient-to-r from-orange-100 via-orange-200 to-yellow-200 bg-gradient-to-r from-orange-600 via-orange-400 to-yellow-400 bg-clip-text dark:text-transparent text-transparent"
            >
              <p>Unlock A world of</p>
              <p className="lg:hidden md:hidden block mt-2">{categoryName}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col lg:flex-row items-center gap-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="lg:w-[30%] lg:text-5xl md:text-3xl text-4xl font-black lg:block hidden text-center dark:text-orange-300 text-orange-600"
              >
                <p>{categoryName}</p>
              </motion.div>

              <div className="lg:w-[70%] text-base lg:text-lg text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
                <p>
                  Explore the latest articles, insights, and analysis from our {categoryName} collection. Discover featured stories and stay updated with fresh perspectives.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Grid - Animated */}
        <div className="py-16">
          <div className="w-[90%] mx-auto">
            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
              {[
                { number: `${blogs.length}+`, label: "Resources Available" },
                { number: `${blogs.reduce((acc, blog) => acc + (blog.comments?.length || 0), 0)}+`, label: "Total Comments" },
                { number: `${blogs.reduce((acc, blog) => acc + (blog.likes?.length || 0), 0)}+`, label: "Total Likes" },
                { number: "1", label: "Category Focus" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="flex justify-center items-center md:border-r dark:border-gray-800 border-slate-200/50 py-12 group cursor-pointer"
                >
                  <div className="text-center">
                    <motion.p
                      initial={{ scale: 0.9 }}
                      whileInView={{ scale: 1 }}
                      className="text-4xl lg:text-5xl font-bold dark:text-white text-gray-900 mb-4 group-hover:scale-110 transition-transform duration-300"
                    >
                      {stat.number}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="text-base dark:text-gray-400 text-gray-600 font-medium"
                    >
                      {stat.label}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* In Depth Reports Section - Animated */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="dark:bg-gray-900/90 bg-slate-100/50 backdrop-blur-xl border-b dark:border-gray-800 border-slate-200/50"
        >
          <div className="w-[90%] mx-auto py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-full w-full order-2 lg:order-1">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="mb-6 px-4 py-2 dark:bg-gray-800/50 bg-slate-200/50 border dark:border-gray-700 border-slate-300 rounded-xl text-sm font-medium dark:text-gray-300 text-gray-700"
              >
                Dive into the details
              </motion.button>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl lg:text-5xl font-black leading-tight dark:bg-gradient-to-r from-orange-100 via-orange-200 to-yellow-200 bg-gradient-to-r from-orange-600 via-orange-400 to-yellow-400 bg-clip-text dark:text-transparent text-transparent"
              >
                In Depth Reports And Analysis
              </motion.h2>
            </div>
          </div>
        </motion.div>

        {/* AI Revolution Section - Animated */}
        {featuredBlog && (
          <div className="py-16 border-b dark:border-gray-800 border-slate-200/50">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="w-[90%] mx-auto flex flex-col lg:flex-row gap-12 items-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="lg:w-[40%] w-full order-2 lg:order-1 flex flex-col items-center lg:items-start"
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="mb-6"
                >
                  <MdLightbulbOutline className="text-8xl dark:text-orange-400 text-orange-500" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-3xl lg:text-4xl font-bold dark:text-white text-gray-900 mb-4 text-center lg:text-left"
                >
                  {featuredBlog.title}
                </motion.h3>
                <p className="text-lg dark:text-gray-400 text-gray-600 leading-relaxed text-center lg:text-left line-clamp-3">
                  {featuredBlog.introduction?.replace(/<[^>]*>/g, "")}
                </p>
              </motion.div>

              <div className="lg:w-[60%] w-full order-1 lg:order-2">
                <img
                  src={featuredBlog.image || "https://picsum.photos/1920/1080"}
                  className="w-full h-80 lg:h-96 object-cover rounded-3xl shadow-2xl hover:scale-105 transition-all duration-500"
                  alt={featuredBlog.title}
                />
                <div className="mt-8 p-6 dark:bg-gray-900/50 bg-slate-100/50 backdrop-blur-xl rounded-3xl border dark:border-gray-800 border-slate-200/50">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-3">
                      <h4 className="text-xl font-semibold dark:text-white text-gray-900">
                        {featuredBlog.category?.categoryName}
                      </h4>
                      <p className="text-base dark:text-gray-400 text-gray-600 line-clamp-3">
                        {featuredBlog.introduction?.replace(/<[^>]*>/g, "")}
                      </p>
                    </div>
                    <div className="flex justify-center md:justify-end">
                      <Link to={`/blog/${featuredBlog.slug}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-2 px-6 py-3 dark:bg-gray-900 bg-slate-100 backdrop-blur-xl dark:border-gray-700 border-slate-200 rounded-2xl font-semibold dark:text-gray-300 text-gray-700 hover:dark:bg-orange-500/20 hover:bg-blue-500/20 hover:dark:text-orange-400 hover:text-blue-500 transition-all"
                        >
                          Read Now
                          <BsArrowUpRight className="text-xl dark:text-orange-400 text-blue-500" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                  <div className="mt-6 grid md:grid-cols-3 gap-4 p-4 dark:bg-black/50 bg-slate-50/50 rounded-2xl border dark:border-gray-800 border-slate-200/50">
                    <div className="text-center p-4 dark:bg-gray-900/70 bg-slate-100/70 rounded-xl border dark:border-gray-700 border-slate-200">
                      <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Blog</p>
                      <p className="text-lg font-semibold dark:text-white text-gray-900">
                        {featuredBlog.comments?.length || 0}
                      </p>
                    </div>
                    <div className="text-center p-4 dark:bg-gray-900/70 bg-slate-100/70 rounded-xl border dark:border-gray-700 border-slate-200">
                      <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Avg Reading Length</p>
                      <p className="text-lg font-semibold dark:text-white text-gray-900">
                        {featuredBlog.readingTime || "N/A"}
                      </p>
                    </div>
                    <div className="text-center p-4 dark:bg-gray-900/70 bg-slate-100/70 rounded-xl border dark:border-gray-700 border-slate-200">
                      <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Release Frequency</p>
                      <p className="text-lg font-semibold dark:text-white text-gray-900">
                        Latest
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* AI Conversation Section - Animated */}
        {secondBlog && (
          <div className="py-16 border-b dark:border-gray-800 border-slate-200/50">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="w-[90%] mx-auto flex flex-col lg:flex-row gap-12 items-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="lg:w-[40%] w-full order-2 lg:order-1 flex flex-col items-center lg:items-start"
              >
                <motion.div
                  animate={{ scale: [1, 1.02, 1], rotate: [0, 2, -2, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="mb-6"
                >
                  <MdChatBubbleOutline className="text-8xl dark:text-orange-400 text-orange-500" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-3xl lg:text-4xl font-bold dark:text-white text-gray-900 mb-4 text-center lg:text-left"
                >
                  {secondBlog.title}
                </motion.h3>
                <p className="text-lg dark:text-gray-400 text-gray-600 leading-relaxed text-center lg:text-left line-clamp-3">
                  {secondBlog.introduction?.replace(/<[^>]*>/g, "")}
                </p>
              </motion.div>

              <div className="lg:w-[60%] w-full order-1 lg:order-2">
                <img
                  src={secondBlog.image || "https://picsum.photos/1920/1080"}
                  className="w-full h-80 lg:h-96 object-cover rounded-3xl shadow-2xl hover:scale-105 transition-all duration-500"
                  alt={secondBlog.title}
                />
                <div className="mt-8 p-6 dark:bg-gray-900/50 bg-slate-100/50 backdrop-blur-xl rounded-3xl border dark:border-gray-800 border-slate-200/50">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-3">
                      <h4 className="text-xl font-semibold dark:text-white text-gray-900">
                        {secondBlog.category?.categoryName}
                      </h4>
                      <p className="text-base dark:text-gray-400 text-gray-600 line-clamp-3">
                        {secondBlog.introduction?.replace(/<[^>]*>/g, "")}
                      </p>
                    </div>
                    <div className="flex justify-center md:justify-end">
                      <Link to={`/blog/${secondBlog.slug}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-2 px-6 py-3 dark:bg-gray-900 bg-slate-100 backdrop-blur-xl dark:border-gray-700 border-slate-200 rounded-2xl font-semibold dark:text-gray-300 text-gray-700 hover:dark:bg-orange-500/20 hover:bg-blue-500/20 hover:dark:text-orange-400 hover:text-blue-500 transition-all"
                        >
                          Read Now
                          <BsArrowUpRight className="text-xl dark:text-orange-400 text-blue-500" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                  <div className="mt-6 grid md:grid-cols-3 gap-4 p-4 dark:bg-black/50 bg-slate-50/50 rounded-2xl border dark:border-gray-800 border-slate-200/50">
                    <div className="text-center p-4 dark:bg-gray-900/70 bg-slate-100/70 rounded-xl border dark:border-gray-700 border-slate-200">
                      <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Blog</p>
                      <p className="text-lg font-semibold dark:text-white text-gray-900">
                        {secondBlog.comments?.length || 0}
                      </p>
                    </div>
                    <div className="text-center p-4 dark:bg-gray-900/70 bg-slate-100/70 rounded-xl border dark:border-gray-700 border-slate-200">
                      <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Avg Reading Length</p>
                      <p className="text-lg font-semibold dark:text-white text-gray-900">
                        {secondBlog.readingTime || "N/A"}
                      </p>
                    </div>
                    <div className="text-center p-4 dark:bg-gray-900/70 bg-slate-100/70 rounded-xl border dark:border-gray-700 border-slate-200">
                      <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Release Frequency</p>
                      <p className="text-lg font-semibold dark:text-white text-gray-900">
                        Latest
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Resources Grid - Animated */}
        <div className="py-16 pb-32">
          <div className="w-[90%] mx-auto grid md:grid-cols-3 gap-8">
            {resourceBlogs.map((resource, index) => (
              <motion.div
                key={resource._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br dark:from-gray-900/50 from-slate-100/50 backdrop-blur-xl border dark:border-gray-800 border-slate-200/50 cursor-pointer"
              >
                <motion.img
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  src={resource.image || "https://picsum.photos/1920/1080"}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={resource.title}
                />
                <div className="p-8">
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-xl font-semibold dark:text-white text-gray-900 mb-4 group-hover:text-orange-500 transition-colors"
                  >
                    {resource.title}
                  </motion.h3>
                  <p className="text-base dark:text-gray-400 text-gray-600 line-clamp-3 mb-6 leading-relaxed">
                    {resource.introduction?.replace(/<[^>]*>/g, "")}
                  </p>
                  <div className="flex gap-4">
                    <Link to={`/blog/${resource.slug}`} className="flex-1">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="flex-1 py-3 px-6 w-full dark:border-gray-700 border-slate-200 rounded-xl dark:text-gray-300 text-gray-700 font-medium hover:dark:text-orange-400 hover:text-blue-500 hover:dark:bg-gray-800/50 hover:bg-slate-200/50 transition-all"
                      >
                        View Details
                      </motion.button>
                    </Link>
                    <Link to={`/blog/${resource.slug}`} className="flex-1">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="flex-1 py-3 px-6 w-full dark:border-gray-700 border-slate-200 rounded-xl dark:text-gray-300 text-gray-700 font-medium hover:dark:text-orange-400 hover:text-blue-500 hover:dark:bg-gray-800/50 hover:bg-slate-200/50 transition-all"
                      >
                        Read Now
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {!loading && blogs.length === 0 && (
            <div className="w-[90%] mx-auto text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                No blogs found for this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}