import { Reveal } from '../components/Motion';

/** The problem, in one line, set large. */
export default function Problem() {
  return (
    <section aria-labelledby="problem-title" className="py-20 md:py-32">
      <h2 id="problem-title" className="sr-only">
        The problem
      </h2>
      <Reveal className="mx-auto max-w-5xl px-5 sm:px-8">
        <p className="text-[clamp(1.75rem,4.2vw,3.25rem)] leading-[1.14] font-semibold tracking-[-0.028em]">
          Money in India is spread across banks, cards, mutual funds, FDs and EPF.{' '}
          <span className="text-ink-2">Nobody shows you the full picture, or what to do next.</span>
        </p>
      </Reveal>
    </section>
  );
}
