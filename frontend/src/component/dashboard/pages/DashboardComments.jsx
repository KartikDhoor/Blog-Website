import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import AxiosInstance from "../../utils/AxiosInstance";
import { format } from 'date-fns';
import { Link } from "react-router-dom";


export default function DashboardComments() {
    const [blogComments, setBlogComments] = useState(null);
    const [blogsData, setBlogsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [blogMessage, setblogMessage] = useState(false);
    const [queryParams, setQueryParams] = useState({
        sortBy: 'createdAt',
        order: 'desc',
        limit: 14,
        page: 1,
    })

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const blog = await AxiosInstance.get("/customer/blogs", { params: queryParams, });
                if (blog) {
                    setBlogsData(blog.data.data);
                    setLoading(false);
                }
            }
            catch (err) {
                console.error('Request Error:', err.message);
                return [];
            }

        }
        fetchdata();
        console.log(blogsData)
    }, []);
    if (loading) {
        return (
            <>
                <div>
                    <p className="text-3xl text-center text-white">hello any one can see this</p>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="h-full w-full p-2 bg-pureblack">
                <div className="md:h-[10vh] md:w-[90%] md:mx-auto sm:h-[10vh] sm:w-[90%] sm:mx-auto belowSm:h-[10vh] belowSM:w-[90%] belowSm:mx-auto flex justify-center">
                    <div className="md:h-auto md:w-[70%] sm:h-auto sm:w-[20%] sm:block md:block belowSm:hidden md:flex md:items-center">
                        <p className="text-2xl font-medium text-white">Messages</p>
                    </div>
                    <div className="md:h-auto md:w-[30%] sm:h-auto sm:w-[50%] belowSm:h-auto belowSm:w-full flex justify-center border rounded-lg my-2.5 border-gray-900">
                        <input className="w-[90%] rounded-l-lg outline-none p-1 bg-dark1 text-gray-400" />
                        <div className="w-[10%] rounded-r-lg flex items-center">
                            <IoSearch className="text-gray-800 text-2xl " />
                        </div>
                    </div>
                </div>
                {blogsData==null?
                (
                    <div className="h-auto w-full text-white text-center">
                        <p className='md:text-5xl sm:text-3xl belowSm:text-xl noto-sans my-4'>there is no Blog Avaliable Currently</p>
                        <p className='text-base font-base comme'>please create a Blog first then we can check if there is some comment on the blog</p>
                    </div>
                ):(
                    blogsData.map((blog) => {
                        return (
                            <div key={blog._id} className="h-auto w-[90%] mx-auto rounded-lg bg-dark1 my-2">
                                <div className="h-auto w-full rounded-lg md:flex md:justify-center">
                                    <div className="md:h-auto md:w-[30%] sm:w-full belowSm:w-full md:rounded-l-lg sm:rounded-t-lg belowSm:rounded-t-lg">
                                        <img src={blog.image} className="h-[30vh] w-full md:rounded-l-lg sm:rounded-t-lg belowSm:rounded-t-lg" />
                                    </div>
                                    <div className="h-auto md:w-[70%] sm:w-full belowSm:w-full p-2">
                                        <p className="text-xl font-medium text-white">{blog.title}</p>
                                        <p className="text-lg font-medium text-gray1">{blog.author}</p>
                                        <p className="line-clamp-3 text-gray1">{blog.introduction}</p>
                                        <button className="text-lg rounded-lg bg-dark2 text-white h-[6vh] w-full" >{blog.comments.length}Read Message</button>
                                    </div>
                                    
                                    
                                </div>
                                {blog.comments.length==0?(
                                    <div className="h-auto w-full bg-dark2 rounded-xl my-2 p-4">
                                        <p className='text-center text-white noto-sans my-2'>there is no Comments</p>
                                    </div>
                                ):(
                                    blog.comments.map((comment)=>{
                                        return(
                                            <div key={comment._id} className=" h-auto w-full rounded-xl bg-dark2 my-2 p-4 ">
                                                <div className="h-auto w-full flex justify-center">
                                                    <div className="h-auto w-[10%] rounded-full">
                                                        {comment.user.image?
                                                        <FaUserCircle
                                                        className="text-3xl text-dark1 cursor-pointer hover:text-gray-400"/>
                                                        :
                                                        <img src={comment.user.image} className="h-8 w-8 rounded-full"/>
                                                    }
                                                        
                                                    </div>
                                                    <div className="h-auto w-[90%]">
                                                        <p className="text-white text-lg font-normal">{comment.userId.name}</p>
                                                    </div>
                                                </div>
                                                
                                                <p className="text-white text-lg font-normal"></p>
                                                <p className="text-white text-base font-normal">{comment.content}</p>
                                            </div>
    
                                        )   
                                    })
                                )

                                }
                                
                            </div>
                        )}))
                }
                
            </div>
        </>
    )
}