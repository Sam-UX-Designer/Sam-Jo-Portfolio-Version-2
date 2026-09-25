import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { Footprints, HeartPulse, Moon, Repeat, Utensils, type LucideIcon } from 'lucide-react';
import { ASSETS } from '../config';
import UiSlot from '../components/UiSlot';
import { Reveal } from '../components/Motion';

interface Fragment {
  label: string;
  icon: LucideIcon;
  tone: string;
  /** Where the label floats around the frame on tablet and desktop. */
  place: string;
  /** Pixels of drift; different values put each label at a different depth. */
  depth: number;
}

const FRAGMENTS: Fragment[] = [
  { label: 'Sleep', icon: Moon, tone: 'text-sleep', place: 'left-[-5%] top-[10%]', depth: -40 },
  { label: 'Movement', icon: Footprints, tone: 'text-movement', place: 'right-[-4%] top-[22%]', depth: 30 },
  { label: 'Habits', icon: Repeat, tone: 'text-ink-2', place: 'left-[38%] top-[-5%]', depth: -20 },
  { label: 'Nutrition', icon: Utensils, tone: 'text-nutrition', place: 'left-[6%] bottom-[-5%]', depth: 40 },
  { label: 'Recovery', icon: HeartPulse, tone: 'text-recovery', place: 'right-[10%] bottom-[-4%]', depth: -30 },
];

const Chip: React.FC<{ fragment: Fragment; className?: string }> = ({ fragment, className = '' }) => {
  const Icon = fragment.icon;
  return (
    <span
      className={`jb-glass inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium text-ink ${className}`}
    >
      <Icon size={16} aria-hidden="true" className={fragment.tone} />
      {fragment.label}
    </span>
  );
};

const FloatingChip: React.FC<{ fragment: Fragment; progress: MotionValue<number> }> = ({
  fragment,
  progress,
}) => {
  const y = useTransform(progress, [0, 1], [fragment.depth, -fragment.depth]);
  return (
    <m.div className={`absolute ${fragment.place}`} style={{ y }}>
      <Chip fragment={fragment} />
    </m.div>
  );
};

const Problem: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start end', 'end start'] });

  return (
    <section id="problem" aria-labelledby="problem-title" className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2
            id="problem-title"
            className="max-w-4xl text-[clamp(2rem,4.6vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
          >
            Your health data is everywhere.{' '}
            <span className="text-ink-3">Understanding it is the hard part.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid items-end gap-12 md:mt-20 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4 lg:pb-10">
            <p className="max-w-md text-lg leading-relaxed text-ink-2">
              Sleep lives in one place, movement in another, and meals and habits often nowhere at
              all. More data does not automatically mean more understanding.
            </p>
          </Reveal>

          <div ref={stageRef} className="relative lg:col-span-8">
            <Reveal>
              <UiSlot asset={ASSETS.scattered} />
            </Reveal>

            {/* The same five areas, drifting at different depths: separate
                pieces, not yet one picture. Hidden on phones. */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
              {FRAGMENTS.map((fragment) =>
                reduce ? (
                  <div key={fragment.label} className={`absolute ${fragment.place}`}>
                    <Chip fragment={fragment} />
                  </div>
                ) : (
                  <FloatingChip key={fragment.label} fragment={fragment} progress={scrollYProgress} />
                ),
              )}
            </div>

            <ul className="mt-6 flex flex-wrap gap-2 md:sr-only" aria-label="Areas of health data">
              {FRAGMENTS.map((fragment) => (
                <li key={fragment.label}>
                  <Chip fragment={fragment} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
