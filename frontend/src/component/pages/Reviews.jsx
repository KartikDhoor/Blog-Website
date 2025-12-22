import { motion } from "framer-motion";
import { RiStarSFill } from "react-icons/ri";

const reviews = [
  {
    id: "sarah", // ✅ FIXED: Unique IDs
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    content: "This platform transformed my coding journey. The AI tutorials are practical and the community is incredibly supportive. I've built 3 production apps using what I learned here!",
    role: "Full-Stack Developer"
  },
  {
    id: "mike", // ✅ FIXED: Unique IDs
    name: "Mike Rodriguez",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    content: "Best resource for AI + modern frameworks. The step-by-step projects helped me land my dream job at a FAANG company. Highly recommend for serious developers.",
    role: "AI Engineer"
  },
  {
    id: "priya", // ✅ FIXED: Unique IDs
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    content: "From beginner to building complex apps in months. The tutorials are production-ready and the instructors actually work at top tech companies. Worth every second!",
    role: "Frontend Developer"
  }
];

export default function Reviews() {
  return (
    <section className="py-32 bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-black from-slate-50 via-white to-slate-100 overflow-hidden relative transition-colors duration-500">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-72 h-72 dark:bg-gradient-to-r dark:from-yellow-400/10 dark:via-orange-400/10 bg-gradient-to-r from-blue-400/10 via-indigo-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-20 w-96 h-96 dark:bg-gradient-to-r dark:from-purple-500/10 dark:to-orange-500/10 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 dark:bg-gradient-to-r dark:from-yellow-500/20 dark:to-orange-500/20 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-xl dark:border-yellow-400/30 border-blue-400/30 rounded-2xl mb-8 mx-auto max-w-max">
            <div className="w-3 h-3 dark:bg-yellow-400 bg-blue-400 rounded-full animate-ping"></div>
            <span className="dark:text-yellow-300 text-blue-400 font-semibold uppercase tracking-wider text-lg">What Our Readers Say</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-black dark:bg-gradient-to-r from-white via-yellow-200 to-orange-400 bg-gradient-to-r from-slate-900 via-blue-400 to-indigo-500 bg-clip-text dark:text-transparent text-transparent leading-tight">
            Real Words From
            <br />
            <span className="block text-6xl lg:text-7xl dark:bg-gradient-to-r dark:from-orange-400 dark:to-yellow-400 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text dark:text-transparent text-transparent">
              Real Readers
            </span>
          </h2>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id} // ✅ FIXED: Unique key
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group relative dark:bg-white/5 bg-slate-100/50 dark:backdrop-blur-xl backdrop-blur-xl dark:border-white/10 border-slate-200/50 rounded-3xl p-10 hover:dark:border-yellow-400/50 hover:border-blue-400/50 hover:dark:bg-white/10 hover:bg-slate-200/70 transition-all duration-700 hover:shadow-2xl dark:hover:shadow-yellow-500/20 hover:shadow-blue-500/20 overflow-hidden h-full"
            >
              {/* Floating Badge */}
              <div className="absolute top-6 right-6 w-24 h-24 dark:bg-gradient-to-r dark:from-yellow-400/20 bg-gradient-to-r from-blue-400/20 rounded-2xl blur-xl group-hover:scale-110 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              
              {/* Avatar & Name */}
              <div className="flex items-center gap-4 mb-8">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                >
                  <img 
                    src={review.avatar}
                    alt={review.name}
                    className="w-20 h-20 rounded-3xl dark:ring-white/20 ring-slate-200/50 group-hover:dark:ring-yellow-400/50 group-hover:ring-blue-400/50 transition-all duration-500 object-cover shadow-2xl"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 border-4 border-white dark:border-black rounded-full animate-ping"></div>
                </motion.div>
                <div>
                  <h4 className="text-2xl font-bold dark:text-white text-gray-900 group-hover:text-yellow-400 transition-colors">
                    {review.name}
                  </h4>
                  <p className="dark:text-yellow-400 text-blue-500 font-medium text-lg">{review.role}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-8">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <motion.div
                    key={`star-${review.id}-${i}`} // ✅ FIXED: Unique star keys
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="text-2xl dark:text-yellow-400 text-blue-400 drop-shadow-lg"
                  >
                    <RiStarSFill />
                  </motion.div>
                ))}
              </div>

              {/* Review Text */}
              <p className="dark:text-gray-300 text-gray-600 text-xl leading-relaxed mb-8 line-clamp-6 group-hover:dark:text-gray-200 group-hover:text-gray-800 transition-colors">
                "{review.content}"
              </p>

              {/* Quote Mark */}
              <div className="absolute bottom-8 left-8 text-6xl dark:text-yellow-400/20 text-blue-400/20 font-serif font-thin opacity-50 group-hover:opacity-80 transition-opacity">
                »
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
