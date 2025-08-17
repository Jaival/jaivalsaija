'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function LoadingSpinner() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className='relative min-h-screen flex items-center justify-center bg-transparent overflow-hidden'>
      <motion.div
        className='flex flex-col items-center space-y-12'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Modern loading animation container */}
        <div className='relative'>
          {/* Main spinner with modern design */}
          <motion.div
            className='relative w-20 h-20'
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Outer ring with gradient stroke */}
            <motion.div
              className='absolute inset-0 rounded-full'
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 70%, var(--primary) 100%)',
                mask: 'radial-gradient(circle at center, transparent 32px, black 34px)',
                WebkitMask:
                  'radial-gradient(circle at center, transparent 32px, black 34px)',
              }}
              animate={prefersReducedMotion ? { rotate: 0 } : { rotate: 360 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 1.4,
                repeat: prefersReducedMotion ? 0 : Infinity,
                ease: 'linear',
              }}
            />

            {/* Inner ring with counter rotation */}
            <motion.div
              className='absolute inset-2 rounded-full'
              style={{
                background:
                  'conic-gradient(from 180deg, transparent 60%, var(--ring) 100%)',
                mask: 'radial-gradient(circle at center, transparent 24px, black 26px)',
                WebkitMask:
                  'radial-gradient(circle at center, transparent 24px, black 26px)',
              }}
              animate={prefersReducedMotion ? { rotate: 0 } : { rotate: -360 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 1.8,
                repeat: prefersReducedMotion ? 0 : Infinity,
                ease: 'linear',
              }}
            />

            {/* Central glowing dot */}
            <motion.div
              className='absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-hero-font to-blue-green shadow-lg'
              animate={{
                scale: [1, 1.2, 1],
                boxShadow: [
                  '0 0 10px rgba(31, 122, 140, 0.25)',
                  '0 0 18px rgba(31, 122, 140, 0.45)',
                  '0 0 10px rgba(31, 122, 140, 0.25)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: prefersReducedMotion ? 0 : Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Floating geometric shapes */}
          {[0, 1, 2, 3].map(index => (
            <motion.div
              key={`shape-${index}`}
              className='absolute w-2 h-2 rounded-full bg-gradient-to-r from-hero-font/30 to-blue-green/30'
              style={{
                left: `${Math.cos((index * Math.PI) / 2) * 60 + 40}px`,
                top: `${Math.sin((index * Math.PI) / 2) * 60 + 40}px`,
              }}
              animate={{
                y: prefersReducedMotion ? 0 : [-5, 5, -5],
                x: prefersReducedMotion ? 0 : [-3, 3, -3],
                opacity: prefersReducedMotion ? 0.4 : [0.4, 0.8, 0.4],
                scale: prefersReducedMotion ? 1 : [0.9, 1.15, 0.9],
              }}
              transition={{
                duration: 3,
                repeat: prefersReducedMotion ? 0 : Infinity,
                delay: index * 0.5,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Modern text with clean typography */}
        <motion.div
          className='text-center space-y-4'
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
          className='absolute inset-0 bg-gradient-radial from-hero-font/8 via-transparent to-transparent blur-3xl -z-10'
          animate={{
            scale: prefersReducedMotion ? 1 : [1, 1.08, 1],
            opacity: prefersReducedMotion ? 0.25 : [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 4,
            repeat: prefersReducedMotion ? 0 : Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  );
}
