import { IoSearch } from "react-icons/io5"

export default function DashboardCategory() {
    return (
        <>
            <div className="h-auto w-full p-2">
                <div className="md:h-[10vh] md:w-[95%] mx-auto flex justtify-center">
                    <div className="h-full w-[50%] flex items-center">
                        <p className="text-2xl font-medium">Category</p>
                    </div>
                    <div className="h-auto w-[30%] flex justify-center border rounded-lg my-2.5 border-gray-900">
                        <input className="w-[90%] rounded-l-lg outline-none p-1" />
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

            </div>
        </>
    )
}