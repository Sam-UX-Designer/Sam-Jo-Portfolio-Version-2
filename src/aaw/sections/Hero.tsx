import { ArrowRight } from 'lucide-react';
import Experience from '../experience/Experience';
import { tryGoal } from '../experience/bus';

/**
 * The actual product is the hero.
 *
 * One short band says what it is; everything under it is the live AI Agents
 * World Home screen, filling the rest of the first screen. The first thing a
 * visitor can do on this site is give the workforce a goal.
 */
export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="flex min-h-[720px] flex-col pt-16 md:h-[100dvh] md:min-h-[680px]"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 pt-6 pb-4 sm:px-6 md:pt-7 lg:px-8">
        <p className="aw-rise text-[12px] font-semibold tracking-[0.2em] text-accent-text uppercase">The AI Workforce</p>
        <h1
          id="hero-title"
          className="aw-rise mt-2.5 text-[clamp(1.9rem,3.1vw,3.1rem)] leading-[1.05] font-semibold tracking-[-0.035em]"
          style={{ animationDelay: '80ms' }}
        >
          Give AI a goal. Let a workforce do the work.
        </h1>

        <div className="mt-3.5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="aw-rise" style={{ animationDelay: '160ms' }}>
            <p className="max-w-[62ch] text-[15px] leading-relaxed text-ink-2 sm:text-base xl:max-w-none">
              AI Agents World turns one high-level goal into coordinated work across specialized AI agents and the tools
              your team already uses.
            </p>
            <p className="mt-1.5 text-[13px] text-ink-3">Try your first task free. No signup required.</p>
          </div>

          <div className="aw-rise flex shrink-0 flex-wrap gap-2.5" style={{ animationDelay: '240ms' }}>
            <button
              onClick={() => tryGoal()}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-[15px] font-semibold text-accent-ink transition-[background-color,transform] duration-200 hover:bg-accent-press active:scale-[0.98]"
            >
              Try it free
              <ArrowRight size={17} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <a
              href="#how-it-works"
              className="inline-flex h-12 items-center rounded-full border border-line-strong px-6 text-[15px] font-semibold text-ink transition-colors duration-200 hover:bg-accent-soft"
            >
              See how it works
            </a>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 px-2 pb-2 sm:px-3 sm:pb-3">
        <Experience className="aw-frame h-[max(540px,calc(100dvh-120px))] w-full flex-1 rounded-[18px] sm:rounded-[26px] md:h-auto md:min-h-[480px]" />
      </div>
    </section>
  );
}
