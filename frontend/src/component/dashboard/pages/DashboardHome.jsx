import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { BiSolidLike } from "react-icons/bi";
import { RiMessage2Fill } from "react-icons/ri";
import { FaUpload } from "react-icons/fa";
import AxiosInstance from "../../utils/AxiosInstance";

export default function DashboardHome() {
  const [blogsData, setBlogsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const blog = await AxiosInstance.post("/customer/blogs");
        if (blog?.data?.data) {
          setBlogsData(blog.data.data);
        }
      } catch (err) {
        console.error("Request Error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, []);

  const stats = useMemo(() => {
    if (!blogsData) return { totalBlogs: 0, totalLikes: 0, totalComments: 0 };
    let totalLikes = 0;
    let totalComments = 0;
    blogsData.forEach((b) => {
      totalLikes += b.likes?.length || 0;
      totalComments += b.comments?.length || 0;
    });
    return {
      totalBlogs: blogsData.length,
      totalLikes,
      totalComments,
    };
  }, [blogsData]);

  if (loading || !blogsData) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <p className="text-lg text-gray-700 dark:text-gray-200">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header / overview */}
      <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm dark:shadow-none">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 dark:text-orange-300 mb-1">
            Overview
          </p>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Monitor your blog performance and latest posts at a glance.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/30 hover:from-orange-600 hover:to-yellow-500 transition-all">
          <FaUpload className="w-4 h-4" />
          New Post
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl px-4 py-3 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400 mb-1">
            Total Blogs
          </p>
          <p className="text-3xl font-black text-gray-900 dark:text-white">
            {stats.totalBlogs}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Published articles on the platform.
          </p>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-yellow-400 text-white px-4 py-3 shadow-md shadow-orange-500/40">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] mb-1">
            Total Likes
          </p>
          <p className="text-3xl font-black flex items-center gap-2">
            <BiSolidLike className="w-7 h-7" />
            {stats.totalLikes}
          </p>
          <p className="text-xs mt-1 opacity-90">
            Reactions across all your posts.
          </p>
        </div>

        <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl px-4 py-3 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400 mb-1">
            Total Comments
          </p>
          <p className="text-3xl font-black flex items-center gap-2 text-gray-900 dark:text-white">
            <RiMessage2Fill className="w-6 h-6 text-orange-500 dark:text-orange-400" />
            {stats.totalComments}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Conversations started by readers.
          </p>
        </div>
      </div>

      {/* Blog list */}
      <div className="space-y-4">
        {blogsData.map((blog) => (
          <div
            key={blog._id}
            className="rounded-3xl border border-orange-100 dark:border-white/10 bg-white/90 dark:bg-white/5 backdrop-blur-2xl overflow-hidden shadow-md shadow-orange-200/40 dark:shadow-[0_14px_40px_rgba(0,0,0,0.85)]"
          >
            <div className="grid md:grid-cols-[260px,1fr]">
              {/* Image */}
              <div className="h-48 md:h-full w-full">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover md:rounded-l-3xl md:rounded-tr-none rounded-t-3xl"
                />
              </div>

              {/* Content */}
              <div className="p-4 md:p-5 flex flex-col gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-500 dark:text-orange-300 mb-1">
                    {blog.category?.categoryName ?? "Uncategorized"}
                  </p>
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {blog.title}
                  </h2>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    by {blog.author}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 md:line-clamp-3">
                    {blog.introduction}
                  </p>
                </div>

                {/* Meta grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-gray-600 dark:text-gray-300">
                  <div>
                    <p className="font-semibold text-gray-500 dark:text-gray-400">
                      Created
                    </p>
                    <p>{format(new Date(blog.createdAt), "MMM dd, yyyy")}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500 dark:text-gray-400">
                      Published
                    </p>
                    <p>{format(new Date(blog.publishAt), "MMM dd, yyyy")}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500 dark:text-gray-400">
                      Updated
                    </p>
                    <p>{format(new Date(blog.updatedAt), "MMM dd, yyyy")}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500 dark:text-gray-400">
                      Status
                    </p>
                    <p className="capitalize">{blog.status}</p>
                  </div>
                </div>

                {/* Footer actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                  <div className="flex items-center justify-center gap-2 rounded-2xl border border-orange-100 dark:border-white/10 bg-white/80 dark:bg-black/40 px-3 py-2">
                    <BiSolidLike className="text-lg text-orange-500" />
                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-100">
                      {blog.likes.length} Likes
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 rounded-2xl border border-orange-100 dark:border-white/10 bg-white/80 dark:bg-black/40 px-3 py-2">
                    <RiMessage2Fill className="text-lg text-orange-500" />
                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-100">
                      {blog.comments.length} Comments
                    </p>
                  </div>
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="flex items-center justify-center"
                  >
                    <div className="w-full text-center rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-semibold px-4 py-2 shadow-md shadow-orange-500/40 hover:from-orange-600 hover:to-yellow-500 transition-all">
                      Read Blog
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
