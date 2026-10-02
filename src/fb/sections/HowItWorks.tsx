import { useState } from 'react';
import { m, useMotionValueEvent, type MotionValue } from 'motion/react';
import Phone from '../components/Phone';
import type { ScreenId } from '../config';
import { useScene, useScrub } from '../lib/scene';

const STEPS: { title: string; body: string; screen: ScreenId }[] = [
  {
    title: 'Connect safely.',
    body: 'Sign in with your mobile number and approve a regulated, consent-based connection. No bank passwords, ever.',
    screen: 'signin',
  },
  {
    title: 'See everything at once.',
    body: 'Balances, spending, investments and net worth on one screen, with a card for every bank.',
    screen: 'card',
  },
  {
    title: 'Ask Super Intelligence.',
    body: 'Ask why you spent more this month and get a plain answer worked out from your own numbers.',
    screen: 'si-why',
  },
];

const N = STEPS.length;

/** One screen in the pinned phone, crossfading in for its third of the scene. */
function Layer({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const a = i / N;
  const b = (i + 1) / N;
  const input = i === 0 ? [0, b - 0.04, b + 0.02] : i === N - 1 ? [a - 0.02, a + 0.04, 1] : [a - 0.02, a + 0.04, b - 0.04, b + 0.02];
  const output = i === 0 ? [1, 1, 0] : i === N - 1 ? [0, 1, 1] : [0, 1, 1, 0];
  const opacity = useScrub(progress, input, output, i === 0 ? 1 : 0);
  const scale = useScrub(progress, input, output.map((o) => 0.97 + o * 0.03), 1);
  return (
    <m.div style={{ opacity, scale }} className={i === 0 ? 'relative' : 'absolute inset-0'}>
      <Phone screen={STEPS[i]!.screen} />
    </m.div>
  );
}

/**
 * Scene 3. The phone stays in the middle of the screen while the three
 * steps play out; its screen changes with each step.
 */
export default function HowItWorks() {
  const { ref, progress } = useScene<HTMLElement>();
  const [active, setActive] = useState(0);
  useMotionValueEvent(progress, 'change', (v) => setActive(Math.min(N - 1, Math.floor(v * N))));
  const bar = useScrub(progress, [0, 1], [0, 1], 1);

  return (
    <section ref={ref} id="how-it-works" aria-labelledby="how-title" className="relative h-[330vh]">
      <div className="sticky top-0 flex h-[100dvh] items-center">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <h2 id="how-title" className="text-[15px] font-semibold text-ink-2">
              How it works
            </h2>
            <ol className="mt-5 grid gap-5 lg:mt-8 lg:gap-9">
              {STEPS.map((s, i) => (
                <li
                  key={s.title}
                  aria-current={active === i ? 'step' : undefined}
                  className={`transition-opacity duration-500 ${active === i ? 'opacity-100' : 'max-lg:hidden opacity-25'}`}
                >
                  <h3 className="text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.05] font-bold tracking-[-0.035em]">{s.title}</h3>
                  <p className="mt-3 max-w-[38ch] text-lg leading-snug text-ink-2">{s.body}</p>
                </li>
              ))}
            </ol>
            <div aria-hidden="true" className="mt-8 h-1 w-40 overflow-hidden rounded-full bg-muted lg:mt-12">
              <m.div style={{ scaleX: bar }} className="h-full origin-left rounded-full bg-ink" />
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative w-[min(58vw,46vh,330px)]">
              {STEPS.map((s, i) => (
                <Layer key={s.screen} i={i} progress={progress} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
