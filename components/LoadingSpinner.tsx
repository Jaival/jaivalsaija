'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        className="flex flex-col items-center space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Modern loading spinner */}
        <motion.div
          className="relative w-16 h-16"
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="absolute inset-0 border-4 border-gray-light/30 dark:border-blue-line/30 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-hero-font dark:border-t-blue-light rounded-full" />
        </motion.div>

        {/* Loading text */}
        <motion.p
          className="text-gray-dark dark:text-gray-light font-medium"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
}
