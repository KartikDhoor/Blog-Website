import { IoSearch } from "react-icons/io5";
import { BiSolidLike } from "react-icons/bi";
import { RiMessage2Fill } from "react-icons/ri";
import { FaUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AxiosInstance from "../../utils/AxiosInstance";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import DashboardPopUp from "../DashboardPopUp";

export default function DashboardBlog() {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState([]);
  const [blogsData, setBlogsData] = useState([]);
  const [createFormErrors, setCreateFormErrors] = useState({});
  const [updateFormErrors, setUpdateFormErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [blogCreate, setBlogCreate] = useState(false);
  const [blogUpdate, setBlogUpdate] = useState(false);
  const [createPopup, setCreatePopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [blogUpdateFormData, setBlogUpdateFormData] = useState(null);
  const [blogCreateFormData, setBlogCreateFormData] = useState({
    title: "",
    author: "",
    category: "",
    image: "",
    introduction: "",
    slug: "",
    readingTime: 0,
    publishAt: "",
    status: "draft",
    sections: [{ title: "", content: "", sectionImage: "", url: "" }],
  });
  const [queryParams, setQueryParams] = useState({
    sortBy: "createdAt",
    order: "desc",
    limit: 10,
    page: 1,
  });

  // ========== FETCH DATA ==========
  useEffect(() => {
    const fetchdata = async () => {
      const token = localStorage.getItem("blogsite_jwt_token");
      try {
        const blog = await AxiosInstance.post(
          "/admin/dashboard/blogs/find",
          { params: queryParams },
          {
            headers: {
              authorization: token,
            },
          }
        );
        const category = await AxiosInstance.post("/customer/category");

        if (category?.data?.data) {
          setCategoryData(category.data.data);
        }
        if (blog?.data?.data) {
          setBlogsData(blog.data.data);
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

  // ========== CREATE HANDLERS ==========
  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setBlogCreateFormData((prev) => ({
      ...prev,
      [name]: name === "readingTime" ? Number(value) : value,
    }));
  };

  const handleCreateImageChange = (e) => {
    const file = e.target.files[0];
    setBlogCreateFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleCreateSectionChange = (e, index) => {
    const { name, value } = e.target;
    setBlogCreateFormData((prev) => {
      const sections = [...prev.sections];
      sections[index] = { ...sections[index], [name]: value };
      return { ...prev, sections };
    });
  };

  const handleCreateSectionImageChange = (e, index) => {
    const file = e.target.files[0];
    setBlogCreateFormData((prev) => {
      const sections = [...prev.sections];
      sections[index] = { ...sections[index], sectionImage: file };
      return { ...prev, sections };
    });
  };

  const addCreateSection = () => {
    setBlogCreateFormData((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        { title: "", content: "", sectionImage: "", url: "" },
      ],
    }));
  };

  const removeCreateSection = (index) => {
    setBlogCreateFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const validateCreateForm = () => {
    const errors = {};
    if (!blogCreateFormData.title.trim())
      errors.title = "Title is required";
    if (!blogCreateFormData.author.trim())
      errors.author = "Author is required";
    if (!blogCreateFormData.category) errors.category = "Category is required";
    if (!blogCreateFormData.image) errors.image = "Cover image is required";
    if (!blogCreateFormData.introduction.trim())
      errors.introduction = "Introduction is required";
    if (blogCreateFormData.readingTime <= 0)
      errors.readingTime = "Reading time must be greater than 0";
    if (!blogCreateFormData.slug.trim()) errors.slug = "Slug is required";
    if (!blogCreateFormData.publishAt) errors.publishAt = "Publish date required";
    if (blogCreateFormData.sections.length === 0)
      errors.sections = "At least one section is required";

    setCreateFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateSubmit = async () => {
     alert('Creating your blog...');
    const token = localStorage.getItem("blogsite_jwt_token");
    const formData = new FormData();
    formData.append("title", blogCreateFormData.title);
    formData.append("author", blogCreateFormData.author);
    formData.append("category", blogCreateFormData.category);
    formData.append("introduction", blogCreateFormData.introduction);
    formData.append("readingTime", blogCreateFormData.readingTime);
    formData.append("publishAt", blogCreateFormData.publishAt);
    formData.append("status", blogCreateFormData.status);
    formData.append("slug", blogCreateFormData.slug);

    if (blogCreateFormData.image) {
      formData.append("image", blogCreateFormData.image);
    }

    blogCreateFormData.sections.forEach((section, index) => {
      formData.append(`sections[${index}][title]`, section.title);
      formData.append(`sections[${index}][content]`, section.content);
      if (section.sectionImage) {
        formData.append(`sections[${index}][sectionImage]`, section.sectionImage);
      }
      formData.append(`sections[${index}][url]`, section.url);
    });

    try {
      const res = await AxiosInstance.post("/admin/create/blog", formData, {
        headers: {
          authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
       alert('Creating your blog 5 5 5 ...');
       console.log(res.data);

      if (res?.data?.success) {
         alert('Creating your blog...');
        toast.success("Blog created successfully!");
        setBlogCreate(false);
        setCreatePopup(false);
        setBlogCreateFormData({
          title: "",
          author: "",
          category: "",
          image: "",
          introduction: "",
          slug: "",
          readingTime: 0,
          publishAt: "",
          status: "draft",
          sections: [{ title: "", content: "", sectionImage: "", url: "" }],
        });
        setQueryParams((prev) => ({ ...prev, page: 1 }));
      }
    } catch (err) {
      console.error("Create error:", err);
      toast.error(err?.response?.data?.message || "Failed to create blog");
    }
  };

  // ========== UPDATE HANDLERS ==========
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setBlogUpdateFormData((prev) => ({
      ...prev,
      [name]: name === "readingTime" ? Number(value) : value,
    }));
  };

  const handleUpdateImageChange = (e) => {
    const file = e.target.files[0];
    setBlogUpdateFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleUpdateSectionChange = (e, index) => {
    const { name, value } = e.target;
    setBlogUpdateFormData((prev) => {
      const sections = [...prev.sections];
      sections[index] = { ...sections[index], [name]: value };
      return { ...prev, sections };
    });
  };

  const handleUpdateSectionImageChange = (e, index) => {
    const file = e.target.files[0];
    setBlogUpdateFormData((prev) => {
      const sections = [...prev.sections];
      sections[index] = { ...sections[index], sectionImage: file };
      return { ...prev, sections };
    });
  };

  const addUpdateSection = () => {
    setBlogUpdateFormData((prev) => ({
      ...prev,
      sections: [
        ...(prev.sections || []),
        { title: "", content: "", sectionImage: "", url: "" },
      ],
    }));
  };

  const removeUpdateSection = (index) => {
    setBlogUpdateFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const validateUpdateForm = () => {
    const errors = {};
    if (!blogUpdateFormData.title.trim())
      errors.title = "Title is required";
    if (!blogUpdateFormData.author.trim())
      errors.author = "Author is required";
    if (!blogUpdateFormData.category) errors.category = "Category is required";
    if (!blogUpdateFormData.introduction.trim())
      errors.introduction = "Introduction is required";
    if (blogUpdateFormData.readingTime <= 0)
      errors.readingTime = "Reading time must be greater than 0";
    if (!blogUpdateFormData.slug.trim()) errors.slug = "Slug is required";
    if (!blogUpdateFormData.publishAt)
      errors.publishAt = "Publish date required";
    if (!blogUpdateFormData.sections || blogUpdateFormData.sections.length === 0)
      errors.sections = "At least one section is required";

    setUpdateFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateSubmit = async () => {
    const token = localStorage.getItem("blogsite_jwt_token");
    const formData = new FormData();
    formData.append("title", blogUpdateFormData.title);
    formData.append("author", blogUpdateFormData.author);
    formData.append("category", blogUpdateFormData.category);
    formData.append("introduction", blogUpdateFormData.introduction);
    formData.append("readingTime", blogUpdateFormData.readingTime);
    formData.append("publishAt", blogUpdateFormData.publishAt);
    formData.append("status", blogUpdateFormData.status);
    formData.append("slug", blogUpdateFormData.slug);

    if (blogUpdateFormData.image && typeof blogUpdateFormData.image !== "string") {
      formData.append("image", blogUpdateFormData.image);
    }

    (blogUpdateFormData.sections || []).forEach((section, index) => {
      formData.append(`sections[${index}][title]`, section.title);
      formData.append(`sections[${index}][content]`, section.content);
      if (section.sectionImage && typeof section.sectionImage !== "string") {
        formData.append(`sections[${index}][sectionImage]`, section.sectionImage);
      }
      formData.append(`sections[${index}][url]`, section.url);
    });

    try {
      const res = await AxiosInstance.put(
        `/admin/dashboard/blogs/${blogUpdateFormData._id}`,
        formData,
        {
          headers: {
            authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res?.data?.success) {
        toast.success("Blog updated successfully!");
        setBlogUpdate(false);
        setUpdatePopup(false);
        setBlogUpdateFormData(null);
        setQueryParams((prev) => ({ ...prev })); // Refetch
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err?.response?.data?.message || "Failed to update blog");
    }
  };

  // ========== DELETE HANDLER ==========
  const handleDeleteBlog = async (blogId) => {
    const token = localStorage.getItem("blogsite_jwt_token");
    try {
      const res = await AxiosInstance.delete(`/admin/dashboard/blogs/${blogId}`, {
        headers: { authorization: token },
      });

      if (res?.data?.success) {
        toast.success("Blog deleted successfully!");
        setBlogsData((prev) => prev.filter((b) => b._id !== blogId));
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err?.response?.data?.message || "Failed to delete blog");
    }
  };

  const openUpdateModal = (blog) => {
    setBlogUpdateFormData(blog);
    setBlogUpdate(true);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg text-gray-700 dark:text-gray-200">
          Loading blogs...
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full space-y-6">
        {/* TOP TOOLBAR */}
        <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 dark:text-orange-300 mb-1">
              Blog Manager
            </p>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">
              Blogs
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Search, create, update and manage all blog posts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search */}
            <div className="flex items-center gap-2 rounded-2xl bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 px-3 py-2 shadow-sm">
              <IoSearch className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search blogs..."
                className="bg-transparent outline-none text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 w-40 sm:w-52"
              />
            </div>

            {/* New blog button */}
            <button
              type="button"
              onClick={() => {
                setBlogCreate(true);
                setCreateFormErrors({});
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/30 hover:from-orange-600 hover:to-yellow-500 transition-all"
            >
              <FaUpload className="w-4 h-4" />
              New Blog
            </button>
          </div>
        </div>

        {/* BLOG LIST */}
        <div className="space-y-4">
          {blogsData && blogsData.length > 0 ? (
            blogsData.map((blog) => (
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
                    <div className="flex justify-between gap-3 items-start">
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
                      </div>

                      {/* Delete / Edit buttons */}
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="px-3 py-2 rounded-xl bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-xs font-semibold text-orange-600 dark:text-orange-300 hover:bg-orange-50/80 dark:hover:bg-white/10"
                          onClick={() => openUpdateModal(blog)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="px-3 py-2 rounded-xl bg-red-500/90 text-white hover:bg-red-600 flex items-center justify-center"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this blog?"
                              )
                            ) {
                              handleDeleteBlog(blog._id);
                            }
                          }}
                        >
                          <MdDelete className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 md:line-clamp-3">
                      {blog.introduction}
                    </p>

                    {/* Meta grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-gray-600 dark:text-gray-300">
                      <div>
                        <p className="font-semibold text-gray-500 dark:text-gray-400">
                          Created
                        </p>
                        <p>
                          {format(new Date(blog.createdAt), "MMM dd, yyyy")}
                        </p>
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
                        <p>
                          {format(new Date(blog.updatedAt), "MMM dd, yyyy")}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-500 dark:text-gray-400">
                          Status
                        </p>
                        <p className="capitalize">{blog.status}</p>
                      </div>
                    </div>

                    {/* Footer stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-1">
                      <div className="flex items-center justify-center gap-2 rounded-2xl border border-orange-100 dark:border-white/10 bg-white/80 dark:bg-black/40 px-3 py-2">
                        <BiSolidLike className="text-lg text-orange-500" />
                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-100">
                          {blog.likes?.length || 0} Likes
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-2 rounded-2xl border border-orange-100 dark:border-white/10 bg-white/80 dark:bg-black/40 px-3 py-2">
                        <RiMessage2Fill className="text-lg text-orange-500" />
                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-100">
                          {blog.comments?.length || 0} Comments
                        </p>
                      </div>
                      <Link
                        to={`/blog/${blog.slug}`}
                        className="flex items-center justify-center"
                      >
                        <div className="w-full text-center rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-semibold px-4 py-2 shadow-md shadow-orange-500/40 hover:from-orange-600 hover:to-yellow-500 transition-all">
                          View Blog
                        </div>
                      </Link>
                      <button
                        type="button"
                        className="w-full text-center rounded-2xl border border-orange-100 dark:border-white/10 bg-white/80 dark:bg-black/40 text-xs font-semibold text-gray-800 dark:text-gray-100 px-4 py-2 hover:bg-orange-50/70 dark:hover:bg-white/10"
                      >
                        Publish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No blogs found. Create your first blog!
              </p>
            </div>
          )}
        </div>

        <ToastContainer position="bottom-right" />
      </div>

      {/* ========== CREATE MODAL ========== */}
      {blogCreate && (
        <div className="fixed inset-0 z-50 flex items-top justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setBlogCreate(false)}
          />

          <div className="relative z-10 w-full max-w-3xl rounded-3xl bg-white/95 dark:bg-black/85 border border-orange-100 dark:border-white/15 backdrop-blur-2xl p-5 sm:p-6 lg:p-7 shadow-[0_18px_60px_rgba(0,0,0,0.25)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sticky top-0 bg-white/95 dark:bg-black/85 pb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 dark:text-orange-300 mb-1">
                  New Blog
                </p>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                  Create Blog
                </h2>
              </div>
              <button
                type="button"
                className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-orange-500"
                onClick={() => setBlogCreate(false)}
              >
                Close
              </button>
            </div>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={blogCreateFormData.title}
                  onChange={handleCreateChange}
                  className="w-full h-10 rounded-2xl px-3 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
                  placeholder="Enter blog title"
                />
                {createFormErrors.title && (
                  <p className="mt-1 text-xs text-red-500">
                    {createFormErrors.title}
                  </p>
                )}
              </div>

              {/* Author & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={blogCreateFormData.author}
                    onChange={handleCreateChange}
                    className="w-full h-10 rounded-2xl px-3 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
                    placeholder="Author name"
                  />
                  {createFormErrors.author && (
                    <p className="mt-1 text-xs text-red-500">
                      {createFormErrors.author}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Category
                  </label>
                  <select
                    name="category"
                    value={blogCreateFormData.category}
                    onChange={handleCreateChange}
                    className="w-full h-10 rounded-2xl px-3 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
                  >
                    <option value="">Select category</option>
                    {categoryData.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </select>
                  {createFormErrors.category && (
                    <p className="mt-1 text-xs text-red-500">
                      {createFormErrors.category}
                    </p>
                  )}
                </div>
              </div>

              {/* Image & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Cover Image
                  </label>
                  <input
                    type="file"
                    onChange={handleCreateImageChange}
                    className="w-full text-xs text-gray-700 dark:text-gray-200 file:mr-3 file:py-2 file:px-3 file:rounded-2xl file:border-0 file:text-xs file:font-semibold file:bg-orange-500/90 file:text-white hover:file:bg-orange-600/90 bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400/70"
                  />
                  {createFormErrors.image && (
                    <p className="mt-1 text-xs text-red-500">
                      {createFormErrors.image}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Slug
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={blogCreateFormData.slug}
                    onChange={handleCreateChange}
                    className="w-full h-10 rounded-2xl px-3 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
                    placeholder="unique-blog-slug"
                  />
                  {createFormErrors.slug && (
                    <p className="mt-1 text-xs text-red-500">
                      {createFormErrors.slug}
                    </p>
                  )}
                </div>
              </div>

              {/* Introduction */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Introduction
                </label>
                <textarea
                  name="introduction"
                  value={blogCreateFormData.introduction}
                  onChange={handleCreateChange}
                  className="w-full min-h-[90px] rounded-2xl px-3 py-2 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70 resize-y"
                  placeholder="Short summary of the blog..."
                />
                {createFormErrors.introduction && (
                  <p className="mt-1 text-xs text-red-500">
                    {createFormErrors.introduction}
                  </p>
                )}
              </div>

              {/* Reading time / Publish date / Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Reading Time (min)
                  </label>
                  <input
                    type="number"
                    name="readingTime"
                    value={blogCreateFormData.readingTime}
                    onChange={handleCreateChange}
                    className="w-full h-10 rounded-2xl px-3 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
                    min={0}
                  />
                  {createFormErrors.readingTime && (
                    <p className="mt-1 text-xs text-red-500">
                      {createFormErrors.readingTime}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Publish At
                  </label>
                  <input
                    type="date"
                    name="publishAt"
                    value={blogCreateFormData.publishAt}
                    onChange={handleCreateChange}
                    className="w-full h-10 rounded-2xl px-3 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
                  />
                  {createFormErrors.publishAt && (
                    <p className="mt-1 text-xs text-red-500">
                      {createFormErrors.publishAt}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Status
                  </label>
                  <select
                    name="status"
                    value={blogCreateFormData.status}
                    onChange={handleCreateChange}
                    className="w-full h-10 rounded-2xl px-3 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                  {createFormErrors.status && (
                    <p className="mt-1 text-xs text-red-500">
                      {createFormErrors.status}
                    </p>
                  )}
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-600 dark:text-gray-400">
                    Sections
                  </p>
                  <button
                    type="button"
                    onClick={addCreateSection}
                    className="px-3 py-1.5 rounded-2xl text-xs font-semibold bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-800 dark:text-gray-100 hover:bg-orange-50/80 dark:hover:bg-white/10"
                  >
                    Add Section
                  </button>
                </div>

                {blogCreateFormData.sections.map((section, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-orange-100 dark:border-white/15 bg-white/70 dark:bg-black/40 px-3 py-3 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                        Section {index + 1}
                      </p>
                      {blogCreateFormData.sections.length > 1 && (
                        <button
                          type="button"
                          className="text-[11px] font-semibold text-red-500 hover:text-red-400"
                          onClick={() => removeCreateSection(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      name="title"
                      value={section.title}
                      onChange={(e) => handleCreateSectionChange(e, index)}
                      placeholder="Section title"
                      className="w-full h-9 rounded-2xl px-3 text-xs bg-white/90 dark:bg-black/50 border border-orange-100 dark:border-white/20 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70 mb-1"
                    />

                    <textarea
                      name="content"
                      value={section.content}
                      onChange={(e) => handleCreateSectionChange(e, index)}
                      placeholder="Section content..."
                      className="w-full min-h-[70px] rounded-2xl px-3 py-2 text-xs bg-white/90 dark:bg-black/50 border border-orange-100 dark:border-white/20 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70 mb-1 resize-y"
                    />

                    <input
                      type="text"
                      name="url"
                      value={section.url}
                      onChange={(e) => handleCreateSectionChange(e, index)}
                      placeholder="Optional URL"
                      className="w-full h-9 rounded-2xl px-3 text-xs bg-white/90 dark:bg-black/50 border border-orange-100 dark:border-white/20 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70 mb-1"
                    />

                    <input
                      type="file"
                      onChange={(e) =>
                        handleCreateSectionImageChange(e, index)
                      }
                      className="w-full text-[11px] text-gray-700 dark:text-gray-200 file:mr-3 file:py-1.5 file:px-3 file:rounded-2xl file:border-0 file:text-[11px] file:font-semibold file:bg-orange-500/90 file:text-white hover:file:bg-orange-600/90 bg-white/90 dark:bg-black/50 border border-orange-100 dark:border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400/70"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-5 sticky bottom-0 bg-white/95 dark:bg-black/85 pt-3">
              <button
                type="button"
                onClick={() => {
                  if (validateCreateForm()) {
                    setCreatePopup(true);
                  }
                }}
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold shadow-md shadow-orange-500/40 hover:from-orange-600 hover:to-yellow-500 transition-all"
              >
                Save Blog
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-2xl border border-orange-100 dark:border-white/15 bg-white/80 dark:bg-black/40 text-sm font-semibold text-gray-800 dark:text-gray-100"
                onClick={() => setBlogCreate(false)}
              >
                Cancel
              </button>
            </div>

            {createPopup && (
              <DashboardPopUp
                message="Do you want to create this blog?"
                onConfirm={handleCreateSubmit}
                onCancel={() => setCreatePopup(false)}
              />
            )}
          </div>
        </div>
      )}

      {/* ========== UPDATE MODAL ========== */}
      {blogUpdate && blogUpdateFormData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setBlogUpdate(false)}
          />

          <div className="relative z-10 w-full max-w-3xl rounded-3xl bg-white/95 dark:bg-black/85 border border-orange-100 dark:border-white/15 backdrop-blur-2xl p-5 sm:p-6 lg:p-7 shadow-[0_18px_60px_rgba(0,0,0,0.25)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sticky top-0 bg-white/95 dark:bg-black/85 pb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 dark:text-orange-300 mb-1">
                  Edit Blog
                </p>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                  Update Blog
                </h2>
              </div>
              <button
                type="button"
                className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-orange-500"
                onClick={() => setBlogUpdate(false)}
              >
                Close
              </button>
            </div>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={blogUpdateFormData.title}
                  onChange={handleUpdateChange}
                  className="w-full h-10 rounded-2xl px-3 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
                  placeholder="Enter blog title"
                />
                {updateFormErrors.title && (
                  <p className="mt-1 text-xs text-red-500">
                    {updateFormErrors.title}
                  </p>
                )}
              </div>

              {/* Author & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={blogUpdateFormData.author}
                    onChange={handleUpdateChange}
                    className="w-full h-10 rounded-2xl px-3 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
                    placeholder="Author name"
                  />
                  {updateFormErrors.author && (
                    <p className="mt-1 text-xs text-red-500">
                      {updateFormErrors.author}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Category
                  </label>
                  <select
                    name="category"
                    value={blogUpdateFormData.category}
                    onChange={handleUpdateChange}
                    className="w-full h-10 rounded-2xl px-3 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
                  >
                    <option value="">Select category</option>
                    {categoryData.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </select>
                  {updateFormErrors.category && (
                    <p className="mt-1 text-xs text-red-500">
                      {updateFormErrors.category}
                    </p>
                  )}
                </div>
              </div>

              {/* Image & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Cover Image (leave empty to keep current)
                  </label>
                  <input
                    type="file"
                    onChange={handleUpdateImageChange}
                    className="w-full text-xs text-gray-700 dark:text-gray-200 file:mr-3 file:py-2 file:px-3 file:rounded-2xl file:border-0 file:text-xs file:font-semibold file:bg-orange-500/90 file:text-white hover:file:bg-orange-600/90 bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400/70"
                  />
                  {updateFormErrors.image && (
                    <p className="mt-1 text-xs text-red-500">
                      {updateFormErrors.image}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Slug
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={blogUpdateFormData.slug}
                    onChange={handleUpdateChange}
                    className="w-full h-10 rounded-2xl px-3 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
                    placeholder="unique-blog-slug"
                  />
                  {updateFormErrors.slug && (
                    <p className="mt-1 text-xs text-red-500">
                      {updateFormErrors.slug}
                    </p>
                  )}
                </div>
              </div>

              {/* Introduction */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Introduction
                </label>
                <textarea
                  name="introduction"
                  value={blogUpdateFormData.introduction}
                  onChange={handleUpdateChange}
                  className="w-full min-h-[90px] rounded-2xl px-3 py-2 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70 resize-y"
                  placeholder="Short summary of the blog..."
                />
                {updateFormErrors.introduction && (
                  <p className="mt-1 text-xs text-red-500">
                    {updateFormErrors.introduction}
                  </p>
                )}
              </div>

              {/* Reading time / Publish date / Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Reading Time (min)
                  </label>
                  <input
                    type="number"
                    name="readingTime"
                    value={blogUpdateFormData.readingTime}
                    onChange={handleUpdateChange}
                    className="w-full h-10 rounded-2xl px-3 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
                    min={0}
                  />
                  {updateFormErrors.readingTime && (
                    <p className="mt-1 text-xs text-red-500">
                      {updateFormErrors.readingTime}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Publish At
                  </label>
                  <input
                    type="date"
                    name="publishAt"
                    value={
                      blogUpdateFormData.publishAt
                        ? blogUpdateFormData.publishAt.slice(0, 10)
                        : ""
                    }
                    onChange={handleUpdateChange}
                    className="w-full h-10 rounded-2xl px-3 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
                  />
                  {updateFormErrors.publishAt && (
                    <p className="mt-1 text-xs text-red-500">
                      {updateFormErrors.publishAt}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Status
                  </label>
                  <select
                    name="status"
                    value={blogUpdateFormData.status}
                    onChange={handleUpdateChange}
                    className="w-full h-10 rounded-2xl px-3 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                  {updateFormErrors.status && (
                    <p className="mt-1 text-xs text-red-500">
                      {updateFormErrors.status}
                    </p>
                  )}
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-600 dark:text-gray-400">
                    Sections
                  </p>
                  <button
                    type="button"
                    onClick={addUpdateSection}
                    className="px-3 py-1.5 rounded-2xl text-xs font-semibold bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-800 dark:text-gray-100 hover:bg-orange-50/80 dark:hover:bg-white/10"
                  >
                    Add Section
                  </button>
                </div>

                {blogUpdateFormData.sections?.map((section, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-orange-100 dark:border-white/15 bg-white/70 dark:bg-black/40 px-3 py-3 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                        Section {index + 1}
                      </p>
                      {blogUpdateFormData.sections.length > 1 && (
                        <button
                          type="button"
                          className="text-[11px] font-semibold text-red-500 hover:text-red-400"
                          onClick={() => removeUpdateSection(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      name="title"
                      value={section.title}
                      onChange={(e) => handleUpdateSectionChange(e, index)}
                      placeholder="Section title"
                      className="w-full h-9 rounded-2xl px-3 text-xs bg-white/90 dark:bg-black/50 border border-orange-100 dark:border-white/20 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70 mb-1"
                    />

                    <textarea
                      name="content"
                      value={section.content}
                      onChange={(e) => handleUpdateSectionChange(e, index)}
                      placeholder="Section content..."
                      className="w-full min-h-[70px] rounded-2xl px-3 py-2 text-xs bg-white/90 dark:bg-black/50 border border-orange-100 dark:border-white/20 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70 mb-1 resize-y"
                    />

                    <input
                      type="text"
                      name="url"
                      value={section.url}
                      onChange={(e) => handleUpdateSectionChange(e, index)}
                      placeholder="Optional URL"
                      className="w-full h-9 rounded-2xl px-3 text-xs bg-white/90 dark:bg-black/50 border border-orange-100 dark:border-white/20 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70 mb-1"
                    />

                    <input
                      type="file"
                      onChange={(e) =>
                        handleUpdateSectionImageChange(e, index)
                      }
                      className="w-full text-[11px] text-gray-700 dark:text-gray-200 file:mr-3 file:py-1.5 file:px-3 file:rounded-2xl file:border-0 file:text-[11px] file:font-semibold file:bg-orange-500/90 file:text-white hover:file:bg-orange-600/90 bg-white/90 dark:bg-black/50 border border-orange-100 dark:border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400/70"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-5 sticky bottom-0 bg-white/95 dark:bg-black/85 pt-3">
              <button
                type="button"
                onClick={() => {
                  if (validateUpdateForm()) {
                    setUpdatePopup(true);
                  }
                }}
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold shadow-md shadow-orange-500/40 hover:from-orange-600 hover:to-yellow-500 transition-all"
              >
                Update Blog
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-2xl border border-orange-100 dark:border-white/15 bg-white/80 dark:bg-black/40 text-sm font-semibold text-gray-800 dark:text-gray-100"
                onClick={() => setBlogUpdate(false)}
              >
                Cancel
              </button>
            </div>

            {updatePopup && (
              <DashboardPopUp
                message="Do you want to update this blog?"
                onConfirm={handleUpdateSubmit}
                onCancel={() => setUpdatePopup(false)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
