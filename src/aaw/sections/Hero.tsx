import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Experience from '../experience/Experience';
import { tryGoal, useEngaged } from '../experience/bus';
import { useWorld } from '../experience/store';

/** The site's bar, which floats over the top of the hero. */
const NAV_H = 64;

/**
 * The actual product is the hero: the live AI Agents World Home screen,
 * full width and full height, with the promise written over the island.
 *
 * The island sits below the text (see coverRect). When the visitor starts,
 * by clicking into the command bar, typing or running a goal, the text steps
 * aside so nothing covers the work, and comes back when the island is idle.
 */
export default function Hero() {
  const copy = useRef<HTMLDivElement>(null);

  return (
    <section id="top" aria-labelledby="hero-title" className="relative h-[100dvh] min-h-[640px]">
      <Experience
        className="h-full w-full"
        topInset={NAV_H}
        clear={copy}
        overlay={<HeroCopy ref={copy} />}
      />
    </section>
  );
}

function HeroCopy({ ref }: { ref: React.Ref<HTMLDivElement> }) {
  const idle = useWorld((s) => s.goalId === null);
  const engaged = useEngaged();
  const away = !idle || engaged;

  return (
    <>
      <div className="aw-hero-scrim" data-away={away} aria-hidden="true" />
      <div ref={ref} className="aw-hero-copy text-center" data-away={away}>
        <p className="aw-rise text-[12px] font-semibold tracking-[0.2em] text-[#7fc0ff] uppercase [text-shadow:0_1px_12px_rgb(4_8_16/0.8)]">
          The AI Workforce
        </p>
        <h1
          id="hero-title"
          className="aw-rise mt-2 text-[clamp(1.75rem,calc((100vw-480px)/22),3rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-balance text-white [text-shadow:0_2px_24px_rgb(4_8_16/0.75)]"
          style={{ animationDelay: '80ms' }}
        >
          Give AI a goal. Let a workforce do the work.
        </h1>
        <p
          className="aw-rise mx-auto mt-2.5 max-w-[66ch] text-[14px] xl:max-w-none leading-relaxed text-white/85 [text-shadow:0_1px_14px_rgb(4_8_16/0.9)] sm:text-[15px]"
          style={{ animationDelay: '160ms' }}
        >
          AI Agents World turns one high-level goal into coordinated work across specialized AI agents and the tools your
          team already uses.
        </p>

        <div
          className="aw-rise mt-3.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
          style={{ animationDelay: '240ms' }}
        >
          <button
            onClick={() => tryGoal()}
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-[#3e9bff] px-5 text-[15px] font-semibold text-white shadow-[0_8px_24px_rgb(20_90_190/0.45)] transition-[background-color,transform] duration-200 hover:bg-[#2f86e8] active:scale-[0.98]"
          >
            Try it free
            <ArrowRight size={17} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
          <a
            href="#how-it-works"
            className="inline-flex h-11 items-center rounded-full border border-white/30 bg-white/10 px-5 text-[15px] font-semibold text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/20"
          >
            See how it works
          </a>
          <p className="w-full text-[13px] text-white/70 [text-shadow:0_1px_10px_rgb(4_8_16/0.9)] md:w-auto md:pl-1">
            Try your first task free. No signup required.
          </p>
        </div>
      </div>
    </>
  );
}
