import { TbBulbFilled } from "react-icons/tb";
import { GoStarFill } from "react-icons/go";
import { LuArrowUpRight } from "react-icons/lu";
import { GiConversation } from "react-icons/gi";

export default function Podcasts() {
    return (
        <>
            <div className="h-full w-full bg-pureblack">
                <div className="h-full w-full">
                    <div className="lg:h-[40vh] lg:w-full md:h-[40vh] md:w-full sm:h-[40vh] sm:w-full belowSm:h-[40vh] belowSm:w-full bg-dark1 flex items-center">
                        <div className="lg:h-[25vh] lg:w-[90%] lg:mx-auto lg:p-2
                                    md:h-[25vh] md:w-[90%] md:mx-auto md:p-2
                                    sm:h-[30vh] sm:w-full sm:mx-auto sm:p-2
                                    belowSm:h-[30vh] belowSm:w-full belowSm:mx-auto belowSm:p-2 ">
                            <div className="lg:h-[8vh] lg:w-full lg:text-5xl lg:text-white lg:font-medium
                                        md:h-[8vh] md:w-full md:text-3xl md:text-white md:font-medium
                                        sm:h-[10vh] sm:w-full sm:text-4xl sm:text-white sm:font-medium
                                        belowSm:h-[10vh] belowSm:w-full belowSm:text-3xl belowSm:text-white belowSm:font-medium
                                        ">
                                <p>Unlock A world of</p>
                                <p className="lg:hidden md:hidden sm:block belowSm:block">Knowledge</p>
                            </div>
                            <div className="h-[10vh] w-full flex justify-center gap-2 my-2">
                                <div className="h-full w-[30%] lg:text-5xl md:text-3xl text-white font-medium lg:block md:block sm:hidden belowSm:hidden">
                                    <p>Knowleldge</p>
                                </div>
                                <div className="h-full w-[70%] text-base text-gray1 font-normal sm:w-full belowSm:w-full">
                                    <p>Explore the latest news from around the world.We bring you Up-To-The-Minutes update on the most significant event,trend,Stories,Discover the word throught our News Coverage.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-[30vh] w-full">
                        <div className="h-full w-[90%] mx-auto flex justify-center">
                            <div className="h-full w-[25%] flex justify-center items-center">
                                <div className="h-[15vh] w-[50%] mx-auto text-5xl text-center text-white">
                                    <p>300<spam className='text-amber-400'>+</spam></p>
                                    <p className="text-base text-gray1">Resource Available</p>
                                </div>
                            </div>
                            <div className="h-full w-[25%] flex justify-center items-center">
                                <div className="h-[15vh] w-[50%] mx-auto text-5xl text-center text-white">
                                    <p>12K<spam className='text-amber-400'>+</spam></p>
                                    <p className="text-base text-gray1">Total Downloads</p>
                                </div>
                            </div>
                            <div className="h-full w-[25%] flex justify-center items-center">
                                <div className="h-[15vh] w-[50%] mx-auto text-5xl text-center text-white">
                                    <p>10K<spam className='text-amber-400'>+</spam></p>
                                    <p className="text-base text-gray1">Active Users</p>
                                </div>
                            </div>
                            <div className="h-full w-[25%] flex justify-center items-center">
                                <div className="h-[15vh] w-[50%] mx-auto text-5xl text-center text-white">
                                    <p>100<spam className='text-amber-400'>+</spam></p>
                                    <p className="text-base text-gray1">Countries Usability</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-full w-full">
                    <div className="lg:h-[30vh] lg:w-full md:h-[30vh] md:w-full sm:h-[30vh] sm:w-full belowSm:h-[40vh] belowSm:w-full bg-dark1">
                        <div className="lg:h-full lg:w-[90%] lg:mx-auto lg:flex lg:justify-between lg:items-center md:h-full md:w-[90%] md:mx-auto md:flex md:justify-between md:items-center sm:h-full sm:w-[90%] sm:mx-auto sm:px-4 sm:flex sm:items-center sm:flex-wrap belowSm:h-full belowSm:w-[90%] belowSm:mx-auto belowSm:px-4 belowSm:flex belowSm:items-center belowSm:flex-wrap">
                            <div className="lg:w-[70%] md:w-[70%] sm:w-full belowSm:w-full b">
                                <button className="bg-gray1 px-2 border rounded border-gray-800">
                                    <p className="text-white">Dive into the details</p>
                                </button>
                                <p className="text-5xl text-white font-medium">In Deepth Reports And Analysis</p>
                            </div>
                            <div className="lg:h-[8vh] lg:w-[30%] lg:flex lg:justify-around lg:items-center lg:gap-4 md:gap-4 md:h-[8vh] md:w-[60%] md:flex md:justify-around md:items-center sm:h-[8vh] sm:w-full sm:flex sm:justify-around sm:items-center belowSm:h-[8vh] belowSm:w-full belowSm:flex belowSm:items-center belowSm:justify-around sm:gap-4 belowSm:gap-4 rounded-lg p-1 bg-pureblack">
                                <div className="h-full w-[30%]">
                                    <button className="h-full w-full text-base text-gray1 rounded-xl border border-gray-800 bg-dark1">
                                        WhitePaper
                                    </button>
                                </div>
                                <div className="h-full w-[30%]">
                                    <button className="h-full w-full text-base text-gray1 rounded-xl border border-gray-800 bg-dark1">
                                        Ebooks
                                    </button>
                                </div>
                                <div className="h-full w-[30%]">
                                    <button className="h-full w-full text-base text-gray1 rounded-xl border border-gray-800 bg-dark1">
                                        Reports
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-[70vh] w-full border-y border-gray-800">
                        <div className="h-full w-[90%] mx-auto flex justify-center">
                        <div className="h-full w-[40%] border-r border-gray-800 flex items-center">
                                <div className="h-auto w-[90%] mx-auto">
                                    <TbBulbFilled className="text-8xl text-amber-400" />
                                    <div className="h-auto w-full flex justify-between my-2">
                                        <div className="h-full w-[50%] text-3xl text-white font-medium">
                                            <p>Ai Revelution</p>
                                        </div>
                                        <div className="h-full w-[50%] text-xl text-amber-400 flex justify-center items-center gap-2">
                                            <div className="rounded-full border border-gray-800 flex justify-center gap-2 p-2">
                                                <GoStarFill />
                                                <GoStarFill />
                                                <GoStarFill />
                                                <GoStarFill />
                                                <GoStarFill />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-auto w-full rounded-lg border border-gray-800 flex justify-center">
                                        <div className="h-auto w-[50%] text-white p-2 ">
                                            <p className="text-sm text-gray1">Host</p>
                                            <p>Dr.Sarah Mitchall</p>
                                        </div>
                                        <div className="h-auto w-[50%] p-2">
                                            <button className="h-full w-full flex justify-center border border-gray-800 items-center rounded-xl text-gray1 bg-dark1">Listen Podcast<LuArrowUpRight className="text-xl text-amber-400"/></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-full w-[60%] ">
                                <div className="h-auto w-[90%] mx-auto">
                                    <div className="h-auto w-full p-4">
                                        <img src="https://picsum.photos/1920/1080" className="h-[40vh] w-full rounded-xl"/>
                                    </div>
                                    <div className="h-auto w-full text-white text-lg ">
                                        <p className="font-medium">Delves into the transformative impact of AI</p>
                                        <p className="text-sm text-gray1 line-clamp-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo laboriosam aliquam et quidem nemo doloribus temporibus, consequatur placeat? Iure corrupti esse nostrum at quis. Laudantium dicta natus aliquam quae exercitationem?</p>
                                        <div className="h-auto w-full rounded-lg bg-pureblack border my-2 p-2 border-gray-800 flex justify-around gap-2">
                                            <div className="h-full w-[33%] rounded-lg border border-gray-800 bg-dark1 p-2">
                                                <p className="text-sm text-gray1">Total Episode</p>
                                                <p className="text-base text-white">50</p>
                                            </div>
                                            <div className="h-full w-[33%] rounded-lg border border-gray-800 bg-dark1 p-2">
                                                <p className="text-sm text-gray1">Average Episode Length</p>
                                                <p className="text-base text-white">30 Min</p>
                                            </div>
                                            <div className="h-full w-[33%] rounded-lg border border-gray-800 bg-dark1 p-2">
                                                <p className="text-sm text-gray1">Release Frequence</p>
                                                <p className="text-base text-white">Weekly</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-[70vh] w-full border-y border-gray-800">
                        <div className="h-full w-[90%] mx-auto flex justify-center">
                            <div className="h-full w-[40%] border-r border-gray-800 flex items-center">
                                <div className="h-auto w-[90%] mx-auto">
                                    <GiConversation className="text-8xl text-amber-400" />
                                    <div className="h-auto w-full flex justify-between my-2">
                                        <div className="h-full w-[50%] text-3xl text-white font-medium">
                                            <p>Ai Conversation</p>
                                        </div>
                                        <div className="h-full w-[50%] text-xl text-amber-400 flex justify-center items-center gap-2">
                                            <div className="rounded-full border border-gray-800 flex justify-center gap-2 p-2">
                                                <GoStarFill />
                                                <GoStarFill />
                                                <GoStarFill />
                                                <GoStarFill />
                                                <GoStarFill />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-auto w-full rounded-lg border border-gray-800 flex justify-center">
                                        <div className="h-auto w-[50%] text-white p-2 ">
                                            <p className="text-sm text-gray1">Host</p>
                                            <p>Mark Anderson</p>
                                        </div>
                                        <div className="h-auto w-[50%] p-2">
                                            <button className="h-full w-full flex justify-center border border-gray-800 items-center rounded-xl text-gray1 bg-dark1">Listen Podcast<LuArrowUpRight className="text-xl text-amber-400"/></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-full w-[60%] ">
                                <div className="h-auto w-[90%] mx-auto">
                                    <div className="h-auto w-full p-4">
                                        <img src="https://picsum.photos/1920/1080" className="h-[40vh] w-full rounded-xl"/>
                                    </div>
                                    <div className="h-auto w-full text-white text-lg ">
                                        <p className="font-medium">Delves into the transformative impact of AI</p>
                                        <p className="text-sm text-gray1 line-clamp-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo laboriosam aliquam et quidem nemo doloribus temporibus, consequatur placeat? Iure corrupti esse nostrum at quis. Laudantium dicta natus aliquam quae exercitationem?</p>
                                        <div className="h-auto w-full rounded-lg bg-pureblack border my-2 p-2 border-gray-800 flex justify-around gap-2">
                                            <div className="h-full w-[33%] rounded-lg border border-gray-800 bg-dark1 p-2">
                                                <p className="text-sm text-gray1">Total Episode</p>
                                                <p className="text-base text-white">50</p>
                                            </div>
                                            <div className="h-full w-[33%] rounded-lg border border-gray-800 bg-dark1 p-2">
                                                <p className="text-sm text-gray1">Average Episode Length</p>
                                                <p className="text-base text-white">30 Min</p>
                                            </div>
                                            <div className="h-full w-[33%] rounded-lg border border-gray-800 bg-dark1 p-2">
                                                <p className="text-sm text-gray1">Release Frequence</p>
                                                <p className="text-base text-white">Weekly</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-[50vh] w-full border-y border-gray-800">
                        <div className="h-full w-[90%] mx-auto flex items-center">
                        <div className="h-auto w-full">
                                <button className=" bg-gray1 px-2 border rounded border-gray-800">
                                    <p className="text-white">Unlock the Power of</p>
                                </button>
                                <p className="text-5xl sm:text-4xl belowSm:text-3xl text-white font-medium">FutureTech Feature</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}