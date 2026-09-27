import {
  CalendarDays,
  Camera,
  CornerDownRight,
  Dumbbell,
  Mic,
  PlayCircle,
  Ruler,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { ASSETS } from '../config';
import UiSlot from '../components/UiSlot';
import { Drift, Float, Reveal, Words } from '../components/Motion';

/*
 * The product, one experience at a time. Each section leads with the benefit
 * and names the feature after it. Layouts alternate so the page never falls
 * into a repeated text-left, image-right rhythm:
 *   Today    text | phone
 *   Future   phone | text
 *   Capture  modes | phone | modes
 *   Ask      text | phone
 *   Explore  phone | text
 */

const H2 = 'text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em]';
const BODY = 'mt-6 max-w-lg text-lg leading-relaxed text-ink-2';

/** The feature's name, shown after the benefit rather than above it. */
const FeatureName: React.FC<{ icon: LucideIcon; motion: string; children: React.ReactNode }> = ({
  icon: Icon,
  motion,
  children,
}) => (
  <p className="mt-8 flex items-center gap-2 text-sm font-semibold text-ink">
    <Icon size={18} strokeWidth={1.75} aria-hidden="true" className={`text-accent ${motion}`} />
    {children}
  </p>
);

const Phone: React.FC<{ asset: typeof ASSETS.today; className?: string }> = ({ asset, className = '' }) => (
  <Drift className={`mx-auto w-[68%] max-w-[340px] sm:w-[52%] lg:w-full ${className}`}>
    <Float seconds={7.5}>
      <UiSlot asset={asset} />
    </Float>
  </Drift>
);

/* ------------------------------------------------------------------ Today */

export const Today: React.FC = () => (
  <section id="today" aria-labelledby="today-title" className="py-24 md:py-32">
    <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
      <Reveal className="lg:col-span-6">
        <h2 id="today-title" className={H2}>
          <Words text="A clear picture of today, without digging through data." />
        </h2>
        <p className={BODY}>
          One health score, four rings for sleep, movement, nutrition and recovery, and the day’s
          state in a single sentence. Pick another day and everything follows it.
        </p>
        <FeatureName icon={CalendarDays} motion="jb-i-bob">Today</FeatureName>
      </Reveal>
      <div className="lg:col-span-4 lg:col-start-8">
        <Phone asset={ASSETS.today} />
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------- AI Future */

const PROVENANCE = [
  { term: 'Measured', detail: 'Recorded by a connected device or entered by you.' },
  { term: 'Evidence-informed', detail: 'A general relationship from research, applied to your data.' },
  { term: 'Model estimate', detail: 'A projection from JUMBO’s model. Not a prediction.' },
];

export const Future: React.FC = () => (
  <section id="future" aria-labelledby="future-title" className="py-24 md:py-32">
    <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
      <div className="order-2 lg:order-1 lg:col-span-4 lg:col-start-2">
        <Phone asset={ASSETS.future} />
      </div>
      <Reveal className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
        <h2 id="future-title" className={H2}>
          <Words text="Explore where your current routine could take you." />
        </h2>
        <p className={BODY}>
          See how your trajectory could shift over one, three or five years if a pattern continues.
          These are scenarios, not predictions, and the uncertainty is always shown with them.
        </p>
        <dl className="mt-10 grid gap-5 sm:grid-cols-3 sm:gap-6">
          {PROVENANCE.map((item) => (
            <div key={item.term} className="border-t border-line-strong pt-4">
              <dt className="text-sm font-semibold text-ink">{item.term}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-ink-3">{item.detail}</dd>
            </div>
          ))}
        </dl>
        <FeatureName icon={TrendingUp} motion="jb-i-nudge">AI Future</FeatureName>
      </Reveal>
    </div>
  </section>
);

/* ---------------------------------------------------------------- Capture */

const MODES: { name: string; icon: LucideIcon; motion: string; detail: string }[] = [
  { name: 'Meal photo', icon: Camera, motion: 'jb-i-tilt', detail: 'JUMBO estimates the foods and nutrition, and shows its confidence.' },
  { name: 'Workout', icon: Dumbbell, motion: 'jb-i-bob', detail: 'Type, duration and how hard it felt.' },
  { name: 'Measurements', icon: Ruler, motion: 'jb-i-tilt', detail: 'Weight, waist and the numbers you track.' },
  { name: 'Notes and voice', icon: Mic, motion: 'jb-i-beat', detail: 'A quick note, or dictation where your device supports it.' },
];

const Mode: React.FC<{ mode: (typeof MODES)[number]; delay: number; end?: boolean }> = ({
  mode,
  delay,
  end = false,
}) => {
  const Icon = mode.icon;
  return (
    <Reveal delay={delay}>
      <Icon
        size={22}
        strokeWidth={1.75}
        aria-hidden="true"
        className={`text-accent ${mode.motion} ${end ? 'lg:ml-auto' : ''}`}
        style={{ animationDelay: `${delay * 6}s` }}
      />
      <h3 className="mt-3 text-base font-semibold">{mode.name}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-3">{mode.detail}</p>
    </Reveal>
  );
};

export const Capture: React.FC = () => (
  <section id="capture" aria-labelledby="capture-title" className="border-y border-line bg-raised py-24 md:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 id="capture-title" className={H2}>
          <Words text="Give JUMBO more context." />
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
          Wearables miss what you eat and how a session felt. Capture fills those gaps, and you review
          everything before it is saved.
        </p>
      </Reveal>

      <div className="mt-16 grid items-center gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
        <div className="grid gap-10 sm:grid-cols-2 md:col-span-2 md:grid-cols-2 lg:col-span-3 lg:grid-cols-1 lg:text-right">
          {MODES.slice(0, 2).map((mode, i) => (
            <Mode key={mode.name} mode={mode} delay={i * 0.06} end />
          ))}
        </div>
        <div className="md:col-span-2 lg:col-span-4 lg:col-start-5">
          {/* Tap + and the options float up; the Capture screen sits behind it. */}
          <div className="relative mx-auto w-[60%] max-w-[300px] sm:w-[44%] lg:w-[80%]">
            <div className="absolute inset-0 translate-x-[40%] -translate-y-[5%] scale-[0.88] opacity-70">
              <Float seconds={9} delay={-3}>
                <UiSlot asset={ASSETS.capture} />
              </Float>
            </div>
            <Drift className="relative">
              <Float seconds={7.5}>
                <UiSlot asset={ASSETS.quickadd} />
              </Float>
            </Drift>
          </div>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 md:col-span-2 md:grid-cols-2 lg:col-span-3 lg:col-start-10 lg:grid-cols-1">
          {MODES.slice(2).map((mode, i) => (
            <Mode key={mode.name} mode={mode} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* -------------------------------------------------------------- Ask JUMBO */

const OPTIONS = [
  'Keep your bedtime within a narrower window',
  'Plan a lighter session after a late night',
  'Show me how my recovery has changed',
];

export const Ask: React.FC = () => (
  <section id="ask" aria-labelledby="ask-title" className="py-24 md:py-32">
    <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
      <Reveal className="lg:col-span-6">
        <h2 id="ask-title" className={H2}>
          <Words text="Don’t just look at your data. Talk to it." />
        </h2>
        <p className={BODY}>
          Ask JUMBO answers from your own records, keeps the conversation in context, and tells you
          when your data cannot answer the question.
        </p>

        <figure className="mt-10 max-w-lg">
          <figcaption className="text-xs font-medium text-ink-3">Example conversation</figcaption>
          <p className="mt-4 ml-auto w-fit max-w-[85%] rounded-[22px] rounded-br-md bg-surface-2 px-5 py-3 text-[15px] text-ink">
            Why have I had low energy this week?
          </p>
          <p className="mt-5 text-[15px] leading-relaxed text-ink-2">
            <span className="font-semibold text-ink">JUMBO: </span>
            Your sleep timing has been less consistent than usual, and your recovery has been lower on
            the mornings after late nights. A few things you could try:
          </p>
          <ul className="mt-4 space-y-2.5">
            {OPTIONS.map((option) => (
              <li key={option} className="flex items-start gap-2.5 text-[15px] text-ink">
                <CornerDownRight
                  size={16}
                  aria-hidden="true"
                  className="jb-i-nudge mt-1 shrink-0 text-accent"
                  style={{ animationDelay: `${OPTIONS.indexOf(option) * 0.4}s` }}
                />
                {option}
              </li>
            ))}
          </ul>
        </figure>

        <FeatureName icon={Sparkles} motion="jb-i-twinkle">Ask JUMBO</FeatureName>
      </Reveal>
      <div className="lg:col-span-4 lg:col-start-8">
        <Phone asset={ASSETS.ask} />
      </div>
    </div>
  </section>
);

/* ---------------------------------------------------------------- Explore */

export const Explore: React.FC = () => (
  <section id="explore" aria-labelledby="explore-title" className="py-24 md:py-32">
    <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
      <div className="order-2 lg:order-1 lg:col-span-4 lg:col-start-2">
        <Phone asset={ASSETS.explore} />
      </div>
      <Reveal className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
        <h2 id="explore-title" className={H2}>
          <Words text="Learn without the noise." />
        </h2>
        <p className={BODY}>
          Videos from real creators, chosen around your goals, that you can save and follow. They
          are kept clearly apart from JUMBO’s own guidance, so you always know who is speaking.
        </p>
        <p className="mt-6 max-w-lg border-l-2 border-brand pl-4 text-base leading-relaxed text-ink">
          Your health data is never sent to YouTube or to any creator.
        </p>
        <FeatureName icon={PlayCircle} motion="jb-i-beat">Explore</FeatureName>
      </Reveal>
    </div>
  </section>
);
