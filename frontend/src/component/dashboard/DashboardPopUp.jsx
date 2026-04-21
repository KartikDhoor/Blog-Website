import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, XCircle, InfoIcon } from "lucide-react";

export default function DashboardPopUp({ 
  message, 
  onConfirm, 
  onCancel, 
  isOpen = true,
  title = "Confirm Action",
  type = "default", // 'default', 'success', 'error', 'info', 'warning'
  confirmText = "Proceed",
  cancelText = "Cancel"
}) {
  if (!isOpen) return null;

  // Get styling based on type
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'from-green-400/20 to-emerald-500/20',
          borderColor: 'border-green-400/40',
          iconBg: 'bg-green-400/20',
          iconColor: 'text-green-500',
          buttonBg: 'from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700',
          accentColor: 'text-green-500 dark:text-green-400',
        };
      case 'error':
        return {
          icon: XCircle,
          bgColor: 'from-red-400/20 to-rose-500/20',
          borderColor: 'border-red-400/40',
          iconBg: 'bg-red-400/20',
          iconColor: 'text-red-500',
          buttonBg: 'from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700',
          accentColor: 'text-red-500 dark:text-red-400',
        };
      case 'warning':
        return {
          icon: AlertCircle,
          bgColor: 'from-yellow-400/20 to-amber-500/20',
          borderColor: 'border-yellow-400/40',
          iconBg: 'bg-yellow-400/20',
          iconColor: 'text-yellow-500',
          buttonBg: 'from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700',
          accentColor: 'text-yellow-500 dark:text-yellow-400',
        };
      case 'info':
        return {
          icon: InfoIcon,
          bgColor: 'from-blue-400/20 to-cyan-500/20',
          borderColor: 'border-blue-400/40',
          iconBg: 'bg-blue-400/20',
          iconColor: 'text-blue-500',
          buttonBg: 'from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700',
          accentColor: 'text-blue-500 dark:text-blue-400',
        };
      default:
        return {
          icon: AlertCircle,
          bgColor: 'from-orange-400/20 to-yellow-400/20',
          borderColor: 'border-orange-400/40',
          iconBg: 'bg-orange-400/20',
          iconColor: 'text-orange-500',
          buttonBg: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-yellow-500',
          accentColor: 'text-orange-500 dark:text-orange-400',
        };
    }
  };

  const styles = getTypeStyles();
  const IconComponent = styles.icon;

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
      onClick={handleCancel}
    >
      {/* Animated Glass Popup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
        className={`w-full max-w-md bg-gradient-to-br from-white/95 dark:from-gray-950/95 to-white/80 dark:to-orange-950/20 backdrop-blur-3xl border border-white/40 dark:border-orange-400/20 rounded-3xl shadow-2xl shadow-orange-500/20 dark:shadow-orange-500/30 p-8 relative overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated gradient border effect */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-r ${styles.bgColor} rounded-3xl blur-xl opacity-50`}
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Close Button */}
        <motion.button
          onClick={handleCancel}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-5 right-5 w-10 h-10 bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-white/50 dark:border-orange-400/30 rounded-2xl text-gray-600 dark:text-orange-200 hover:bg-orange-500/20 hover:text-orange-500 transition-all duration-300 flex items-center justify-center z-10 shadow-lg"
          title="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className={`w-20 h-20 mx-auto mb-6 ${styles.iconBg} rounded-3xl backdrop-blur-xl border-2 ${styles.borderColor} flex items-center justify-center`}
          >
            <IconComponent className={`w-10 h-10 ${styles.iconColor}`} />
          </motion.div>

          {/* Title */}
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className={`text-2xl md:text-3xl font-black bg-gradient-to-r from-gray-900 dark:from-orange-100 via-orange-600 dark:via-orange-300 to-yellow-500 dark:to-yellow-200 bg-clip-text text-transparent mb-4 leading-tight px-4`}
          >
            {title}
          </motion.h2>

          {/* Message */}
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-gray-700 dark:text-gray-200 font-medium mb-8 px-4 leading-relaxed"
          >
            {message}
          </motion.p>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            {/* Confirm Button */}
            <motion.button
              onClick={handleConfirm}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 min-h-[52px] px-8 text-base font-black bg-gradient-to-r ${styles.buttonBg} text-white rounded-2xl shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 border border-white/20 backdrop-blur-xl transition-all duration-300`}
            >
              {confirmText}
            </motion.button>

            {/* Cancel Button */}
            <motion.button
              onClick={handleCancel}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 min-h-[52px] px-8 text-base font-semibold bg-white/80 dark:bg-white/10 backdrop-blur-xl border-2 border-orange-400/40 dark:border-orange-400/30 rounded-2xl shadow-xl hover:bg-white dark:hover:bg-white/20 hover:border-orange-500/60 text-gray-800 dark:text-orange-100 transition-all duration-300"
            >
              {cancelText}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
