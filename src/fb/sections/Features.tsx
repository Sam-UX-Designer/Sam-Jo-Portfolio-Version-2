import { useId, useState } from 'react';
import Mascot from '../components/Mascot';
import Phone from '../components/Phone';
import { Reveal } from '../components/Motion';
import { DESKTOP, desktopSrc, type DesktopId, type ScreenId } from '../config';

interface Feature {
  title: string;
  body: string;
  screens: ScreenId[];
  span: string;
  mascot?: boolean;
}

/* Two rows of 7 + 5 and 5 + 7, one row of 6 + 6, then desktop across the
   full width: every feature gets its own real screens, none repeated. */
const FEATURES: Feature[] = [
  {
    title: 'Home that adapts',
    body: 'Tap a bank card to flip it for details. Long-press to move or hide cards, and anything that changed since your last visit rises to the top.',
    screens: ['customise'],
    span: 'lg:col-span-7',
  },
  {
    title: 'Super Intelligence',
    body: 'A friendly assistant that answers from your own numbers. Ask it to show your subscriptions, then pick up any chat later from your history.',
    screens: ['si-answer', 'si-history'],
    span: 'lg:col-span-5',
    mascot: true,
  },
  {
    title: 'Plans that fit you',
    body: 'Five quick questions about income, spending, your safety buffer and expected returns, already filled in from your bank data.',
    screens: ['si', 'si-setup'],
    span: 'lg:col-span-5',
  },
  {
    title: 'Every transaction, clear',
    body: 'Real merchant logos, search, and filters by type, account, category, month or any dates on a calendar. Fix a category once and it’s remembered.',
    screens: ['activity', 'calendar'],
    span: 'lg:col-span-7',
  },
  {
    title: 'Your net worth',
    body: 'Mutual funds, fixed deposits, EPF, savings and money you’ve lent, with how it has grown since January.',
    screens: ['wealth'],
    span: 'lg:col-span-6',
  },
  {
    title: 'Goals and forecasts',
    body: 'Goals with projections, a cash forecast until your next salary with a safety buffer, and monthly budgets.',
    screens: ['plan', 'forecast'],
    span: 'lg:col-span-6',
  },
];

function FeatureCard({ f, index }: { f: Feature; index: number }) {
  const two = f.screens.length === 2;
  return (
    <Reveal as="li" delay={(index % 2) * 0.06} className={`flex flex-col overflow-hidden rounded-[20px] bg-card ${f.span}`}>
      <div className="p-7 sm:p-8">
        <h3 className="flex items-center gap-2.5 text-[22px] font-semibold tracking-[-0.02em]">
          {f.mascot && <Mascot size={30} delay={1.5} />}
          {f.title}
        </h3>
        <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-ink-2">{f.body}</p>
      </div>
      {/* The phones rise from the bottom edge; the card crops them. */}
      <div className="relative mt-auto h-[clamp(300px,34vw,400px)] overflow-hidden">
        <div className="absolute inset-x-0 top-2 flex justify-center gap-4 px-6 sm:gap-6">
          {f.screens.map((s) => (
            <Phone key={s} screen={s} className={two ? 'w-[46%] max-w-[230px]' : 'w-[62%] max-w-[250px]'} />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/** The web app on a desktop, with a switch between two of its screens. */
function Desktop() {
  const [shot, setShot] = useState<DesktopId>('home');
  const base = useId();
  const ids = Object.keys(DESKTOP) as DesktopId[];

  return (
    <Reveal as="li" className="overflow-hidden rounded-[20px] bg-card lg:col-span-12">
      <div className="flex flex-col gap-5 p-7 sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <div>
          <h3 className="text-[22px] font-semibold tracking-[-0.02em]">Works on desktop too</h3>
          <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-ink-2">
            A real web app with a sidebar, not a stretched phone screen.
          </p>
        </div>
        <div role="tablist" aria-label="Desktop screens" className="flex w-fit shrink-0 rounded-full bg-muted p-1">
          {ids.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`${base}-${id}`}
              aria-selected={shot === id}
              aria-controls={`${base}-panel`}
              onClick={() => setShot(id)}
              className={`h-10 rounded-full px-4 text-sm font-semibold transition-colors duration-200 ${
                shot === id ? 'bg-card text-ink shadow-sm' : 'text-ink-2 hover:text-ink'
              }`}
            >
              {DESKTOP[id].label}
            </button>
          ))}
        </div>
      </div>
      <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-${shot}`} className="px-4 pb-4 sm:px-8 sm:pb-8">
        <div className="overflow-hidden rounded-[14px] ring-1 ring-line">
          <div className="relative aspect-[16/10] bg-muted">
            {(['light', 'dark'] as const).map((t) => (
              <img
                key={`${shot}-${t}`}
                src={desktopSrc(shot, t)}
                alt={DESKTOP[shot].alt}
                width={2400}
                height={1500}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover object-top ${t === 'light' ? 'fb-light-only' : 'fb-dark-only'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-3xl">
          <h2 id="features-title" className="text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.06] font-bold tracking-[-0.03em]">
            Everything about your money, in one app.
          </h2>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-12">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} f={f} index={i} />
          ))}
          <Desktop />
        </ul>
      </div>
    </section>
  );
}
