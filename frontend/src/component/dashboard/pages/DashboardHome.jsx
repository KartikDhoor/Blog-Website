export default function DashboardHome(){
    return(
        <>
        <div className="h-full w-full p-2">
            <div className="md:h-[10vh] md:w-[95%] mx-auto flex justify-center items-center">
                <div className="h-full w-[70%] text-xl text-gray-900">
                    <p className="text-xl font-medium">Dashboard</p>
                </div>
                <div className="h-full w-[30%] flex justify-center gap-2">
                    <select className="p-2 rounded-lg border border-gray-800">
                        <option>
                            10-11-2024
                        </option>
                        <option>
                        12-11-2024
                        </option>
                    </select>
                    <select className="p-2 rounded-lg border border-gray-800">
                        <option>
                            10-11-2024
                        </option>
                        <option>
                        12-11-2024
                        </option>
                    </select>
                    <div className="h-full w-[20%] p-2">
                        <img src="https://picsum.photos/1920/1080" className="h-full w-[85%] rounded-full"/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}