'use client';

import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';

/** Past this share of a screen, a back-to-top control is worth showing. */
const SHOW_AFTER = 0.6;

/**
 * Shared by the back-to-top controls: whether to show one, how far down the
 * page the reader is (a 0–1 motion value, so scrolling never re-renders), and
 * the jump itself. The jump follows `scroll-behavior` on <html>: smooth,
 * unless the reader asked for reduced motion. Focus moves to `targetId` so
 * keyboard and screen-reader users land at the top too.
 */
export function useBackToTop(targetId: string) {
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, 'change', y =>
    setVisible(y > window.innerHeight * SHOW_AFTER),
  );

  const toTop = () => {
    window.scrollTo({ top: 0 });
    document.getElementById(targetId)?.focus({ preventScroll: true });
  };

  return { visible, scrollYProgress, toTop };
}
