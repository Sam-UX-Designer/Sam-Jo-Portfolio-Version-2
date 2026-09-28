import { Check } from 'lucide-react';
import { ORCHESTRATOR, DEPARTMENTS } from '../data/agents';
import Avatar, { Lettermark } from '../components/Avatar';
import { Reveal } from '../components/Motion';
import { BODY, H2, SECTION, WRAP } from '../components/type';

const BEFORE = ['Many prompts', 'Many apps', 'Copy and paste', 'Lost context', 'Manual follow-up'];

/** Where the old way scatters, each item sits a little off the line. */
const SCATTER = [
  { x: '4%', y: '6%', r: -4 },
  { x: '46%', y: '20%', r: 3 },
  { x: '10%', y: '42%', r: 2 },
  { x: '52%', y: '58%', r: -3 },
  { x: '18%', y: '78%', r: 4 },
];

/**
 * The problem, then the change, side by side. The left half is deliberately
 * loose and unconnected; the right is one line, lit end to end.
 */
export default function Problem() {
  const workforce = DEPARTMENTS.filter((a) => ['general', 'marketing', 'design', 'finance'].includes(a.key));

  return (
    <section id="problem" aria-labelledby="problem-title" className={SECTION}>
      <div className={WRAP}>
        <Reveal className="max-w-3xl">
          <h2 id="problem-title" className={H2}>
            AI can answer. Your work still needs coordination.
          </h2>
          <p className={BODY}>
            Most AI tools are great at individual tasks. Real work is rarely one task. It needs research, decisions, tools,
            handoffs, follow-ups, and context. AI Agents World coordinates those pieces around one goal.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          <Reveal className="aw-card relative overflow-hidden rounded-[28px] p-7 sm:p-9">
            <h3 className="text-sm font-semibold text-ink-3">Before</h3>
            <p className="mt-1 text-xl font-semibold tracking-tight">You do the coordinating.</p>
            <div className="relative mt-8 h-[300px]" aria-label="Many prompts, many apps, copy and paste, lost context, manual follow-up">
              {BEFORE.map((item, i) => (
                <span
                  key={item}
                  aria-hidden="true"
                  className="absolute rounded-full border border-dashed border-line-strong bg-surface-2 px-4 py-2.5 text-[15px] text-ink-2"
                  style={{ left: SCATTER[i].x, top: SCATTER[i].y, transform: `rotate(${SCATTER[i].r}deg)` }}
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="aw-card relative overflow-hidden rounded-[28px] p-7 sm:p-9">
            <div aria-hidden="true" className="aw-atmos pointer-events-none absolute inset-0 opacity-80" />
            <div className="relative">
              <h3 className="text-sm font-semibold text-accent-text">With AI Agents World</h3>
              <p className="mt-1 text-xl font-semibold tracking-tight">The workforce does it.</p>

              <ol className="relative mt-8 grid gap-4" aria-label="One goal, Orchestrator, AI workforce, tools, result">
                <span
                  aria-hidden="true"
                  className="absolute top-4 bottom-4 left-[5px] w-px bg-gradient-to-b from-accent via-cyan to-ok opacity-70"
                />
                <Step label="One goal">
                  <span className="truncate rounded-full bg-accent-soft px-3 py-1 text-sm text-accent-text">
                    “Prepare a launch plan”
                  </span>
                </Step>
                <Step label="Orchestrator">
                  <Avatar agent={ORCHESTRATOR} size={30} />
                  <span className="text-sm text-ink-2">Splits it into tasks</span>
                </Step>
                <Step label="AI workforce">
                  <span className="flex -space-x-2">
                    {workforce.map((a) => (
                      <Avatar key={a.key} agent={a} size={30} className="ring-2 ring-surface" />
                    ))}
                  </span>
                  <span className="text-sm text-ink-2">The right agents</span>
                </Step>
                <Step label="Tools">
                  <span className="flex gap-1.5">
                    {['Slack', 'Gmail', 'Calendar'].map((t) => (
                      <Lettermark key={t} name={t} size={30} />
                    ))}
                  </span>
                  <span className="text-sm text-ink-2">Where the work lives</span>
                </Step>
                <Step label="Result" last>
                  <span className="grid size-[30px] place-items-center rounded-full bg-ok/15 text-ok">
                    <Check size={16} strokeWidth={2.4} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-ink">Launch plan ready</span>
                </Step>
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Step({ label, children, last = false }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <li className="relative flex min-h-[34px] items-center gap-4">
      <span
        aria-hidden="true"
        className={`relative z-10 size-[11px] shrink-0 rounded-full border-2 bg-surface ${last ? 'border-ok' : 'border-accent'}`}
      />
      <span className="w-24 shrink-0 text-[13px] font-semibold text-ink-3 sm:w-28">{label}</span>
      <span className="flex min-w-0 items-center gap-3">{children}</span>
    </li>
  );
}
