import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { Reveal } from '../components/Motion';
import { EYEBROW, H2, SECTION, WRAP } from '../components/type';

const STEPS = [
  { title: 'Give it a goal', body: 'One sentence, in your own words.', example: '“Research our top competitors.”' },
  { title: 'Orchestrator understands', body: 'Breaks the goal into the work it actually needs.' },
  { title: 'Right agents activate', body: 'Relevant specialists receive their tasks. The rest stay idle.' },
  { title: 'Tools provide capabilities', body: 'Agents use connected apps and services to read, draft and act.' },
  { title: 'Work gets executed', body: 'Agents complete multi-step work and pass context to each other.' },
  { title: 'You stay in control', body: 'Consequential actions can require your approval.' },
  { title: 'Result', body: 'You receive the completed work, with its history.' },
];

/**
 * Seven steps down one line. The heading stays put on wide screens while the
 * steps scroll past, and the line fills with them.
 */
export default function HowItWorks() {
  const list = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 70%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="how-it-works" aria-labelledby="how-title" className={SECTION}>
      <div className={`${WRAP} grid gap-12 lg:grid-cols-12`}>
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className={EYEBROW}>How it works</p>
            <h2 id="how-title" className={`${H2} mt-4`}>
              From one goal to finished work.
            </h2>
            <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-ink-2">
              You say what you want done. The workforce works out how, does it, and shows you everything it did.
            </p>
          </div>
        </Reveal>

        <ol ref={list} className="relative lg:col-span-6 lg:col-start-7">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[19px] w-px bg-line-strong" />
          <m.span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[19px] w-px origin-top bg-gradient-to-b from-accent via-cyan to-lavender"
            style={reduce ? undefined : { scaleY: fill }}
          />
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.title} className="relative flex gap-6 pb-12 last:pb-0" y={16}>
              <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-line-strong bg-bg text-[13px] font-semibold text-accent-text tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="pt-1.5">
                <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-ink-2">{step.body}</p>
                {step.example && (
                  <p className="mt-3 w-fit rounded-full bg-accent-soft px-4 py-1.5 text-[15px] text-accent-text">{step.example}</p>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
