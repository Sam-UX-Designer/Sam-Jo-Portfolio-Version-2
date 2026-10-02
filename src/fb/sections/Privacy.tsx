import { KeyRound, Lock, ShieldCheck, Trash2 } from 'lucide-react';
import { Reveal } from '../components/Motion';

const POINTS = [
  { icon: ShieldCheck, title: 'Consent first', body: 'Only the accounts you approve connect, through a regulated, consent-based connection.' },
  { icon: KeyRound, title: 'No bank passwords', body: 'Finance Buddy never asks for them. Not once.' },
  { icon: Lock, title: 'Never used for training', body: 'Sensitive data is encrypted, and your financial data never trains AI models.' },
  { icon: Trash2, title: 'Yours to delete', body: 'Stop sharing, or delete your account, any time.' },
];

/** Scene 8. Trust, said plainly. */
export default function Privacy() {
  return (
    <section id="privacy" aria-labelledby="privacy-title" className="py-16 md:py-44">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 id="privacy-title" className="text-[clamp(2.5rem,6.4vw,6rem)] leading-[0.98] font-bold tracking-[-0.05em]">
            Your money
            <br />
            <span className="text-ink-2">stays yours.</span>
          </h2>
        </Reveal>
        <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {POINTS.map(({ icon: Icon, title, body }, i) => (
            <Reveal as="li" key={title} delay={i * 0.06}>
              <span className="grid size-12 place-items-center rounded-full bg-card">
                <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em]">{title}</h3>
              <p className="mt-2 text-[17px] leading-snug text-ink-2">{body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
