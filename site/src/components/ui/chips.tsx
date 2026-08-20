import { cn } from '@/lib/utils';

/**
 * Fragments of the real interface, rebuilt in HTML.
 *
 * This is the move both reference sites make and the reason their pages do not
 * read as screenshot galleries. Wise renders an actual working transfer
 * calculator inside a card; Bevel lifts single chips out of its app and floats
 * them beside the phone. In both cases you are looking at the product rather
 * than a picture of it.
 *
 * Rebuilt rather than cropped, for three reasons: these stay sharp at any
 * density where a crop would not, they re-flow on a narrow screen where an
 * image can only shrink, and they cost about a kilobyte between them.
 *
 * Every value shown is real, taken from the App Store screenshots: Bud is a
 * Wanderer at level 6 on 20 of 300 XP with a one-day streak. Inventing a
 * flattering 47-day streak here would be inventing a user.
 */

export function HabitTick({ label, xp }: { label: string; xp: number }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white px-3.5 py-3 shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.10)]">
      <div className="flex-1">
        <p className="text-sm font-semibold text-ink">{label}</p>
        <p className="text-xs font-medium text-mint-600">+{xp} XP</p>
      </div>
      <svg viewBox="0 0 24 24" className="size-6 shrink-0" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="#09765C" />
        <path
          d="M7 12.5 L10.5 16 L17 9"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function StreakPill({ days }: { days: number }) {
  return (
    <div className="inline-flex w-fit rounded-full bg-white px-4 py-2 shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.10)]">
      <p className="text-sm font-semibold text-ink">
        {days} day streak
      </p>
    </div>
  );
}

/**
 * The XP ring from the Stats screen.
 *
 * strokeDasharray is set from the circumference so the arc is the real
 * proportion rather than an eyeballed one, and the whole thing is rotated -90deg
 * so zero sits at twelve o'clock instead of three.
 */
export function XpRing({
  value,
  total,
  label,
  className,
}: {
  value: number;
  total: number;
  label: string;
  className?: string;
}) {
  const r = 30;
  const circumference = 2 * Math.PI * r;
  const filled = Math.max(0, Math.min(1, value / total)) * circumference;

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="relative">
        <svg viewBox="0 0 72 72" className="size-[4.5rem]" aria-hidden="true">
          <circle cx="36" cy="36" r={r} fill="none" stroke="#E6E6E9" strokeWidth="6" />
          <circle
            cx="36"
            cy="36"
            r={r}
            fill="none"
            stroke="#09765C"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${filled} ${circumference}`}
            transform="rotate(-90 36 36)"
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-lg font-bold text-ink">
          {value}
        </span>
      </div>
      <p className="mt-1.5 text-xs font-medium text-muted">{label}</p>
    </div>
  );
}
