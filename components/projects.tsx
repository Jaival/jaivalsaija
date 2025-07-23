'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import userData from 'utils/data';
import { useState, useEffect } from 'react';
import { ProjectCardProps } from '@/utils/interface';
import BackgroundElements from './backgroundElements';

// Simple ProjectCard component
function ProjectCard({
  title,
  link,
  number,
  imgUrl,
  description,
}: ProjectCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const numberPadded = parseInt(number);

  // Reset loading state when component mounts (for better navigation)
  useEffect(() => {
    setIsLoading(true);
  }, [imgUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <Link
        href={link}
        className="block w-full group focus:outline-none focus:ring-2 focus:ring-hero-font dark:focus:ring-blue-light rounded-2xl"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${title} project`}
      >
        <motion.div className="relative overflow-hidden rounded-2xl bg-white/20 dark:bg-black-light/20 shadow-xl group-hover:shadow-2xl transition-all duration-500">
          <div className="relative h-64 sm:h-72 w-full">
            <Image
              src={imgUrl}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={numberPadded <= 2}
              alt={`Project: ${title}`}
              className={`
                object-cover w-full h-full rounded-2xl
                transition-all duration-700 ease-out 
                group-hover:scale-110
                ${isLoading ? 'blur-sm' : 'blur-0'}
              `}
              onLoad={() => setIsLoading(false)}
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-light/50 dark:bg-blue-dark/50 animate-pulse rounded-2xl">
                <motion.div
                  className="w-8 h-8 border-4 border-hero-font border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </div>
            )}
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-mono opacity-70">
                Project #{number}
              </span>
              <motion.svg
                className="w-5 h-5 opacity-70 group-hover:opacity-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ x: [0, 3, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </motion.svg>
            </div>

            <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-hero-font transition-colors duration-300">
              {title}
            </h3>

            {description && (
              <p className="text-sm opacity-80 line-clamp-2 group-hover:opacity-100 transition-opacity duration-300">
                {description}
              </p>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// Main Projects component
export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
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
    <motion.section
      className="relative py-20 px-4 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <BackgroundElements className="projects-page" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div className="text-center mb-16" variants={headerVariants}>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            variants={headerVariants}
          >
            <span className="bg-gradient-to-r from-hero-font via-blue-green to-aero bg-clip-text text-transparent">
              My Projects
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-dark dark:text-gray-light max-w-3xl mx-auto leading-relaxed"
            variants={headerVariants}
          >
            A collection of projects I&apos;ve worked on, showcasing different
            technologies and approaches to solving real-world problems.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          variants={containerVariants}
        >
          {userData.projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    delay: index * 0.1,
                  },
                },
              }}
            >
              <ProjectCard
                title={project.title}
                link={project.link}
                imgUrl={project.imgUrl}
                number={(index + 1).toString()}
                description={project.description}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View More on GitHub Button */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href={`https://github.com/${userData.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 text-lg font-medium text-hero-font dark:text-blue-light border-2 border-hero-font dark:border-blue-light rounded-xl hover:bg-hero-font hover:text-white dark:hover:bg-blue-light dark:hover:text-blue-dark transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="View more projects on GitHub"
          >
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            <span>View More on GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
