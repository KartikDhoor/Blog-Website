import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../utils/AxiosInstance";

export default function Security(){
    const [userData,setUserData]=useState(null);
    const navigate=useNavigate();
    useEffect(()=>{
        
        const token = localStorage.getItem('blogsite_jwt_token');
        if(!token){
            navigate("/login");
        }
        else{
            handleProfileData(token);
        }

    },[]);
    const handleProfileData=async(token)=>{
        try{
            const response=await AxiosInstance.post("/customer/find/user",{token});
            if(response.data.data){
                setUserData(response.data.data)
            }
            else {
                localStorage.removeItem('blogsite_jwt_token');
                setIsAuthenticated(false);
                navigate("/login");
            }
        }
        catch(err){
            console.error('Token validation or user fetch failed:', error);
            localStorage.removeItem('blogsite_jwt_token');
            navigate("/login");
        }
    }
    if(userData==null){
        return(
            <>
            <div>
                <p className="text-5xl text-center">we are still loading wait ...... </p>
            </div>
            </>
        )
    }
    return(
        <>
        <div className="h-screen w-full bg-dark2 flex justify-center items-center">
            <div className="h-auto w-[50%] mx-auto top-0 bottom-0 rounded-xl bg-dark1 p-4">
                <p className="text-4xl text-white text-center">Change Password</p>
                <form>
                <p className="text-gray1 text-lg">Old Password</p>
                <input type="password" className="h-[8vh] w-full rounded-lg border border-gray-800 bg-dark1 outline-none focus:border-2"/>
                <p className="text-gray1 text-lg">New Password</p>
                <input type="password" className="h-[8vh] w-full rounded-lg border border-gray-800 bg-dark1 outline-none focus:border-2"/>
                <div className="flex justify-end items-center my-4">
                <button className="text-white bg-lime-600 rounded-lg py-2 px-4">
                    Save
                </button>
                </div>
                
                </form>
            </div>
        </div>
        </>
    )
}