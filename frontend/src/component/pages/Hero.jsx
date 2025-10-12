import { motion } from "framer-motion"
export default function Hero() {
    return (
        <>
            <div className="comme  lg:h-[90vh] lg:w-full 
                            md:h-full md:w-full bg-pureblack"
            >
                <div className="lg:h-[90vh] lg:w-[95%] lg:mx-auto lg:flex lg:justify-center lg:items-center 
                                md:h-[90vh] md:w-full md:flex md:justify-center md:items-center 
                                sm:h-[180vh] sm:w-full"
                >
                    <div className="lg:h-full lg:w-[60%] 
                                    md:h-[90vh] md:w-[60%] 
                                    sm:h-[90vh] sm:w-full"
                    >
                        <div className='lg:h-full lg:w-full 
                                        md:h-full md:w-full md:animate-slideLeftIn
                                        sm:h-full sm:w-full sm:animate-slideBottomIn
                                        belowSm:animate-slideBottomIn'
                        >
                            <div className="lg:h-[60vh] lg:w-full lg:text-gray1 lg:flex lg:items-center lg:border-r lg:border-b lg:border-gray-800 
                                            md:h-[60vh] md:w-full md:text-gray1 md:flex md:items-center md:border-r md:border-b md:border-gray-800 
                                            sm:h-[60vh] sm:w-full sm:text-gray1 sm:flex sm:items-center sm:border-r sm:border-b sm:border-gray-800
                                            belowSm:border-b belowSm:border-gray-800 text-gray1 p-4 "
                            >
                                <div>
                                    <p className="lg:text-3xl 
                                                  md:text-3xl 
                                                  sm:text-xl 
                                                  belowSm:text-lg font-normal mb-2"
                                    >
                                        Your journey to Tomorrow Begin Here
                                    </p>
                                    <p className="lg:text-6xl 
                                                  md:text-6xl
                                                  sm:text-4xl 
                                                  belowSm:text-3xl font-semibold my-5 text-white "
                                    >
                                        Master the Art of Code & AI Innovation
                                    </p>
                                    <p className="lg:text-base 
                                                  md:text-base
                                                  sm:text-sm 
                                                  belowSm:text-sm font-normal my-2 "
                                    >
                                        Welcome to your hub for practical coding tutorials, AI development guides,
                                        and cutting-edge tech insights. Learn to build real projects, master modern
                                        frameworks, and leverage AI to accelerate your development journey.
                                    </p>
                                </div>
                            </div>
                            <div className=" lg:h-[30vh] lg:w-full lg:flex lg:justify-center 
                                            md:h-[30vh] md:w-full md:flex md:justify-center 
                                            sm:h-[30vh] sm:w-full sm:flex sm:justify-center 
                                            belowSm:h-[30vh] belowSm:w-full belowSm:flex belowSm:justify-center border-y border-r border-gray-800 text-gray1 font-normal "
                            >
                                <div className="lg:h-full lg:w-[30%] lg:text-5xl lg:flex lg:items-center lg:justify-center lg:border-r lg:border-gray-800 
                                                md:h-full md:w-[30%] md:flex md:items-center md:justify-center md:text-4xl md:border-r md:border-gray-800 
                                                sm:h-full sm:w-[30%] sm:flex sm:items-center sm:justify-center sm:text-3xl sm:border-r sm:border-gray-800 
                                                belowSm:h-full belowSm:w-[30%] belowSm:flex belowSm:items-center belowSm:justify-center belowSm:text-3xl belowSm:border-r belowSm:border-gray-800 text-center"
                                >
                                    <div>
                                        <p className="text-white">
                                            30
                                            <span className="text-amber-400">
                                                +
                                            </span>
                                        </p>
                                        <p className="lg:text-base 
                                                      md:text-base 
                                                      sm:text-base 
                                                      belowSm:text-sm belowSm:tracking-wider"
                                        >
                                            Code Tutorials
                                        </p>
                                    </div>
                                </div>
                                <div className="lg:h-full lg:w-[30%] lg:text-5xl lg:flex lg:items-center lg:justify-center lg:border-r lg:border-gray-800 
                                                md:h-full md:w-[30%] md:flex md:items-center md:justify-center md:text-4xl md:border-r md:border-gray-800 
                                                sm:h-full sm:w-[30%] sm:flex sm:items-center sm:justify-center sm:text-3xl sm:border-r sm:border-gray-800 
                                                belowSm:h-full belowSm:w-[30%] belowSm:flex belowSm:items-center belowSm:justify-center belowSm:text-3xl belowSm:border-r belowSm:border-gray-800"
                                >
                                    <div>
                                        <p className="text-white text-center">
                                            2K
                                            <span className="text-amber-400">
                                                +
                                            </span>
                                        </p>
                                        <p className="lg:text-base 
                                                      md:text-base 
                                                      sm:text-base 
                                                      belowSm:text-sm text-center belowSm:tracking-wider"
                                        >
                                            Projects Built
                                        </p>
                                    </div>
                                </div>
                                <div className="lg:h-full lg:w-[30%] lg:text-5xl lg:flex lg:items-center lg:justify-center 
                                                md:h-full md:w-[30%] md:flex md:items-center md:justify-center md:text-4xl 
                                                sm:h-full sm:w-[30%] sm:flex sm:items-center sm:justify-center sm:text-3xl 
                                                belowSm:h-full belowSm:w-[30%] belowSm:flex belowSm:items-center belowSm:justify-center belowSm:text-3xl text-center"
                                >
                                    <div>
                                        <p className="text-white">
                                            10K
                                            <span className="text-amber-400">
                                                +
                                            </span>
                                        </p>
                                        <p className="lg:text-base 
                                                      md:text-base 
                                                      sm:text-base 
                                                      belowSm:text-sm belowSm:tracking-wider">Developers <br className="md:hidden sm:hidden belowSm:block" />Learning</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    < motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{
                            duration: 0.4,
                            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                        }}
                        className="lg:h-full lg:w-[40%] md:h-[90vh] md:w-[40%] sm:h-[90vh] sm:w-full belowSm:h-[60vh] belowSm:w-full"
                    >
                        <div
                            // className=" relative lg:h-full lg:w-[40%] md:h-[90vh] md:w-[40%] sm:h-[90vh] sm:w-full belowSm:h-[60vh] belowSm:w-full p-4"
                            className=' relative h-full w-full p-4'
                        >
                            <img src="./src/assets/hero.jpg" className="z-0 h-full w-full rounded-xl" />
                            <div className="h-auto w-full absolute z-0 bg-transparent top-0">
                                <div className='h-[2vh] w-full bg-pureblack'>

                                </div>
                                <div className="h-auto w-full flex justify-between">

                                    <div className="h-[6vh] w-[10%] bg-pureblack rounded-br-xl ">

                                    </div>
                                    <div className="h-[6vh] w-[40%] bg-transparent">

                                    </div>
                                </div>

                            </div>
                        </div>

                    </motion.div>

                </div>
            </div>
        </>
    )
}