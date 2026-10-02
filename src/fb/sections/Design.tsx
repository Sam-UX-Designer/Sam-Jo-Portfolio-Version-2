import { useRef, useState } from 'react';
import { AnimatePresence, m, useReducedMotion, useScroll } from 'motion/react';
import { Accessibility, Smartphone, Smile } from 'lucide-react';
import Mascot from '../components/Mascot';
import { EASE, Reveal } from '../components/Motion';
import { useScrub } from '../lib/scene';

const POINTS = [
  {
    icon: Smartphone,
    title: 'Feels native',
    body: 'A floating glass tab bar with a sliding lens, a sidebar on desktop, haptics on the phone, and light and dark mode.',
  },
  {
    icon: Smile,
    title: 'A mascot with personality',
    body: 'It floats, blinks and gives a happy little shake. It stays still for anyone who turns on Reduce Motion.',
  },
  {
    icon: Accessibility,
    title: 'Accessible',
    body: 'Screen-reader labels, large touch targets, and Reduce Motion and Reduce Transparency respected throughout.',
  },
];

/**
 * Design details, with the mascot itself to play with. As the section scrolls
 * in, the mascot spins up from small to full size; a shimmer streams across
 * its colours; a tap makes it think "Hello!" in a bubble over its head.
 */
export default function Design() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const scale = useScrub(scrollYProgress, [0, 1], [0.3, 1], 1);
  const rotate = useScrub(scrollYProgress, [0, 1], [-540, 0], 0);

  const [hello, setHello] = useState(0);
  const timer = useRef<number | undefined>(undefined);
  const sayHello = () => {
    setHello((n) => n + 1);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setHello(0), 2200);
  };

  return (
    <section ref={ref} id="design" aria-labelledby="design-title" className="relative py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col items-center lg:col-span-5">
          <div className="relative grid place-items-center pt-24">
            <span aria-hidden="true" className="fb-halo absolute -inset-10 top-14 rounded-full" />

            {/* The thought bubble: "Hello!" over its head, with the two small
                circles of a thought leading back down to it. */}
            <div aria-live="polite" className="pointer-events-none absolute top-0 left-1/2 z-10">
              <AnimatePresence>
                {hello > 0 && (
                  <m.div
                    key={hello}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.4, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -8 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="relative origin-bottom-left"
                  >
                    <p className="rounded-[28px] bg-card px-6 py-3 text-2xl font-bold tracking-[-0.02em] whitespace-nowrap shadow-[var(--shadow-float)]">
                      Hello!
                    </p>
                    <span aria-hidden="true" className="absolute -bottom-4 left-3 size-4 rounded-full bg-card shadow-[var(--shadow-float)]" />
                    <span aria-hidden="true" className="absolute -bottom-8 -left-1 size-2.5 rounded-full bg-card shadow-[var(--shadow-float)]" />
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            <m.div style={{ scale, rotate }} className="relative">
              <Mascot size={224} interactive shimmer onHello={sayHello} />
            </m.div>
          </div>
          <p className="mt-8 text-[15px] text-ink-2">Tap the mascot to say hello.</p>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <h2 id="design-title" className="text-[clamp(2.25rem,5vw,4.5rem)] leading-[1] font-bold tracking-[-0.045em]">
              Designed to feel at home on your phone.
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-8">
            {POINTS.map(({ icon: Icon, title, body }, i) => (
              <Reveal as="li" key={title} delay={i * 0.05} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-card">
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.01em]">{title}</h3>
                  <p className="mt-1.5 max-w-[52ch] text-base leading-relaxed text-ink-2">{body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
