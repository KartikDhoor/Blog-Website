import { FiMessageCircle, FiShare2 } from "react-icons/fi";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import AxiosInstance from "../utils/AxiosInstance";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useAnalyticsContext } from "../analytics/AnalyticsProvider";
import { motion } from "framer-motion";


export default function Blog() {
  const { user, token } = useAuth();
  const { slug } = useParams();
  const { setPostData, trackLike, trackComment } = useAnalyticsContext();


  const [like, setLike] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likeTotal, setLikeTotal] = useState(0);
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 🚀 COMMENT PAGINATION STATES
  const [commentsPage, setCommentsPage] = useState(1);
  const [loadingMoreComments, setLoadingMoreComments] = useState(false);
  const [hasMoreComments, setHasMoreComments] = useState(false);
  const [totalComments, setTotalComments] = useState(0);
  const COMMENTS_PER_PAGE = 5;


  useEffect(() => {
    if (slug) {
      fetchBlogDetails(slug);
    }
  }, [slug, user, like]);


  const fetchBlogDetails = async (slugValue) => {
    try {
      const response = await AxiosInstance.post(
        `/customer/blogs/${slugValue}`,
        {
          userId: user?._id,
        }
      );


      const data = response.data.data;
      setBlogData(data);
      setLike(response.data.likedByUser);
      setLikeTotal(response.data.totalLikes || 0);
      
      // 🚀 Load initial comments with pagination
      const allComments = data.comments || [];
      setTotalComments(allComments.length);
      setCommentData(allComments.slice(0, COMMENTS_PER_PAGE));
      setHasMoreComments(allComments.length > COMMENTS_PER_PAGE);
      setCommentsPage(1);


      if (data?._id && data?.title) {
        setPostData(data._id, data.title);
      }


      setLoading(false);
    } catch (error) {
      console.error("Error fetching blog details:", error.message);
      setLoading(false);
      setBlogData(null);
    }
  };


  // 🚀 LOAD MORE COMMENTS
  const loadMoreComments = async () => {
    if (!blogData || loadingMoreComments || !hasMoreComments) return;

    setLoadingMoreComments(true);
    try {
      // Fetch all comments from blog data
      const allComments = blogData.comments || [];
      const nextPage = commentsPage + 1;
      const startIndex = nextPage * COMMENTS_PER_PAGE - COMMENTS_PER_PAGE;
      const endIndex = nextPage * COMMENTS_PER_PAGE;
      
      const newComments = allComments.slice(startIndex, endIndex);
      
      if (newComments.length > 0) {
        setCommentData(prev => [...prev, ...newComments]);
        setCommentsPage(nextPage);
        
        // Check if more comments exist
        if (endIndex >= allComments.length) {
          setHasMoreComments(false);
        }
      }
    } catch (error) {
      console.error("Error loading more comments:", error.message);
    } finally {
      setLoadingMoreComments(false);
    }
  };


  const handleLikeClick = async () => {
    if (!blogData || !user) return;


    try {
      const response = await AxiosInstance.post(
        "/customer/like/blog",
        {
          blogId: blogData._id,
          userId: user._id,
        },
        {
          headers: { authorization: token },
        }
      );


      if (response.data.success) {
        trackLike();
        setLike((prev) => !prev);
        setLikeTotal((prev) => (like ? prev - 1 : prev + 1));
      }
    } catch (error) {
      console.error("Error liking blog:", error.message);
    }
  };


  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };


  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!blogData || !user || !newComment.trim()) return;


    try {
      const response = await AxiosInstance.post(
        "/customer/create/comment",
        {
          blogId: blogData._id,
          userId: user._id,
          content: newComment,
        },
        {
          headers: { authorization: token },
        }
      );


      if (response) {
        trackComment();
        setNewComment("");
        fetchBlogDetails(slug);
      }
    } catch (error) {
      console.error("Error creating comment:", error.message);
    }
  };


  if (loading) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 dark:from-gray-900 dark:via-black dark:to-gray-900 flex items-center justify-center pt-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full animate-pulse mx-auto mb-6 shadow-2xl shadow-orange-500/40"></div>
          <p className="text-2xl font-black text-gray-900 dark:text-white">
            Loading Article...
          </p>
        </div>
      </motion.div>
    );
  }


  if (!blogData) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 dark:from-gray-900 dark:via-black dark:to-gray-900 flex items-center justify-center pt-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <p className="text-3xl font-black text-gray-900 dark:text-white mb-6">
            Article Not Found
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl hover:shadow-orange-500/40 hover:-translate-y-1 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    );
  }


  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-yellow-50 dark:from-gray-900 dark:via-black dark:to-gray-900 min-h-screen">
      {/* HERO SECTION WITH IMAGE BACKGROUND */}
      <motion.div
        className="relative h-[70vh] overflow-hidden pt-28 sm:pt-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('${
              blogData.image || "https://picsum.photos/1920/1080"
            }')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        </div>


        {/* Content Overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end px-4 sm:px-6 lg:px-16 pb-10 sm:pb-14 lg:pb-16"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="max-w-4xl">
            <motion.div
              className="inline-flex items-center gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-500/20 to-yellow-400/20 backdrop-blur-xl border border-orange-400/40 rounded-2xl mb-4 sm:mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-xs sm:text-sm font-bold text-orange-400 uppercase tracking-widest">
                {blogData.category?.categoryName}
              </span>
            </motion.div>


            <motion.h1
              className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black text-white leading-tight drop-shadow-2xl max-w-3xl mb-4 sm:mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {blogData.title}
            </motion.h1>


            <motion.div
              className="flex flex-wrap gap-4 sm:gap-8 items-center text-white/90"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-full flex items-center justify-center font-bold text-white shadow-lg">
                  {blogData.author?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-lg">
                    {blogData.author}
                  </p>
                  <p className="text-xs sm:text-sm text-white/70">
                    {format(new Date(blogData.createdAt), "MMMM dd, yyyy")}
                  </p>
                </div>
              </div>
              <div className="hidden sm:block h-10 w-px bg-white/30"></div>
              <div className="text-xs sm:text-sm">
                <p className="text-white/70">Reading Time</p>
                <p className="font-semibold text-sm sm:text-lg">
                  {blogData.readingTime}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>


      {/* MAIN CONTENT AREA */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0 py-16 sm:py-20">
        {/* MOBILE ACTION BAR */}
        <div className="flex lg:hidden items-center gap-3 mb-8">
          <button
            onClick={handleLikeClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold ${
              like
                ? "bg-red-500 text-white"
                : "bg-white/90 dark:bg-white/10 text-gray-800 dark:text-gray-100"
            }`}
          >
            <FaHeart className={like ? "fill-current" : ""} />
            <span>{likeTotal}</span>
          </button>


          <button className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold bg-white/90 dark:bg-white/10 text-gray-800 dark:text-gray-100">
            <FiShare2 />
            <span>Share</span>
          </button>
        </div>


        {/* Sticky Navigation - DESKTOP ONLY */}
        <motion.div
          className="hidden lg:flex fixed top-32 right-4 z-40 flex-col gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <motion.button
            onClick={handleLikeClick}
            className={`group relative w-12 h-12 xl:w-14 xl:h-14 rounded-2xl shadow-lg backdrop-blur-xl transition-all duration-300 flex items-center justify-center font-bold text-lg xl:text-xl ${
              like
                ? "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-red-500/30"
                : "bg-white/80 dark:bg-white/20 border border-white/50 dark:border-white/30 text-gray-800 dark:text-gray-300 hover:bg-white/95 dark:hover:bg-white/30 hover:shadow-xl hover:border-orange-400/50"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHeart className={like ? "fill-current" : ""} />
            <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] xl:text-xs font-bold px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {likeTotal} {likeTotal === 1 ? "Like" : "Likes"}
            </span>
          </motion.button>


          <motion.button
            className="group relative w-12 h-12 xl:w-14 xl:h-14 rounded-2xl bg-white/80 dark:bg-white/20 border border-white/50 dark:border-white/30 shadow-lg backdrop-blur-xl text-gray-800 dark:text-gray-300 hover:bg-white/95 dark:hover:bg-white/30 transition-all duration-300 flex items-center justify-center text-lg xl:text-xl hover:shadow-xl hover:border-orange-400/50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiShare2 />
            <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] xl:text-xs font-bold px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Share
            </span>
          </motion.button>
        </motion.div>


        {/* Article Content */}
        <motion.div
          className="prose prose-base sm:prose-lg dark:prose-invert max-w-none mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Overview */}
          <motion.div
            className="bg-white/80 dark:bg-white/10 backdrop-blur-2xl border border-white/50 dark:border-white/30 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xl mb-10 sm:mb-12"
            whileHover={{ y: -4 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-4 sm:mb-6">
              Overview
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-light">
              {blogData.introduction}
            </p>
          </motion.div>


          {/* Sections */}
          {blogData.sections.map((section, index) => (
            <motion.div
              key={section._id}
              id={`section-${index}`}
              className="scroll-mt-32 mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white/80 dark:bg-white/10 backdrop-blur-2xl border border-white/50 dark:border-white/30 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xl hover:shadow-2xl hover:border-orange-400/50 transition-all duration-500">
                <motion.h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-white/30"
                  whileHover={{ x: 4 }}
                >
                  {section.title}
                </motion.h2>


                <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6 sm:mb-8 font-light">
                  {section.content}
                </p>


                {section.sectionImage && (
                  <motion.div
                    className="my-8 sm:my-10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/40"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={section.sectionImage}
                      alt={section.title}
                      className="w-full h-auto object-cover"
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>


        {/* TABLE OF CONTENTS STICKY - DESKTOP ONLY */}
        <motion.div
          className="hidden 2xl:block fixed left-6 top-[55vh] z-30 max-w-xs"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="bg-white/80 dark:bg-white/15 backdrop-blur-2xl border border-white/50 dark:border-white/30 rounded-3xl p-6 shadow-xl max-h-[60vh] overflow-y-auto">
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6">
              Contents
            </h3>
            <div className="space-y-3">
              {blogData.sections.map((section, index) => (
                <motion.a
                  key={section._id}
                  href={`#section-${index}`}
                  className="block text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors line-clamp-2"
                  whileHover={{ x: 4 }}
                >
                  {section.title}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>


      {/* COMMENTS SECTION WITH PAGINATION */}
      <motion.div
        className="bg-white/60 dark:bg-white/20 backdrop-blur-2xl border-y border-white/30 dark:border-white/20 py-16 sm:py-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-8 sm:mb-12">
            Comments ({totalComments})
          </h2>


          {/* Add Comment */}
          {user && (
            <motion.form
              onSubmit={handleCommentSubmit}
              className="mb-12 sm:mb-16 bg-white/80 dark:bg-white/15 backdrop-blur-2xl border border-white/50 dark:border-white/30 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xl"
              whileHover={{ y: -2 }}
            >
              <div className="mb-4 sm:mb-6">
                <textarea
                  name="comment"
                  value={newComment}
                  onChange={handleInputChange}
                  placeholder="Share your thoughts..."
                  className="w-full min-h-[120px] sm:min-h-[140px] bg-white/50 dark:bg-white/20 backdrop-blur-xl border border-white/40 dark:border-white/20 rounded-2xl p-4 sm:p-6 text-base sm:text-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-400/50 focus:shadow-lg focus:shadow-orange-500/20 transition-all resize-none"
                />
              </div>
              <div className="flex justify-end">
                <motion.button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm sm:text-lg rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Post Comment
                </motion.button>
              </div>
            </motion.form>
          )}


          {/* Comments List with Pagination */}
          <div className="space-y-4 sm:space-y-6">
            {commentData.length === 0 ? (
              <motion.div
                className="text-center py-12 sm:py-16"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-light">
                  No comments yet. Be the first to share your thoughts!
                </p>
              </motion.div>
            ) : (
              <>
                {[...commentData].reverse().map((comment, index) => (
                  <motion.div
                    key={comment._id}
                    className="group bg-white/80 dark:bg-white/15 backdrop-blur-2xl border border-white/50 dark:border-white/30 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:border-orange-400/50 transition-all duration-500"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex gap-4 sm:gap-6">
                      <div className="flex-shrink-0">
                        {comment.userId.image ? (
                          <img
                            src={comment.userId.image}
                            alt={comment.userId.name}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-3xl object-cover ring-4 ring-white/50 shadow-lg"
                          />
                        ) : (
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-3xl flex items-center justify-center text-white font-bold text-xl sm:text-2xl ring-4 ring-white/50 shadow-lg">
                            {comment.userId.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                            {comment.userId.name}
                          </h4>
                          <span className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
                            {format(new Date(comment.date), "MMM dd, yyyy")}
                          </span>
                        </div>
                        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-light">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Load More Comments Button */}
                {hasMoreComments && (
                  <motion.div
                    className="flex justify-center mt-8 sm:mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <motion.button
                      onClick={loadMoreComments}
                      disabled={loadingMoreComments}
                      className="px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 hover:from-orange-500/20 hover:to-yellow-500/20 border border-orange-400/30 rounded-2xl text-orange-600 dark:text-orange-400 font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-3"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {loadingMoreComments ? (
                        <>
                          <div className="w-4 h-4 border-2 border-orange-400/50 border-t-orange-500 rounded-full animate-spin" />
                          Loading more comments...
                        </>
                      ) : (
                        <>
                          <span>📝 Load More Comments ({commentData.length}/{totalComments})</span>
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                )}

                {/* Pagination Info */}
                <motion.div
                  className="text-center mt-8 sm:mt-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
                    Showing {Math.min(commentData.length, totalComments)} of {totalComments} comments
                  </p>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </motion.div>


      {/* RECOMMENDED ARTICLES */}
      <motion.div
        className="py-16 sm:py-24"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white text-center mb-10 sm:mb-16">
            Keep Reading
          </h2>


          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {[1, 2, 3].map((card, index) => (
              <motion.div
                key={card}
                className="group overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -12 }}
              >
                <motion.div
                  className="relative h-56 sm:h-64 lg:h-72 rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src="https://picsum.photos/400/300"
                    alt="Article"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent group-hover:from-black/60 transition-all duration-500"></div>
                </motion.div>


                <motion.div
                  className="relative -mt-16 sm:-mt-20 mx-3 sm:mx-4 bg-white/80 dark:bg-white/15 backdrop-blur-2xl border border-white/50 dark:border-white/30 rounded-3xl p-6 sm:p-8 shadow-2xl group-hover:shadow-3xl group-hover:border-orange-400/60 transition-all duration-500"
                  whileHover={{ y: -8 }}
                >
                  <h3 className="text-lg sm:text-2xl font-black text-gray-900 dark:text-white mb-3 sm:mb-4 line-clamp-2 group-hover:text-orange-500 transition-colors">
                    Insights into Progressive Policies
                  </h3>


                  <div className="flex items-center gap-3 sm:gap-4">
                    <motion.button
                      className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/60 dark:bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-300 hover:bg-white/80 hover:border-orange-400/50 hover:text-orange-500 transition-all"
                      whileHover={{ scale: 1.08 }}
                    >
                      <FiMessageCircle /> 45
                    </motion.button>
                    <Link to="#" className="ml-auto">
                      <motion.button
                        className="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        Read →
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}