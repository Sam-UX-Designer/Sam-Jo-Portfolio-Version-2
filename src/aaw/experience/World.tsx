import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { ASSETS } from '../config';
import { AGENTS, ISLAND_ART, MASCOT_KEYS, mascotSrc, type Agent } from '../data/agents';
import { SUGGESTIONS } from '../data/scenarios';
import { CARD_ABOVE, pointOn, useCoverRect, type CoverRect } from './coverRect';
import { ACTIVE_STATES, useWorld, world } from './store';
import { runPreview } from './engine';
import { freeTaskSpent, markFreeTaskUsed, setEngaged, useEngaged } from './bus';
import VoiceInput from './VoiceInput';

/**
 * The Agent World, ported from the app (apps/web/components/world/World.tsx).
 *
 * The same island, the same stations at the same measured positions, the same
 * robots lifting out of the artwork, the same orb and dispatch bolts. Nothing
 * here moves on a timer of its own: every animation is a view of an event in
 * the store, exactly as in the app.
 */

const ISLAND = ASSETS.island;
const ISLAND_ASPECT = ISLAND_ART.width / ISLAND_ART.height;
const HUB_STATION: [number, number] = [0.502, 0.332];
const ROUTE_MS = 1400;

/** The band of the artwork the stations occupy, top and bottom. */
const BAND = {
  top: Math.min(...AGENTS.map((a) => a.station[1])),
  bottom: Math.max(...AGENTS.map((a) => a.station[1])),
};

export function World({
  stage,
  clear,
}: {
  stage: RefObject<HTMLElement | null>;
  /** The hero text over the island, which the stations should sit below. */
  clear?: RefObject<HTMLElement | null>;
}) {
  const rect = useCoverRect(stage, ISLAND_ASPECT, BAND, clear);
  const { scroller, scroll, pannable, onScroll } = useIslandPan(rect);

  const goalId = useWorld((s) => s.goalId);
  const goalState = useWorld((s) => s.goalState);
  const running = goalId !== null && goalState !== 'completed' && goalState !== 'failed';

  const panned = { ...rect, left: -scroll.left, top: -scroll.top };

  return (
    <>
      <div
        className="world world--live"
        ref={scroller}
        onScroll={onScroll}
        data-pannable={pannable ? 'true' : undefined}
        aria-hidden="true"
      >
        <div className="world__pan" style={rect.width ? { width: rect.width, height: rect.height } : undefined}>
          <picture>
            <img className="world__art" src={ISLAND} alt="" fetchPriority="high" decoding="async" />
          </picture>
          <Robots rect={rect} />
          <Orb rect={{ ...rect, left: 0, top: 0 }} running={running} />
        </div>
      </div>

      <div className="world__veil" />

      <Routes rect={panned} />
      <Markers rect={panned} />
    </>
  );
}

/**
 * Pan the island with the browser's own scrolling, as the app does, but only
 * sideways. The app fills the window; here it sits in a page, and a vertical
 * swipe or wheel over it has to scroll the page (see .aw-stage in aaw.css).
 */
function useIslandPan(rect: CoverRect) {
  const scroller = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState({ left: 0, top: 0 });
  const pannable = rect.left < -1;

  useEffect(() => {
    const el = scroller.current;
    if (!el || rect.width === 0) return;
    // Rest where the cover maths placed it: centred sideways, and vertically
    // wherever keeps the stations clear of the hero text.
    const left = Math.max(0, -rect.left);
    const top = Math.max(0, -rect.top);
    el.scrollLeft = left;
    el.scrollTop = top;
    setScroll({ left, top });
  }, [rect.width, rect.height, rect.left, rect.top]);

  const onScroll = useCallback(() => {
    const el = scroller.current;
    if (el) setScroll({ left: el.scrollLeft, top: el.scrollTop });
  }, []);

  return { scroller, scroll, pannable, onScroll };
}

/**
 * The robots, moving while their agent works: a box filled with the same
 * pixels as the artwork under it, scaled up from the feet.
 */
function Robots({ rect }: { rect: CoverRect }) {
  const agentStates = useWorld((s) => s.agents);
  if (rect.width === 0) return null;
  const scale = rect.width / ISLAND_ART.width;

  return (
    <>
      {AGENTS.map((agent) => {
        if (!agent.robot) return null;
        const [x, y, w, h] = agent.robot;
        const left = Math.round(x * scale);
        const top = Math.round(y * scale);
        return (
          <span
            key={agent.key}
            className="robot"
            data-state={agentStates[agent.key]?.state ?? 'idle'}
            aria-hidden="true"
            style={{
              left,
              top,
              width: Math.round((x + w) * scale) - left,
              height: Math.round((y + h) * scale) - top,
              backgroundImage: `url(${ISLAND})`,
              backgroundSize: `${rect.width}px ${rect.height}px`,
              backgroundPosition: `${-left}px ${-top}px`,
            }}
          />
        );
      })}
    </>
  );
}

