import { IoSearch } from "react-icons/io5";
import { BiSolidLike } from "react-icons/bi";
import { RiMessage2Fill } from "react-icons/ri";
import { FaUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import AxiosInstance from "../../utils/AxiosInstance";
import { format } from 'date-fns';

export default function DashboardBlog() {
    const [blogsData, setBlogsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [blogCreate, setBlogCreate] = useState(false);
    const [blogUpdate, setBlogUpdate] = useState(false);
    const [blogUpdateFormData,setBlogUpdateFormData]=useState(null);
    const [blogCreateFormData, setBlogCreateFormData] = useState({
        title: '',
        author: "",
        ctegory: "",
        image: "",
        introduction: "",
        slug: "",
        readingTime: 0,
        publishAt: '',
        status: 'draft',
        sections: [
            { title: "", content: "", image: "", url: "" },
        ]

    })
    const [queryParams, setQueryParams] = useState({
        sortBy: 'createdAt',
        order: 'desc',
        limit: 12,
        page: 1,
    })
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const blog = await AxiosInstance.get("/customer/blogs", { params: queryParams, });
                if (blog) {
                    setBlogsData(blog.data.data);
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
    const createButtonHandler = () => {
        setBlogCreate((preState) => !preState);
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlogCreateFormData((prevState) => ({
            ...prevState,
            [name]: value,
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
    const handleSubmit = async () => {
        try {
            const response = await AxiosInstance.post('/admin/create/blog', blogCreateFormData);
            console.log('Blog created successfully:', response.data);
            setBlogCreate(false);
            // Show success message or redirect if needed
        } catch (error) {
            console.error('Error creating blog:', error);
            // Handle error (e.g., show error notification)
        }
    };
    const updateButtonHandler = (blog) => {
        setBlogUpdate((preState) => !preState);
        setBlogUpdateFormData(blog);
    }
    const updateCancelButton=()=>{
        setBlogUpdate((preState) => !preState);
    }
    const handleUpdateInputChange = (e) => {
        const { name, value } = e.target;
        setBlogUpdateFormData((prevState) => ({
            ...prevState,
            [name]: value,
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
    const handleUpdateSubmit = async () => {
        try {
            const response = await AxiosInstance.post('/admin/update/blog', blogUpdateFormData);
            console.log('Blog created successfully:', response.data);
            setBlogUpdate(false);
            // Show success message or redirect if needed
        } catch (error) {
            console.error('Error creating blog:', error);
            // Handle error (e.g., show error notification)
        }
    };


    if (loading) {
        return (
            <>
                <div className="h-full w-full bg-pureblack">
                    <p className="text-xl text-center text-white">Loading</p>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="h-full w-full p-2 bg-pureblack relative">
                <div className="md:h-[10vh] md:w-[95%] mx-auto flex justtify-center">
                    <div className="h-full w-[50%] flex items-center">
                        <p className="text-2xl font-medium text-white">Blog</p>
                    </div>
                    <div className="h-auto w-[30%] flex justify-center border rounded-lg my-2.5 border-gray-900">
                        <input className="w-[90%] rounded-l-lg outline-none p-1 bg-dark1 text-gray-400" />
                        <div className="w-[10%] rounded-r-lg flex items-center">
                            <IoSearch className="text-gray-800 text-2xl " />
                        </div>
                    </div>
                    <div className="h-full w-[20%] flex justify-center items-center">
                        <button className="h-12 text-lg font-medium bg-green-600 text-gray-900 px-4 py-2 rounded-lg" onClick={createButtonHandler}>
                            Create
                        </button>
                    </div>
                </div>
                <div className="h-[10vh] w-[95%] mx-auto rounded-lg border border-gray-800 grid md:grid-cols-5 sm:grid-cols-2 below-sm:grid-cols-2 bg-dark1 my-2">
                    <div className="h-full w-full flex justify-center items-center">
                        <div className="p-2 text-base font-medium text-gray1"><p>Category</p></div>
                        <select className="rounded-lg px-2 py-2 bg-pureblack text-gray1">
                            <option>category</option>
                            <option>AI</option>
                        </select>
                    </div>
                    <div className="h-full w-full flex justify-center items-center">
                        <div className="p-2 text-base font-medium text-gray1"><p>Sorted By</p></div>
                        <select className="rounded-lg px-2 py-2 bg-pureblack text-gray1">
                            <option>Sorted By</option>
                        </select>
                    </div>
                    <div className="h-full w-full flex justify-center items-center">
                        <div className="p-2 text-base font-medium text-gray1"><p>Order</p></div>
                        <select className="rounded-lg px-2 py-2 bg-pureblack text-gray1">
                            <option>order</option>
                        </select>

                    </div>
                    <div className="h-full w-full flex justify-center items-center">
                        <div className="p-2 text-base font-medium text-gray1"><p>Limit</p></div>
                        <select className="rounded-lg px-2 py-2 bg-pureblack text-gray1">
                            <option>limit</option>
                            <option>12</option>
                        </select>

                    </div>
                    <div className="h-full w-full flex justify-center items-center">
                        <button className="border-2 border-lime-800 rounded-lg py-2 px-4 text-lime-700 text-gray1">
                            Filter
                        </button>

                    </div>
                </div>
                <div className='h-auto w-[95%] mx-auto'>
                    {blogsData.map((blog) => {
                        return (
                            <div key={blog._id} className='md:h-full md:w-full flex justify-center bg-dark1 rounded-lg  rounded-lg border-gray-800 border my-2'>
                                <div className="h-[40vh] w-[30%]">
                                    <img src={blog.image} className="h-full w-full  rounded-l-lg" />
                                </div>
                                <div className="md:h-[40vh] md:w-[70%] p-2">
                                    <div className="md:h-[20vh] md:w-full">
                                        <p className="text-2xl font-medium text-white">{blog.title}</p>
                                        <p className="text-lg font-medium text-gray1">{blog.author}</p>
                                        <p className="line-clamp-3 text-gray-400">{blog.introduction}
                                        </p>
                                    </div>
                                    <div className="md:h-[10vh] md:w-full flex justify-center">
                                        <div className="w-[20%]">
                                            <p className="font-medium text-lg text-gray1">Category</p>
                                            <p className="text-base font-medium text-gray-600">{blog.category.categoryName}</p>
                                        </div>
                                        <div className="w-[20%]">
                                            <p className="font-medium text-lg text-gray1">created At</p>
                                            <p className="text-base font-medium text-gray-600">{format(new Date(blog.createdAt), 'MMMM dd, yyyy')}</p>
                                        </div>
                                        <div className="w-[20%]">
                                            <p className="font-medium text-lg text-gray1">Status</p>
                                            <p className="text-base font-medium text-gray-600">{blog.status}</p>
                                        </div>
                                        <div className="w-[20%]">
                                            <p className="font-medium text-lg text-gray1">published At</p>
                                            <p className="text-base font-medium text-gray-600">{format(new Date(blog.publishAt), 'MMMM dd, yyyy')}</p>
                                        </div>
                                        <div className="w-[20%]">
                                            <p className="font-medium text-lg text-gray1">Update At</p>
                                            <p className="text-base font-medium text-gray-600">{format(new Date(blog.updatedAt), 'MMMM dd, yyyy')}</p>
                                        </div>
                                    </div>
                                    <div className="md:h-[8vh] md:w-full grid md:grid-cols-4 sm:grid-cols-2 belowSm:grid-cols-2 gap-4">
                                        <div className="h-full w-full py-2 px-4 rounded-lg border-2 border-gray-800 flex justify-center items-center bg-pureblack">
                                            <BiSolidLike className="text-3xl text-amber-600" />
                                            <p className="text-xl font-medium text-gray1"><span>{blog.likes.length}</span>Likes</p>
                                        </div>
                                        <div className="h-full w-full py-2 px-4 rounded-lg border-2 border-gray-800 flex justify-center items-center bg-pureblack">
                                            <RiMessage2Fill className="text-3xl text-amber-600" />
                                            <p className="text-xl font-medium text-gray1"><span>{blog.comments.length}</span>Messages</p>
                                        </div>
                                        <button className="h-full w-full py-2 px-4 rounded-lg border-2 border-lime-800 flex justify-center items-center bg-pureblack" onClick={(e)=>{updateButtonHandler(blog)}}>
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
                    })}
                </div>
                {blogCreate ?
                    <div className="absolute left-0 top-2 right-0 h-auto w-[90%] mx-auto bg-dark1 rounded-lg border border-gray-800">
                        <p className="">Blog Create</p>
                        <form className="h-full w-[90%] mx-auto">
                            <p>Title</p>
                            <input
                                type="text"
                                name="title"
                                value={blogCreateFormData.title}
                                onChange={handleInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray-800 bg-dark1 text-gray1 outline-none"
                            />

                            <p>Author</p>
                            <input
                                type="text"
                                name="author"
                                value={blogCreateFormData.author}
                                onChange={handleInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray-800 bg-dark1 text-gray1 outline-none"
                            />

                            <p>Category</p>
                            <input
                                type="text"
                                name="category"
                                value={blogCreateFormData.category}
                                onChange={handleInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray-800 bg-dark1 text-gray1 outline-none"
                            />

                            <p>Image</p>
                            <input
                                type="text"
                                name="image"
                                value={blogCreateFormData.image}
                                onChange={handleInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray-800 bg-dark1 text-gray1 outline-none"
                            />

                            <p>Introduction</p>
                            <input
                                type="text"
                                name="introduction"
                                value={blogCreateFormData.introduction}
                                onChange={handleInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray-800 bg-dark1 text-gray1 outline-none"
                            />

                            <p>Reading Time</p>
                            <input
                                type="number"
                                name="readingTime"
                                value={blogCreateFormData.readingTime}
                                onChange={handleInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray-800 bg-dark1 text-gray1 outline-none"
                            />

                            <p>Published At</p>
                            <input
                                type="date"
                                name="publishAt"
                                value={blogCreateFormData.publishAt}
                                onChange={handleInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray-800 bg-dark1 text-gray1 outline-none"
                            />

                            <p>Status</p>
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

                            <p>Slug</p>
                            <input
                                type="text"
                                name="slug"
                                value={blogCreateFormData.slug}
                                onChange={handleInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray-800 bg-dark1 text-gray1 outline-none"
                            />
                            <p>Sections</p>
                            {blogCreateFormData.sections.map((section, index) => (
                                <div key={index} className="border p-4 mb-2">
                                    <label>Section Title:</label>
                                    <input
                                        type="text"
                                        value={section.title}
                                        onChange={(e) => handleSectionChange(index, "title", e.target.value)}
                                        className="h-[7vh] w-full rounded-lg border border-gray-800 bg-dark1 text-gray1 outline-none"
                                    />
                                    <label>Section Content:</label>
                                    <textarea
                                        value={section.content}
                                        onChange={(e) => handleSectionChange(index, "content", e.target.value)}
                                        className="h-[15vh] w-full rounded-lg border border-gray-800 bg-dark1 text-gray1 outline-none"
                                    />
                                    <label>Section Image URL:</label>
                                    <input
                                        type="text"
                                        value={section.image}
                                        onChange={(e) => handleSectionChange(index, "image", e.target.value)}
                                        className="border p-2 mb-2 block w-full"
                                    />
                                    <label>Section URL:</label>
                                    <input
                                        type="text"
                                        value={section.url}
                                        onChange={(e) => handleSectionChange(index, "url", e.target.value)}
                                        className="border p-2 mb-2 block w-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeSection(index)}
                                        className="bg-red-500 text-white px-4 py-2 mt-2"
                                    >
                                        Remove Section
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addSection}
                                className="bg-blue-500 text-white px-4 py-2 mb-4"
                            >
                                Add Section
                            </button>
                        </form>
                        <div className="h-full w-full flex justify-end items-center p-4">
                            <button className="h-12 text-lg font-medium bg-green-600 text-gray-900 px-4 py-2 rounded-lg" onClick={handleSubmit}>
                                Create Blog
                            </button>
                        </div>
                    </div> :
                    ""
                }
                {blogUpdate ?
                    <div key={blogUpdateFormData._id} className="absolute left-0 top-2 right-0 h-auto w-[90%] mx-auto bg-dark1 rounded-lg border border-gray-800">
                        <p className="">Blog Create</p>
                        <form className="h-full w-[90%] mx-auto">
                            <p>Title</p>
                            <input
                                type="text"
                                name="title"
                                value={blogUpdateFormData.title}
                                onChange={handleUpdateInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray-800 bg-dark1 text-gray1 outline-none"
                            />

                            <p>Author</p>
                            <input
                                type="text"
                                name="author"
                                value={blogUpdateFormData.author}
                                onChange={handleUpdateInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray-800 bg-dark1 text-gray1 outline-none"
                            />

                            <p>Category</p>
                            <input
                                type="text"
                                name="category"
                                value={blogUpdateFormData.category}
                                onChange={handleUpdateInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray-800 bg-dark1 text-gray1 outline-none"
                            />

                            <p>Image</p>
                            <input
                                type="text"
                                name="image"
                                value={blogUpdateFormData.image}
                                onChange={handleUpdateInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray-800 bg-dark1 text-gray1 outline-none"
                            />

                            <p>Introduction</p>
                            <input
                                type="text"
                                name="introduction"
                                value={blogUpdateFormData.introduction}
                                onChange={handleUpdateInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray-800 bg-dark1 text-gray1 outline-none"
                            />

                            <p>Reading Time</p>
                            <input
                                type="number"
                                name="readingTime"
                                value={blogUpdateFormData.readingTime}
                                onChange={handleUpdateInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray-800 bg-dark1 text-gray1 outline-none"
                            />

                            <p>Published At</p>
                            <input
                                type="date"
                                name="publishAt"
                                value={blogUpdateFormData.publishAt}
                                onChange={handleUpdateInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray-800 bg-dark1 text-gray1 outline-none"
                            />

                            <p>Status</p>
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

                            <p>Slug</p>
                            <input
                                type="text"
                                name="slug"
                                value={blogUpdateFormData.slug}
                                onChange={handleUpdateInputChange}
                                className="h-[7vh] w-full rounded-lg border border-gray-800 bg-dark1 text-gray1 outline-none"
                            />
                            <p>Sections</p>
                            {blogUpdateFormData.sections.map((section,index) => (
                                <div key={index} className="border p-4 mb-2">
                                    <label>Section Title:</label>
                                    <input
                                        type="text"
                                        value={section.title}
                                        onChange={(e) => handleUpdateSectionChange(index, "title", e.target.value)}
                                        className="h-[7vh] w-full rounded-lg border border-gray-800 bg-dark1 text-gray1 outline-none"
                                    />
                                    <label>Section Content:</label>
                                    <textarea
                                        value={section.content}
                                        onChange={(e) => handleUpdateSectionChange(index, "content", e.target.value)}
                                        className="h-[15vh] w-full rounded-lg border border-gray-800 bg-dark1 text-gray1 outline-none"
                                    />
                                    <label>Section Image URL:</label>
                                    <input
                                        type="text"
                                        value={section.image}
                                        onChange={(e) => handleUpdateSectionChange(index, "image", e.target.value)}
                                        className="border p-2 mb-2 block w-full"
                                    />
                                    <label>Section URL:</label>
                                    <input
                                        type="text"
                                        value={section.url}
                                        onChange={(e) => handleUpdateSectionChange(index, "url", e.target.value)}
                                        className="border p-2 mb-2 block w-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeUpdateSection(index)}
                                        className="bg-red-500 text-white px-4 py-2 mt-2"
                                    >
                                        Remove Section
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addUpdateSection}
                                className="bg-blue-500 text-white px-4 py-2 mb-4"
                            >
                                Add Section
                            </button>
                        </form>
                        <div className="h-full w-full flex justify-end items-center gap-4 p-4">
                            <button className="h-12 text-lg font-medium bg-green-600 text-gray-900 px-4 py-2 rounded-lg" onClick={handleUpdateSubmit}>
                                Create Blog
                            </button>
                            <button className="h-12 text-lg font-medium bg-green-600 text-gray-900 px-4 py-2 rounded-lg" onClick={updateCancelButton}>
                                Cancel
                            </button>
                        </div>
                    </div> :
                    ""

                }

            </div>
        </>
    )
}