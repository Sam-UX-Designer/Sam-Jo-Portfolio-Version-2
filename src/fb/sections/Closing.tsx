import Mascot from '../components/Mascot';
import { Reveal } from '../components/Motion';
import { TryDemo } from '../components/Buttons';
import { LINKS } from '../config';

export function FinalCta() {
  return (
    <section id="try" aria-labelledby="try-title" className="py-24 text-center md:py-36">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center px-5 sm:px-8">
        <div className="relative grid place-items-center">
          <span aria-hidden="true" className="fb-halo absolute -inset-8 rounded-full" />
          <Mascot size={112} delay={0.8} className="relative" />
        </div>
        <h2 id="try-title" className="mt-10 text-[clamp(2.25rem,5vw,4rem)] leading-[1.04] font-bold tracking-[-0.035em]">
          Try Finance Buddy
        </h2>
        <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-ink-2 sm:text-xl">
          Sign in, connect the sample accounts and ask Super Intelligence anything.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <TryDemo />
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-10 text-[13px] leading-relaxed text-ink-2 sm:flex-row sm:justify-between sm:px-8">
        <p>Demo uses sample data. Bank and merchant logos are trademarks of their owners.</p>
        <p>
          Designed by{' '}
          <a href={LINKS.portfolio} className="font-medium text-ink underline-offset-4 hover:underline">
            Sam Jo
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
