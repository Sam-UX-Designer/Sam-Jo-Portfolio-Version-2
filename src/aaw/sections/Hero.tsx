import { ArrowRight, ChevronLeft, ChevronRight, Lock, RotateCw } from 'lucide-react';
import { ASSETS, LINKS } from '../config';
import Experience from '../experience/Experience';
import { tryGoal } from '../experience/bus';
import { cancelPreview } from '../experience/engine';
import { world } from '../experience/store';

/**
 * The promise, then the product.
 *
 * A large centred headline and the two actions, and under them the live AI
 * Agents World Home screen in a browser window: no device, just the browser
 * and the app in it. The window is the real product, not a picture of it, so
 * the first thing a visitor can do is give the workforce a goal.
 */
export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div aria-hidden="true" className="aw-atmos pointer-events-none absolute inset-x-0 top-0 h-[1100px]" />

      <div className="relative mx-auto max-w-7xl px-5 text-center sm:px-8">
        <p className="aw-rise text-[12px] font-semibold tracking-[0.2em] text-accent-text uppercase">The AI Workforce</p>
        <h1
          id="hero-title"
          className="aw-rise mt-5 text-[clamp(2.5rem,5.3vw,5.25rem)] leading-[1.04] font-semibold tracking-[-0.045em]"
          style={{ animationDelay: '80ms' }}
        >
          Give AI a goal.
          <br />
          Let a{' '}
          <span className="inline-flex items-center gap-[0.2em] rounded-full bg-accent-soft py-[0.02em] pr-[0.34em] pl-[0.26em] align-[0.06em] leading-[1.1]">
            <span aria-hidden="true" className="aw-pulse size-[0.26em] shrink-0 rounded-full bg-accent" />
            workforce
          </span>{' '}
          do the work.
        </h1>
        <p
          className="aw-rise mx-auto mt-7 max-w-[46ch] text-lg leading-relaxed text-ink-2 sm:text-xl"
          style={{ animationDelay: '160ms' }}
        >
          AI Agents World turns one high-level goal into coordinated work across specialized AI agents and the tools your
          team already uses.
        </p>

        <div className="aw-rise mt-9 flex flex-wrap justify-center gap-3" style={{ animationDelay: '240ms' }}>
          <button
            onClick={() => tryGoal()}
            className="group inline-flex h-12 items-center gap-2 rounded-xl bg-accent px-6 text-[16px] font-semibold text-accent-ink transition-[background-color,transform] duration-200 hover:bg-accent-press active:scale-[0.98]"
          >
            Try it free
            <ArrowRight size={17} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
          <a
            href="#how-it-works"
            className="inline-flex h-12 items-center rounded-xl bg-accent-soft px-6 text-[16px] font-semibold text-accent-text transition-colors duration-200 hover:bg-accent/20"
          >
            See how it works
          </a>
        </div>
        <p className="aw-rise mt-4 text-sm text-ink-3" style={{ animationDelay: '300ms' }}>
          Try your first task free. No signup required.
        </p>
      </div>

      {/* The product, in a window. The same Home screen as the app, live. */}
      <div className="aw-rise relative mx-auto mt-14 w-full max-w-[1320px] px-3 sm:mt-16 sm:px-6" style={{ animationDelay: '360ms' }}>
        <div
          data-product-window
          className="aw-frame overflow-hidden rounded-[14px] bg-surface-2 sm:rounded-[18px]"
        >
          <BrowserBar />
          <Experience className="h-[clamp(540px,calc(100dvh-140px),820px)] w-full" />
        </div>
      </div>
    </section>
  );
}

/**
 * A browser's toolbar over the app, so the window reads as the web app it
 * is. The address is the app's real one and opens it; reload clears the
 * island, as reloading the app would. Back and forward have nowhere to go.
 */
function BrowserBar() {
  const url = new URL(LINKS.app);
  return (
    <div className="flex h-12 items-center gap-2 border-b border-line bg-surface-2 px-3 sm:gap-3 sm:px-4">
      <span aria-hidden="true" className="flex shrink-0 gap-2">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
      </span>

      <span aria-hidden="true" className="ml-2 hidden shrink-0 items-center gap-1 text-ink-3 sm:flex">
        <ChevronLeft size={18} />
        <ChevronRight size={18} className="opacity-50" />
      </span>

      <a
        href={LINKS.app}
        target="_blank"
        rel="noopener noreferrer"
        title="Open AI Agents World in a new tab"
        className="mx-auto flex h-8 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg border border-line bg-bg px-3 text-[13px] text-ink-2 transition-colors hover:text-ink sm:max-w-[520px]"
      >
        <Lock size={12} aria-hidden="true" className="shrink-0 text-ink-3" />
        <img src={ASSETS.logo} alt="" aria-hidden="true" width={14} height={14} className="size-3.5 shrink-0" />
        <span className="truncate">
          {url.host}
          <span className="text-ink-3">/world</span>
        </span>
      </a>

      <button
        onClick={() => {
          cancelPreview();
          world.reset();
        }}
        aria-label="Reload the island"
        title="Reload"
        className="grid size-8 shrink-0 place-items-center rounded-lg text-ink-3 transition-colors hover:bg-bg hover:text-ink"
      >
        <RotateCw size={15} aria-hidden="true" />
      </button>
    </div>
  );
}
