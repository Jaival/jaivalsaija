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
          'bg-gradient-to-r from-brand-from to-brand-to text-primary-foreground shadow-md hover:shadow-lg hover:from-brand-to hover:to-brand-from active:scale-95 transform',
        destructive:
          'bg-destructive text-destructive-foreground shadow-md hover:shadow-lg hover:bg-destructive/90 focus-visible:ring-destructive/40 active:scale-95 transform',
        outline:
          'border-2 border-primary text-primary bg-transparent shadow-sm hover:bg-primary hover:text-primary-foreground backdrop-blur-sm active:scale-95 transform',
        secondary:
          'bg-secondary text-secondary-foreground border border-border shadow-sm hover:shadow-md hover:bg-secondary/80 backdrop-blur-sm active:scale-95 transform',
        ghost:
          'hover:bg-accent hover:text-accent-foreground backdrop-blur-sm active:scale-95 transform',
        link: 'text-primary underline-offset-4 hover:underline hover:text-brand-to',
        premium:
          'bg-highlight text-highlight-foreground shadow-lg hover:shadow-xl hover:bg-highlight/90 border border-highlight/20 active:scale-95 transform',
        glass:
          'bg-card/40 backdrop-blur-md border border-border text-primary shadow-lg hover:shadow-xl hover:bg-card/60 active:scale-95 transform',
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
