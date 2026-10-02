import { Reveal } from '../components/Motion';

const FACTS = [
  {
    label: 'App',
    lead: 'iOS, Android and the web',
    body: 'One codebase in Expo and React Native, written in TypeScript.',
  },
  {
    label: 'Backend',
    lead: 'Vercel and Supabase',
    body: 'An API on Vercel and a Postgres database with secure database rules.',
  },
  {
    label: 'Finance engine',
    lead: '35 automated tests pass',
    body: 'Super Intelligence answers come from a tested calculation engine, so numbers are computed, not guessed.',
  },
  {
    label: 'Status',
    lead: 'Live, end to end',
    body: 'The demo runs on sample data. Real bank connections need a licensed partner; the app is designed for one, not switched on yet.',
  },
];

export default function Built() {
  return (
    <section id="built" aria-labelledby="built-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-3xl">
          <h2 id="built-title" className="text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.06] font-bold tracking-[-0.03em]">
            How it was built
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-2 sm:text-xl">Designed by Sam. Built with Claude Code.</p>
        </Reveal>
        <dl className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {FACTS.map((f, i) => (
            <Reveal key={f.label} delay={(i % 2) * 0.05} className="rounded-[20px] bg-card p-7 sm:p-8">
              <dt className="text-[15px] font-medium text-ink-2">{f.label}</dt>
              <dd className="mt-3">
                <span className="block text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-semibold tracking-[-0.025em]">
                  {f.lead}
                </span>
                <span className="mt-3 block max-w-[48ch] text-base leading-relaxed text-ink-2">{f.body}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
