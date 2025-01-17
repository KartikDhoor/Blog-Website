import NewsPanel from "./NewsPanel";
import { FiMessageCircle } from "react-icons/fi";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { LuArrowUpRight } from "react-icons/lu";

export default function News() {
    return (
        <>
            <div className="h-full w-full bg-pureblack">
                <div className="lg:h-[40vh] lg:w-full md:h-[40vh] md:w-full sm:h-[40vh] sm:w-full belowSm:h-[40vh] belowSm:w-full bg-dark1 flex items-center">
                    <div className="h-[25vh] w-[90%] mx-auto p-2 ">
                        <div className="h-[8vh] w-full text-5xl text-white font-medium">
                            <p>Today`s Headlines:Stay</p>
                        </div>
                        <div className="h-[10vh] w-full flex justify-center my-2">
                            <div className="h-full w-[20%] text-5xl text-white font-medium">
                                <p>Informed</p>
                            </div>
                            <div className="h-full w-[80%] text-base text-gray1 font-normal">
                                <p>Explore the latest news from around the world.We bring you Up-To-The-Minutes update on the most significant event,trend,Stories,Discover the word throught our News Coverage.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[50vh] w-full border-y border-gray-800">
                    <div className="h-full w-[90%] mx-auto flex justify-center">
                        <div className="h-full w-[40%] p-4">
                            <img src="https://picsum.photos/1920/1080" className="h-full w-full rounded-xl" />
                        </div>
                        <div className="h-full w-[60%] p-4">
                            <p className="text-2xl font-medium text-white my-4">Global Climate Summit Addresses Urgent Climate Action</p>
                            <p className="text-base font-normal text-gray1 my-4">world leader gathered at the global climate summit to discuss, urgent climate action,emission reduction,and renewable energy targets.</p>
                            <div className="h-[10vh] w-full flex justify-center my-4">
                                <div className="h-full w-[20%] text-base font-normal">
                                    <p className="text-gray1">Category</p>
                                    <p className="text-white">Enviroment</p>
                                </div>
                                <div className="h-full w-[20%]">
                                    <p className="text-gray1">Publication Date</p>
                                    <p className="text-white">Octuber 10,2025</p>
                                </div>
                                <div className="h-full w-[60%]">
                                    <p className="text-gray1">Author</p>
                                    <p className="text-white">Jane Smith</p>
                                </div>
                            </div>
                            <div className="h-[8vh] w-full flex justify-start gap-4 my-4">
                                <button className="h-[6vh] w-[10%] px-2 text-sm font-normal text-gray1 rounded-xl border border-gray-800 flex justify-center items-center">
                                    <FiMessageCircle className="text-gray-1" />
                                    <p>50</p>
                                </button>
                                <button className="h-[6vh] w-[10%] px-2 text-sm font-normal text-gray1 rounded-xl border border-gray-800 flex justify-center items-center">
                                    <PiPaperPlaneTiltBold className="text-gray-1" />
                                    <p>20</p>
                                </button>
                                <div className="h-[6vh] w-[80%] flex justify-end">
                                    <button className="px-4 py-2 text-base rounded-xl border border-gray-800 text-gray1">
                                        Read More
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[50vh] w-full border-y border-gray-800">
                    <div className="h-full w-[90%] mx-auto flex justify-center">
                        <div className="h-full w-[30%] p-4 flex items-center justify-center">
                            <div>
                                <div className="h-[25vh] w-full">
                                    <img src="https://picsum.photos/1920/1080" className="h-full w-full rounded-xl" />
                                </div>
                                <div className="h-[20vh] w-full text-white text-base">
                                    <p className="text-white">A Decisive Victory for Progressive Policies</p>
                                    <p className="text-gray1 text-sm">Policies</p>
                                    <div className="h-[8vh] w-full flex justify-start gap-4 my-4">
                                        <button className="h-[6vh] w-[20%] px-2 text-sm font-normal text-gray1 rounded-xl border border-gray-800 flex justify-center items-center">
                                            <FiMessageCircle className="text-gray-1" />
                                            <p>50</p>
                                        </button>
                                        <button className="h-[6vh] w-[20%] px-2 text-sm font-normal text-gray1 rounded-xl border border-gray-800 flex justify-center items-center">
                                            <PiPaperPlaneTiltBold className="text-gray-1" />
                                            <p>20</p>
                                        </button>
                                        <div className="h-[6vh] w-[60%] flex justify-end">
                                            <button className="px-4 py-2 text-base rounded-xl border border-gray-800 text-gray1">
                                                Read More
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-full w-[30%] p-4 flex items-center justify-center">
                            <div>
                                <div className="h-[25vh] w-full">
                                    <img src="https://picsum.photos/1920/1080" className="h-full w-full rounded-xl" />
                                </div>
                                <div className="h-[20vh] w-full text-white text-base">
                                    <p className="text-white">A Decisive Victory for Progressive Policies</p>
                                    <p className="text-gray1 text-sm">Policies</p>
                                    <div className="h-[8vh] w-full flex justify-start gap-4 my-4">
                                        <button className="h-[6vh] w-[20%] px-2 text-sm font-normal text-gray1 rounded-xl border border-gray-800 flex justify-center items-center">
                                            <FiMessageCircle className="text-gray-1" />
                                            <p>50</p>
                                        </button>
                                        <button className="h-[6vh] w-[20%] px-2 text-sm font-normal text-gray1 rounded-xl border border-gray-800 flex justify-center items-center">
                                            <PiPaperPlaneTiltBold className="text-gray-1" />
                                            <p>20</p>
                                        </button>
                                        <div className="h-[6vh] w-[60%] flex justify-end">
                                            <button className="px-4 py-2 text-base rounded-xl border border-gray-800 text-gray1">
                                                Read More
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-full w-[30%] flex items-center justify-center">
                            <div>
                                <div className="h-[25vh] w-full">
                                    <img src="https://picsum.photos/1920/1080" className="h-full w-full rounded-xl" />
                                </div>
                                <div className="h-[20vh] w-full text-white text-base">
                                    <p className="text-white">A Decisive Victory for Progressive Policies</p>
                                    <p className="text-gray1 text-sm">Policies</p>
                                    <div className="h-[8vh] w-full flex justify-start gap-4 my-4">
                                        <button className="h-[6vh] w-[20%] px-2 text-sm font-normal text-gray1 rounded-xl border border-gray-800 flex justify-center items-center">
                                            <FiMessageCircle className="text-gray-1" />
                                            <p>50</p>
                                        </button>
                                        <button className="h-[6vh] w-[20%] px-2 text-sm font-normal text-gray1 rounded-xl border border-gray-800 flex justify-center items-center">
                                            <PiPaperPlaneTiltBold className="text-gray-1" />
                                            <p>20</p>
                                        </button>
                                        <div className="h-[6vh] w-[60%] flex justify-end">
                                            <button className="px-4 py-2 text-base rounded-xl border border-gray-800 text-gray1">
                                                Read More
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:h-[40vh] lg:w-full md:h-[40vh] md:w-full sm:h-[50vh] sm:w-full belowSm:h-[50vh] belowSm:w-full belowSm:flex belowSm:items-center bg-dark1">
                    <div className="lg:h-full lg:w-[90%] lg:mx-auto lg:flex lg:justify-between lg:items-center
                                                        md:h-full md:w-[90%] md:mx-auto md:flex md:justify-between md:items-center
                                                        sm:h-[40vh] sm:w-[90%] sm:mx-auto sm:p-4
                                                        belowSm:h-[40vh] belowSm:w-[90%] belowSm:mx-auto belowSm:p-4">
                        <div className="lg:w-[80%] md:w-[80%] sm:w-full belowSm:w-full">
                            <button className=" bg-gray1 px-2 border rounded border-gray-800 text-base sm:text-sm belowSm:text-sm">
                                <p className="text-white">Featured Videos</p>
                            </button>
                            <p className="lg:text-5xl md:text-5xl sm:lg:text-4xl belowSm:text-4xl text-white font-medium">Visual Insight for the Modren Viewer</p>
                        </div>
                        <div className="lg:h-[8vh] lg:w-[15%] lg:flex lg:justify-end lg:items-center md:h-[8vh] md:w-[15%] md:flex md:justify-end md:items-center sm:h-[8vh] sm:w-full sm:flex sm:justify-center sm:items-center belowSm:h-[8vh] belowSm:w-full belowSm:flex belowSm:items-center belowSm:justify-center">
                            <button className="sm:w-full belowSm:w-full p-2 rounded bg-pureblack text-base font-normal text-gray1 flex justify-center"><p>View All</p><LuArrowUpRight className="text-xl text-amber-400" /></button>
                        </div>
                    </div>
                </div>
                <div className="h-[60vh] w-full border-y border-gray-800">
                    <div className="h-full w-[90%] mx-auto flex justify-center">
                        <div className="h-full w-[50%] border-r border-gray-800 p-6">
                            <div className="h-[40vh] w-full">
                                <img src="https://picsum.photos/1920/1080" className="h-full w-full rounded-xl" />
                            </div>
                            <div className="h-[10vh] w-full text-lg">
                                <p className="text-white font-medium">Mars Exploration:Unvaling Alien Landscape</p>
                                <p className="text-gray1 text-base font-normal">Embark on a journy through the red plent breating landscape and uncover the mister of Mars.</p>
                            </div>
                        </div>
                        <div className="h-full w-[50%] p-6">
                            <div className="h-[40vh] w-full">
                                <img src="https://picsum.photos/1920/1080" className="h-full w-full rounded-xl" />
                            </div>
                            <div className="h-[10vh] w-full text-lg">
                                <p className="text-white font-medium">Mars Exploration:Unvaling Alien Landscape</p>
                                <p className="text-gray1 text-base font-normal">Embark on a journy through the red plent breating landscape and uncover the mister of Mars.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[60vh] w-full border-y border-gray-800">
                    <div className="h-full w-[90%] mx-auto flex justify-center">
                        <div className="h-full w-[50%] border-r border-gray-800 p-6">
                            <div className="h-[40vh] w-full">
                                <img src="https://picsum.photos/1920/1080" className="h-full w-full rounded-xl" />
                            </div>
                            <div className="h-[10vh] w-full text-lg">
                                <p className="text-white font-medium">Mars Exploration:Unvaling Alien Landscape</p>
                                <p className="text-gray1 text-base font-normal">Embark on a journy through the red plent breating landscape and uncover the mister of Mars.</p>
                            </div>
                        </div>
                        <div className="h-full w-[50%] p-6">
                            <div className="h-[40vh] w-full">
                                <img src="https://picsum.photos/1920/1080" className="h-full w-full rounded-xl" />
                            </div>
                            <div className="h-[10vh] w-full text-lg">
                                <p className="text-white font-medium">Mars Exploration:Unvaling Alien Landscape</p>
                                <p className="text-gray1 text-base font-normal">Embark on a journy through the red plent breating landscape and uncover the mister of Mars.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <NewsPanel />
            </div>
        </>
    )
}