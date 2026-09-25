import { ArrowLeft } from 'lucide-react';
import { LINKS } from '../config';
import { Reveal } from '../components/Motion';
import { GetJumbo, HowItWorksLink } from '../components/Buttons';

/** Quiet and confident: no illustration, just the line and the action. */
export const FinalCta: React.FC = () => (
  <section id="get" aria-labelledby="get-title" className="border-t border-line py-28 md:py-40">
    <Reveal className="mx-auto max-w-4xl px-5 text-center sm:px-8">
      <h2
        id="get-title"
        className="text-[clamp(2rem,4.6vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em]"
      >
        Your health is already generating the data.{' '}
        <span className="text-accent">JUMBO helps you understand it.</span>
      </h2>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <GetJumbo />
        <HowItWorksLink />
      </div>
    </Reveal>
  </section>
);

export const Footer: React.FC = () => (
  <footer className="border-t border-line">
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
      <p className="max-w-xl text-sm leading-relaxed text-ink-3">
        JUMBO is a wellness companion, not a medical device. It does not diagnose, treat or prevent any
        condition, and its future scenarios are not predictions.
      </p>
      <a
        href={LINKS.portfolio}
        className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-full border border-line-strong px-5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-surface-2 md:self-auto"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to Sam’s projects
      </a>
    </div>
    <div className="mx-auto max-w-7xl px-5 pb-10 text-[10px] font-bold uppercase tracking-[0.4em] text-ink-3 sm:px-8">
      © {new Date().getFullYear()} Sam · Product designer &amp; AI generalist
    </div>
  </footer>
);
