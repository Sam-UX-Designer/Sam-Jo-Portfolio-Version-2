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
          background: `color-mix(in srgb, ${agent.accent} 70%, #111114)`,
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

/** Where a tool's logo is: a transparent 256px PNG named after its id. */
export const toolLogoSrc = (id: string) => `/assets/ai-agents-world/tools/${id}.png`;

/**
 * A tool's real logo on a white tile, so dark marks (GitHub, X, Notion) read
 * in both themes. The tile is the UI's; the logo file has no background.
 */
export function ToolLogo({
  id,
  name,
  size = 40,
  announce = false,
  className = '',
}: {
  id: string;
  name: string;
  size?: number;
  /** Give the logo its name for screen readers, where no visible name sits beside it. */
  announce?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`grid shrink-0 place-items-center border border-black/5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.12)] ${className}`}
      style={{ width: size, height: size, borderRadius: Math.round(size * 0.26) }}
    >
      <img
        src={toolLogoSrc(id)}
        alt={announce ? name : ''}
        width={Math.round(size * 0.66)}
        height={Math.round(size * 0.66)}
        loading="lazy"
        className="object-contain"
        style={{ width: Math.round(size * 0.66), height: Math.round(size * 0.66) }}
      />
    </span>
  );
}
