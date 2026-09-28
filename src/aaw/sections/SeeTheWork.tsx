import { useState } from 'react';
import { ASSETS } from '../config';
import { Reveal } from '../components/Motion';
import { BODY, H2, SECTION, WRAP } from '../components/type';

/**
 * The real Home screen mid-run, with the four places that answer "what is
 * happening?" marked on it. Hover or focus a line to find it on the screen.
 * Positions are fractions of the screenshot, measured from the file.
 */

const SPOTS = [
  {
    id: 'agents',
    title: 'Which agents are working',
    body: 'Active Agents lists only who is busy right now. An idle world shows no panel at all.',
    at: [0.888, 0.2],
  },
  {
    id: 'station',
    title: 'What each one is doing',
    body: 'Every agent works at its own station, and its card says what it is doing in plain words.',
    at: [0.3, 0.412],
  },
  {
    id: 'progress',
    title: 'How far the goal has got',
    body: 'Task in progress counts finished tasks. The bar only moves when a task really completes.',
    at: [0.892, 0.905],
  },
  {
    id: 'history',
    title: 'What was completed, and with which tools',
    body: 'History keeps every run: the goal, the agents, the tools they used and the result.',
    at: [0.066, 0.226],
  },
] as const;

export default function SeeTheWork() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="see-the-work" aria-labelledby="see-title" className={SECTION}>
      <div className={WRAP}>
        <Reveal className="max-w-3xl">
          <h2 id="see-title" className={H2}>
            AI shouldn’t feel like a black box.
          </h2>
          <p className={BODY}>
            See which agents are working, what they are doing, which tools they are using, and what has been completed.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <figure className="aw-frame relative overflow-hidden rounded-[24px] bg-[#04070D]">
            <img
              src={ASSETS.screens.working.src}
              alt={ASSETS.screens.working.alt}
              width={2400}
              height={1500}
              loading="lazy"
              className="block h-auto w-full"
            />
            {SPOTS.map((s, i) => (
              <span
                key={s.id}
                aria-hidden="true"
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${s.at[0] * 100}%`, top: `${s.at[1] * 100}%` }}
              >
                <span
                  className={`absolute inset-0 rounded-full bg-accent/60 ${active === s.id ? 'aw-ping' : ''}`}
                />
                <span
                  className={`relative grid size-7 place-items-center rounded-full border-2 border-white text-[12px] font-bold text-white shadow-lg transition-transform duration-300 sm:size-8 ${
                    active === s.id ? 'scale-125 bg-accent' : 'bg-accent/85'
                  }`}
                >
                  {i + 1}
                </span>
              </span>
            ))}
          </figure>
        </Reveal>

        <ol className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {SPOTS.map((s, i) => (
            <li
              key={s.id}
              tabIndex={0}
              onMouseEnter={() => setActive(s.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(s.id)}
              onBlur={() => setActive(null)}
              className="cursor-default rounded-2xl outline-offset-4"
            >
              <p className="flex items-center gap-2.5 font-semibold">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent-soft text-[12px] font-bold text-accent-text">
                  {i + 1}
                </span>
                {s.title}
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
