import { IoSearch } from "react-icons/io5";
import { BiSolidLike } from "react-icons/bi";
import { RiMessage2Fill } from "react-icons/ri";
import { FaUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AxiosInstance from "../../utils/AxiosInstance";
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import DashboardPopUp from "../DashboardPopUp";

export default function DashboardBlog() {
    const navigate = useNavigate();
    const [categoryData, setCategoryData] = useState(null);
    const [blogsData, setBlogsData] = useState(null);
    const [createFormErrors, setCreateFormErrors] = useState({});
    const [updateFormErrors, setUpdateFormErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [blogCreate, setBlogCreate] = useState(false);
    const [blogUpdate, setBlogUpdate] = useState(false);
    const [createPopup, setCreatePopup] = useState(false);
    const [updatePopup, setUpdatePopup] = useState(false);
    const [blogUpdateFormData, setBlogUpdateFormData] = useState(null);
    const [blogCreateFormData, setBlogCreateFormData] = useState({
        title: '',
        author: "",
        category: "",
        image: "",
        introduction: "",
        slug: "",
        readingTime: 0,
        publishAt: '',
        status: 'draft',
        sections: [
            { title: "", content: "", sectionImage: "", url: "" },
        ]

    })
    const [queryParams, setQueryParams] = useState({
        sortBy: 'createdAt',
        order: 'desc',
        limit: 5,
        page: 1,
    })
    useEffect(() => {
        const fetchdata = async () => {
            let token = localStorage.getItem('blogsite_jwt_token')
            try {
                const blog = await AxiosInstance.post("/admin/dashboard/blogs/find", { params: queryParams}, {
                    headers: {
                        "authorization": token,
                    },
                });
                const category = await AxiosInstance.post("/customer/category");
                
                if (category) {
                    console.log(category.data.data)
                    setCategoryData(category.data.data);


                }
                if (blog) {
                    setBlogsData(blog.data.data);
                    console.log(blog.data.data);
                    setLoading(false);
                    setLoading(false);
                }
            }
            catch (err) {
                console.error('Request Error:', err.message);
                return [];
            }
        }
        fetchdata();
    }, []);
    const handleMainImageChange = (e) => {
        setBlogCreateFormData((prevState) => ({
            ...prevState,
            image: e.target.files[0], // Store the File object
        }));
    };
    const createButtonHandler = () => {
        setCreateFormErrors({});
        setBlogCreate((preState) => !preState);
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlogCreateFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const removeSection = (index) => {
        const updatedSections = blogCreateFormData.sections.filter((_, i) => i !== index);
        setBlogCreateFormData((prevState) => ({
            ...prevState,
            sections: updatedSections,
        }));
    };
    const addSection = () => {
        setBlogCreateFormData((prevState) => ({
            ...prevState,
            sections: [...prevState.sections, { title: "", content: "", image: "", url: "" }],
        }));
    };
    const handleSectionImageChange = (index, e) => {
        const updatedSections = [...blogCreateFormData.sections];

        // Ensure that the file input exists
        if (e.target.files && e.target.files[0]) {
            updatedSections[index].sectionImage = e.target.files[0]; // Store the File object
        }

        setBlogCreateFormData((prevState) => ({
            ...prevState,
            sections: updatedSections,
        }));
    };
    const handleSectionChange = (index, field, value) => {
        const updatedSections = [...blogCreateFormData.sections];
        updatedSections[index][field] = value;
        setBlogCreateFormData((prevState) => ({
            ...prevState,
            sections: updatedSections,
        }));
    };
    const handleCreatePopup = () => {
        const newErrors = {};
        if (blogCreateFormData.title == "") {
            newErrors.title = "Title is required";
        }
        if (blogCreateFormData.author == "") {
            newErrors.author = "Author is required";
        }
        if (blogCreateFormData.category == "") {
            newErrors.category = "Category is required";
        }
        if (!blogCreateFormData.image) {
            newErrors.image = "Image is required";
        }
        if (blogCreateFormData.introduction == "") {
            newErrors.introduction = "Introduction is required";
        }
        if (blogCreateFormData.readingTime == 0) {
            newErrors.readingTime = "Reading time must be greater than 0";
        }
        if (blogCreateFormData.slug == 0) {
            newErrors.slug = "Slug is required";
        }
        if (blogCreateFormData.publishAt == '') {
            newErrors.publishAt = "Publish date is required";
        }
        if (blogCreateFormData.sections.length === 0) {
            newErrors.sections = "At least one section is required";
        }
        setCreateFormErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            setCreatePopup((prevState) => !prevState);
        }

    };
    const handlePopupCancel = () => {
        setCreatePopup((preState) => !preState);
    }
    const handleSubmit = async () => {
        let token = localStorage.getItem('blogsite_jwt_token');
        const formData = new FormData();
        formData.append("title", blogCreateFormData.title);
        formData.append("author", blogCreateFormData.author);
        formData.append("category", blogCreateFormData.category);
        formData.append("introduction", blogCreateFormData.introduction);
        formData.append("readingTime", blogCreateFormData.readingTime);
        formData.append("publishAt", blogCreateFormData.publishAt);
        formData.append("status", blogCreateFormData.status);
        formData.append("slug", blogCreateFormData.slug);

        // Append the image
        if (blogCreateFormData.image) {
            formData.append("image", blogCreateFormData.image);
        }

        // Ensure sections exist before iterating
        if (Array.isArray(blogCreateFormData.sections)) {
            blogCreateFormData.sections.forEach((section, index) => {
                formData.append(`sections[${index}][title]`, section.title);
                formData.append(`sections[${index}][content]`, section.content);
                if (section.sectionImage) {
                    formData.append(`sections[${index}][sectionImage]`, section.sectionImage);
                }
                formData.append(`sections[${index}][url]`, section.url);
            });
        } else {
            console.error('Sections are not available or are in an invalid format');
        }

        try {
            const response = await AxiosInstance.post('/admin/create/blog', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": token,
                },
            });
            console.log('Blog created successfully:', response.data);
            setCreateFormErrors({});
            toast.success('Blog created successfully! 🎉');
            setCreatePopup(false);
            setBlogCreate(false);
            navigate(0);
        } catch (error) {
            console.error('Error creating blog:', error.message);
            toast.error(`Error creating blog: ${error.message}`);
        }
    };
    const updateButtonHandler = (blog) => {
        setUpdateFormErrors({});
        setBlogUpdate((preState) => !preState);
        setBlogUpdateFormData(blog);
    }
    const handleUpdateInputChange = (e) => {
        const { name, value } = e.target;
        setBlogUpdateFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const removeUpdateSection = (index) => {
        const updatedSections = blogUpdateFormData.sections.filter((_, i) => i !== index);
        setBlogUpdateFormData((prevState) => ({
            ...prevState,
            sections: updatedSections,
        }));
    };
    const addUpdateSection = () => {
        setBlogUpdateFormData((prevState) => ({
            ...prevState,
            sections: [...prevState.sections, { title: "", content: "", image: "", url: "" }],
        }));
    };
    const handleUpdatedSectionImageChange = (index, e) => {
        const updatedSections = [...blogUpdateFormData.sections];

        // Ensure that the file input exists
        if (e.target.files && e.target.files[0]) {
            updatedSections[index].sectionImage = e.target.files[0]; // Store the File object
        }

        setBlogCreateFormData((prevState) => ({
            ...prevState,
            sections: updatedSections,
        }));
    };
    const handleUpdatedMainImageChange = (e) => {
        setBlogUpdateFormData((prevState) => ({
            ...prevState,
            image: e.target.files[0], // Store the File object
        }));
    };
    const handleUpdateSectionChange = (index, field, value) => {
        const updatedSections = [...blogUpdateFormData.sections];
        updatedSections[index][field] = value;
        setBlogUpdateFormData((prevState) => ({
            ...prevState,
            sections: updatedSections,
        }));
    };
    const handleUpdatePopup = () => {
        const newErrors = {};
        if (blogUpdateFormData.title == "") {
            newErrors.title = "Title is required";
        }
        if (blogUpdateFormData.author == "") {
            newErrors.author = "Author is required";
        }
        if (blogUpdateFormData.category == "") {
            newErrors.category = "Category is required";
        }
        if (!blogUpdateFormData.image) {
            newErrors.image = "Image is required";
        }
        if (blogUpdateFormData.introduction == "") {
            newErrors.introduction = "Introduction is required";
        }
        if (blogUpdateFormData.readingTime == 0) {
            newErrors.readingTime = "Reading time must be greater than 0";
        }
        if (blogUpdateFormData.slug == 0) {
            newErrors.slug = "Slug is required";
        }
        if (blogUpdateFormData.publishAt == '') {
            newErrors.publishAt = "Publish date is required";
        }
        if (blogUpdateFormData.sections.length === 0) {
            newErrors.sections = "At least one section is required";
        }
        setUpdateFormErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            setUpdatePopup((prevState) => !prevState);
        }

    };
    const handleUpdatePopupCancel = () => {
        setUpdatePopup((preState) => !preState);
    }
    const handleUpdateSubmit = async () => {
        const formData = new FormData();

        formData.append("_id", blogUpdateFormData._id);
        formData.append("title", blogUpdateFormData.title);
        formData.append("author", blogUpdateFormData.author);
        formData.append("category", blogUpdateFormData.category._id);
        formData.append("introduction", blogUpdateFormData.introduction);
        formData.append("readingTime", blogUpdateFormData.readingTime);
        formData.append("publishAt", blogUpdateFormData.publishAt);
        formData.append("status", blogUpdateFormData.status);
        formData.append("slug", blogUpdateFormData.slug);

        // Append the image if it's a valid file
        if (blogUpdateFormData.image instanceof File) {
            formData.append("image", blogUpdateFormData.image);
        }

        // Append sections as JSON string
        if (Array.isArray(blogUpdateFormData.sections)) {
            formData.append("sections", JSON.stringify(blogUpdateFormData.sections));
            blogUpdateFormData.sections.forEach((section, index) => {
                if (section.sectionImage instanceof File) {
                    formData.append(`sections[${index}][sectionImage]`, section.sectionImage);
                }
            });
        } else {
            console.error('Sections are not available or are in an invalid format');
        }

        try {
            // Log the formData contents for debugging


            const response = await AxiosInstance.post('admin/update/blog', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log('Blog updated successfully:', response.data);
            toast.success('Blog updated successfully! 🎉');
            setCreateFormErrors({});
            setUpdatePopup(false);
            setBlogUpdate(false);
            navigate(0);
        } catch (error) {
            console.error('Error updating blog:', error.message);
            toast.error(`Error updating blog: ${error.message}`);
        }
    };

    if (loading) {
        return (
            <>
                <div className="h-full w-full bg-pureblack p-2">
                    <div className="h-[10vh] w-[95%] mx-auto flex justify-center items-center">
                        <div className="h-[8vh] w-[50%] flex items-center">
                            <p className="text-2xl text-white font-medium">Blog</p>
                        </div>
                        <div className="h-[7vh] w-[30%] px-4">
                            <input className="h-[7vh] w-full bg-dark1 rounded-lg border border-dark1"></input>
                        </div>
                        <div className="h-[8vh] w-[20%] flex justify-center ">
                            <button className="h-full py-2 px-4 text-lg bg-green-600 rounded-xl font-medium">Create</button>
                        </div>
                    </div>
                    <div className="h-auto w-[95%] mx-auto bg-dark1 rounded-lg my-4 grid grid-cols-5 gap-4 p-4">
                        <div className="h-auto w-full my-2">
                            <p className="text-base text-gray1 text-center font-medium my-2">Category</p>
                            <div className="h-[6vh] w-full bg-pureblack rounded-xl ">

                            </div>
                        </div>
                        <div className="h-auto w-full my-2">
                            <p className="text-base text-gray1 text-center font-medium my-2">Sorted By</p>
                            <div className="h-[6vh] w-full bg-pureblack rounded-xl ">

                            </div>
                        </div>
                        <div className="h-auto w-full my-2">
                            <p className="text-base text-gray1 text-center font-medium my-2">Order</p>
                            <div className="h-[6vh] w-full bg-pureblack rounded-xl ">

                            </div>
                        </div>
                        <div className="h-auto w-full my-2">
                            <p className="text-base text-gray1 text-center font-medium my-2">Limit</p>
                            <div className="h-[6vh] w-full bg-pureblack rounded-xl ">

                            </div>
                        </div>
                        <div className="h-auto w-full flex justify-center items-center my-2">
                            <button className="h-[6vh] text-base py-2 px-4 text-lime-800 rounded-lg border-2 border-lime-800">Filter</button>
                        </div>

                    </div>
                    <div className="h-auto w-[95%] mx-auto rounded-xl border-0 shadow-dark1 bg-dark1 flex justify-center my-4">
                        <div className="h-[40vh] w-[40%] bg-dark2 lg:rounded-xl md:rounded-xl sm:rounded-t-xl belowSm:rounded-t-xl">
                        </div>
                        <div className="h-auto w-[60%] rounded-r-xl">

                        </div>
                    </div>
                    <div className="h-auto w-[95%] mx-auto rounded-xl border-0 shadow-dark1 bg-dark1 flex justify-center">
                        <div className="h-[40vh] w-[40%] bg-dark2 lg:rounded-xl md:rounded-xl sm:rounded-t-xl belowSm:rounded-t-xl">
                        </div>
                        <div className="h-auto w-[60%] rounded-r-xl">

                        </div>
                    </div>

                </div>
            </>
        )
    }
    return (
        <>
            <div className="h-full w-full p-2 bg-pureblack relative">
                <div className="md:h-[10vh] md:w-[95%] sm:h-[10vh] sm:w-full belowSm:h-[10vh] belowSm:w-full mx-auto flex justtify-center">
                    <div className="md:h-full md:w-[50%] sm:h-full sm:w-[20%] belowSm:h-full belowSm:w-[20%] flex items-center">
                        <p className="text-2xl font-medium text-white">Blog</p>
                    </div>
                    <div className="md:h-auto md:w-[30%] sm:h-auto sm:w-[50%] belowSm:h-auto belowSm:w-[50%] flex justify-center border rounded-lg my-2.5 border-gray-900">
                        <input className="w-[90%] rounded-l-lg outline-none p-1 bg-dark1 text-gray-400" />
                        <div className="w-[10%] rounded-r-lg flex items-center">
                            <IoSearch className="text-gray-800 text-2xl " />
                        </div>
                    </div>
                    <div className="md:h-full md:w-[20%] sm:h-full sm:w-[30%] belowSm:h-full belowSm:w-[30%] flex justify-center items-center">
                        <button className="h-12 text-lg font-medium bg-green-600 text-gray-900 px-4 py-2 rounded-lg" onClick={createButtonHandler}>
                            Create
                        </button>
                    </div>
                </div>
                <div className="md:h-auto md:w-[95%] sm:h-auto sm:w-[90%] belowSm:h-auto belowSm:w-[90%] mx-auto rounded-lg border border-gray-800 grid md:grid-cols-5 md:gap-6 sm:grid-cols-2 sm:gap-2 belowSm:grid-cols-1 gap-1 bg-dark1 my-2 p-2">
                    <div className="h-full w-full md:block sm:flex sm:justify-center sm:items-center belowSm:flex belowSm:justify-center belowSm:items-center my-2">
                        <div className="p-2 text-base font-medium text-gray1 md:text-center"><p>Category</p></div>
                        <select className="md:w-full sm:w-[50%] belowSm:w-[50%] rounded-lg px-2 py-2 bg-pureblack text-gray1 outline-none">
                            {categoryData == null ?
                                (    <>
                                    <option>select</option>
                                    <option>no category</option>
                                    </>

                                ) :
                                (
                                    categoryData.map((category) => {
                                        return (
                                            <option key={category._id} value={category._id} className="my-2 line-clamp-1">{category.categoryName}</option>
                                        )
                                    })
                                )

                            }
                           
                        </select>
                    </div>
                    <div className="h-full w-full md:block sm:flex sm:justify-center sm:items-center belowSm:flex belowSm:justify-center belowSm:items-center my-2">
                        <div className="p-2 text-base font-medium text-gray1 md:text-center"><p>Sorted By</p></div>
                        <select className="md:w-full sm:w-[50%] belowSm:w-[50%] rounded-lg px-2 py-2 bg-pureblack text-gray1">
                            <option>Sorted By</option>
                            <option>Created At</option>
                            <option>Likes</option>
                        </select>
                    </div>
                    <div className="h-full w-full md:block sm:flex sm:justify-center sm:items-center belowSm:flex belowSm:justify-center belowSm:items-center my-2">
                        <div className="p-2 text-base font-medium text-gray1 md:text-center"><p>Order</p></div>
                        <select className="md:w-full sm:w-[50%] belowSm:w-[50%]  rounded-lg px-2 py-2 bg-pureblack text-gray1">
                            <option>order</option>
                            <option>asending</option>
                            <option>desending</option>
                        </select>

                    </div>
                    <div className="h-full w-full md:block sm:flex sm:justify-center sm:items-center belowSm:flex belowSm:justify-center belowSm:items-center my-2">
                        <div className="p-2 text-base font-medium text-gray1 md:text-center"><p>Limit</p></div>
                        <select className="md:w-full sm:w-[50%] belowSm:w-[50%]  rounded-lg px-2 py-2 bg-pureblack text-gray1">
                            <option>limit</option>
                            <option>5</option>
                            <option>10</option>
                            <option>15</option>
                        </select>

                    </div>
                    <div className="h-full w-full flex justify-center items-center my-2">
                        <button className="border-2 border-lime-800 rounded-lg py-2 px-4 text-lime-700 text-gray1">
                            Filter
                        </button>
                    </div>
                </div>
                <div className='h-auto w-[95%] mx-auto'>
                    {blogsData == null ? (
                        <div className="h-full w-full text-center text-white ">
                            <h1 className="md:text-5xl sm:text-3xl belowSm:text-xl noto-sans my-4">There is no Blog Available currently</h1>
                            <p className='text-base font-base comme'>please create some blogs firsts by pressing the create button</p>
                        </div>
                    )
                        :
                        (
                            blogsData.map((blog) => {
                                return (

                                    <div key={blog._id} className='md:h-full md:w-full sm:h-auto sm:w-full belowSm:h-auto belowSm:w-full md:flex md:justify-center bg-dark1 rounded-lg  rounded-lg border-gray-800 border my-4'>
                                        <div className="md:h-[40vh] md:w-[30%] sm:h-[30vh] sm:w-full belowSm:h-[30vh] belowSm:w-full">
                                            <img src={blog.image} className="h-full w-full md:rounded-l-lg sm:rounded-t-lg belowSm:rounded-t-lg" />
                                        </div>
                                        <div className="md:h-[40vh] md:w-[70%] sm:h-auto sm:w-full belowSm:h-auto belowSm:w-full p-2">
                                            <Link to={`/blog/${blog.slug}`}>
                                                <div className="md:h-[20vh] md:w-full">
                                                    <p className="text-2xl font-medium text-white">{blog.title}</p>
                                                    <p className="text-lg font-medium text-gray1">{blog.author}</p>
                                                    <p className="line-clamp-3 text-gray-400">{blog.introduction}
                                                    </p>
                                                </div>

                                                <div className="md:h-[10vh] md:w-full md:flex md:justify-center sm:h-auto sm:w-full belowSm:h-auto belowSm:w-full">
                                                    <div className="lg:w-[20%] md:w-[20%] md:block  sm:w-full sm:flex sm:justify-center belowSm:w-full belowSm:flex belowSm:justify-center ">
                                                        <div className="md:w-full sm:w-[50%] belowSm:w-[50%]">
                                                            <p className="font-medium text-lg text-gray1">Category</p>
                                                        </div>
                                                        <div className="md:w-full sm:w-[50%] belowSm:w-[50%]">
                                                            <p className="text-base font-medium text-gray-600">{blog.category.categoryName}</p>
                                                        </div>
                                                    </div>
                                                    <div className="md:w-[20%] md:block  sm:w-full belowSm:w-full sm:flex sm:justify-center belowSm:flex belowSm:justify-center ">
                                                        <div className="md:w-full sm:w-[50%] belowSm:w-[50%]">
                                                            <p className="font-medium text-lg text-gray1">Created At</p>
                                                        </div>
                                                        <div className="md:w-full sm:w-[50%] belowSm:w-[50%]">
                                                            <p className="text-base font-medium text-gray-600">{format(new Date(blog.createdAt), 'MMMM dd, yyyy')}</p>
                                                        </div>
                                                    </div>
                                                    <div className="md:w-[20%] md:block sm:w-full belowSm:w-full sm:flex sm:justify-center belowSm:flex belowSm:justify-center ">
                                                        <div className="md:w-full sm:w-[50%] belowSm:w-[50%]">
                                                            <p className="font-medium text-lg text-gray1">Status</p>
                                                        </div>
                                                        <div className="md:w-full sm:w-[50%] belowSm:w-[50%]">
                                                            <p className="text-base font-medium text-gray-600">{blog.status}</p>
                                                        </div>
                                                    </div>
                                                    <div className="md:w-[20%] md:block sm:w-full belowSm:w-full sm:flex sm:justify-center belowSm:flex belowSm:justify-center ">
                                                        <div className="md:w-full sm:w-[50%] belowSm:w-[50%]">
                                                            <p className="font-medium text-lg text-gray1">Published At</p>
                                                        </div>
                                                        <div className="md:w-full sm:w-[50%] belowSm:w-[50%]">
                                                            <p className="text-base font-medium text-gray-600">{format(new Date(blog.publishAt), 'MMMM dd, yyyy')}</p>
                                                        </div>
                                                    </div>
                                                    <div className="md:w-[20%] md:block sm:w-full belowSm:w-full sm:flex sm:justify-center belowSm:flex belowSm:justify-center ">
                                                        <div className="md:w-full sm:w-[50%] belowSm:w-[50%]">
                                                            <p className="font-medium text-lg text-gray1">Update At</p>
                                                        </div>
                                                        <div className="md:w-full sm:w-[50%] belowSm:w-[50%]">
                                                            <p className="text-base font-medium text-gray-600">{format(new Date(blog.updatedAt), 'MMMM dd, yyyy')}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>

                                            <div className="md:h-[8vh] md:w-full grid md:grid-cols-4 sm:grid-cols-2 belowSm:grid-cols-2 gap-4">
                                                <div className="h-full w-full py-2 px-4 rounded-lg border-2 border-gray-800 flex justify-center items-center bg-pureblack">
                                                    <BiSolidLike className="text-3xl text-amber-600" />
                                                    <p className="text-xl font-medium text-gray1"><span>{blog.likes.length}</span>Likes</p>
                                                </div>
                                                <div className="h-full w-full py-2 px-4 rounded-lg border-2 border-gray-800 flex justify-center items-center bg-pureblack">
                                                    <RiMessage2Fill className="text-3xl text-amber-600" />
                                                    <p className="text-lg font-medium text-gray1"><span>{blog.comments.length}</span>Messages</p>
                                                </div>
                                                <button className="h-full w-full py-2 px-4 rounded-lg border-2 border-lime-800 flex justify-center items-center bg-pureblack" onClick={(e) => { updateButtonHandler(blog) }}>
                                                    <p className="text-xl font-medium text-gray1"><span></span>Update</p>
                                                    <FaUpload className="text-3xl text-lime-700" />
                                                </button>
                                                <div className="h-full w-full py-2 px-4 rounded-lg border border-amber-800 flex justify-center items-center bg-pureblack">
                                                    <p className="text-xl font-medium text-gray1">Delete</p>
                                                    <MdDelete className="text-3xl text-amber-800" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        )
                    }

                </div>
                {blogCreate ?
                    <div className="absolute left-0 top-2 right-0 h-auto w-[90%] mx-auto bg-dark1 rounded-lg border border-gray-800">
                        <p className="text-center text-4xl text-white font-medium">Blog Create</p>
                        <form className="h-full w-[90%] mx-auto" encType="multipart/form-data">
                            <p className="text-lg text-gray1 font-medium">Title</p>
                            {createFormErrors.title && <p className="text-red-500 text-sm">{createFormErrors.title}</p>}
                            <input
                                type="text"
                                name="title"
                                value={blogCreateFormData.title}
                                onChange={handleInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray1 bg-dark1 text-white outline-none p-2 font-medium"
                            />

                            <p className="text-lg text-gray1 font-medium">Author</p>
                            {createFormErrors.author && <p className="text-red-500 text-sm">{createFormErrors.author}</p>}
                            <input
                                type="text"
                                name="author"
                                value={blogCreateFormData.author}
                                onChange={handleInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray1 bg-dark1 text-white outline-none p-2 font-medium"
                            />

                            <p className="text-lg text-gray1 font-medium">Category</p>
                            {createFormErrors.category && <p className="text-red-500 text-sm">{createFormErrors.category}</p>}
                            <select name='category' onChange={handleInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray-800 bg-dark1 text-gray1 outline-none "
                            >
                                {categoryData.map((category) => {
                                    return (
                                        <option key={category._id} value={category._id}>{category.categoryName}</option>
                                    )
                                })
                                }
                            </select>
                            {/* <input
                                type="text"
                                name="category"
                                value={blogCreateFormData.category}
                                onChange={handleInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray-800 bg-dark1 text-gray1 outline-none "
                            /> */}

                            <p className="text-lg text-gray1 font-medium">Image</p>
                            {createFormErrors.image && <p className="text-red-500 text-sm">{createFormErrors.image}</p>}
                            <input
                                type="file"
                                name="image"
                                onChange={handleMainImageChange}
                                className="file:text-lg file:px-4 file:py-2 file:rounded-full file:text-white file:bg-dark2 file:border-0 h-[10vh] w-full bg-dark1 rounded-xl border-4 border-dashed border-gray-800 outline-none p-2"
                            />

                            <p className="text-lg text-gray1 font-medium">Introduction</p>

                            {createFormErrors.introduction && <p className="text-red-500 text-sm">{createFormErrors.introduction}</p>}
                            <textarea
                                type="text"
                                name="introduction"
                                value={blogCreateFormData.introduction}
                                onChange={handleInputChange}
                                className="h-[15vh] w-full rounded-lg border border-gray1 bg-dark1 text-white outline-none p-2 font-medium"
                            />

                            <p className="text-lg text-gray1 font-medium">Reading Time</p>

                            {createFormErrors.readingTime && <p className="text-red-500 text-sm">{createFormErrors.readingTime}</p>}
                            <input
                                type="number"
                                name="readingTime"
                                value={blogCreateFormData.readingTime}
                                onChange={handleInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray1 bg-dark1 text-white outline-none p-2 font-medium"
                            />

                            <p className="text-lg text-gray1 font-medium">Published At</p>

                            {createFormErrors.publishAt && <p className="text-red-500 text-sm">{createFormErrors.publishAt}</p>}
                            <input
                                type="datetime-local"
                                name="publishAt"
                                value={blogCreateFormData.publishAt}
                                onChange={handleInputChange}
                                className="h-[7vh] block w-full p-2 border border-gray1 rounded-lg shadow-sm focus:ring-gray1 focus:border-gray1 text-gray1 bg-dark1 "
                            />

                            <p className="text-lg text-gray1 font-medium">Status</p>
                            <input
                                type="radio"
                                name="status"
                                value="draft"
                                checked={blogCreateFormData.status === 'draft'}
                                onChange={handleInputChange}
                            />
                            <label className="px-4">Draft</label>
                            <input
                                type="radio"
                                name="status"
                                value="published"
                                checked={blogCreateFormData.status === 'published'}
                                onChange={handleInputChange}
                            />
                            <label className="px-4">Published</label>

                            <p className="text-lg text-gray1 font-medium">Slug</p>

                            {createFormErrors.slug && <p className="text-red-500 text-sm">{createFormErrors.slug}</p>}
                            <input
                                type="text"
                                name="slug"
                                value={blogCreateFormData.slug}
                                onChange={handleInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray1 bg-dark1 text-white outline-none p-2 font-medium"
                            />
                            <p className="text-lg text-gray1 font-medium my-2">Sections</p>
                            {createFormErrors.sections && <p className="text-red-500 text-sm">{createFormErrors.sections}</p>}
                            {blogCreateFormData.sections.map((section, index) => (
                                <div key={index} className="border border-gray1 p-4 mb-2">
                                    <label className="text-lg text-gray1 font-medium">Section Title:</label>

                                    <input
                                        type="text"
                                        name="title"
                                        value={section.title}
                                        onChange={(e) => handleSectionChange(index, "title", e.target.value)}
                                        className="h-[7vh] w-full rounded-lg border border-gray1 bg-dark1 text-white outline-none p-2 font-medium"
                                    />
                                    <label className="text-lg text-gray1 font-medium">Section Content:</label>
                                    <textarea
                                        value={section.content}
                                        name="content"
                                        onChange={(e) => handleSectionChange(index, "content", e.target.value)}
                                        className="h-[15vh] w-full rounded-lg border border-gray1 bg-dark1 text-white outline-none p-2 font-medium"
                                    />
                                    <label className="text-lg text-gray1 font-medium">Section Image URL:</label>
                                    <input
                                        type="file"
                                        name="sectionImage"
                                        onChange={(e) => handleSectionImageChange(index, e)}
                                        className="file:text-lg file:px-4 file:py-2 file:rounded-full file:text-white file:bg-dark2 file:border-0 h-[10vh] w-full bg-dark1 rounded-xl border-4 border-dashed border-gray-800 outline-none p-2"
                                    />
                                    <label className="text-lg text-gray1 font-medium">Section URL:</label>
                                    <input
                                        type="text"
                                        name="url"
                                        value={section.url}
                                        onChange={(e) => handleSectionChange(index, "url", e.target.value)}
                                        className="h-[7vh] w-full rounded-lg border border-gray1 bg-dark1 text-white outline-none p-2 font-medium"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeSection(index)}
                                        className="bg-red-500 rounded-xl text-white px-4 py-2 mt-2"
                                    >
                                        Remove Section
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addSection}
                                className="bg-blue-500 rounded-xl text-white px-4 py-2 mb-4"
                            >
                                Add Section
                            </button>
                        </form>
                        <div className="h-full w-full flex justify-end items-center gap-6 p-4">
                            <button className="h-12 text-lg font-medium bg-green-600 text-gray-900 px-4 py-2 rounded-lg" onClick={handleCreatePopup}>
                                Create Blog
                            </button>
                            <button className="h-12 text-lg font-medium bg-amber-600 text-gray-900 px-4 py-2 rounded-lg" onClick={createButtonHandler}>
                                Cancel
                            </button>
                        </div>
                        {createPopup ?
                            <DashboardPopUp message="Do you want to create a blog"
                                onConfirm={handleSubmit}
                                onCancel={handlePopupCancel} />
                            : ""}
                    </div> :
                    ""

                }
                {blogUpdate ?
                    <div key={blogUpdateFormData._id} className="absolute left-0 top-2 right-0 h-auto w-[90%] mx-auto bg-dark1 rounded-lg border border-gray-800">
                        <p className="">Blog Create</p>
                        <form className="h-full w-[90%] mx-auto" encType="multipart/form-data">
                            <p className="text-lg text-gray1 font-medium">Title</p>
                            {updateFormErrors.title && <p className="text-red-500 text-sm">{updateFormErrors.title}</p>}
                            <input
                                type="text"
                                name="title"
                                value={blogUpdateFormData.title}
                                onChange={handleUpdateInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray1 bg-dark1 text-white outline-none p-2 font-medium"
                            />

                            <p className="text-lg text-gray1 font-medium">Author</p>
                            {updateFormErrors.author && <p className="text-red-500 text-sm">{updateFormErrors.author}</p>}
                            <input
                                type="text"
                                name="author"
                                value={blogUpdateFormData.author}
                                onChange={handleUpdateInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray1 bg-dark1 text-white outline-none p-2 font-medium"
                            />

                            <p className="text-lg text-gray1 font-medium">Category</p>
                            {updateFormErrors.category && <p className="text-red-500 text-sm">{updateFormErrors.category}</p>}
                            
                            <select name='category' onChange={handleUpdateInputChange}
                            value={blogUpdateFormData.category._id}
                            className="h-[7vh] w-full rounded-lg border border-gray-800 bg-dark1 text-gray1 outline-none "
                            >
                                {categoryData.map((category) => {
                                    return (
                                        <option key={category._id} value={category._id}
                                        
                                        >{category.categoryName}</option>)
                                })}
                            </select>
                            {/* <input
                                type="text"
                                name="category"
                                value={blogUpdateFormData.category._id}
                                onChange={handleUpdateInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray-800 bg-dark1 text-gray1 outline-none "
                            /> */}
                            <img src={blogUpdateFormData.image} className="h-[40vh] w-[50%] rounded-xl mx-auto my-2" />
                            <p className="text-lg text-gray1 font-medium">Image</p>
                            {updateFormErrors.image && <p className="text-red-500 text-sm">{updateFormErrors.image}</p>}
                            <input
                                type="file"
                                name="image"
                                onChange={handleUpdatedMainImageChange}
                                className="file:text-lg file:px-4 file:py-2 file:rounded-full file:text-white file:bg-dark2 file:border-0 h-[10vh] w-full bg-dark1 rounded-xl border-4 border-dashed border-gray-800 outline-none p-2"
                            />

                            <p className="text-lg text-gray1 font-medium">Introduction</p>

                            {updateFormErrors.introduction && <p className="text-red-500 text-sm">{updateFormErrors.introduction}</p>}
                            <textarea
                                type="text"
                                name="introduction"
                                value={blogUpdateFormData.introduction}
                                onChange={handleUpdateInputChange}
                                className="h-[15vh] w-full rounded-lg border border-gray1 bg-dark1 text-white outline-none p-2 font-medium"
                            />

                            <p className="text-lg text-gray1 font-medium">Reading Time</p>

                            {updateFormErrors.readingTime && <p className="text-red-500 text-sm">{updateFormErrors.readingTime}</p>}
                            <input
                                type="number"
                                name="readingTime"
                                value={blogUpdateFormData.readingTime}
                                onChange={handleUpdateInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray1 bg-dark1 text-white outline-none p-2 font-medium"
                            />

                            <p className="text-lg text-gray1 font-medium">Published At</p>

                            {updateFormErrors.publishAt && <p className="text-red-500 text-sm">{updateFormErrors.publishAt}</p>}
                            <input
                                type="datetime-local"
                                name="publishAt"
                                value={
                                    blogUpdateFormData.publishAt
                                        ? new Date(blogUpdateFormData.publishAt).toISOString().slice(0, 16)
                                        : ''
                                }
                                onChange={handleUpdateInputChange}
                                className="h-[7vh] block w-full p-2 border border-gray1 rounded-lg shadow-sm focus:ring-gray1 focus:border-gray1 text-gray1 bg-dark1 "
                            />

                            <p className="text-lg text-gray1 font-medium">Status</p>
                            <input
                                type="radio"
                                name="status"
                                value="draft"
                                checked={blogUpdateFormData.status === 'draft'}
                                onChange={handleUpdateInputChange}
                            />
                            <label className="px-4">Draft</label>
                            <input
                                type="radio"
                                name="status"
                                value="published"
                                checked={blogUpdateFormData.status === 'published'}
                                onChange={handleUpdateInputChange}
                            />
                            <label className="px-4">Published</label>

                            <p className="text-lg text-gray1 font-medium">Slug</p>

                            {updateFormErrors.slug && <p className="text-red-500 text-sm">{updateFormErrors.slug}</p>}
                            <input
                                type="text"
                                name="slug"
                                value={blogUpdateFormData.slug}
                                onChange={handleUpdateInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray1 bg-dark1 text-white outline-none p-2 font-medium"
                            />
                            <p className="text-lg text-gray1 font-medium my-2">Sections</p>
                            {updateFormErrors.sections && <p className="text-red-500 text-sm">{updateFormErrors.sections}</p>}
                            {blogUpdateFormData.sections.map((section, index) => (
                                <div key={index} className="border border-gray1 p-4 mb-2">
                                    <label className="text-lg text-gray1 font-medium">Section Title:</label>

                                    <input
                                        type="text"
                                        name="title"
                                        value={section.title}
                                        onChange={(e) => handleUpdateSectionChange(index, "title", e.target.value)}
                                        className="h-[7vh] w-full rounded-lg border border-gray1 bg-dark1 text-white outline-none p-2 font-medium"
                                    />
                                    <label className="text-lg text-gray1 font-medium">Section Content:</label>
                                    <textarea
                                        value={section.content}
                                        name="content"
                                        onChange={(e) => handleUpdateSectionChange(index, "content", e.target.value)}
                                        className="h-[15vh] w-full rounded-lg border border-gray1 bg-dark1 text-white outline-none p-2 font-medium"
                                    />
                                    <label className="text-lg text-gray1 font-medium">Section Image URL:</label>
                                    <input
                                        type="file"
                                        name="sectionImage"
                                        onChange={(e) => handleUpdatedSectionImageChange(index, e)}
                                        className="file:text-lg file:px-4 file:py-2 file:rounded-full file:text-white file:bg-dark2 file:border-0 h-[10vh] w-full bg-dark1 rounded-xl border-4 border-dashed border-gray-800 outline-none p-2"
                                    />
                                    <label className="text-lg text-gray1 font-medium">Section URL:</label>
                                    <input
                                        type="text"
                                        name="url"
                                        value={section.url}
                                        onChange={(e) => handleUpdateSectionChange(index, "url", e.target.value)}
                                        className="h-[7vh] w-full rounded-lg border border-gray1 bg-dark1 text-white outline-none p-2 font-medium"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeUpdateSection(index)}
                                        className="bg-red-500 rounded-xl text-white px-4 py-2 mt-2"
                                    >
                                        Remove Section
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addUpdateSection}
                                className="bg-blue-500 rounded-xl text-white px-4 py-2 mb-4"
                            >
                                Add Section
                            </button>
                        </form>
                        <div className="h-full w-full flex justify-end items-center gap-6 p-4">
                            <button className="h-12 text-lg font-medium bg-green-600 text-gray-900 px-4 py-2 rounded-lg" onClick={handleUpdatePopup}>
                                Create Blog
                            </button>
                            <button className="h-12 text-lg font-medium bg-amber-600 text-gray-900 px-4 py-2 rounded-lg" onClick={updateButtonHandler}>
                                Cancel
                            </button>
                        </div>
                        {updatePopup ?
                            <DashboardPopUp message="Do you want to Update a blog"
                                onConfirm={handleUpdateSubmit}
                                onCancel={handleUpdatePopupCancel} />
                            : ""}
                    </div> :
                    ""

                }
                <ToastContainer />
            </div>
        </>
    )
}