import type React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * The scroll reveal, and the thing Wise's card row is actually doing.
 *
 * Cards do not merely exist as you reach them; they arrive. The effect is worth
 * having only if it stays subtle — 16px of travel and a spring with no bounce,
 * so it reads as the card settling rather than as the card performing.
 *
 * `once` matters. A reveal that replays every time a section re-enters the
 * viewport turns an ordinary scroll back up the page into a light show, and it
 * is the single most common way this pattern is overdone.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      /*
         A positive margin expands the observer's bounds beyond the viewport, so
         a section reveals shortly *before* it is scrolled to rather than as it
         arrives. Two reasons, and neither is taste.

         Scrolling fast on a phone otherwise outruns the animation and you meet
         a section mid-fade. And an element that only ever reveals once it is
         strictly inside the viewport is invisible to anything that renders the
         page without scrolling it, which includes some crawlers.

         amount: 0 fires on the first pixel of overlap rather than waiting for a
         proportion of the element to be inside.
      */
      viewport={{ once: true, amount: 0, margin: '240px 0px 240px 0px' }}
      transition={{ type: 'spring', bounce: 0, duration: 0.55, delay }}
    >
      {children}
    </motion.div>
  );
}
