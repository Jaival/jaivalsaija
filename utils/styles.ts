/**
 * Shared styling patterns and utility classes
 * Centralizes common styles to follow DRY principle
 */

// Glass morphism effects (used across navbar, cards, forms) - Enhanced for better visual hierarchy
export const glassStyles = {
  light:
    'bg-white/15 dark:bg-black-light/15 backdrop-blur-sm border border-gray-light/40 dark:border-blue-line/40 shadow-sm',
  medium:
    'bg-white/25 dark:bg-black-light/25 backdrop-blur-md border border-white/40 dark:border-blue-line/40 shadow-md',
  heavy:
    'bg-white/20 dark:bg-blue-dark/30 backdrop-blur-xl border border-gray-light/30 dark:border-blue-line/30 shadow-lg',
  navbar:
    'bg-white/85 dark:bg-blue-dark/85 backdrop-blur-lg border-b border-gray-light/30 dark:border-blue-line/30 shadow-sm',
  card: 'bg-white/20 dark:bg-black-light/25 backdrop-blur-lg border border-white/30 dark:border-blue-line/30 shadow-xl',
  floating:
    'bg-white/30 dark:bg-blue-dark/40 backdrop-blur-2xl border border-white/50 dark:border-blue-light/20 shadow-2xl',
  subtle:
    'bg-white/10 dark:bg-black-light/10 backdrop-blur-sm border border-gray-light/20 dark:border-blue-line/20',
  premium:
    'bg-gradient-to-br from-white/25 to-white/15 dark:from-blue-dark/30 dark:to-black-light/20 backdrop-blur-xl border border-gradient-to-r border-hero-font/20 dark:border-blue-light/20 shadow-xl',
};

// Button styling patterns - Enhanced with better visual hierarchy and accessibility
export const buttonStyles = {
  primary:
    'inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-white bg-gradient-to-r from-hero-font to-blue-green hover:from-blue-green hover:to-hero-font transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-hero-font/50 focus-visible:ring-offset-2',
  secondary:
    'inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-hero-font dark:text-blue-light border-2 border-hero-font dark:border-blue-light hover:bg-hero-font hover:text-white dark:hover:bg-blue-light dark:hover:text-blue-dark transition-all duration-300 active:scale-95 focus-visible:ring-2 focus-visible:ring-hero-font/50 focus-visible:ring-offset-2',
  ghost:
    'inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-lg text-gray-dark dark:text-gray-light hover:text-hero-font dark:hover:text-blue-light hover:bg-gray-light/40 dark:hover:bg-blue-line/40 transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-hero-font/30 focus-visible:ring-offset-1',
  outline:
    'inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-hero-font dark:text-blue-light bg-transparent border-2 border-hero-font dark:border-blue-light hover:bg-hero-font hover:text-white dark:hover:bg-blue-light dark:hover:text-blue-dark transition-all duration-300 active:scale-95 backdrop-blur-sm',
  glass:
    'inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-hero-font dark:text-blue-light bg-white/20 dark:bg-black-light/20 backdrop-blur-md border border-white/30 dark:border-blue-line/30 hover:bg-white/30 dark:hover:bg-black-light/30 transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl',
  gradient:
    'inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-white bg-gradient-to-r from-yellow-orange via-orange to-red-light hover:from-orange hover:via-red-light hover:to-yellow-orange dark:from-yellow-light dark:via-green-light dark:to-blue-light dark:text-blue-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95',
};

