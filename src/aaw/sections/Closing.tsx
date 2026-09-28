import { ArrowRight } from 'lucide-react';
import { ASSETS, LINKS } from '../config';
import { tryGoal } from '../experience/bus';
import { NAV_LINKS, RESOURCES } from '../components/Nav';
import { Reveal } from '../components/Motion';

/**
 * The last screen sends the visitor back into the product: the primary action
 * returns to the hero with the command bar ready.
 */
export function FinalCta() {
  return (
    <section id="start" aria-labelledby="start-title" className="px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px]">
        <img
          src={ASSETS.distant}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#060b16]/55 via-[#060b16]/65 to-[#060b16]/90" />

        <Reveal className="relative mx-auto flex min-h-[560px] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center text-white">
          <img src={ASSETS.logoLarge} alt="" aria-hidden="true" width={72} height={72} className="size-[72px]" loading="lazy" />
          <h2 id="start-title" className="mt-8 text-[clamp(2.25rem,5vw,4rem)] leading-[1.04] font-semibold tracking-[-0.035em]">
            Your next goal is waiting.
          </h2>
          <p className="mt-5 text-xl text-white/80">Give it to your AI workforce.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => tryGoal()}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-[#3e9bff] px-6 text-[15px] font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-[#2f86e8] active:scale-[0.98]"
            >
              Try AI Agents World
              <ArrowRight size={17} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <a
              href="#how-it-works"
              className="inline-flex h-12 items-center rounded-full border border-white/30 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              See how it works
            </a>
          </div>
          <p className="mt-6 text-sm text-white/65">Start with one goal. Build from there.</p>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const legal = [
    { label: 'Privacy', href: LINKS.privacy },
    { label: 'Terms', href: LINKS.terms },
  ].filter((l) => l.href);

  return (
    <footer className="mx-auto max-w-7xl px-5 pt-16 pb-12 sm:px-8">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
            <img src={ASSETS.logo} alt="" aria-hidden="true" width={30} height={30} className="size-[30px]" />
            AI Agents World
          </p>
          <p className="mt-3 max-w-[36ch] text-[15px] text-ink-2">A coordinated AI workforce for real work.</p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
          <ul className="grid content-start gap-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[15px] text-ink-2 transition-colors hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="grid content-start gap-3">
            <li className="text-[13px] font-semibold text-ink-3">Resources</li>
            {RESOURCES.map((r) => (
              <li key={r.label}>
                <a
                  href={r.href}
                  {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="text-[15px] text-ink-2 transition-colors hover:text-ink"
                >
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="grid content-start gap-3">
            <li>
              <a href={LINKS.signIn} className="text-[15px] text-ink-2 transition-colors hover:text-ink">
                Sign In
              </a>
            </li>
            <li>
              <button onClick={() => tryGoal()} className="text-[15px] text-ink-2 transition-colors hover:text-ink">
                Try for Free
              </button>
            </li>
            {legal.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-[15px] text-ink-2 transition-colors hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="mt-14 border-t border-line pt-6 text-[13px] text-ink-3">
        A product by{' '}
        <a href={LINKS.portfolio} className="text-ink-2 underline-offset-4 hover:underline">
          Sam Jo
        </a>
        .
      </p>
    </footer>
  );
}
