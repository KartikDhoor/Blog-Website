import { LuArrowUpRight } from "react-icons/lu";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { GiBugleCall } from "react-icons/gi";

export default function Contact(){
    return(
        <>
        <div className="h-full w-full bg-pureblack">
            <div className="h-[40vh] w-full border-y border-gray-800">
                <div className="h-full w-[90%] mx-auto flex justify-center">
                    <div className="h-full w-[25%] flex items-center justify-center border-r border-gray-800">
                        <div className="">
                            <p className="text-xl text-white">Gernal Inquiries</p>
                            <button className="flex justify-start px-4 py-2 text-gray1 my-2 rounded border border-gray-800">Contant@blog.com<LuArrowUpRight className=" text-xl text-amber-400"/></button>
                            <button className="flex justify-start px-4 py-2 text-gray1 my-2 rounded border border-gray-800">+919923838448<LuArrowUpRight className=" text-xl text-amber-400"/></button>
                        </div>
                    </div>
                    <div className="h-full w-[25%] flex items-center justify-center border-r border-gray-800">
                        <div className="">
                            <p className="text-xl text-white">Technical Support</p>
                            <button className="flex justify-start px-4 py-2 text-gray1 my-2 rounded border border-gray-800">Contant@blog.com<LuArrowUpRight className=" text-xl text-amber-400"/></button>
                            <button className="flex justify-start px-4 py-2 text-gray1 my-2 rounded border border-gray-800">+919923838448<LuArrowUpRight className=" text-xl text-amber-400"/></button>
                        </div>
                    </div>
                    <div className="h-full w-[25%] flex items-center justify-center border-r border-gray-800">
                        <div className="w-[80%]">
                            <p className="text-xl text-white">Our Office</p>
                            <p className="flex justify-start text-gray1 my-2">Address:231 Ai,tech Avenu ,texhvilla ,647878</p>
                            <button className="flex justify-start px-4 py-2 text-gray1 my-2 rounded border border-gray-800">Get Directions<LuArrowUpRight className=" text-xl text-amber-400"/></button>
                        </div>
                    </div>
                    <div className="h-full w-[25%] flex items-center justify-center border-r border-gray-800">
                        <div className="h-[20vh] w-[80%]">
                            <p className="text-xl text-white text-center">Connect with US</p>
                            <div className="h-[8vh] w-full flex justify-center gap-2 my-2">
                                <FaTwitter className="h-full  w-[25%] text-2xl px-4 text-gray1 rounded border border-gray-800"/>
                                <FaLinkedinIn className="h-full w-[25%] text-2xl px-4 text-gray1 rounded border border-gray-800"/>
                                <FaInstagram className="h-full w-[25%] text-2xl px-4 text-gray1 rounded border border-gray-800"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[60vh] w-full">
                <div className="h-full w-[90%] mx-auto flex justify-center border-y border-gray-800">
                    <div className="h-full w-[40%] border-r border-gray-800 flex items-center">
                        <div>
                        <GiBugleCall className="text-8xl text-amber-400"/>
                        <p className="text-5xl text-white font-medium">Get in touch With the Team</p>
                        </div>
                    </div>
                    <div className="h-full w-[60%] flex items-center justify-center">
                        <div className="w-[95%]">
                        <div className="h-[10vh] w-full flex justify-around gap-4">
                            <div className="h-full w-[50%]">
                                <p className="text-base font-medium text-white">First Name</p>
                                <input className="h-[6vh] w-full border border-gray-800 rounded-xl p-2 text-base text-white bg-pureblack outline-none focus:border-2"/>
                            </div>
                            <div className="h-full w-[50%]">
                            <p className="text-base font-medium text-white">Last Name</p>
                                <input className="h-[6vh] w-full border border-gray-800 rounded-xl p-2 text-base text-white bg-pureblack outline-none focus:border-2"/>
                            
                            </div>
                        </div>
                        <div className="h-[10vh] w-full flex justify-center gap-4">
                            <div className="h-full w-[50%]">
                            <p className="text-base font-medium text-white">Email</p>
                                <input className="h-[6vh] w-full border border-gray-800 rounded-xl p-2 text-base text-white bg-pureblack outline-none focus:border-2"/>
                            
                            </div>
                            <div className="h-full w-[50%]">
                            <p className="text-base font-medium text-white">First Name</p>
                                <input className="h-[6vh] w-full border border-gray-800 rounded-xl p-2 text-base text-white bg-pureblack outline-none focus:border-2"/>
                            
                            </div>
                        </div>
                        <div className="h-[20vh] w-full">
                            <p className="text-base font-medium text-white">Message</p>
                            <textarea className="h-[15vh] w-full border border-gray-800 rounded-xl p-2 text-base text-white bg-pureblack outline-none focus:border-2"/>
                        </div>
                        <div className="h-[10vh] w-full flex justify-between">
                            <div className="h-full w-[60%]">
                                <input type="checkbox" className=""/>
                                <label className="text-base font-normal px-2 text-white">I agree with the Terms and conditions and privacy policies</label>
                            </div>
                            <div className="h-full w-[40%] flex justify-end text-2xl">
                                <button className="h-[7vh] px-4 py-2 bg-amber-400 rounded-xl">Send</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}