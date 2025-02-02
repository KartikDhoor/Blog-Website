export default function OtpConformation() {
    return (
        <>
            <div className="h-screen w-full bg-dark2 relative">
                <div className="h-[10vh] w-full bg-pureblack">
                    <div className="h-full w-[90%] mx-auto flex items-center">
                        <p className="text-3xl font-medium text-white">Blog Website</p>
                    </div>
                </div>

                <div className=" h-auto w-[50%] mx-auto my-8 rounded-xl bg-dark1 p-4">
                    <p className="text-3xl text-center text-white">OTP</p>
                    <form>
                        <p className="text-base text-gray1">please confirm the otp from email</p>
                        <input type="number" className="h-[7vh] w-full rounded-lg border border-gray-800 bg-dark1 text-white outline-none p-2" />
                        <p className="text-white text-end p-2">resend Otp</p>
                        <div className="h-auto w-full flex justify-center">
                            <button className="text-xl px-4 py-2 bg-sky-700 rounded-xl">confirm</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
} 