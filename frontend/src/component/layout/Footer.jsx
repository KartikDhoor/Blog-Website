import { motion } from "framer-motion";
import { GiRevolt } from "react-icons/gi";
import { BsArrowUpRightCircleFill } from "react-icons/bs"; // ✅ FIXED: Only Bs icon

const features = [
  {
    id: "resources", // ✅ FIXED: Unique IDs
    title: "Resource Access",
    description: "Instant access to ebooks, whitepapers, reports, and cutting-edge tech resources for developers.",
    icon: BsArrowUpRightCircleFill
  },
  {
    id: "community", // ✅ FIXED: Unique IDs
    title: "Community Forums",
    description: "Join discussions with 10K+ developers, share knowledge, and collaborate on real projects.",
    icon: BsArrowUpRightCircleFill
  },
  {
    id: "events", // ✅ FIXED: Unique IDs
    title: "Tech Events",
    description: "Exclusive webinars, workshops, and conferences with industry leaders and AI pioneers.",
    icon: BsArrowUpRightCircleFill
  }
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t dark:from-black dark:via-gray-900 dark:to-transparent from-slate-50 via-white to-transparent pt-32 pb-12 relative overflow-hidden transition-colors duration-500">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-20 w-96 h-96 dark:bg-gradient-to-r dark:from-orange-500/10 dark:to-yellow-400/10 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-24 w-72 h-72 dark:bg-gradient-to-r dark:from-purple-500/10 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 dark:bg-gradient-to-r dark:from-orange-500/20 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-xl dark:border-orange-400/30 border-blue-400/30 rounded-2xl mb-8 mx-auto max-w-max">
            <div className="w-3 h-3 dark:bg-orange-400 bg-blue-400 rounded-full animate-ping"></div>
            <span className="dark:text-orange-300 text-blue-400 font-semibold uppercase tracking-wider text-lg">Learn, Connect and Innovate</span>
          </div>
          
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-12"
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="p-6 dark:bg-gradient-to-br dark:from-orange-500/20 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-xl dark:border-orange-400/30 border-blue-400/30 rounded-3xl shadow-2xl"
            >
              <GiRevolt className="text-8xl lg:text-9xl dark:text-orange-400 text-blue-400" />
            </motion.div>
            
            <div className="max-w-4xl">
              <h2 className="text-4xl lg:text-6xl xl:text-7xl font-black dark:bg-gradient-to-r from-white via-orange-200 to-yellow-300 bg-gradient-to-r from-slate-900 via-blue-400 to-indigo-500 bg-clip-text dark:text-transparent text-transparent leading-tight mb-6">
                Be Part of the Future Tech Revolution
              </h2>
              <p className="text-xl dark:text-gray-400 text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Immerse yourself in the world of future technology. Explore comprehensive resources, 
                connect with fellow tech enthusiasts, and drive innovation. Join a dynamic community of forward-thinkers.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-6 mb-20 dark:bg-white/5 bg-slate-100/50 dark:backdrop-blur-xl backdrop-blur-xl dark:border-white/10 border-slate-200/50 rounded-3xl p-8 lg:p-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id} // ✅ FIXED: Unique key
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group p-8 lg:p-10 rounded-3xl dark:bg-gray-900/50 bg-slate-50/50 dark:border-gray-800/50 border-slate-200/50 hover:dark:border-orange-400/50 hover:border-blue-400/50 hover:dark:bg-white/10 hover:bg-slate-100/70 transition-all duration-500 hover:shadow-2xl dark:hover:shadow-orange-500/20 hover:shadow-blue-500/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold dark:text-white text-gray-900 group-hover:text-orange-400 transition-colors">
                  {feature.title}
                </h3>
                <feature.icon className="text-4xl lg:text-5xl dark:text-amber-400 text-blue-400 group-hover:scale-110 transition-transform" />
              </div>
              <p className="dark:text-gray-400 text-gray-600 text-lg leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Footer Links */}
        <div className="lg:h-auto lg:w-[90%] lg:mx-auto lg:flex lg:justify-center lg:p-2
                        md:h-auto md:w-[90%] md:mx-auto md:flex md:justify-center md:p-2
                        sm:h-auto sm:w-[90%] sm:mx-auto sm:flex sm:justify-center sm:flex-wrap
                        belowSm:h-auto belowSm:w-[90%] belowSm:mx-auto belowSm:flex belowSm:justify-center belowSm:p-2 belowSm:flex-wrap
                        grid lg:grid-cols-5 gap-12 mb-16">
          
          <div className="lg:h-full lg:w-[20%] md:h-full md:w-[20%] sm:h-auto sm:w-[50%] belowSm:h-auto belowSm:w-[50%] text-base font-base dark:text-gray-400 text-gray-600 space-y-4">
            <p className="text-xl dark:text-orange-400 text-blue-500 my-4 font-medium">Home</p>
            <p className="my-2 dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors cursor-pointer">Projects</p>
            <p className="my-2 dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors cursor-pointer">Tutorials</p>
            <p className="my-2 dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors cursor-pointer">Code Library</p>
            <p className="my-2 dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors cursor-pointer">Success Stories</p>
            <p className="my-2 dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors cursor-pointer">Contact</p>
            <p className="my-2 dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors cursor-pointer">Newsletter</p>
          </div>

          <div className="lg:h-full lg:w-[20%] md:h-full md:w-[20%] sm:h-auto sm:w-[50%] belowSm:h-auto belowSm:w-[50%] text-base font-base dark:text-gray-400 text-gray-600 space-y-4">
            <p className="text-xl dark:text-orange-400 text-blue-500 my-4 font-medium">News</p>
            <p className="my-2 dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors cursor-pointer">Latest Tutorials</p>
            <p className="my-2 dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors cursor-pointer">Video Guides</p>
            <p className="my-2 dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors cursor-pointer">Tech Stack</p>
            <p className="my-2 dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors cursor-pointer">Best Practices</p>
            <p className="my-2 dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors cursor-pointer">Industry News</p>
            <p className="my-2 dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors cursor-pointer">Open Source</p>
          </div>

          <div className="lg:h-full lg:w-[20%] md:h-full md:w-[20%] sm:h-auto sm:w-[50%] belowSm:h-auto belowSm:w-[50%] text-base font-base dark:text-gray-400 text-gray-600 space-y-4">
            <p className="text-xl dark:text-orange-400 text-blue-500 my-4 font-medium">Category</p>
            <p className="my-2 dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors cursor-pointer">AI & ML</p>
            <p className="my-2 dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors cursor-pointer">Backend Dev</p>
            <p className="my-2 dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors cursor-pointer">Cloud & DevOps</p>
            <p className="my-2 dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors cursor-pointer">Frontend Frameworks</p>
            <p className="my-2 dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors cursor-pointer">Mobile Development</p>
            <p className="my-2 dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors cursor-pointer">Database Design</p>
          </div>

          <div className="lg:h-full lg:w-[20%] md:h-full md:w-[20%] sm:h-auto sm:w-[50%] belowSm:h-auto belowSm:w-[50%] text-base font-base dark:text-gray-400 text-gray-600 space-y-4">
            <p className="text-xl dark:text-orange-400 text-blue-500 my-4 font-medium">About</p>
            <p className="my-2 dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors cursor-pointer">Our Mission</p>
            <p className="my-2 dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors cursor-pointer">TechTalk AI</p>
            <p className="my-2 dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors cursor-pointer">Community</p>
          </div>

          <div className="lg:h-full lg:w-[20%] md:h-full md:w-[20%] sm:h-auto sm:w-[90%] sm:mx-auto belowSm:h-auto belowSm:w-[90%] belowSm:mx-auto text-base font-base dark:text-gray-400 text-gray-600 space-y-6">
            <p className="text-xl dark:text-gray-400 text-gray-600 my-2 font-medium">Newsletters</p>
            <div className="space-y-3">
              <input 
                className="w-full h-[8vh] dark:bg-gray-900/50 bg-slate-100/50 dark:text-white text-gray-900 rounded-xl p-4 outline-none focus:dark:border-orange-400/50 focus:border-blue-400/50 dark:border-gray-800/50 border-slate-200/50 text-lg placeholder-gray-500 focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 focus:ring-offset-slate-50"
                placeholder="Enter your email"
              />
              <button className="w-full py-4 px-6 dark:bg-amber-400 bg-blue-500 dark:text-black text-white rounded-xl font-medium text-lg hover:dark:bg-amber-500 hover:bg-blue-600 hover:scale-105 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-[90%] mx-auto dark:bg-gradient-to-r bg-gradient-to-r from-transparent via-gray-200/50 to-transparent my-12 rounded-full" />

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:h-[5vh] lg:w-[90%] lg:mx-auto lg:flex lg:justify-center lg:p-2
                        md:h-[5vh] md:w-[90%] md:mx-auto md:flex md:justify-center md:p-2
                        sm:h-[10vh] sm:w-[90%] sm:mx-auto sm:flex sm:justify-center sm:p-2
                        belowSm:h-[10vh] belowSm:w-[90%] belowSm:mx-auto belowSm:flex belowSm:justify-center belowSm:p-2
                        flex flex-col lg:flex-row items-center justify-between gap-8 text-sm dark:text-gray-400 text-gray-600"
        >
          <div className="text-start">
            <span className="hover:dark:text-orange-400 hover:text-blue-500 transition-colors cursor-pointer mr-4">Terms & Conditions</span>
            <span className="hover:dark:text-orange-400 hover:text-blue-500 transition-colors cursor-pointer">Privacy Policy</span>
          </div>
          
          <div className="text-end">
            © 2025 Neuradhoor. All future rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
