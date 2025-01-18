import { Link } from "react-router-dom";
import { HiMiniBars4 } from "react-icons/hi2";
import { RxCrossCircled } from "react-icons/rx";
import { useState } from "react";


export default function Header() {
    const [Nav, setNav] = useState(true);
    const toggleNav = () => {
        setNav((prevState) => !prevState);
    }
    return (
        <>
            <div className="h-full w-full bg-pureblack m-0 p-0">
                <div className="lg:h-[10vh] lg:w-[95%] relative mx-auto p-4 flex justify-center items-center md:h-[10vh] md:w-[95%] sm:h-[10vh] sm:w-full belowSm:h-[10vh] belowSm:w-full">
                    <div className="lg:h-full lg:w-[30%] md:h-full md:w-[30%] sm:h-full w-[50%] belowSm:h-full">
                        <p className="text-xl text-gray-200 font-medium uppercase">blog website</p>
                    </div>
                    <div className="lg:h-full lg:w-[40%] lg:flex lg:justify-center lg:items-center lg:gap-6 text-lg font-normal text-gray-400 md:h-full md:w-[40%] md:flex md:justify-center md:items-center md:gap-6 sm:hidden belowSm:hidden">
                        <Link to='/'><p className="">Home</p></Link>
                        <Link to='/blog'><p>Blog</p></Link>
                        <Link to='/news'><p>News</p></Link>
                        <Link to='/inspire'><p>Insite</p></Link>
                    </div>
                    <div className="lg:h-full lg:w-[30%] lg:flex lg:items-center lg:justify-end p-4 md:h-full md:w-[30%] md:flex md:items-center md:justify-end sm:hidden belowSm:hidden">
                        <Link to='/contact'>
                            <button className="text-lg font-normal p-2 bg-amber-400 border-2 rounded-xl border-lime-400 hover:transition hover:scale-105 focus:bg-amber-600 focus:border-0">
                                Contact
                            </button>
                        </Link>
                    </div>
                    {Nav ?
                        <div className="lg:hidden md:hidden sm:h-full sm:w-[50%] sm:flex sm:justify-end belowSm:h-full belowSm:w-[50%] belowSm:flex belowSm:justify-end">
                            <HiMiniBars4 className="text-gray-300 sm:text-3xl belowSm:text-2xl" onClick={toggleNav} />
                        </div>
                        :
                        <div className="lg:hidden md:hidden sm:fixed sm:top-0 sm:right-0 sm:bg-dark2 sm:h-[100vh] sm:w-[90%] text-lg font-normal text-gray-400 p-4 belowSm:fixed belowSm:top-0 belowSm:right-0 belowSm:bg-dark2 belowSm:h-[100vh] belowSm:w-[90%] z-10">
                            <div className="h-[10vh] w-full flex justify-end p-2 ">
                                <RxCrossCircled className="text-gray-300 text-4xl sm:text-4xl belowSm:text-3xl" onClick={toggleNav}/>
                            </div>
                            <div className="border-y border-gray-800">
                            <Link to='/'  onClick={toggleNav}><p className="border-y border-gray-800 py-2">Home</p></Link>
                            <Link to='/blog' onClick={toggleNav}><p className="border-b border-gray-800 py-2">Blog</p></Link>
                            <Link to='/news' onClick={toggleNav}><p className="border-b border-gray-800 py-2">News</p></Link>
                            <Link to='/inspire' onClick={toggleNav}><p className="border-b border-gray-800 py-2">Insite</p></Link>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </>
    )
}