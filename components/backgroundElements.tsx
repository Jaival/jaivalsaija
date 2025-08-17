'use client';

import { motion } from 'framer-motion';
import { memo, useMemo } from 'react';

interface BackgroundElementsProps {
  variant?: 'default' | 'contact' | 'minimal' | 'hero';
  className?: string;
}

const BackgroundElements = memo<BackgroundElementsProps>(
  ({ variant = 'default', className = '' }) => {
    // Memoize base elements to prevent recreation on each render
    const baseElements = useMemo(
      () => [
        {
          id: 'blue-primary',
          className:
            'absolute top-10 right-10 w-28 h-28 bg-blue-light/15 dark:bg-aero/15 rounded-full blur-2xl',
          animate: {
            scale: [1, 1.12, 1],
            opacity: [0.25, 0.45, 0.25],
          },
          transition: {
            duration: 6,
            repeat: Infinity,
          },
        },
        {
          id: 'teal-primary',
          className:
            'absolute bottom-5 left-16 w-40 h-40 bg-blue-green/15 dark:bg-blue-green/20 rounded-full blur-2xl',
          animate: {
            scale: [1.06, 1, 1.06],
            opacity: [0.3, 0.18, 0.3],
          },
          transition: {
            duration: 7,
            repeat: Infinity,
          },
        },
      ],
      [],
    );

    // Memoize variant-specific elements
    const variantElements = useMemo(
      () => ({
        contact: [
          {
            id: 'aero-floating',
            className:
              'absolute top-1/2 left-1/4 w-24 h-24 bg-aero/12 rounded-full blur-2xl',
            animate: {
              scale: [0.9, 1.05, 0.9],
              opacity: [0.18, 0.4, 0.18],
              x: [0, 12, 0],
              y: [0, -10, 0],
            },
            transition: {
              duration: 9,
              repeat: Infinity,
            },
          },
          {
            id: 'green-drift',
            className:
              'absolute bottom-20 left-1/3 w-16 h-16 bg-green-light/12 rounded-full blur-2xl',
            animate: {
              scale: [1, 0.9, 1],
              opacity: [0.22, 0.4, 0.22],
              x: [0, -15, 0],
              y: [0, 5, 0],
            },
            transition: {
              duration: 8,
              repeat: Infinity,
            },
          },
        ],
        default: [],
        minimal: [],
        hero: [],
      }),
      [],
    );

    // Memoize hero page elements
    const heroElements = useMemo(
      () => [
        {
          id: 'blue-hero',
          className:
            'absolute top-20 left-10 w-32 h-32 bg-blue-light/20 rounded-full blur-xl',
          animate: {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          },
          transition: {
            duration: 4,
            repeat: Infinity,
          },
        },
        {
          id: 'orange-hero',
          className:
            'absolute bottom-20 right-10 w-40 h-40 bg-orange-light/20 rounded-full blur-xl',
          animate: {
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          },
          transition: {
            duration: 5,
            repeat: Infinity,
          },
        },
      ],
      [],
    );

    // Memoize final element selection logic
    const finalElements = useMemo(() => {
      // Use hero elements for hero page (detected by className containing specific indicators)
      const isHeroPage =
        className.includes('hero') || className.includes('overflow-hidden');

      if (isHeroPage) {
        return heroElements;
      }

      // Select elements based on variant
      switch (variant) {
        case 'contact':
          return [...baseElements, ...variantElements.contact];
        case 'minimal':
          return [baseElements[0]]; // Only one element for minimal
        case 'hero':
          return heroElements;
        default:
          return baseElements;
      }
    }, [variant, className, baseElements, variantElements, heroElements]);

    return (
      <>
        {finalElements.map((element) => (
          <motion.div
            key={element.id}
            className={element.className}
            animate={element.animate}
            transition={element.transition}
          />
        ))}
      </>
    );
  },
);

BackgroundElements.displayName = 'BackgroundElements';

export default BackgroundElements;
