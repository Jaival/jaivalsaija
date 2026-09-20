'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { durations, easeOut, stagger } from '@/utils/animations';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Position among siblings — each step delays the entrance by one stagger. */
  index?: number;
  /** How much of the element must be on screen before it reveals. */
  amount?: number;
  as?: 'div' | 'li' | 'section' | 'article';
}

/**
 * Below-the-fold scroll reveal. One per item — never nest a Reveal inside a
 * staggering parent, or the item animates twice.
 *
 * Above-the-fold content should use the CSS `.animate-enter` utility instead,
 * so it is visible before JS hydrates.
 */
export default function Reveal({
  children,
  className,
  index = 0,
  amount = 0.2,
  as = 'div',
}: RevealProps) {
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={{ opacity: 0, transform: 'translateY(12px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, amount }}
      transition={{
        duration: durations.enter,
        ease: easeOut,
        delay: index * stagger,
      }}
    >
      {children}
    </Component>
  );
}
