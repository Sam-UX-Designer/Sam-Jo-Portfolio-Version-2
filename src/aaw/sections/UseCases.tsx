import { useId, useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { agentByKey, ORCHESTRATOR } from '../data/agents';
import { integrationById } from '../data/integrations';
import { route } from '../data/scenarios';
import Avatar, { Lettermark } from '../components/Avatar';
import { EASE, Reveal } from '../components/Motion';
import { tryGoal } from '../experience/bus';
import { BODY, H2, SECTION, WRAP } from '../components/type';

/**
 * Use cases, by who is asking. Each goal is routed by the same function the
 * hero uses, so the agents, tools and result shown here are exactly what the
 * hero does with the same words. "Try this goal" puts it in the hero.
 */

const TABS = [
  {
    id: 'business',
    label: 'Business',
    goals: ['Research a market', 'Prepare a sales meeting', 'Launch a campaign', 'Build an operations report'],
  },
  {
    id: 'teams',
    label: 'Teams',
    goals: ['Product research', 'Marketing planning', 'Sales preparation', 'Operations workflows', 'Engineering research'],
  },
  {
    id: 'individuals',
    label: 'Individuals',
    goals: ['Plan a trip', 'Research a purchase', 'Organize a project', 'Prepare a presentation', 'Research a topic'],
  },
];

export default function UseCases() {
  const [tab, setTab] = useState(TABS[0].id);
  const [goal, setGoal] = useState(TABS[0].goals[0]);
  const base = useId();
  const current = TABS.find((t) => t.id === tab)!;

  const pickTab = (id: string) => {
    setTab(id);
    setGoal(TABS.find((t) => t.id === id)!.goals[0]);
  };

  return (
    <section id="use-cases" aria-labelledby="use-cases-title" className={SECTION}>
      <div className={WRAP}>
        <Reveal className="max-w-3xl">
          <h2 id="use-cases-title" className={H2}>
            What will you hand off first?
          </h2>
          <p className={BODY}>
            An AI workforce that works alongside people, for the work that takes many steps: research, planning, preparation
            and reports.
          </p>
        </Reveal>

        <div role="tablist" aria-label="Who it helps" className="mt-12 inline-flex rounded-full border border-line p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              id={`${base}-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`${base}-panel`}
              onClick={() => pickTab(t.id)}
              className={`h-10 rounded-full px-5 text-sm font-semibold transition-colors duration-200 ${
                tab === t.id ? 'bg-accent text-accent-ink' : 'text-ink-2 hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          id={`${base}-panel`}
          role="tabpanel"
          aria-labelledby={`${base}-${tab}`}
          className="mt-6 grid gap-5 lg:grid-cols-12"
        >
          <ul className="grid content-start gap-2 lg:col-span-4">
            {current.goals.map((g) => (
              <li key={g}>
                <button
                  onClick={() => setGoal(g)}
                  aria-pressed={goal === g}
                  className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left text-[17px] font-semibold tracking-tight transition-[border-color,background-color] duration-200 ${
                    goal === g ? 'border-accent bg-accent-soft' : 'border-line hover:border-line-strong'
                  }`}
                >
                  {g}
                  <ArrowRight size={17} aria-hidden="true" className={goal === g ? 'text-accent-text' : 'text-ink-3'} />
                </button>
              </li>
            ))}
          </ul>

          <div className="lg:col-span-8">
            <Flow goal={goal} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Flow({ goal }: { goal: string }) {
  const reduce = useReducedMotion();
  const scenario = route(goal);
  const agents = [...new Set(scenario.tasks.map((t) => t.agentKey))].map((k) => agentByKey(k)!);
  const tools = scenario.tools.map((id) => integrationById(id)!).filter(Boolean);

  return (
    <AnimatePresence mode="wait">
      <m.article
        key={goal}
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, y: -6 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="aw-card rounded-[28px] p-6 sm:p-8"
      >
        <ol className="grid gap-6 sm:grid-cols-2">
          <Part label="Goal">
            <p className="text-lg font-semibold tracking-tight">“{goal}”</p>
          </Part>
          <Part label="Agents">
            <ul className="flex flex-wrap gap-2">
              <li className="flex items-center gap-2 rounded-full border border-line py-1 pr-3 pl-1 text-sm">
                <Avatar agent={ORCHESTRATOR} size={24} />
                Orchestrator
              </li>
              {agents.map((a) => (
                <li key={a.key} className="flex items-center gap-2 rounded-full border border-line py-1 pr-3 pl-1 text-sm">
                  <Avatar agent={a} size={24} />
                  {a.name}
                </li>
              ))}
            </ul>
          </Part>
          <Part label="Tools">
            {tools.length === 0 ? (
              <p className="text-[15px] text-ink-2">None needed.</p>
            ) : (
              <ul className="flex flex-wrap gap-2">
                {tools.map((t) => (
                  <li key={t.id} className="flex items-center gap-2 rounded-full border border-line py-1 pr-3 pl-1 text-sm">
                    <Lettermark name={t.name} size={24} />
                    {t.name}
                    {t.status === 'planned' && <span className="text-[12px] text-ink-3">Soon</span>}
                  </li>
                ))}
              </ul>
            )}
          </Part>
          <Part label="Result">
            <p className="text-[15px] leading-relaxed text-ink-2">{scenario.outcome}</p>
          </Part>
        </ol>

        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-line pt-6">
          <button
            onClick={() => tryGoal(goal)}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink transition-[background-color,transform] duration-200 hover:bg-accent-press active:scale-[0.98]"
          >
            Try this goal
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
          <p className="text-sm text-ink-3">Opens it in the product at the top of the page.</p>
        </div>
      </m.article>
    </AnimatePresence>
  );
}

function Part({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li>
      <p className="mb-2.5 text-[13px] font-semibold text-ink-3">{label}</p>
      {children}
    </li>
  );
}
