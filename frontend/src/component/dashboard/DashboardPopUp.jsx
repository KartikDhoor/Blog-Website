export default function DashboardPopUp({message,onConfirm,onCancel}){
    return(
        <>
        <div className="comme fixed h-screen w-full top-0 flex items-center justify-start">
            <div className='h-[25vh] md:w-[50%] relative sm:w-[80%] belowSm:w-[80%] rounded-xl shadow-2xl shadow-pureblack bg-pureblack border-2 border-gray-800 p-2 '>
            <p className="text-lg text-white font-medium mt-4 mb-2">{message}</p>
            <div className="h-auto w-full absolute bottom-5 flex justify-end gap-4 px-4">
                <button className="h-[8vh] text-lg px-4 py-2 rounded-lg font-medium bg-lime-400" onClick={onConfirm}>Procced</button>
                <button className="h-[8vh] text-lg px-4 py-2 rounded-lg font-medium bg-amber-500" onClick={onCancel}>Cancel</button>
            </div>
            </div>
            
        </div>
        </>
    )
}