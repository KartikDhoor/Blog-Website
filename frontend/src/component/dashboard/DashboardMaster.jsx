import { Link, Outlet } from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { BiCategory } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { FaCommentAlt } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { FaBell } from "react-icons/fa";



export default function DashboardMaster(){
    return(
        <>
        <div className="h-auto w-full relative flex">
            <div className="h-screen fixed w-[20%] bg-dark1 p-2">
                <div className="h-auto w-full p-2 flex justify-center">
                    <div className="h-full w-[80%] ">
                    <p className="text-2xl text-gray1 font-medium ">blog Website</p>
                    </div>
                    <div className="h-full w-[20%] flex justify-center">
                        <IoMdCloseCircleOutline className="text-4xl text-amber-700 bg-gray-700 rounded-lg"/>
                    </div>
                </div>
                <Link to='/dashboard'>
                <div className="h-auto w-full p-1 flex justify-center bg-gray-800 rounded-lg my-2">
                    <div className="h-full w-[20%] flex justify-center">
                        <FaHome className="text-5xl text-amber-500 bg-gray-700 rounded-lg p-2"/>
                    </div>
                    <div className="h-full w-[80%] flex items-center">
                        <p className="text-2xl text-gray-500 font-medium">Home</p>
                    </div>
                </div>
                </Link>
                <Link to='/dashboard/user'>
                <div className="h-auto w-full p-1 flex justify-center bg-gray-800 rounded-lg my-2">
                    <div className="h-full w-[20%] flex justify-center">
                        <BsFillPersonFill className="text-5xl text-amber-500 bg-gray-700 rounded-lg p-2"/>
                    </div>
                    <div className="h-full w-[80%] flex items-center">
                        <p className="text-2xl text-gray-500 font-medium">Users</p>
                    </div>
                </div>
                </Link>
                <Link to='/dashboard/blog'>
                <div className="h-auto w-full p-1 flex justify-center bg-gray-800 rounded-lg my-2">
                    <div className="h-full w-[20%] flex justify-center">
                        <CgWebsite className="text-5xl text-amber-500 bg-gray-700 rounded-lg p-2"/>
                    </div>
                    <div className="h-full w-[80%] flex items-center">
                        <p className="text-2xl text-gray-500 font-medium">Blog</p>
                    </div>
                </div>
                </Link>
                <Link to='/dashboard/category'>
                <div className="h-auto w-full p-1 flex justify-center bg-gray-800 rounded-lg my-2">
                    <div className="h-full w-[20%] flex justify-center">
                        <BiCategory className="text-5xl text-amber-500 bg-gray-700 rounded-lg p-2"/>
                    </div>
                    <div className="h-full w-[80%] flex items-center">
                        <p className="text-2xl text-gray-500 font-medium">Category</p>
                    </div>
                </div>
                </Link>
                <Link to='/dashboard/comment'>
                <div className="h-auto w-full p-1 flex justify-center bg-gray-800 rounded-lg my-2">
                    <div className="h-full w-[20%] flex justify-center">
                        <FaCommentAlt className="text-5xl text-amber-500 bg-gray-700 rounded-lg p-2"/>
                    </div>
                    <div className="h-full w-[80%] flex items-center">
                        <p className="text-2xl text-gray-500 font-medium">Comment</p>
                    </div>
                </div>
                </Link>
                <Link to='/dashboard/like'>
                <div className="h-auto w-full p-1 flex justify-center bg-gray-800 rounded-lg my-2">
                    <div className="h-full w-[20%] flex justify-center">
                        <AiFillLike className="text-5xl text-amber-500 bg-gray-700 rounded-lg p-2"/>
                    </div>
                    <div className="h-full w-[80%] flex items-center">
                        <p className="text-2xl text-gray-500 font-medium">Like</p>
                    </div>
                </div>
                </Link>
                <Link to='/dashboard/announcement'>
                <div className="h-auto w-full p-1 flex justify-center bg-gray-800 rounded-lg my-2">
                    <div className="h-full w-[20%] flex justify-center">
                        <FaBell className="text-5xl text-amber-500 bg-gray-700 rounded-lg p-2"/>
                    </div>
                    <div className="h-full w-[80%] flex items-center">
                        <p className="text-2xl text-gray-500 font-medium">Announcement</p>
                    </div>
                </div>
                </Link>

            </div>
            <div className="ml-[20%] w-[80%]">
            <Outlet />
            </div>
        </div>
        </>
    )
}