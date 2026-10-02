import { m, useReducedMotion, useTransform, type MotionValue } from 'motion/react';

/** One app pixel, in the phone's container units (the screen is 95.2% of it). */
const PX = 95.2 / 390;

/* The Home bank cards, captured one by one from the app (all accounts, then
   one per bank), drawn exactly over the card on the Home screen so they can
   swipe while the page scrolls. Geometry is the card's place on the 390 x 844
   screen: x 20, y 90, 350 x 189; the page dots sit at y 291. */
const CARDS = [
  'All accounts',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'State Bank of India',
];
const src = (i: number, t: 'light' | 'dark') => `/assets/finance-buddy/cards/card-${i}-${t}.webp`;

function Card({ i, index }: { i: number; index: MotionValue<number> }) {
  // Distance from the card in the middle: 0 when centred.
  const d = useTransform(index, (v) => i - v);
  const x = useTransform(d, (v) => `${v * 104}%`);
  const rotateY = useTransform(d, (v) => Math.max(-35, Math.min(35, v * -28)));
  const scale = useTransform(d, (v) => 1 - Math.min(1, Math.abs(v)) * 0.06);
  // The shine sweeps across while the card moves, like tilting the phone.
  const shine = useTransform(d, (v) => `${50 + v * 160}%`);
  return (
    <m.div
      style={{ x, rotateY, scale, borderRadius: '6.3% / 11.6%' }}
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <img src={src(i, 'light')} alt="" className="fb-light-only absolute inset-0 h-full w-full" loading="lazy" />
      <img src={src(i, 'dark')} alt="" className="fb-dark-only absolute inset-0 h-full w-full" loading="lazy" />
      <m.span
        style={{ backgroundPositionX: shine }}
        className="absolute inset-0 bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.45)_50%,transparent_65%)] bg-[length:250%_100%] mix-blend-soft-light"
      />
    </m.div>
  );
}

function Dot({ i, index }: { i: number; index: MotionValue<number> }) {
  const on = useTransform(index, (v) => Math.max(0, 1 - Math.abs(i - v)));
  const width = useTransform(on, (v) => `${(6 + v * 12) * PX}cqw`);
  const opacity = useTransform(on, (v) => 0.3 + v * 0.7);
  return <m.span style={{ width, opacity, height: `${6 * PX}cqw` }} className="rounded-full bg-ink" />;
}

/**
 * The swiping bank cards for the "See everything at once" step. `index` runs
 * from 0 (all accounts) to 4 (the last bank) as the visitor scrolls.
 */
export default function CardStrip({ index }: { index: MotionValue<number> }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <>
      {/* Hides the screenshot's own card, so only the swiping cards show. */}
      <div
        aria-hidden="true"
        className="absolute bg-bg"
        style={{ left: 0, right: 0, top: `${(86 / 844) * 100}%`, height: `${(197 / 844) * 100}%` }}
      />
      <div
        className="absolute [perspective:900px]"
        style={{ left: `${(20 / 390) * 100}%`, top: `${(90 / 844) * 100}%`, width: `${(350 / 390) * 100}%`, height: `${(189 / 844) * 100}%` }}
      >
        {CARDS.map((name, i) => (
          <Card key={name} i={i} index={index} />
        ))}
      </div>
      {/* Fresh page dots over the screen's own, which only know one card. */}
      <div
        aria-hidden="true"
        className="absolute flex items-center justify-center bg-bg"
        style={{ left: '35%', width: '30%', top: `${(286 / 844) * 100}%`, height: `${(16 / 844) * 100}%`, gap: `${6 * PX}cqw` }}
      >
        {CARDS.map((name, i) => (
          <Dot key={name} i={i} index={index} />
        ))}
      </div>
    </>
  );
}
