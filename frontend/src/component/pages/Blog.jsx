import { FiMessageCircle } from "react-icons/fi";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { LuArrowUpRight } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";

export default function Blog() {
    return (
        <>
            <div className="h-full w-full bg-pureblack">
                <div className="lg:h-[50vh] lg:w-full md:h-[50vh] md:w-full sm:h-[50vh] sn:w-full belowSm:h-[50vh] belowSm:w-full bg-[url('https://picsum.photos/1920/1080')] flex items-end">
                    <div className="lg:h-[10vh] lg:w-full md:h-[10vh] md:w-full sm:h-[20vh] sm:w-full belowSm:h-[20vh] belowSm:w-full backdrop-blur-xl p-4 text-center text-4xl font-medium text-white">
                        <p>The Rise of Artificial Intellegence in the Health Care </p>
                    </div>
                </div>
                <div className="lg:h-[100vh] lg:w-full lg:border-y lg:border-gray-800 lg:flex lg:justify-center
                                md:h-[100vh] md:w-full md:border-y md:border-gray-800 md:flex md:justify-center
                                sm:h-full sm:w-full sm:border-y sm:border-gray-800
                                belowSm:h-full belowSm:w-full belowSm:border-y belowSm:border-gray-800">
                    <div className="lg:h-full lg:w-[60%] lg:border-r lg:border-gray-800 lg:block
                                    md:h-full md:w-[60%] md:border-r md:border-gray-800 md:block
                                    sm:hidden
                                    belowSm:hidden">
                        <div className="h-[20vh] w-fullborder-y border-gray-800">
                            <div className="h-full w-[90%] mx-auto text-white py-4">
                                <p className="text-xl font-medium">Introduction</p>
                                <p className="text-base text-gray1">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid aut qui, molestias quisquam voluptatum odit ratione culpa officiis minus dolore accusamus recusandae, est velit nemo ipsa tempore perferendis asperiores similique?</p>
                            </div>
                        </div>
                        <div className="h-[80vh] w-full">
                            <div className="h-full w-[90%] mx-auto text-white py-4">
                                <p className="text-xl font-medium">AI things</p>
                                <p className="text-base text-gray1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus saepe tempora sequi voluptate laborum maxime nesciunt animi consequatur aliquid tenetur sit, voluptatibus obcaecati asperiores mollitia! Temporibus adipisci quibusdam voluptates error!
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem eligendi recusandae odio quidem eos fuga, similique explicabo unde quibusdam. Rem, odio accusantium odit eum sapiente quas autem sit nemo voluptatem?
                                </p>
                                <p className="text-base text-gray1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus saepe tempora sequi voluptate laborum maxime nesciunt animi consequatur aliquid tenetur sit, voluptatibus obcaecati asperiores mollitia! Temporibus adipisci quibusdam voluptates error!
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro impedit at, quae eligendi optio libero quibusdam quo illum officiis fuga praesentium sed provident in. Et accusamus ex modi iusto. Laborum!
                                </p>
                                <p className="text-xl font-medium">AI things</p>
                                <p className="text-base text-gray1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus saepe tempora sequi voluptate laborum maxime nesciunt animi consequatur aliquid tenetur sit, voluptatibus obcaecati asperiores mollitia! Temporibus adipisci quibusdam voluptates error!
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem eligendi recusandae odio quidem eos fuga, similique explicabo unde quibusdam. Rem, odio accusantium odit eum sapiente quas autem sit nemo voluptatem?
                                </p>
                                <p className="text-base text-gray1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus saepe tempora sequi voluptate laborum maxime nesciunt animi consequatur aliquid tenetur sit, voluptatibus obcaecati asperiores mollitia! Temporibus adipisci quibusdam voluptates error!
                                </p>
                                <div className="">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:h-full lg:w-[40%] md:h-full md:w-[40%] sm:h-auto sm:w-full belowSm:h-auto belowSm:w-full sm:overflow-y-hidden belowSm:overflow-y-hidden">
                        <div className="h-[10vh] w-full border-y border-gray-800">
                            <div className="h-full w-[90%] mx-auto flex items-center">
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
                        <div className="h-[90vh] w-full">
                            <div className="h-[20vh] w-full">
                                <div className="h-full w-[90%] mx-auto flex justify-center">
                                    <div className="h-full w-[50%]">
                                        <div className="h-[10vh] w-full p-2">
                                            <p className="text-sm text-gray1">Publication date</p>
                                            <p className="text-sm text-white">October 10,2025</p>
                                        </div>
                                        <div className="h-[10vh] w-full p-2">
                                            <p className="text-sm text-gray1">Reading Time</p>
                                            <p className="text-sm text-white">10 Min</p>
                                        </div>
                                    </div>
                                    <div className="h-full w-[50%]">
                                        <div className="h-[10vh] w-full p-2">
                                            <p className="text-sm text-gray1">Category</p>
                                            <p className="text-sm text-white">HealthCare</p>
                                        </div>
                                        <div className="h-[10vh] w-full p-2">
                                            <p className="text-sm text-gray1">Author Name</p>
                                            <p className="text-sm text-white">Dr.Emily Walker</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[70vh] w-full">
                                <div className="h-full w-[90%] mx-auto text-white">
                                    <p>Table of Contents</p>
                                    <div className="rounded-xl bg-dark1 px-2 py-4 flex items-center">
                                        <ul className="w-[90%] mx-auto list-disc text-base text-gray1 font-normal">
                                            <li className="my-2">
                                                <p>Introduction</p>
                                            </li>
                                            <li className="my-2">
                                                <p>Ai in Dignositic Imagine</p>
                                            </li>
                                            <li className="my-2">
                                                <p>Predictive Analytics and Disease Prevention</p>
                                            </li>
                                            <li className="my-2">
                                                <p>Personlized treatment plans</p>
                                            </li>
                                            <li className="my-2">
                                                <p>Drug discovery and Research</p>
                                            </li>
                                            <li className="my-2">
                                                <p>Ai in Telemedicine</p>
                                            </li>
                                            <li className="my-2">
                                                <p>Ethical Considrations</p>
                                            </li>
                                            <li className="my-2">
                                                <p>Future of AI in HealthCare</p>
                                            </li>
                                            <li className="my-2">
                                                <p>Conclusion</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:hidden md:hidden
                                    sm:h-auto lg:w-full lg:border-y lg:border-gray-800 
                                    belowSm:h-auto lg:w-full lg:border-y lg:border-gray-800  sm:overflow-y-hidden belowSm:overflow-y-hidden">
                        <div className="h-[20vh] w-fullborder-y border-gray-800">
                            <div className="h-full w-[90%] mx-auto text-white py-4">
                                <p className="text-xl font-medium">Introduction</p>
                                <p className="text-base text-gray1">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid aut qui, molestias quisquam voluptatum odit ratione culpa officiis minus dolore accusamus recusandae, est velit nemo ipsa tempore perferendis asperiores similique?</p>
                            </div>
                        </div>
                        <div className="h-[80vh] w-full">
                            <div className="h-full w-[90%] mx-auto text-white py-4">
                                <p className="text-xl font-medium">AI things</p>
                                <p className="text-base text-gray1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus saepe tempora sequi voluptate laborum maxime nesciunt animi consequatur aliquid tenetur sit, voluptatibus obcaecati asperiores mollitia! Temporibus adipisci quibusdam voluptates error!
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem eligendi recusandae odio quidem eos fuga, similique explicabo unde quibusdam. Rem, odio accusantium odit eum sapiente quas autem sit nemo voluptatem?
                                </p>
                                <p className="text-base text-gray1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus saepe tempora sequi voluptate laborum maxime nesciunt animi consequatur aliquid tenetur sit, voluptatibus obcaecati asperiores mollitia! Temporibus adipisci quibusdam voluptates error!
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro impedit at, quae eligendi optio libero quibusdam quo illum officiis fuga praesentium sed provident in. Et accusamus ex modi iusto. Laborum!
                                </p>
                                <p className="text-xl font-medium">AI things</p>
                                <p className="text-base text-gray1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus saepe tempora sequi voluptate laborum maxime nesciunt animi consequatur aliquid tenetur sit, voluptatibus obcaecati asperiores mollitia! Temporibus adipisci quibusdam voluptates error!
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem eligendi recusandae odio quidem eos fuga, similique explicabo unde quibusdam. Rem, odio accusantium odit eum sapiente quas autem sit nemo voluptatem?
                                </p>
                                <p className="text-base text-gray1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus saepe tempora sequi voluptate laborum maxime nesciunt animi consequatur aliquid tenetur sit, voluptatibus obcaecati asperiores mollitia! Temporibus adipisci quibusdam voluptates error!
                                </p>
                                <div className="">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:h-[50vh] lg:w-full lg:border-y lg:border-gray-800
                                md:h-[50vh] md:w-full md:border-y md:border-gray-800
                                sm:h-[150vh] sm:w-full sm:border-y sm:border-gray-800
                                belowSm:h-[150vh] belowSm:w-full belowSm:border-y belowSm:border-gray-800  ">
                    <div className="lg:h-full lg:w-[90%] lg:mx-auto lg:flex lg:justify-center
                                    md:h-full md:w-[90%] md:mx-auto md:flex md:justify-center
                                    sm:h-full sm:w-[90%] sm:mx-auto
                                    belowSm:h-full belowSm:w-[90%] belowSm:mx-auto">
                        <div className="h-full w-[30%] p-4 flex items-center justify-center sm:h-[50vh] sm:w-full belowSm:h-[50vh] belowSm:w-full">
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
                        <div className="h-full w-[30%] p-4 flex items-center justify-center sm:h-[50vh] sm:w-full belowSm:h-[50vh] belowSm:w-full">
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
                        <div className="h-full w-[30%] p-4 flex items-center justify-center sm:h-[50vh] sm:w-full belowSm:h-[50vh] belowSm:w-full">
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
            </div>
        </>
    )
}