import NewsPanel from "./NewsPanel";
import { Link } from "react-router-dom";
import { FiMessageCircle } from "react-icons/fi";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { BsArrowUpRight } from "react-icons/bs";
import AxiosInstance from "../utils/AxiosInstance";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function News() {
  const [popularBlog, setPopularBlog] = useState(null);
  const [mordenBLog, setMordenBLog] = useState(null);
  const [blogsData, setBlogsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [queryParams, setQueryParams] = useState({
    sortBy: "createdAt",
    order: "desc",
    limit: 4,
    page: 1,
  });

  const [popularQueryParams, setPopularQueryParams] = useState({
    sortBy: "views",
    order: "desc",
    limit: 4,
    page: 1,
  });

  useEffect(() => {
    const loadBlogs = async () => {
      const blogs = await fetchBlogs(queryParams);
      setBlogsData(blogs);
      const blog = await fetchPopularBlogs(popularQueryParams);
      setPopularBlog(blog);
      setLoading(false);
    };
    loadBlogs();
  }, []);

  const fetchBlogs = async (queryParams) => {
    try {
      const response = await AxiosInstance.post("/customer/blogs", {
        params: queryParams,
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        console.error("API Error:", response.data.message);
        return [];
      }
    } catch (err) {
      console.error("Request Error:", err.message);
      return [];
    }
  };

  const fetchPopularBlogs = async (popularQueryParams) => {
    try {
      const response = await AxiosInstance.post("/customer/blogs", {
        params: popularQueryParams,
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        console.error("API Error:", response.data.message);
        return [];
      }
    } catch (err) {
      console.error("Request Error:", err.message);
      return [];
    }
  };

  if (loading)
    return (
      <p className="dark:text-white text-gray-900 text-xl text-center py-20 pt-32">
        Loading blogs...
      </p>
    );

  if (!blogsData || blogsData.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200">
          No blogs found.
        </p>
      </div>
    );
  }

  const featured = blogsData[0];
  const secondary = blogsData.slice(1, 4);

  return (
    <>
      <div className="min-h-screen pt-28 sm:pt-32 dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 bg-gradient-to-br from-orange-50 via-white to-yellow-50 dark:text-white text-gray-900">
        {/* Hero Banner */}
        <motion.div
          className="bg-white/80 dark:bg-white/10 backdrop-blur-2xl flex items-center border-b border-white/50 dark:border-white/20 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 lg:py-16">
            <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-8 leading-tight dark:bg-gradient-to-r from-orange-100 via-orange-200 to-yellow-200 bg-gradient-to-r from-orange-600 via-orange-400 to-yellow-400 bg-clip-text dark:text-transparent text-transparent">
              <p>Today's Headlines: Stay</p>
              <p className="mt-2 block md:hidden lg:hidden">Informed</p>
            </div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8">
              <div className="hidden lg:block lg:w-[20%] text-4xl lg:text-5xl font-black text-center dark:text-orange-300 text-orange-600">
                Informed
              </div>
              <div className="lg:w-[80%] text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                <p>
                  Explore the latest news from around the world. We bring you
                  up-to-the-minute updates on the most significant events,
                  trends, and stories. Discover the world through our news
                  coverage.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Blog */}
        <div className="border-b border-white/30 dark:border-white/20 py-14 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              className="bg-white/80 dark:bg-white/15 backdrop-blur-2xl border-white/50 dark:border-white/30 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl hover:shadow-3xl hover:border-orange-400/60 transition-all duration-700 overflow-hidden relative group/feature"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.01 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-yellow-400/0 opacity-0 group-hover/feature:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />

              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center h-full relative z-10">
                {/* Image */}
                <Link
                  to={`/blog/${featured.slug}`}
                  className="w-full lg:w-[45%] group/image"
                >
                  <motion.div
                    className="relative w-full h-64 sm:h-80 lg:h-[420px] rounded-3xl overflow-hidden shadow-2xl group-hover/image:scale-105 transition-all duration-700"
                    whileHover={{ scale: 1.03 }}
                  >
                    <img
                      src={featured.image}
                      className="w-full h-full object-cover"
                      alt={featured.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent rounded-3xl opacity-40 group-hover/image:opacity-80 transition-all duration-500" />
                    <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-black/70 text-xs sm:text-sm text-white font-medium">
                      {format(new Date(featured.createdAt), "MMMM dd, yyyy")}
                    </div>
                  </motion.div>
                </Link>

                {/* Content */}
                <div className="w-full lg:w-[55%] space-y-5 sm:space-y-6 lg:space-y-8">
                  <Link to={`/blog/${featured.slug}`}>
                    <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover/feature:text-orange-500 transition-all duration-500 drop-shadow-lg">
                      {featured.title}
                    </h2>
                  </Link>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-4 font-light">
                    {featured.introduction}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-3 sm:gap-4 items-center text-xs sm:text-sm">
                    <div className="px-4 py-2 bg-white/70 dark:bg-white/20 backdrop-blur-xl border-white/40 dark:border-white/20 rounded-2xl text-orange-600 font-semibold shadow-md">
                      {featured.category?.categoryName}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <span className="uppercase tracking-wider">Author</span>
                      <span className="font-medium">{featured.author}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
                    <motion.button
                      className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/70 dark:bg-white/20 backdrop-blur-xl border-white/40 dark:border-white/20 rounded-2xl text-sm sm:text-lg font-semibold text-gray-800 dark:text-gray-300 shadow-lg hover:bg-white/90 dark:hover:bg-white/30 hover:shadow-xl hover:border-orange-400/50 hover:text-orange-500 transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <FiMessageCircle className="text-base sm:text-xl" />
                      <span>{featured.comments?.length || 0}</span>
                    </motion.button>
                    <motion.button
                      className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/70 dark:bg-white/20 backdrop-blur-xl border-white/40 dark:border-white/20 rounded-2xl text-sm sm:text-lg font-semibold text-gray-800 dark:text-gray-300 shadow-lg hover:bg-white/90 dark:hover:bg-white/30 hover:shadow-xl hover:border-orange-400/50 hover:text-orange-500 transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <PiPaperPlaneTiltBold className="text-base sm:text-xl" />
                      <span>20</span>
                    </motion.button>

                    <Link
                      to={`/blog/${featured.slug}`}
                      className="ml-auto mt-3 sm:mt-0"
                    >
                      <motion.button
                        className="px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm sm:text-lg rounded-2xl shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-1 sm:hover:-translate-y-2 hover:from-orange-600 hover:to-yellow-500 transition-all duration-500 backdrop-blur-xl border border-orange-400/30"
                        whileHover={{ scale: 1.05 }}
                      >
                        Read More
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Secondary Blogs Grid */}
        <div className="py-14 sm:py-20 border-b border-white/30 dark:border-white/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-3">
              {secondary.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  className="group bg-white/80 dark:bg-white/15 backdrop-blur-2xl border-white/50 dark:border-white/30 rounded-3xl p-5 sm:p-7 shadow-2xl hover:shadow-3xl hover:border-orange-400/60 hover:bg-white/95 dark:hover:bg-white/25 transition-all duration-700 overflow-hidden relative"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
                  <Link to={`/blog/${blog.slug}`}>
                    <motion.div
                      className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden shadow-2xl group-hover:scale-[1.02] transition-all duration-700 mb-5 sm:mb-6"
                      whileHover={{ scale: 1.02 }}
                    >
                      <img
                        src={blog.image}
                        className="w-full h-full object-cover"
                        alt={blog.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent rounded-2xl opacity-40 group-hover:opacity-90 transition-all duration-500" />
                      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-black/70 text-[11px] sm:text-xs text-white font-medium">
                        {format(new Date(blog.createdAt), "MMM dd, yyyy")}
                      </div>
                    </motion.div>
                  </Link>

                  <div className="relative z-10 space-y-3 sm:space-y-4">
                    <Link to={`/blog/${blog.slug}`}>
                      <h3 className="text-lg sm:text-2xl font-black text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-orange-500 transition-all duration-500 drop-shadow-sm">
                        {blog.title}
                      </h3>
                    </Link>
                    <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/70 dark:bg-white/20 backdrop-blur-xl border-white/40 dark:border-white/20 rounded-xl text-orange-600 font-semibold text-xs sm:text-sm shadow-md inline-block">
                      {blog.category?.categoryName}
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 pt-4 border-t border-white/40 dark:border-white/20">
                      <motion.button
                        className="flex items-center gap-2 px-4 sm:px-5 py-2 bg-white/60 dark:bg-white/20 backdrop-blur-xl border-white/40 dark:border-white/20 rounded-2xl text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-300 shadow-md hover:bg-white/80 dark:hover:bg-white/30 hover:shadow-lg hover:border-orange-400/50 hover:text-orange-500 transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -1 }}
                      >
                        <FiMessageCircle className="text-sm sm:text-lg" />
                        <span>{blog.comments?.length || 0}</span>
                      </motion.button>
                      <motion.button
                        className="flex items-center gap-2 px-4 sm:px-5 py-2 bg-white/60 dark:bg-white/20 backdrop-blur-xl border-white/40 dark:border-white/20 rounded-2xl text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-300 shadow-md hover:bg-white/80 dark:hover:bg-white/30 hover:shadow-lg hover:border-orange-400/50 hover:text-orange-500 transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -1 }}
                      >
                        <PiPaperPlaneTiltBold className="text-sm sm:text-lg" />
                        <span>20</span>
                      </motion.button>
                      <Link
                        to={`/blog/${blog.slug}`}
                        className="ml-auto hidden sm:block"
                      >
                        <motion.button
                          className="px-5 py-2 text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-300 hover:text-orange-500 transition-colors border border-gray-200 dark:border-gray-700 rounded-xl hover:border-orange-400/50"
                          whileHover={{ scale: 1.05 }}
                        >
                          Read More
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* NewsPanel section */}
        <NewsPanel headline="Discover the world of Headline" />

        {/* Featured Videos Header */}
        <motion.div
          className="py-12 sm:py-16 border-b border-white/30 dark:border-white/20 bg-white/60 dark:bg-white/10 backdrop-blur-xl shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
            <div className="w-full lg:w-[80%]">
              <motion.button
                className="mb-4 sm:mb-6 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500/20 to-yellow-400/20 backdrop-blur-xl border-orange-400/40 rounded-2xl text-xs sm:text-sm font-semibold text-orange-600 shadow-md hover:shadow-lg hover:from-orange-500/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Featured Videos
              </motion.button>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black dark:text-white text-gray-900 leading-tight drop-shadow-lg">
                Visual Insight for the Modern Viewer
              </h2>
            </div>
            <Link
              to="/videos"
              className="w-full lg:w-[15%] flex justify-center lg:justify-end"
            >
               {/* View All Button in Header - Always Visible */}
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="flex-shrink-0"
          >
            <Link
              to="/blog/search"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-yellow-500 text-white font-bold text-sm rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 whitespace-nowrap border border-orange-400/30 backdrop-blur-xl"
            >
              View All
              <BsArrowUpRight className="text-base" />
            </Link>
          </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Popular Videos Grid */}
        <div className="py-16 sm:py-20 pb-24 sm:pb-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid gap-10 md:grid-cols-2">
              {popularBlog?.slice(0, 4)?.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  className="group bg-white/80 dark:bg-white/15 backdrop-blur-2xl border-white/50 dark:border-white/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl hover:shadow-3xl hover:border-orange-400/60 hover:bg-white/95 dark:hover:bg-white/25 transition-all duration-700 overflow-hidden relative"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
                  <Link to={`/blog/${blog.slug}`}>
                    <motion.div
                      className="relative w-full h-56 sm:h-72 md:h-80 rounded-3xl overflow-hidden shadow-2xl group-hover:scale-[1.02] transition-all duration-700 mb-6 sm:mb-8"
                      whileHover={{ scale: 1.02 }}
                    >
                      <img
                        src={blog.image}
                        className="w-full h-full object-cover"
                        alt={blog.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent rounded-3xl opacity-40 group-hover:opacity-90 transition-all duration-500" />
                    </motion.div>
                  </Link>
                  <div className="relative z-10 space-y-3 sm:space-y-4">
                    <Link to={`/blog/${blog.slug}`}>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-orange-500 transition-all duration-500 drop-shadow-sm">
                        {blog.title}
                      </h3>
                    </Link>
                    <p className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-2 font-light">
                      {blog.introduction}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
