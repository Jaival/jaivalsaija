'use client';

import { hoverAnimations, sharedVariants } from '@/utils/animations';
import { gradientText, titleStyles } from '@/utils/styles';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { RoughNotationGroup } from 'react-rough-notation';
import userData from 'utils/data';
import BackgroundElements from './backgroundElements';
import { RoughNotationHero } from './roughNotationHero';

export default function Hero() {
  const [showRoughNotation, setShowRoughNotation] = useState(false);

  // Reset state on component mount to prevent issues during navigation
  useEffect(() => {
    setShowRoughNotation(false);
    // Show rough notation after a delay
    const timer = setTimeout(() => setShowRoughNotation(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Static data
  const colors = ['#FB9677', '#F1E2D2', '#CFE5C0', '#C8D9EB'];
  const roles = [
    'DevOps Engineer.',
    'Moody Developer.',
    'Cloud Enthusiastic.',
    'UI Hobbyist.',
  ];

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden"
      variants={sharedVariants.hero.container}
      initial="hidden"
      animate="visible"
    >
      <BackgroundElements variant="hero" className="hero overflow-hidden" />

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between max-w-6xl relative z-10">
        {/* Text Content */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left space-y-6"
          variants={sharedVariants.hero.item}
        >
          {/* Greeting */}
          <motion.div
            className="text-base md:text-lg font-mono text-hero-font dark:text-blue-light"
            variants={sharedVariants.hero.item}
          >
            👋 Hello, I&apos;m
          </motion.div>

          {/* Name */}
          <motion.h1
            className={`${titleStyles.hero} ${gradientText.primary}`}
            variants={sharedVariants.hero.item}
          >
            {userData.name}
          </motion.h1>

          {/* Roles with rough notation */}
          <motion.div
            className="space-y-3"
            variants={sharedVariants.hero.item}
            onAnimationComplete={() => {
              setTimeout(() => setShowRoughNotation(true), 200);
            }}
          >
            <RoughNotationGroup show={showRoughNotation}>
              {roles.map((text, index) => (
                <div key={index} className="flex">
                  <RoughNotationHero color={colors[index]}>
                    <span className="text-xl md:text-3xl lg:text-4xl font-semibold text-blue-dark dark:text-hero-font transition-colors">
                      {text}
                    </span>
                  </RoughNotationHero>
                </div>
              ))}
            </RoughNotationGroup>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-gray-dark dark:text-gray-light max-w-2xl leading-relaxed"
            variants={sharedVariants.hero.item}
          >
            Focused on optimizing cloud infrastructure and building scalable,
            automated systems for reliable products and web applications.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 pt-6"
            variants={sharedVariants.hero.item}
          >
            <motion.a
              href="/projects"
              className="inline-flex items-center justify-center h-11 px-8 py-2 text-sm font-medium rounded-md text-white bg-gradient-to-r from-hero-font to-blue-green hover:from-blue-green hover:to-hero-font transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              whileHover={hoverAnimations.scale}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="/contactme"
              className="inline-flex items-center justify-center h-11 px-8 py-2 text-sm font-medium rounded-md border border-hero-font dark:border-blue-light text-hero-font dark:text-blue-light hover:bg-hero-font hover:text-white dark:hover:bg-blue-light dark:hover:text-blue-dark transition-all duration-300"
              whileHover={hoverAnimations.scale}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          className="w-full md:w-2/5 flex justify-center items-center mt-8 md:mt-0"
          variants={sharedVariants.hero.image}
        >
          <motion.div
            className="relative"
            animate={{
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
          >
            {/* Decorative rings */}
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-blue-light to-aero rounded-full opacity-30 blur-md"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity }}
            />
            <motion.div
              className="absolute -inset-8 bg-gradient-to-r from-orange-light to-yellow-orange rounded-full opacity-20 blur-lg"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity }}
            />

            {/* Main image */}
            <motion.div
              className="relative z-10"
              whileHover={hoverAnimations.scale}
            >
              <Image
                src={userData.avatarUrl}
                alt={`${userData.name}'s profile picture`}
                className="rounded-full shadow-2xl object-cover border-4 border-white dark:border-blue-dark"
                width={320}
                height={320}
                priority={true}
                sizes="(max-width: 768px) 280px, 320px"
              />
            </motion.div>

            {/* "That's me" indicator */}
            <motion.div
              className="absolute -bottom-4 -right-4 bg-white dark:bg-blue-dark px-4 py-2 rounded-full shadow-lg border border-gray-light dark:border-blue-light"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              <span className="text-sm font-medium text-blue-dark dark:text-blue-light">
                That&apos;s me! 👋
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
