'use client';

import { motion } from 'framer-motion';
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
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
 * Seconds until the last `.animate-enter` entrance on the page has started.
 * A Reveal that is on screen at mount waits this long, so it joins the end of
 * the above-the-fold stagger instead of beating it.
 */
function aboveFoldLead(): number {
  const now = Number(document.timeline.currentTime ?? 0);
  let lead = 0;
  for (const animation of document.getAnimations()) {
    const effect = animation.effect as KeyframeEffect | null;
    if (!effect?.target?.classList.contains('animate-enter')) {
      continue;
    }
    const delay = Number(effect.getTiming().delay ?? 0);
    const elapsed =
      animation.startTime === null ? 0 : now - Number(animation.startTime);
    lead = Math.max(lead, delay - elapsed);
  }
  return lead > 0 ? lead / 1000 + stagger : 0;
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
  const ref = useRef<HTMLElement>(null);
  const [lead, setLead] = useState(0);

  // Runs before paint, so the delay is set before the in-view entrance starts.
  useLayoutEffect(() => {
    const top = ref.current?.getBoundingClientRect().top;
    if (top !== undefined && top < window.innerHeight) {
      setLead(aboveFoldLead());
    }
  }, []);

  return (
    <Component
      // motion[as] is a union of element types; the ref fits each of them.
      ref={ref as never}
      className={className}
      // The <noscript> style in app/layout.tsx shows these without JS.
      data-reveal
      initial={{ opacity: 0, transform: 'translateY(12px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, amount }}
      transition={{
        duration: durations.enter,
        ease: easeOut,
        delay: lead + index * stagger,
      }}
    >
      {children}
    </Component>
  );
}
