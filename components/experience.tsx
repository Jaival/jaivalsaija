'use client';

import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import userData from 'utils/data';
import BackgroundElements from './backgroundElements';

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section className="min-h-screen">
      {/* Header section - similar to About Me and Projects */}
      <motion.div
        className="min-h-64 max-w-6xl mx-auto relative"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <BackgroundElements />

        <motion.h1
          className="pt-12 sm:pt-16 md:pt-20 pb-4 text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-center md:text-left leading-tight bg-gradient-to-r from-blue-dark via-hero-font to-blue-green bg-clip-text text-transparent dark:from-white dark:via-blue-light dark:to-aero px-4 md:px-8"
          variants={headerVariants}
        >
          Experience.
        </motion.h1>
      </motion.div>

      {/* Main content section */}
      <motion.div
        className="-mt-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="px-4 md:px-8 pb-16 pt-10">
          <motion.div
            className="grid grid-cols-1 max-w-4xl mx-auto pt-12 md:pt-20 relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {userData.experience.map((exp, idx) => (
              <motion.div
                key={`experience-${exp.id}`}
                className="timeline-item"
                variants={itemVariants}
              >
                <ExperienceCard
                  title={exp.title}
                  desc={exp.desc}
                  year={exp.year}
                  company={exp.company}
                  companyLink={exp.companyLink}
                  index={idx}
                />

                {idx !== userData.experience.length - 1 && (
                  <motion.div
                    className="flex flex-col items-center -mt-2 divider-container"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {/* Enhanced blinking dot animation */}
                    <div className="relative z-10">
                      <motion.div
                        className="w-6 h-6 rounded-full bg-gradient-to-r from-green-dark to-green-light shadow-lg"
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Improved ping animation with multiple layers */}
                        <motion.div
                          className="absolute inset-0 w-6 h-6 rounded-full bg-green-dark opacity-75"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 0, 0.7],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeOut',
                          }}
                        />
                        <motion.div
                          className="absolute inset-0 w-6 h-6 rounded-full bg-green-light opacity-50"
                          animate={{
                            scale: [1, 2, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeOut',
                            delay: 0.5,
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Enhanced connecting line */}
                    <motion.div
                      className="w-0.5 h-20 md:h-24 bg-gradient-to-b from-green-dark via-blue-green to-green-light rounded-full shadow-sm"
                      initial={{ height: 0 }}
                      whileInView={{ height: '6rem' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

const ExperienceCard = ({
  title,
  desc,
  year,
  company,
  companyLink = '#',
  index,
}: {
  title: string;
  desc: string;
  year: string;
  company: string;
  companyLink?: string;
  index: number;
}) => {
  return (
    <motion.div
      className="relative z-10 p-6 md:p-8 bg-white/20 dark:bg-black-light/20 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-white/30 dark:border-blue-line/30 group"
      whileHover={{
        y: -4,
        transition: {
          type: 'tween',
          duration: 0.15,
          ease: 'easeOut',
        },
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Floating year badge */}
      <motion.div
        className="absolute -top-4 -left-4 md:-left-6 px-4 py-2 bg-gradient-to-r from-hero-font to-blue-green rounded-xl shadow-lg z-20"
        whileHover={{
          scale: 1.15,
          rotate: 8,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 10,
        }}
      >
        <motion.h1
          className="text-lg md:text-xl font-bold text-white"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.1 }}
        >
          {year}
        </motion.h1>
      </motion.div>

      {/* Content */}
      <div className="pt-4">
        <motion.h2
          className="text-xl md:text-2xl font-bold text-gray-dark dark:text-white mb-2 cursor-default"
          whileHover={{
            x: 2,
          }}
          transition={{
            type: 'tween',
            duration: 0.2,
            ease: 'easeOut',
          }}
        >
          {title}
        </motion.h2>

        <motion.div
          whileHover={{
            x: 2,
          }}
          transition={{
            type: 'tween',
            duration: 0.2,
            ease: 'easeOut',
          }}
        >
          <Link
            href={companyLink}
            className="inline-block text-hero-font dark:text-blue-light font-semibold hover:text-blue-green dark:hover:text-aero transition-colors duration-300 mb-3 border-b border-transparent hover:border-hero-font dark:hover:border-blue-light"
          >
            {company}
          </Link>
        </motion.div>

        <motion.p
          className="text-gray-dark dark:text-gray-light leading-relaxed text-base md:text-lg cursor-default"
          initial={{ opacity: 0.8, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.1,
            ease: 'easeOut',
          }}
        >
          {desc}
        </motion.p>
      </div>

      {/* Decorative corner element */}
      <motion.div
        className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-orange-light to-red-light rounded-full opacity-60 group-hover:opacity-90 transition-opacity duration-200"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        whileHover={{
          scale: 1.5,
          rotate: 180,
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: index * 0.3,
        }}
      />
    </motion.div>
  );
};
