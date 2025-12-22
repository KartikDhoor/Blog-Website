import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaUserCircle, FaTrash, FaComment } from "react-icons/fa";
import AxiosInstance from "../../utils/AxiosInstance";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";

export default function DashboardComments() {
  const [blogsData, setBlogsData] = useState(null);
  const [filteredBlogs, setFilteredBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedBlog, setExpandedBlog] = useState(null);
  const [isDark, setIsDark] = useState(false);

  const [queryParams, setQueryParams] = useState({
    sortBy: "createdAt",
    order: "desc",
    limit: 50,
    page: 1,
  });

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

  // Fetch blogs
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const blog = await AxiosInstance.get("/customer/blogs", {
          params: queryParams,
        });
        if (blog?.data?.data) {
          setBlogsData(blog.data.data);
          setFilteredBlogs(blog.data.data);
        }
      } catch (err) {
        console.error("Request Error:", err.message);
        toast.error("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, [queryParams]);

  // Search handler
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (!blogsData) return;

    const filtered = blogsData.filter(
      (blog) =>
        blog.title.toLowerCase().includes(term) ||
        blog.author.toLowerCase().includes(term)
    );
    setFilteredBlogs(filtered);
  };

  // Delete comment handler
  const handleDeleteComment = async (blogId, commentId) => {
    try {
      const token = localStorage.getItem("blogsite_jwt_token");
      await AxiosInstance.delete(`/admin/comment/${commentId}`, {
        headers: { authorization: token },
      });

      // Update local state
      setBlogsData((prev) =>
        prev.map((blog) =>
          blog._id === blogId
            ? {
                ...blog,
                comments: blog.comments.filter((c) => c._id !== commentId),
              }
            : blog
        )
      );
      setFilteredBlogs((prev) =>
        prev.map((blog) =>
          blog._id === blogId
            ? {
                ...blog,
                comments: blog.comments.filter((c) => c._id !== commentId),
              }
            : blog
        )
      );

      toast.success("Comment deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete comment");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg text-gray-700 dark:text-gray-200">
          Loading comments...
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full space-y-6">
        {/* HEADER */}
        <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 dark:text-orange-300 mb-1">
              Engagement
            </p>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">
              Comments
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Moderate and manage all blog comments.
            </p>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 rounded-2xl bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 px-3 py-2 shadow-sm">
            <IoSearch className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={handleSearch}
              className="bg-transparent outline-none text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 w-40 sm:w-52"
            />
          </div>
        </div>

        {/* CONTENT */}
        {!blogsData || blogsData.length === 0 ? (
          // Empty state
          <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl px-5 py-12 text-center shadow-sm">
            <FaComment className="w-16 h-16 text-orange-400/40 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              No blogs available
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Create some blog posts first to see comments here.
            </p>
          </div>
        ) : filteredBlogs && filteredBlogs.length === 0 ? (
          // No search results
          <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl px-5 py-12 text-center shadow-sm">
            <IoSearch className="w-16 h-16 text-orange-400/40 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              No results found
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Try searching with different keywords.
            </p>
          </div>
        ) : (
          // Blog list with comments
          <div className="space-y-4">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="rounded-3xl border border-orange-100 dark:border-white/10 bg-white/90 dark:bg-white/5 backdrop-blur-2xl overflow-hidden shadow-md shadow-orange-200/40 dark:shadow-[0_14px_40px_rgba(0,0,0,0.85)]"
              >
                {/* Blog Header */}
                <div className="grid md:grid-cols-[240px,1fr]">
                  {/* Image */}
                  <div className="h-48 md:h-full w-full">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover md:rounded-l-3xl md:rounded-tr-none rounded-t-3xl"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-4 md:p-5 flex flex-col gap-2">
                    <div>
                      <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {blog.title}
                      </h2>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                        by {blog.author}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {blog.introduction}
                      </p>
                    </div>

                    {/* Comment count button */}
                    <button
                      onClick={() =>
                        setExpandedBlog(
                          expandedBlog === blog._id ? null : blog._id
                        )
                      }
                      className="mt-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold shadow-md shadow-orange-500/40 hover:from-orange-600 hover:to-yellow-500 transition-all inline-flex items-center gap-2 w-fit"
                    >
                      <FaComment className="w-4 h-4" />
                      {blog.comments?.length || 0} Comments
                    </button>
                  </div>
                </div>

                {/* Comments Section */}
                {expandedBlog === blog._id && (
                  <div className="border-t border-orange-100 dark:border-white/10 p-4 md:p-5 space-y-3 bg-white/60 dark:bg-black/20">
                    {blog.comments && blog.comments.length > 0 ? (
                      blog.comments.map((comment) => (
                        <div
                          key={comment._id}
                          className="rounded-2xl border border-orange-100 dark:border-white/15 bg-white/80 dark:bg-black/40 p-4 hover:shadow-md transition-shadow"
                        >
                          {/* Comment Header */}
                          <div className="flex items-start gap-3 mb-2">
                            {/* Avatar */}
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center overflow-hidden">
                              {comment.user?.image ? (
                                <img
                                  src={comment.user.image}
                                  alt={comment.user?.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <FaUserCircle className="w-6 h-6 text-orange-500" />
                              )}
                            </div>

                            {/* User info */}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {comment.user?.name || "Anonymous"}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {comment.createdAt
                                  ? format(
                                      new Date(comment.createdAt),
                                      "MMM dd, yyyy h:mm a"
                                    )
                                  : "Just now"}
                              </p>
                            </div>

                            {/* Delete button */}
                            <button
                              onClick={() =>
                                handleDeleteComment(blog._id, comment._id)
                              }
                              className="flex-shrink-0 p-2 rounded-xl bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/30 transition-colors"
                              title="Delete comment"
                            >
                              <FaTrash className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Comment content */}
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed break-words">
                            {comment.content}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
                        No comments yet
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
}