// Gradient text patterns - Enhanced with better contrast and readability
export const gradientText = {
  primary:
    'bg-gradient-to-r from-blue-dark via-hero-font to-blue-green bg-clip-text text-transparent dark:from-white dark:via-blue-light dark:to-aero font-bold',
  secondary:
    'bg-gradient-to-r from-hero-font via-blue-green to-aero bg-clip-text text-transparent dark:from-blue-light dark:via-aero dark:to-green-light font-semibold',
  accent:
    'bg-gradient-to-r from-hero-font to-blue-green bg-clip-text text-transparent dark:from-blue-light dark:to-aero font-medium',
  hero: 'bg-gradient-to-br from-blue-dark via-hero-font via-blue-green to-aero bg-clip-text text-transparent dark:from-white dark:via-blue-light dark:via-aero dark:to-green-light font-bold',
  warm: 'bg-gradient-to-r from-orange via-red-light to-yellow-orange bg-clip-text text-transparent dark:from-yellow-light dark:via-orange-light dark:to-red-light font-semibold',
  cool: 'bg-gradient-to-r from-blue via-aero to-blue-light bg-clip-text text-transparent dark:from-blue-light dark:via-aero dark:to-white font-medium',
  success:
    'bg-gradient-to-r from-green via-green-dark to-green-light bg-clip-text text-transparent font-medium',
};

// Card styling patterns - Enhanced with better visual hierarchy and hover effects
export const cardStyles = {
  default:
    'p-6 md:p-8 bg-white/25 dark:bg-black-light/25 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/40 dark:border-blue-line/40 hover:bg-white/30 dark:hover:bg-black-light/30 hover:border-white/50 dark:hover:border-blue-line/50',
  floating:
    'relative z-10 p-6 md:p-8 bg-white/30 dark:bg-black-light/30 backdrop-blur-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-white/50 dark:border-blue-line/50 group hover:transform hover:-translate-y-1 hover:bg-white/35 dark:hover:bg-black-light/35',
  form: 'bg-white/20 dark:bg-blue-dark/25 backdrop-blur-2xl p-8 rounded-3xl border border-gray-light/30 dark:border-blue-line/30 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-white/25 dark:hover:bg-blue-dark/30',
  minimal:
    'p-4 md:p-6 bg-white/15 dark:bg-black-light/15 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/25 dark:border-blue-line/25',
  premium:
    'p-8 md:p-10 bg-gradient-to-br from-white/30 via-white/20 to-white/15 dark:from-blue-dark/35 dark:via-black-light/25 dark:to-blue-dark/20 backdrop-blur-2xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gradient-to-br border-hero-font/20 dark:border-blue-light/20 hover:transform hover:-translate-y-2',
  glass:
    'p-6 md:p-8 bg-white/20 dark:bg-black-light/20 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/30 dark:border-blue-line/30 hover:bg-white/25 dark:hover:bg-black-light/25',
};

// Form input styling - Enhanced with better focus states and accessibility
export const inputStyles = {
  base: 'w-full px-4 py-3 bg-white/15 dark:bg-blue-dark/25 border rounded-xl backdrop-blur-md transition-all duration-300 resize-none focus:ring-2 focus:ring-hero-font/40 focus:border-hero-font focus:bg-white/20 dark:focus:bg-blue-dark/30 placeholder:text-blue-dark/70 dark:placeholder:text-gray-light/70 text-blue-dark dark:text-gray-light shadow-sm focus:shadow-md',
  error:
    'border-red-light focus:ring-red-light/40 focus:border-red-light bg-red-light/5 dark:bg-red-light/10',
  success:
    'border-green focus:ring-green/40 focus:border-green bg-green/5 dark:bg-green/10',
  warning:
    'border-yellow-orange focus:ring-yellow-orange/40 focus:border-yellow-orange bg-yellow-orange/5 dark:bg-yellow-orange/10',
  normal:
    'border-gray-light/40 dark:border-blue-line/40 hover:border-hero-font/60 dark:hover:border-blue-light/60',
  premium:
    'bg-gradient-to-r from-white/20 to-white/15 dark:from-blue-dark/30 dark:to-black-light/25 border border-hero-font/30 dark:border-blue-light/30 focus:border-hero-font dark:focus:border-blue-light backdrop-blur-lg shadow-lg focus:shadow-xl',
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
