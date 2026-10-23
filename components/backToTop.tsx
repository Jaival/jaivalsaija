'use client';

import { motion, useMotionValueEvent, useTransform } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useState } from 'react';
import { useBackToTop } from '../hooks/useBackToTop';

// Two back-to-top controls for long pages. Both stay hidden for the first
// screen and fade in after it. CSS owns their fade and press; framer-motion
// owns only the scroll-linked parts (the fill, the dot, the ring).

const hidden = 'pointer-events-none translate-y-2 opacity-0';

/**
 * What's left to read at `progress` (0–1) through a post of `minutes`,
 * rounded up like the "n min read" in the post's header.
 */
function timeLeft(progress: number, minutes: number) {
  if (progress > 0.98) {
    return 'end of post';
  }
  const left = Math.ceil(minutes * (1 - progress));
  return left <= 1 ? 'under 1 min left' : `${left} min left`;
}

/**
 * A thin rail down the right edge, like the version graph: it fills as you
 * read, a dot marks where you are, and the node at the top takes you there.
 * Beside the dot, on wide screens where there is room, is the time left.
 *
 * Idea for later: label the dot with the section you're in instead (or as
 * well). Most headings are too long for the rail (`4. Click "Run now" and
 * answer the setup questions` gets cut to `4. Click "Run now" and …`), so
 * each long heading needs a short name for it, e.g. "Setup questions". One
 * way: a `rail` attribute on the heading in the MDX, read here from the
 * last <h2> above the middle of the screen, with the heading text as the
 * fallback when it is short enough.
 */
export function CommitRail({
  targetId,
  readingMinutes,
}: {
  targetId: string;
  readingMinutes: number;
}) {
  const { visible, scrollYProgress, toTop } = useBackToTop(targetId);
  const top = useTransform(
    scrollYProgress,
    (progress: number) => `${progress * 100}%`,
  );
  // State, not a motion value: the text changes about once a minute, and
  // React skips the render when it hasn't.
  const [label, setLabel] = useState(() => timeLeft(0, readingMinutes));
  useMotionValueEvent(scrollYProgress, 'change', progress =>
    setLabel(timeLeft(progress, readingMinutes)),
  );

  return (
    <div
      inert={!visible}
      className={`fixed top-28 bottom-8 right-0.5 md:right-4 z-40 flex w-5 md:w-6 flex-col items-center transition-[opacity,translate] duration-200 ease-out ${visible ? '' : hidden}`}
    >
      <button
        type='button'
        onClick={toTop}
        aria-label='Back to top'
        className='grid size-5 md:size-6 shrink-0 place-items-center rounded-full border-[1.5px] border-primary bg-background text-primary transition-[background-color,color,scale] duration-200 ease-out hover:bg-primary hover:text-primary-foreground active:scale-90'
      >
        <ArrowUp aria-hidden strokeWidth={2.5} className='size-3' />
      </button>
      <div
        aria-hidden
        className='relative mt-1 w-0.5 flex-1 rounded-full bg-border'
      >
        <motion.div
          className='absolute inset-0 origin-top rounded-full bg-primary/55'
          style={{ scaleY: scrollYProgress }}
        />
        <motion.div
          className='absolute left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-4 ring-primary/20'
          style={{ top }}
        >
          <span className='absolute right-4 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-highlight/60 bg-background px-1.5 font-mono text-[0.625rem] leading-4 text-highlight-strong lg:block'>
            {label}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * A frosted round button bottom-right, the navbar's glass, with a ring
 * around it that fills as you read.
 */
export function ProgressRing({ targetId }: { targetId: string }) {
  const { visible, scrollYProgress, toTop } = useBackToTop(targetId);

  return (
    <button
      type='button'
      onClick={toTop}
      aria-label='Back to top'
      inert={!visible}
      className={`fixed right-4 bottom-4 md:right-6 md:bottom-6 z-40 grid size-12 place-items-center rounded-full bg-card/70 text-foreground shadow-lg backdrop-blur-md transition-[opacity,translate,color,scale] duration-200 ease-out hover:text-primary active:scale-95 reduced-transparency:bg-card reduced-transparency:backdrop-blur-none ${visible ? '' : hidden}`}
    >
      <svg
        aria-hidden
        viewBox='0 0 48 48'
        className='absolute inset-0 size-full -rotate-90'
      >
        <circle
          cx='24'
          cy='24'
          r='22'
          fill='none'
          strokeWidth='2.5'
          className='stroke-border'
        />
        <motion.circle
          cx='24'
          cy='24'
          r='22'
          fill='none'
          strokeWidth='2.5'
          strokeLinecap='round'
          className='stroke-primary'
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
      <ArrowUp aria-hidden className='size-4' />
    </button>
  );
}
