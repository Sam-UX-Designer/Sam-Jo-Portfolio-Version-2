import { ArrowLeftRight, Check, ClipboardCopy, MessageSquare, RotateCcw } from 'lucide-react';
import { ORCHESTRATOR, DEPARTMENTS } from '../data/agents';
import { integrationById } from '../data/integrations';
import Avatar, { ToolLogo } from '../components/Avatar';
import { Reveal } from '../components/Motion';
import { BODY, H2, SECTION, WRAP } from '../components/type';

/**
 * The problem, then the change, side by side. The left is the old way as a
 * picture: the apps you jump between, tangled together by hand. The right is
 * one line, lit end to end.
 */

/** The apps on the left, where each one sits (% of the box) and its tilt. */
const SCATTER = [
  { id: 'gmail', x: 8, y: 10, r: -8 },
  { id: 'slack', x: 42, y: 4, r: 6 },
  { id: 'notion', x: 76, y: 14, r: -4 },
  { id: 'google-calendar', x: 22, y: 42, r: 5 },
  { id: 'figma', x: 58, y: 38, r: -7 },
  { id: 'google-drive', x: 84, y: 50, r: 7 },
  { id: 'hubspot', x: 6, y: 74, r: -5 },
  { id: 'linear', x: 40, y: 72, r: 4 },
  { id: 'airtable', x: 70, y: 80, r: -6 },
];

/** Hand-made links between apps: crossing, looping, going nowhere in order. */
const TANGLE = [
  [0, 4],
  [1, 3],
  [2, 6],
  [3, 5],
  [4, 7],
  [5, 0],
  [6, 8],
  [7, 2],
];

/** Where prompts and pasted context interrupt the work. */
const MARKS = [
  { icon: MessageSquare, x: 30, y: 24 },
  { icon: ClipboardCopy, x: 64, y: 62 },
  { icon: RotateCcw, x: 24, y: 88 },
];

const PAINS = [
  { icon: ArrowLeftRight, label: 'Switch apps' },
  { icon: MessageSquare, label: 'Prompt again' },
  { icon: ClipboardCopy, label: 'Copy context' },
];

const TILE = 60;

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

            <figure className="relative mt-6 h-[300px]" aria-label="Gmail, Slack, Notion, Google Calendar, Figma, Google Drive, HubSpot, Linear and Airtable, tangled together by hand">
              <svg aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                {TANGLE.map(([a, b], i) => {
                  const p = SCATTER[a];
                  const q = SCATTER[b];
                  const ax = p.x + 5;
                  const ay = p.y + 9;
                  const bx = q.x + 5;
                  const by = q.y + 9;
                  // A loose curve, bowed to alternate sides, so the links read as hand-made.
                  const bend = i % 2 ? 18 : -18;
                  return (
                    <path
                      key={i}
                      d={`M ${ax} ${ay} Q ${(ax + bx) / 2 + bend} ${(ay + by) / 2 - bend / 2} ${bx} ${by}`}
                      fill="none"
                      stroke="var(--line-strong)"
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                      className="aw-trail"
                      style={{ animationDuration: `${2.6 + (i % 3) * 0.7}s` }}
                    />
                  );
                })}
              </svg>

              {SCATTER.map((s) => (
                <span
                  key={s.id}
                  className="absolute"
                  style={{ left: `${s.x}%`, top: `${s.y}%`, transform: `rotate(${s.r}deg)` }}
                >
                  <ToolLogo id={s.id} name={integrationById(s.id)?.name ?? s.id} size={TILE} className="shadow-lg" />
                </span>
              ))}

              {MARKS.map(({ icon: Icon, x, y }, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="absolute grid size-9 place-items-center rounded-full border border-dashed border-line-strong bg-surface-2 text-ink-3"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <Icon size={16} />
                </span>
              ))}
            </figure>

            <ul className="mt-6 flex flex-wrap gap-2">
              {PAINS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-2">
                  <Icon size={15} aria-hidden="true" className="text-ink-3" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="aw-card relative overflow-hidden rounded-[28px] p-7 sm:p-9">
            <div aria-hidden="true" className="aw-atmos pointer-events-none absolute inset-0 opacity-80" />
            <div className="relative">
              <h3 className="text-sm font-semibold text-accent-text">With AI Agents World</h3>
              <p className="mt-1 text-xl font-semibold tracking-tight">The workforce does it.</p>

              <ol className="relative mt-8 grid gap-5" aria-label="One goal, Orchestrator, AI workforce, tools, result">
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
                  <Avatar agent={ORCHESTRATOR} size={32} />
                  <span className="text-sm text-ink-2">Splits it into tasks</span>
                </Step>
                <Step label="AI workforce">
                  <span className="flex -space-x-2">
                    {workforce.map((a) => (
                      <Avatar key={a.key} agent={a} size={32} className="ring-2 ring-surface" />
                    ))}
                  </span>
                  <span className="text-sm text-ink-2">The right agents</span>
                </Step>
                <Step label="Tools">
                  <span className="flex gap-1.5">
                    {['slack', 'gmail', 'google-calendar'].map((id) => (
                      <ToolLogo key={id} id={id} name={integrationById(id)?.name ?? id} size={32} announce />
                    ))}
                  </span>
                  <span className="text-sm text-ink-2">Where the work lives</span>
                </Step>
                <Step label="Result" last>
                  <span className="grid size-8 place-items-center rounded-full bg-ok/15 text-ok">
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
    <li className="relative flex min-h-[36px] items-center gap-4">
      <span
        aria-hidden="true"
        className={`relative z-10 size-[11px] shrink-0 rounded-full border-2 bg-surface ${last ? 'border-ok' : 'border-accent'}`}
      />
      <span className="w-24 shrink-0 text-[13px] font-semibold text-ink-3 sm:w-28">{label}</span>
      <span className="flex min-w-0 items-center gap-3">{children}</span>
    </li>
  );
}
