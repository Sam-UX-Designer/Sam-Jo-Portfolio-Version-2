import Phone from '../components/Phone';
import { CountUp, Reveal } from '../components/Motion';
import { SAMPLE_NET_WORTH } from '../config';

/**
 * The "aha" reveal. The page counts the net worth up the way the app does
 * right after connecting, then shows the real screen with what Super
 * Intelligence found.
 */
export default function Aha() {
  return (
    <section id="aha" aria-labelledby="aha-title" className="py-20 text-center md:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <h2 id="aha-title" className="text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.06] font-bold tracking-[-0.03em]">
            The moment it clicks
          </h2>
          <p className="mx-auto mt-5 max-w-[48ch] text-lg leading-relaxed text-ink-2 sm:text-xl">
            Right after you connect, your net worth counts up and Super Intelligence shows three things it has already
            found.
          </p>
        </Reveal>

        <Reveal className="mt-14" delay={0.05}>
          <p className="text-[15px] font-medium text-ink-2">Your net worth today</p>
          <CountUp
            value={SAMPLE_NET_WORTH}
            className="mt-2 block text-[clamp(3.25rem,10vw,7.5rem)] leading-none font-bold tracking-[-0.045em] tabular-nums"
          />
          <p className="mt-4 text-[15px] font-medium text-pos-text">Up ₹2,48,010 since 1 Jan</p>
        </Reveal>

        <Reveal className="mt-14" delay={0.1}>
          <Phone screen="aha" className="mx-auto w-[min(300px,72vw)]" />
        </Reveal>
      </div>
    </section>
  );
}
