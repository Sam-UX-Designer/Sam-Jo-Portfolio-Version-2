import { MASCOT_KEYS, mascotSrc, type Agent } from '../data/agents';

/**
 * An agent's face on the marketing page: the app's own render, or its
 * initial on its own colour where the app has no render yet.
 */
export default function Avatar({ agent, size = 40, className = '' }: { agent: Agent; size?: number; className?: string }) {
  const radius = Math.round(size * 0.29);
  if (!MASCOT_KEYS.has(agent.key)) {
    return (
      <span
        aria-hidden="true"
        className={`grid shrink-0 place-items-center font-semibold text-white ${className}`}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          fontSize: Math.round(size * 0.42),
          background: `color-mix(in srgb, ${agent.accent} 70%, #0b1322)`,
        }}
      >
        {agent.name.charAt(0)}
      </span>
    );
  }
  return (
    <img
      src={mascotSrc(agent.key)}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      loading="lazy"
      className={`shrink-0 border border-line bg-surface-2 object-cover ${className}`}
      style={{ width: size, height: size, borderRadius: radius }}
    />
  );
}

/** The app's lettermark tile for a tool, until real logos are supplied. */
export function Lettermark({ name, size = 40, className = '' }: { name: string; size?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center border border-line-strong bg-surface-2 font-semibold text-ink ${className}`}
      style={{ width: size, height: size, borderRadius: Math.round(size * 0.26), fontSize: Math.round(size * 0.42) }}
    >
      {name.charAt(0)}
    </span>
  );
}
