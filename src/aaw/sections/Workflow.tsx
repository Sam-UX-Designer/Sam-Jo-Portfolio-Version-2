import { useCallback, useEffect, useRef, useState } from 'react';
import { m, useInView, useReducedMotion, AnimatePresence } from 'motion/react';
import { Check, RotateCcw } from 'lucide-react';
import { agentByKey, ORCHESTRATOR } from '../data/agents';
import { SCENARIOS } from '../data/scenarios';
import Avatar from '../components/Avatar';
import { EASE, Reveal } from '../components/Motion';
import { BODY, EYEBROW, H2, SECTION, WRAP } from '../components/type';

/**
 * One goal becoming a workflow: the signature section.
 *
 * The same launch plan the hero runs, drawn as a plan: the Orchestrator in
 * the middle, the agents it chose on the right, each lighting up when its
 * inputs are ready, in the order the app would run them. Plays once when it
 * scrolls into view; Replay runs it again. Reduced motion shows the finished
 * plan.
 */

const GOAL = 'Prepare a launch plan for our new product.';
const launch = SCENARIOS.find((s) => s.id === 'launch')!;

/** What each agent contributes, in the words of the brief. */
const ROLE_OF: Record<string, string> = {
  general: 'Research',
  marketing: 'Positioning',
  design: 'Creative direction',
  finance: 'Budget analysis',
};

interface Row {
  id: string;
  agentKey: string;
  role: string;
  title: string;
  dependsOn: string[];
}

const ROWS: Row[] = [
  ...launch.tasks.map((t) => ({ id: t.id, agentKey: t.agentKey, role: ROLE_OF[t.agentKey] ?? t.title, title: t.title, dependsOn: t.dependsOn })),
  {
    id: 'synth',
    agentKey: ORCHESTRATOR.key,
    role: 'Synthesis',
    title: 'Bring it together as one plan',
    dependsOn: launch.tasks.map((t) => t.id),
  },
];

type RowState = 'waiting' | 'working' | 'done';
const STEP_MS = 1300;

/** Beats in which each row works: a row starts once everything it needs is done. */
function schedule(rows: Row[]) {
  const finish: Record<string, number> = {};
  const start: Record<string, number> = {};
  const left = [...rows];
  while (left.length) {
    const row = left.find((r) => r.dependsOn.every((d) => d in finish));
    if (!row) break;
    start[row.id] = Math.max(0, ...row.dependsOn.map((d) => finish[d]));
    finish[row.id] = start[row.id] + 1;
    left.splice(left.indexOf(row), 1);
  }
  return { start, finish, beats: Math.max(...Object.values(finish)) };
}

const PLAN = schedule(ROWS);

