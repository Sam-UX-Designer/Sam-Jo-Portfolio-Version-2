import { Check } from 'lucide-react';
import { ASSETS, PRO_PLAN } from '../config';
import UiSlot from '../components/UiSlot';
import { CountUp, Drift, Float, Reveal, Words } from '../components/Motion';
import { GetJumbo } from '../components/Buttons';

const count = new Intl.NumberFormat(PRO_PLAN.locale);
const formatCount = (n: number) => count.format(n);

/**
 * Value first, then the product, then credits, then how to start (free), then
 * the action. No prices on the page: visitors start free.
 * DOM order is that story; on desktop the visual moves to the left column.
 */
const Pro: React.FC = () => (
  <section id="pro" aria-labelledby="pro-title" className="border-t border-line py-24 md:py-36">
    <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-14">
      <Reveal className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">JUMBO Pro</p>
        <h2
          id="pro-title"
          className="mt-4 text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
        >
          <Words text="Go deeper when you want more from your data." />
        </h2>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-2">
          For people who want their full history, deeper analysis and more room to ask.
        </p>
        <ul className="mt-8 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
          {PRO_PLAN.value.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[15px] leading-snug text-ink">
              <Check size={18} aria-hidden="true" className="mt-px shrink-0 text-accent" />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="lg:col-span-5 lg:row-span-2 lg:row-start-1 lg:self-center">
        <Drift distance={60} className="mx-auto w-[68%] max-w-[340px] sm:w-[52%] lg:w-full">
          <Float seconds={8}>
            <UiSlot asset={ASSETS.pro} />
          </Float>
        </Drift>
      </div>

      <Reveal className="lg:col-span-6 lg:col-start-7 lg:row-start-2">
        <div className="grid gap-10 border-t border-line pt-10 sm:grid-cols-2">
          <div>
            <p className="text-5xl font-semibold tracking-tight tabular-nums"><CountUp value={PRO_PLAN.credits} format={formatCount} /></p>
            <p className="mt-2 text-sm font-semibold text-ink">AI credits a month</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-3">
              Credits are used when JUMBO analyses your data, meals, trends and questions.
            </p>
          </div>
          <div>
            <p className="text-5xl font-semibold tracking-tight">Free</p>
            <p className="mt-2 text-sm font-semibold text-ink">to start, with {PRO_PLAN.freeCredits} AI credits a month</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-3">
              Daily rings, meal photo analysis and Ask JUMBO are all included. Move to Pro when you want
              more.
            </p>
          </div>
        </div>
        <GetJumbo className="mt-10" />
      </Reveal>
    </div>
  </section>
);

export default Pro;
