import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react';

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

export { EASE };
