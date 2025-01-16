import { LuArrowUpRight } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { PiPaperPlaneTiltBold } from "react-icons/pi";

export default function NewsPanel() {
    return (
        <>
            <div className="h-full w-full bg-pureblack">
                <div className="lg:h-[30vh] lg:w-full md:h-[30vh] md:w-full sm:h-[30vh] sm:w-full belowSm:h-[40vh] belowSm:w-full bg-dark1">
                    <div className="lg:h-full lg:w-[90%] lg:mx-auto lg:flex lg:justify-between lg:items-center md:h-full md:w-[90%] md:mx-auto md:flex md:justify-between md:items-center sm:h-full sm:w-[90%] sm:mx-auto sm:px-4 sm:flex sm:items-center sm:flex-wrap belowSm:h-full belowSm:w-[90%] belowSm:mx-auto belowSm:px-4 belowSm:flex belowSm:items-center belowSm:flex-wrap">
                        <div className="lg:w-[85%] md:w-[85%] sm:w-full belowSm:w-full b">
                            <button className="bg-gray1 px-2 border rounded border-gray-800">
                                <p className="text-white">Unlock the Power of</p>
                            </button>
                            <p className="text-5xl text-white font-medium">FutureTech Feature</p>
                        </div>
                        <div className="lg:h-[8vh] lg:w-[15%] lg:flex lg:justify-end lg:items-center md:h-[8vh] md:w-[15%] md:flex md:justify-end md:items-center sm:h-[8vh] sm:w-full sm:flex sm:justify-center sm:items-center belowSm:h-[8vh] belowSm:w-full belowSm:flex belowSm:items-center belowSm:justify-center">
                            <button className="sm:w-full belowSm:w-full p-2 rounded bg-pureblack text-base font-normal text-gray1 flex justify-center"><p>View All Blogs</p><LuArrowUpRight className="text-xl text-amber-400" /></button>
                        </div>
                    </div>
                </div>
                <div className="lg:h-[10vh] lg:w-full md:h-[10vh] md:w-full sm:h-[10vh] sm:w-full belowSm:h-[10vh] belowSm:w-full border-y border-gray-800">
                    <div className="lg:h-full lg:w-[90%] lg:mx-auto md:h-full md:w-[90%] md:mx-auto sm:h-full sm:w-full belowSm:h-full belowSm:w-full flex justify-around items-center gap-2">
                        <div className="lg:h-[6vh] lg:w-[15%] md:h-[6vh] md:w-[15%] sm:h-[6vh] sm:w-[25%] belowSm:h-[6vh] belowSm:w-[50%] rounded border border-gray-800 ">
                            <p className="text-center text-base sm:text-sm belowSm:text-sm h-full font-normal text-gray1 py-2 bg-dark1">All</p>
                        </div>
                        <div className="lg:h-[6vh] lg:w-[15%] md:h-[6vh] md:w-[15%] sm:h-[6vh] sm:w-[25%] belowSm:h-[6vh] belowSm:w-[50%] rounded border border-gray-800 ">
                            <p className="text-center text-base font-normal text-gray1 py-2">Quantam Computing</p>
                        </div>
                        <div className="lg:h-[6vh] lg:w-[15%] md:h-[6vh] md:w-[15%] sm:h-[6vh] sm:w-[25%] lg:block md:block belowSm:hidden rounded border border-gray-800 ">
                            <p className="text-center text-base font-normal text-gray1 py-2">All Ethics</p>
                        </div>
                        <div className="lg:h-[6vh] lg:w-[15%] md:h-[6vh] md:w-[15%] sm:h-[6vh] sm:w-[25%] lg:block md:block belowSm:hidden rounded border border-gray-800 ">
                            <p className="text-center text-base font-normal text-gray1 py-2">Space Exploration</p>
                        </div>
                        <div className="lg:h-[6vh] lg:w-[15%] md:h-[6vh] md:w-[15%] lg:block md:block sm:hidden belowSm:hidden rounded border border-gray-800 ">
                            <p className="text-center text-base font-normal text-gray1 py-2">Biotechnology</p>
                        </div>
                        <div className="lg:h-[6vh] lg:w-[15%] md:h-[6vh] md:w-[15%] lg:block md:block sm:hidden belowSm:hidden rounded border border-gray-800">
                            <p className="text-center text-base font-normal text-gray1 py-2">Renewable Energy</p>
                        </div>
                    </div>
                </div>
                <div className="lg:h-[90vh] lg:w-full md:h-[90vh] md:w-full sm:h-full sm:w-full belowSm:h-full belowSm:w-full">
                    <div className="lg:h-[30vh] lg:w-full md:h-[30vh] md:w-full sm:h-[40vh] sm:w-full belowSm:h-[40vh] belowSm:w-full border-y border-gray-800 ">
                        <div className="lg:h-full lg:w-[90%] lg:mx-auto lg:flex lg:justify-center
                                                    md:h-full md:w-[90%] md:mx-auto md:flex md:justify-center
                                                    sm:h-full sm:w-[90%] sm:mx-auto sm:py-6
                                                    belowSm:h-full belowSm:w-[90%] belowSm:mx-auto belowSm:py-6 ">
                            <div className="lg:h-full lg:w-[25%] lg:flex lg:items-center
                                                        md:h-full md:w-[25%] md:flex md:items-center
                                                        sm:h-[10vh] sm:w-full sm:flex sm:items-center
                                                        belowSm:h-[10vh] belowSm:w-full belowSm:flex belowSm:items-center">
                                <div className="lg:h-[8vh] lg:w-full lg:flex lg:justify-center
                                                            md:h-[8vh] md:w-full md:flex md:justify-center
                                                            sm:h-full sm:w-full sm:flex sm:justify-center
                                                            belowSm:h-full belowSm:w-full belowSm:flex belowSm:justify-center">
                                    <div className="lg:h-full lg:w-[20%] md:h-full md:w-[20%] sm:h-full sm:w-[20%] belowSm:h-full belowSm:w-[20%]">
                                        <img src="https://picsum.photos/1920/1080" className="h-full w-[90%] rounded-full" />
                                    </div>
                                    <div className="lg:h-full lg:w-[60%] md:h-full md:w-[60%] sm:h-full sm:w-[60%] belowSm:h-full belowSm:w-[60%]">
                                        <p className="text-white text-base font-normal">John Techson</p>
                                        <p className="text-gray1 font-normal text-sm ">Quantam Computing</p>
                                    </div>
                                    <div className="lg:hidden md:hidden sm:block belowSm:block ">
                                        <div className="p-2 rounded bg-dark1 text-base font-normal text-gray1 flex justify-center">
                                            <p>View Blogs</p>
                                            <LuArrowUpRight className="text-xl text-amber-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:h-full lg:w-[55%] lg:flex lg:items-center
                                            md:h-full md:w-[55%] md:flex md:items-center
                                            sm:h-[20vh] sm:w-full sm:flex sm:items-center
                                            belowSm:h-[20vh] belowSm:w-full belowSm:flex belowSm:items-center
                                            ">
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
                            <div className="lg:h-full lg:w-[15%] lg:flex lg:items-center lg:justify-end lg:block
                                            md:h-full md:w-[15%] md:flex md:items-center md:justify-end md:block
                                            sm:hidden
                                            belowSm:hidden">
                                <div className="p-2 rounded bg-dark1 text-base font-normal text-gray1 flex justify-center">
                                    <p>View All Blogs</p>
                                    <LuArrowUpRight className="text-xl text-amber-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:h-[30vh] lg:w-full md:h-[30vh] md:w-full sm:h-[40vh] sm:w-full belowSm:h-[40vh] belowSm:w-full border-y border-gray-800 ">
                        <div className="lg:h-full lg:w-[90%] lg:mx-auto lg:flex lg:justify-center
                                                    md:h-full md:w-[90%] md:mx-auto md:flex md:justify-center
                                                    sm:h-full sm:w-[90%] sm:mx-auto sm:py-6
                                                    belowSm:h-full belowSm:w-[90%] belowSm:mx-auto belowSm:py-6 ">
                            <div className="lg:h-full lg:w-[25%] lg:flex lg:items-center
                                                        md:h-full md:w-[25%] md:flex md:items-center
                                                        sm:h-[10vh] sm:w-full sm:flex sm:items-center
                                                        belowSm:h-[10vh] belowSm:w-full belowSm:flex belowSm:items-center">
                                <div className="lg:h-[8vh] lg:w-full lg:flex lg:justify-center
                                                            md:h-[8vh] md:w-full md:flex md:justify-center
                                                            sm:h-full sm:w-full sm:flex sm:justify-center
                                                            belowSm:h-full belowSm:w-full belowSm:flex belowSm:justify-center">
                                    <div className="lg:h-full lg:w-[20%] md:h-full md:w-[20%] sm:h-full sm:w-[20%] belowSm:h-full belowSm:w-[20%]">
                                        <img src="https://picsum.photos/1920/1080" className="h-full w-[90%] rounded-full" />
                                    </div>
                                    <div className="lg:h-full lg:w-[60%] md:h-full md:w-[60%] sm:h-full sm:w-[60%] belowSm:h-full belowSm:w-[60%]">
                                        <p className="text-white text-base font-normal">John Techson</p>
                                        <p className="text-gray1 font-normal text-sm ">Quantam Computing</p>
                                    </div>
                                    <div className="lg:hidden md:hidden sm:block belowSm:block ">
                                        <div className="p-2 rounded bg-dark1 text-base font-normal text-gray1 flex justify-center">
                                            <p>View Blogs</p>
                                            <LuArrowUpRight className="text-xl text-amber-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:h-full lg:w-[55%] lg:flex lg:items-center
                                            md:h-full md:w-[55%] md:flex md:items-center
                                            sm:h-[20vh] sm:w-full sm:flex sm:items-center
                                            belowSm:h-[20vh] belowSm:w-full belowSm:flex belowSm:items-center
                                            ">
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
                            <div className="lg:h-full lg:w-[15%] lg:flex lg:items-center lg:justify-end lg:block
                                            md:h-full md:w-[15%] md:flex md:items-center md:justify-end md:block
                                            sm:hidden
                                            belowSm:hidden">
                                <div className="p-2 rounded bg-dark1 text-base font-normal text-gray1 flex justify-center">
                                    <p>View All Blogs</p>
                                    <LuArrowUpRight className="text-xl text-amber-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:h-[30vh] lg:w-full md:h-[30vh] md:w-full sm:h-[40vh] sm:w-full belowSm:h-[40vh] belowSm:w-full border-y border-gray-800 ">
                        <div className="lg:h-full lg:w-[90%] lg:mx-auto lg:flex lg:justify-center
                                                    md:h-full md:w-[90%] md:mx-auto md:flex md:justify-center
                                                    sm:h-full sm:w-[90%] sm:mx-auto sm:py-6
                                                    belowSm:h-full belowSm:w-[90%] belowSm:mx-auto belowSm:py-6 ">
                            <div className="lg:h-full lg:w-[25%] lg:flex lg:items-center
                                                        md:h-full md:w-[25%] md:flex md:items-center
                                                        sm:h-[10vh] sm:w-full sm:flex sm:items-center
                                                        belowSm:h-[10vh] belowSm:w-full belowSm:flex belowSm:items-center">
                                <div className="lg:h-[8vh] lg:w-full lg:flex lg:justify-center
                                                            md:h-[8vh] md:w-full md:flex md:justify-center
                                                            sm:h-full sm:w-full sm:flex sm:justify-center
                                                            belowSm:h-full belowSm:w-full belowSm:flex belowSm:justify-center">
                                    <div className="lg:h-full lg:w-[20%] md:h-full md:w-[20%] sm:h-full sm:w-[20%] belowSm:h-full belowSm:w-[20%]">
                                        <img src="https://picsum.photos/1920/1080" className="h-full w-[90%] rounded-full" />
                                    </div>
                                    <div className="lg:h-full lg:w-[60%] md:h-full md:w-[60%] sm:h-full sm:w-[60%] belowSm:h-full belowSm:w-[60%]">
                                        <p className="text-white text-base font-normal">John Techson</p>
                                        <p className="text-gray1 font-normal text-sm ">Quantam Computing</p>
                                    </div>
                                    <div className="lg:hidden md:hidden sm:block belowSm:block ">
                                        <div className="p-2 rounded bg-dark1 text-base font-normal text-gray1 flex justify-center">
                                            <p>View Blogs</p>
                                            <LuArrowUpRight className="text-xl text-amber-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:h-full lg:w-[55%] lg:flex lg:items-center
                                            md:h-full md:w-[55%] md:flex md:items-center
                                            sm:h-[20vh] sm:w-full sm:flex sm:items-center
                                            belowSm:h-[20vh] belowSm:w-full belowSm:flex belowSm:items-center
                                            ">
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
                            <div className="lg:h-full lg:w-[15%] lg:flex lg:items-center lg:justify-end lg:block
                                            md:h-full md:w-[15%] md:flex md:items-center md:justify-end md:block
                                            sm:hidden
                                            belowSm:hidden">
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