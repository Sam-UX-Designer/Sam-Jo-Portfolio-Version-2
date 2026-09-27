import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ASSETS, BRAND_MARK } from '../config';
import UiSlot from '../components/UiSlot';
import { GetJumbo, HowItWorksLink } from '../components/Buttons';
import { Words } from '../components/Motion';

/**
 * Product first. The JUMBO screenshot leads, full width, and the name,
 * headline and actions follow underneath it.
 *
 * The screenshot never changes. It wipes in once as it loads, then stays
 * still; only the ambient green light behind it breathes and fades on scroll.
 */
const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-24 pb-24 sm:pt-28 md:pb-32"
    >
      {/* Ambient light behind the product: soft, wide, never a visible shape. */}
      <m.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[110vh]"
        style={reduce ? undefined : { opacity: glowOpacity, scale: glowScale }}
      >
        <div className="jb-breathe jb-loop absolute inset-0 bg-[radial-gradient(45%_40%_at_50%_42%,rgba(146,232,42,0.10),transparent_100%)]" />
        <div
          className="jb-breathe jb-loop absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_30%,rgba(146,232,42,0.05),transparent_100%)]"
          style={{ animationDelay: '-4.5s' }}
        />
      </m.div>

      {/* 01: the product, at 80-95% of the viewport on every screen size. */}
      <div className="relative">
        <UiSlot asset={ASSETS.hero} priority bare className="mx-auto w-[92vw] max-w-[1680px]" />
      </div>

      {/* 02-05: name, headline, explanation, actions. */}
      <div className="relative mx-auto mt-14 max-w-4xl px-5 text-center sm:mt-20 sm:px-8">
        <p className="jb-rise inline-flex items-center gap-2.5 text-sm font-semibold tracking-[0.08em] text-ink">
          <img src={BRAND_MARK} alt="" width={24} height={24} className="size-6 rounded-[7px]" />
          <span translate="no">JUMBO</span>
        </p>
        <h1
          id="hero-title"
          className="mt-6 text-[clamp(2.25rem,4.6vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.03em]"
        >
          <Words text="Your health data," delay={0.15} />
          <br />
          <Words text={'finally working for\u00a0you.'} delay={0.35} />
        </h1>
        <p
          className="jb-rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2"
          style={{ animationDelay: '650ms' }}
        >
          JUMBO brings your health information together, helps you understand the patterns, and
          gives you a clearer way to decide what to focus on next.
        </p>
        <div
          className="jb-rise mt-10 flex flex-wrap justify-center gap-3"
          style={{ animationDelay: '800ms' }}
        >
          <GetJumbo />
          <HowItWorksLink />
        </div>
      </div>
    </section>
  );
};

export default Hero;
