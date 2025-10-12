import { useEffect, useState } from "react"
import AxiosInstance from "../utils/AxiosInstance";
import { Link } from "react-router-dom";
import { LuArrowUpRight } from "react-icons/lu";
import { FiMessageCircle } from "react-icons/fi";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import { format } from 'date-fns';
import BlogPagination from "./BlogPagination";

export default function BlogSearch(){
    const [pagesData, setPagesData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [searchBlog,setSearchBlog]=useState([]);
    const [searchQuery,setsearchQuery]=useState({
        title:'',
        category: '',
        sortBy: '',
        order: 'desc',
        limit: 5,
        page: 1,});
    useEffect(()=>{
        fetchQueryblog(searchQuery);
    },[searchQuery]);
    const fetchQueryblog=async(searchQuery)=>{
        try{
            const response=await AxiosInstance.post("/customer/blog/find",{...searchQuery});
            if(response.data.data){
                console.log(response.data)
                setSearchBlog(response.data.data);
                setPagesData(response.data.pagination);
            }
        }
        catch (err) {
            console.error('Request Error:', err.message);
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setsearchQuery((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    
    // FIXED: Handle page changes separately
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        setsearchQuery(prev => ({
            ...prev,
            page: newPage
        }));
    }
return(
    <>
    <div className="h-auto w-full bg-pureblack">
        <div className="h-auto w-[80%] mx-auto rounded-lg my-2">
            <form className="h-auto w-full flex items-center justify-center rounded-lg">
            <input name="title" value={searchQuery.title} onChange={handleInputChange} className="h-auto min-h-[10vh] belowSm:min-h-[8vh] w-[80%] border-1 border-gray-400 rounded-l-lg outline-none p-2 text-xl belowSm:text-base"/>
            <button type="submit" className="h-full min-h-[10vh] w-[20%] border-1 border-gray-400 font-medium text-2xl belowSm:min-h-[8vh] text-pureblack bg-amber-400 rounded-r-lg belowSm:text-sm">Search</button>
            </form>
        </div>
        {searchBlog==null||searchBlog==''?
        <div className="h-auto min-h-[90%] w-full">
            <p>Please search the Blog you want </p>
        </div>        
        :
        
        searchBlog.map((blog)=>{
            return(
            <div key={blog._id} className="lg:h-[30vh] lg:w-full md:h-[30vh] md:w-full sm:h-auto sm:w-full belowSm:h-auto belowSm:w-full border-y border-gray-800 ">
                                    <div className="lg:h-full lg:w-[90%] lg:mx-auto lg:flex lg:justify-center
                                md:h-full md:w-[90%] md:mx-auto md:flex md:justify-center
                                sm:h-full sm:w-[90%] sm:mx-auto sm:py-6
                                belowSm:h-full belowSm:w-[90%] belowSm:mx-auto belowSm:py-6 ">
                                        <div className="lg:h-full lg:w-[25%] lg:flex lg:items-center
                                    md:h-full md:w-[25%] md:flex md:items-center
                                    sm:h-auto sm:w-full sm:flex sm:items-center
                                    belowSm:h-auto belowSm:w-full belowSm:flex belowSm:items-center">
                                            <div className="lg:h-auto lg:w-full lg:flex lg:justify-center
                            md:h-auto md:w-full md:flex md:justify-center
                            sm:h-fautoll sm:w-full sm:flex sm:justify-center
                            belowSm:h-auto belowSm:w-full">
                                                <div className="lg:h-[30vh] lg:w-full md:h-[30vh] md:w-full sm:h-[30vh] sm:w-full belowSm:h-[30vh] belowSm:w-full p-2">
                                                    <img src={blog.image} className="rounded-lg h-full w-full" />
                                                </div>

                                                <div className="lg:hidden md:hidden sm:block belowSm:block">
                                                    <Link to={`/blog/${blog.slug}`}>
                                                        <div className="p-2 rounded bg-dark1 text-base font-normal text-gray1 flex justify-center">
                                                            <p>View Blogs</p>
                                                            <LuArrowUpRight className="text-xl text-amber-400" />
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="lg:h-full lg:w-[55%] lg:flex lg:items-center
                        md:h-full md:w-[55%] md:flex md:items-center
                        sm:h-[20vh] sm:w-full sm:flex sm:items-center
                        belowSm:h-auto belowSm:w-full belowSm:flex belowSm:items-center px-4
                        ">
                                            <div className="text-gray1 font-normal ">
                                                <p className="my-2 font-medium">{format(new Date(blog.createdAt), 'MMMM dd, yyyy')}</p>
                                                <p className="text-white text-xl font-medium">{blog.title}</p>
                                                <p className="line-clamp-2">{blog.introduction}</p>
                                                <div className="h-[5vh] my-1 w-full flex justify-start gap-4 ">
                                                    <button className="px-2 text-sm font-normal text-gray1 rounded-xl border border-gray-800 flex justify-center items-center gap-2">
                                                        <FaHeart className="text-amber-400" />
                                                        <p>{blog.likes.length}</p>
                                                    </button>
                                                    <button className="px-2 text-sm font-normal text-gray1 rounded-xl border border-gray-800 flex justify-center items-center gap-2">
                                                        <FiMessageCircle className="text-gray-1" />
                                                        <p>{blog.comments.length}</p>
                                                    </button>
                                                    <button className="px-2 text-sm font-normal text-gray1 rounded-xl border border-gray-800 flex justify-center items-center gap-2">
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
                                            <div className="w-full p-2 rounded bg-dark1 text-base font-normal text-gray1">
                                                <Link to={`/blog/${blog.slug}`} className=" flex justify-center">
                                                    <p>View All Blogs</p>
                                                    <LuArrowUpRight className="text-xl text-amber-400" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
        )})}
        {pagesData == null ? "" :
                                <BlogPagination
                                    totalPages={pagesData.totalPages}
                                    currentPage={currentPage}
                                    setCurrentPage={handlePageChange} // Use the handler instead
                                />
                            }
        

    </div>
    
    </>
)
}