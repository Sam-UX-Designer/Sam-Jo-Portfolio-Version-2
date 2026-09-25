import { Check } from 'lucide-react';
import { ASSETS, PRO_PLAN } from '../config';
import UiSlot from '../components/UiSlot';
import { Drift, Reveal } from '../components/Motion';
import { GetJumbo } from '../components/Buttons';

const money = new Intl.NumberFormat(PRO_PLAN.locale, {
  style: 'currency',
  currency: PRO_PLAN.currency,
  maximumFractionDigits: 0,
});
const count = new Intl.NumberFormat(PRO_PLAN.locale);

// Worked out from the two prices, so the claim can never drift from them.
const saving = Math.round(((PRO_PLAN.monthly * 12 - PRO_PLAN.yearly) / (PRO_PLAN.monthly * 12)) * 100);

/**
 * Value first, then the product, then credits, then price, then the action.
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
          Go deeper when you want more from your data.
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
        <Drift distance={60} className="mx-auto max-w-[460px]">
          <UiSlot asset={ASSETS.pro} />
        </Drift>
      </div>

      <Reveal className="lg:col-span-6 lg:col-start-7 lg:row-start-2">
        <div className="grid gap-10 border-t border-line pt-10 sm:grid-cols-2">
          <div>
            <p className="text-5xl font-semibold tracking-tight tabular-nums">{count.format(PRO_PLAN.credits)}</p>
            <p className="mt-2 text-sm font-semibold text-ink">AI credits a month</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-3">
              Credits are used when JUMBO analyses your data, meals, trends and questions.
            </p>
          </div>
          <div>
            <p className="text-5xl font-semibold tracking-tight tabular-nums">
              {money.format(PRO_PLAN.monthly)}
              <span className="text-lg font-medium text-ink-3"> / month</span>
            </p>
            <p className="mt-2 text-sm font-semibold text-ink">
              or {money.format(PRO_PLAN.yearly)} a year, save {saving}%
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-3">
              Not ready for Pro? JUMBO Free includes {PRO_PLAN.freeCredits} AI credits a month.
            </p>
          </div>
        </div>
        <GetJumbo className="mt-10" />
      </Reveal>
    </div>
  </section>
);

export default Pro;
