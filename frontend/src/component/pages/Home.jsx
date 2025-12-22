import Hero from "./Hero";
import { motion, useInView } from "framer-motion";
import { HiUserGroup, HiChartBar } from "react-icons/hi2";
import { BsArrowUpRight } from "react-icons/bs";
import { RiArticleFill, RiTeamLine } from "react-icons/ri";
import { FaPencilRuler } from "react-icons/fa";
import NewsPanel from "./NewsPanel";
import Reviews from "./Reviews";
import { useRef } from "react";

export default function Home() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const isInView1 = useInView(ref1, { once: true, amount: 0.3 });
  const isInView2 = useInView(ref2, { once: true, amount: 0.3 });

  return (
    <div className="min-h-screen pt-32 bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 from-slate-50 via-white to-slate-50 dark:text-white text-gray-900 overflow-hidden transition-colors duration-500">
      {/* ✅ pt-32 = 128px top padding for floating navbar */}
      
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none dark:opacity-20 opacity-10">
        <div className="absolute top-52 left-10 w-72 h-72 dark:bg-gradient-to-r dark:from-orange-500/20 dark:to-yellow-400/20 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-96 h-96 dark:bg-gradient-to-r dark:from-yellow-400/10 dark:to-orange-500/10 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero */}
      <Hero />
      
      

      {/* MAIN HERO SECTION */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 dark:bg-gradient-to-r dark:from-orange-500/20 dark:to-orange-600/20 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-xl dark:border-orange-400/30 border-blue-400/30 rounded-2xl dark:text-orange-400 text-blue-400 font-semibold text-sm uppercase tracking-wider mb-12 hover:dark:bg-orange-500/30 hover:bg-blue-500/30 transition-all">
              <div className="w-2 h-2 dark:bg-orange-400 bg-blue-400 rounded-full animate-ping"></div>
              Featured Collection
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 dark:bg-gradient-to-r from-white via-orange-300 to-yellow-400 bg-gradient-to-r from-slate-900 via-blue-400 to-indigo-500 bg-clip-text dark:text-transparent text-transparent leading-tight">
              AI Blog<br className="hidden lg:block"/>
              <span className="block text-5xl md:text-6xl dark:text-white/90 text-slate-900/90 font-normal mt-4">Platform</span>
            </h1>
            
            <p className="text-xl md:text-2xl dark:text-gray-400 text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed font-light">
              Cutting-edge insights from AI pioneers. Stay ahead of the curve with expert analysis and future-focused content.
            </p>
            
            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
              <motion.button 
                className="group relative px-12 py-6 dark:bg-gradient-to-r from-orange-500 to-orange-600 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-xl rounded-3xl shadow-2xl dark:shadow-orange-500/25 shadow-blue-500/25 hover:shadow-orange-500/40 hover:shadow-blue-500/40 transition-all duration-500 overflow-hidden"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                Start Reading
                <BsArrowUpRight className="ml-2 text-lg group-hover:translate-x-1 transition-transform inline-block" />
              </motion.button>
              
              <motion.button 
                className="px-12 py-6 dark:border-white/20 dark:bg-white/5 border-slate-200/50 bg-slate-100/50 backdrop-blur-xl dark:text-white text-gray-900 font-bold text-xl rounded-3xl hover:dark:bg-white/10 hover:bg-slate-200/70 hover:dark:border-white/40 hover:border-slate-300/70 transition-all duration-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                View Analytics
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* FEATURED STATS */}
      <section ref={ref1} className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                id: "articles",
                icon: RiArticleFill, 
                title: "1,247", 
                subtitle: "Articles Published", 
                color: "dark:from-orange-400 from-blue-500 dark:to-orange-500 to-blue-600"
              },
              { 
                id: "authors",
                icon: RiTeamLine, 
                title: "58", 
                subtitle: "Expert Authors", 
                color: "dark:from-blue-400 from-emerald-500 dark:to-blue-500 to-emerald-600"
              },
              { 
                id: "readers",
                icon: HiChartBar,
                title: "2.4M", 
                subtitle: "Monthly Readers", 
                color: "dark:from-purple-400 from-purple-500 dark:to-purple-500 to-purple-600"
              },
            ].map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="group relative overflow-hidden rounded-3xl dark:bg-white/5 bg-gray-100/50 backdrop-blur-xl dark:border-white/10 border-gray-200/50 p-10 hover:dark:border-white/20 hover:border-gray-300/50 hover:dark:bg-white/10 hover:bg-gray-100/70 transition-all duration-500 hover:shadow-2xl dark:hover:shadow-orange-500/20 hover:shadow-blue-500/20 hover:-translate-y-4"
                whileHover={{ scale: 1.02 }}
              >
                {/* Gradient Orb */}
                <div className={`absolute top-6 right-6 w-24 h-24 bg-gradient-to-r ${stat.color} opacity-20 rounded-2xl blur-xl group-hover:opacity-40 transition-all`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <stat.icon className="text-xl text-white" />
                  </div>
                  <h3 className="text-4xl font-bold dark:text-white text-gray-900 mb-3 group-hover:text-orange-400 transition-colors">
                    {stat.title}
                  </h3>
                  <p className="dark:text-gray-400 text-gray-600 font-medium text-lg uppercase tracking-wide">
                    {stat.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE SECTIONS */}
      <section ref={ref2} className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Future Tech Blog */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <div className="w-20 h-20 dark:bg-gradient-to-r from-orange-400 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                <FaPencilRuler className="text-2xl text-white" />
              </div>
              <h3 className="text-5xl lg:text-6xl font-black dark:text-white text-slate-900 mb-6 leading-tight">
                Future Tech<br/>
                <span className="dark:text-orange-400 text-blue-500">Blog Hub</span>
              </h3>
              <p className="text-xl dark:text-gray-400 text-gray-600 mb-8 max-w-lg leading-relaxed">
                Comprehensive coverage of emerging technologies with expert insights and practical guides.
              </p>
              <ul className="space-y-3 dark:text-gray-400 text-gray-600">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 dark:bg-orange-400 bg-blue-400 rounded-full"></div>
                  1,000+ articles monthly
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 dark:bg-orange-400 bg-blue-400 rounded-full"></div>
                  AI, robotics, biotech coverage
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 dark:bg-orange-400 bg-blue-400 rounded-full"></div>
                  Daily fresh content
                </li>
              </ul>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: "depth", title: "Depth", desc: "In-depth analysis", color: "dark:from-blue-400 from-emerald-400 dark:to-blue-500 to-emerald-500" },
                { id: "live", title: "Live", desc: "Real-time updates", color: "dark:from-green-400 from-green-500 dark:to-green-500 to-green-600" },
                { id: "expert", title: "Expert", desc: "Industry leaders", color: "dark:from-purple-400 from-purple-500 dark:to-purple-500 to-purple-600" },
                { id: "visual", title: "Visual", desc: "Rich graphics", color: "dark:from-orange-400 from-orange-500 dark:to-orange-500 to-orange-600" },
              ].map((feature) => (
                <motion.div
                  key={feature.id}
                  className="group p-8 rounded-2xl dark:bg-white/5 bg-slate-100/50 backdrop-blur-xl dark:border-white/10 border-slate-200/50 hover:dark:border-white/20 hover:border-slate-300/70 hover:dark:bg-white/10 hover:bg-slate-100/70 transition-all duration-500 hover:shadow-xl dark:hover:shadow-orange-500/20 hover:shadow-blue-500/20"
                  whileHover={{ y: -8 }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110`}>
                    <span className="text-white font-bold text-sm">→</span>
                  </div>
                  <h4 className="text-xl font-bold dark:text-white text-slate-900 mb-2 group-hover:text-orange-400">
                    {feature.title}
                  </h4>
                  <p className="dark:text-gray-400 text-gray-600 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Research Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div className="order-2 lg:order-1">
              <div className="w-20 h-20 dark:bg-gradient-to-r from-purple-400 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                <FaPencilRuler className="text-2xl text-white" />
              </div>
              <h3 className="text-5xl lg:text-6xl font-black dark:text-white text-slate-900 mb-6 leading-tight">
                Research<br/>
                <span className="dark:text-purple-400 text-indigo-500">Insights</span>
              </h3>
              <p className="text-xl dark:text-gray-400 text-gray-600 mb-8 max-w-lg leading-relaxed">
                Deep technical analysis and research papers from leading AI researchers.
              </p>
              <ul className="space-y-3 dark:text-gray-400 text-gray-600">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 dark:bg-purple-400 bg-indigo-400 rounded-full"></div>
                  500+ research articles
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 dark:bg-purple-400 bg-indigo-400 rounded-full"></div>
                  Interactive visualizations
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 dark:bg-purple-400 bg-indigo-400 rounded-full"></div>
                  Academic contributors
                </li>
              </ul>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 order-1 lg:order-2">
              {[
                { id: "papers", title: "Papers", desc: "Peer-reviewed research", color: "dark:from-indigo-400 from-pink-400 dark:to-indigo-500 to-pink-500" },
                { id: "data", title: "Data", desc: "Live datasets", color: "dark:from-emerald-400 from-teal-400 dark:to-emerald-500 to-teal-500" },
                { id: "trends", title: "Trends", desc: "Emerging patterns", color: "dark:from-rose-400 from-rose-500 dark:to-rose-500 to-rose-600" },
                { id: "visuals", title: "Visuals", desc: "Interactive charts", color: "dark:from-sky-400 from-sky-500 dark:to-sky-500 to-sky-600" },
              ].map((feature) => (
                <motion.div
                  key={feature.id}
                  className="group p-8 rounded-2xl dark:bg-white/5 bg-slate-100/50 backdrop-blur-xl dark:border-white/10 border-slate-200/50 hover:dark:border-white/20 hover:border-slate-300/70 hover:dark:bg-white/10 hover:bg-slate-100/70 transition-all duration-500 hover:shadow-xl dark:hover:shadow-purple-500/20 hover:shadow-indigo-500/20"
                  whileHover={{ y: -8 }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110`}>
                    <span className="text-white font-bold text-sm">→</span>
                  </div>
                  <h4 className="text-xl font-bold dark:text-white text-slate-900 mb-2 group-hover:text-purple-400">
                    {feature.title}
                  </h4>
                  <p className="dark:text-gray-400 text-gray-600 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <NewsPanel headline="Master AI Tomorrow" />
      <Reviews />
    </div>
  );
}
