import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-destructive/30 dark:aria-invalid:ring-destructive/50 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-hero-font to-blue-green text-white shadow-md hover:shadow-lg hover:from-blue-green hover:to-hero-font dark:from-blue-light dark:to-aero dark:text-blue-dark active:scale-95 transform',
        destructive:
          'bg-gradient-to-r from-red-dark to-orange shadow-md hover:shadow-lg hover:from-orange hover:to-red-dark text-white focus-visible:ring-red-light/30 dark:focus-visible:ring-red-light/50 active:scale-95 transform',
        outline:
          'border-2 border-hero-font bg-transparent shadow-sm hover:bg-hero-font hover:text-white dark:border-blue-light dark:text-blue-light dark:hover:bg-blue-light dark:hover:text-blue-dark backdrop-blur-sm active:scale-95 transform',
        secondary:
          'bg-gradient-to-r from-gray-light/20 to-gray/20 text-gray-dark border border-gray-light/40 shadow-sm hover:shadow-md hover:from-gray-light/30 hover:to-gray/30 dark:from-blue-line/30 dark:to-gray-dark/30 dark:text-gray-light dark:border-blue-line/50 backdrop-blur-sm active:scale-95 transform',
        ghost:
          'hover:bg-gradient-to-r hover:from-hero-font/10 hover:to-blue-green/10 hover:text-hero-font dark:hover:from-blue-light/10 dark:hover:to-aero/10 dark:hover:text-blue-light backdrop-blur-sm active:scale-95 transform',
        link: 'text-hero-font underline-offset-4 hover:underline hover:text-blue-green dark:text-blue-light dark:hover:text-aero',
        premium:
          'bg-gradient-to-r from-yellow-orange via-orange to-red-light text-white shadow-lg hover:shadow-xl hover:from-orange hover:via-red-light hover:to-yellow-orange dark:from-yellow-light dark:via-green-light dark:to-blue-light dark:text-blue-dark border border-yellow-orange/20 dark:border-yellow-light/20 active:scale-95 transform',
        glass:
          'bg-white/10 dark:bg-black-light/20 backdrop-blur-md border border-white/20 dark:border-blue-line/30 text-hero-font dark:text-blue-light shadow-lg hover:shadow-xl hover:bg-white/20 dark:hover:bg-black-light/30 active:scale-95 transform',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
