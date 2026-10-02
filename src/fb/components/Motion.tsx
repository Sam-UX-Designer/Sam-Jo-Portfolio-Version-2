import { useEffect, useRef } from 'react';
import { animate, m, useInView, useReducedMotion } from 'motion/react';
import { inr } from '../config';

export const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'li';
}

/** A gentle fade-and-rise as content scrolls in, like the app. Once only. */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = as === 'li' ? m.li : m.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.4, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/**
 * A rupee amount that counts up the way the app reveals your net worth.
 * The number is written straight into the DOM, so counting never re-renders
 * React. Screen readers get the final amount; reduced motion shows it at once.
 */
export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = inr(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = inr(v);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true">
        {inr(reduce ? value : 0)}
      </span>
      <span className="sr-only">{inr(value)}</span>
    </span>
  );
}
