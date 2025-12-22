import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import AxiosInstance from "../../utils/AxiosInstance";
import { ToastContainer, toast } from "react-toastify";
import DashboardPopUp from "../DashboardPopUp";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function DashboardCategory() {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // CREATE STATE
  const [createFormCategory, setCreateFormCategory] = useState({
    categoryName: "",
    description: "",
    categoryImage: "",
  });
  const [createFormErrors, setCreateFormErrors] = useState({});
  const [createButton, setCreateButton] = useState(false);
  const [createFormPopup, setCreateFormPopup] = useState(false);

  // UPDATE STATE
  const [updateFormCategory, setUpdateFormCategory] = useState(null);
  const [updateFormErrors, setUpdateFormErrors] = useState({});
  const [updateButton, setUpdateButton] = useState(false);
  const [updateFormPopup, setUpdateFormPopup] = useState(false);

  // ========== FETCH CATEGORIES ==========
  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const response = await AxiosInstance.post("/customer/category");
        if (response?.data?.data) {
          setCategoryData(response.data.data);
        }
      } catch (err) {
        console.error("Request Error:", err.message);
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    getCategoryData();
  }, []);

  // ========== CREATE HANDLERS ==========
  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setCreateFormCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateImageChange = (e) => {
    const file = e.target.files[0];
    setCreateFormCategory((prev) => ({
      ...prev,
      categoryImage: file,
    }));
  };

  const validateCreateForm = () => {
    const errors = {};
    if (!createFormCategory.categoryName.trim())
      errors.categoryName = "Category name is required";
    if (!createFormCategory.description.trim())
      errors.description = "Description is required";
    setCreateFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateSubmit = async () => {
    const token = localStorage.getItem("blogsite_jwt_token");
    const formData = new FormData();
    formData.append("categoryName", createFormCategory.categoryName);
    formData.append("description", createFormCategory.description);
    if (createFormCategory.categoryImage) {
      formData.append("categoryImage", createFormCategory.categoryImage);
    }

    try {
      const response = await AxiosInstance.post(
        "/admin/create/categroy",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: token,
          },
        }
      );

      if (response?.data) {
        toast.success("Category created successfully! 🎉");
        setCreateFormPopup(false);
        setCreateButton(false);
        setCreateFormCategory({
          categoryName: "",
          description: "",
          categoryImage: "",
        });
        setCreateFormErrors({});
        // Refetch categories
        const freshData = await AxiosInstance.post("/customer/category");
        if (freshData?.data?.data) {
          setCategoryData(freshData.data.data);
        }
      }
    } catch (err) {
      console.error("Create error:", err);
      toast.error(err?.response?.data?.message || "Failed to create category");
    }
  };

  // ========== UPDATE HANDLERS ==========
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateImageChange = (e) => {
    const file = e.target.files[0];
    setUpdateFormCategory((prev) => ({
      ...prev,
      categoryImage: file,
    }));
  };

  const validateUpdateForm = () => {
    const errors = {};
    if (!updateFormCategory.categoryName.trim())
      errors.categoryName = "Category name is required";
    if (!updateFormCategory.description.trim())
      errors.description = "Description is required";
    setUpdateFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateSubmit = async () => {
    const token = localStorage.getItem("blogsite_jwt_token");
    const formData = new FormData();
    formData.append("_id", updateFormCategory._id);
    formData.append("categoryName", updateFormCategory.categoryName);
    formData.append("description", updateFormCategory.description);
    if (
      updateFormCategory.categoryImage &&
      typeof updateFormCategory.categoryImage !== "string"
    ) {
      formData.append("categoryImage", updateFormCategory.categoryImage);
    }

    try {
      const response = await AxiosInstance.post(
        "/admin/update/category",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: token,
          },
        }
      );

      if (response?.data) {
        toast.success("Category updated successfully! 🎉");
        setUpdateFormPopup(false);
        setUpdateButton(false);
        setUpdateFormCategory(null);
        setUpdateFormErrors({});
        // Refetch categories
        const freshData = await AxiosInstance.post("/customer/category");
        if (freshData?.data?.data) {
          setCategoryData(freshData.data.data);
        }
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err?.response?.data?.message || "Failed to update category");
    }
  };

  // ========== DELETE HANDLER ==========
  const handleDeleteCategory = async (categoryId) => {
    const token = localStorage.getItem("blogsite_jwt_token");
    try {
      const response = await AxiosInstance.delete(
        `/admin/delete/category/${categoryId}`,
        {
          headers: { authorization: token },
        }
      );

      if (response?.data) {
        toast.success("Category deleted successfully!");
        setCategoryData((prev) => prev.filter((c) => c._id !== categoryId));
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(
        err?.response?.data?.message || "Failed to delete category"
      );
    }
  };

  const openUpdateModal = (category) => {
    setUpdateFormCategory(category);
    setUpdateButton(true);
  };

  const filteredCategories = categoryData?.filter((cat) =>
    cat.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg text-gray-700 dark:text-gray-200">
          Loading categories...
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
              Category Manager
            </p>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">
              Categories
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage all blog categories and their details.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search */}
            <div className="flex items-center gap-2 rounded-2xl bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 px-3 py-2 shadow-sm">
              <IoSearch className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 w-40 sm:w-52"
              />
            </div>

            {/* New category button */}
            <button
              type="button"
              onClick={() => {
                setCreateButton(true);
                setCreateFormErrors({});
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/30 hover:from-orange-600 hover:to-yellow-500 transition-all"
            >
              Create Category
            </button>
          </div>
        </div>

        {/* CATEGORIES LIST */}
        <div className="space-y-4">
          {categoryData && categoryData.length > 0 ? (
            filteredCategories && filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <div
                  key={category._id}
                  className="rounded-3xl border border-orange-100 dark:border-white/10 bg-white/90 dark:bg-white/5 backdrop-blur-2xl overflow-hidden shadow-md shadow-orange-200/40 dark:shadow-[0_14px_40px_rgba(0,0,0,0.85)]"
                >
                  <div className="grid md:grid-cols-[280px,1fr]">
                    {/* Image */}
                    <div className="h-48 md:h-full w-full">
                      <img
                        src={
                          category.categoryImage ||
                          "https://picsum.photos/400/300"
                        }
                        alt={category.categoryName}
                        className="w-full h-full object-cover md:rounded-l-3xl md:rounded-tr-none rounded-t-3xl"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-5 flex flex-col gap-3">
                      <div className="flex justify-between gap-3 items-start">
                        <div>
                          <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {category.categoryName}
                          </h2>
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                            {category.description}
                          </p>
                        </div>

                        {/* Delete / Edit buttons */}
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="px-3 py-2 rounded-xl bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-xs font-semibold text-orange-600 dark:text-orange-300 hover:bg-orange-50/80 dark:hover:bg-white/10"
                            onClick={() => openUpdateModal(category)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="px-3 py-2 rounded-xl bg-red-500/90 text-white hover:bg-red-600 flex items-center justify-center"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to delete this category?"
                                )
                              ) {
                                handleDeleteCategory(category._id);
                              }
                            }}
                          >
                            <MdDelete className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Meta grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-gray-600 dark:text-gray-300">
                        <div>
                          <p className="font-semibold text-gray-500 dark:text-gray-400">
                            Created
                          </p>
                          <p>
                            {format(
                              new Date(category.createdAt),
                              "MMM dd, yyyy"
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-500 dark:text-gray-400">
                            Updated
                          </p>
                          <p>
                            {format(
                              new Date(category.updatedAt),
                              "MMM dd, yyyy"
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-500 dark:text-gray-400">
                            Status
                          </p>
                          <p className="capitalize">
                            {category.status ? "Active" : "Inactive"}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-500 dark:text-gray-400">
                            Blogs
                          </p>
                          <p>{category.blogs?.length || 0}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  No categories match your search.
                </p>
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No categories available yet.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Create your first category to get started!
              </p>
            </div>
          )}
        </div>

        <ToastContainer position="bottom-right" />
      </div>

      {/* ========== CREATE MODAL ========== */}
      {createButton && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setCreateButton(false)}
          />

          <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-white/95 dark:bg-black/85 border border-orange-100 dark:border-white/15 backdrop-blur-2xl p-5 sm:p-6 lg:p-7 shadow-[0_18px_60px_rgba(0,0,0,0.25)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sticky top-0 bg-white/95 dark:bg-black/85 pb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 dark:text-orange-300 mb-1">
                  New Category
                </p>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                  Create Category
                </h2>
              </div>
              <button
                type="button"
                className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-orange-500"
                onClick={() => setCreateButton(false)}
              >
                Close
              </button>
            </div>

            <div className="space-y-4">
              {/* Category Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Category Name
                </label>
                <input
                  type="text"
                  name="categoryName"
                  value={createFormCategory.categoryName}
                  onChange={handleCreateChange}
                  className="w-full h-10 rounded-2xl px-3 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
                  placeholder="Enter category name"
                />
                {createFormErrors.categoryName && (
                  <p className="mt-1 text-xs text-red-500">
                    {createFormErrors.categoryName}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  value={createFormCategory.description}
                  onChange={handleCreateChange}
                  className="w-full min-h-[100px] rounded-2xl px-3 py-2 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70 resize-y"
                  placeholder="Enter category description"
                />
                {createFormErrors.description && (
                  <p className="mt-1 text-xs text-red-500">
                    {createFormErrors.description}
                  </p>
                )}
              </div>

              {/* Category Image */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Category Image (optional)
                </label>
                <input
                  type="file"
                  onChange={handleCreateImageChange}
                  accept="image/*"
                  className="w-full text-xs text-gray-700 dark:text-gray-200 file:mr-3 file:py-2 file:px-3 file:rounded-2xl file:border-0 file:text-xs file:font-semibold file:bg-orange-500/90 file:text-white hover:file:bg-orange-600/90 bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400/70"
                />
                {createFormErrors.categoryImage && (
                  <p className="mt-1 text-xs text-red-500">
                    {createFormErrors.categoryImage}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-5 sticky bottom-0 bg-white/95 dark:bg-black/85 pt-3">
              <button
                type="button"
                onClick={() => {
                  if (validateCreateForm()) {
                    setCreateFormPopup(true);
                  }
                }}
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold shadow-md shadow-orange-500/40 hover:from-orange-600 hover:to-yellow-500 transition-all"
              >
                Create Category
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-2xl border border-orange-100 dark:border-white/15 bg-white/80 dark:bg-black/40 text-sm font-semibold text-gray-800 dark:text-gray-100"
                onClick={() => setCreateButton(false)}
              >
                Cancel
              </button>
            </div>

            {createFormPopup && (
              <DashboardPopUp
                message="Do you want to create this category?"
                onConfirm={handleCreateSubmit}
                onCancel={() => setCreateFormPopup(false)}
              />
            )}
          </div>
        </div>
      )}

      {/* ========== UPDATE MODAL ========== */}
      {updateButton && updateFormCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setUpdateButton(false)}
          />

          <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-white/95 dark:bg-black/85 border border-orange-100 dark:border-white/15 backdrop-blur-2xl p-5 sm:p-6 lg:p-7 shadow-[0_18px_60px_rgba(0,0,0,0.25)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sticky top-0 bg-white/95 dark:bg-black/85 pb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 dark:text-orange-300 mb-1">
                  Edit Category
                </p>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                  Update Category
                </h2>
              </div>
              <button
                type="button"
                className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-orange-500"
                onClick={() => setUpdateButton(false)}
              >
                Close
              </button>
            </div>

            <div className="space-y-4">
              {/* Category Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Category Name
                </label>
                <input
                  type="text"
                  name="categoryName"
                  value={updateFormCategory.categoryName}
                  onChange={handleUpdateChange}
                  className="w-full h-10 rounded-2xl px-3 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
                  placeholder="Enter category name"
                />
                {updateFormErrors.categoryName && (
                  <p className="mt-1 text-xs text-red-500">
                    {updateFormErrors.categoryName}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  value={updateFormCategory.description}
                  onChange={handleUpdateChange}
                  className="w-full min-h-[100px] rounded-2xl px-3 py-2 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70 resize-y"
                  placeholder="Enter category description"
                />
                {updateFormErrors.description && (
                  <p className="mt-1 text-xs text-red-500">
                    {updateFormErrors.description}
                  </p>
                )}
              </div>

              {/* Category Image */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Category Image (leave empty to keep current)
                </label>
                <input
                  type="file"
                  onChange={handleUpdateImageChange}
                  accept="image/*"
                  className="w-full text-xs text-gray-700 dark:text-gray-200 file:mr-3 file:py-2 file:px-3 file:rounded-2xl file:border-0 file:text-xs file:font-semibold file:bg-orange-500/90 file:text-white hover:file:bg-orange-600/90 bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400/70"
                />
                {updateFormErrors.categoryImage && (
                  <p className="mt-1 text-xs text-red-500">
                    {updateFormErrors.categoryImage}
                  </p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Status
                </label>
                <select
                  name="status"
                  value={updateFormCategory.status ? "active" : "inactive"}
                  onChange={(e) =>
                    setUpdateFormCategory((prev) => ({
                      ...prev,
                      status: e.target.value === "active",
                    }))
                  }
                  className="w-full h-10 rounded-2xl px-3 text-sm bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-5 sticky bottom-0 bg-white/95 dark:bg-black/85 pt-3">
              <button
                type="button"
                onClick={() => {
                  if (validateUpdateForm()) {
                    setUpdateFormPopup(true);
                  }
                }}
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold shadow-md shadow-orange-500/40 hover:from-orange-600 hover:to-yellow-500 transition-all"
              >
                Update Category
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-2xl border border-orange-100 dark:border-white/15 bg-white/80 dark:bg-black/40 text-sm font-semibold text-gray-800 dark:text-gray-100"
                onClick={() => setUpdateButton(false)}
              >
                Cancel
              </button>
            </div>

            {updateFormPopup && (
              <DashboardPopUp
                message="Do you want to update this category?"
                onConfirm={handleUpdateSubmit}
                onCancel={() => setUpdateFormPopup(false)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
