import { useEffect, useRef, useState } from 'react';
import { m, useReducedMotion } from 'motion/react';
import { ASSETS, type UiAsset } from '../config';
import UiSlot from '../components/UiSlot';
import { EASE, Reveal } from '../components/Motion';

interface Phase {
  name: string;
  message: string;
  detail: string;
  asset: UiAsset;
  /** How this phase's screen arrives, matching what the phase does. */
  from: { x?: number; y?: number; scale?: number };
}

const PHASES: Phase[] = [
  {
    name: 'Connect',
    message: 'Bring supported information together.',
    detail:
      'Link a wearable or your phone’s health app once. Sleep, movement and recovery arrive in one place on their own.',
    asset: ASSETS.scattered,
    from: { scale: 1.1 }, // fragments draw in toward one view
  },
  {
    name: 'Capture',
    message: 'Add context such as meals and activities.',
    detail:
      'Photograph a meal, log a workout or add a note. You fill the gaps a wearable cannot see.',
    asset: ASSETS.capture,
    from: { x: 56 }, // the capture screen enters the composition
  },
  {
    name: 'Understand',
    message: 'Organise and interpret available context.',
    detail:
      'JUMBO compares recent days with your own baseline, finds what changed, and says how confident it is.',
    asset: ASSETS.overview,
    from: { y: 40 }, // the layers align into one readable view
  },
  {
    name: 'Improve',
    message: 'Use insights and personal choices to guide the next step.',
    detail: 'You choose what to try. The days that follow show how it went.',
    asset: ASSETS.today,
    from: { scale: 1.04 }, // an insight appears and the interface settles
  },
];

/**
 * Sticky storytelling. On desktop the product frame stays put while the
 * explanation scrolls past it, and the frame changes with each phase. On
 * smaller screens every phase simply shows its own screen.
 */
const HowItWorks: React.FC = () => {
  const [active, setActive] = useState(0);
  const phaseRefs = useRef<(HTMLElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      // A thin band across the middle of the viewport decides the phase.
      { rootMargin: '-48% 0px -48% 0px' },
    );
    phaseRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-3xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">How it works</p>
          <h2
            id="how-title"
            className="mt-4 text-[clamp(2rem,4.6vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
          >
            From scattered numbers to a clear next step.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-20 lg:mt-8 lg:grid-cols-12 lg:gap-10">
          {/* Bottom padding lets the last phase reach the middle of the
              screen while the stage is still pinned. */}
          <ol className="lg:col-span-5 lg:pb-[18vh]">
            {PHASES.map((phase, i) => (
              <li
                key={phase.name}
                ref={(el) => {
                  phaseRefs.current[i] = el;
                }}
                data-index={i}
                aria-current={active === i ? 'step' : undefined}
                className="flex flex-col justify-center py-10 lg:min-h-[78vh] lg:py-0"
              >
                <h3
                  className={`text-sm font-semibold uppercase tracking-[0.16em] transition-colors duration-500 ${
                    active === i ? 'text-accent' : 'text-ink-3'
                  }`}
                >
                  {phase.name}
                </h3>
                <p
                  className={`mt-4 text-[clamp(1.5rem,2.6vw,2.125rem)] font-semibold leading-tight tracking-[-0.02em] transition-colors duration-500 ${
                    active === i ? 'text-ink' : 'lg:text-ink-3'
                  }`}
                >
                  {phase.message}
                </p>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ink-2">{phase.detail}</p>

                <div className="mt-10 lg:hidden">
                  <UiSlot
                    asset={phase.asset}
                    className={phase.asset.shape === 'phone' ? 'mx-auto w-[64%] max-w-[280px]' : ''}
                  />
                </div>
              </li>
            ))}
          </ol>

          <div className="hidden lg:col-span-6 lg:col-start-7 lg:block">
            <div className="sticky top-24 flex h-[calc(100vh-7rem)] flex-col justify-center">
              <div className="relative aspect-square w-full">
                {PHASES.map((phase, i) => {
                  const on = active === i;
                  const hidden = { opacity: 0, x: 0, y: 0, scale: 0.96, ...phase.from };
                  return (
                    <m.div
                      key={phase.name}
                      aria-hidden={!on}
                      className="absolute inset-0 flex items-center justify-center"
                      initial={false}
                      animate={
                        reduce
                          ? { opacity: on ? 1 : 0 }
                          : on
                            ? { opacity: 1, x: 0, y: 0, scale: 1 }
                            : hidden
                      }
                      transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
                    >
                      {phase.asset.shape === 'phone' ? (
                        <UiSlot asset={phase.asset} className="h-full w-auto" />
                      ) : (
                        <UiSlot asset={phase.asset} className="w-full" />
                      )}
                    </m.div>
                  );
                })}
              </div>

              {/* Where the story is: four phases, the current one marked. */}
              <div aria-hidden="true" className="mt-8 grid grid-cols-4 gap-3">
                {PHASES.map((phase, i) => (
                  <div key={phase.name}>
                    <span
                      className={`block h-0.5 rounded-full transition-colors duration-500 ${
                        i <= active ? 'bg-brand' : 'bg-line-strong'
                      }`}
                    />
                    <span
                      className={`mt-3 block text-xs font-medium transition-colors duration-500 ${
                        i === active ? 'text-ink' : 'text-ink-3'
                      }`}
                    >
                      {phase.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
