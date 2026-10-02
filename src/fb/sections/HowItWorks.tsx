import { useEffect, useRef, useState } from 'react';
import Phone from '../components/Phone';
import { Reveal } from '../components/Motion';
import type { ScreenId } from '../config';

const STEPS: { title: string; body: string; screen: ScreenId }[] = [
  {
    title: 'Connect safely',
    body: 'Sign in with your mobile number and approve access through India’s RBI-regulated Account Aggregator network. No bank passwords, ever.',
    screen: 'signin',
  },
  {
    title: 'See everything at once',
    body: 'Balances, spending, investments and net worth on one screen. Swipe through your bank cards, one per bank.',
    screen: 'card',
  },
  {
    title: 'Ask Super Intelligence',
    body: 'Ask “Why did I spend more this month?” and get a plain-language answer worked out from your own numbers.',
    screen: 'si-why',
  },
];

/**
 * Three steps. On wide screens the phone stays put while the steps scroll
 * past it, and its screen changes with each step. On phones and tablets every
 * step simply shows its own screen.
 */
export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
      },
      // A thin band across the middle of the viewport decides the step.
      { rootMargin: '-46% 0px -46% 0px' },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 id="how-title" className="text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.06] font-bold tracking-[-0.03em]">
            How it works
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-16 lg:mt-0 lg:grid-cols-12 lg:gap-10">
          <ol className="lg:col-span-6 lg:pb-[12vh]">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-index={i}
                aria-current={active === i ? 'step' : undefined}
                className="flex flex-col justify-center py-6 lg:min-h-[78vh] lg:py-0"
              >
                <Reveal>
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={`grid size-9 place-items-center rounded-full text-[15px] font-semibold transition-colors duration-300 ${
                        active === i ? 'bg-btn text-btn-ink' : 'bg-muted text-ink-2'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <h3 className="text-2xl font-semibold tracking-[-0.02em] sm:text-[28px]">{step.title}</h3>
                  </div>
                  <p className="mt-4 max-w-[40ch] text-lg leading-relaxed text-ink-2">{step.body}</p>
                </Reveal>
                <Reveal className="mt-10 lg:hidden">
                  <Phone screen={step.screen} className="mx-auto w-[min(280px,70vw)]" />
                </Reveal>
              </li>
            ))}
          </ol>

          {/* The pinned phone (wide screens only). Its screens are decorative
              copies of the ones shown per step on smaller screens. */}
          <div aria-hidden="true" className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-0 flex h-[100dvh] items-center justify-center">
              <div className="relative w-[min(310px,26vw)]">
                {STEPS.map((step, i) => (
                  <div
                    key={step.screen}
                    className={`transition-[opacity,transform] duration-500 ease-out ${i === 0 ? 'relative' : 'absolute inset-0'} ${
                      active === i ? 'opacity-100' : 'pointer-events-none scale-[0.98] opacity-0'
                    }`}
                  >
                    <Phone screen={step.screen} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
