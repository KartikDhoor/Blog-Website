import { IoSearch } from "react-icons/io5";
import { BiSolidLike } from "react-icons/bi";
import { RiMessage2Fill } from "react-icons/ri";
import { FaUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import AxiosInstance from "../../utils/AxiosInstance";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";

const getEmptySection = () => ({
  title: "",
  content: "",
  sectionImage: "",
  url: "",
});

const getEmptyCreateForm = () => ({
  title: "",
  author: "",
  category: "",
  image: "",
  introduction: "",
  slug: "",
  readingTime: 0,
  publishAt: "", // Will hold standard ISO string
  status: "draft",
  sections: [getEmptySection()],
});

function ModalShell({
  open,
  onClose,
  kicker,
  title,
  subtitle,
  footer,
  children,
}) {
  useEffect(() => {
    if (!open) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-start sm:justify-center overflow-y-auto sm:p-6 bg-black/60 backdrop-blur-sm">
      <div className="relative z-10 w-full sm:max-w-6xl sm:rounded-[30px] border-0 sm:border border-orange-100 dark:border-white/10 bg-white dark:bg-[#0b0b0f] shadow-[0_24px_80px_rgba(0,0,0,0.30)] dark:shadow-[0_24px_90px_rgba(0,0,0,0.85)] flex flex-col sm:overflow-hidden min-h-screen sm:min-h-[78vh] sm:max-h-[92vh]">
        <div className="flex flex-1 flex-col lg:flex-row min-h-0">
          <aside className="hidden lg:flex w-[280px] flex-col justify-between border-r border-orange-100 dark:border-white/10 bg-gradient-to-br from-orange-500 via-orange-500 to-yellow-500 text-white p-7 shrink-0">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75 mb-3">
                {kicker}
              </p>
              <h2 className="text-3xl font-black leading-tight">{title}</h2>
              <p className="mt-4 text-sm leading-6 text-white/85">{subtitle}</p>
            </div>
            <div className="space-y-3 mt-8">
              <div className="rounded-2xl bg-white/12 border border-white/15 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.16em] text-white/70 mb-1">
                  Layout
                </p>
                <p className="text-sm font-medium">
                  Fully responsive, natural scrolling on mobile.
                </p>
              </div>
            </div>
          </aside>

          <div className="flex flex-1 flex-col min-h-0">
            <div className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-orange-100 dark:border-white/10 bg-white/95 dark:bg-[#0b0b0f]/95 px-5 py-4 backdrop-blur-xl sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 dark:text-orange-300 mb-1">
                  {kicker}
                </p>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                  {title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl border border-orange-100 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-white/10 transition"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
              {children}
            </div>

            <div className="sticky bottom-0 z-20 border-t border-orange-100 dark:border-white/10 bg-white/95 dark:bg-[#0b0b0f]/95 px-5 py-4 backdrop-blur-xl sm:px-6 pb-8 sm:pb-4">
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ✅ FIXED: Added isSubmitting prop to ConfirmDialog
function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
  tone = "orange",
  isSubmitting = false, 
}) {
  useEffect(() => {
    if (!open) return;
    const handleEscape = (e) => {
      if (e.key === "Escape" && !isSubmitting) onCancel?.();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onCancel, isSubmitting]);

  if (!open) return null;

  const confirmButtonClass =
    tone === "red"
      ? "bg-red-500 hover:bg-red-600 shadow-red-500/30"
      : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-yellow-500 shadow-orange-500/30";

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm">
      <div className="relative z-10 w-full max-w-md rounded-[28px] border border-orange-100 dark:border-white/10 bg-white/95 dark:bg-[#0b0b0f]/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.30)] dark:shadow-[0_24px_90px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 dark:text-orange-300 mb-2">
          Confirmation
        </p>
        <h3 className="text-xl font-black text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
          {message}
        </p>

        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting} // ✅ Disabled while loading
            className="rounded-2xl border border-orange-100 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-2.5 text-sm font-semibold text-gray-800 dark:text-gray-100 hover:bg-orange-50 dark:hover:bg-white/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting} // ✅ Disabled while loading
            className={`rounded-2xl px-4 py-2.5 text-sm font-semibold text-white shadow-md transition disabled:opacity-70 disabled:cursor-not-allowed ${confirmButtonClass}`}
          >
            {/* ✅ Show Processing text */}
            {isSubmitting ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function FieldLabel({ children }) {
  return (
    <label className="mb-1.5 block text-xs font-semibold text-gray-600 dark:text-gray-400">
      {children}
    </label>
  );
}

function FieldError({ error }) {
  if (!error) return null;
  return <p className="mt-1 text-xs text-red-500">{error}</p>;
}

function SectionEditor({
  section,
  index,
  canRemove,
  onChange,
  onImageChange,
  onRemove,
}) {
  return (
    <div className="rounded-3xl border border-orange-100 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-500 dark:text-orange-300">
            Section {index + 1}
          </p>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            Content block
          </p>
        </div>

        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="rounded-2xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300"
          >
            Remove
          </button>
        )}
      </div>

      <div className="grid gap-3">
        <div>
          <FieldLabel>Section title</FieldLabel>
          <input
            type="text"
            name="title"
            value={section.title}
            onChange={(e) => onChange(e, index)}
            placeholder="Section title"
            className="h-11 w-full rounded-2xl border border-orange-100 dark:border-white/10 bg-white/90 dark:bg-black/30 px-3 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
          />
        </div>

        <div>
          <FieldLabel>Section content</FieldLabel>
          <textarea
            name="content"
            value={section.content}
            onChange={(e) => onChange(e, index)}
            placeholder="Section content..."
            className="min-h-[120px] w-full rounded-2xl border border-orange-100 dark:border-white/10 bg-white/90 dark:bg-black/30 px-3 py-3 text-sm text-gray-900 dark:text-gray-100 outline-none resize-y focus:ring-2 focus:ring-orange-400/70"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <FieldLabel>Optional URL</FieldLabel>
            <input
              type="text"
              name="url"
              value={section.url}
              onChange={(e) => onChange(e, index)}
              placeholder="https://..."
              className="h-11 w-full rounded-2xl border border-orange-100 dark:border-white/10 bg-white/90 dark:bg-black/30 px-3 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
            />
          </div>

          <div>
            <FieldLabel>Section image</FieldLabel>
            <input
              type="file"
              onChange={(e) => onImageChange(e, index)}
              className="w-full rounded-2xl border border-orange-100 dark:border-white/10 bg-white/90 dark:bg-black/30 text-xs text-gray-700 dark:text-gray-200 file:mr-3 file:rounded-2xl file:border-0 file:bg-orange-500/90 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-orange-600/90"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogEditorForm({
  data,
  errors,
  categoryData,
  isUpdate,
  onChange,
  onImageChange,
  onSectionChange,
  onSectionImageChange,
  addSection,
  removeSection,
}) {
  return (
    <div className="flex flex-col xl:flex-row gap-6">
      <div className="flex-1 space-y-5 min-w-0">
        <div className="rounded-3xl border border-orange-100 dark:border-white/10 bg-white/85 dark:bg-white/5 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-500 dark:text-orange-300 mb-3">
            Main content
          </p>

          <div className="space-y-4">
            <div>
              <FieldLabel>Title</FieldLabel>
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={onChange}
                placeholder="Enter blog title"
                className="h-11 w-full rounded-2xl border border-orange-100 dark:border-white/10 bg-white/90 dark:bg-black/30 px-3 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
              />
              <FieldError error={errors.title} />
            </div>

            <div>
              <FieldLabel>Introduction</FieldLabel>
              <textarea
                name="introduction"
                value={data.introduction}
                onChange={onChange}
                placeholder="Short summary of the blog..."
                className="min-h-[130px] w-full rounded-2xl border border-orange-100 dark:border-white/10 bg-white/90 dark:bg-black/30 px-3 py-3 text-sm text-gray-900 dark:text-gray-100 outline-none resize-y focus:ring-2 focus:ring-orange-400/70"
              />
              <FieldError error={errors.introduction} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-orange-100 dark:border-white/10 bg-white/85 dark:bg-white/5 p-5 shadow-sm">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-500 dark:text-orange-300">
                Sections
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Add as many content blocks as you need.
              </p>
            </div>
            <button
              type="button"
              onClick={addSection}
              className="rounded-2xl border border-orange-100 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-2 text-xs font-semibold text-gray-800 dark:text-gray-100 hover:bg-orange-50 dark:hover:bg-white/10 transition"
            >
              Add Section
            </button>
          </div>

          <div className="space-y-4">
            {data.sections.map((section, index) => (
              <SectionEditor
                key={index}
                section={section}
                index={index}
                canRemove={data.sections.length > 1}
                onChange={onSectionChange}
                onImageChange={onSectionImageChange}
                onRemove={removeSection}
              />
            ))}
          </div>
          <FieldError error={errors.sections} />
        </div>
      </div>

      <div className="xl:w-[320px] 2xl:w-[400px] shrink-0 space-y-5">
        <div className="rounded-3xl border border-orange-100 dark:border-white/10 bg-gradient-to-br from-orange-50 to-white dark:from-white/10 dark:to-white/5 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-500 dark:text-orange-300 mb-3">
            Publish settings
          </p>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <div>
              <FieldLabel>Author</FieldLabel>
              <input
                type="text"
                name="author"
                value={data.author}
                onChange={onChange}
                placeholder="Author name"
                className="h-11 w-full rounded-2xl border border-orange-100 dark:border-white/10 bg-white/90 dark:bg-black/30 px-3 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
              />
              <FieldError error={errors.author} />
            </div>

            <div>
              <FieldLabel>Category</FieldLabel>
              <select
                name="category"
                value={data.category}
                onChange={onChange}
                className="h-11 w-full rounded-2xl border border-orange-100 dark:border-white/10 bg-white/90 dark:bg-black/30 px-3 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
              >
                <option value="">Select category</option>
                {categoryData.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
              <FieldError error={errors.category} />
            </div>

            <div className="sm:col-span-2 xl:col-span-1">
              <FieldLabel>
                Cover Image {isUpdate ? "(leave empty to keep current)" : ""}
              </FieldLabel>
              <input
                type="file"
                onChange={onImageChange}
                className="w-full rounded-2xl border border-orange-100 dark:border-white/10 bg-white/90 dark:bg-black/30 text-xs text-gray-700 dark:text-gray-200 file:mr-3 file:rounded-2xl file:border-0 file:bg-orange-500/90 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-orange-600/90"
              />
              <FieldError error={errors.image} />
            </div>

            <div className="sm:col-span-2 xl:col-span-1">
              <FieldLabel>Slug</FieldLabel>
              <input
                type="text"
                name="slug"
                value={data.slug}
                onChange={onChange}
                placeholder="unique-blog-slug"
                className="h-11 w-full rounded-2xl border border-orange-100 dark:border-white/10 bg-white/90 dark:bg-black/30 px-3 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
              />
              <FieldError error={errors.slug} />
            </div>

            <div>
              <FieldLabel>Reading Time (min)</FieldLabel>
              <input
                type="number"
                name="readingTime"
                value={data.readingTime}
                onChange={onChange}
                min={0}
                className="h-11 w-full rounded-2xl border border-orange-100 dark:border-white/10 bg-white/90 dark:bg-black/30 px-3 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
              />
              <FieldError error={errors.readingTime} />
            </div>

            <div>
              <FieldLabel>Publish At</FieldLabel>
              <input
                type="datetime-local"
                name="publishAt"
                value={data.publishAt}
                onChange={onChange}
                className="h-11 w-full rounded-2xl border border-orange-100 dark:border-white/10 bg-white/90 dark:bg-black/30 px-3 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
              />
              <FieldError error={errors.publishAt} />
            </div>

            <div className="sm:col-span-2 xl:col-span-1">
              <FieldLabel>Status</FieldLabel>
              <select
                name="status"
                value={data.status}
                onChange={onChange}
                className="h-11 w-full rounded-2xl border border-orange-100 dark:border-white/10 bg-white/90 dark:bg-black/30 px-3 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
              <FieldError error={errors.status} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-orange-100 dark:border-white/10 bg-white/85 dark:bg-white/5 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-500 dark:text-orange-300 mb-3">
            Quick preview
          </p>

          <div className="space-y-3">
            <div className="rounded-2xl border border-orange-100 dark:border-white/10 bg-white/80 dark:bg-black/30 p-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Title
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white break-words">
                {data.title || "Untitled blog"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-orange-100 dark:border-white/10 bg-white/80 dark:bg-black/30 p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Status
                </p>
                <p className="text-sm font-semibold capitalize text-gray-900 dark:text-white">
                  {data.status || "draft"}
                </p>
              </div>

              <div className="rounded-2xl border border-orange-100 dark:border-white/10 bg-white/80 dark:bg-black/30 p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Sections
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {data.sections.length}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-orange-100 dark:border-white/10 bg-white/80 dark:bg-black/30 p-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Intro preview
              </p>
              <p className="line-clamp-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
                {data.introduction || "Your short summary will appear here."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardBlog() {
  const [categoryData, setCategoryData] = useState([]);
  const [blogsData, setBlogsData] = useState([]);
  const [createFormErrors, setCreateFormErrors] = useState({});
  const [updateFormErrors, setUpdateFormErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [blogCreate, setBlogCreate] = useState(false);
  const [blogUpdate, setBlogUpdate] = useState(false);
  const [createPopup, setCreatePopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  
  // ✅ FIXED: Added isSubmitting state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [blogUpdateFormData, setBlogUpdateFormData] = useState(null);
  const [blogCreateFormData, setBlogCreateFormData] = useState(
    getEmptyCreateForm()
  );
  const [searchText, setSearchText] = useState("");
  const [queryParams, setQueryParams] = useState({
    sortBy: "createdAt",
    order: "desc",
    limit: 10,
    page: 1,
  });

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

  useEffect(() => {
    const shouldLockScroll =
      blogCreate || blogUpdate || createPopup || updatePopup;
    const previousOverflow = document.body.style.overflow;

    if (shouldLockScroll) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [blogCreate, blogUpdate, createPopup, updatePopup]);

  const filteredBlogs = useMemo(() => {
    if (!searchText.trim()) return blogsData;

    const q = searchText.toLowerCase();

    return blogsData.filter((blog) => {
      return [
        blog.title,
        blog.author,
        blog.slug,
        blog.introduction,
        blog.category?.categoryName,
      ].some((value) => String(value || "").toLowerCase().includes(q));
    });
  }, [blogsData, searchText]);

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
      sections: [...prev.sections, getEmptySection()],
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

    if (!blogCreateFormData.title.trim()) errors.title = "Title is required";
    if (!blogCreateFormData.author.trim()) errors.author = "Author is required";
    if (!blogCreateFormData.category) errors.category = "Category is required";
    if (!blogCreateFormData.image) errors.image = "Cover image is required";
    if (!blogCreateFormData.introduction.trim())
      errors.introduction = "Introduction is required";
    if (blogCreateFormData.readingTime <= 0)
      errors.readingTime = "Reading time must be greater than 0";
    if (!blogCreateFormData.slug.trim()) errors.slug = "Slug is required";
    if (!blogCreateFormData.publishAt)
      errors.publishAt = "Publish date and time required";
    if (blogCreateFormData.sections.length === 0)
      errors.sections = "At least one section is required";

    setCreateFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateSubmit = async () => {
    // ✅ FIXED: Enable submitting state
    setIsSubmitting(true);
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
        formData.append(
          `sections[${index}][sectionImage]`,
          section.sectionImage
        );
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

      if (res?.data?.success) {
        toast.success("Blog created successfully!");
        setBlogCreate(false);
        setCreatePopup(false);
        setCreateFormErrors({});
        setBlogCreateFormData(getEmptyCreateForm());
        setQueryParams((prev) => ({ ...prev, page: 1 }));
      }
    } catch (err) {
      console.error("Create error:", err);
      toast.error(err?.response?.data?.message || "Failed to create blog");
    } finally {
      // ✅ FIXED: Reset submitting state
      setIsSubmitting(false);
    }
  };

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
      sections: [...(prev.sections || []), getEmptySection()],
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

    if (!blogUpdateFormData.title.trim()) errors.title = "Title is required";
    if (!blogUpdateFormData.author.trim()) errors.author = "Author is required";
    if (!blogUpdateFormData.category) errors.category = "Category is required";
    if (!blogUpdateFormData.introduction.trim())
      errors.introduction = "Introduction is required";
    if (blogUpdateFormData.readingTime <= 0)
      errors.readingTime = "Reading time must be greater than 0";
    if (!blogUpdateFormData.slug.trim()) errors.slug = "Slug is required";
    if (!blogUpdateFormData.publishAt)
      errors.publishAt = "Publish date and time required";
    if (!blogUpdateFormData.sections || blogUpdateFormData.sections.length === 0)
      errors.sections = "At least one section is required";

    setUpdateFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateSubmit = async () => {
    // ✅ FIXED: Enable submitting state
    setIsSubmitting(true);
    const token = localStorage.getItem("blogsite_jwt_token");
    const formData = new FormData();
    // console.log("Updating blog with data:", blogUpdateFormData);

    formData.append("_id", blogUpdateFormData._id);
    formData.append("title", blogUpdateFormData.title);
    formData.append("author", blogUpdateFormData.author);
    formData.append("category", blogUpdateFormData.category);
    formData.append("introduction", blogUpdateFormData.introduction);
    formData.append("readingTime", blogUpdateFormData.readingTime);
    formData.append("publishAt", blogUpdateFormData.publishAt);
    formData.append("status", blogUpdateFormData.status);
    formData.append("slug", blogUpdateFormData.slug);

    if (blogUpdateFormData.image) {
      if (typeof blogUpdateFormData.image !== "string") {
        // New file selected — upload it
        formData.append("image", blogUpdateFormData.image);
      } else {
        // No new file — send existing URL so backend keeps it
        formData.append("existingImage", blogUpdateFormData.image);
      }
    }

    (blogUpdateFormData.sections || []).forEach((section, index) => {
      formData.append(`sections[${index}][title]`, section.title);
      formData.append(`sections[${index}][content]`, section.content);

      if (section.sectionImage) {
        if (typeof section.sectionImage !== "string") {
          formData.append(
            `sections[${index}][sectionImage]`,
            section.sectionImage
          );
        } else {
          formData.append(`sections[${index}][existingSectionImage]`, section.sectionImage);
        }
      }

      formData.append(`sections[${index}][url]`, section.url);
    });

    try {
      const res = await AxiosInstance.post(
        "/admin/update/blog",
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
        setUpdateFormErrors({});
        setBlogUpdateFormData(null);
        setQueryParams((prev) => ({ ...prev }));
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err?.response?.data?.message || "Failed to update blog");
    } finally {
      // ✅ FIXED: Reset submitting state
      setIsSubmitting(false);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    const token = localStorage.getItem("blogsite_jwt_token");

    try {
      const res = await AxiosInstance.delete(
        `/admin/dashboard/blogs/${blogId}`,
        {
          headers: { authorization: token },
        }
      );

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
    setUpdateFormErrors({});

    let formattedPublishDate = "";
    if (blog?.publishAt) {
      try {
        const dateObj = new Date(blog.publishAt);
        formattedPublishDate = dateObj.toISOString().slice(0, 16);
      } catch (e) {
        console.error("Error formatting date", e);
      }
    }

    setBlogUpdateFormData({
      ...blog,
      category: blog?.category?._id || blog?.category || "",
      publishAt: formattedPublishDate,
      sections:
        blog?.sections && blog.sections.length > 0
          ? blog.sections.map((section) => ({
              ...section,
              sectionImage: section.sectionImage || "",
            }))
          : [getEmptySection()],
    });

    setBlogUpdate(true);
  };

  const closeCreateModal = () => {
    setBlogCreate(false);
    setCreatePopup(false);
    setCreateFormErrors({});
  };

  const closeUpdateModal = () => {
    setBlogUpdate(false);
    setUpdatePopup(false);
    setUpdateFormErrors({});
    setBlogUpdateFormData(null);
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
        <div className="rounded-3xl border border-orange-100 dark:border-white/10 bg-white/90 dark:bg-white/5 px-4 py-4 shadow-sm backdrop-blur-2xl sm:px-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 dark:text-orange-300 mb-1">
                Blog Manager
              </p>
              <h1 className="text-2xl font-black text-gray-900 dark:text-white">
                Blogs
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Search, create, update and manage all blog posts.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2 rounded-2xl border border-orange-100 dark:border-white/10 bg-white/80 dark:bg-black/30 px-3 py-2 shadow-sm">
                <IoSearch className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search blogs..."
                  className="w-48 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500 sm:w-60"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setCreateFormErrors({});
                  setBlogCreateFormData(getEmptyCreateForm());
                  setBlogCreate(true);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/30 transition-all hover:from-orange-600 hover:to-yellow-500"
              >
                <FaUpload className="h-4 w-4" />
                New Blog
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredBlogs && filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="overflow-hidden rounded-3xl border border-orange-100 dark:border-white/10 bg-white/90 dark:bg-white/5 shadow-md shadow-orange-200/30 backdrop-blur-2xl dark:shadow-[0_14px_40px_rgba(0,0,0,0.70)]"
              >
                <div className="grid md:grid-cols-[280px,1fr]">
                  <div className="h-52 w-full md:h-full">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-4 p-4 md:p-5">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-orange-500 dark:text-orange-300">
                          {blog.category?.categoryName ?? "Uncategorized"}
                        </p>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                          {blog.title}
                        </h2>
                        <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                          by {blog.author}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openUpdateModal(blog)}
                          className="rounded-xl border border-orange-100 dark:border-white/10 bg-white/80 dark:bg-black/30 px-3 py-2 text-xs font-semibold text-orange-600 transition hover:bg-orange-50 dark:text-orange-300 dark:hover:bg-white/10"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this blog?"
                              )
                            ) {
                              handleDeleteBlog(blog._id);
                            }
                          }}
                          className="flex items-center justify-center rounded-xl bg-red-500/90 px-3 py-2 text-white transition hover:bg-red-600"
                        >
                          <MdDelete className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm leading-6 text-gray-600 dark:text-gray-300 line-clamp-3">
                      {blog.introduction}
                    </p>

                    <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 dark:text-gray-300 md:grid-cols-4">
                      <div className="rounded-2xl border border-orange-100 dark:border-white/10 bg-white/70 dark:bg-black/25 px-3 py-3">
                        <p className="font-semibold text-gray-500 dark:text-gray-400">
                          Created
                        </p>
                        <p className="mt-1">
                          {format(new Date(blog.createdAt), "MMM dd, yyyy")}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-orange-100 dark:border-white/10 bg-white/70 dark:bg-black/25 px-3 py-3">
                        <p className="font-semibold text-gray-500 dark:text-gray-400">
                          Published
                        </p>
                        <p className="mt-1">
                          {format(new Date(blog.publishAt), "MMM dd, yyyy hh:mm a")}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-orange-100 dark:border-white/10 bg-white/70 dark:bg-black/25 px-3 py-3">
                        <p className="font-semibold text-gray-500 dark:text-gray-400">
                          Updated
                        </p>
                        <p className="mt-1">
                          {format(new Date(blog.updatedAt), "MMM dd, yyyy")}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-orange-100 dark:border-white/10 bg-white/70 dark:bg-black/25 px-3 py-3">
                        <p className="font-semibold text-gray-500 dark:text-gray-400">
                          Status
                        </p>
                        <p className="mt-1 capitalize">{blog.status}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 pt-1 md:grid-cols-4">
                      <div className="flex items-center justify-center gap-2 rounded-2xl border border-orange-100 dark:border-white/10 bg-white/80 dark:bg-black/30 px-3 py-2">
                        <BiSolidLike className="text-lg text-orange-500" />
                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-100">
                          {blog.likes?.length || 0} Likes
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-2 rounded-2xl border border-orange-100 dark:border-white/10 bg-white/80 dark:bg-black/30 px-3 py-2">
                        <RiMessage2Fill className="text-lg text-orange-500" />
                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-100">
                          {blog.comments?.length || 0} Comments
                        </p>
                      </div>

                      <Link
                        to={`/blog/${blog.slug}`}
                        className="flex items-center justify-center"
                      >
                        <div className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-center text-xs font-semibold text-white shadow-md shadow-orange-500/30 transition-all hover:from-orange-600 hover:to-yellow-500">
                          View Blog
                        </div>
                      </Link>

                      <button
                        type="button"
                        className="w-full rounded-2xl border border-orange-100 dark:border-white/10 bg-white/80 dark:bg-black/30 px-4 py-2 text-center text-xs font-semibold text-gray-800 hover:bg-orange-50/70 dark:text-gray-100 dark:hover:bg-white/10"
                      >
                        Publish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-orange-200 dark:border-white/10 bg-white/70 dark:bg-white/5 py-14 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                No blogs found. Create your first blog!
              </p>
            </div>
          )}
        </div>

        <ToastContainer position="bottom-right" />
      </div>

      <ModalShell
        open={blogCreate}
        onClose={closeCreateModal}
        kicker="New Blog"
        title="Create Blog"
        subtitle="This modal behaves as a full scrolling page on mobile, and a constrained scrolling window on desktop."
        footer={
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={closeCreateModal}
              className="rounded-2xl border border-orange-100 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-2.5 text-sm font-semibold text-gray-800 dark:text-gray-100 hover:bg-orange-50 dark:hover:bg-white/10 transition"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => {
                if (validateCreateForm()) {
                  setCreatePopup(true);
                }
              }}
              className="rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/30 transition-all hover:from-orange-600 hover:to-yellow-500"
            >
              Save Blog
            </button>
          </div>
        }
      >
        <BlogEditorForm
          data={blogCreateFormData}
          errors={createFormErrors}
          categoryData={categoryData}
          isUpdate={false}
          onChange={handleCreateChange}
          onImageChange={handleCreateImageChange}
          onSectionChange={handleCreateSectionChange}
          onSectionImageChange={handleCreateSectionImageChange}
          addSection={addCreateSection}
          removeSection={removeCreateSection}
        />
      </ModalShell>

      <ModalShell
        open={blogUpdate && !!blogUpdateFormData}
        onClose={closeUpdateModal}
        kicker="Edit Blog"
        title="Update Blog"
        subtitle="This modal behaves as a full scrolling page on mobile, and a constrained scrolling window on desktop."
        footer={
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={closeUpdateModal}
              className="rounded-2xl border border-orange-100 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-2.5 text-sm font-semibold text-gray-800 dark:text-gray-100 hover:bg-orange-50 dark:hover:bg-white/10 transition"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => {
                if (validateUpdateForm()) {
                  setUpdatePopup(true);
                }
              }}
              className="rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/30 transition-all hover:from-orange-600 hover:to-yellow-500"
            >
              Update Blog
            </button>
          </div>
        }
      >
        {blogUpdateFormData && (
          <BlogEditorForm
            data={blogUpdateFormData}
            errors={updateFormErrors}
            categoryData={categoryData}
            isUpdate={true}
            onChange={handleUpdateChange}
            onImageChange={handleUpdateImageChange}
            onSectionChange={handleUpdateSectionChange}
            onSectionImageChange={handleUpdateSectionImageChange}
            addSection={addUpdateSection}
            removeSection={removeUpdateSection}
          />
        )}
      </ModalShell>

      {/* ✅ FIXED: Passed isSubmitting prop to dialogs */}
      <ConfirmDialog
        open={createPopup}
        title="Create this blog?"
        message="Are you sure you want to proceed?"
        confirmLabel="Yes, Create"
        onConfirm={handleCreateSubmit}
        onCancel={() => setCreatePopup(false)}
        isSubmitting={isSubmitting} 
      />

      <ConfirmDialog
        open={updatePopup}
        title="Update this blog?"
        message="Are you sure you want to save these changes?"
        confirmLabel="Yes, Update"
        onConfirm={handleUpdateSubmit}
        onCancel={() => setUpdatePopup(false)}
        isSubmitting={isSubmitting} 
      />
    </>
  );
}