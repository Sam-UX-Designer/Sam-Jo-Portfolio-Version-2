import { m, useReducedMotion } from 'motion/react';

export const EASE = [0.16, 1, 0.3, 1] as const;

/** Fades and rises into place the first time it scrolls into view. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 22,
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: 'div' | 'li' | 'section';
}) {
  const reduce = useReducedMotion();
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
