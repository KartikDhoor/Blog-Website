import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5"
import AxiosInstance from "../../utils/AxiosInstance";
import { ToastContainer, toast } from 'react-toastify';
import DashboardPopUp from "../DashboardPopUp";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";

export default function DashboardCategory() {
    const navigate=useNavigate()
    const [categoryData, setCategoryData] = useState(null);
    const [createFormCategory, setCreateFormCategory] = useState({
        categoryName: '',
        description: '',
        categoryImage: '',
    });
    const [updateFormCategory, setUpdateFormCategory] = useState(null);
    const [createButton, setCreateButton] = useState(false);
    const [updateButton, setupdateButton] = useState(false);
    const [createFormPopup, setCreateFormPopup] = useState(false);
    const [createErrorForm, setCreateErrorForm] = useState({});
    const [updateFormPopUp,setUpdateFormPopUp]=useState(false);
    const [updateErrorForm,setUpdateErrorForm]=useState({});
    useEffect(() => {
        const getCategoryData = async () => {
            try {
                const response = await AxiosInstance.post("/customer/category");
                if (response) {
                    console.log(response.data.data)
                    setCategoryData(response.data.data);
                    
                }
            }
            catch (err) {
                toast.error(`Error creating blog: ${err.message}`);
                console.error('Request Error:', err.message);
                return [];
            }
        }
        getCategoryData();
    }, []);
    const categoryCreateButonHandler = () => {
        setCreateButton((preState) => !preState)
    }
    const handleCategoryInputChange = (e) => {
        const { name, value } = e.target;
        setCreateFormCategory((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleCategoryMainImageChange = (e) => {
        setCreateFormCategory((prevState) => ({
            ...prevState,
            categoryImage: e.target.files[0], // Store the File object
        }));
    };
    const handleCategoryPopup = () => {
        const newErrors = {};
        if (createFormCategory.categoryName == "") {
            newErrors.categoryName = "Category Name is required";
        }
        if (createFormCategory.description == "") {
            newErrors.description = "description is required";
        }
        // if (!createFormCategory.categoryImage) {
        //     newErrors.categoryImage = "Category Image is required";
        // }
        setCreateErrorForm(newErrors);
        if (Object.keys(newErrors).length === 0) {
            setCreateFormPopup((prevState) => !prevState);
        }
    }
    const handleCategoryPopupCancel = () => {
        setCreateFormPopup(false);
    }
    const handleCategorySubmit = async () => {
        let token=localStorage.getItem('blogsite_jwt_token')
        const formData = new FormData();
    formData.append('categoryName', createFormCategory.categoryName);
    formData.append('description', createFormCategory.description);
    formData.append('categoryImage', createFormCategory.categoryImage);
        try {
            const response = await AxiosInstance.post("/admin/create/categroy", formData,{
                headers: {
                  'Content-Type': 'multipart/form-data',
                  "authorization": token,
                }});
            if (response) {
                console.log('Blog created successfully:', response.data);
                setCreateErrorForm({});
                toast.success('Blog created successfully! 🎉');
                setCreateFormPopup(false);
                setCreateButton(false);
                navigate(0);
            }
        }
        catch (err) {
            console.error('Error creating blog:', err.message);
            toast.error(`Error creating blog: ${err.message}`);
        }
    }
    const categoryUpdateButtonHandler = (category) => {
        setUpdateFormCategory(category);
        setupdateButton((prestate) => !prestate)
    }
    const handleUpdateCategoryInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateFormCategory((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleUpdateCategoryMainImageChange = (e) => {
        setUpdateFormCategory((prevState) => ({
            ...prevState,
            categoryImage: e.target.files[0], // Store the File object
        }));
    };
    const handleUpdateCategoryPopup = () => {
        const newErrors = {};
        if (updateFormCategory.categoryName == "blogsite_jwt_token") {
            newErrors.categoryName = "Category Name is required";
        }
        if (updateFormCategory.description == "") {
            newErrors.description = "description is required";
        }
        if (!updateFormCategory.categoryImage) {
            newErrors.categoryImage = "Category Image is required";
        }
        setUpdateErrorForm(newErrors);
        if (Object.keys(newErrors).length === 0) {
            setUpdateFormPopUp((prevState) => !prevState);
        } 
    }
    const handleUpdateCategoryPopupCancel = () => {
        setCreateFormPopup(false);
    }
    const handleUpdateCategorySubmit = async () => {
        let token=localStorage.getItem('')
        const formData = new FormData();
        formData.append('_id',updateFormCategory._id);
    formData.append('categoryName', updateFormCategory.categoryName);
    formData.append('description', updateFormCategory.description);
    formData.append('categoryImage', updateFormCategory.categoryImage);
        try {
            const response = await AxiosInstance.post("/admin/update/category", formData,{
                headers: {
                  'Content-Type': 'multipart/form-data',
                  "authorization": token,
                }});
            if (response) {
                console.log('Blog created successfully:', response.data);
                setUpdateErrorForm({});
                toast.success('Blog Updated successfully! 🎉');
                setUpdateFormPopUp(false);
                setupdateButton(false);
                navigate(0);
            }
        }
        catch (err) {
            console.error('Error creating blog:', err.message);
            toast.error(`Error creating blog: ${err.message}`);
        }
    }
    return (
        <>
            <div className="h-full w-full p-2 bg-pureblack relative">
                <div className="md:h-[10vh] md:w-[95%] sm:h-[10vh] sm:w-[90%] belowSm:h-[10vh] belowSm:w-full mx-auto flex justify-center">
                    <div className="h-full w-[50%] flex items-center md:block sm:hidden belowSm:hidden">
                        <p className="text-2xl font-medium text-white">Category</p>
                    </div>
                    <div className="h-auto md:w-[30%] sm:w-[70%] belowSm:w-[70%] flex justify-center border rounded-lg my-2.5 border-gray-900">
                        <input className="w-[90%] rounded-l-lg outline-none p-1 text-white bg-dark1" />
                        <div className="w-[10%] rounded-r-lg flex items-center">
                            <IoSearch className="text-gray-800 text-2xl " />
                        </div>
                    </div>
                    <div className="h-full md:w-[20%] sm:w-[30%] belowSm:w-[30%] flex justify-center items-center">
                        <button className="h-12 text-lg font-medium bg-green-600 text-gray-900 px-4 py-2 rounded-lg" onClick={categoryCreateButonHandler}>
                            Create
                        </button>
                    </div>
                </div>
                <div className="h-auto w-full ">
                    {categoryData==null?(
                        <div className="h-auto w-full  text-center text-white">
                            <p className="md:text-5xl sm:text-3xl belowSm:text-xl noto-sans my-4">There is no category available</p>
                            <p className='text-base font-base comme'>please create a new category before creating any blog</p>
                        </div>
                    ):
                    (
                        categoryData.map((category) => {
                            return (
                                <div key={category._id} className="md:h-auto md:w-[95%] md:mx-auto sm:h-auto sm:w-[90%] sm:mx-auto belowSm:h-auto belowSm:w-[90%] belowSm:mx-auto md:flex md:justify-center rounded-xl bg-dark1 border border-gray-800 my-4">
                                    <div className="h-[30vh] md:w-[30%] md:rounded-l-lg sm:w-full sm:rounded-t-lg belowSm:w-full belowSm:rounded-t-lg">
                                        <img src={category.categoryImage || 'https://picsum.photos/1920/1080'} className="h-full w-full md:rounded-l-lg sm:rounded-t-lg belowSm:rounded-t-lg " />
                                    </div>
                                    <div className="md:h-[30vh] md:w-[70%] md:rounded-r-lg sm:h-auto sm:w-full sm:rounded-b-lg belowSm:h-auto belowSm:w-full belowSm:rounded-b-lg p-4">
                                        <p className="text-white text-2xl font-medium">{category.categoryName}</p>
                                        <p className="text-gray1 text-xl font-medium line-clamp-1">{category.description}</p>
                                        <div className="md:h-auto md:w-full md:flex md:justify-center md:items-center
                                                sm:h-auto sm:w-full 
                                                belowSm:h-auto belowSm:w-full">
                                            <div className="md:h-auto md:w-[30%] md:block
                                                    sm:h-auto sm:w-full sm:flex sm:justify-center
                                                    belowSm:h-auto belowSm:w-full belowSm:flex belowSm:justify-center">
                                                <div className="h-auto md:w-full sm:w-[50%] belowSm:w-[50%]">
                                                    <p className="text-lg text-gray1 text-center font-medium">created At</p>
                                                </div>
                                                <div className="h-auto md:w-full sm:w-[50%] belowSm:w-[50%] text-gray1 text-center">
                                                    <p>{format(new Date(category.createdAt), 'MMMM dd, yyyy')}</p>
                                                </div>
    
    
                                            </div>
                                            <div className="md:h-auto md:w-[30%] md:block
                                                    sm:h-auto sm:w-full sm:flex sm:justify-center
                                                    belowSm:h-auto belowSm:w-full belowSm:flex belowSm:justify-center">
                                                <div className="h-auto md:w-full sm:w-[50%] belowSm:w-[50%]">
                                                    <p className="text-lg text-gray1 font-medium text-center">status</p>
                                                </div>
                                                <div className="h-auto md:w-full sm:w-[50%] belowSm:w-[50%] text-gray1 text-center">
                                                    <p>{category.status?"acitve":"deactive"}</p>
                                                </div>
                                            </div>
                                            <div className="md:h-auto md:w-[30%] md:block
                                                    sm:h-auto sm:w-full sm:flex sm:justify-center
                                                    belowSm:h-auto belowSm:w-full belowSm:flex belowSm:justify-center">
                                                <div className="h-auto md:w-full sm:w-[50%] belowSm:w-[50%]">
                                                    <p className="text-lg text-gray1 font-medium text-center">updated At</p>
                                                </div>
                                                <div className="h-auto md:w-full sm:w-[50%] belowSm:w-[50%] text-gray1 text-center">
                                                    <p>{format(new Date(category.updatedAt), 'MMMM dd, yyyy')}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-auto w-full grid md:grid-cols-4 sm:grid-cols-2 belowSm:grid-cols-2 gap-3 my-2 ">
                                            <div className="col-span-2">
                                                <p className="text-lg text-gray1 font-medium">{19}blogs</p>
                                            </div>
                                            <button className="py-2 px-4 bg-lime-600 rounded-xl text-lg font-medium border-2 border-dark2" onClick={(e)=>{categoryUpdateButtonHandler(category)}}>
                                                update
                                            </button>
                                            <button className="py-2 px-4 bg-amber-700 rounded-xl text-lg font-medium border-2 border-dark2">
                                                delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
    
                            )}))}
                </div>
                {createButton ?
                    (
                        <div className="absolute top-3 right -3 left-3 h-auto w-[90%] bg-dark1 mx-auto rounded-xl border border-gray-800 p-4">
                            <p className="text-3xl text-center text-white font-medium">Create Category</p>
                            <form className="" encType="multipart/form-data">
                                <label className="text-gray1 text-lg font-medium">category Name</label>
                                {createErrorForm.categoryName && <p className="text-red-500 text-sm">{createErrorForm.categoryName}</p>}
                                <input className="h-[8vh] w-full text-white bg-dark1 rounded-xl border border-gray-800 outline-none p-2 "
                                    type="text"
                                    name='categoryName'
                                    value={createFormCategory.categoryName}
                                    onChange={handleCategoryInputChange}
                                />
                                <label className="text-gray1 text-lg font-medium">description</label>
                                {createErrorForm.description && <p className="text-red-500 text-sm">{createErrorForm.description}</p>}
                                <textarea className="h-[20vh] w-full text-white bg-dark1 rounded-xl border border-gray-800 outline-none p-2"
                                    type='text'
                                    name='description'
                                    value={createFormCategory.description}
                                    onChange={handleCategoryInputChange}
                                />
                                <label className="text-gray1 text-lg font-medium">Category Image</label>
                                {createErrorForm.categoryImage && <p className="text-red-500 text-sm">{createErrorForm.categoryImage}</p>}
                                <input type='file' className="file:text-lg file:px-4 file:py-2 file:rounded-full file:text-white file:bg-dark2 file:border-0 h-[10vh] w-full bg-dark1 rounded-xl border-4 border-dashed border-gray-800 outline-none p-2"
                                    name="categoryImage"
                                    onChange={handleCategoryMainImageChange} />
                            </form>
                            <div className="flex justify-end items-center gap-4 my-2">
                                <button className="h-[8vh] text-xl text-black font-medium bg-lime-500 rounded-xl px-4 py-2" onClick={handleCategoryPopup}>Create Category</button>
                                <button className="h-[8vh] text-xl text-black font-medium bg-amber-500 rounded-xl px-4 py-2" onClick={categoryCreateButonHandler}>Cancel</button>
                            </div>
                            {createFormPopup ?
                                <DashboardPopUp
                                    message="DO you want to create category"
                                    onConfirm={handleCategorySubmit}
                                    onCancel={handleCategoryPopupCancel}
                                />
                                :
                                ""

                            }
                        </div>
                    ) :
                    ("")
                }
                {updateButton ?
                    (
                        <div className="absolute top-3 right -3 left-3 h-auto w-[90%] bg-dark1 mx-auto rounded-xl border border-gray-800 p-4">
                            <p className="text-3xl text-center text-white font-medium">Create Category</p>
                            <form className="" encType="multipart/form-data">
                                <label className="text-gray1 text-lg font-medium">category Name</label>
                                {updateErrorForm.categoryName && <p className="text-red-500 text-sm">{updateErrorForm.categoryName}</p>}
                                <input className="h-[8vh] w-full text-white bg-dark1 rounded-xl border border-gray-800 outline-none p-2 "
                                    type="text"
                                    name='categoryName'
                                    value={updateFormCategory.categoryName}
                                    onChange={handleUpdateCategoryInputChange}
                                />
                                <label className="text-gray1 text-lg font-medium">description</label>
                                {updateErrorForm.description && <p className="text-red-500 text-sm">{updateErrorForm.description}</p>}
                                <textarea className="h-[20vh] w-full text-white bg-dark1 rounded-xl border border-gray-800 outline-none p-2"
                                    type='text'
                                    name='description'
                                    value={updateFormCategory.description}
                                    onChange={handleUpdateCategoryInputChange}
                                />
                                <label className="text-gray1 text-lg font-medium">Category Image</label>
                                {updateErrorForm.categoryImage && <p className="text-red-500 text-sm">{updateErrorForm.categoryImage}</p>}
                                <input type='file' className="file:text-lg file:px-4 file:py-2 file:rounded-full file:text-white file:bg-dark2 file:border-0 h-[10vh] w-full bg-dark1 rounded-xl border-4 border-dashed border-gray-800 outline-none p-2"
                                    name="categoryImage"
                                    onChange={handleUpdateCategoryMainImageChange} />
                            </form>
                            <div className="flex justify-end items-center gap-4 my-2">
                                <button className="h-[8vh] text-xl text-black font-medium bg-lime-500 rounded-xl px-4 py-2" onClick={handleUpdateCategoryPopup}>Create Category</button>
                                <button className="h-[8vh] text-xl text-black font-medium bg-amber-500 rounded-xl px-4 py-2" onClick={categoryUpdateButtonHandler}>Cancel</button>
                            </div>
                            {updateFormPopUp ?
                                <DashboardPopUp
                                    message="DO you want to Update category"
                                    onConfirm={handleUpdateCategorySubmit}
                                    onCancel={handleUpdateCategoryPopupCancel}
                                />
                                :
                                ""

                            }
                        </div>
                    ) :
                    ("")
                }
                <ToastContainer />
            </div>

        </>
    )
}