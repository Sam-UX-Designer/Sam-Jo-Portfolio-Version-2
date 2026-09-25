import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ASSETS } from '../config';
import { useMediaQuery } from '../lib/hooks';
import UiSlot from '../components/UiSlot';
import { GetJumbo, HowItWorksLink } from '../components/Buttons';

const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const wide = useMediaQuery('(min-width: 768px)');

  // Slow depth only: the composition sinks and settles as the page moves on.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-28 pb-20 sm:pt-32 md:pb-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] bg-[radial-gradient(55%_55%_at_50%_0%,var(--brand-soft),transparent_75%)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-5xl">
          <p className="jb-rise text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
            Personal health &amp; longevity companion
          </p>
          <h1
            id="hero-title"
            className="jb-rise mt-5 text-[clamp(2.5rem,5.6vw,4.5rem)] font-semibold leading-[1.03] tracking-[-0.035em]"
          >
            Your health data, finally working for&nbsp;you.
          </h1>
          <p
            className="jb-rise mt-6 max-w-xl text-lg leading-relaxed text-ink-2"
            style={{ animationDelay: '120ms' }}
          >
            JUMBO brings your health information together, helps you understand the patterns, and
            gives you a clearer way to decide what to focus on next.
          </p>
          <div className="jb-rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: '200ms' }}>
            <GetJumbo />
            <HowItWorksLink />
          </div>
        </div>

        {/* Desktop and tablet: the layered composition. Phones: one screen,
            not a shrunken collage. */}
        <div className="jb-rise mt-14 sm:mt-16" style={{ animationDelay: '280ms' }}>
          <m.div className="origin-top" style={reduce ? undefined : { y, scale }}>
            {wide ? (
              <UiSlot asset={ASSETS.hero} priority />
            ) : (
              <UiSlot asset={ASSETS.today} priority className="mx-auto w-[72%] max-w-[300px]" />
            )}
          </m.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
