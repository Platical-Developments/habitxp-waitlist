import type React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/utils';

/**
 * The hero, adapted from the 21st.dev AnimatedMarqueeHero.
 *
 * Four things changed from the original, and each is a fix rather than a taste
 * preference:
 *
 * 1. The marquee ran `x: ["-100%", "0%"]` across a single copy of the images,
 *    which snaps back to the start on every repeat. It now translates one half
 *    of a doubled track, so the loop is genuinely seamless.
 * 2. Nothing in the original honoured `prefers-reduced-motion`. A full-width
 *    strip in constant horizontal motion is close to the worst case for anyone
 *    who has that setting on. Every animation here checks it, and the marquee
 *    stops entirely rather than merely slowing.
 * 3. The word-stagger ran on a fixed delay chain, so the last word of a long
 *    headline arrived nearly a second after the first. The stagger is tighter
 *    and the whole entrance is over before somebody has finished reading.
 * 4. The tagline pill sat on `bg-card/50` with a blur over a white background,
 *    which is a translucent surface with nothing behind it to be translucent
 *    against. It is a solid tint now.
 */
interface MarqueeHeroProps {
  tagline: string;
  title: React.ReactNode;
  description: string;
  images: string[];
  actions: React.ReactNode;
  className?: string;
}

const RISE = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    // Critically damped. No overshoot on something that merely appeared: bounce
    // belongs to motion a gesture set off, and nothing here was touched.
    transition: { type: 'spring' as const, bounce: 0, duration: 0.5 },
  },
};

export function MarqueeHero({
  tagline,
  title,
  description,
  images,
  actions,
  className,
}: MarqueeHeroProps) {
  const reduced = useReducedMotion();

  // Doubled so the track can be translated exactly one half-width and land on
  // an identical frame. Any other ratio produces a visible jump on repeat.
  const track = [...images, ...images];

  // With reduced motion on, everything is simply present. `animate="show"` with
  // no initial state means no entrance runs at all, rather than an entrance
  // that has been sped up until it flickers.
  const anim = reduced
    ? {}
    : { initial: 'hidden' as const, animate: 'show' as const };

  return (
    <section
      className={cn(
        'aurora relative isolate overflow-hidden px-5 pt-28 pb-0 text-center sm:pt-32',
        className,
      )}
    >
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
        <motion.p
          {...anim}
          variants={RISE}
          className="mb-6 rounded-full bg-mint-100 px-4 py-1.5 text-sm font-medium text-mint-800"
        >
          {tagline}
        </motion.p>

        <motion.h1
          {...anim}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045 } } }}
          className="font-display text-[clamp(2.5rem,9vw,4.5rem)] leading-[1.02] font-extrabold tracking-[-0.04em] text-balance"
        >
          {typeof title === 'string'
            ? title.split(' ').map((word, i) => (
                <motion.span key={i} variants={RISE} className="inline-block">
                  {word}&nbsp;
                </motion.span>
              ))
            : title}
        </motion.h1>

        <motion.p
          {...anim}
          variants={RISE}
          transition={{ delay: 0.25 }}
          className="mt-6 max-w-xl text-lg text-muted text-pretty"
        >
          {description}
        </motion.p>

        <motion.div {...anim} variants={RISE} transition={{ delay: 0.35 }} className="mt-9">
          {actions}
        </motion.div>
      </div>

      {/*
        The marquee.

        It is deliberately clipped by the section rather than floated over the
        copy: Bevel runs its strip as a band the page passes through, and a strip
        sitting on top of the headline would be competing with the one thing the
        hero is for.
      */}
      <div className="edge-fade relative z-0 mt-16 pb-16">
        <motion.div
          className="flex w-max gap-4 will-change-transform"
          animate={reduced ? undefined : { x: ['0%', '-50%'] }}
          transition={
            reduced
              ? undefined
              : { ease: 'linear', duration: 46, repeat: Infinity, repeatType: 'loop' }
          }
        >
          {track.map((src, i) => (
            <div
              key={i}
              className="h-56 w-auto shrink-0 md:h-72"
              style={{ rotate: i % 2 === 0 ? '-2deg' : '2.5deg' }}
            >
              <img
                src={src}
                alt=""
                aria-hidden="true"
                loading={i < 4 ? 'eager' : 'lazy'}
                decoding="async"
                className="h-full w-auto rounded-2xl shadow-[0_1rem_2rem_rgba(0,0,0,0.10)]"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
