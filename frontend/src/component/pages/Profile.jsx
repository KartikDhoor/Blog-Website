import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../utils/AxiosInstance";
import { useAuth } from "../AuthContext";
import { ToastContainer, toast } from "react-toastify";

export default function Profile() {
    const { user, token } = useAuth()
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {

        const token = localStorage.getItem('blogsite_jwt_token');
        if (!token) {
            navigate("/login");
        }
        else {
            handleProfileData(token);
        }

    }, []);
    const handleProfileData = async (token) => {
        try {
            const response = await AxiosInstance.post("/customer/find/user",{},{
          headers: {
            "authorization": token, // actual header
          }
        });
            if (response.data.data) {
                setUserData(response.data.data)
            }
            else {
                localStorage.removeItem('blogsite_jwt_token');
                setIsAuthenticated(false);
                navigate("/login");
            }
        }
        catch (err) {
            console.error('Token validation or user fetch failed:', error);
            localStorage.removeItem('blogsite_jwt_token');
            navigate("/login");
        }
    }
    const updateUserProfile = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    const handleFileChange = (e) => {
        setUserData((prev) => ({
            ...prev,
            image: e.target.files[0], // Store the File object
        }));
    };

    const handleUpdateProfile = async (userData) => {
    try {
        const formData = new FormData();

        // Append token for your middleware
        formData.append("token", token);

        // Append each field separately
        formData.append("name", userData.name);
        formData.append("email", userData.email);
        formData.append("phoneNo", userData.phoneNo);
        formData.append("introduction", userData.introduction);

        // Append image file if it exists
        if (userData.image instanceof File) {
            formData.append("image", userData.image);
        }

        // Send the request
        const response = await AxiosInstance.post("/customer/profile/update", formData, {
            headers: { "Content-Type": "multipart/form-data",
                "Authorization": token,
             }
        });

        if (response.data.data) {
            setUserData(response.data.data);
            toast.success("Profile is Updated");
        } else {
            console.error(response.data);
        }
    } catch (err) {
        console.error("Update failed:", err);
    }
};


    if (userData == null) {
        return (
            <>
                <div>
                    <p className="text-5xl text-center">we are still loading wait ...... </p>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="md:h-screen md:w-full md:flex md:justify-center md:items-center 
                        sm:h-auto sm:w-full sm:flex sm:justify-center sm:items-center sm:p-4
                        belowSm:h-auto belowSm:w-full belowSm:flex belowSm:justify-center belowSm:items-center bg-dark2 belowSm:p-2 ">
                <div className="md:h-auto md:w-[70%] md:mx-auto 
                            sm:h-auto sm:w-[80%] sm:mx-auto
                            belowSm:h-auto belowSm:w-[90%] belowSm:mx-auto rounded-xl bg-dark1 p-4">
                    <p className="text-3xl text-white font-medium">Profile</p>
                    <form className="p-4">
                        <div className="md:h-auto md:w-full md:flex md:justify-center md:items-center
                                    sm:h-auto sm:w-full
                                    belowSm:h-auto belowSm:w-full">
                            <div className="md:h-auto md:w-[30%] md:flex md:justify-center md:items-center
                                        sm:h-auto sm:w-full sm:flex sm:justify-center sm:items-center
                                        belowSm:h-auto belowSm:w-full belowSm:flex belowSm:justify-center belowSm:items-center">
                                {userData.image ?
                                    <img src={userData.image} name='image' className="h-64 w-64 rounded-full"></img>
                                    :
                                    <img src="./src/assets//user.png" name='image' className="h-64 w-64 rounded-full"></img>
                                }

                            </div>
                            <div className="md:h-auto md:w-[70%]
                                        sm:h-auto sm:w-full
                                        belowSm:h-auto belowSm:w-full p-4">
                                <p className="text-lg text-gray1">fullName</p>
                                <input type="type" name="name" value={userData.name} onChange={updateUserProfile} className="h-[8vh] w-full text-white rounded-lg border border-gray-800 bg-dark1 outline-none focus:border-2 p-2" />
                                <p className="text-lg text-gray1">email</p>
                                <input type="email" name="email" value={userData.email} onChange={updateUserProfile} className="h-[8vh] w-full text-white rounded-lg border border-gray-800 bg-dark1 outline-none focus:border-2 p-2" />
                                <p className="text-lg text-gray1">Phone No</p>
                                <input type="number" name="phoneNo" value={userData.phoneNo} onChange={updateUserProfile} className="h-[8vh] w-full text-white rounded-lg border border-gray-800 bg-dark1 outline-none focus:border-2 p-2" />
                                <p className="text-lg text-gray1">Image</p>
                                <input type="file" name="image" onChange={handleFileChange} className="h-[8vh] w-full text-white rounded-lg border border-gray-800 bg-dark1 outline-none focus:border-2 p-2" />
                            </div>

                        </div>
                        <p className="text-lg text-gray1">description</p>
                        <textarea type="text" name="introduction" value={userData.introduction} onChange={updateUserProfile} className="h-[20vh] w-full text-white rounded-lg border border-gray-800 bg-dark1 outline-none focus:border-2 p-2" />
                        <div className="flex justify-end items-center">
                            <button className="bg-lime-700 text-white rounded-xl py-2 px-6" type='button' onClick={() => handleUpdateProfile(userData)}>
                                Update
                            </button>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}