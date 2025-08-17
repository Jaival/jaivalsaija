/**
 * Style Variant Examples and Documentation
 *
 * This file demonstrates how to use the enhanced variant styles
 * for both dark and light modes across different components.
 */

import {
  glassStyles,
  buttonStyles,
  cardStyles,
  inputStyles,
  gradientText,
} from './styles';

// Button Variant Examples
export const buttonExamples = {
  // Standard buttons with enhanced gradients
  primary: buttonStyles.primary,
  secondary: buttonStyles.secondary,
  ghost: buttonStyles.ghost,

  // New specialized variants
  outline: buttonStyles.outline,
  glass: buttonStyles.glass,
  gradient: buttonStyles.gradient,
};

// Glass Morphism Variant Examples
export const glassExamples = {
  // Light glass effects
  subtle: glassStyles.subtle,
  light: glassStyles.light,
  medium: glassStyles.medium,

  // Heavy glass effects
  heavy: glassStyles.heavy,
  card: glassStyles.card,
  floating: glassStyles.floating,

  // Specialized glass effects
  navbar: glassStyles.navbar,
  premium: glassStyles.premium,
};

// Card Variant Examples
export const cardExamples = {
  // Standard cards
  default: cardStyles.default,
  minimal: cardStyles.minimal,

  // Enhanced cards
  floating: cardStyles.floating,
  glass: cardStyles.glass,
  premium: cardStyles.premium,

  // Form cards
  form: cardStyles.form,
};

// Input Variant Examples
export const inputExamples = {
  // Base input with enhanced focus
  base: inputStyles.base,
  normal: inputStyles.normal,

  // State variants
  error: inputStyles.error,
  success: inputStyles.success,
  warning: inputStyles.warning,

  // Premium variant
  premium: inputStyles.premium,
};

// Gradient Text Examples
export const gradientTextExamples = {
  // Enhanced gradients
  primary: gradientText.primary,
  secondary: gradientText.secondary,
  accent: gradientText.accent,

  // New gradient variants
  hero: gradientText.hero,
  warm: gradientText.warm,
  cool: gradientText.cool,
  success: gradientText.success,
};

// Tooltip Variant Examples (for use with the enhanced tooltip component)
export const tooltipVariants = [
  'brand', // Default brand styling
  'neutral', // Neutral gray styling
  'success', // Green success styling
  'warning', // Orange warning styling
  'error', // Red error styling
  'info', // Blue info styling
] as const;

// Usage examples in JSX
export const usageExamples = {
  // Enhanced button with proper accessibility
  primaryButton: `
    <Button 
      variant="default" 
      size="lg"
      className="focus-visible:ring-2 focus-visible:ring-hero-font/60"
    >
      Click me
    </Button>
  `,

  // Glass morphism card
  glassCard: `
    <div className="${glassStyles.floating}">
      <h3 className="${gradientText.hero}">Enhanced Glass Card</h3>
      <p>Content with better visual hierarchy</p>
    </div>
  `,

  // Premium form input
  premiumInput: `
    <input 
      className="${inputStyles.premium}"
      placeholder="Enhanced input with better focus states"
    />
  `,

  // Enhanced tooltip
  enhancedTooltip: `
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent variant="success" side="top">
        Success message with enhanced styling
      </TooltipContent>
    </Tooltip>
  `,
};

// Color palette integration examples
export const colorIntegration = {
  lightMode: {
    background: 'bg-background (white)',
    foreground: 'text-foreground (blue-dark)',
    accent: 'text-hero-font (teal)',
    secondary: 'text-gray-dark',
  },
  darkMode: {
    background: 'dark:bg-background (blue-dark)',
    foreground: 'dark:text-foreground (white)',
    accent: 'dark:text-blue-light (light blue)',
    secondary: 'dark:text-gray-light',
  },
};

// Accessibility improvements
export const accessibilityFeatures = {
  focusStates: 'Enhanced focus-visible rings with proper contrast',
  colorContrast: 'Improved color contrast ratios for WCAG compliance',
  animations: 'Respects prefers-reduced-motion settings',
  semantics: 'Proper ARIA attributes and semantic HTML',
};
