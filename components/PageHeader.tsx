'use client';

import { motion } from 'framer-motion';
import BackgroundElements from './backgroundElements';
import { sharedVariants } from '@/utils/animations';
import { containerStyles, titleStyles, gradientText } from '@/utils/styles';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  className = '',
}: PageHeaderProps) {
  return (
    <motion.div
      className={`${containerStyles.header} ${className}`}
      initial="hidden"
      animate="visible"
      variants={sharedVariants.container}
    >
      <BackgroundElements />

      <motion.h1
        className={`${titleStyles.page} ${gradientText.hero} px-4 md:px-8`}
        variants={sharedVariants.header}
      >
        {title}
      </motion.h1>

      {subtitle && (
        <motion.p
          className="text-lg md:text-xl text-gray-dark dark:text-gray-light max-w-3xl mx-auto leading-relaxed text-center md:text-left px-4 md:px-8"
          variants={sharedVariants.item}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
