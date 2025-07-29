'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black-light dark:via-black-dark dark:to-blue-dark overflow-hidden">
      <motion.div
        className="flex flex-col items-center space-y-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Modern loading animation container */}
        <div className="relative">
          {/* Main spinner with modern design */}
          <motion.div
            className="relative w-20 h-20"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Outer ring with gradient stroke */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 70%, #e07a5f 100%)',
                mask: 'radial-gradient(circle at center, transparent 32px, black 34px)',
                WebkitMask:
                  'radial-gradient(circle at center, transparent 32px, black 34px)',
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Inner ring with counter rotation */}
            <motion.div
              className="absolute inset-2 rounded-full"
              style={{
                background:
                  'conic-gradient(from 180deg, transparent 60%, #da344d 100%)',
                mask: 'radial-gradient(circle at center, transparent 24px, black 26px)',
                WebkitMask:
                  'radial-gradient(circle at center, transparent 24px, black 26px)',
              }}
              animate={{ rotate: -360 }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Central glowing dot */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-red-light to-red-dark shadow-lg"
              animate={{
                scale: [1, 1.2, 1],
                boxShadow: [
                  '0 0 10px rgba(224, 122, 95, 0.3)',
                  '0 0 20px rgba(224, 122, 95, 0.6)',
                  '0 0 10px rgba(224, 122, 95, 0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Floating geometric shapes */}
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={`shape-${index}`}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-orange-light/40 to-red-light/40"
              style={{
                left: `${Math.cos((index * Math.PI) / 2) * 60 + 40}px`,
                top: `${Math.sin((index * Math.PI) / 2) * 60 + 40}px`,
              }}
              animate={{
                y: [-5, 5, -5],
                x: [-3, 3, -3],
                opacity: [0.4, 0.8, 0.4],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.5,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Modern text with clean typography */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* <motion.div
            className="text-2xl font-light tracking-wide bg-gradient-to-r from-red-light via-orange-light to-red-dark bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ backgroundSize: '200% 200%' }}
          >
            Loading
          </motion.div> */}
        </motion.div>

        {/* Ambient background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-red-light/5 via-transparent to-transparent blur-3xl -z-10"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  );
}
