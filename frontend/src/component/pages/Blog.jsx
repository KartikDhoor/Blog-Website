import { FiMessageCircle } from "react-icons/fi";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { LuArrowUpRight } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import AxiosInstance from "../utils/AxiosInstance";
import { format } from 'date-fns';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Blog() {
    const {user,token,updateToken}=useAuth();
    const { slug } = useParams();
    const [Like,setLike]=useState(false);
    const [blogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(true); // Add a loading state
    useEffect(() => {
        if (slug) {
          fetchBlogDetails(slug);
        }
      }, [slug]);
      const fetchBlogDetails = async (slug) => {
        try {
          const response = await AxiosInstance.post(`/customer/blogs/${slug}`);
          setBlogData(response.data.data);// Set the fetched blog data
          console.log(response.data.data);
          setLoading(null); // Reset the error state in case of a successful fetch
        } catch (error) {
          console.error("Error fetching blog details:", error.message);
          setLoading("Blog not found or an error occurred.");
          setBlogData(null); // Reset blog data in case of an error
        }
      };
      const BlogLikeHandleing=async(e)=>{
        try{
            const response=await AxiosInstance.post('/customer/')

        }
        catch (error) {
            console.error("Error fetching blog details:", error.message);
             // Reset blog data in case of an error
          }

      }
    const handleLikeClick=async()=>{
        try{
            const response=await AxiosInstance.post();
            if(''){ 

            }

        }
        catch{

        }
    }
    if (loading) {
        return <div className="h-full w-full flex items-center justify-center text-black">Loading...</div>;
    }

    if (!blogData) {
        return <div className="h-full w-full flex items-center justify-center text-black">No data found</div>;
    }
    return (
        <>
            <div className="h-full w-full bg-pureblack" key={blogData._id}>
                {/* title */}
                <div className="lg:h-[60vh] lg:w-full md:h-[60vh] md:w-full sm:h-[60vh] sn:w-full belowSm:h-[60vh] belowSm:w-full  flex items-end bg-center bg-fixed"
                style={{
                    backgroundImage: `url('${blogData.image|| 'https://picsum.photos/1920/1080'}')`,
                    backgroundSize: 'cover',
                  }}
                >
                    <div className="lg:h-[10vh] lg:w-full md:h-[10vh] md:w-full sm:h-[20vh] sm:w-full belowSm:h-[20vh] belowSm:w-full backdrop-blur-xl z-0 p-4 text-center text-4xl font-medium text-white">
                        <p>{blogData.title}</p>
                    </div>
                </div>

                <div className="lg:h-auto lg:w-full lg:border-y lg:border-gray-800 lg:flex lg:justify-center
                                md:h-[100vh] md:w-full md:border-y md:border-gray-800 md:flex md:justify-center
                                sm:h-full sm:w-full sm:border-y sm:border-gray-800
                                belowSm:h-full belowSm:w-full belowSm:border-y belowSm:border-gray-800">
                    <div className="lg:h-auto lg:w-[60%] lg:border-r lg:border-gray-800 lg:block
                                    md:h-full md:w-[60%] md:border-r md:border-gray-800 md:block
                                    sm:hidden
                                    belowSm:hidden">
                        {/* //Introduction */}
                        <div className="h-auto w-full border-y border-gray-800">
                            <div className="h-full w-[90%] mx-auto text-white py-4">
                                <p className="text-xl font-medium">Introduction</p>
                                <p className="text-base text-gray1">{blogData.introduction}</p>
                            </div>
                        </div>

                        <div className="h-auto w-full">
                        {/* //sections */}
                            {blogData.sections.map((section, index) => (
                                <div key={index} className="h-full w-[90%] mx-auto text-white py-4">
                                    <p className="text-xl font-medium">{section.title}</p>
                                    <p className="text-base text-gray1">{section.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:h-auto lg:w-[40%] md:h-full md:w-[40%] sm:h-auto sm:w-full belowSm:h-auto belowSm:w-full sm:overflow-y-hidden belowSm:overflow-y-hidden">
                        {/* <div className="h-auto w-full border-y border-gray-800">
                            <div className="h-[10vh] w-[90%] mx-auto flex items-center">
                                <div className="h-[5vh] my-1 w-full flex justify-start gap-4 ">
                                 
                                    <button className="px-2 text-sm font-normal text-gray1 rounded-xl border border-gray-800 flex justify-center items-center">
                                        <FaHeart className="text-amber-400" />
                                        <p>{blogData.Likes?.length || 0}</p>
                                    </button>
                                   
                                    <button className="px-2 text-sm font-normal text-gray1 rounded-xl border border-gray-800 flex justify-center items-center">
                                        <FiMessageCircle className="text-gray-1" />
                                        <p>{blogData.comments.length}</p>
                                    </button>
                                   
                                    <button className="px-2 text-sm font-normal text-gray1 rounded-xl border border-gray-800 flex justify-center items-center">
                                        <PiPaperPlaneTiltBold className="text-gray-1" />
                                        <p>20</p>
                                    </button>
                                </div>
                            </div>
                        </div> */}
                        <div className="h-auto w-full">
                            <div className="h-[20vh] w-full">
                                <div className="h-full w-[90%] mx-auto flex justify-center">
                                    <div className="h-full w-[50%]">
                                        {/* // Created Date */}
                                        <div className="h-[10vh] w-full p-2">
                                            <p className="text-sm text-gray1">Publication date</p>
                                            <p className="text-sm text-white">{format(new Date(blogData.createdAt), 'MMMM dd, yyyy')}</p>
                                        </div>
                                        {/* //Reading time */}
                                        <div className="h-[10vh] w-full p-2">
                                            <p className="text-sm text-gray1">Reading Time</p>
                                            <p className="text-sm text-white">{blogData.readingTime}</p>
                                        </div>
                                    </div>
                                    <div className="h-full w-[50%]">
                                        {/* //category */}
                                        <div className="h-[10vh] w-full p-2">
                                            <p className="text-sm text-gray1">Category</p>
                                            <p className="text-sm text-white">{blogData.category.categoryName}</p>
                                        </div>
                                        {/* //Author */}
                                        <div className="h-[10vh] w-full p-2">
                                            <p className="text-sm text-gray1">Author Name</p>
                                            <p className="text-sm text-white">{blogData.author}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="md:h-[70vh] w-full sm:h-auto sm:my-4 belowSm:h-auto belowSm:my-4">
                                <div className="h-full w-[90%] mx-auto text-white">
                                    <p>Table of Contents</p>
                                    <div className="rounded-xl bg-dark1 px-2 py-4 flex items-center">
                                        <ul className="w-[90%] mx-auto list-disc text-base text-gray1 font-normal">
                                            {/* //section title */}
                                            {blogData.sections.map((element) => (
                                                <li className="my-2" key={element._id} >
                                                    <p>{element.title}</p>
                                                </li>
                                            ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:hidden md:hidden
                                    sm:h-auto lg:w-full lg:border-y lg:border-gray-800 
                                    belowSm:h-auto lg:w-full lg:border-y lg:border-gray-800  sm:overflow-y-hidden ">
                        <div className="h-[20vh] w-full  sm:h-auto sm:w-full belowSm:h-auto belowSm:w-full border-y border-gray-800">
                            {/* //Introduction */}
                            <div className="h-full w-[90%] mx-auto text-white py-4">
                                <p className="text-xl font-medium">Introduction</p>
                                <p className="text-base text-gray1">{blogData.introduction}</p>
                            </div>
                        </div>
                        <div className="h-auto w-full sm:h-auto sm:w-full belowSm:h-auto belowSm:w-full">
                            {/* //sections */}
                            {blogData.sections.map((section) => (
                                <div key={section._id} className="h-full w-[90%] mx-auto text-white py-4">
                                    <p className="text-xl font-medium">{section.title}</p>
                                    <p className="text-base text-gray1">{section.content}</p>
                                </div>
                            ))}
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