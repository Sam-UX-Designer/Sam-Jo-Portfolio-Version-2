import { useRef } from 'react';
import { m, transform, useMotionValueEvent, useReducedMotion, useTransform } from 'motion/react';
import Phone from '../components/Phone';
import { SAMPLE_NET_WORTH, inr } from '../config';
import { useScene, useScrub } from '../lib/scene';

/**
 * Scene 4. The moment it clicks. Scrolling counts the net worth up, the way
 * the app reveals it right after connecting, and the real screen slides in.
 */
export default function Aha() {
  const { ref, progress } = useScene<HTMLElement>();
  const reduce = useReducedMotion();
  const number = useRef<HTMLSpanElement>(null);
  const count = transform([0.05, 0.55], [0, SAMPLE_NET_WORTH]);
  const amount = useTransform(progress, (v) => count(v));
  useMotionValueEvent(amount, 'change', (v) => {
    if (!reduce && number.current) number.current.textContent = inr(v);
  });

  const phoneY = useScrub(progress, [0.1, 0.6], ['30vh', '0vh'], '0vh');
  const phoneOpacity = useScrub(progress, [0.1, 0.4], [0, 1], 1);
  const noteOpacity = useScrub(progress, [0.5, 0.62], [0, 1], 1);

  return (
    <section ref={ref} id="aha" aria-labelledby="aha-title" className="relative h-[230vh]">
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <h2 id="aha-title" className="text-[15px] font-semibold text-ink-2">
              The moment it clicks
            </h2>
            <p className="mt-6 text-[15px] font-medium text-ink-2">Your net worth today</p>
            <p className="mt-1 text-[clamp(3.25rem,9vw,8rem)] leading-none font-bold tracking-[-0.05em] tabular-nums">
              <span ref={number} aria-hidden="true">
                {inr(reduce ? SAMPLE_NET_WORTH : 0)}
              </span>
              <span className="sr-only">{inr(SAMPLE_NET_WORTH)}</span>
            </p>
            <m.div style={{ opacity: noteOpacity }}>
              <p className="mt-4 text-[17px] font-semibold text-pos-text">Up ₹2,50,123 since 1 Jan</p>
              <p className="mt-6 max-w-[40ch] text-lg leading-snug text-ink-2 sm:text-xl">
                Right after you connect, your net worth counts up and Super Intelligence shows three things it has already
                found.
              </p>
            </m.div>
          </div>
          <m.div style={{ y: phoneY, opacity: phoneOpacity }} className="hidden justify-center sm:flex">
            <Phone screen="aha" className="w-[min(40vw,52vh,320px)]" />
          </m.div>
        </div>
      </div>
    </section>
  );
}
