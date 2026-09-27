import { m, useReducedMotion } from 'motion/react';
import { Footprints, HeartPulse, Moon, Repeat, Utensils, type LucideIcon } from 'lucide-react';
import ScatteredCards from '../components/ScatteredCards';
import { EASE, Reveal, Words } from '../components/Motion';

interface Area {
  label: string;
  icon: LucideIcon;
  tone: string;
  /** Icon motion that matches what it stands for (jumbo.css). */
  motion: string;
}

const AREAS: Area[] = [
  { label: 'Sleep', icon: Moon, tone: 'text-sleep', motion: 'jb-i-rock' },
  { label: 'Movement', icon: Footprints, tone: 'text-movement', motion: 'jb-i-bob' },
  { label: 'Habits', icon: Repeat, tone: 'text-ink-2', motion: 'jb-i-turn' },
  { label: 'Nutrition', icon: Utensils, tone: 'text-nutrition', motion: 'jb-i-tilt' },
  { label: 'Recovery', icon: HeartPulse, tone: 'text-recovery', motion: 'jb-i-beat' },
];

const Problem: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <section id="problem" aria-labelledby="problem-title" className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2
          id="problem-title"
          className="max-w-4xl text-[clamp(2rem,4.6vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
        >
          <Words text="Your health data is everywhere." />{' '}
          <Words text="Understanding it is the hard part." className="text-ink-3" delay={0.3} />
        </h2>

        <div className="mt-14 grid items-end gap-12 md:mt-20 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4 lg:pb-10">
            <p className="max-w-md text-lg leading-relaxed text-ink-2">
              Sleep lives in one place, movement in another, and meals and habits often nowhere at
              all. More data does not automatically mean more understanding.
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            {/* Five real cards from the app, each floating on its own. */}
            <ScatteredCards />

            <m.ul
              className="mt-6 flex flex-wrap gap-2"
              aria-label="Areas of health data"
              initial={reduce ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
            >
              {AREAS.map((area, i) => {
                const Icon = area.icon;
                return (
                  <m.li
                    key={area.label}
                    variants={{
                      hidden: { opacity: 0, y: 14, scale: 0.9 },
                      show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
                    }}
                  >
                    <span className="jb-glass inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium text-ink">
                      <Icon
                        size={16}
                        aria-hidden="true"
                        className={`${area.tone} ${area.motion}`}
                        style={{ animationDelay: `${i * 0.4}s` }}
                      />
                      {area.label}
                    </span>
                  </m.li>
                );
              })}
            </m.ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
