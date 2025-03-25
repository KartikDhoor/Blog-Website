import { useState } from "react";
import { IoEyeOffOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../utils/AxiosInstance";
import {useAuth} from '../AuthContext';

export default function Register() {
    const {user,token,updateToken}=useAuth();
    const navigate=useNavigate()
    const [passwordVisiblity, setPasswordVisiblity] = useState(false);
    const [message, setmessage] = useState("");
    const [userRegisterForm, setUserRegisterForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const passwordVisiblityToggle = () => {
        setPasswordVisiblity((preState) => !preState)
    }
    const userInputChange = (e) => {
        const { name, value } = e.target;
        setUserRegisterForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    const handleRegister = async (e) => {
        e.preventDefault();
        console.log(userRegisterForm)
        try {
            const response = await AxiosInstance.post("/customer/register", userRegisterForm);
            console.log(response.data);
            const token= response.data;
            if (response) {
                updateToken(token);
                if(response.data.data){
                    navigate("/otp");
                console.log(response.data);
                setmessage(response.data.message);
                } 
            }
        }
        catch (err) {
            console.log(err);
            setmessage(err.message)
        }
    }
    return (
        <>
            <div className="h-screen w-full bg-dark2">
                <div className="h-[10vh] w-full bg-pureblack">
                    <div className="h-full w-[90%] mx-auto flex items-center">
                        <p className="text-3xl stick-no-bills tracking-[.25rem] font-blod uppercase text-white">Blog Website</p>
                    </div>

                </div>
                <div className="h-auto w-[80%] my-4 mx-auto rounded-xl flex justify-center">
                    <div className="h-[80vh] w-[50%] rounded-l-xl bg-dark1 p-4 relative">
                        <p className="text-4xl text-white text-center ">Register</p>
                        {message ? <p className="text-amber-500 text-center">{message}</p> : ""}
                        <form onSubmit={handleRegister} className="my-4">
                            <p className="text-xl fornt-medium text-gray1">Full Name</p>
                            <input text="text" className="h-[8vh] w-full rounded-lg text-white bg-dark1 border border-gray1 outline-none p-2" name='name' value={userRegisterForm.name} onChange={userInputChange} />
                            <p className="text-xl fornt-medium text-gray1">Email</p>
                            <input text="email" className="h-[8vh] w-full rounded-lg text-white bg-dark1 border border-gray1 outline-none p-2" name='email' value={userRegisterForm.email} onChange={userInputChange} />
                            <p className="text-lg fornt-medium text-gray1">Password</p>
                            <div className="h-[8vh] w-full flex jsutify-center items-center rounded-lg border-gray1 border">
                                <input type={passwordVisiblity ? "text" : "password"} className="h-full w-[90%] bg-dark1 text-white rounded-lg outline-none p-2" name='password' value={userRegisterForm.password} onChange={userInputChange} />
                                {passwordVisiblity ? <FaRegEye className=" w-[10%] text-3xl" onClick={passwordVisiblityToggle} /> : <IoEyeOffOutline className=" w-[10%] text-3xl" onClick={passwordVisiblityToggle} />}
                            </div>
                            <div className="h-auto w-full mt-8 flex justify-center">
                                <button type="submit" className="py-2 px-8 text-xl font-medium bg-sky-700 text-white rounded-lg">Register</button>
                            </div>
                        </form>
                        <Link to='/login'>
                            <p className="absolute text-sm bottom-3 right-0 left-0 text-center text-white">user have a account?</p>
                        </Link>
                    </div>
                    <div className="h-[80vh] w-[50%] rounded-r-xl bg-pureblack">

                    </div>
                </div>

            </div>
        </>
    )
}