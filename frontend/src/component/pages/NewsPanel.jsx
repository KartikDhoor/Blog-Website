import { motion } from "framer-motion";
import { BsArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import AxiosInstance from "../utils/AxiosInstance";
import { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function NewsPanel({ headline = "Latest News" }) {
  const [pagesData, setPagesData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryData, setCategoryData] = useState([]);
  const [popularBlog, setPopularBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [filterQuery, setFilterQueryParams] = useState({
    category: "",
    sortBy: "",
    order: "desc",
    limit: 6,
    page: 1,
  });

  const fetchDatablog = useCallback(async (filters) => {
    try {
      setLoading(true);
      const [category, response] = await Promise.all([
        AxiosInstance.post("/customer/category"),
        AxiosInstance.post("/customer/blogs", filters),
      ]);

      if (category.data.data) {
        setCategoryData(category.data.data);
      }

      if (response.data.success) {
        setPopularBlog(response.data.data);
        setPagesData(response.data.pagination);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDatablog(filterQuery);
  }, [filterQuery.category, filterQuery.page, fetchDatablog]);

  const handleCategorySearch = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    setFilterQueryParams((prev) => ({
      ...prev,
      category: categoryId,
      page: 1,
    }));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setFilterQueryParams((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b dark:from-gray-900 dark:to-black from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            <div className="text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500/20 to-yellow-400/20 backdrop-blur-xl border-orange-400/40 rounded-2xl mb-8 mx-auto">
                <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="text-orange-400 font-semibold uppercase tracking-wider">
                  Loading
                </span>
              </div>
              <div className="h-12 sm:h-16 bg-gradient-to-r from-orange-400/20 rounded-3xl animate-pulse mx-auto w-48 sm:w-64"></div>
            </div>

            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 p-6 sm:p-8 bg-white/70 dark:bg-white/10 backdrop-blur-2xl border-white/40 dark:border-white/20 rounded-3xl animate-pulse shadow-xl"
              >
                <div className="w-full sm:w-48 h-40 sm:h-32 bg-gradient-to-r from-orange-400/20 rounded-2xl"></div>
                <div className="flex-1 space-y-4 w-full">
                  <div className="h-5 sm:h-6 bg-gradient-to-r from-orange-400/20 rounded-xl w-3/4"></div>
                  <div className="h-10 sm:h-12 bg-gradient-to-r from-orange-400/20 rounded-2xl w-full"></div>
                  <div className="h-4 bg-gradient-to-r from-orange-400/20 rounded-xl w-1/2"></div>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {[...Array(3)].map((_, j) => (
                      <div
                        key={j}
                        className="h-8 sm:h-10 w-20 sm:w-24 bg-gradient-to-r from-orange-400/20 rounded-xl"
                      ></div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b dark:from-gray-900 dark:via-black dark:to-gray-900 from-orange-50 via-white to-yellow-50 relative overflow-hidden transition-colors duration-500">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-0 sm:left-20 w-40 sm:w-64 h-40 sm:h-64 bg-gradient-to-r from-orange-500/10 to-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 sm:bottom-40 right-4 sm:right-24 w-52 sm:w-80 h-52 sm:h-80 bg-gradient-to-r from-orange-600/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20"
        >
          <div className="inline-flex items-center gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-500/20 to-yellow-400/20 backdrop-blur-xl border-orange-400/40 rounded-2xl mb-4 sm:mb-8 mx-auto max-w-max">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-orange-400 rounded-full animate-ping"></div>
            <span className="text-sm sm:text-lg text-orange-400 dark:text-orange-300 font-semibold uppercase tracking-wider">
              Unlock the Power of
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black dark:bg-gradient-to-r from-orange-100 via-orange-200 to-yellow-200 bg-gradient-to-r from-orange-600 via-orange-400 to-yellow-400 bg-clip-text dark:text-transparent text-transparent leading-tight drop-shadow-lg">
            {headline}
          </h2>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16"
        >
          <div className="bg-white/70 dark:bg-white/10 backdrop-blur-2xl border-white/40 dark:border-white/20 rounded-3xl p-2 sm:p-3 shadow-xl">
            <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
              <button className="custom-prev hidden sm:flex flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white/50 dark:bg-white/20 hover:bg-white/70 dark:hover:bg-white/30 border-white/30 dark:border-white/20 rounded-2xl transition-all duration-300 items-center justify-center text-lg sm:text-2xl text-gray-700 dark:text-gray-300 hover:text-orange-500">
                <IoIosArrowBack />
              </button>

              <Swiper
                modules={[Navigation]}
                navigation={{
                  nextEl: ".custom-next",
                  prevEl: ".custom-prev",
                }}
                spaceBetween={12}
                slidesPerView={2}
                breakpoints={{
                  480: { slidesPerView: 3 },
                  640: { slidesPerView: 4 },
                  768: { slidesPerView: 5 },
                  1024: { slidesPerView: 6 },
                  1280: { slidesPerView: 7 },
                }}
                className="flex-1"
              >
                <SwiperSlide>
                  <motion.div
                    onClick={() => handleCategorySearch("")}
                    className={`px-4 py-3 sm:px-6 sm:py-4 rounded-2xl cursor-pointer transition-all duration-300 h-full flex items-center justify-center shadow-lg ${
                      selectedCategory === ""
                        ? "bg-gradient-to-br from-orange-500 to-orange-600 border-orange-400/50 shadow-orange-500/25 bg-blend-overlay"
                        : "bg-white/80 dark:bg-white/20 border-white/40 dark:border-white/20 hover:bg-white/90 dark:hover:bg-white/30 hover:shadow-xl hover:border-orange-400/50"
                    }`}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <span className="font-semibold text-gray-800 dark:text-gray-200 text-xs sm:text-sm text-center line-clamp-2">
                      All Categories
                    </span>
                  </motion.div>
                </SwiperSlide>
                {categoryData.map((category) => (
                  <SwiperSlide key={category._id}>
                    <motion.div
                      onClick={() => handleCategorySearch(category._id)}
                      className={`px-4 py-3 sm:px-6 sm:py-4 rounded-2xl cursor-pointer transition-all duration-300 h-full flex items-center justify-center shadow-lg ${
                        selectedCategory === category._id
                          ? "bg-gradient-to-br from-orange-500 to-orange-600 border-orange-400/50 shadow-orange-500/25 bg-blend-overlay"
                          : "bg-white/80 dark:bg-white/20 border-white/40 dark:border-white/20 hover:bg-white/90 dark:hover:bg-white/30 hover:shadow-xl hover:border-orange-400/50"
                      }`}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <span className="font-semibold text-gray-800 dark:text-gray-200 text-xs sm:text-sm text-center line-clamp-2">
                        {category.categoryName}
                      </span>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button className="custom-next hidden sm:flex flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white/50 dark:bg-white/20 hover:bg-white/70 dark:hover:bg-white/30 border-white/30 dark:border-white/20 rounded-2xl transition-all duration-300 items-center justify-center text-lg sm:text-2xl text-gray-700 dark:text-gray-300 hover:text-orange-500">
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Premium Glass Cards */}
        <div className="space-y-8 mb-12 sm:mb-16">
          {!popularBlog || popularBlog.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24 sm:py-32"
            >
              <div className="inline-flex items-center gap-4 px-6 sm:px-8 py-3 sm:py-4 bg-white/70 dark:bg-white/10 backdrop-blur-2xl border-white/40 dark:border-white/20 rounded-3xl mb-6 sm:mb-8 shadow-xl">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-xl animate-pulse"></div>
                <span className="text-gray-800 dark:text-gray-300 font-medium text-base sm:text-xl">
                  No blogs available yet
                </span>
              </div>
              <Link
                to="/blog/search"
                className="inline-flex items-center gap-3 px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-base sm:text-lg rounded-3xl shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-1 transition-all duration-300 backdrop-blur-xl"
              >
                Explore All Blogs
                <BsArrowUpRight />
              </Link>
            </motion.div>
          ) : (
            popularBlog.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group bg-white/90 dark:bg-white/15 backdrop-blur-2xl border border-white/60 dark:border-white/30 rounded-3xl p-5 sm:p-8 shadow-2xl hover:shadow-3xl hover:border-orange-400/60 hover:bg-white dark:hover:bg-white/20 transition-all duration-700 overflow-hidden relative"
                whileHover={{ y: -10, scale: 1.01 }}
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/0 via-orange-500/15 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 items-start h-full relative z-10">
                  {/* Image */}
                  <motion.div
                    className="relative w-full lg:w-64 h-52 sm:h-60 lg:h-48 rounded-2xl overflow-hidden shadow-2xl group-hover:scale-[1.01] transition-all duration-700"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-2xl opacity-60 group-hover:opacity-80 transition-all duration-500"></div>
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-black/60 text-[11px] sm:text-xs text-white font-medium">
                      {format(new Date(blog.createdAt), "MMMM dd, yyyy")}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-3 sm:mb-4 leading-tight line-clamp-2 group-hover:text-orange-500 transition-all duration-500 drop-shadow-sm">
                      {blog.title}
                    </h3>

                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-5 sm:mb-6 line-clamp-3 font-light">
                      {blog.introduction}
                    </p>

                    {/* Stats - Glass Pills */}
                    <div className="flex flex-wrap gap-3 mb-5 sm:mb-6">
                      <motion.button
                        className="group/stats flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-white/20 backdrop-blur-xl border border-white/40 dark:border-white/20 rounded-2xl text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-300 shadow-md hover:bg-white/90 dark:hover:bg-white/30 hover:shadow-lg hover:border-orange-400/50 hover:text-orange-500 transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -1 }}
                      >
                        <FaHeart className="text-sm sm:text-base group-hover/stats:scale-110 transition-transform text-red-500" />
                        <span>{blog.likes.length}</span>
                      </motion.button>
                      <motion.button
                        className="group/stats flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-white/20 backdrop-blur-xl border border-white/40 dark:border-white/20 rounded-2xl text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-300 shadow-md hover:bg-white/90 dark:hover:bg-white/30 hover:shadow-lg hover:border-orange-400/50 hover:text-orange-500 transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -1 }}
                      >
                        <FiMessageCircle className="text-sm sm:text-base group-hover/stats:scale-110 transition-transform" />
                        <span>{blog.comments.length}</span>
                      </motion.button>
                      <motion.button
                        className="group/stats flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-white/20 backdrop-blur-xl border border-white/40 dark:border-white/20 rounded-2xl text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-300 shadow-md hover:bg-white/90 dark:hover:bg-white/30 hover:shadow-lg hover:border-orange-400/50 hover:text-orange-500 transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -1 }}
                      >
                        <PiPaperPlaneTiltBold className="text-sm sm:text-base group-hover/stats:scale-110 transition-transform" />
                        <span>20</span>
                      </motion.button>
                    </div>

                    {/* CTA Button */}
                    <div className="flex justify-start">
                      <motion.div whileHover={{ scale: 1.03 }}>
                        <Link
                          to={`/blog/${blog.slug}`}
                          className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm sm:text-lg rounded-2xl shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-1 sm:hover:-translate-y-2 hover:from-orange-600 hover:to-yellow-500 transition-all duration-500 backdrop-blur-xl border border-orange-400/30"
                        >
                          Read Article
                          <BsArrowUpRight className="text-base sm:text-lg" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Show More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/blog/search"
              className="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-12 py-3 sm:py-6 bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 text-white font-bold text-base sm:text-xl rounded-3xl shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-500 ring-1 sm:ring-2 ring-orange-400/30 backdrop-blur-xl border border-orange-400/30"
            >
              Show More Blogs
              <BsArrowUpRight className="text-lg sm:text-2xl" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
