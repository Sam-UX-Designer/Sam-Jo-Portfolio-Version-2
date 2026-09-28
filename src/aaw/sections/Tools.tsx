import { useState } from 'react';
import { AGENTS, isAutonomous, TOOLS } from '../data/agents';
import { INTEGRATIONS, type Integration } from '../data/integrations';
import Avatar, { ToolLogo } from '../components/Avatar';
import { Reveal } from '../components/Motion';
import { BODY, H2, SECTION, WRAP } from '../components/type';

/**
 * The integration catalogue, read straight from the app's list. Pick one to
 * see what it lets agents do and which agents use it: one tool, many agents.
 * Only the three that complete a real sign-in today are called available.
 */
export default function Tools() {
  const [selected, setSelected] = useState<Integration>(INTEGRATIONS[0]);
  const available = INTEGRATIONS.filter((i) => i.status === 'available').length;

  return (
    <section id="tools" aria-labelledby="tools-title" className={`${SECTION} border-y border-line bg-bg-2`}>
      <div className={WRAP}>
        <Reveal className="max-w-3xl">
          <h2 id="tools-title" className={H2}>
            Your AI workforce works where your work already lives.
          </h2>
          <p className={BODY}>
            Connect the tools your team already uses and give agents the capabilities they need to complete real work.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div role="listbox" aria-label="Tools" className="grid grid-cols-3 gap-2.5 sm:grid-cols-5">
              {INTEGRATIONS.map((tool) => {
                const on = tool.id === selected.id;
                return (
                  <button
                    key={tool.id}
                    role="option"
                    aria-selected={on}
                    onClick={() => setSelected(tool)}
                    className={`flex flex-col items-center gap-2.5 rounded-2xl border px-2 pt-4 pb-3 text-center transition-[border-color,background-color] duration-200 ${
                      on ? 'border-accent bg-accent-soft' : 'border-line bg-surface hover:border-line-strong'
                    }`}
                  >
                    <ToolLogo id={tool.id} name={tool.name} size={44} />
                    <span className="text-[13px] leading-tight font-medium">{tool.name}</span>
                    <span className={`text-[11px] font-semibold ${tool.status === 'available' ? 'text-ok' : 'text-ink-3'}`}>
                      {tool.status === 'available' ? 'Available' : 'Soon'}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-3">
              {available} of {INTEGRATIONS.length} connect today. The rest are listed in the app and marked Soon until their
              sign-in is built.
            </p>
          </div>

          <div className="lg:col-span-5">
            <ToolDetail tool={selected} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolDetail({ tool }: { tool: Integration }) {
  const capabilities = Object.values(TOOLS).filter((t) => t.integration === tool.id);
  const users = AGENTS.filter((a) => a.toolIds.some((id) => TOOLS[id]?.integration === tool.id));

  return (
    <article aria-live="polite" className="aw-card rounded-[28px] p-6 sm:p-7 lg:sticky lg:top-24">
      <div className="flex items-center gap-3.5">
        <ToolLogo id={tool.id} name={tool.name} size={52} />
        <div>
          <h3 className="text-xl font-semibold tracking-tight">{tool.name}</h3>
          <p className="text-sm text-ink-3">
            {tool.category} · {tool.status === 'available' ? 'Available now' : 'Coming soon'}
          </p>
        </div>
      </div>
      <p className="mt-4 text-[15px] text-ink-2">{tool.description}</p>

      <h4 className="mt-7 text-[13px] font-semibold text-ink-3">Tools are capabilities, not agents</h4>
      {capabilities.length > 0 ? (
        <ul className="mt-3 grid gap-2">
          {capabilities.map((c) => (
            <li key={c.id} className="flex items-center justify-between gap-3 text-[15px]">
              <span>{c.label}</span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[12px] font-medium ${
                  isAutonomous(c.effect) ? 'bg-surface-2 text-ink-3' : 'bg-warn/15 text-warn'
                }`}
              >
                {isAutonomous(c.effect) ? 'Automatic' : 'Asks you'}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
          Its capabilities are added when the connection is built. Until then no agent can reach it, and the app never shows
          it as connected.
        </p>
      )}

      {users.length > 0 && (
        <>
          <h4 className="mt-7 text-[13px] font-semibold text-ink-3">
            One tool, {users.length} agents
          </h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {users.map((a) => (
              <li key={a.key} className="flex items-center gap-2 rounded-full border border-line py-1 pr-3 pl-1 text-sm">
                <Avatar agent={a} size={24} />
                {a.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}
