import { useEffect, useRef, useState } from 'react';
import { transform, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';

/**
 * A scroll scene: a tall section whose inner stage stays pinned while the
 * page scrolls through it. Returns the section ref and its progress, 0 at the
 * moment the stage pins and 1 as it lets go. Native scrolling is untouched;
 * the page only reads the scroll position.
 */
export function useScene<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return { ref, progress: scrollYProgress };
}

/**
 * A value scrubbed by scroll progress. Under Reduce Motion it holds still at
 * `rest`, so every scene reads as a plain, finished layout.
 */
export function useScrub<O extends number | string>(
  progress: MotionValue<number>,
  input: number[],
  output: O[],
  rest: O,
): MotionValue<O> | O {
  const reduce = useReducedMotion();
  // A function mapping, not ranges: this keeps every value on the same clock.
  // (Range mappings of opacity can be handed to the browser's scroll timeline,
  // which measures the scene differently from the transforms.)
  const map = transform(input, output);
  const value = useTransform(progress, (v) => map(v));
  return reduce ? rest : value;
}

/** True while the media query matches. */
export function useMedia(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return matches;
}
