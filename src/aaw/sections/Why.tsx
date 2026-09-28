import { Reveal } from '../components/Motion';
import { H2, SECTION, WRAP } from '../components/type';

const REASONS = [
  { title: 'Give goals, not instructions.', body: 'Start with the outcome instead of manually breaking work into prompts.' },
  { title: 'Coordinate, don’t switch.', body: 'Agents and tools work together around the same goal.' },
  { title: 'Stay in control.', body: 'See what happened and approve consequential actions.' },
];

/** Three reasons, set as type. No cards: the sentences are the design. */
export default function Why() {
  return (
    <section id="why" aria-labelledby="why-title" className={SECTION}>
      <div className={WRAP}>
        <Reveal>
          <h2 id="why-title" className={`${H2} max-w-3xl`}>
            Why AI Agents World
          </h2>
        </Reveal>
        <ul className="mt-14">
          {REASONS.map((r, i) => (
            <Reveal
              as="li"
              key={r.title}
              delay={i * 0.06}
              className="grid gap-3 border-t border-line py-9 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <p className="text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.08] font-semibold tracking-[-0.03em] md:col-span-7">
                {r.title}
              </p>
              <p className="text-lg leading-relaxed text-ink-2 md:col-span-5">{r.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