export default function Workflow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [beat, setBeat] = useState(-1);
  const [runKey, setRunKey] = useState(0);

  const play = useCallback(() => {
    setBeat(0);
    setRunKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (reduce) setBeat(PLAN.beats + 1);
    else play();
  }, [inView, reduce, play]);

  useEffect(() => {
    if (beat < 0 || beat > PLAN.beats || reduce) return;
    const t = window.setTimeout(() => setBeat((b) => b + 1), beat === 0 ? 900 : STEP_MS);
    return () => clearTimeout(t);
  }, [beat, runKey, reduce]);

  const stateOf = (row: Row): RowState => {
    if (beat < 0) return 'waiting';
    // Beat 0 is the Orchestrator reading the goal; rows start at beat 1.
    const b = beat - 1;
    if (b >= PLAN.finish[row.id]) return 'done';
    if (b >= PLAN.start[row.id]) return 'working';
    return 'waiting';
  };

  const finished = beat > PLAN.beats;
  const orchestratorBusy = beat === 0 || (beat > 0 && !finished);

  return (
    <section id="product" aria-labelledby="workflow-title" className={`${SECTION} overflow-hidden`}>
      <div aria-hidden="true" className="aw-atmos pointer-events-none absolute inset-0 opacity-70" />
      <div className={`${WRAP} relative`}>
        <Reveal className="max-w-3xl">
          <p className={EYEBROW}>One goal. Many agents.</p>
          <h2 id="workflow-title" className={`${H2} mt-4`}>
            One goal can become an entire workflow.
          </h2>
          <p className={BODY}>
            The Orchestrator reads the goal, decides what work it needs, and hands each piece to the agent whose expertise
            fits. Work that does not depend on anything runs at the same time.
          </p>
        </Reveal>

        <div ref={ref} className="aw-card mt-14 overflow-hidden rounded-[32px] p-4 sm:p-6 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] lg:gap-10">
            {/* The goal, and the Orchestrator taking it. */}
            <div className="flex flex-col gap-5">
              <div className="rounded-3xl border border-line bg-surface-2 p-5">
                <p className="text-[13px] font-semibold text-ink-3">The goal</p>
                <p className="mt-2 text-xl leading-snug font-semibold tracking-tight">“{GOAL}”</p>
              </div>

              <div className="relative rounded-3xl border border-line bg-surface-2 p-5">
                <div className="flex items-center gap-3.5">
                  <span className="relative">
                    <Avatar agent={ORCHESTRATOR} size={48} />
                    {orchestratorBusy && !reduce && (
                      <span aria-hidden="true" className="aw-ping absolute inset-0 rounded-[14px] border-2 border-accent" />
                    )}
                  </span>
                  <span>
                    <span className="block font-semibold">Orchestrator</span>
                    <span className="block text-sm text-ink-3" aria-live="polite">
                      {beat < 0
                        ? 'Ready'
                        : beat === 0
                          ? 'Reading your goal'
                          : finished
                            ? 'Done'
                            : `Coordinating ${launch.tasks.length} tasks`}
                    </span>
                  </span>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-2">{launch.interpretation}</p>
              </div>

              <button
                onClick={play}
                className="inline-flex h-11 w-fit items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-semibold text-ink transition-colors hover:bg-accent-soft"
              >
                <RotateCcw size={15} aria-hidden="true" />
                Replay
              </button>
            </div>

            {/* The agents it chose, in the order the work can happen. */}
            <div className="flex flex-col gap-3">
              <ol className="grid gap-3">
                {ROWS.map((row) => {
                  const agent = agentByKey(row.agentKey)!;
                  const state = stateOf(row);
                  return (
                    <li
                      key={row.id}
                      data-state={state}
                      className={`flex items-center gap-4 rounded-2xl border p-3.5 transition-[border-color,background-color,opacity] duration-500 sm:p-4 ${
                        state === 'working'
                          ? 'border-accent/60 bg-accent-soft'
                          : state === 'done'
                            ? 'border-line bg-surface-2'
                            : 'border-line bg-transparent opacity-60'
                      }`}
                    >
                      <Avatar agent={agent} size={40} />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13px] font-semibold text-ink-3">{row.role}</span>
                        <span className="block truncate font-semibold">
                          {agent.name}
                          <span className="font-normal text-ink-2"> · {row.title}</span>
                        </span>
                      </span>
                      <Status state={state} />
                    </li>
                  );
                })}
              </ol>

              <AnimatePresence>
                {finished && (
                  <m.div
                    key={runKey}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="rounded-2xl border border-ok/40 bg-ok/10 p-4 sm:p-5"
                  >
                    <p className="flex items-center gap-2 font-semibold">
                      <span className="grid size-6 place-items-center rounded-full bg-ok text-bg">
                        <Check size={14} strokeWidth={3} aria-hidden="true" />
                      </span>
                      Launch plan ready
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">
                      Positioning, creative direction, budget and a four-week timeline, in one plan. Announcements wait for
                      your approval.
                    </p>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Status({ state }: { state: RowState }) {
  if (state === 'done') {
    return (
      <span className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-ok">
        <Check size={15} strokeWidth={2.5} aria-hidden="true" />
        Done
      </span>
    );
  }
  if (state === 'working') {
    return (
      <span className="flex shrink-0 items-center gap-2 text-sm font-medium text-accent-text">
        <span aria-hidden="true" className="aw-pulse size-2 rounded-full bg-accent" />
        Working
      </span>
    );
  }
  return <span className="shrink-0 text-sm text-ink-3">Waiting</span>;
}
