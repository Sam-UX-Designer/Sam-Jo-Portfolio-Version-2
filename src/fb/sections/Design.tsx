import { Accessibility, Smartphone, Smile } from 'lucide-react';
import Mascot from '../components/Mascot';
import { Reveal } from '../components/Motion';

const POINTS = [
  {
    icon: Smartphone,
    title: 'Feels native',
    body: 'A floating glass tab bar with a sliding lens, a sidebar on desktop, haptics on the phone, and light and dark mode.',
  },
  {
    icon: Smile,
    title: 'A mascot with personality',
    body: 'It floats, blinks and gives a happy little shake. It stays still for anyone who turns on Reduce Motion.',
  },
  {
    icon: Accessibility,
    title: 'Accessible',
    body: 'Screen-reader labels, large touch targets, and Reduce Motion and Reduce Transparency respected throughout.',
  },
];

/** Design details, with the mascot itself to play with. */
export default function Design() {
  return (
    <section id="design" aria-labelledby="design-title" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <Reveal className="flex flex-col items-center lg:col-span-5">
          <div className="relative grid place-items-center">
            <span aria-hidden="true" className="fb-halo absolute -inset-10 rounded-full" />
            <Mascot size={208} interactive className="relative" />
          </div>
          <p className="mt-8 text-[15px] text-ink-2">Tap the mascot to say hello.</p>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <h2 id="design-title" className="text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.06] font-bold tracking-[-0.03em]">
              Designed to feel at home on your phone.
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-8">
            {POINTS.map(({ icon: Icon, title, body }, i) => (
              <Reveal as="li" key={title} delay={i * 0.05} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-card">
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.01em]">{title}</h3>
                  <p className="mt-1.5 max-w-[52ch] text-base leading-relaxed text-ink-2">{body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
