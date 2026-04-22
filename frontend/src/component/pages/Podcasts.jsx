import { motion } from "framer-motion";
import { TbBulbFilled } from "react-icons/tb";
import { GoStarFill } from "react-icons/go";
import { LuArrowUpRight } from "react-icons/lu";
import { GiConversation } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function Podcasts() {
  return (
    <>
      <div className="min-h-screen pt-32 dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:text-white text-gray-900 font-sans pb-32">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full dark:bg-gray-900/90 bg-slate-100/50 backdrop-blur-xl border-b dark:border-gray-800 border-slate-200/50 py-16"
        >
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="w-full lg:w-2/3">
              <motion.button 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6 px-4 py-2 dark:bg-gray-800/50 bg-white border dark:border-gray-700 border-slate-300 rounded-xl text-sm font-medium dark:text-gray-300 text-gray-700 shadow-sm"
              >
                Dive into the details
              </motion.button>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight dark:bg-gradient-to-r from-orange-100 via-orange-200 to-yellow-200 bg-gradient-to-r from-orange-600 via-orange-400 to-yellow-400 bg-clip-text dark:text-transparent text-transparent"
              >
                In Depth Reports And Analysis
              </motion.h1>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full lg:w-1/3 flex flex-wrap sm:flex-nowrap justify-center lg:justify-end gap-3"
            >
              {["WhitePaper", "Ebooks", "Reports"].map((item, i) => (
                <button 
                  key={item}
                  className="flex-1 sm:flex-none px-6 py-3 dark:bg-gray-800/80 bg-white dark:text-gray-300 text-gray-700 border dark:border-gray-700 border-slate-200 rounded-2xl hover:dark:bg-orange-500/20 hover:bg-orange-500/10 hover:dark:text-orange-400 hover:text-orange-600 hover:dark:border-orange-400/50 hover:border-orange-400/50 transition-all font-medium shadow-sm"
                >
                  {item}
                </button>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Featured Podcast 1 */}
        <div className="border-b dark:border-gray-800 border-slate-200/50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
            
            {/* Left Side (Host & Rating) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-[40%] md:border-r dark:border-gray-800 border-slate-200/50 p-8 lg:p-16 flex flex-col justify-center"
            >
              <motion.div 
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <TbBulbFilled className="text-8xl dark:text-orange-400 text-orange-500 drop-shadow-xl mb-8" />
              </motion.div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <h2 className="text-3xl font-bold dark:text-white text-gray-900">AI Revolution</h2>
                <div className="flex items-center gap-1 dark:bg-gray-800/50 bg-slate-100 border dark:border-gray-700 border-slate-200 px-3 py-2 rounded-full">
                  {[...Array(5)].map((_, i) => (
                    <GoStarFill key={i} className="text-lg text-amber-400" />
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 p-4 dark:bg-gray-900/50 bg-slate-100 rounded-2xl border dark:border-gray-800 border-slate-200">
                <div className="flex-1 border-b sm:border-b-0 sm:border-r dark:border-gray-700 border-slate-300 pb-4 sm:pb-0 pr-0 sm:pr-4">
                  <p className="text-sm dark:text-gray-400 text-gray-500 uppercase tracking-wider mb-1">Host</p>
                  <p className="font-semibold dark:text-white text-gray-900">Dr. Sarah Mitchell</p>
                </div>
                <div className="flex-1 flex items-center justify-center sm:justify-start pl-0 sm:pl-2">
                  <button className="w-full flex items-center justify-center gap-2 py-3 px-4 dark:bg-gray-800 bg-white border dark:border-gray-700 border-slate-300 rounded-xl font-semibold dark:text-gray-300 text-gray-800 hover:dark:bg-orange-500/20 hover:bg-orange-50 hover:dark:text-orange-400 hover:text-orange-600 transition-all shadow-sm">
                    Listen Podcast <LuArrowUpRight className="text-xl dark:text-orange-400 text-orange-500" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Side (Image & Info) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-[60%] p-8 lg:p-16 flex flex-col justify-center"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl mb-8 group h-64 sm:h-80">
                <img 
                  src="https://picsum.photos/1000/600?random=1" 
                  alt="AI Healthcare" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-3">
                Delves into the transformative impact of AI
              </h3>
              <p className="dark:text-gray-400 text-gray-600 leading-relaxed mb-8">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo laboriosam aliquam et quidem nemo doloribus temporibus, consequatur placeat? Iure corrupti esse nostrum at quis.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Total Episodes", value: "50" },
                  { label: "Average Length", value: "30 Min" },
                  { label: "Release Freq", value: "Weekly" }
                ].map((stat, i) => (
                  <div key={i} className="dark:bg-gray-900/50 bg-slate-100 border dark:border-gray-800 border-slate-200 rounded-2xl p-4 text-center">
                    <p className="text-xs dark:text-gray-400 text-gray-500 uppercase tracking-wider mb-1">{stat.label}</p>
                    <p className="text-xl font-bold dark:text-white text-gray-900">{stat.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Featured Podcast 2 */}
        <div className="border-b dark:border-gray-800 border-slate-200/50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
            
            {/* Left Side (Host & Rating) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-[40%] md:border-r dark:border-gray-800 border-slate-200/50 p-8 lg:p-16 flex flex-col justify-center"
            >
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <GiConversation className="text-8xl dark:text-orange-400 text-orange-500 drop-shadow-xl mb-8" />
              </motion.div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <h2 className="text-3xl font-bold dark:text-white text-gray-900">Future Talk</h2>
                <div className="flex items-center gap-1 dark:bg-gray-800/50 bg-slate-100 border dark:border-gray-700 border-slate-200 px-3 py-2 rounded-full">
                  {[...Array(5)].map((_, i) => (
                    <GoStarFill key={i} className="text-lg text-amber-400" />
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 p-4 dark:bg-gray-900/50 bg-slate-100 rounded-2xl border dark:border-gray-800 border-slate-200">
                <div className="flex-1 border-b sm:border-b-0 sm:border-r dark:border-gray-700 border-slate-300 pb-4 sm:pb-0 pr-0 sm:pr-4">
                  <p className="text-sm dark:text-gray-400 text-gray-500 uppercase tracking-wider mb-1">Host</p>
                  <p className="font-semibold dark:text-white text-gray-900">Prof. James Lee</p>
                </div>
                <div className="flex-1 flex items-center justify-center sm:justify-start pl-0 sm:pl-2">
                  <button className="w-full flex items-center justify-center gap-2 py-3 px-4 dark:bg-gray-800 bg-white border dark:border-gray-700 border-slate-300 rounded-xl font-semibold dark:text-gray-300 text-gray-800 hover:dark:bg-orange-500/20 hover:bg-orange-50 hover:dark:text-orange-400 hover:text-orange-600 transition-all shadow-sm">
                    Listen Podcast <LuArrowUpRight className="text-xl dark:text-orange-400 text-orange-500" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Side (Image & Info) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-[60%] p-8 lg:p-16 flex flex-col justify-center"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl mb-8 group h-64 sm:h-80">
                <img 
                  src="https://picsum.photos/1000/600?random=2" 
                  alt="Tech Talk" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-3">
                The Ethics of Machine Learning
              </h3>
              <p className="dark:text-gray-400 text-gray-600 leading-relaxed mb-8">
                Explore the deep moral questions surrounding autonomous systems. From data bias to decision-making, we cover the real-world implications of deploying AI at scale.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Total Episodes", value: "120" },
                  { label: "Average Length", value: "45 Min" },
                  { label: "Release Freq", value: "Bi-Weekly" }
                ].map((stat, i) => (
                  <div key={i} className="dark:bg-gray-900/50 bg-slate-100 border dark:border-gray-800 border-slate-200 rounded-2xl p-4 text-center">
                    <p className="text-xs dark:text-gray-400 text-gray-500 uppercase tracking-wider mb-1">{stat.label}</p>
                    <p className="text-xl font-bold dark:text-white text-gray-900">{stat.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Latest Episodes Grid Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full dark:bg-gray-900/90 bg-slate-100/50 backdrop-blur-xl border-b dark:border-gray-800 border-slate-200/50 py-16"
        >
          <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
            <button className="mb-4 px-4 py-2 dark:bg-gray-800/50 bg-white border dark:border-gray-700 border-slate-300 rounded-xl text-sm font-medium dark:text-gray-300 text-gray-700 shadow-sm inline-block">
              Unlock the Power of
            </button>
            <h2 className="text-4xl md:text-5xl font-black dark:text-white text-gray-900">
              Latest Podcast Episodes
            </h2>
          </div>
        </motion.div>

        {/* Latest Episodes Grid */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <motion.div 
                key={item}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group dark:bg-gray-900/50 bg-white rounded-3xl border dark:border-gray-800 border-slate-200/80 overflow-hidden shadow-lg hover:shadow-2xl hover:dark:border-orange-500/50 hover:border-orange-400/50 transition-all duration-500 flex flex-col"
              >
                <div className="h-56 w-full overflow-hidden">
                  <img 
                    src={`https://picsum.photos/600/400?random=${item + 5}`} 
                    alt={`Episode ${item}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">
                    AI in Healthcare Insights
                  </h3>
                  <p className="dark:text-gray-400 text-gray-600 line-clamp-3 mb-8 flex-grow">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore sunt ipsa, atque soluta consequuntur fugiat neque! Illum, eos architecto.
                  </p>
                  <button className="w-full py-4 flex justify-center items-center gap-2 border dark:border-gray-700 border-slate-300 rounded-xl font-semibold dark:text-gray-300 text-gray-800 hover:dark:bg-orange-500/10 hover:bg-orange-50 hover:dark:text-orange-400 hover:text-orange-600 transition-colors">
                    Learn More <LuArrowUpRight className="text-xl dark:text-orange-400 text-orange-500" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}