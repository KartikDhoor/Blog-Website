import { LuArrowUpRight } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { PiPaperPlaneTiltBold } from "react-icons/pi";

export default function NewsPanel(){
    return(
        <>
        <div className="h-full w-full bg-pureblack">
                            <div className="h-[30vh] w-full bg-dark1">
                                <div className="h-full w-[90%] mx-auto flex justify-between flex items-center">
                                    <div className=" w-[80%] p-6">
                                        <button className=" bg-gray1 px-2 border rounded border-gray-800">
                                            <p className="text-white">Unlock the Power of</p>
                                        </button>
                                        <p className="text-5xl text-white font-medium">FutureTech Feature</p>
                                    </div>
                                    <div className="w[20%] flex items-center">
                                        <div className="p-2 rounded bg-pureblack text-base font-normal text-gray1 flex justify-center"><p>View All Blogs</p><LuArrowUpRight className="text-xl text-amber-400" /></div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[10vh] w-full border-y border-gray-800">
                                <div className="h-full w-[90%] mx-auto flex justify-around items-center gap-2">
                                    <div className="h-[6vh] w-[15%] rounded border border-gray-800 ">
                                        <p className="text-center text-base font-normal text-gray1 py-2 bg-dark1">All</p>
                                    </div>
                                    <div className="h-[6vh] w-[15%] rounded border border-gray-800 ">
                                        <p className="text-center text-base font-normal text-gray1 py-2">Quantam Computing</p>
                                    </div>
                                    <div className="h-[6vh] w-[15%] rounded border border-gray-800 ">
                                        <p className="text-center text-base font-normal text-gray1 py-2">All Ethics</p>
                                    </div>
                                    <div className="h-[6vh] w-[15%] rounded border border-gray-800 ">
                                        <p className="text-center text-base font-normal text-gray1 py-2">Space Exploration</p>
                                    </div>
                                    <div className="h-[6vh] w-[15%] rounded border border-gray-800 ">
                                        <p className="text-center text-base font-normal text-gray1 py-2">Biotechnology</p>
                                    </div>
                                    <div className="h-[6vh] w-[15%] rounded border border-gray-800">
                                        <p className="text-center text-base font-normal text-gray1 py-2">Renewable Energy</p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[90vh] w-full">
                                <div className="h-[30vh] w-full border-y border-gray-800 ">
                                    <div className="h-full w-[90%] mx-auto flex justify-center">
                                        <div className="h-full w-[25%] flex items-center">
                                            <div className="h-[8vh] w-full flex justify-center">
                                                <div className="h-full w-[20%]">
                                                    <img src="https://picsum.photos/1920/1080" className="h-full w-[90%] rounded-full" />
                                                </div>
                                                <div className="h-full w-[60%]">
                                                    <p className="text-white text-base font-normal">John Techson</p>
                                                    <p className="text-gray1 font-normal text-sm ">Quantam Computing</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-full w-[55%] flex items-center">
                                            <div className="text-gray1 font-normal ">
                                                <p className="my-2 font-medium">October 15,2023</p>
                                                <p className="text-white text-xl font-medium">The Quantum leap in the Computing</p>
                                                <p className="line-clamp-1">Explore the revolution in Quantum computing,its Applications,and its potential impact on various industries.</p>
                                                <div className="h-[5vh] my-1 w-full flex justify-start gap-4 ">
                                                    <button className="px-2 text-sm font-normal text-gray1 rounded-xl border border-gray-800 flex justify-center items-center">
                                                        <FaHeart className="text-amber-400" />
                                                        <p>24.5K</p>
                                                    </button>
                                                    <button className="px-2 text-sm font-normal text-gray1 rounded-xl border border-gray-800 flex justify-center items-center">
                                                        <FiMessageCircle className="text-gray-1" />
                                                        <p>50</p>
                                                    </button>
                                                    <button className="px-2 text-sm font-normal text-gray1 rounded-xl border border-gray-800 flex justify-center items-center">
                                                        <PiPaperPlaneTiltBold className="text-gray-1" />
                                                        <p>20</p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-full w-[15%] flex items-center justify-end">
        
                                            <div className="p-2 rounded bg-dark1 text-base font-normal text-gray1 flex justify-center">
                                                <p>View All Blogs</p>
                                                <LuArrowUpRight className="text-xl text-amber-400" />
                                            </div>
        
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[30vh] w-full border-y border-gray-800 ">
                                    <div className="h-full w-[90%] mx-auto flex justify-center">
                                        <div className="h-full w-[25%] flex items-center">
                                            <div className="h-[8vh] w-full flex justify-center">
                                                <div className="h-full w-[20%]">
                                                    <img src="https://picsum.photos/1920/1080" className="h-full w-[90%] rounded-full" />
                                                </div>
                                                <div className="h-full w-[60%]">
                                                    <p className="text-white text-base font-normal">John Techson</p>
                                                    <p className="text-gray1 font-normal text-sm ">Quantam Computing</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-full w-[55%] flex items-center">
                                            <div className="text-gray1 font-normal ">
                                                <p className="my-2 font-medium">October 15,2023</p>
                                                <p className="text-white text-xl font-medium">The Quantum leap in the Computing</p>
                                                <p className="line-clamp-1">Explore the revolution in Quantum computing,its Applications,and its potential impact on various industries.</p>
                                                <div className="h-[5vh] my-1 w-full flex justify-start gap-4 ">
                                                    <button className="px-2 text-sm font-normal text-gray1 rounded-xl border border-gray-800 flex justify-center items-center">
                                                        <FaHeart className="text-amber-400" />
                                                        <p>24.5K</p>
                                                    </button>
                                                    <button className="px-2 text-sm font-normal text-gray1 rounded-xl border border-gray-800 flex justify-center items-center">
                                                        <FiMessageCircle className="text-gray-1" />
                                                        <p>50</p>
                                                    </button>
                                                    <button className="px-2 text-sm font-normal text-gray1 rounded-xl border border-gray-800 flex justify-center items-center">
                                                        <PiPaperPlaneTiltBold className="text-gray-1" />
                                                        <p>20</p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-full w-[15%] flex items-center justify-end">
        
                                            <div className="p-2 rounded bg-dark1 text-base font-normal text-gray1 flex justify-center">
                                                <p>View All Blogs</p>
                                                <LuArrowUpRight className="text-xl text-amber-400" />
                                            </div>
        
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[30vh] w-full border-y border-gray-800 ">
                                    <div className="h-full w-[90%] mx-auto flex justify-center">
                                        <div className="h-full w-[25%] flex items-center">
                                            <div className="h-[8vh] w-full flex justify-center">
                                                <div className="h-full w-[20%]">
                                                    <img src="https://picsum.photos/1920/1080" className="h-full w-[90%] rounded-full" />
                                                </div>
                                                <div className="h-full w-[60%]">
                                                    <p className="text-white text-base font-normal">John Techson</p>
                                                    <p className="text-gray1 font-normal text-sm ">Quantam Computing</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-full w-[55%] flex items-center">
                                            <div className="text-gray1 font-normal ">
                                                <p className="my-2 font-medium">October 15,2023</p>
                                                <p className="text-white text-xl font-medium">The Quantum leap in the Computing</p>
                                                <p className="line-clamp-1">Explore the revolution in Quantum computing,its Applications,and its potential impact on various industries.</p>
                                                <div className="h-[5vh] my-1 w-full flex justify-start gap-4 ">
                                                    <button className="px-2 text-sm font-normal text-gray1 rounded-xl border border-gray-800 flex justify-center items-center">
                                                        <FaHeart className="text-amber-400" />
                                                        <p>24.5K</p>
                                                    </button>
                                                    <button className="px-2 text-sm font-normal text-gray1 rounded-xl border border-gray-800 flex justify-center items-center">
                                                        <FiMessageCircle className="text-gray-1" />
                                                        <p>50</p>
                                                    </button>
                                                    <button className="px-2 text-sm font-normal text-gray1 rounded-xl border border-gray-800 flex justify-center items-center">
                                                        <PiPaperPlaneTiltBold className="text-gray-1" />
                                                        <p>20</p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-full w-[15%] flex items-center justify-end">
        
                                            <div className="p-2 rounded bg-dark1 text-base font-normal text-gray1 flex justify-center">
                                                <p>View All Blogs</p>
                                                <LuArrowUpRight className="text-xl text-amber-400" />
                                            </div>
        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        </>
    )
}