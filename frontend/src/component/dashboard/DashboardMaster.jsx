import { Link, Outlet } from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { BiCategory } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { FaCommentAlt } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { HiMiniBars4 } from "react-icons/hi2";
import { RxCrossCircled } from "react-icons/rx";
import { FaBell } from "react-icons/fa";
import { useState } from "react";



export default function DashboardMaster() {
    const [nav, setNav] = useState(false);
    const handleNavbar = () => {
        setNav((preState) => !preState)
    }
    return (
        <>
            <div className="h-full w-full relative md:flex bg-pureblack">
                <div className="h-[10vh] w-full md:hidden sm:block belowSm:block static top-0 bg-pureblack">
                    <div className="h-full w-[90%] mx-auto flex justify-center items-center">
                        <div className="h-full w-[60%] text-white flex items-center">
                            <p className="text-2xl font-medium text-white">blog website</p>
                        </div>
                        {nav ?
                            <div className="lg:hidden md:hidden sm:fixed sm:top-0 sm:right-0 sm:bg-dark2 sm:h-[100vh] sm:w-[90%] text-lg font-normal text-gray-400 p-4 belowSm:fixed belowSm:top-0 belowSm:right-0 belowSm:bg-dark2 belowSm:h-[100vh] belowSm:w-[90%] z-10">
                                <div className="h-[10vh] w-full flex justify-end p-2 ">
                                    <RxCrossCircled className="text-gray-300 text-4xl sm:text-4xl belowSm:text-3xl" onClick={handleNavbar} />
                                </div>
                                <div className="border-y border-gray-800">
                                    <Link to='/dashboard' onClick={handleNavbar}><p className="border-y border-gray-800 py-2">Home</p></Link>
                                    <Link to='/' onClick={handleNavbar}><p className="border-y border-gray-800 py-2">Webstite</p></Link>
                                    <Link to='/dashboard/blog' onClick={handleNavbar}><p className="border-b border-gray-800 py-2">blog</p></Link>
                                    <Link to='/dashboard/category' onClick={handleNavbar}><p className="border-b border-gray-800 py-2">Category</p></Link>
                                    <Link to='/dashboard/comment' onClick={handleNavbar}><p className="border-b border-gray-800 py-2">Comment</p></Link>
                                    <Link to='/dashboard/announcement' onClick={handleNavbar}><p className="border-b border-gray-800 py-2">Announcement</p></Link>
                                </div>
                            </div>
                            :

                            <div className="h-full w-[40%] flex items-center justify-end ">
                                <button onClick={handleNavbar}><HiMiniBars4 className="text-amber-500 text-2xl" /></button>
                            </div>
                        }

                    </div>
                </div>
                <div className="md:h-screen md:w-[20%] md:block belowSm:hidden sm:hidden bg-dark1 fixed p-2">
                    <div className="h-auto w-full p-2 flex justify-center">
                        <div className="h-full w-[80%] ">
                            <p className="text-2xl text-gray1 font-medium ">blog Website</p>
                        </div>
                        <div className="h-full w-[20%] flex justify-center">
                            <IoMdCloseCircleOutline className="text-4xl text-amber-700 bg-gray-700 rounded-lg" />
                        </div>
                    </div>
                    <Link to='/dashboard'>
                        <div className="md:h-auto md:w-full md:flex md:justify-center 
                                sm:h-auto sm:w-full belowSm:h-auto belowSm:w-full bg-gray-800 rounded-lg my-2 p-1">
                            <div className="h-full w-[20%] flex justify-center">
                                <FaHome className="text-5xl text-amber-500 bg-gray-700 rounded-lg p-2" />
                            </div>
                            <div className="h-full w-[80%] md:block sm:hidden belowSm:hidden flex items-center">
                                <p className="text-2xl text-gray-500 font-medium">Home</p>
                            </div>
                        </div>
                    </Link>
                    <Link to='/dashboard/user'>
                        <div className="h-auto w-full p-1 flex justify-center bg-gray-800 rounded-lg my-2">
                            <div className="h-full w-[20%] flex justify-center">
                                <BsFillPersonFill className="text-5xl text-amber-500 bg-gray-700 rounded-lg p-2" />
                            </div>
                            <div className="h-full w-[80%] md:block sm:hidden belowSm:hidden flex items-center">
                                <p className="text-2xl text-gray-500 font-medium">Users</p>
                            </div>
                        </div>
                    </Link>
                    <Link to='/dashboard/blog'>
                        <div className="h-auto w-full p-1 flex justify-center bg-gray-800 rounded-lg my-2">
                            <div className="h-full w-[20%] flex justify-center">
                                <CgWebsite className="text-5xl text-amber-500 bg-gray-700 rounded-lg p-2" />
                            </div>
                            <div className="h-full w-[80%] md:block sm:hidden belowSm:hidden flex items-center">
                                <p className="text-2xl text-gray-500 font-medium">Blog</p>
                            </div>
                        </div>
                    </Link>
                    <Link to='/dashboard/category'>
                        <div className="h-auto w-full p-1 flex justify-center bg-gray-800 rounded-lg my-2">
                            <div className="h-full w-[20%] flex justify-center">
                                <BiCategory className="text-5xl text-amber-500 bg-gray-700 rounded-lg p-2" />
                            </div>
                            <div className="h-full w-[80%] md:block sm:hidden belowSm:hidden flex items-center">
                                <p className="text-2xl text-gray-500 font-medium">Category</p>
                            </div>
                        </div>
                    </Link>
                    <Link to='/dashboard/comment'>
                        <div className="h-auto w-full p-1 flex justify-center bg-gray-800 rounded-lg my-2">
                            <div className="h-full w-[20%] flex justify-center">
                                <FaCommentAlt className="text-5xl text-amber-500 bg-gray-700 rounded-lg p-2" />
                            </div>
                            <div className="h-full w-[80%] md:block sm:hidden belowSm:hidden flex items-center">
                                <p className="text-2xl text-gray-500 font-medium">Comment</p>
                            </div>
                        </div>
                    </Link>
                    <Link to='/dashboard/announcement'>
                        <div className="h-auto w-full p-1 flex justify-center bg-gray-800 rounded-lg my-2">
                            <div className="h-full w-[20%] flex justify-center">
                                <FaBell className="text-5xl text-amber-500 bg-gray-700 rounded-lg p-2" />
                            </div>
                            <div className="md:block h-full w-[80%] sm:hidden belowSm:hidden flex items-center">
                                <p className="text-2xl text-gray-500 font-medium">Announcement</p>
                            </div>
                        </div>
                    </Link>

                </div>
                <div className="md:ml-[20%] md:w-[80%] sm:w-full belowSm:w-full">
                    <Outlet />
                </div>
            </div>
        </>
    )
}