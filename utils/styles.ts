/**
 * Shared styling patterns and utility classes
 * Centralizes common styles to follow DRY principle
 *
 * Colours are semantic tokens from app/globals.css, so each class works in
 * both themes without a `dark:` twin.
 */

// Glass morphism effects (used across navbar, cards, forms) - Enhanced for better visual hierarchy
export const glassStyles = {
  light: 'bg-card/30 backdrop-blur-sm border border-border shadow-sm',
  medium: 'bg-card/40 backdrop-blur-md border border-border shadow-md',
  heavy: 'bg-card/50 backdrop-blur-xl border border-border shadow-lg',
  navbar: 'bg-card/85 backdrop-blur-lg border-b border-border shadow-sm',
  card: 'bg-card/50 backdrop-blur-lg border border-border shadow-xl',
  floating: 'bg-card/60 backdrop-blur-2xl border border-border shadow-2xl',
  subtle: 'bg-card/20 backdrop-blur-sm border border-border',
  premium:
    'bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-xl border border-primary/20 shadow-xl',
};

// Button styling patterns - Enhanced with better visual hierarchy and accessibility
export const buttonStyles = {
  primary:
    'inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-primary-foreground bg-gradient-to-r from-brand-from to-brand-to hover:from-brand-to hover:to-brand-from transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2',
  secondary:
    'inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-primary border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2',
  ghost:
    'inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-lg text-muted-foreground hover:text-primary hover:bg-accent transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-1',
  outline:
    'inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-primary bg-transparent border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 active:scale-95 backdrop-blur-sm',
  glass:
    'inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-primary bg-card/40 backdrop-blur-md border border-border hover:bg-card/60 transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl',
  gradient:
    'inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-highlight-foreground bg-highlight hover:bg-highlight/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95',
};

// Gradient text patterns - Enhanced with better contrast and readability
export const gradientText = {
  primary:
    'bg-gradient-to-r from-foreground via-primary to-brand-to bg-clip-text text-transparent font-bold',
  secondary:
    'bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent font-semibold',
  accent:
    'bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent font-medium',
  hero: 'bg-gradient-to-br from-foreground via-primary to-brand-to bg-clip-text text-transparent font-bold',
  warm: 'bg-gradient-to-r from-highlight-strong to-highlight bg-clip-text text-transparent font-semibold',
  cool: 'bg-gradient-to-r from-brand-to to-primary bg-clip-text text-transparent font-medium',
  success:
    'bg-gradient-to-r from-success to-primary bg-clip-text text-transparent font-medium',
};

// Card styling patterns - Enhanced with better visual hierarchy and hover effects
export const cardStyles = {
  default:
    'p-6 md:p-8 bg-card/50 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-border hover:bg-card/60',
  floating:
    'relative z-10 p-6 md:p-8 bg-card/60 backdrop-blur-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-border group hover:transform hover:-translate-y-1 hover:bg-card/70',
  form: 'bg-card/50 backdrop-blur-2xl p-8 rounded-3xl border border-border shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-card/60',
  minimal:
    'p-4 md:p-6 bg-card/30 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-border',
  premium:
    'p-8 md:p-10 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-2xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-primary/20 hover:transform hover:-translate-y-2',
  glass:
    'p-6 md:p-8 bg-card/40 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-border hover:bg-card/50',
};

// Form input styling - Enhanced with better focus states and accessibility
export const inputStyles = {
  base: 'w-full px-4 py-3 bg-background/60 border rounded-xl backdrop-blur-md transition-all duration-300 resize-none focus:ring-2 focus:ring-ring/40 focus:border-primary placeholder:text-muted-foreground text-foreground shadow-sm focus:shadow-md',
  error:
    'border-destructive focus:ring-destructive/40 focus:border-destructive bg-destructive/5',
  success:
    'border-success focus:ring-success/40 focus:border-success bg-success/5',
  warning:
    'border-warning focus:ring-warning/40 focus:border-warning bg-warning/5',
  normal: 'border-input hover:border-primary/60',
  premium:
    'bg-card/40 border border-primary/30 focus:border-primary backdrop-blur-lg shadow-lg focus:shadow-xl',
};

// Layout containers
export const containerStyles = {
  page: 'min-h-svh',
  content: 'container mx-auto max-w-6xl relative z-10',
  header: 'min-h-64 max-w-6xl mx-auto relative',
  centered: 'max-w-7xl mx-auto px-4 py-16 md:py-24',
};

// Page title patterns
// Display sizes need negative tracking and tight leading: type set for body
// copy looks loose and gappy once it is 60px tall.
export const titleStyles = {
  hero: 'text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] text-foreground mb-4',
  page: 'pt-12 sm:pt-16 md:pt-20 pb-4 text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-[0.95] text-center md:text-left',
  section:
    'text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-6',
  card: 'text-xl md:text-2xl font-bold tracking-tight text-card-foreground mb-2',
};

// Decorative elements
export const decorativeStyles = {
  line: 'h-px w-full bg-gradient-to-r from-transparent via-border to-transparent',
  badge:
    'px-4 py-2 bg-gradient-to-r from-brand-from to-brand-to rounded-xl shadow-lg',
  dot: 'w-3 h-3 bg-gradient-to-br from-highlight to-highlight-strong rounded-full',
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
