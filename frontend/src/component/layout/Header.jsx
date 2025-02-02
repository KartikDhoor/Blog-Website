import { Link,useNavigate} from "react-router-dom";
import { HiMiniBars4 } from "react-icons/hi2";
import { RxCrossCircled } from "react-icons/rx";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import AxiosInstance from "../utils/AxiosInstance";


export default function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hovered,setHovered]=useState(false);
  const [userImage, setUserImage] = useState(null);
  const [Nav,setNav]=useState(true);

  useEffect(() => {
    const token = localStorage.getItem('blogsite_jwt_token');
    if (token) {
        console.log("Token:"+token);
      validateAndFetchUserInfo(token);
    }
  }, []);

  const validateAndFetchUserInfo = async (token) => {
    try {
      const response = await AxiosInstance.post('/customer/find/user',{
        token,
      });
      if (response.data.data) {
        setIsAuthenticated(true);
        setUserImage(response.data.data?.image || null);
      } else {
        localStorage.removeItem('blogsite_jwt_token');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Token validation or user fetch failed:', error);
      localStorage.removeItem('blogsite_jwt_token');
      setIsAuthenticated(false);
    }
  };
  const handleLogout=()=>{
    localStorage.removeItem('blogsite_jwt_token');
  }
  const handleDropDown=()=>{
    setHovered((prevState) => !prevState)
  }
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
                        <Link to='/news'><p>News</p></Link>
                        <Link to='/inspire'><p>Inspire</p></Link>
                        <Link to='/contact'><p>Contact</p></Link>
                    </div>
                    <div className="lg:h-full lg:w-[30%] lg:flex lg:items-center lg:justify-end p-4 md:h-full md:w-[30%] md:flex md:items-center md:justify-end sm:hidden belowSm:hidden">
                        {isAuthenticated ? (
                            userImage ? (
                                <img
                                    src={userImage}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full cursor-pointer hover:opacity-80"
                                    
                                />
                            ) : (
                                <div className="w-10 h-10 relative flex items-center justify-center"  onMouseEnter={handleDropDown}
                                onMouseLeave={handleDropDown}
                                >
                                    <FaUserCircle
                                    className="text-3xl text-dark1 cursor-pointer hover:text-gray-400"/>
                                    <div className="h-2 w-2 rounded-full absolute right-2 bottom-1 bg-lime-600"></div>
                                    {hovered?(
                                        <div className="fixed h-[30vh] w-[20%] top-[8vh] right-3 text-white rounded-xl bg-dark1 p-4">
                                            <Link to="/profile">
                                            <p className="text-center text-lg my-2">Profile</p>
                                            </Link>
                                            <Link to='/security'>
                                            <p className="text-center text-lg my-2">Security</p>
                                            </Link>
                                            <p className="text-center text-lg my-2" onClick={handleLogout}>LogOut</p>
                                        </div>
                                    ):""
                                    }
                                </div>
                                
                            )
                        ) : (
                            <Link to='/login'>
                            <button className="text-lg font-normal py-2 px-4 bg-amber-400 border-2 rounded-xl border-lime-400 hover:transition hover:scale-105 focus:bg-amber-600 focus:border-0">
                                Login
                            </button>
                            </Link>
                        )}
                    </div>
                    {Nav ?
                        <div className="lg:hidden md:hidden sm:h-full sm:w-[50%] sm:flex sm:justify-end belowSm:h-full belowSm:w-[50%] belowSm:flex belowSm:justify-end">
                            <HiMiniBars4 className="text-gray-300 sm:text-3xl belowSm:text-2xl" onClick={toggleNav} />
                        </div>
                        :
                        <div className="lg:hidden md:hidden sm:fixed sm:top-0 sm:right-0 sm:bg-dark2 sm:h-[100vh] sm:w-[90%] text-lg font-normal text-gray-400 p-4 belowSm:fixed belowSm:top-0 belowSm:right-0 belowSm:bg-dark2 belowSm:h-[100vh] belowSm:w-[90%] z-10">
                            <div className="h-[10vh] w-full flex justify-end p-2 ">
                                <RxCrossCircled className="text-gray-300 text-4xl sm:text-4xl belowSm:text-3xl" onClick={toggleNav} />
                            </div>
                            <div className="border-y border-gray-800">
                                <Link to='/' onClick={toggleNav}><p className="border-y border-gray-800 py-2">Home</p></Link>
                                <Link to='/news' onClick={toggleNav}><p className="border-b border-gray-800 py-2">News</p></Link>
                                <Link to='/podcast' onClick={toggleNav}><p className="border-b border-gray-800 py-2">Podcast</p></Link>
                                <Link to='/inspire' onClick={toggleNav}><p className="border-b border-gray-800 py-2">Insite</p></Link>
                                <Link to='/contact' onClick={toggleNav}><p className="border-b border-gray-800 py-2">Contact</p></Link>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </>
    )
}