'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray via-white to-silver dark:from-black-light dark:via-blue-dark dark:to-purple-dark">
      <motion.div
        className="flex flex-col items-center space-y-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        {/* Main loading animation container */}
        <div className="relative w-24 h-24">
          {/* Outer rotating ring */}
          <motion.div
            className="absolute inset-0 border-2 border-transparent rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent, #1f7a8c, #3f88c5, transparent)',
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Middle pulsing ring */}
          <motion.div
            className="absolute inset-2 border-2 border-blue-green/30 rounded-full bg-gradient-to-r from-hero-font/10 to-blue-green/10 backdrop-blur-sm"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Inner core with gradient */}
          <motion.div
            className="absolute inset-4 rounded-full bg-gradient-to-br from-hero-font via-blue-green to-aero shadow-lg"
            animate={{
              scale: [1, 0.9, 1],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Orbiting dots */}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute w-3 h-3 bg-gradient-to-r from-orange-light to-red-light rounded-full shadow-md"
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: '0 0',
              }}
              animate={{
                rotate: 360,
                x: [-12, -12],
                y: [-12, -12],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
                delay: index * 0.6,
              }}
            />
          ))}

          {/* Floating particles */}
          {[0, 1, 2, 3, 4].map((index) => (
            <motion.div
              key={`particle-${index}`}
              className="absolute w-1 h-1 bg-aero rounded-full"
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + index * 10}%`,
              }}
              animate={{
                y: [-10, -20, -10],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Loading text with typewriter effect */}
        <motion.div className="text-center space-y-2">
          <motion.h2
            className="text-2xl font-bold bg-gradient-to-r from-hero-font via-blue-green to-aero bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Loading
          </motion.h2>

          <motion.div className="flex space-x-1 justify-center">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-hero-font dark:bg-blue-light rounded-full"
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>

          <motion.p
            className="text-sm text-blue-dark/90 dark:text-gray-light/80 font-medium"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            Preparing your experience...
          </motion.p>
        </motion.div>

        {/* Progress bar */}
        <motion.div className="w-64 h-1 bg-gray-light/30 dark:bg-blue-line/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-hero-font to-blue-green rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Ambient glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-hero-font/5 to-blue-green/5 rounded-full blur-3xl -z-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
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
