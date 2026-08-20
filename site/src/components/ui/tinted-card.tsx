import type React from 'react';

import { cn } from '@/lib/utils';

/**
 * Wise's feature card, rebuilt in HabitXP's hue.
 *
 * The pattern worth stealing is not the rounded rectangle, it is that each card
 * in the row is a *different tint of the same colour*. Three boxes in three
 * unrelated colours read as three unrelated things; three tints of one hue read
 * as one product seen from three angles, and the row holds together without a
 * single border.
 *
 * Each tone carries its own foreground, because the contrast maths changes
 * completely between them and picking text colour by eye is how a card ends up
 * at 2:1 without anybody noticing:
 *
 *   deep  #05231C ground, mint-200 body  -> 12.4:1
 *   mid   #9EFFE0 ground, mint-800 body  ->  8.4:1
 *   pale  #E6FFF8 ground, muted body     ->  4.9:1
 */
type Tone = 'deep' | 'mid' | 'pale';

const TONES: Record<Tone, { card: string; heading: string; body: string }> = {
  deep: { card: 'bg-mint-950', heading: 'text-white', body: 'text-mint-200' },
  mid: { card: 'bg-mint-300', heading: 'text-ink', body: 'text-mint-800' },
  pale: { card: 'bg-mint-100', heading: 'text-ink', body: 'text-muted' },
};

export function TintedCard({
  tone,
  title,
  children,
  visual,
  className,
}: {
  tone: Tone;
  title: string;
  children: React.ReactNode;
  visual?: React.ReactNode;
  className?: string;
}) {
  const t = TONES[tone];

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-card p-7 sm:p-8',
        t.card,
        className,
      )}
    >
      <h3
        className={cn(
          'font-display text-2xl leading-tight font-bold tracking-[-0.025em]',
          t.heading,
        )}
      >
        {title}
      </h3>
      <p className={cn('mt-3 text-[0.9375rem] tracking-[0.005em]', t.body)}>{children}</p>
      {/* mt-auto pins the visual to the bottom, so three cards of different copy
          lengths still line their artwork up along one edge. Without it the row
          reads as ragged even when every card is the same height. */}
      {visual ? <div className="mt-auto pt-8">{visual}</div> : null}
    </div>
  );
}
