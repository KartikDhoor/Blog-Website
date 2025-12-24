import { motion } from "framer-motion"; // Add this import
import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import AxiosInstance from "../utils/AxiosInstance";
import { Link } from "react-router-dom";
import { LuArrowUpRight } from "react-icons/lu";
import { FiMessageCircle } from "react-icons/fi";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import { format } from 'date-fns';


export default function BlogSearch() {
  const [pagesData, setPagesData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryData, setCategoryData] = useState([]);
  const [searchBlog, setSearchBlog] = useState([]);
  const [searchQuery, setsearchQuery] = useState({
    title: '',
    category: '',
    sortBy: '',
    order: 'desc',
    limit: 3, // Increased for grid layout
    page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);


  // Fetch blog categories on mount
  useEffect(() => {
    fetchBlogCategory();
  }, []);


  const debouncedSearch = useCallback(
    debounce(async (query) => {
      setLoading(true);
      setIsTyping(false);
      await fetchQueryblog(query);
      setLoading(false);
    }, 300),
    []
  );


  // Trigger search when title or category changes (with debounce)
  useEffect(() => {
    setCurrentPage(1);
    const updatedQuery = { ...searchQuery, page: 1 };
    setsearchQuery(updatedQuery);
    setIsTyping(true);
    debouncedSearch(updatedQuery);
    return () => debouncedSearch.cancel();
  }, [searchQuery.title, searchQuery.category]);


  const fetchBlogCategory = async () => {
    try {
      const response = await AxiosInstance.post("/customer/category");
      if (response.data.data) {
        setCategoryData(response.data.data);
      }
    } catch (err) {
      console.error('Categories Error:', err.message);
    }
  };


  const fetchQueryblog = async (query) => {
    try {
      setLoading(true);
      const response = await AxiosInstance.post("/customer/blog/find", query);
      if (response.data.data) {
        setSearchBlog(response.data.data);
        setPagesData(response.data.pagination || {});
        // Update current page state after successful fetch
        setCurrentPage(query.page || 1);
      }
    } catch (err) {
      console.error('Search Error:', err.message);
      setSearchBlog([]);
    } finally {
      setLoading(false);
    }
  };


  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setsearchQuery(prev => ({
      ...prev,
      [name]: value,
      page: 1, // Reset to page 1 on input change
    }));
  }, []);


  // Handle pagination - direct API call without debounce
  const handlePageChange = (newPage) => {
    const updatedQuery = {
      ...searchQuery,
      page: newPage,
    };
    setsearchQuery(updatedQuery);
    // Direct fetch for pagination (no debounce needed)
    fetchQueryblog(updatedQuery);
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <section className="min-h-screen bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 from-orange-50 via-white to-yellow-50 overflow-hidden relative">
      {/* Animated Background Particles - ORANGE THEME */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-20 w-72 h-72 dark:bg-gradient-to-r dark:from-orange-500/10 dark:to-yellow-400/10 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-24 w-96 h-96 dark:bg-gradient-to-r dark:from-orange-600/10 dark:to-yellow-500/10 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 dark:bg-gradient-to-r dark:from-orange-400/15 bg-gradient-to-r from-orange-400/25 rounded-full blur-2xl animate-bounce [animation-delay:2s]"></div>
      </div>


      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32 relative z-10">
        {/* Search Form - Glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl mx-auto mb-16"
        >
          <div className="bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-white/40 dark:border-white/20 rounded-3xl shadow-2xl p-8 lg:p-12">
            <form className="flex flex-col lg:flex-row gap-4 items-stretch">
              <input 
                name="title" 
                value={searchQuery.title} 
                onChange={handleInputChange}
                placeholder="🔍 Search blogs by title, keywords, or topics..."
                className="flex-1 min-h-[60px] px-6 text-xl bg-white/80 dark:bg-white/30 backdrop-blur-sm border border-white/50 dark:border-white/30 rounded-2xl outline-none focus:ring-4 focus:ring-orange-400/40 dark:focus:ring-orange-500/30 transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 font-medium shadow-lg"
              />
              <select
                name="category"
                value={searchQuery.category}
                onChange={handleInputChange}
                className="w-full lg:w-72 min-h-[60px] px-6 bg-white/80 dark:bg-white/30 backdrop-blur-sm border border-white/50 dark:border-white/30 rounded-2xl outline-none focus:ring-4 focus:ring-orange-400/40 dark:focus:ring-orange-500/30 transition-all duration-300 text-lg font-medium shadow-lg"
              >
                <option value="">📂 All Categories</option>
                {categoryData.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
              <button 
                type="submit" 
                disabled={loading}
                className="min-h-[60px] px-8 font-black text-xl bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-2xl shadow-2xl hover:shadow-orange-500/30 focus:ring-4 focus:ring-orange-400/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <span>Search</span>
                    <LuArrowUpRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>


            {isTyping && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 flex items-center justify-center gap-3 text-orange-500 dark:text-orange-400 font-semibold text-lg"
              >
                <div className="w-5 h-5 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full animate-pulse"></div>
                Live searching as you type...
              </motion.div>
            )}
          </div>
        </motion.div>


        {/* Loading State */}
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-24 h-24 border-4 border-orange-200/50 dark:border-orange-500/30 border-t-orange-500 rounded-full animate-spin mb-8"></div>
            <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-orange-600 via-orange-400 to-yellow-500 bg-clip-text text-transparent mb-4">
              Finding Perfect Matches
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg">
              Scanning through thousands of blogs for your perfect read...
            </p>
          </motion.div>
        )}


        {/* No Results */}
        {searchBlog?.length === 0 && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-[60vh] flex flex-col items-center justify-center text-center py-24 px-6"
          >
            <div className="w-36 h-36 lg:w-44 lg:h-44 bg-gradient-to-br from-orange-400/20 to-yellow-400/20 rounded-3xl backdrop-blur-xl border-4 border-dashed border-orange-200/50 dark:border-orange-400/30 flex items-center justify-center mb-12 shadow-2xl">
              <FiMessageCircle className="w-20 h-20 lg:w-24 lg:h-24 text-orange-400" />
            </div>
            <h2 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-gray-800 dark:from-orange-100 dark:via-orange-200 dark:to-yellow-200 bg-clip-text text-transparent mb-6 leading-tight">
              No Blogs Found
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mb-12 leading-relaxed">
              Try different keywords, select a category, or explore our latest posts
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/"
                className="px-10 py-5 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-black text-lg rounded-2xl shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                ← Explore Home
                <PiPaperPlaneTiltBold className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button 
                type="button"
                onClick={() => setsearchQuery({ title: '', category: '', sortBy: '', order: 'desc', limit: 9, page: 1 })}
                className="px-10 py-5 bg-white/80 dark:bg-white/20 backdrop-blur-xl border-2 border-orange-400/50 dark:border-orange-400/30 font-black text-lg rounded-2xl shadow-xl hover:bg-white dark:hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-3 text-gray-800 dark:text-orange-300"
              >
                Clear Search
              </button>
            </div>
          </motion.div>
        )}


        {/* Results Grid - Cards with Images */}
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
          {searchBlog.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
              whileHover={{ y: -8 }}
            >
              <Link to={`/blog/${blog.slug}`} className="block h-full">
                <div className="h-[420px] w-full bg-gradient-to-br from-white/80 dark:from-gray-900/80 to-white/50 dark:to-gray-800/50 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-white/20 shadow-2xl hover:shadow-orange-500/25 hover:border-orange-400/50 transition-all duration-500 overflow-hidden relative">
                  
                  {/* Blog Image */}
                  <div className="h-56 w-full relative overflow-hidden bg-gradient-to-br from-gray-100 dark:from-gray-800/50 to-gray-200 rounded-t-3xl group-hover:scale-105 transition-transform duration-700">
                    <img 
                      src={blog.image || "/api/placeholder/600/400"} 
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/600/400";
                      }}
                    />
                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-orange-500/90 to-yellow-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-lg">
                        {blog.categoryName || "Featured"}
                      </span>
                    </div>
                  </div>


                  {/* Card Content */}
                  <div className="p-8">
                    <h3 className="text-xl lg:text-2xl font-black mb-4 leading-tight line-clamp-2 bg-gradient-to-r from-gray-800 dark:from-orange-100 dark:via-orange-200 dark:to-yellow-200 bg-clip-text text-transparent group-hover:from-orange-600 group-hover:to-yellow-500 transition-all duration-300">
                      {blog.title}
                    </h3>
                    
                    <div className="flex items-center gap-6 mb-6 text-sm opacity-80">
                      <div className="flex items-center gap-2 bg-white/60 dark:bg-white/20 backdrop-blur-sm px-3 py-1 rounded-xl">
                        <FaHeart className="w-4 h-4 fill-red-400" />
                        <span>{blog.likes?.length || 0}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/60 dark:bg-white/20 backdrop-blur-sm px-3 py-1 rounded-xl">
                        <FiMessageCircle className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                        <span>{blog.comments?.length || 0}</span>
                      </div>
                    </div>


                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {format(new Date(blog.createdAt), 'MMM dd, yyyy')} • {blog.readingTime || '5'} min read
                      </span>
                      <LuArrowUpRight className="w-6 h-6 text-orange-500 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>


                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-yellow-500/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>


        {/* Enhanced Pagination - Orange Yellow Glass Theme */}
        {pagesData?.totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-24 flex justify-center"
          >
            <div className="bg-gradient-to-br from-white/80 dark:from-white/10 to-white/50 dark:to-orange-500/10 backdrop-blur-2xl border border-orange-400/40 dark:border-orange-400/30 rounded-3xl shadow-2xl hover:shadow-orange-500/20 dark:hover:shadow-orange-500/30 p-6 lg:p-8 transition-all duration-300">
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                {/* Page Info */}
                <div className="text-center sm:text-left">
                  <div className="text-gray-700 dark:text-orange-100 font-black text-lg">
                    <span className="bg-gradient-to-r from-orange-600 to-yellow-500 dark:from-orange-300 dark:to-yellow-300 bg-clip-text text-transparent">
                      Page {currentPage} of {pagesData.totalPages}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-semibold">
                    {pagesData.totalBlogs} total blogs
                  </p>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-3 bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-orange-300/40 dark:border-orange-400/30 rounded-2xl p-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 ${
                      currentPage === 1
                        ? 'bg-gray-200/50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-yellow-500 text-white shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1'
                    }`}
                  >
                    ← Prev
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(5, pagesData.totalPages) }, (_, i) => {
                      const pageNum = currentPage > 2 
                        ? currentPage + i - 2 
                        : i + 1;
                      if (pageNum <= pagesData.totalPages) {
                        return (
                          <motion.button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className={`w-10 h-10 rounded-xl font-bold transition-all duration-300 ${
                              currentPage === pageNum
                                ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg shadow-orange-500/40'
                                : 'bg-white/80 dark:bg-white/20 text-gray-800 dark:text-orange-100 border border-orange-300/40 dark:border-orange-400/30 hover:bg-orange-500/20 hover:text-orange-600 dark:hover:text-orange-300 hover:border-orange-400/60'
                            }`}
                          >
                            {pageNum}
                          </motion.button>
                        );
                      }
                      return null;
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagesData.totalPages}
                    className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 ${
                      currentPage === pagesData.totalPages
                        ? 'bg-gray-200/50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-yellow-500 text-white shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1'
                    }`}
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}