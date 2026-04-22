import { motion } from "framer-motion";
import { GiRevolt } from "react-icons/gi";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom"; // ✅ Added Link for routing

const features = [
  {
    id: "inspire",
    title: "Inspiring Stories",
    description: "Read success stories and get inspired by tech innovators, leaders, and real-world projects.",
    icon: BsArrowUpRightCircleFill,
    link: "/inspire"
  },
  {
    id: "news",
    title: "Latest Tech News",
    description: "Stay updated with the latest announcements in tech, AI, and modern development frameworks.",
    icon: BsArrowUpRightCircleFill,
    link: "/news"
  },
  {
    id: "podcasts",
    title: "Insightful Podcasts",
    description: "Listen to expert discussions and deep dives into modern software engineering and tech trends.",
    icon: BsArrowUpRightCircleFill,
    link: "/podcast"
  }
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t dark:from-black dark:via-gray-900 dark:to-transparent from-slate-50 via-white to-transparent pt-32 pb-12 relative overflow-hidden transition-colors duration-500">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-0 left-20 w-96 h-96 dark:bg-gradient-to-r dark:from-orange-500/10 dark:to-yellow-400/10 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-24 w-72 h-72 dark:bg-gradient-to-r dark:from-purple-500/10 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
            <Link to={feature.link} key={feature.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group p-8 lg:p-10 rounded-3xl dark:bg-gray-900/50 bg-slate-50/50 dark:border-gray-800/50 border-slate-200/50 hover:dark:border-orange-400/50 hover:border-blue-400/50 hover:dark:bg-white/10 hover:bg-slate-100/70 transition-all duration-500 hover:shadow-2xl dark:hover:shadow-orange-500/20 hover:shadow-blue-500/20 h-full cursor-pointer"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold dark:text-white text-gray-900 group-hover:text-orange-400 transition-colors">
                    {feature.title}
                  </h3>
                  <feature.icon className="text-4xl lg:text-5xl dark:text-amber-400 text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
                <p className="dark:text-gray-400 text-gray-600 text-lg leading-relaxed">{feature.description}</p>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Main Footer Links - ✅ Cleaned up responsive grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16 w-full lg:w-[90%] mx-auto">
          
          {/* Column 1: Explore */}
          <div className="text-base font-base dark:text-gray-400 text-gray-600 flex flex-col space-y-3">
            <p className="text-xl dark:text-orange-400 text-blue-500 mb-2 font-medium">Explore</p>
            <Link to="/" className="dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors">Home</Link>
            <Link to="/blog/search" className="dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors">Search Blogs</Link>
            <Link to="/inspire" className="dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors">Inspire</Link>
          </div>

          {/* Column 2: Media */}
          <div className="text-base font-base dark:text-gray-400 text-gray-600 flex flex-col space-y-3">
            <p className="text-xl dark:text-orange-400 text-blue-500 mb-2 font-medium">Media</p>
            <Link to="/news" className="dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors">Tech News</Link>
            <Link to="/podcast" className="dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors">Podcasts</Link>
          </div>

          {/* Column 3: Account */}
          <div className="text-base font-base dark:text-gray-400 text-gray-600 flex flex-col space-y-3">
            <p className="text-xl dark:text-orange-400 text-blue-500 mb-2 font-medium">Account</p>
            <Link to="/profile" className="dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors">My Profile</Link>
            <Link to="/security" className="dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors">Security</Link>
            <Link to="/login" className="dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors">Login</Link>
            <Link to="/register" className="dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors">Register</Link>
          </div>

          {/* Column 4: Support */}
          <div className="text-base font-base dark:text-gray-400 text-gray-600 flex flex-col space-y-3">
            <p className="text-xl dark:text-orange-400 text-blue-500 mb-2 font-medium">Support</p>
            <Link to="/contact" className="dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors">Contact Us</Link>
            <span className="dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors cursor-pointer">Terms & Conditions</span>
            <span className="dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-900 transition-colors cursor-pointer">Privacy Policy</span>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px w-full lg:w-[90%] mx-auto dark:bg-gradient-to-r bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-10 rounded-full" />

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-[90%] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm dark:text-gray-400 text-gray-600 text-center sm:text-left"
        >
          <div>
            <span className="font-semibold dark:text-gray-300 text-gray-800">Neuradhoor</span> — Empowering the tech community.
          </div>
          
          <div>
            © 2026 Neuradhoor. All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  );
}