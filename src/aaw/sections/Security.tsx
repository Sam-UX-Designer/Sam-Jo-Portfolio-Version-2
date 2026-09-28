import { Eye, Hand, History, KeyRound, ListChecks, ShieldCheck } from 'lucide-react';
import Crop from '../components/Crop';
import { Reveal } from '../components/Motion';
import { EYEBROW, H2, SECTION, WRAP } from '../components/type';

/**
 * Only what the app actually does, each point traceable to its code:
 * permissions (domain/permissions.ts), approvals (runtime/approvals.ts),
 * connections and encrypted tokens (tools/connections.ts, db/crypto.ts),
 * History, the event stream the island renders, and the tool-call record.
 * The picture is a part of the island no other section shows.
 * No certifications or compliance claims: the app has none to show.
 */
/** Tools from the app's catalogue, with the rule each one follows. */
const PERMISSION_EXAMPLES = [
  { tool: 'Search mail', rule: 'Automatic', tone: 'bg-surface-2 text-ink-3' },
  { tool: 'Draft a reply', rule: 'Automatic', tone: 'bg-surface-2 text-ink-3' },
  { tool: 'Post to Slack', rule: 'Asks you', tone: 'bg-warn/15 text-warn' },
  { tool: 'Delete an event', rule: 'Always asks', tone: 'bg-warn/15 text-warn' },
];

export default function Security() {
  return (
    <section id="security" aria-labelledby="security-title" className={`${SECTION} border-t border-line bg-bg-2`}>
      <div className={WRAP}>
        <Reveal className="max-w-3xl">
          <p className={EYEBROW}>Trust and security</p>
          <h2 id="security-title" className={`${H2} mt-4`}>
            AI you can see, control, and trust.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          <Cell
            className="md:col-span-4"
            icon={ShieldCheck}
            title="Permissions"
            extra={
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Examples from the app">
                {PERMISSION_EXAMPLES.map((t) => (
                  <li key={t.tool} className="flex items-center gap-2 rounded-full border border-line py-1.5 pr-1.5 pl-3.5 text-sm">
                    {t.tool}
                    <span className={`rounded-full px-2.5 py-0.5 text-[12px] font-medium ${t.tone}`}>{t.rule}</span>
                  </li>
                ))}
              </ul>
            }
          >
            Every tool is marked by what it does. Reading, analysing and drafting run on their own; sending, posting and
            changing a connected system ask first. New workspaces start on “always ask”.
          </Cell>

          <Reveal className="relative overflow-hidden rounded-[24px] border border-line md:col-span-2 md:row-span-2">
            <Crop at={[0.74, 0.78]} zoom={2.8} box={3 / 4} fill className="h-full min-h-[260px] w-full" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 pt-16 text-white">
              <p className="flex items-center gap-2 font-semibold">
                <Eye size={17} aria-hidden="true" />
                Activity visibility
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-white/80">
                The island only moves when real work happens. No animation for its own sake.
              </p>
            </div>
          </Reveal>

          <Cell className="md:col-span-2" icon={Hand} title="Approval checkpoints">
            Consequential actions stop and wait. Moving money and deleting data ask every time, with no way to waive it.
          </Cell>
          <Cell className="md:col-span-2" icon={KeyRound} title="Connected-tool controls">
            You choose what to connect. Sign-ins are stored encrypted, and a tool is never shown as connected without a real
            one behind it.
          </Cell>

          <Cell className="md:col-span-3" icon={History} title="Execution history">
            Every goal is kept: what you asked, the plan, the agents, the tools they used, how long it took and the result.
          </Cell>
          <Reveal className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#1f6fd8] via-[#1a6cc9] to-[#0b8fb3] p-6 text-white sm:p-7 md:col-span-3">
            <p className="flex items-center gap-2 font-semibold">
              <ListChecks size={17} aria-hidden="true" />
              Auditability
            </p>
            <p className="mt-2 max-w-[44ch] text-[15px] leading-relaxed text-white/85">
              Each tool call is recorded with the agent, what it did and whether it succeeded, described in plain words
              rather than raw data.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Cell({
  icon: Icon,
  title,
  className = '',
  extra,
  children,
}: {
  icon: typeof ShieldCheck;
  title: string;
  className?: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Reveal className={`aw-card rounded-[24px] p-6 sm:p-7 ${className}`}>
      <p className="flex items-center gap-2.5 font-semibold">
        <span className="grid size-8 place-items-center rounded-full bg-accent-soft text-accent-text">
          <Icon size={16} aria-hidden="true" />
        </span>
        {title}
      </p>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{children}</p>
      {extra}
    </Reveal>
  );
}
