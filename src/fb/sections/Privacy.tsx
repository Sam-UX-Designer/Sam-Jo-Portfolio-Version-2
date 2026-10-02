import { KeyRound, Lock, ShieldCheck, Trash2 } from 'lucide-react';
import Phone from '../components/Phone';
import { Reveal } from '../components/Motion';

const POINTS = [
  {
    icon: ShieldCheck,
    title: 'Consent first',
    body: 'Access comes through India’s RBI-regulated Account Aggregator network, only for the accounts you approve.',
  },
  { icon: KeyRound, title: 'No bank passwords', body: 'Finance Buddy never asks for them.' },
  {
    icon: Lock,
    title: 'Encrypted, never used for training',
    body: 'Sensitive data is encrypted, and your financial data isn’t used to train AI models.',
  },
  { icon: Trash2, title: 'Yours to delete', body: 'Stop sharing, or delete your account, at any time.' },
];

export default function Privacy() {
  return (
    <section id="privacy" aria-labelledby="privacy-title" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 id="privacy-title" className="text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.06] font-bold tracking-[-0.03em]">
              Your money stays yours.
            </h2>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-ink-2">
              You see exactly what is shared and for how long, before anything connects.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {POINTS.map(({ icon: Icon, title, body }, i) => (
              <Reveal as="li" key={title} delay={(i % 2) * 0.05}>
                <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em]">{title}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-ink-2">{body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal className="lg:col-span-5" delay={0.08}>
          <Phone screen="consent" className="mx-auto w-[min(290px,70vw)]" />
        </Reveal>
      </div>
    </section>
  );
}
