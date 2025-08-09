'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const footerVariants = {
    hidden: { opacity: 0.7 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0.8 },
    visible: { opacity: 1 },
  };

  return (
    <motion.footer
      // className="bg-gradient-to-bl from-gray via-white to-silver dark:from-purple-dark dark:via-blue-dark dark:to-purple-dark  border-gray-light/30 dark:border-blue-line/30"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={footerVariants}
    >
      <div className="max-w-6xl px-4 py-12 mx-auto md:py-20">
        {/* Decorative line */}
        <motion.div
          className="h-px w-full bg-gradient-to-r from-transparent via-blue-line to-transparent mb-8"
          variants={itemVariants}
        />

        {/* Centered copyright and name section */}
        <motion.div
          className="flex flex-wrap items-center justify-center text-base text-blue-dark dark:text-gray-light"
          variants={itemVariants}
        >
          <span className="mr-2">© {new Date().getFullYear()}.</span>

          {/* Hover animation on name - improved implementation */}
          <div className="group mr-2">
            <span className="relative inline-block">
              <span className="font-semibold text-hero-font dark:text-blue-light cursor-default">
                Jaival Saija.
              </span>
              {/* Sliding underline animation */}
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-orange-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </span>
          </div>

          <span>All Rights Reserved.</span>
        </motion.div>
      </div>
    </motion.footer>
  );
}
