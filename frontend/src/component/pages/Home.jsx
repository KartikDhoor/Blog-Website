import Hero from "./Hero";
import { HiUserGroup } from "react-icons/hi2";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { GiWireframeGlobe } from "react-icons/gi";
import { RiArticleFill } from "react-icons/ri";
import { FaPencilRuler } from "react-icons/fa";
import { LuArrowUpRight } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { PiBookBookmarkFill } from "react-icons/pi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import NewsPanel from "./NewsPanel";


export default function Home() {
    return (
        <>
            <div className="h-full w-full bg-pureblack m-0 p-0">
                <Hero />
                <div className="lg:h-full lg:w-full border-y border-gray-800 md:h-full md:w-full sm:h-full sm:w-full">
                    <div className="lg:h-full lg:w-[90%] md:h-full md-full sm:h-full sm:w-full mx-auto lg:flex lg:justify-center md:flex md:justify-center">
                        <div className="lg:h-[40vh] lg:w-[30%] lg:py-4 lg:px-8 flex items-center md:h-[40vh] md:w-[-30%] md:py-4 md:px-8 sm:h-[30vh]  sm:w-full sm:py-4 sm:px-8 sm:border-y sm:border-gray-800 belowSm:h-[30vh] belowSm:w-full belowSm:py-4 belowSm:px-8 belowSm:border-y belowSm:border-gray-800">
                            <div className="h-auto w-full">
                                <RiArticleFill className="text-amber-400 text-6xl " />
                                <div className="h-[10vh] w-full flex justify-center">
                                    <div className="h-full w-[80%]">
                                        <p className="text-2xl text-white">Latest News Updates</p>
                                        <p className="text-base font-normal text-gray1">Stay Current</p>
                                    </div>
                                    <div className="h-full w-[20%]">
                                        <BsArrowUpRightCircleFill className="text-5xl text-amber-400" />
                                    </div>
                                </div>
                                <div className="h-auto w-full">
                                    <p className="text-base font-normal text-gray1">over 1000 articles published monthly </p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:h-[40vh] lg:w-[30%] lg:py-4 lg:px-8 lg:border-x lg:border-gray-800 flex items-center md:h-[40vh] md:w-[-30%] md:py-4 md:px-8 md:border-x md:border-gray-800 sm:h-[30vh] sm:w-full sm:py-4 sm:px-8 sm:border-y sm:border-gray-800 belowSm:h-[30vh] belowSm:w-full belowSm:py-4 belowSm:px-8 belowSm:border-y belowSm:border-gray-800">
                            <div className="h-[25vh] w-full">
                                <HiUserGroup className="text-amber-400 text-6xl " />
                                <div className="h-[10vh] w-full flex justify-center">
                                    <div className="h-full w-[80%]">
                                        <p className="text-2xl text-white">Expert Contributors</p>
                                        <p className="text-base font-normal text-gray1">Trusted Insights</p>
                                    </div>
                                    <div className="h-full w-[20%]">
                                        <BsArrowUpRightCircleFill className="text-5xl text-amber-400" />
                                    </div>
                                </div>
                                <div className="h-[5vh] w-full">
                                    <p className="text-base font-normal text-gray1">50+ renowned AI Expert on our team</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:h-[40vh] lg:w-[30%] lg:py-4 lg:px-8 flex items-center md:h-[40vh] md:w-[-30%] md:py-4 md:px-8 sm:h-[30vh] sm:w-full sm:py-4 sm:px-8 sm:border-y sm:border-gray-800 belowSm:h-[30vh] belowSm:w-full belowSm:py-4 belowSm:px-8 belowSm:border-y belowSm:border-gray-800">
                            <div className="h-[28vh] w-full">
                                <GiWireframeGlobe className="text-amber-400 text-6xl " />
                                <div className="h-[10vh] w-full flex justify-center">
                                    <div className="h-full w-[80%]">
                                        <p className="text-2xl text-white">Global Readership</p>
                                        <p className="text-base font-normal text-gray1">worldwide Inpact</p>
                                    </div>
                                    <div className="h-full w-[20%]">
                                        <BsArrowUpRightCircleFill className="text-5xl text-amber-400" />
                                    </div>
                                </div>
                                <div className="h-[5vh] w-full">
                                    <p className="text-base font-normal text-gray1">2million montly readers</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="h-full w-full">
                    <div className="h-[30vh] w-full bg-dark1 ">
                        <div className="h-[30vh] w-[90%] mx-auto flex items-center">
                            <div className="p-6">
                                <button className=" bg-gray1 px-2 border rounded border-gray-800">
                                    <p className="text-white">Unlock the Power of</p>
                                </button>
                                <p className="text-5xl sm:text-4xl belowSm:text-3xl text-white font-medium">FutureTech Feature</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:h-[50vh] lg:w-full border-y border-gray-800 sm:h-[100vh] md:h-[50vh] md:w-full sm:w-full sm:border-y sm:border-gray-800">
                        <div className="lg:h-full lg:w-[90%] lg:mx-auto lg:flex lg:justify-center md:h-full md:w-full md:flex md:justify-center sm:h-full sm:w-full">
                            <div className="lg:h-full lg:w-[40%] lg:border-r lg:border-gray-800 lg:flex lg:items-center p-4 md:h-full md:w-[40%] md:border-r md:border-gray-800 md:flex md:items-center sm:h-[30vh] sm:w-[90%] sm:mx-auto sm:flex sm:items-center sm:border-y sm:border-gray-800 belowSm:h-[30vh] belowSm:w-full belowSm:px-8 belowSm:flex belowSm:items-center belowSm:border-y belowSm:border-gray-800">
                                <div>
                                    <FaPencilRuler className="text-6xl belowSm:text-5xl text-amber-400" />
                                    <p className="text-4xl belowSm:text-3xl text-white font-medium my-1">Future Technology Blog</p>
                                    <p className="text-base font-normal text-gray1">stayed informed with our blog section dedicated to the future technology</p>
                                </div>
                            </div>
                            <div className="lg:h-full lg:w-[60%] lg:grid lg:grid-cols-2 lg:gap-4 p-7 md:h-full md:w-[60%] md:grid md:grid-cols-2 md:gap-4 sm:h-[70vh] sm:w-full sm:grid sm:grid-cols-1 md:gap-y-2 sm:border-y sm:border-gray-800 belowSm:h-[70vh] belowSm:w-full belowSm:grid belowSm:grid-cols-1 belowSm:gap-y-2 belowSm:border-y belowSm:border-gray-800">
                                <div className="lg:h-[15vh] lg:w-full rounded bg-dark1 p-4 border border-gray-800 md:h-[15vh] md:w-full sm:h-[12vh] sm:w-[90%] sm:mx-auto">
                                    <p className="text-xl font-normal text-white">Quantity</p>
                                    <p className="text-sm text-gray1">Over 1000, articles on emerging tech trends and breakthoughts</p>
                                </div>
                                <div className="lg:h-[15vh] lg:w-full rounded bg-dark1 p-4 border border-gray-800 md:h-[15vh] md:w-full sm:h-[12vh] sm:w-[90%] sm:mx-auto">
                                    <p className="text-xl font-normal text-white">Variet</p>
                                    <p className="text-sm text-gray1">Articles cover Field like AI,robotics,Biotechology and more</p>
                                </div>
                                <div className="hlg:h-[15vh] lg:w-full rounded bg-dark1 p-4 border border-gray-800 md:h-[15vh] md:w-full sm:h-[12vh] sm:w-[90%] sm:mx-auto">
                                    <p className="text-xl font-normal text-white">Frequency</p>
                                    <p className="text-sm text-gray1">Fresh Content Added daily to keep you up to date</p>
                                </div>
                                <div className="lg:h-[15vh] lg:w-full rounded bg-dark1 p-4 border border-gray-800 md:h-[15vh] md:w-full sm:h-[12vh] sm:w-[90%] sm:mx-auto">
                                    <p className="text-xl font-normal text-white">Authoritative</p>
                                    <p className="text-sm text-gray1">writen by over team of tech experts and industry professionals</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:h-[50vh] lg:w-full border-y border-gray-800 sm:h-[100vh] md:h-[50vh] md:w-full sm:w-full sm:border-y sm:border-gray-800">
                        <div className="lg:h-full lg:w-[90%] lg:mx-auto lg:flex lg:justify-center md:h-full md:w-full md:flex md:justify-center sm:h-full sm:w-full">
                            <div className="lg:h-full lg:w-[40%] lg:border-r lg:border-gray-800 lg:flex lg:items-center p-4 md:h-full md:w-[40%] md:border-r md:border-gray-800 md:flex md:items-center sm:h-[30vh] sm:w-[90%] sm:mx-auto sm:flex sm:items-center sm:border-y sm:border-gray-800 belowSm:h-[30vh] belowSm:w-full belowSm:px-8 belowSm:flex belowSm:items-center belowSm:border-y belowSm:border-gray-800">
                                <div>
                                    <FaPencilRuler className="text-6xl  belowSm:text-5xl text-amber-400" />
                                    <p className="text-4xl belowSm:text-3xl text-white font-medium my-1">Research Insight blogs</p>
                                    <p className="text-base font-normal text-gray1">Dive deep into the future every technology concept with in the research section</p>
                                </div>
                            </div>
                            <div className="lg:h-full lg:w-[60%] lg:grid lg:grid-cols-2 lg:gap-4 p-7 md:h-full md:w-[60%] md:grid md:grid-cols-2 md:gap-4 sm:h-[70vh] sm:w-full sm:grid sm:grid-cols-1 md:gap-y-2 sm:border-y sm:border-gray-800 belowSm:h-[70vh] belowSm:w-full belowSm:grid belowSm:grid-cols-1 belowSm:gap-y-2 belowSm:border-y belowSm:border-gray-800">
                                <div className="lg:h-[15vh] lg:w-full rounded bg-dark1 p-4 border border-gray-800 md:h-[15vh] md:w-full sm:h-[12vh] sm:w-[90%] sm:mx-auto">
                                    <p className="text-xl font-normal text-white">Depth</p>
                                    <p className="text-sm text-gray1">500+ research articles for n-depth understanding</p>
                                </div>
                                <div className="lg:h-[15vh] lg:w-full rounded bg-dark1 p-4 border border-gray-800 md:h-[15vh] md:w-full sm:h-[12vh] sm:w-[90%] sm:mx-auto">
                                    <p className="text-xl font-normal text-white">Graphic</p>
                                    <p className="text-sm text-gray1">Visual aids and infographics to enhance Comprehension</p>
                                </div>
                                <div className="lg:h-[15vh] lg:w-full rounded bg-dark1 p-4 border border-gray-800 md:h-[15vh] md:w-full sm:h-[12vh] sm:w-[90%] sm:mx-auto">
                                    <p className="text-xl font-normal text-white">Trends</p>
                                    <p className="text-sm text-gray1">Explore emerging trends in future technology research</p>
                                </div>
                                <div className="lg:h-[15vh] lg:w-full rounded bg-dark1 p-4 border border-gray-800 md:h-[15vh] md:w-full sm:h-[12vh] sm:w-[90%] sm:mx-auto">
                                    <p className="text-xl font-normal text-white">Contributors</p>
                                    <p className="text-sm text-gray1">Contributions from tech researcher and academics</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-full w-full">
                   <NewsPanel/>
                </div>
                <div className="h-full w-full ">
                    <div className="h-[40vh] w-full bg-dark1">
                        <div className="h-full w-[90%] mx-auto flex justify-between items-center">
                            <div className="w-[80%]">
                                <button className=" bg-gray1 px-2 border rounded border-gray-800">
                                    <p className="text-white">Your Gateway to the depth of information</p>
                                </button>
                                <p className="text-5xl text-white font-medium">Unlock Valuable Knowledge with <br />FutureTech Feature</p>
                            </div>
                            <div className="w[20%] flex items-center">
                                <div className="p-2 rounded bg-pureblack text-base font-normal text-gray1 flex justify-center"><p>View All Blogs</p><LuArrowUpRight className="text-xl text-amber-400" /></div>
                            </div>
                        </div>

                    </div>
                    <div className="h-[60vh] w-full border-y border-gray-800">
                        <div className="h-full w-[90%] mx-auto flex justify-center">
                            <div className="h-full w-[40%] border-r border-gray-800 text-gray1 px-5 flex items-center">
                                <div>
                                    <PiBookBookmarkFill className="text-amber-400 text-6xl" />
                                    <p className="text-white text-4xl font-medium my-2">Ebooks</p>
                                    <p className="text-sm my-2">Explore Our collection of ebooks convering a wide spectrum of future technology topics.</p>
                                    <button className="w-full p-1 border border-gray-800 rounded flex justify-center bg-dark1 my-4"><p>Download Ebook Now </p><LuArrowUpRight className="text-amber-400 text-xl" /></button>
                                    <div className="h-[8vh] w-[80%] flex justify-center items-center rounded border border-gray-800 bg-dark1">
                                        <div className="h-full w[50%] p-2">
                                            <p className="text-gray1 text-sm font-normal">Downloaded by</p>
                                            <p className="text-white text-base font-normal">10K+ User</p>
                                        </div>
                                        <div className="h-full w-[50%] p-2 flex gap-2 ">
                                            <img src="https://picsum.photos/1920/1080" className="h-full w-[20%] rounded-full"></img>
                                            <img src="https://picsum.photos/1920/1080" className="h-full w-[20%] rounded-full"></img>
                                            <img src="https://picsum.photos/1920/1080" className="h-full w-[20%] rounded-full"></img>
                                            <img src="https://picsum.photos/1920/1080" className="h-full w-[20%] rounded-full"></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-full w-[60%] p-4">
                                <div className="h-[8vh] w-full p-2 ">
                                    <div className="h-full w-[90%] mx-auto flex justify-center">
                                        <div className="h-full w-[30%]">
                                            <p className="text-white text-xl font-medium">Varity of topics</p>
                                        </div>
                                        <div className="h-full w-[70%]">
                                            <p className="text-gray1 text-sm font-normal">
                                                Topic include AI in Educaiton(25%),renewable Energy(20%),healthcare(15%),
                                                space exloration(25%), and Biotechnology(15%)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[25vh] w-full ">
                                    <img className="rounded-xl h-full w-[90%] mx-auto" src="https://picsum.photos/1920/1080" />
                                </div>
                                <div className="h-[10vh] w-full my-2">
                                    <div className="h-full w-[90%] mx-auto flex justify-between">
                                        <div className="h-full w-[20%] border rounded-lg border-gray-800 bg-dark1 flex items-center p-2">
                                            <div>
                                                <p className="text-sm font-normal text-gray1">Total Ebooks</p>
                                                <p className="text-base font-normal text-white">Over 100 ebooks</p>
                                            </div>
                                        </div>
                                        <div className="h-full w-[75%] border rounded-lg border-gray-800 bg-dark1 flex justify-center items-center px-2">
                                            <div className="w-[80%]">
                                                <p className="text-sm font-normal text-gray1">Download Format</p>
                                                <p className="text-base font-normal text-white">PDF format for Acess</p>
                                            </div>
                                            <div className="w-[20%]">
                                                <button className="p-2 text-base text-gray1 border rounded-lg border-gray-800 flex justify-center gap-1 bg-pureblack"><p>Preview</p><MdOutlineRemoveRedEye className="text-amber-400 text-2xl" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[10vh] w-full">
                                    <div className="h-full w-[90%] p-2 mx-auto my-1 rounded-lg border border-gray-800 flex items-center bg-dark1">
                                        <div>
                                            <p className="text-sm text-gray1 font-normal">Authoer</p>
                                            <p className="text-white text-base font normal">text should be here</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-[60vh] w-full border-y border-gray-800">
                        <div className="h-full w-[90%] mx-auto flex justify-center">
                            <div className="h-full w-[40%] border-r border-gray-800 text-gray1 px-5 flex items-center">
                                <div>
                                    <PiBookBookmarkFill className="text-amber-400 text-6xl" />
                                    <p className="text-white text-4xl font-medium my-2">Ebooks</p>
                                    <p className="text-sm my-2 font-normal">Explore Our collection of ebooks convering a wide spectrum of future technology topics.</p>
                                    <button className="w-full p-1 border border-gray-800 rounded flex justify-center bg-dark1 my-4"><p>Download Ebook Now </p><LuArrowUpRight className="text-amber-400 text-xl" /></button>
                                    <div className="h-[8vh] w-[80%] flex justify-center items-center rounded border border-gray-800 bg-dark1">
                                        <div className="h-full w[50%] p-2">
                                            <p className="text-gray1 text-sm font-normal">Downloaded by</p>
                                            <p className="text-white text-base font-normal">10K+ User</p>
                                        </div>
                                        <div className="h-full w-[50%] p-2 flex gap-2 ">
                                            <img src="https://picsum.photos/1920/1080" className="h-full w-[20%] rounded-full"></img>
                                            <img src="https://picsum.photos/1920/1080" className="h-full w-[20%] rounded-full"></img>
                                            <img src="https://picsum.photos/1920/1080" className="h-full w-[20%] rounded-full"></img>
                                            <img src="https://picsum.photos/1920/1080" className="h-full w-[20%] rounded-full"></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-full w-[60%] p-4">
                                <div className="h-[8vh] w-full p-2 ">
                                    <div className="h-full w-[90%] mx-auto flex justify-center">
                                        <div className="h-full w-[30%]">
                                            <p className="text-white text-xl font-medium">Varity of topics</p>
                                        </div>
                                        <div className="h-full w-[70%]">
                                            <p className="text-gray1 text-sm font-normal">
                                                Topic include AI in Educaiton(25%),renewable Energy(20%),healthcare(15%),
                                                space exloration(25%), and Biotechnology(15%)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[25vh] w-full ">
                                    <img className="rounded-xl h-full w-[90%] mx-auto" src="https://picsum.photos/1920/1080" />
                                </div>
                                <div className="h-[10vh] w-full my-2">
                                    <div className="h-full w-[90%] mx-auto flex justify-between">
                                        <div className="h-full w-[20%] border rounded-lg border-gray-800 bg-dark1 flex items-center p-2">
                                            <div>
                                                <p className="text-sm font-normal text-gray1">Total Ebooks</p>
                                                <p className="text-base font-normal text-white">Over 100 ebooks</p>
                                            </div>
                                        </div>
                                        <div className="h-full w-[75%] border rounded-lg border-gray-800 bg-dark1 flex justify-center items-center px-2">
                                            <div className="w-[80%]">
                                                <p className="text-sm font-normal text-gray1">Download Format</p>
                                                <p className="text-base font-normal text-white">PDF format for Acess</p>
                                            </div>
                                            <div className="w-[20%]">
                                                <button className="p-2 text-base text-gray1 border rounded-lg border-gray-800 flex justify-center gap-1 bg-pureblack"><p>Preview</p><MdOutlineRemoveRedEye className="text-amber-400 text-2xl" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[10vh] w-full">
                                    <div className="h-full w-[90%] p-2 mx-auto my-1 rounded border border-gray-800 flex items-center bg-dark1">
                                        <div>
                                            <p className="text-sm text-gray1 font-normal">Authoer</p>
                                            <p className="text-white text-base font normal">text should be here</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-full w-full">
                    <div className="h-[30vh] w-full bg-dark1">
                        <div className="h-full w-[90%] mx-auto flex justify-between items-center">
                            <div className="w-[80%]">
                                <button className=" bg-gray1 px-2 border rounded border-gray-800">
                                    <p className="text-white">What Our Readers Say</p>
                                </button>
                                <p className="text-5xl text-white font-medium">Real words From Real Readers</p>
                            </div>
                            <div className="w[20%] flex items-center">
                                <div className="p-2 rounded bg-pureblack text-base font-normal text-gray1 flex justify-center"><p>View All Testimonials</p><LuArrowUpRight className="text-xl text-amber-400" /></div>
                            </div>
                        </div>
                    </div>
                    <div className="h-[40vh] w-full border-y border-gray-800">
                        <div className="h-full w-[90%] mx-auto flex justify-center">
                            <div className="h-full w-[33%]">

                            </div>
                            <div className="h-full w-[33%] border-x border-gray-800">

                            </div>
                            <div className="h-full w-[33%]">

                            </div>
                        </div>
                    </div>
                    <div className="h-[40vh] w-full border-y border-gray-800">
                        <div className="h-full w-[90%] mx-auto flex justify-center">
                            <div className="h-full w-[33%]">
                            </div>
                            <div className="h-full w-[33%] border-x border-gray-800">
                            </div>
                            <div className="h-full w-[33%]">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}