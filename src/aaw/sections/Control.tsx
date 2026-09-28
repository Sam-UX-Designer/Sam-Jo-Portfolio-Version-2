import { useState } from 'react';
import { Check, Hand, PenLine, Send } from 'lucide-react';
import { agentByKey } from '../data/agents';
import Avatar from '../components/Avatar';
import { Reveal } from '../components/Motion';
import { BODY, H2, SECTION, WRAP } from '../components/type';

/**
 * Human control, as the app implements it (packages/shared/src/domain/
 * permissions.ts). The rules table is the app's; the card in the middle is
 * the app's approval sheet (apps/web/components/ui/ApprovalSheet.tsx) with a
 * sample request, and its buttons work.
 */

const RULES = [
  { when: 'Reading, researching, analysing, summarising', behaviour: 'Runs on its own. Never asks.' },
  { when: 'Drafting something you have not sent', behaviour: 'Runs on its own. A draft has not left your workspace.' },
  { when: 'Sending, posting, or changing a connected system', behaviour: 'Asks first, unless you chose “don’t ask again” for that action.' },
  { when: 'Moving money, or deleting data', behaviour: 'Always asks. No setting waives this.' },
];

const EXAMPLES = ['Send', 'Publish', 'Pay', 'Delete', 'Approve'];

const PREVIEW = `#marketing

Launch brief is ready for review. Positioning, creative direction and the four-week timeline are in the doc. Comments by Thursday, please.`;

type Decision = 'pending' | 'approved' | 'rejected';

export default function Control() {
  const [decision, setDecision] = useState<Decision>('pending');
  const [remember, setRemember] = useState(false);
  const marketing = agentByKey('marketing')!;

  return (
    <section id="control" aria-labelledby="control-title" className={`${SECTION} border-y border-line bg-bg-2`}>
      <div className={WRAP}>
        <Reveal className="max-w-3xl">
          <h2 id="control-title" className={H2}>
            Autonomous where it helps. Human when it matters.
          </h2>
          <p className={BODY}>
            Research and analysis can move automatically. Consequential actions can pause for your approval.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-4 lg:grid-cols-[1fr_1.35fr_1fr]">
          <Stage icon={PenLine} title="AI prepares" state="done">
            <div className="flex items-center gap-3">
              <Avatar agent={marketing} size={36} />
              <div>
                <p className="font-semibold">Marketing Agent</p>
                <p className="text-sm text-ink-3">Drafted the Slack post</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-2">
              Drafting runs on its own. Nothing has left your workspace yet.
            </p>
          </Stage>

          {/* The app's approval sheet, in the app's own material. */}
          <div className="aw-ui">
            <div className="glass" style={{ padding: 22 }} role="group" aria-labelledby="approval-title">
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
                <span
                  aria-hidden="true"
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: '50%',
                    background: decision === 'approved' ? 'var(--color-ok)' : 'var(--color-warn)',
                  }}
                />
                <span
                  style={{
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: '0.09em',
                    textTransform: 'uppercase',
                    color: decision === 'approved' ? 'var(--color-ok)' : 'var(--color-warn)',
                  }}
                >
                  {decision === 'pending' ? 'Needs your approval' : decision === 'approved' ? 'Approved' : 'Declined'}
                </span>
              </div>
              <h3 id="approval-title" style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 650 }}>
                Post the launch brief to #marketing
              </h3>
              <p style={{ margin: '0 0 16px', fontSize: 12.5, color: 'var(--color-text-dim)' }} aria-live="polite">
                {decision === 'pending'
                  ? 'Nothing has been sent. This will only happen if you approve it.'
                  : decision === 'approved'
                    ? 'Posted. The Marketing Agent carries on with the rest of the goal.'
                    : 'Nothing was sent. The agent will not ask about this post again.'}
              </p>
              <pre
                style={{
                  margin: '0 0 18px',
                  padding: 14,
                  borderRadius: 12,
                  fontSize: 12.5,
                  lineHeight: 1.55,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  background: 'color-mix(in srgb, var(--color-ink-900) 70%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--color-accent) 14%, transparent)',
                  color: 'var(--color-text)',
                }}
              >
                {PREVIEW}
              </pre>

              {decision === 'pending' ? (
                <>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 9,
                      marginBottom: 16,
                      fontSize: 12.5,
                      color: 'var(--color-text-dim)',
                      cursor: 'pointer',
                    }}
                  >
                    <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                    Don&apos;t ask again for slack post message
                  </label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button className="btn btn--ghost" style={{ flex: 1 }} onClick={() => setDecision('rejected')}>
                      Don&apos;t do it
                    </button>
                    <button className="btn btn--primary" style={{ flex: 1 }} onClick={() => setDecision('approved')}>
                      Approve
                    </button>
                  </div>
                </>
              ) : (
                <button className="btn btn--ghost" style={{ width: '100%' }} onClick={() => setDecision('pending')}>
                  Show the request again
                </button>
              )}
            </div>
          </div>

          <Stage icon={decision === 'rejected' ? Hand : Send} title="Action happens" state={decision === 'approved' ? 'done' : 'waiting'}>
            <p className="text-sm leading-relaxed text-ink-2" aria-live="polite">
              {decision === 'approved'
                ? 'The post goes to #marketing, and the run is recorded in History.'
                : decision === 'rejected'
                  ? 'Declined. A decision to decline is as final as an approval.'
                  : 'Waits for you. Until you decide, nothing leaves your workspace.'}
            </p>
          </Stage>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h3 className="text-xl font-semibold tracking-tight">Consequential actions ask first</h3>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Examples">
              {EXAMPLES.map((e) => (
                <li key={e} className="rounded-full border border-line-strong px-4 py-1.5 text-sm font-medium">
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:col-span-8">
            {RULES.map((r) => (
              <div key={r.when}>
                <dt className="font-semibold">{r.when}</dt>
                <dd className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{r.behaviour}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Stage({
  icon: Icon,
  title,
  state,
  children,
}: {
  icon: typeof Check;
  title: string;
  state: 'done' | 'waiting';
  children: React.ReactNode;
}) {
  return (
    <div className={`aw-card rounded-[24px] p-6 transition-opacity duration-500 ${state === 'waiting' ? 'opacity-70' : ''}`}>
      <p className="mb-4 flex items-center gap-2.5 text-[13px] font-semibold text-ink-3">
        <span className={`grid size-7 place-items-center rounded-full ${state === 'done' ? 'bg-ok/15 text-ok' : 'bg-surface-2 text-ink-3'}`}>
          <Icon size={14} aria-hidden="true" />
        </span>
        {title}
      </p>
      {children}
    </div>
  );
}
