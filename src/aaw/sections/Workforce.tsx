import { DEPARTMENTS, integrationsOf, ORCHESTRATOR, type Agent } from '../data/agents';
import { integrationById } from '../data/integrations';
import Avatar from '../components/Avatar';
import Crop from '../components/Crop';
import { Reveal } from '../components/Motion';
import { BODY, H2, SECTION, WRAP } from '../components/type';

/**
 * The agents in the app today, each shown where it works on the island: the
 * picture on every card is a close crop of the supplied render at that
 * agent's own station. Rendered from the roster, so a new agent adds a card.
 */
export default function Workforce() {
  return (
    <section id="workforce" aria-labelledby="workforce-title" className={SECTION}>
      <div className={WRAP}>
        <Reveal className="max-w-3xl">
          <h2 id="workforce-title" className={H2}>
            A workforce that adapts to the work.
          </h2>
          <p className={BODY}>
            Different goals need different expertise. AI Agents World brings the right agents into the workflow instead of
            forcing every task into the same assistant.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal as="li" className="sm:col-span-2 lg:row-span-2">
            <HubCard />
          </Reveal>
          {DEPARTMENTS.map((agent, i) => (
            <Reveal as="li" key={agent.key} delay={(i % 4) * 0.05}>
              <AgentCard agent={agent} />
            </Reveal>
          ))}
        </ul>

        <p className="mt-6 max-w-[64ch] text-sm leading-relaxed text-ink-3">
          These are the agents in the app today, and they are examples rather than a fixed list. Each agent is a role with
          judgement; tools are what it reaches for.
        </p>
      </div>
    </section>
  );
}

function HubCard() {
  return (
    <article className="aw-card relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-[28px]">
      <Crop at={ORCHESTRATOR.station} zoom={2.2} box={1.5} fill className="min-h-[240px] w-full flex-1" />
      <div className="flex flex-col p-6 sm:p-7">
        <div className="flex items-center gap-3">
          <Avatar agent={ORCHESTRATOR} size={44} />
          <div>
            <h3 className="text-xl font-semibold tracking-tight">{ORCHESTRATOR.name}</h3>
            <p className="text-sm text-ink-3">At the hub, in the middle of the island</p>
          </div>
        </div>
        <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-ink-2">{ORCHESTRATOR.expertise}</p>
      </div>
    </article>
  );
}

function AgentCard({ agent }: { agent: Agent }) {
  const tools = integrationsOf(agent)
    .map((id) => integrationById(id)?.name)
    .filter(Boolean)
    .join(', ');

  return (
    <article className="aw-card group flex h-full flex-col overflow-hidden rounded-[24px]">
      <div className="overflow-hidden">
        <Crop
          at={agent.station}
          zoom={4.2}
          box={16 / 9}
          className="w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2.5">
          <Avatar agent={agent} size={32} />
          <h3 className="font-semibold tracking-tight">{agent.name}</h3>
        </div>
        <p className="mt-2.5 text-sm leading-relaxed text-ink-2">{agent.role}</p>
        <p className="mt-auto pt-3 text-[13px] text-ink-3">Uses {tools}</p>
      </div>
    </article>
  );
}
