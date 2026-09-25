import { useRef, useState } from 'react';
import { m, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { Reveal } from '../components/Motion';

const STEPS = [
  {
    verb: 'Connect',
    meaning: 'Bring supported health information into one context.',
    example: 'Sleep, movement, recovery and other available data.',
  },
  {
    verb: 'Understand',
    meaning: 'Look across the available context for meaningful patterns.',
    example: 'A pattern appears across recent sleep and recovery.',
  },
  {
    verb: 'Explain',
    meaning: 'Explain the pattern in human language.',
    example: '“Your recent sleep timing has been less consistent.”',
  },
  {
    verb: 'Decide',
    meaning: 'Offer practical options while keeping the decision with you.',
    example: '“You could try keeping your bedtime within a narrower window.”',
  },
];

/**
 * The central story of the page. A line fills as the visitor reads, and
 * each step lights as the line reaches it, so the loop reads in order.
 */
const Loop: React.FC = () => {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const [reached, setReached] = useState(0);

  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 80%', 'end 55%'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setReached(Math.min(STEPS.length, Math.floor(v * STEPS.length + 0.35)));
  });

  const lit = (i: number) => reduce || i < reached;

  return (
    <section
      id="loop"
      aria-labelledby="loop-title"
      className="border-y border-line bg-raised py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2
            id="loop-title"
            className="max-w-3xl text-[clamp(2rem,4.6vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
          >
            JUMBO turns health data into understanding.
          </h2>
        </Reveal>

        <ol ref={listRef} className="relative mt-16 grid gap-12 pl-10 md:mt-20 lg:grid-cols-4 lg:gap-8 lg:pl-0">
          {/* Track: vertical on phones and tablets, horizontal on desktop. */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[11px] w-px bg-line-strong lg:hidden" />
          <m.span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[11px] w-px origin-top bg-brand lg:hidden"
            style={{ scaleY: reduce ? 1 : scrollYProgress }}
          />
          <span aria-hidden="true" className="absolute top-[11px] right-0 left-0 hidden h-px bg-line-strong lg:block" />
          <m.span
            aria-hidden="true"
            className="absolute top-[11px] right-0 left-0 hidden h-px origin-left bg-brand lg:block"
            style={{ scaleX: reduce ? 1 : scrollYProgress }}
          />

          {STEPS.map((step, i) => (
            <li key={step.verb} className="relative lg:pt-12">
              <span
                aria-hidden="true"
                className={`absolute top-0.5 -left-10 grid size-6 place-items-center rounded-full border-2 transition-[background-color,border-color] duration-500 lg:top-0 lg:left-0 ${
                  lit(i) ? 'border-brand bg-brand' : 'border-line-strong bg-bg'
                }`}
              >
                <span
                  className={`size-2 rounded-full transition-colors duration-500 ${lit(i) ? 'bg-brand-ink' : 'bg-transparent'}`}
                />
              </span>
              <h3
                className={`text-2xl font-semibold tracking-tight transition-colors duration-500 ${
                  lit(i) ? 'text-ink' : 'text-ink-3'
                }`}
              >
                {step.verb}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-2">{step.meaning}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-3">{step.example}</p>
            </li>
          ))}
        </ol>

        <Reveal>
          <p className="mt-16 max-w-2xl text-lg leading-relaxed text-ink-2 md:mt-20">
            Every suggestion is an option, not an instruction.{' '}
            <span className="font-semibold text-ink">You stay in control.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default Loop;
