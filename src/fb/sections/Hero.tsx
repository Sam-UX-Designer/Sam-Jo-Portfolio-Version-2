import { m, useReducedMotion } from 'motion/react';
import Mascot from '../components/Mascot';
import Phone from '../components/Phone';
import { TryDemo, ViewCode } from '../components/Buttons';
import { EASE } from '../components/Motion';

/**
 * The promise on the left, the product on the right: Home in light and in
 * dark, side by side, the way the app ships. The mascot greets the visitor
 * the same way it greets someone signing in.
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: EASE } };

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <m.div {...rise(0)} className="flex items-center gap-3">
            <span className="relative grid place-items-center">
              <span aria-hidden="true" className="fb-halo absolute -inset-5 rounded-full" />
              <Mascot size={60} label="Finance Buddy mascot" className="relative" />
            </span>
            <span translate="no" className="text-xl font-semibold tracking-tight">
              Finance Buddy
            </span>
          </m.div>

          <m.h1
            {...rise(0.06)}
            id="hero-title"
            className="mt-8 text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.03] font-bold tracking-[-0.035em]"
          >
            Your money, all in one place. <span className="block text-ink-2">Explained.</span>
          </m.h1>

          <m.p {...rise(0.12)} className="mt-6 max-w-[44ch] text-lg leading-relaxed text-ink-2 sm:text-xl">
            A personal finance app for India. Connect your bank accounts safely, see everything at a glance, and ask Super
            Intelligence anything about your money.
          </m.p>

          <m.div {...rise(0.18)} className="mt-9 flex flex-wrap gap-3">
            <TryDemo />
            <ViewCode />
          </m.div>
        </div>

        <div className="lg:col-span-6">
          <div className="flex items-start justify-center gap-4 sm:gap-7">
            <m.div {...rise(0.2)} className="w-[46%] max-w-[272px]">
              <Phone screen="home" theme="light" eager />
            </m.div>
            <m.div {...rise(0.32)} className="mt-14 w-[46%] max-w-[272px] sm:mt-20">
              <Phone screen="home" theme="dark" eager />
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
