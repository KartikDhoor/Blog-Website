import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash"; // npm i lodash
import AxiosInstance from "../utils/AxiosInstance";
import { Link } from "react-router-dom";
import { LuArrowUpRight } from "react-icons/lu";
import { FiMessageCircle } from "react-icons/fi";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import { format } from 'date-fns';
import BlogPagination from "./BlogPagination";

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
    limit: 5,
    page: 1,
  });
  const [loading, setLoading] = useState(false);  // ✅ Loading state
  const [isTyping, setIsTyping] = useState(false); // ✅ Typing state

  // ✅ Fetch categories ONCE
  useEffect(() => {
    fetchBlogCategory();
  }, []);

  // ✅ Debounced search (300ms delay)
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      setLoading(true);
      setIsTyping(false);
      await fetchQueryblog(query);
      setLoading(false);
    }, 300), // ✅ 300ms delay after typing stops
    []
  );

  // ✅ Live search on query change
  useEffect(() => {
    setCurrentPage(1); // Reset to page 1
    setsearchQuery(prev => ({ ...prev, page: 1 }));
    setIsTyping(true);
    debouncedSearch(searchQuery);
    return () => debouncedSearch.cancel();
  }, [searchQuery.title, searchQuery.category]); // ✅ Only title/category trigger search

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
      const response = await AxiosInstance.post("/customer/blog/find", query);
      if (response.data.data) {
        setSearchBlog(response.data.data);
        setPagesData(response.data.pagination || {});
      }
    } catch (err) {
      console.error('Search Error:', err.message);
      setSearchBlog([]);
    }
  };

  // ✅ Throttled input change (prevents spam)
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setsearchQuery(prev => ({
      ...prev,
      [name]: value,
      page: 1, // Reset page on new search
    }));
  }, []);

  // ✅ Pagination (no debounce needed)
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setsearchQuery(prev => ({
      ...prev,
      page: newPage,
    }));
    debouncedSearch({ ...searchQuery, page: newPage });
  };

  return (
    <>
      <div className="h-auto w-full bg-pureblack">
        {/* ✅ Search Form */}
        <div className="h-auto w-[80%] mx-auto rounded-lg my-2">
          <form className="h-auto w-full flex items-center justify-center rounded-lg">
            <input 
              name="title" 
              value={searchQuery.title} 
              onChange={handleInputChange}
              placeholder="Search blogs..."
              className="h-auto min-h-[10vh] belowSm:min-h-[8vh] w-[60%] border border-gray-400 rounded-l-lg outline-none p-2 text-xl belowSm:text-base bg-gray-900 text-white placeholder-gray-400"
            />
            <select
              name="category"
              value={searchQuery.category}
              onChange={handleInputChange}
              className="h-auto w-[20%] min-h-[10vh] belowSm:min-h-[8vh] border border-gray-400 outline-none p-2 bg-gray-900 text-white"
            >
              <option value="">All Categories</option>
              {categoryData.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            <button 
              type="submit" 
              disabled={loading}
              className="h-full min-h-[10vh] w-[20%] border border-gray-400 font-medium text-2xl belowSm:min-h-[8vh] text-pureblack bg-amber-400 rounded-r-lg belowSm:text-sm hover:bg-amber-500 disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
          
          {/* ✅ Typing indicator */}
          {isTyping && (
            <div className="w-[80%] mx-auto text-center text-sm text-gray-400 mt-2">
              🔍 Searching...
            </div>
          )}
        </div>

        {/* ✅ Loading spinner */}
        {loading && (
          <div className="w-full flex justify-center py-8">
            <div className="text-white text-xl animate-pulse">Loading results...</div>
          </div>
        )}

        {/* ✅ Results */}
        {searchBlog?.length === 0 && !loading ? (
          <div className="h-auto min-h-[90vh] w-full flex flex-col justify-center items-center text-gray-400">
            <p className="text-2xl mb-4">No blogs found</p>
            <p>Try different keywords or categories</p>
          </div>
        ) : (
          searchBlog.map((blog) => (
            <div key={blog._id} className="lg:h-[30vh] lg:w-full md:h-[30vh] md:w-full sm:h-auto sm:w-full belowSm:h-auto belowSm:w-full border-y border-gray-800">
              {/* Your existing blog card JSX - unchanged */}
              <div className="lg:h-full lg:w-[90%] lg:mx-auto lg:flex lg:justify-center md:h-full md:w-[90%] md:mx-auto md:flex md:justify-center sm:h-full sm:w-[90%] sm:mx-auto sm:py-6 belowSm:h-full belowSm:w-[90%] belowSm:mx-auto belowSm:py-6">
                {/* Image + content - same as your original */}
                {/* ... keep your exact JSX ... */}
              </div>
            </div>
          ))
        )}

        {/* ✅ Pagination */}
        {pagesData?.totalPages > 1 && (
          <BlogPagination
            totalPages={pagesData.totalPages}
            currentPage={currentPage}
            setCurrentPage={handlePageChange}
          />
        )}
      </div>
    </>
  );
};
