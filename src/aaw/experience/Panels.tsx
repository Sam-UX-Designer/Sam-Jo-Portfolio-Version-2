import { useState } from 'react';
import { agentByKey, isAutonomous, TOOLS, type ToolEffect } from '../data/agents';
import { useWorld, world, type AgentState } from './store';
import { AgentAvatar } from './World';

/**
 * The answer, the task detail and the agent detail, ported from the app
 * (apps/web/components/ui/Answer.tsx, TaskDetail.tsx, AgentPanel.tsx) and
 * reading the same store. Anything that needs an account in the app (saving a
 * result, renaming an agent) raises the sign-up gate here too.
 */

/** The reply, under the command bar, where the goal was typed. */
export function Answer({ onGate }: { onGate: (reason: 'save' | 'rename') => void }) {
  const summary = useWorld((s) => s.summary);
  const goalPrompt = useWorld((s) => s.goalPrompt);
  const artifacts = useWorld((s) => s.artifacts);
  const [copied, setCopied] = useState(false);
  if (!summary) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard refused: the text is still on screen to select.
    }
  };

  return (
    <section className="answer glass" aria-live="polite" aria-label="Answer">
      <header className="answer__head">
        <span className="answer__mark" data-tone="good">
          ✓
        </span>
        <div className="answer__title">
          <strong>Answer</strong>
          {goalPrompt && <em>{goalPrompt}</em>}
        </div>
        <button className="answer__close" onClick={world.reset} aria-label="Clear this answer">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
            <path d="m6.5 6.5 11 11m0-11-11 11" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      <div className="answer__scroll">
        <p className="answer__text">{summary}</p>
        {artifacts.length > 0 && (
          <ul className="answer__files">
            {artifacts.map((artifact) => (
              <li key={artifact.artifactId}>
                <div className="answer__file">
                  <span>{artifact.title}</span>
                  <button onClick={() => onGate('save')}>Save</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer className="answer__foot">
        <button className="btn btn--ghost" onClick={copy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
        <button className="btn btn--primary" onClick={world.reset}>
          Ask something else
        </button>
      </footer>
    </section>
  );
}

const STATE_WORD: Record<string, string> = {
  pending: 'Queued',
  assigned: 'Starting',
  running: 'Working',
  succeeded: 'Done',
  failed: 'Failed',
  awaiting_approval: 'Needs you',
  cancelled: 'Cancelled',
};

/** Everything about the goal in flight: what was asked, the plan, the work. */
export function TaskDetail({ onClose }: { onClose: () => void }) {
  const goalPrompt = useWorld((s) => s.goalPrompt);
  const goalState = useWorld((s) => s.goalState);
  const interpretation = useWorld((s) => s.interpretation);
  const summary = useWorld((s) => s.summary);
  const tasks = useWorld((s) => s.tasks);
  const agentStates = useWorld((s) => s.agents);

  const list = Object.values(tasks);
  const name = (key: string) => agentByKey(key)?.name ?? key;
  const notes = list.filter((t) => t.note);

  return (
    <aside className="taskdetail lg" aria-label="Current task">
      <header className="taskdetail__head">
        <h2>{goalState === 'completed' ? 'Task complete' : 'Task in progress'}</h2>
        <button onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
            <path d="m6.5 6.5 11 11m0-11-11 11" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      <div className="taskdetail__body">
        <section>
          <h3 className="taskdetail__label">You asked</h3>
          <p className="taskdetail__prompt">{goalPrompt ?? '—'}</p>
        </section>

        {interpretation && (
          <section>
            <h3 className="taskdetail__label">The Orchestrator understood</h3>
            <p className="taskdetail__text">{interpretation}</p>
          </section>
        )}

        <section>
          <h3 className="taskdetail__label">
            {list.length > 0 ? `Assigned to ${list.length === 1 ? '1 agent' : `${list.length} tasks`}` : 'Assigning'}
          </h3>
          {list.length === 0 ? (
            <p className="taskdetail__text">The Orchestrator is still reading your goal and choosing who should take it.</p>
          ) : (
            <ul className="taskdetail__tasks">
              {list.map((task) => (
                <li key={task.id} data-state={task.state}>
                  <span className="taskdetail__who">
                    <strong>{name(task.agentKey)}</strong>
                    <em>{task.title}</em>
                  </span>
                  <span className="taskdetail__state">
                    {task.state === 'running' ? (agentStates[task.agentKey]?.activity ?? 'Working') : STATE_WORD[task.state] ?? task.state}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {notes.length > 0 && (
          <section>
            <h3 className="taskdetail__label">Latest activity</h3>
            <ul className="taskdetail__activity">
              {notes.slice(-4).reverse().map((task) => (
                <li key={task.id} data-outcome="succeeded">
                  <strong>{name(task.agentKey)}</strong>
                  <em>{task.note}</em>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h3 className="taskdetail__label">Result</h3>
          {summary ? (
            <p className="taskdetail__summary">{summary}</p>
          ) : (
            <p className="taskdetail__text">The answer appears here as soon as the agents are done.</p>
          )}
        </section>
      </div>
    </aside>
  );
}

const STATE_LABEL: Record<AgentState, string> = {
  idle: 'Idle',
  planning: 'Planning',
  spawning: 'Starting',
  working: 'Working',
  waiting: 'Waiting',
  needs_input: 'Needs you',
  completed: 'Finished',
  error: 'Could not finish',
};

const STATE_TONE: Record<AgentState, string> = {
  idle: 'var(--color-text-dim)',
  planning: 'var(--color-accent)',
  spawning: 'var(--color-accent)',
  working: 'var(--color-accent)',
  waiting: 'var(--color-text-dim)',
  needs_input: 'var(--color-warn)',
  completed: 'var(--color-ok)',
  error: 'var(--color-danger)',
};

const LABEL: React.CSSProperties = {
  margin: '0 0 8px',
  fontSize: 10.5,
  fontWeight: 700,
  letterSpacing: '0.09em',
  textTransform: 'uppercase',
  color: 'var(--color-text-dim)',
};
const DIM: React.CSSProperties = { margin: 0, fontSize: 12.5, color: 'var(--color-text-dim)' };

/** One agent: who it is, what it is doing, and what it can reach. */
export function AgentPanel({ onGate }: { onGate: (reason: 'save' | 'rename') => void }) {
  const selected = useWorld((s) => s.selectedAgent);
  const agentStates = useWorld((s) => s.agents);
  const tasks = useWorld((s) => s.tasks);
  const agent = selected ? agentByKey(selected) : undefined;
  if (!agent) return null;

  const view = agentStates[agent.key];
  const state = view?.state ?? 'idle';
  const task = view?.taskId ? tasks[view.taskId] : undefined;
  const tools = agent.toolIds.map((id) => TOOLS[id]).filter(Boolean);

  return (
    <aside className="glass" style={{ padding: 20 }} aria-label={`${agent.name} details`}>
      <header style={{ display: 'flex', alignItems: 'start', gap: 12, marginBottom: 16 }}>
        <AgentAvatar agent={agent} size={38} radius={11} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <button className="rename__name" onClick={() => onGate('rename')} title="Rename this agent">
            <span>{agent.name}</span>
          </button>
          <p style={{ margin: '2px 0 0', fontSize: 12.5, color: 'var(--color-text-dim)' }}>{agent.role}</p>
        </div>
        <button
          className="btn btn--ghost"
          style={{ padding: '5px 10px', fontSize: 12 }}
          onClick={() => world.selectAgent(null)}
          aria-label="Close agent details"
        >
          Close
        </button>
      </header>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: '50%', background: STATE_TONE[state] }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: STATE_TONE[state] }}>{STATE_LABEL[state]}</span>
      </div>

      <section style={{ marginBottom: 18 }}>
        <h3 style={LABEL}>Current task</h3>
        {task ? (
          <>
            <p style={{ margin: '0 0 4px', fontSize: 13.5, fontWeight: 550 }}>{task.title}</p>
            <p style={DIM}>{task.note ?? view?.activity}</p>
            <p style={{ margin: '10px 0 0', fontSize: 11.5, color: 'var(--color-text-dim)' }}>
              {task.completedSteps === 0 ? 'Starting…' : `${task.completedSteps} step${task.completedSteps === 1 ? '' : 's'} done`}
            </p>
          </>
        ) : (
          <p style={DIM}>{state === 'idle' ? 'Nothing assigned right now.' : view?.activity}</p>
        )}
      </section>

      <section style={{ marginBottom: 18 }}>
        <h3 style={LABEL}>Instructions</h3>
        <p style={{ margin: 0, fontSize: 12, lineHeight: 1.55, color: 'var(--color-text-dim)' }}>{agent.expertise}</p>
      </section>

      <section>
        <h3 style={LABEL}>{tools.length > 0 ? `Tools (${tools.length})` : 'Tools'}</h3>
        {tools.length === 0 ? (
          <p style={DIM}>None. It plans, delegates and writes the final answer.</p>
        ) : (
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
            {tools.map((tool) => (
              <li key={tool.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, fontSize: 12 }}>
                <span>{tool.label}</span>
                <EffectBadge effect={tool.effect} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </aside>
  );
}

/** Per tool, whether it can act alone. The trust story, made concrete. */
function EffectBadge({ effect }: { effect: ToolEffect }) {
  const auto = isAutonomous(effect);
  return (
    <span
      style={{
        fontSize: 10.5,
        padding: '2px 7px',
        borderRadius: 999,
        color: auto ? 'var(--color-text-dim)' : 'var(--color-warn)',
        background: auto
          ? 'color-mix(in srgb, var(--color-ink-600) 60%, transparent)'
          : 'color-mix(in srgb, var(--color-warn) 14%, transparent)',
      }}
    >
      {auto ? 'automatic' : 'asks you'}
    </span>
  );
}
