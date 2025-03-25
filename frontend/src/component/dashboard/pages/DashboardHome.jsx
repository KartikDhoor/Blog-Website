import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import { BiSolidLike } from "react-icons/bi";
import { RiMessage2Fill } from "react-icons/ri";
import { FaUpload } from "react-icons/fa";
import AxiosInstance from "../../utils/AxiosInstance";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { DiVim } from 'react-icons/di';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



export default function DashboardHome() {
  const [blogsData, setBlogsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales ($)',
        data: [5000, 8000, 6000, 7000, 9000],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly blog Data',
      },
    },
  };
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const blog = await AxiosInstance.post("/customer/blogs",);
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
  }, []);
  if (loading) {
    return (
      <>
        <div className=''>
          <p>Loading</p>
        </div>
      </>
    )
  }
  return (
    <>
      <div className="h-full w-full p-2 bg-pureblack">
        <div className="md:h-[10vh] md:w-[95%] mx-auto flex justify-center items-center">
          <div className="md:h-auto md:w-[70%] sm:h-auto sm:w-[90%] belowSm:h-auto belowSm:w-[85%] text-xl text-gray-900 flex items-center">
            <p className="text-2xl font-medium text-white">Dashboard</p>
          </div>
          <div className="md:h-auto md:w-[30%] sm:h-auto sm:w-[10%] belowSm:h-auto belowSm:w-[15%] flex justify-center items-center gap-2">
            <select className="md:w-[40%] md:block sm:hidden belowSm:hidden p-2 rounded-lg border border-gray-800">
              <option>
                10-11-2024
              </option>
              <option>
                12-11-2024
              </option>
            </select>
            <select className="md:w-[40%] md:block sm:hidden belowSm:hidden p-2 rounded-lg border border-gray-800">
              <option>
                10-11-2024
              </option>
              <option>
                12-11-2024
              </option>
            </select>
            <div className="h-full md:w-[20%] sm:w-full belowSm:w-full p-2 relative">
              <img src="https://picsum.photos/1920/1080" className="h-10 w-10 rounded-full" />
              <div className="h-3 w-3 bg-lime-600 rounded-full absolute bottom-2 right-2 "></div>
            </div>
          </div>
        </div>
        <div className="h-[60vh] w-[90%] mx-auto rounded-xl bg-dark1 my-3">
          <Bar data={data} options={options} />;
        </div>
        <div className='h-auto w-[90%] mx-auto rounded-xl  bg-pureblack'>
          {blogsData.map((blog) => {
            return (
              <div key={blog._id} className='md:h-full md:w-full sm:h-auto sm:w-full belowSm:h-auto belowSm:w-full md:flex md:justify-center bg-dark1 rounded-lg  rounded-lg border-gray-800 border my-4'>
                <div className="md:h-[40vh] md:w-[30%] sm:h-[30vh] sm:w-full belowSm:h-[30vh] belowSm:w-full">
                  <img src={blog.image} className="h-full w-full md:rounded-l-lg sm:rounded-t-lg belowSm:rounded-t-lg" />
                </div>
                <div className="md:h-[40vh] md:w-[70%] sm:h-auto sm:w-full belowSm:h-auto belowSm:w-full p-2">
                  <div className="md:h-[20vh] md:w-full">
                    <p className="text-2xl font-medium text-white">{blog.title}</p>
                    <p className="text-lg font-medium text-gray1">{blog.author}</p>
                    <p className="line-clamp-3 text-gray-400">{blog.introduction}
                    </p>
                  </div>
                  <div className="md:h-[10vh] md:w-full md:flex md:justify-center sm:h-auto sm:w-full belowSm:h-auto belowSm:w-full">
                    <div className="md:w-[20%] sm:w-full belowSm:w-full sm:flex sm:justify-center belowSm:flex belowSm:justify-center ">
                      <div className="sm:w-[50%] belowSm:w-[50%]">
                        <p className="font-medium text-lg text-gray1">Category</p>
                      </div>
                      <div className="sm:w-[50%] belowSm:w-[50%]">
                        <p className="text-base font-medium text-gray-600">{blog.category.categoryName}</p>
                      </div>
                    </div>
                    <div className="md:w-[20%] sm:w-full belowSm:w-full sm:flex sm:justify-center belowSm:flex belowSm:justify-center ">
                      <div className="sm:w-[50%] belowSm:w-[50%]">
                        <p className="font-medium text-lg text-gray1">Created At</p>
                      </div>
                      <div className="sm:w-[50%] belowSm:w-[50%]">
                        <p className="text-base font-medium text-gray-600">{format(new Date(blog.createdAt), 'MMMM dd, yyyy')}</p>
                      </div>
                    </div>
                    <div className="md:w-[20%] sm:w-full belowSm:w-full sm:flex sm:justify-center belowSm:flex belowSm:justify-center ">
                      <div className="sm:w-[50%] belowSm:w-[50%]">
                        <p className="font-medium text-lg text-gray1">Status</p>
                      </div>
                      <div className="sm:w-[50%] belowSm:w-[50%]">
                        <p className="text-base font-medium text-gray-600">{blog.status}</p>
                      </div>
                    </div>
                    <div className="md:w-[20%] sm:w-full belowSm:w-full sm:flex sm:justify-center belowSm:flex belowSm:justify-center ">
                      <div className="sm:w-[50%] belowSm:w-[50%]">
                        <p className="font-medium text-lg text-gray1">Published At</p>
                      </div>
                      <div className="sm:w-[50%] belowSm:w-[50%]">
                        <p className="text-base font-medium text-gray-600">{format(new Date(blog.publishAt), 'MMMM dd, yyyy')}</p>
                      </div>
                    </div>
                    <div className="md:w-[20%] sm:w-full belowSm:w-full sm:flex sm:justify-center belowSm:flex belowSm:justify-center ">
                      <div className="sm:w-[50%] belowSm:w-[50%]">
                        <p className="font-medium text-lg text-gray1">Update At</p>
                      </div>
                      <div className="sm:w-[50%] belowSm:w-[50%]">
                        <p className="text-base font-medium text-gray-600">{format(new Date(blog.updatedAt), 'MMMM dd, yyyy')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="md:h-[8vh] md:w-full grid md:grid-cols-3 sm:grid-cols-2 belowSm:grid-cols-2 gap-4">
                    <div className="h-full w-full py-2 px-4 rounded-lg border-2 border-gray-800 flex justify-center items-center bg-pureblack">
                      <BiSolidLike className="text-3xl text-amber-600" />
                      <p className="text-xl font-medium text-gray1"><span>{blog.likes.length}</span>Likes</p>
                    </div>
                    <div className="h-full w-full py-2 px-4 rounded-lg border-2 border-gray-800 flex justify-center items-center bg-pureblack">
                      <RiMessage2Fill className="text-3xl text-amber-600" />
                      <p className="text-lg font-medium text-gray1"><span>{blog.comments.length}</span>Messages</p>
                    </div>
                    <Link to={`/blog/${blog.slug}`} className='md:col-span-1 sm:col-span-2 belowSm:col-span-2'>
                      <div className="md:col-span-1 sm:col-span-2 belowSm:col-span-2 h-full w-full py-2 px-4 rounded-lg border-2 border-lime-800 bg-pureblack text-center" onClick={(e) => { updateButtonHandler(blog) }}>
                        <p className="text-xl font-medium text-gray1"><span></span>Read Blog</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}