import { Fragment, useEffect, useRef } from 'react';
import { animate, m, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react';

const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/** Fades content up by a few pixels as it enters the viewport. Once only. */
export const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0 }) => {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
};

interface WordsProps {
  text: string;
  className?: string;
  delay?: number;
}

/**
 * A headline that rises into place word by word, each word from behind its
 * own line mask. Reads as one sentence to screen readers; plain text under
 * reduced motion.
 */
export const Words: React.FC<WordsProps> = ({ text, className, delay = 0 }) => {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;
  const words = text.split(' ');
  return (
    <m.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top">
            <m.span
              className="inline-block"
              variants={{
                hidden: { y: '110%', opacity: 0 },
                show: { y: '0%', opacity: 1, transition: { duration: 0.85, ease: EASE } },
              }}
            >
              {word}
            </m.span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </m.span>
  );
};

interface CountUpProps {
  value: number;
  format: (n: number) => string;
  className?: string;
}

/** Counts up to a real number once it is on screen. Shows the final value otherwise. */
export const CountUp: React.FC<CountUpProps> = ({ value, format, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!inView || reduce || !node) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = format(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, format]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
};

interface DriftProps {
  children: React.ReactNode;
  className?: string;
  /** Pixels travelled across the element's pass through the viewport. */
  distance?: number;
}

/**
 * Moves a product visual slightly slower than the page scrolls, so the
 * screen reads as sitting on a layer of its own. Static under reduced motion.
 */
export const Drift: React.FC<DriftProps> = ({ children, className, distance = 80 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [distance / 2, -distance / 2]);

  return (
    <m.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </m.div>
  );
};

/** A slow idle float for a product screen. Paused while its section is off screen. */
export const Float: React.FC<{ children: React.ReactNode; seconds?: number; delay?: number }> = ({
  children,
  seconds = 7,
  delay = 0,
}) => (
  <div className="jb-float jb-loop" style={{ animationDuration: `${seconds}s`, animationDelay: `${delay}s` }}>
    {children}
  </div>
);

export { EASE };
