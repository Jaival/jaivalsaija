/**
 * Shared animation variants for consistent motion across components
 * Centralizes animation patterns to follow DRY principle
 */

// Animation durations and delays for consistency
export const timings = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.8,
  pageTransition: 0.4,
  stagger: 0.1,
  delayShort: 0.1,
  delayNormal: 0.2,
};

// Consistent easing functions
export const easings = {
  easeOut: 'easeOut' as const,
  easeInOut: 'easeInOut' as const,
  bounce: 'anticipate' as const,
};

export const sharedVariants = {
  // Page container animations - restored original feel
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  },

  // Standard item animations (most common)
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  },

  // Header/title animations
  header: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 },
    },
  },

  // Card animations for projects/experience
  card: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  },

  // Slide animations for experience items
  slideFromLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  },

  // Contact form items
  formItem: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  },

  // Hero-specific animations
  hero: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: 0.3,
          staggerChildren: 0.2,
        },
      },
    },
    item: {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.8 },
      },
    },
    image: {
      hidden: { scale: 0.8, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: { duration: 1 },
      },
    },
  },
};

// Common transition presets
export const transitions = {
  spring: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 20,
  },

  smooth: {
    duration: 0.3,
    ease: 'easeOut' as const,
  },

  bounce: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 30,
  },
};

// Common hover animations
export const hoverAnimations = {
  scale: {
    scale: 1.05,
    transition: transitions.smooth,
  },

  lift: {
    y: -8,
    scale: 1.02,
    transition: transitions.smooth,
  },

  slideRight: {
    x: 8,
    transition: transitions.smooth,
  },
};
