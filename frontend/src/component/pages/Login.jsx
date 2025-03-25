import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOffOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import AxiosInstance from "../utils/AxiosInstance";
import {useAuth} from '../AuthContext'

export default function Login() {
    const {updateToken}=useAuth();
    const navigate=useNavigate();
    const [passwordVisiblity, setPasswordVisiblity] = useState(false);
    const [message, setmessage] = useState("");
    const [userLoginForm, setUserLoginForm] = useState({
        email: "",
        password: "",
    });
    const passwordVisiblityToggle = () => {
        setPasswordVisiblity((preState) => !preState)
    };
    const userInputChange = (e) => {
        const { name, value } = e.target;
        setUserLoginForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await AxiosInstance.post("/customer/login", userLoginForm);
            if (response) {
                const token = response.data?.token;
                const userType = response.data?.data?.userType;
                const userverified = response.data?.data?.userVerified;
                console.log(response.data.data)
                // localStorage.setItem("blogsite_jwt_token", token);
                updateToken(token)
                if(userverified==false){
                    navigate("/otp");
                    return;
                }
                if (userType === 1) {
                    navigate("/dashboard");
                    return;
                }
                if (userType === 2) {
                    navigate("/");
                    return;
                }
                console.log(response.data);
                setmessage(response.data.message);
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
                    <div className="h-[80vh] w-[50%] rounded-l-xl bg-pureblack">

                    </div>
                    <div className="h-[80vh] w-[50%] rounded-r-xl bg-dark1 p-4 relative">
                        <p className="text-4xl text-white text-center ">Login</p>
                        {message ? <p className="text-amber-600 text-center">{message}</p> : ""}
                        <form className="my-4" onSubmit={handleLogin}>
                            <p className="text-xl fornt-medium text-gray1">UserName</p>
                            <input text="email" className="h-[8vh] w-full rounded-lg text-white bg-dark1 border border-gray1 outline-none p-2" name='email' value={userLoginForm.email} onChange={userInputChange} />
                            <p className="text-lg fornt-medium text-gray1">Password</p>
                            <div className="h-[8vh] w-full flex jsutify-center items-center rounded-lg border-gray1 border">
                                <input type={passwordVisiblity ? "text" : "password"} className="h-full w-[90%] bg-dark1 text-white rounded-lg outline-none p-2" name='password' value={userLoginForm.password} onChange={userInputChange} />
                                {passwordVisiblity ? <FaRegEye className=" w-[10%] text-3xl" onClick={passwordVisiblityToggle} /> : <IoEyeOffOutline className=" w-[10%] text-3xl" onClick={passwordVisiblityToggle} />}
                            </div>
                            <p className="text-end text-white text-sm font-normal my-2">forget Password</p>
                            <div className="h-auto w-full mt-8 flex justify-center">
                                <button type="submit" className="py-2 px-8 text-xl font-medium bg-sky-700 text-white rounded-lg">Login</button>
                            </div>
                        </form>
                        <Link to='/register'>
                            <p className="absolute text-sm bottom-3 right-0 left-0 text-center text-white">user does not have account?</p>
                        </Link>
                    </div>
                </div>

            </div>
        </>
    )
}