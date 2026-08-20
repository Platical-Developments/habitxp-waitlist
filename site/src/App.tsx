import type React from 'react';

import { HabitTick, StreakPill, XpRing } from '@/components/ui/chips';
import { MarqueeHero } from '@/components/ui/marquee-hero';
import { PhonePanel } from '@/components/ui/phone-panel';
import { Reveal } from '@/components/ui/reveal';
import { TintedCard } from '@/components/ui/tinted-card';
import { WaitlistForm } from '@/components/waitlist-form';
import { IS_LIVE, PRIVACY_URL, SUPPORT_URL, TERMS_URL, primaryCta } from '@/config';

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;
const PANELS = Array.from({ length: 9 }, (_, i) => asset(`shots/panel-${i + 1}.webp`));

/** Apple's mark, drawn rather than pulled from an icon font. */
function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
      <path d="M17.05 12.54c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.62-1.7-3.19-1.72-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.87-.76-1.48.02-2.84.86-3.6 2.18-1.53 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.25 2.74 2.2 1.1-.04 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.08 2.65-2.14.84-1.23 1.18-2.42 1.2-2.48-.03-.01-2.3-.88-2.32-3.5zM14.9 5.9c.6-.74 1.01-1.75.9-2.77-.87.04-1.93.58-2.56 1.31-.56.65-1.05 1.69-.92 2.68.97.08 1.96-.49 2.58-1.22z" />
    </svg>
  );
}

/**
 * Bevel's black pill, and the only black surface on the page.
 *
 * Press and release are deliberately asymmetric: instant on the way down, 150ms
 * on the way back. Pressing is a direct response to the finger and cannot carry
 * lag; releasing is the surface settling on its own and is allowed to take time.
 */
function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex touch-manipulation items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-3.5 font-semibold text-white transition-[transform,filter] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:brightness-150 active:scale-[0.97] active:duration-0"
    >
      {IS_LIVE ? <AppleGlyph /> : null}
      {children}
    </a>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[clamp(1.75rem,5vw,2.75rem)] leading-[1.08] font-extrabold tracking-[-0.035em] text-balance">
      {children}
    </h2>
  );
}

