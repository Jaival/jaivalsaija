/**
 * Shared styling patterns and utility classes
 * Centralizes common styles to follow DRY principle
 */

// Glass morphism effects (used across navbar, cards, forms)
export const glassStyles = {
  light: 'bg-white/10 backdrop-blur-sm border border-gray-light/30',
  medium:
    'bg-white/20 dark:bg-black-light/20 backdrop-blur-sm border border-white/30 dark:border-blue-line/30',
  heavy:
    'bg-white/10 dark:bg-blue-dark/20 backdrop-blur-xl border border-gray-light/20 dark:border-blue-line/20',
  navbar:
    'bg-white/80 dark:bg-blue-dark/80 backdrop-blur-md border-b border-gray-light/20 dark:border-blue-line/20',
};

// Button styling patterns
export const buttonStyles = {
  primary:
    'inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-white bg-gradient-to-r from-hero-font to-blue-green hover:from-blue-green hover:to-hero-font transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1',
  secondary:
    'inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-hero-font dark:text-blue-light border-2 border-hero-font dark:border-blue-light hover:bg-hero-font hover:text-white dark:hover:bg-blue-light dark:hover:text-blue-dark transition-all duration-300',
  ghost:
    'inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-lg text-gray-dark dark:text-gray-light hover:text-hero-font dark:hover:text-blue-light hover:bg-gray-light/40 dark:hover:bg-blue-line/40 transition-all duration-200',
};

// Gradient text patterns
export const gradientText = {
  primary:
    'bg-gradient-to-r from-blue-dark via-hero-font to-blue-green bg-clip-text text-transparent dark:from-white dark:via-blue-light dark:to-aero',
  secondary:
    'bg-gradient-to-r from-hero-font via-blue-green to-aero bg-clip-text text-transparent',
  accent:
    'bg-gradient-to-r from-orange-light to-red-light bg-clip-text text-transparent',
};

// Card styling patterns
export const cardStyles = {
  default:
    'p-6 md:p-8 bg-white/20 dark:bg-black-light/20 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-white/30 dark:border-blue-line/30',
  floating:
    'relative z-10 p-6 md:p-8 bg-white/20 dark:bg-black-light/20 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/30 dark:border-blue-line/30 group',
  form: 'bg-white/10 dark:bg-blue-dark/20 backdrop-blur-xl p-8 rounded-3xl border border-gray-light/20 dark:border-blue-line/20 shadow-2xl',
};

// Form input styling
export const inputStyles = {
  base: 'w-full px-4 py-3 bg-white/10 dark:bg-blue-dark/20 border rounded-xl backdrop-blur-sm transition-all duration-300 resize-none focus:ring-2 focus:ring-hero-font/30 focus:border-hero-font placeholder:text-blue-dark/60 dark:placeholder:text-gray-light/60 text-blue-dark dark:text-gray-light',
  error: 'border-red-light focus:ring-red-light/30 focus:border-red-light',
  normal:
    'border-gray-light/30 dark:border-blue-line/30 hover:border-hero-font/50',
};

// Layout containers
export const containerStyles = {
  page: 'min-h-screen',
  content: 'container mx-auto max-w-6xl relative z-10',
  header: 'min-h-64 max-w-6xl mx-auto relative',
  centered: 'max-w-7xl mx-auto px-4 py-16 md:py-24',
};

// Page title patterns
export const titleStyles = {
  hero: 'text-4xl md:text-6xl lg:text-7xl font-bold text-blue-dark dark:text-white mb-4',
  page: 'pt-12 sm:pt-16 md:pt-20 pb-4 text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-center md:text-left leading-tight',
  section: 'text-4xl md:text-6xl lg:text-7xl font-bold mb-6',
  card: 'text-xl md:text-2xl font-bold text-gray-dark dark:text-white mb-2',
};

// Decorative elements
export const decorativeStyles = {
  line: 'h-px w-full bg-gradient-to-r from-transparent via-blue-line to-transparent',
  badge:
    'px-4 py-2 bg-gradient-to-r from-hero-font to-blue-green rounded-xl shadow-lg',
  dot: 'w-3 h-3 bg-gradient-to-br from-orange-light to-red-light rounded-full',
};

// Animation utilities
export const animationClasses = {
  float: 'animate-[float_6s_ease-in-out_infinite]',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  spin: 'animate-spin',
};

// Helper function to combine styles
export function combineStyles(...styles: string[]) {
  return styles.filter(Boolean).join(' ');
}
