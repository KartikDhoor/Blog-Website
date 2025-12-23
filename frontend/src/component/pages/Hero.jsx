import { motion } from "framer-motion";
import heroImage from '/src/assets/hero.jpg';

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 from-orange-50 via-white to-yellow-50 overflow-hidden relative">
      {/* Animated Background Particles - ORANGE THEME */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-20 w-72 h-72 dark:bg-gradient-to-r dark:from-orange-500/10 dark:to-yellow-400/10 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-24 w-96 h-96 dark:bg-gradient-to-r dark:from-orange-600/10 dark:to-yellow-500/10 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 dark:bg-gradient-to-r dark:from-orange-400/15 bg-gradient-to-r from-orange-400/25 rounded-full blur-2xl animate-bounce [animation-delay:2s]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center h-[85vh]">
          
          {/* Content Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 lg:space-y-12"
          >
            {/* Badge - ORANGE THEME */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500/20 to-yellow-400/20 backdrop-blur-xl border-orange-400/40 dark:border-orange-400/50 rounded-2xl text-orange-400 dark:text-orange-300 font-semibold text-lg uppercase tracking-wider shadow-lg hover:bg-orange-500/30 transition-all"
            >
              <div className="w-3 h-3 bg-orange-400 rounded-full animate-ping"></div>
              Your Journey to Tomorrow Begins Here
            </motion.div>

            {/* Main Headline - WHITISH ORANGE */}
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl lg:text-7xl xl:text-8xl font-black leading-tight dark:bg-gradient-to-r from-orange-100 via-orange-200 to-yellow-200 bg-gradient-to-r from-orange-600 via-orange-400 to-yellow-400 bg-clip-text dark:text-transparent text-transparent drop-shadow-lg"
            >
              Master the Art of
              <br />
              <span className="block text-6xl lg:text-7xl xl:text-8xl dark:bg-gradient-to-r dark:from-orange-300 dark:to-yellow-300 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text dark:text-transparent text-transparent drop-shadow-2xl">
                Code & AI Innovation
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl lg:text-2xl dark:text-gray-300 text-gray-700 max-w-lg leading-relaxed font-light"
            >
              Welcome to your hub for practical coding tutorials, AI development guides,
              and cutting-edge tech insights. Learn to build real projects, master modern
              frameworks, and leverage AI to accelerate your development journey.
            </motion.p>

            {/* Stats Grid - ORANGE THEME */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 dark:border-gray-800 border-orange-200/50"
            >
              {[
                { id: "tutorials", number: "30+", label: "Code Tutorials" },
                { id: "projects", number: "2K+", label: "Projects Built" },
                { id: "developers", number: "10K+", label: "Developers Learning" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  className="group text-center p-6 bg-white/50 dark:bg-white/10 backdrop-blur-xl border-white/30 dark:border-white/20 rounded-2xl hover:bg-white/70 dark:hover:bg-white/20 hover:border-orange-400/50 transition-all duration-500 hover:shadow-2xl dark:hover:shadow-orange-500/20 hover:shadow-orange-500/20"
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className="text-4xl lg:text-5xl font-black dark:bg-gradient-to-r dark:from-orange-400 dark:via-yellow-400 dark:to-orange-500 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500 bg-clip-text dark:text-transparent text-transparent group-hover:scale-110 transition-transform drop-shadow-lg">
                    {stat.number}
                  </div>
                  <p className="dark:text-gray-400 text-gray-700 font-medium text-base lg:text-lg mt-2 tracking-wide uppercase">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image Section - ORANGE THEME */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              scale: { type: "spring", damping: 15, stiffness: 100 }
            }}
            className="relative h-[500px] lg:h-[600px] xl:h-[700px] w-full"
          >
            <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-black/80 bg-gradient-to-br from-white/80 rounded-3xl backdrop-blur-sm"></div>
            
            {/* Replace with your hero image */}
            <div className="absolute inset-0 bg-gradient-to-br dark:from-orange-500/20 dark:to-yellow-500/20 from-orange-400/30 to-yellow-400/30 rounded-3xl blur-xl animate-pulse"></div>
            
            <img 
              src={heroImage}
              alt="AI Innovation"
              className="w-full h-full object-cover rounded-3xl shadow-2xl absolute inset-0"
            />
            
            {/* Decorative Overlays - ORANGE */}
            <div className="absolute top-6 left-6 w-24 h-24 bg-gradient-to-r from-orange-500/40 to-yellow-400/40 rounded-2xl blur-xl"></div>
            <div className="absolute bottom-8 right-8 w-32 h-32 bg-gradient-to-r from-orange-600/30 to-yellow-500/30 rounded-2xl blur-2xl animate-pulse"></div>
            
            {/* Corner Decorations - ORANGE */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-500/30 to-yellow-400/30 rounded-br-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-yellow-400/20 to-orange-500/20 rounded-tl-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