export default function App() {
  return (
    <>
      {/*
        Bevel's floating pill nav. Genuinely translucent, because page content
        scrolls underneath it — which is the only condition under which a
        backdrop blur is a material rather than decoration.
      */}
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav className="flex items-center gap-3 rounded-full border border-white/60 bg-white/70 py-2 pr-2 pl-4 shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <img src={asset('icon.png')} width={28} height={28} alt="" className="size-7 rounded-lg" />
          <span className="font-display font-bold tracking-[-0.02em]">HabitXP</span>
          <a
            href={primaryCta.href}
            className="ml-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-transform duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.97] active:duration-0"
          >
            {IS_LIVE ? 'Get the app' : 'Join the waitlist'}
          </a>
        </nav>
      </header>

      <main>
        <MarqueeHero
          tagline={IS_LIVE ? 'Free on the App Store' : 'Coming to iPhone'}
          title="Habits that only ever add up."
          description="Tick a habit, earn XP, and grow a character who reflects the work. Miss a day and you lose the streak number. Nothing else."
          images={PANELS}
          actions={
            <div className="flex flex-col items-center gap-3">
              <PrimaryButton href={primaryCta.href}>{primaryCta.label}</PrimaryButton>
              {/*
                Bevel carries "4.8 / 49.1K ratings" in this exact spot and Wise
                carries a member count. There is nobody to count yet, and a
                fabricated number would undo the precise point the rest of this
                page is making. What sits here instead is true.
              */}
              <p className="text-sm text-muted">No account. No ads. iPhone.</p>
            </div>
          }
        />

        {/* ---- the problem, in the buyer's own words ---- */}
        <section className="mx-auto max-w-2xl px-5 py-24 text-center sm:py-32">
          <Reveal>
            <SectionHeading>Eight apps. All the same ending.</SectionHeading>
            <p className="mx-auto mt-5 max-w-lg text-lg text-muted text-pretty">
              You download it on a Sunday. You are perfect for nine days. You miss one
              Tuesday, the number goes back to zero, and you never open it again. The app
              was not built to survive your bad week.
            </p>
          </Reveal>
        </section>

        {/* ---- Wise's card row, rebuilt in one hue ---- */}
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:pb-32">
          <div className="grid gap-4 md:grid-cols-3">
            <Reveal>
              <TintedCard
                tone="deep"
                className="h-full"
                title="Your streak breaks. Your character does not."
                visual={<StreakPill days={1} />}
              >
                Bud keeps every level, every item and every point of XP you have ever
                earned. There is no health bar to drain and nothing to lose but a number.
              </TintedCard>
            </Reveal>

            <Reveal delay={0.08}>
              <TintedCard
                tone="mid"
                className="h-full"
                title="Twenty one habits, ready to go."
                visual={
                  <div className="space-y-2.5">
                    <HabitTick label="Drink water" xp={5} />
                    <HabitTick label="Go for a walk" xp={15} />
                  </div>
                }
              >
                Pick from the library or write your own. Every day, certain weekdays, or a
                few times a week.
              </TintedCard>
            </Reveal>

            <Reveal delay={0.16}>
              <TintedCard
                tone="pale"
                className="h-full"
                title="It never leaves your phone."
                visual={
                  <div className="flex items-end gap-5">
                    <XpRing value={20} total={300} label="of 300 XP" />
                    <XpRing value={1} total={7} label="day streak" />
                  </div>
                }
              >
                No account. No sign up. No server holding a copy of what you are working
                on.
              </TintedCard>
            </Reveal>
          </div>
        </section>

        {/* ---- Bevel's three-up app showcase ---- */}
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:pb-32">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading>Start the day knowing exactly where you stand</SectionHeading>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            <Reveal>
              <PhonePanel
                eyebrow="Today"
                title="One tap, and the day is logged"
                src={asset('shots/shot-habits.webp')}
                alt="The HabitXP habit library, showing Shower, Drink water, Go for a walk and Work out, each with the XP it is worth."
                tone="bg-gradient-to-b from-mint-100 to-mint-50"
                chip={<HabitTick label="Shower" xp={10} />}
                chipClassName="-bottom-2 left-0 w-[64%] sm:w-[58%]"
              />
            </Reveal>

            <Reveal delay={0.08}>
              <PhonePanel
                eyebrow="Stats"
                title="Every hour of effort, counted"
                src={asset('shots/shot-stats.webp')}
                alt="The HabitXP Stats screen, showing 20 of 300 XP, a one-day streak, 100% done today and Bud at level 6."
                tone="bg-gradient-to-b from-[#FFF3D6] to-mint-50"
                chip={
                  <div className="rounded-2xl bg-white p-3 shadow-[0_0.75rem_2rem_rgba(0,0,0,0.14)]">
                    <XpRing value={20} total={300} label="of 300 XP" />
                  </div>
                }
                chipClassName="bottom-8 right-0"
              />
            </Reveal>

            <Reveal delay={0.16}>
              <PhonePanel
                eyebrow="Settings"
                title="Reminders to the minute. Light or dark."
                src={asset('shots/shot-settings.webp')}
                alt="The HabitXP Settings screen, showing the appearance options and the daily reminder set to 09:00."
                tone="bg-gradient-to-b from-mint-200 to-mint-50"
                chip={<StreakPill days={1} />}
                chipClassName="bottom-20 left-0"
              />
            </Reveal>
          </div>
        </section>

        {/* ---- the ask ---- */}
        <section id="waitlist" className="scroll-mt-24 bg-surface py-24 sm:py-32">
          <div className="mx-auto grid max-w-5xl gap-12 px-5 md:grid-cols-2 md:items-center md:gap-16">
            <Reveal>
              <SectionHeading>
                {IS_LIVE ? 'Get it on your phone' : 'Know the day it lands'}
              </SectionHeading>
              <p className="mt-5 max-w-md text-lg text-muted text-pretty">
                {IS_LIVE
                  ? 'Free, with no habit cap and no countdown. There is a paid tier for extra character options and deeper stats, and it is not required to use the app.'
                  : 'HabitXP arrives on the App Store shortly. Put your email in and you will hear once, on the day it does.'}
              </p>
              {IS_LIVE ? (
                <div className="mt-8">
                  <PrimaryButton href={primaryCta.href}>{primaryCta.label}</PrimaryButton>
                </div>
              ) : null}
            </Reveal>

            <Reveal delay={0.08}>
              <WaitlistForm />
              <p className="ml-promise">
                <a href={PRIVACY_URL} className="text-mint-600 underline">
                  Privacy policy
                </a>
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      {/*
        No publisher name and no contact address here. This page is marketing,
        not a legal notice: the privacy policy carries the controller's identity
        and contact details as UK GDPR requires, and linking to it discharges the
        same duty without publishing either on a page built to be scraped.
      */}
      <footer className="mx-auto max-w-6xl px-5 py-12 text-[0.8125rem] leading-[1.55] tracking-[0.01em] text-muted">
        <p>HabitXP is published under the name Platical Games, in the United Kingdom.</p>
        <p className="mt-2 flex flex-wrap gap-x-2">
          <a href={PRIVACY_URL} className="underline">
            Privacy policy
          </a>
          <span aria-hidden="true">·</span>
          <a href={TERMS_URL} className="underline">
            Terms of use
          </a>
          <span aria-hidden="true">·</span>
          <a href={SUPPORT_URL} className="underline">
            Support
          </a>
        </p>
      </footer>
    </>
  );
}