/** A bolt of lightning from the hub to a station, seeded so it never flickers. */
function boltPath(from: { left: number; top: number }, to: { left: number; top: number }, seed: number) {
  const dx = to.left - from.left;
  const dy = to.top - from.top;
  const span = Math.hypot(dx, dy) || 1;
  const nx = -dy / span;
  const ny = dx / span;
  const SEGMENTS = 7;
  const amplitude = Math.min(16, Math.max(6, span * 0.045));

  const points = [from];
  for (let i = 1; i < SEGMENTS; i++) {
    const t = i / SEGMENTS;
    const taper = Math.sin(t * Math.PI);
    const wobble = Math.sin(seed * 12.9898 + i * 78.233) % 1;
    const off = wobble * amplitude * taper;
    points.push({ left: from.left + dx * t + nx * off, top: from.top + dy * t + ny * off });
  }
  points.push(to);

  let length = 0;
  for (let i = 1; i < points.length; i++) {
    length += Math.hypot(points[i].left - points[i - 1].left, points[i].top - points[i - 1].top);
  }
  const d = points.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.left.toFixed(1)} ${pt.top.toFixed(1)}`).join(' ');
  return { d, length };
}

/** The dispatch: light leaving the hub for each agent that was given work. */
function Routes({ rect }: { rect: CoverRect }) {
  const routes = useWorld((s) => s.routes);
  const agentStates = useWorld((s) => s.agents);
  const goalId = useWorld((s) => s.goalId);
  const goalState = useWorld((s) => s.goalState);

  useEffect(() => {
    if (routes.length === 0) return;
    const timers = routes.map((r) => window.setTimeout(() => world.clearRoute(r.id), ROUTE_MS));
    return () => timers.forEach(clearTimeout);
  }, [routes]);

  if (rect.width === 0) return null;
  const hub = pointOn(rect, HUB_STATION);
  const orchestrator = agentStates.orchestrator;
  const alive = goalId !== null && goalState !== 'completed' && goalState !== 'failed';
  const thinking = alive && ACTIVE_STATES.includes(orchestrator?.state ?? 'planning');

  return (
    <div className="routes" aria-hidden="true">
      {(alive || routes.length > 0) && (
        <span className="routes__core" style={{ left: hub.left, top: hub.top }}>
          <span className="routes__hub" data-thinking={thinking} />
        </span>
      )}

      <svg className="routes__svg">
        {AGENTS.map((agent) => {
          const state = agentStates[agent.key]?.state;
          if (agent.key === 'orchestrator' || !state || !ACTIVE_STATES.includes(state)) return null;
          const to = pointOn(rect, agent.station);
          return (
            <line
              key={`live-${agent.key}`}
              className="routes__live"
              x1={hub.left}
              y1={hub.top}
              x2={to.left}
              y2={to.top}
              stroke={agent.accent}
            />
          );
        })}

        {routes.map((route) => {
          const agent = AGENTS.find((a) => a.key === route.agentKey);
          if (!agent) return null;
          const to = pointOn(rect, agent.station);
          const bolt = boltPath(hub, to, route.id);
          return (
            <g key={route.id} style={{ ['--len' as string]: `${bolt.length}px` }}>
              <path className="routes__bolt routes__bolt--haze" d={bolt.d} />
              <path className="routes__bolt" d={bolt.d} />
              <path className="routes__bolt routes__bolt--core" d={bolt.d} />
              <circle className="routes__strike" cx={to.left} cy={to.top} r={6} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function Markers({ rect }: { rect: CoverRect }) {
  const agentStates = useWorld((s) => s.agents);
  const selected = useWorld((s) => s.selectedAgent);
  const idle = useWorld((s) => s.goalId === null);
  const engaged = useEngaged();
  if (rect.width === 0) return null;
  // While the hero text is showing, a card it would cover steps back.
  const textShown = rect.clearTop > 0 && idle && !engaged;

  return (
    <div className="markers">
      {AGENTS.map((agent) => {
        const view = agentStates[agent.key];
        const { left, top } = pointOn(rect, agent.station);
        const state = view?.state ?? 'idle';
        const busy = ACTIVE_STATES.includes(state);
        const fx = agent.station[0];
        const side = fx > 0.84 ? 'left' : fx < 0.14 ? 'right' : 'center';

        return (
          <div
            key={agent.key}
            className="station"
            data-agent={agent.key}
            data-side={side}
            data-covered={textShown && top - CARD_ABOVE < rect.clearTop ? 'true' : undefined}
            style={{ left, top }}
          >
            <span className="station__glow" data-state={state} aria-hidden="true" />
            {busy && (
              <>
                <span className="station__ping" aria-hidden="true" />
                <span className="station__ping station__ping--late" aria-hidden="true" />
              </>
            )}
            <button
              className="marker"
              data-state={state}
              data-primary={agent.key === 'orchestrator'}
              aria-pressed={selected === agent.key}
              onClick={() => world.selectAgent(selected === agent.key ? null : agent.key)}
            >
              <MascotIcon agent={agent} />
              <span className="marker__label">
                <strong>{agent.name}</strong>
                <em>{view?.activity ?? 'Ready'}</em>
              </span>
              {busy && <span className="marker__pulse" aria-hidden="true" />}
            </button>
          </div>
        );
      })}
    </div>
  );
}

/** The small picture on a station card. The agent's initial where there is none. */
function MascotIcon({ agent }: { agent: Agent }) {
  if (!MASCOT_KEYS.has(agent.key)) {
    return (
      <span className="marker__icon" style={{ ['--accent' as string]: agent.accent }}>
        {agent.name.charAt(0)}
      </span>
    );
  }
  return <img className="marker__icon marker__icon--img" src={mascotSrc(agent.key)} alt="" />;
}

/** An agent's picture, as the app draws it in lists and panels. */
export function AgentAvatar({
  agent,
  size = 38,
  radius,
  className = '',
}: {
  agent: Agent;
  size?: number;
  radius?: number;
  className?: string;
}) {
  const corner = radius ?? Math.round(size * 0.29);
  if (!MASCOT_KEYS.has(agent.key)) {
    return (
      <span
        className={`agentav agentav--fallback ${className}`}
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          borderRadius: corner,
          fontSize: Math.round(size * 0.42),
          background: `color-mix(in srgb, ${agent.accent} 42%, transparent)`,
          border: `1px solid color-mix(in srgb, ${agent.accent} 65%, transparent)`,
        }}
      >
        {agent.name.charAt(0)}
      </span>
    );
  }
  return (
    <img
      className={`agentav ${className}`}
      src={mascotSrc(agent.key)}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      style={{ width: size, height: size, borderRadius: corner }}
    />
  );
}

/** The orb at the hub, turning: the artwork's own sphere, lifted and rotated. */
const ORB = { cx: 0.5006, cy: 0.3337, r: 0.0245 } as const;

function Orb({ rect, running }: { rect: CoverRect; running: boolean }) {
  if (rect.width === 0) return null;
  const centre = pointOn(rect, [ORB.cx, ORB.cy]);
  const radius = ORB.r * rect.width;
  return (
    <span
      className="orb"
      data-running={running}
      aria-hidden="true"
      style={{
        left: centre.left - radius,
        top: centre.top - radius,
        width: radius * 2,
        height: radius * 2,
        backgroundImage: `url(${ISLAND})`,
        backgroundSize: `${rect.width}px ${rect.height}px`,
        backgroundPosition: `${radius - ORB.cx * rect.width}px ${radius - ORB.cy * rect.height}px`,
      }}
    />
  );
}

/** Only the agents genuinely working; an idle world shows no panel. */
export function ActiveAgents() {
  const agentStates = useWorld((s) => s.agents);
  const selected = useWorld((s) => s.selectedAgent);

  const active = AGENTS.map((agent) => ({ agent, view: agentStates[agent.key] })).filter(
    ({ view }) => view && ['planning', 'spawning', 'working', 'waiting', 'needs_input'].includes(view.state),
  );
  if (active.length === 0) return null;

  return (
    <aside className="agents glass" aria-label="Active agents">
      <header className="agents__head">
        <h2>Active Agents</h2>
        <p>
          <span className="agents__live" aria-hidden="true" />
          {active.length} working
        </p>
      </header>
      <ul className="agents__list">
        {active.map(({ agent, view }) => (
          <li key={agent.key}>
            <button
              className="agents__row"
              data-selected={selected === agent.key}
              onClick={() => world.selectAgent(selected === agent.key ? null : agent.key)}
            >
              <AgentAvatar agent={agent} size={26} radius={8} className="agents__icon" />
              <span className="agents__text">
                <strong>{agent.name}</strong>
                <em>{view?.activity}</em>
              </span>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
                <path d="m9.5 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** Progress on the goal in flight, in the visitor's own words. */
export function TaskInProgress({ onOpen }: { onOpen: () => void }) {
  const goalId = useWorld((s) => s.goalId);
  const goalPrompt = useWorld((s) => s.goalPrompt);
  const goalState = useWorld((s) => s.goalState);
  const tasks = useWorld((s) => s.tasks);
  if (!goalId) return null;

  const list = Object.values(tasks);
  const done = list.filter((t) => t.state === 'succeeded').length;
  const waiting = list.length === 0;
  const percent = list.length > 0 ? Math.round((done / list.length) * 100) : 0;
  const complete = goalState === 'completed';

  return (
    <button
      className="taskcard glass"
      data-state={complete ? 'done' : 'running'}
      onClick={onOpen}
      aria-label="Show what is running"
    >
      <span className="taskcard__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
          <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.7" />
          <path d="m8.5 12 2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="taskcard__body">
        <strong>{complete ? 'Task complete' : 'Task in progress'}</strong>
        {goalPrompt && <q className="taskcard__prompt">{goalPrompt}</q>}
        <em>{waiting ? 'Reading your goal…' : `${done} of ${list.length} tasks done`}</em>
        <span className="taskcard__bar" data-wait={waiting ? 'true' : undefined}>
          <span className="taskcard__fill" style={waiting ? undefined : { width: `${percent}%` }} />
        </span>
      </span>
      <span className="taskcard__pct">{waiting ? '—' : `${percent}%`}</span>
    </button>
  );
}

/**
 * The command bar: the one place a goal is stated.
 *
 * The first goal runs, free and without an account. Any goal after it raises
 * the sign-up gate, with what was typed still in the box.
 */
export function CommandBar({ onGate }: { onGate: () => void }) {
  const [prompt, setPrompt] = useState('');
  const [call, setCall] = useState(false);
  const input = useRef<HTMLTextAreaElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  const goalId = useWorld((s) => s.goalId);
  const goalState = useWorld((s) => s.goalState);
  const busy = goalId !== null && goalState !== 'completed' && goalState !== 'failed';

  // Focus or typing means the visitor has started: the hero text steps aside.
  useEffect(() => {
    setEngaged(focused || prompt.trim().length > 0);
  }, [focused, prompt]);
  useEffect(() => () => setEngaged(false), []);

  // "Try it free" and "Try this goal" from anywhere on the page land here.
  useEffect(() => {
    const onTry = (e: Event) => {
      const detail = (e as CustomEvent<{ prompt?: string }>).detail;
      if (detail?.prompt) setPrompt(detail.prompt);
      // Back to the product: the whole hero where it fits on screen,
      // otherwise the stage with the command bar at the bottom of the view.
      const hero = document.getElementById('top');
      const smooth = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      if (hero && hero.offsetHeight <= window.innerHeight + 1) window.scrollTo({ top: 0, behavior: smooth });
      else bar.current?.closest('.aw-stage')?.scrollIntoView({ behavior: smooth, block: 'end' });
      window.setTimeout(() => input.current?.focus({ preventScroll: true }), 350);
      setCall(true);
      window.setTimeout(() => setCall(false), 2300);
    };
    window.addEventListener('aaw:try', onTry);
    return () => window.removeEventListener('aaw:try', onTry);
  }, []);

  const submit = useCallback(() => {
    const trimmed = prompt.trim();
    if (!trimmed) return;
    if (freeTaskSpent()) {
      onGate();
      return;
    }
    markFreeTaskUsed();
    setPrompt('');
    runPreview(trimmed);
  }, [prompt, onGate]);

  const onTranscript = useCallback((text: string) => setPrompt(text), []);
  const onFinal = useCallback(() => input.current?.focus(), []);

  return (
    <div className="command glass" ref={bar} data-call={call ? 'true' : undefined}>
      <div className="command__row">
        <span className="command__spark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="19" height="19" fill="none">
            <path d="M12 3.5 13.8 9l5.5 1.8-5.5 1.8L12 18l-1.8-5.4L4.7 10.8 10.2 9 12 3.5Z" fill="currentColor" opacity=".9" />
          </svg>
        </span>
        <textarea
          ref={input}
          className="command__input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          rows={1}
          placeholder="Ask your AI workforce anything..."
          aria-label="Describe your goal"
        />
        <VoiceInput onTranscript={onTranscript} onFinal={onFinal} />
        <button className="command__send" onClick={submit} disabled={prompt.trim().length === 0} aria-label="Send">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
            <path
              d="M3.6 11.2 19.4 4.3a.8.8 0 0 1 1.06 1.05l-6.9 15.8a.8.8 0 0 1-1.5-.1l-1.6-5.6-5.6-1.6a.8.8 0 0 1-.1-1.5Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      <div className="command__pills">
        {SUGGESTIONS.map((s) => (
          <button key={s} className="pill" onClick={() => setPrompt(s)} disabled={busy}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
