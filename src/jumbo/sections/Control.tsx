import { Download, Link2, ShieldCheck, SlidersHorizontal, Trash2, type LucideIcon } from 'lucide-react';
import { CONNECTIONS, LINKS } from '../config';
import { Reveal } from '../components/Motion';

interface Topic {
  name: string;
  icon: LucideIcon;
  body: React.ReactNode;
}

const Names: React.FC<{ names: string[] }> = ({ names }) => (
  <ul className="mt-4 flex flex-wrap gap-2">
    {names.map((name) => (
      <li
        key={name}
        translate="no"
        className="rounded-full border border-line-strong px-3 py-1.5 text-[13px] font-medium text-ink"
      >
        {name}
      </li>
    ))}
  </ul>
);

// Every statement here matches what the JUMBO app does today
// (Jumbo-ai-App: README, server/lib/providers.js, src/screens/Settings.tsx).
const TOPICS: Topic[] = [
  {
    name: 'Connections',
    icon: Link2,
    body: (
      <>
        <p>
          These services connect with their own sign-in. JUMBO reads your data from them, and you can
          disconnect at any time.
        </p>
        <Names names={CONNECTIONS.direct} />
        <p className="mt-5">Apple Health and Health Connect connect through the JUMBO app on your phone.</p>
        <Names names={CONNECTIONS.viaApp} />
      </>
    ),
  },
  {
    name: 'Control',
    icon: SlidersHorizontal,
    body: (
      <p>
        You decide what to connect, what to capture and what to keep. Sample data only appears when
        you ask for it, and it is always labelled.
      </p>
    ),
  },
  {
    name: 'Privacy',
    icon: ShieldCheck,
    body: (
      <>
        <p>
          Your records, meals and notes are stored on your device. When AI is on, JUMBO sends a
          statistical summary for analysis, never your name, phone number, notes or photos. Meal
          photos are analysed when you take them and are not stored afterwards.
        </p>
        {LINKS.privacyPolicy ? (
          <a
            href={LINKS.privacyPolicy}
            className="mt-4 inline-flex text-sm font-semibold text-accent underline-offset-4 hover:underline"
          >
            Read the full privacy policy
          </a>
        ) : (
          <p className="mt-4 text-sm text-ink-3">A full privacy policy has not been published yet.</p>
        )}
      </>
    ),
  },
  {
    name: 'Export',
    icon: Download,
    body: <p>Download everything you have logged as a single file, whenever you want it.</p>,
  },
  {
    name: 'Delete',
    icon: Trash2,
    body: (
      <p>
        Delete your profile, goals and entries from your device in one step. JUMBO asks you to confirm
        first, because it cannot be undone.
      </p>
    ),
  },
];

const Control: React.FC = () => (
  <section id="control" aria-labelledby="control-title" className="py-24 md:py-36">
    <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5">
        <Reveal className="lg:sticky lg:top-32">
          <h2
            id="control-title"
            className="text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
          >
            Your health information should stay under your control.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-2">
            Plain answers to what JUMBO connects to, what it keeps and what you can take back.
          </p>
        </Reveal>
      </div>

      <ul className="divide-y divide-line lg:col-span-6 lg:col-start-7">
        {TOPICS.map((topic) => {
          const Icon = topic.icon;
          return (
            <li key={topic.name} className="py-8 first:pt-0 last:pb-0">
              <Reveal className="grid grid-cols-[2.5rem_1fr] gap-x-4">
                <span className="grid size-10 place-items-center rounded-full bg-brand-soft text-accent">
                  <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="pt-1.5 text-lg font-semibold">{topic.name}</h3>
                  <div className="mt-2 text-base leading-relaxed text-ink-2">{topic.body}</div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

export default Control;
