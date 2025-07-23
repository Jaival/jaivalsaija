'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import userData from 'utils/data';
import PageHeader from './PageHeader';
import { sharedVariants } from '@/utils/animations';
import { containerStyles } from '@/utils/styles';

// Modernized social link component with animations
const SocialLink = ({ href, name }: { href: string; name: string }) => (
  <motion.div
    className="flex flex-row items-center justify-start"
    whileHover={{ x: 8 }}
    transition={{ duration: 0.2 }}
  >
    <Link href={href} className="flex flex-row items-center space-x-4 group">
      <motion.div
        className="my-4 text-hero-font dark:text-blue-light"
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        &rarr;
      </motion.div>
      <div className="relative overflow-hidden font-mono text-lg text-gray-dark dark:text-gray-light">
        <motion.div className="absolute h-0.5 w-full bg-gradient-to-r from-orange-light to-red-light bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        <motion.span
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {name}
        </motion.span>
      </div>
    </Link>
  </motion.div>
);

// Modernized section header component
const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    className="text-xl font-semibold bg-gradient-to-r from-hero-font to-blue-green bg-clip-text text-transparent dark:from-blue-light dark:to-aero mb-4"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.h2>
);

export default function AboutMe() {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.section
      className={containerStyles.page}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header section */}
      <PageHeader title="About Me." />

      {/* Main content section */}
      <motion.div className="-mt-10" variants={itemVariants}>
        {/* Title and current project */}
        <div className="max-w-6xl pt-16 sm:pt-20 mx-auto">
          <motion.div
            className="mx-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-relaxed text-gray-dark dark:text-gray-light"
            variants={itemVariants}
          >
            {userData.about.title} Currently working on{' '}
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                className="px-3 py-2 rounded-xl bg-gradient-to-r from-orange-light to-red-light hover:from-red-light hover:to-orange-dark text-white shadow-lg transition-all duration-300 hover:shadow-xl inline-flex items-center space-x-2"
                href={userData.about.currentProjectUrl}
                aria-label={`Current project: ${userData.about.currentProject}`}
              >
                <span>{userData.about.currentProject}</span>
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✈️
                </motion.span>
              </Link>
            </motion.span>
          </motion.div>
        </div>
      </motion.div>

      {/* Content grid */}
      <div className="px-4">
        <motion.div
          className="grid max-w-6xl grid-cols-1 pt-12 sm:pt-16 md:pt-20 mx-auto md:grid-cols-3 gap-y-12 md:gap-y-20 gap-x-8 md:gap-x-20"
          variants={sharedVariants.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left sidebar */}
          <motion.aside
            className="inline-flex flex-col space-y-8"
            variants={sharedVariants.item}
          >
            {/* Contact section */}
            <motion.div
              className="bg-white/20 dark:bg-black-light/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <SectionHeader>Contact</SectionHeader>
              <div className="text-base sm:text-lg text-gray-dark dark:text-gray-light">
                For any sort help / enquiry, shoot a{' '}
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={`mailto:${userData.email}`}
                    className="font-bold border-b-2 text-hero-font border-hero-font dark:border-blue-light dark:text-blue-light hover:border-blue-green dark:hover:border-aero transition-colors duration-300"
                  >
                    mail
                  </Link>
                </motion.span>{' '}
                and I&apos;ll get back. I swear.
              </div>
            </motion.div>

            {/* Job opportunities section */}
            <motion.div
              className="bg-white/20 dark:bg-black-light/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <SectionHeader>Job Opportunities</SectionHeader>
              <div className="text-base sm:text-lg text-gray-dark dark:text-gray-light">
                I&apos;m looking for a job currently, If you see me as a good
                fit, check my{' '}
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={userData.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold border-b-2 text-hero-font border-hero-font dark:border-blue-light dark:text-blue-light hover:border-blue-green dark:hover:border-aero transition-colors duration-300"
                  >
                    CV
                  </Link>
                </motion.span>{' '}
                and I&apos;d love to work for you.
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="bg-white/20 dark:bg-black-light/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <SectionHeader>Social Links</SectionHeader>
              <div className="mt-2 ml-4 space-y-1">
                <SocialLink
                  href={userData.socialLinks.twitter}
                  name="Twitter"
                />
                <SocialLink href={userData.socialLinks.github} name="GitHub" />
                <SocialLink
                  href={userData.socialLinks.linkedin}
                  name="LinkedIn"
                />
                <SocialLink
                  href={userData.socialLinks.instagram}
                  name="Instagram"
                />
              </div>
            </motion.div>
          </motion.aside>

          {/* Main content area */}
          <motion.div
            className="col-span-1 md:col-span-2"
            variants={sharedVariants.item}
          >
            {/* About me description */}
            <motion.div
              className="space-y-6 mb-12 bg-white/20 dark:bg-black-light/20 rounded-2xl p-8 shadow-lg"
              variants={sharedVariants.item}
            >
              {userData.about.description?.map((desc, idx) => (
                <motion.p
                  key={idx}
                  className="text-base sm:text-lg md:text-xl text-gray-dark dark:text-gray-light leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  {desc}
                </motion.p>
              ))}
            </motion.div>

            {/* Tech stack section */}
            <motion.div
              className="bg-white/20 dark:bg-black-light/20 rounded-2xl p-8 shadow-lg"
              variants={sharedVariants.item}
            >
              <motion.h3 className="inline-block px-4 py-2 text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-light to-orange-dark rounded-xl text-white shadow-lg mb-8">
                Tech Stack
              </motion.h3>
              <motion.div
                className="flex flex-row flex-wrap justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.div>
                  <Image
                    alt="My technology skills including AWS, Next.js, Tailwind, Firebase, TypeScript, IntelliJ, VSCode, Docker, Dart, Flutter, and Python"
                    width={400}
                    height={400}
                    src="https://skillicons.dev/icons?i=aws,next,tailwind,firebase,typescript,idea,vscode,docker,dart,flutter,python,&perline=6"
                    className="m-2 sm:m-4 rounded-2xl transition-shadow duration-300"
                    priority
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
