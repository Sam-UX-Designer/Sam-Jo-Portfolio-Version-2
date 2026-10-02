import { m, useReducedMotion } from 'motion/react';
import Mascot from '../components/Mascot';
import Phone from '../components/Phone';
import { TryDemo } from '../components/Buttons';
import { EASE } from '../components/Motion';
import { useScene, useScrub } from '../lib/scene';

/**
 * Scene 1. The promise, set huge, with the app waiting just below it. As the
 * visitor scrolls, the words step back and the two phones (light and dark)
 * rise into the middle of the screen.
 */
export default function Hero({ stage = 'done' }: { stage?: 'intro' | 'reveal' | 'done' }) {
  const { ref, progress } = useScene<HTMLElement>();
  const reduce = useReducedMotion();

  const textOpacity = useScrub(progress, [0, 0.42], [1, 0], 1);
  const textY = useScrub(progress, [0, 0.5], [0, -140], 0);
  const textScale = useScrub(progress, [0, 0.5], [1, 0.94], 1);
  const phonesY = useScrub(progress, [0, 0.75], ['0vh', '-58vh'], '0vh');
  const phonesScale = useScrub(progress, [0, 0.75], [0.9, 1], 1);
  const leftX = useScrub(progress, [0, 0.75], ['10%', '0%'], '0%');
  const rightX = useScrub(progress, [0, 0.75], ['-10%', '0%'], '0%');
  const leftRotate = useScrub(progress, [0, 0.75], [-5, 0], 0);
  const rightRotate = useScrub(progress, [0, 0.75], [5, 0], 0);

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: stage === 'intro' ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" className="relative h-[210vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <m.div
          style={{ opacity: textOpacity, y: textY, scale: textScale }}
          className="absolute inset-x-0 top-[max(6.5rem,13vh)] flex flex-col items-center px-5 text-center"
        >
          {/* The intro's mascot and name land exactly here, then hand over. */}
          <div className={`flex items-center gap-3 ${stage === 'done' ? '' : 'opacity-0'}`}>
            <span data-fb-mark="mascot" className="relative grid place-items-center">
              <span aria-hidden="true" className="fb-halo absolute -inset-6 rounded-full" />
              <Mascot size={56} label="Finance Buddy mascot" className="relative" />
            </span>
            <span data-fb-mark="name" translate="no" className="text-xl font-semibold tracking-tight">
              Finance Buddy
            </span>
          </div>

          <m.h1
            {...enter(0.08)}
            id="hero-title"
            className="mt-7 text-[clamp(2.5rem,5.7vw,6rem)] leading-[1.02] font-bold tracking-[-0.045em]"
          >
            {/* Two lines from tablet up. A phone is too narrow for the first
                line, so it breaks cleanly after "Your money." there. */}
            <span className="sm:whitespace-nowrap">
              <span className="inline-block">Your money.</span> <span className="inline-block">All in one place.</span>
            </span>
            <br />
            <span className="fb-ink-gradient">Explained.</span>
          </m.h1>

          <m.p {...enter(0.16)} className="mt-7 max-w-[34ch] text-lg leading-snug text-ink-2 sm:text-[22px]">
            Every account in one view, and a Super Intelligence that tells you what it means.
          </m.p>

          <m.div {...enter(0.24)} className="mt-8">
            <TryDemo />
          </m.div>
        </m.div>

        <m.div
          {...enter(0.3)}
          className="absolute inset-x-0 top-[88vh] flex justify-center px-5"
          style={{ y: phonesY, scale: phonesScale }}
        >
          <div className="flex items-start justify-center gap-[3vw]">
            <m.div style={{ x: leftX, rotate: leftRotate }} className="w-[min(44vw,300px)]">
              <Phone screen="home" theme="light" eager />
            </m.div>
            <m.div style={{ x: rightX, rotate: rightRotate }} className="mt-[6vh] w-[min(44vw,300px)]">
              <Phone screen="home" theme="dark" eager />
            </m.div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
