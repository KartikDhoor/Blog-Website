import { useState,useRef } from "react";
import AxiosInstance from "../utils/AxiosInstance";
import {useAuth} from '../AuthContext';
import { useNavigate } from "react-router-dom";

export default function OtpConformation() {
    const navigate=useNavigate()
    const {user,token,updateToken}=useAuth()
    const [message,setMessage]=useState()
    const length = 6;
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputsRef = useRef([]);
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        console.log("User from AuthContext:", user);
    
        try {
            if (!user || !user._id) {
                setMessage("User not found, please login again.");
                return;
            }
    
            const otpStr = Number(otp.join(''));
            const _id = user._id; // No need for await here
    
            console.log(user);
            const response = await AxiosInstance.post("/customer/otp", { _id, otp: otpStr });
    
            const data = response.data.data; // Accessing data properly
            console.log(data);
    
            if (data.emailVerified){
                navigate("/");
                return;
            } else {
                setMessage(data.message);
            }
        } catch (err) {
            console.log(err);
            setMessage(err.message);
        }
    };
    

    const handleChange = (index, value) => {
        if (!/^\d?$/.test(value)) return; // Only allow digits
    
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    
        // Move to the next input if filled
        if (value !== "" && index < length - 1) {
          inputsRef.current[index + 1]?.focus();
        }
      };
      const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
          // Move focus to previous input on backspace if empty
          inputsRef.current[index - 1]?.focus();
        }
      };
      const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").slice(0, length);
        const pasteArray = pasteData.split("");

        if (pasteArray.every(char => /^\d$/.test(char))) {
            const newOtp = new Array(length).fill("");
            pasteArray.forEach((char, i) => {
                if (i < length) newOtp[i] = char;
            });

            setOtp(newOtp);

            // Move focus to the last filled input
            const nextIndex = pasteArray.length < length ? pasteArray.length : length - 1;
            inputsRef.current[nextIndex]?.focus();
        }
    };
    return (
        <>
            <div className="h-screen w-full bg-dark2 relative">
                <div className="h-[10vh] w-full bg-pureblack">
                    <div className="h-full w-[90%] mx-auto flex items-center">
                        <p className="text-3xl text-white stick-no-bills tracking-[.25rem] font-blod uppercase">NEURADHOOR</p>
                    </div>
                </div>
                <div className="absolute top-[30%] left-[25%] h-auto w-[50%] mx-auto my-8 rounded-xl bg-dark1 p-4">
                    <p className="text-3xl text-center text-white">OTP</p>
                    {message?<p>{message}</p>:''}
                    <form onSubmit={handleOtpSubmit}>
                        <p className="text-lg text-gray1 px-4 my-4">please confirm the otp from email</p>
                        <div className="h-auto w-full flex justify-center gap-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputsRef.current[index] = el)}
                                type="text"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                maxLength={1}
                                className="h-[8vh] w-[5%] text-xl font-medium text-center rounded-lg outline-none p-2" />
                        ))}
                        </div>
                        
                        <p className="text-white text-end p-2">resend Otp</p>
                        <div className="h-auto w-full flex justify-center">
                            <button className="text-xl px-4 py-2 bg-sky-700 rounded-xl">confirm</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
} 