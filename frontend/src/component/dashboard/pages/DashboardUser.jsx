import { useEffect, useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance";
import { FaUser } from "react-icons/fa";

export default function DashboardUser() {
    const [userData, setUserData] = useState(null);
    const [loading,setLoading]=useState(true);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                let token = localStorage.getItem('blogsite_jwt_token')
                const response = await AxiosInstance.post('/customer/find/user', {
                    token,
                });
                if (response) {
                    setUserData(response.data.data);
                    setLoading(false);
                }
            }
            catch (err) {
                console.log(err.message);
            }

        }
        fetchUserData();
    }, []);
    const handleInputData = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    const handleUserImage = (e) => {
        setUserData((prevState) => ({
            ...prevState,
            image: e.target.files[0], // Store the File object
        }));
    }
    const handleUserUpdateSubmit=()=>{
        try{
            let token=localStorage.setItem('blogsite_jwt_token')
        }
        catch(err){

        }
    }
    if(loading){
        return(
            <>
            <div className="h-auto w-full text-center text-white text-4xl my-4">
                <p>we are still loading some details </p>
            </div>
            </>
        )
    }
    return (
        <>
            <div className="h-full w-full">
                <div className="h-auto w-[95%] mx-auto">
                    <p className='text-white md:text-3xl sm:text-2xl belowSm:text-xl comme font-semibold my-2'>Profile</p>
                </div>
                <div className="h-auto w-[95%] mx-auto my-4 rounded-xl bg-dark1">
                    <form encType="multipart/form-data">
                        <div className="h-auto w-full md:flex md:justify-center rounded-xl">
                            <div className="h-[40vh] md:w-[30%] sm:w-full belowSm:w-full flex justify-center items-center rounded-l-xl my-4">
                                {userData.image?(
                                    <img className="h-64 w-64 rounded-full" src={userData.image}></img>
                                )
                                :
                                (
                                    <FaUser className="text-gray1 h-64 w-64 rounded-full p-4"/>

                                ) 
                                }
                                
                            </div>
                            <div className="h-auto md:w-[70%] sm:w-full belowSm:w-full rounded-r-xl md:p-4 sm:p-2 belowSm:p-2">
                                <p className='text-gray1 text-lg font-medium comme'>UserName</p>
                                <input className="h-[8vh] w-full text-white text-lg  rounded-xl border border-dark2 bg-pureblack outline-none p-2" type="text" name="name" onChange={handleInputData} value={userData.name} ></input>
                                <p className='text-gray1 text-lg font-medium comme'>Email</p>
                                <input className="h-[8vh] w-full text-white text-lg rounded-xl border border-dark2 bg-pureblack outline-none p-2" type="email" name="email" onChange={handleInputData} value={userData.email}></input>
                                <p className='text-gray1 text-lg font-medium comme'>Image</p>
                                <input className="h-[8vh] w-full text-white rounded-xl border-2 border-dashed border-dark2 file:bg-dark1 file:border-none file:hidden file:p-2 file:rounded-xl  bg-pureblack outline-none p-2" type="file" name="image" onChange={handleUserImage}></input>
                            </div>

                        </div>
                        <div className="h-auto w-full p-2">
                            <p className='text-gray1 text-lg font-medium'>Description</p>
                            <textarea className="h-[15vh] w-full text-white text-lg  rounded-xl border border-dark2 bg-pureblack outline-none p-2" type='text' name='description' onChange={handleInputData} value={userData.description}></textarea>
                        </div>
                        <div className="h-auto w-full p-4 flex justify-end">
                            <button className="text-lg font-medium bg-green-500 rounded-xl py-2 px-4">Update</button>
                        </div>
                    </form>
                </div>
                <div className="h-auto w-[95%] mx-auto rounded-xl bg-dark1">
                    <p className='text-3xl text-center font-medium text-white'>Security</p>
                    <form>
                        <p className='text-gray1 text-lg font-medium'>Old Password</p>
                        <input className="h-[8vh] w-full text-white text-lg rounded-xl border border-dark2 bg-pureblack outline-none p-2"></input>
                        <p className='text-gray1 text-lg font-medium'>new Password</p>
                        <input className="h-[8vh] w-full text-white text-lg rounded-xl border border-dark2 bg-pureblack outline-none p-2"></input>
                        <div className="h-auto w-full flex justify-end p-2">
                            <button className="py-2 px-4 text-lg font-medium rounded-xl bg-green-500">Change Password</button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}