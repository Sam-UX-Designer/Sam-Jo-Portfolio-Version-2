import { m, type MotionValue } from 'motion/react';
import Mascot from '../components/Mascot';
import { useMedia, useScene, useScrub } from '../lib/scene';
import { Reveal } from '../components/Motion';

/* The real answer from the app's sample data (the "Why did I spend more"
   screen captured for this page), set in type so it can unfold. */
const LEAD = 'Most of the increase comes from groceries.';
const LINES = [
  'Groceries: ₹9,723 in September vs a usual ₹5,289 (+84%).',
  'Food: ₹8,479 vs a usual ₹4,442 (+91%).',
  'Shopping: ₹4,274 vs a usual ₹2,004 (+113%).',
  'BigBasket: ₹5,943 vs a usual ₹3,735.',
];

function Line({ text, at, progress, lead = false, still }: { text: string; at: number; progress: MotionValue<number>; lead?: boolean; still: boolean }) {
  const opacity = useScrub(progress, [at, at + 0.06], [0, 1], 1, still);
  const y = useScrub(progress, [at, at + 0.06], [14, 0], 0, still);
  return (
    <m.li style={{ opacity, y }} className={lead ? 'text-[19px] font-semibold text-ink' : 'flex gap-3 text-[17px] text-ink-2'}>
      {!lead && <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-ink-2" />}
      {text}
    </m.li>
  );
}

/**
 * Scene 6. Super Intelligence. A real question and the app's real answer
 * unfold line by line as the visitor scrolls, next to the mascot that
 * answers it. On phones the content is taller than the screen, so there it
 * is a plain section: the answer shows whole and rises in once.
 */
export default function Intelligence() {
  const { ref, progress } = useScene<HTMLElement>();
  const still = !useMedia('(min-width: 1024px)');
  const ask = useScrub(progress, [0.08, 0.16], [0, 1], 1, still);
  const askY = useScrub(progress, [0.08, 0.16], [20, 0], 0, still);
  const foot = useScrub(progress, [0.72, 0.8], [0, 1], 1, still);

  return (
    <section ref={ref} id="intelligence" aria-labelledby="si-title" className="relative py-24 lg:h-[260vh] lg:py-0">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-[100dvh] lg:items-center lg:overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="relative inline-grid place-items-center">
              <span aria-hidden="true" className="fb-halo absolute -inset-8 rounded-full" />
              <Mascot size={96} interactive className="relative" />
            </div>
            <h2 id="si-title" className="mt-8 text-[clamp(2.5rem,5.6vw,5rem)] leading-[1] font-bold tracking-[-0.045em]">
              Ask anything.
              <br />
              <span className="text-ink-2">Get real answers.</span>
            </h2>
            <p className="mt-6 max-w-[38ch] text-lg leading-snug text-ink-2 sm:text-xl">
              Super Intelligence answers from your own numbers. Worked out, never guessed.
            </p>
          </div>

          <Reveal className="rounded-[28px] bg-card p-7 sm:p-9">
            <m.p
              style={{ opacity: ask, y: askY }}
              className="ml-auto w-fit max-w-[85%] rounded-[22px] rounded-br-md bg-btn px-5 py-3 text-[17px] font-medium text-btn-ink"
            >
              Why did I spend more this month?
            </m.p>
            <ul className="mt-7 grid gap-3.5">
              <Line text={LEAD} at={0.2} progress={progress} lead still={still} />
              {LINES.map((t, i) => (
                <Line key={t} text={t} at={0.3 + i * 0.1} progress={progress} still={still} />
              ))}
            </ul>
            <m.p style={{ opacity: foot }} className="mt-6 text-[13px] text-ink-2">
              Calculated from your connected accounts. Sample data.
            </m.p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
