import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Activity, Footprints, HeartPulse, Moon, Repeat, Utensils, type LucideIcon } from 'lucide-react';
import { ASSETS } from '../config';
import UiSlot from '../components/UiSlot';
import { Reveal } from '../components/Motion';

interface Area {
  name: string;
  icon: LucideIcon;
  /** The four ring colours from the app. Stress and Habits stay neutral. */
  tone: string;
  detail: string;
}

const AREAS: Area[] = [
  { name: 'Sleep', icon: Moon, tone: 'text-sleep', detail: 'Duration, efficiency and bedtime consistency.' },
  { name: 'Movement', icon: Footprints, tone: 'text-movement', detail: 'Steps, active minutes and workouts.' },
  { name: 'Nutrition', icon: Utensils, tone: 'text-nutrition', detail: 'Meals, energy and protein.' },
  { name: 'Recovery', icon: HeartPulse, tone: 'text-recovery', detail: 'Resting heart rate and HRV trends.' },
  { name: 'Stress', icon: Activity, tone: 'text-ink-2', detail: 'Signals like overnight HRV, where a device records them.' },
  { name: 'Habits', icon: Repeat, tone: 'text-ink-2', detail: 'Routines, consistency and the notes you log.' },
];

const HealthPicture: React.FC = () => {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // The overview settles into place as it arrives: the pieces become one view.
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ['start end', 'start 35%'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.4, 1]);

  return (
    <section id="health" aria-labelledby="health-title" className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2
            id="health-title"
            className="text-[clamp(2rem,4.6vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
          >
            One place to understand more of your health.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
            The areas that shape how you feel, in one view, so you can see how they affect each other.
          </p>
        </Reveal>

        <m.div
          ref={frameRef}
          className="mx-auto mt-14 max-w-6xl origin-bottom md:mt-20"
          style={reduce ? undefined : { scale, opacity }}
        >
          <UiSlot asset={ASSETS.overview} />
        </m.div>

        <ul className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 md:mt-16 md:grid-cols-3 xl:grid-cols-6">
          {AREAS.map((area, i) => {
            const Icon = area.icon;
            return (
              <li key={area.name}>
                <Reveal delay={i * 0.05}>
                  <Icon size={22} strokeWidth={1.75} aria-hidden="true" className={area.tone} />
                  <h3 className="mt-3 text-base font-semibold">{area.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-3">{area.detail}</p>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default HealthPicture;
