import { m, type MotionValue } from 'motion/react';
import { useScene, useScrub } from '../lib/scene';

const TEXT =
  'Your money is spread across bank accounts, cards, investments and savings. Nobody shows you the full picture, or what to do next.';

function Word({ word, i, total, progress }: { word: string; i: number; total: number; progress: MotionValue<number> }) {
  const start = 0.1 + (i / total) * 0.7;
  const opacity = useScrub(progress, [start, start + 0.7 / total], [0.16, 1], 1);
  return <m.span style={{ opacity }}>{word} </m.span>;
}

/**
 * Scene 2. The problem, one sentence, lit word by word as the visitor reads
 * at their own scroll speed.
 */
export default function Problem() {
  const { ref, progress } = useScene<HTMLElement>();
  const words = TEXT.split(' ');
  return (
    <section ref={ref} aria-labelledby="problem-title" className="relative h-[190vh]">
      <h2 id="problem-title" className="sr-only">
        The problem
      </h2>
      <div className="sticky top-0 flex h-[100dvh] items-center">
        <p className="mx-auto max-w-6xl px-5 text-[clamp(2rem,5.2vw,4.75rem)] leading-[1.08] font-semibold tracking-[-0.035em] sm:px-8">
          <span className="sr-only">{TEXT}</span>
          <span aria-hidden="true">
            {words.map((w, i) => (
              <Word key={i} word={w} i={i} total={words.length} progress={progress} />
            ))}
          </span>
        </p>
      </div>
    </section>
  );
}
