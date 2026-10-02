import { useLayoutEffect, useRef, useState } from 'react';
import { m, useReducedMotion, useTransform } from 'motion/react';
import Phone from '../components/Phone';
import type { ScreenId } from '../config';
import { useMedia, useScene } from '../lib/scene';

const FEATURES: { title: string; body: string; screens: ScreenId[] }[] = [
  {
    title: 'Home that adapts.',
    body: 'Long-press to move or hide cards. Anything that changed since your last visit rises to the top.',
    screens: ['customise'],
  },
  {
    title: 'Every transaction, clear.',
    body: 'Real merchant logos, search, and filters by account, category or any dates on a calendar.',
    screens: ['activity', 'calendar'],
  },
  {
    title: 'Plans that fit you.',
    body: 'Five quick questions, already filled in from your bank data, so every forecast uses your real numbers.',
    screens: ['si-setup'],
  },
  {
    title: 'Your net worth.',
    body: 'Investments, deposits, retirement savings, cash and money you’ve lent, and how it has grown this year.',
    screens: ['wealth'],
  },
  {
    title: 'Goals and forecasts.',
    body: 'Goals with projections, and a cash forecast until your next salary with a safety buffer.',
    screens: ['plan', 'forecast'],
  },
  {
    title: 'Answers you can keep.',
    body: 'Every conversation with Super Intelligence is saved, grouped by date, ready to pick up again.',
    screens: ['si-answer', 'si-history'],
  },
];

function Panel({ f }: { f: (typeof FEATURES)[number] }) {
  const two = f.screens.length === 2;
  return (
    <li className="flex h-[min(62vh,580px)] w-[min(84vw,560px)] shrink-0 snap-center flex-col overflow-hidden rounded-[28px] bg-card">
      <div className="p-8 sm:p-10">
        <h3 className="text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.05] font-bold tracking-[-0.03em]">{f.title}</h3>
        <p className="mt-3 max-w-[40ch] text-[17px] leading-snug text-ink-2">{f.body}</p>
      </div>
      <div className="relative mt-auto min-h-0 flex-1 overflow-hidden">
        <div className="absolute inset-x-0 top-0 flex justify-center gap-5 px-8">
          {f.screens.map((s) => (
            <Phone key={s} screen={s} className={two ? 'w-[44%] max-w-[240px]' : 'w-[58%] max-w-[270px]'} />
          ))}
        </div>
      </div>
    </li>
  );
}

/**
 * Scene 5. The features slide past sideways while the page scrolls down
 * (wide screens). On phones and under Reduce Motion it is a plain row the
 * visitor swipes.
 */
export default function Features() {
  const wide = useMedia('(min-width: 1024px)');
  const reduce = useReducedMotion();
  const pinned = wide && !reduce;

  const { ref, progress } = useScene<HTMLElement>();
  const track = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const el = track.current;
    if (!el || !pinned) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [pinned]);

  const x = useTransform(progress, (v) => -v * distance);

  const heading = (
    <h2 id="features-title" className="text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[1] font-bold tracking-[-0.045em]">
      Everything about your money.
    </h2>
  );

  if (!pinned) {
    return (
      <section id="features" aria-labelledby="features-title" className="py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">{heading}</div>
        <ul className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:px-8">
          {FEATURES.map((f) => (
            <Panel key={f.title} f={f} />
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id="features"
      aria-labelledby="features-title"
      className="relative"
      style={{ height: `calc(100dvh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden pt-16">
        <div className="mx-auto w-full max-w-6xl px-8">{heading}</div>
        <m.ul ref={track} style={{ x }} className="mt-10 flex w-max gap-6 pr-[8vw] pl-[max(2rem,calc((100vw-72rem)/2+2rem))]">
          {FEATURES.map((f) => (
            <Panel key={f.title} f={f} />
          ))}
        </m.ul>
      </div>
    </section>
  );
}
