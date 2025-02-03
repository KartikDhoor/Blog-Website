import { IoSearch } from "react-icons/io5"

export default function DashboardCategory() {
    return (
        <>
            <div className="h-full w-full p-2 bg-pureblack">
                <div className="md:h-[10vh] md:w-[95%] sm:h-[10vh] sm:w-[90%] belowSm:h-[10vh] belowSm:w-full mx-auto flex justtify-center">
                    <div className="h-full w-[50%] flex items-center">
                        <p className="text-2xl font-medium text-white">Category</p>
                    </div>
                    <div className="h-auto w-[30%] flex justify-center border rounded-lg my-2.5 border-gray-900">
                        <input className="w-[90%] rounded-l-lg outline-none p-1 bg-dark1" />
                        <div className="w-[10%] rounded-r-lg flex items-center">
                            <IoSearch className="text-gray-800 text-2xl " />
                        </div>
                    </div>
                    <div className="h-full w-[20%] flex justify-center items-center">
                        <button className="h-12 text-lg font-medium bg-green-600 text-gray-900 px-4 py-2 rounded-lg">
                            Create
                        </button>
                    </div>
                </div>
                <div className="md:h-auto md:w-[90%] md:m-auto sm:h-auto sm:w-[90%] belowSm:h-auto belowSm:w-[90%] flex justify-center rounded-xl bg-dark1 border border-gray-800 my-4">
                    <div className="h-[30vh] w-[30%] rounded-l-lg">
                        <img src='https://picsum.photos/1920/1080' className="h-full w-full rounded-l-lg "/>
                    </div>
                    <div className="h-[30vh] w-[70%] rounded-r-lg p-4">
                        <p className="text-white text-2xl font-medium">Category name </p>
                        <p className="text-gray1 text-xl font-medium">category description</p>
                        <div className="h-auto w-full flex justify-center items-center">
                            <div className="h-auto w-[30%]">
                                <p className="text-lg text-gray1 font-medium">created At</p>
                                <p>november 12,2025</p>
                            </div>
                            <div className="h-auto w-[30%]">
                                <p className="text-lg text-gray1 font-medium">status</p>
                                active
                            </div>
                            <div className="h-auto w-[30%]">
                                <p className="text-lg text-gray1 font-medium">updated At</p>
                                <p>november 12,2025</p>
                            </div>
                        </div>
                        <div className="h-auto w-full grid grid-cols-3 gap-3 my-2 ">
                                <button className="py-2 px-4 bg-dark2 rounded-xl text-lg font-medium border-2 border-dark2">
                                    Blog
                                </button>
                                <button className="py-2 px-4 bg-lime-600 rounded-xl text-lg font-medium border-2 border-dark2">
                                    update
                                </button>
                                <button className="py-2 px-4 bg-amber-700 rounded-xl text-lg font-medium border-2 border-dark2">
                                    delete
                                </button>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}