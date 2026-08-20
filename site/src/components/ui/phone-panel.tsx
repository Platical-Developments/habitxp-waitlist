import type React from 'react';

import { cn } from '@/lib/utils';

/**
 * Bevel's three-up app showcase.
 *
 * The detail that makes it work is not the phone: it is the chip floating just
 * outside the phone's edge. A screenshot alone reads as documentation. One
 * element lifted out of the screen, given its own shadow and allowed to break
 * the frame, reads as the interface coming towards you — and it draws the eye to
 * the one thing in that screenshot worth noticing, which a full screen of small
 * UI never can on a phone-sized viewport.
 *
 * The panel is `overflow-hidden` and the phone is deliberately taller than it,
 * so the device runs off the bottom edge rather than sitting inside with a
 * margin. A phone floating fully inside a box reads as a sticker; one leaving
 * the frame reads as a window onto something larger.
 */
export function PhonePanel({
  eyebrow,
  title,
  src,
  alt,
  tone,
  chip,
  chipClassName,
}: {
  eyebrow: string;
  title: string;
  src: string;
  alt: string;
  tone: string;
  chip?: React.ReactNode;
  chipClassName?: string;
}) {
  return (
    <div className={cn('relative overflow-hidden rounded-card px-6 pt-8', tone)}>
      {/* Not a kicker above a heading for decoration's sake: these three panels
          are one set, and the eyebrow is what tells you which of the three you
          are looking at before you have read the heading. */}
      <p className="text-xs font-semibold tracking-[0.08em] text-mint-600 uppercase">
        {eyebrow}
      </p>
      <h3 className="mt-2 font-display text-[1.375rem] leading-tight font-bold tracking-[-0.025em] text-ink text-balance">
        {title}
      </h3>

      <div className="relative mt-7">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          width={640}
          height={1066}
          className="mx-auto block w-[72%] max-w-[15rem] translate-y-2 rounded-[1.25rem] shadow-[0_1.5rem_3rem_rgba(0,0,0,0.18)]"
        />
        {chip ? (
          <div className={cn('absolute', chipClassName)}>{chip}</div>
        ) : null}
      </div>
    </div>
  );
}
