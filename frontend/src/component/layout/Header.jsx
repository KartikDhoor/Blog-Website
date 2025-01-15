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
            <div className="h-full w-full bg-pureblack">
                <div className="lg:h-[10vh] lg:w-[95%] relative mx-auto p-4 flex justify-center items-center md:h-[10vh] md:w-[95%] sm:h-[10vh] sm:w-full">
                    <div className="lg:h-full lg:w-[30%] md:h-full md:w-[30%] sm:h-full w-[50%]">
                        <p className="text-2xl text-gray-200 font-medium uppercase">blog website</p>
                    </div>
                    <div className="lg:h-full lg:w-[40%] lg:flex lg:justify-center lg:items-center lg:gap-6 text-lg font-normal text-gray-400 md:h-full md:w-[40%] md:flex md:justify-center md:items-center md:gap-6 sm:hidden">
                        <Link to='/'><p className="">Home</p></Link>
                        <Link to='/blog'><p>Blog</p></Link>
                        <Link to='/news'><p>News</p></Link>
                        <Link to='/inspire'><p>Insite</p></Link>
                    </div>
                    <div className="lg:h-full lg:w-[30%] lg:flex lg:items-center lg:justify-end p-4 md:h-full md:w-[30%] md:flex md:items-center md:justify-end sm:hidden">
                        <Link to='/contact'>
                            <button className="text-lg font-normal p-2 bg-amber-400 border-2 rounded-xl border-lime-400 hover:transition hover:scale-105 focus:bg-amber-600 focus:border-0">
                                Contact
                            </button>
                        </Link>
                    </div>
                    {Nav ?
                        <div className="lg:hidden md:hidden sm:h-full sm:w-[50%] sm:flex sm:justify-end">
                            <HiMiniBars4 className="text-gray-300 text-4xl" onClick={toggleNav} />
                        </div>
                        :
                        <div className="lg:hidden md:hidden sm:fixed sm:top-0 sm:right-0 sm:bg-dark2 sm:h-[100vh] sm:w-[90%]">
                            <div className="h-[10vh] w-full flex justify-end p-2 ">
                                <RxCrossCircled className="text-gray-300 text-4xl" onClick={toggleNav}/>
                            </div>
                            <Link to='/'  onClick={toggleNav}><p className="">Home</p></Link>
                            <Link to='/blog' onClick={toggleNav}><p>Blog</p></Link>
                            <Link to='/news' onClick={toggleNav}><p>News</p></Link>
                            <Link to='/inspire' onClick={toggleNav}><p>Insite</p></Link>
                        </div>
                    }

                </div>
            </div>
        </>
    )
}