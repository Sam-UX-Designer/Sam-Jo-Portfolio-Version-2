import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

interface TypewriterProps {
  /** Typed in turn, each one held, then erased. The first shows on load. */
  phrases: string[];
  /** Hold off until the page is ready (the intro is still playing). */
  start?: boolean;
  className?: string;
}

const TYPE_MS = 75;
const ERASE_MS = 40;
const HOLD_MS = 2200;
const GAP_MS = 350;

/**
 * The end of the headline, typing through what the app does. The box is as
 * wide as the widest phrase, so the line never shifts while it types.
 * Screen readers and Reduce Motion get the first phrase, still.
 */
export default function Typewriter({ phrases, start = true, className = '' }: TypewriterProps) {
  const reduce = useReducedMotion();
  const [text, setText] = useState(phrases[0] ?? '');

  useEffect(() => {
    if (reduce || !start || phrases.length < 2) return;
    let timer = 0;
    let i = 0;
    let shown = phrases[0]!;
    const wait = (ms: number, fn: () => void) => (timer = window.setTimeout(fn, ms));

    const erase = () => {
      if (shown.length === 0) return wait(GAP_MS, type);
      shown = shown.slice(0, -1);
      setText(shown);
      wait(ERASE_MS, erase);
    };
    const type = () => {
      const target = phrases[(i + 1) % phrases.length]!;
      if (shown.length === target.length) {
        i = (i + 1) % phrases.length;
        return wait(HOLD_MS, erase);
      }
      shown = target.slice(0, shown.length + 1);
      setText(shown);
      wait(TYPE_MS, type);
    };

    wait(HOLD_MS, erase);
    return () => window.clearTimeout(timer);
  }, [reduce, start, phrases]);

  return (
    <>
      <span className="sr-only">{phrases[0]}</span>
      <span aria-hidden="true" className={`inline-grid text-left ${className}`}>
        {/* Sizers: every phrase, unseen, in the same cell, so the box is as
            wide as the widest one (cursor included) and never changes. */}
        {phrases.map((p) => (
          <span key={p} className="invisible col-start-1 row-start-1 whitespace-nowrap">
            {p}
            <span className="fb-caret" />
          </span>
        ))}
        <span className="col-start-1 row-start-1 whitespace-nowrap">
          {text}
          {!reduce && <span className="fb-caret" />}
        </span>
      </span>
    </>
  );
}
