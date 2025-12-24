import { motion } from "framer-motion";

export default function DashboardPopUp({ message, onConfirm, onCancel, isOpen = true }) {
  if (!isOpen) return null;

  // 🛡️ PREVENT EVENT BUBBLING
  const handleCancel = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onCancel?.();
  };

  const handleConfirm = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onConfirm?.();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleCancel} // Close on backdrop click
    >
      {/* Animated Glass Popup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, type: "spring" }}
        className="w-full max-w-md bg-gradient-to-br from-white/80 dark:from-white/10 to-white/50 dark:to-orange-500/10 backdrop-blur-2xl border border-white/40 dark:border-orange-400/40 rounded-3xl shadow-2xl shadow-orange-500/20 dark:shadow-orange-500/30 p-8 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()} // 🛡️ STOP bubbling inside popup
      >
        {/* Gradient Border Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-400/20 rounded-3xl blur-xl opacity-70"></div>
        
        {/* Close Button */}
        <motion.button
          onClick={handleCancel}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-4 right-4 w-10 h-10 bg-white/70 dark:bg-white/20 backdrop-blur-xl border border-white/50 dark:border-orange-400/50 rounded-2xl text-gray-600 dark:text-orange-200 hover:bg-orange-500/20 hover:text-orange-500 transition-all duration-300 flex items-center justify-center z-10 shadow-lg"
        >
          ×
        </motion.button>

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-400/20 to-yellow-400/20 rounded-3xl backdrop-blur-xl border-2 border-orange-400/30 flex items-center justify-center">
            <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          {/* Message */}
          <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-gray-900 dark:from-orange-100 via-orange-200 to-yellow-200 bg-clip-text text-transparent mb-6 leading-tight px-4">
            Confirm Action
          </h2>
          
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 font-medium mb-8 px-4 leading-relaxed">
            {message}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Confirm Button */}
            <motion.button
              onClick={handleConfirm}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 min-h-[56px] px-8 text-lg font-black bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-yellow-500 text-white rounded-2xl shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 border border-orange-400/30 backdrop-blur-xl transition-all duration-300"
            >
              Proceed
            </motion.button>

            {/* Cancel Button */}
            <motion.button
              onClick={handleCancel}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 min-h-[56px] px-8 text-lg font-semibold bg-white/80 dark:bg-white/20 backdrop-blur-xl border-2 border-orange-400/50 dark:border-orange-400/30 rounded-2xl shadow-xl hover:bg-white dark:hover:bg-white/30 hover:border-orange-500/60 text-gray-800 dark:text-orange-200 transition-all duration-300"
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
