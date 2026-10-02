import { useEffect, useRef, useState } from 'react';
import { animate } from 'motion/react';
import Mascot from './Mascot';
import { EASE } from './Motion';

/** Is there room for the intro? Not under Reduce Motion, and not when the
 *  page opens part way down (a reload mid-page or a link to a section). */
export function shouldPlayIntro() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return window.scrollY < 10 && !window.location.hash;
}

interface IntroProps {
  /** The hero copy can start rising in (the screen is fading away). */
  onReveal: () => void;
  /** The mascot and name have landed on the hero's; the intro is gone. */
  onDone: () => void;
}

/**
 * The opening moment. The mascot fills the screen, spinning fast, with the
 * name under it. Then both glide up and shrink onto the hero's own mascot
 * and name, and the page appears around them.
 */
export default function Intro({ onReveal, onDone }: IntroProps) {
  const screen = useRef<HTMLDivElement>(null);
  const mascot = useRef<HTMLDivElement>(null);
  const spin = useRef<HTMLDivElement>(null);
  const name = useRef<HTMLDivElement>(null);
  const [vw] = useState(() => window.innerWidth);
  const [vh] = useState(() => window.innerHeight);

  // Big on every screen: about half the height, never wider than the phone.
  const big = Math.round(Math.min(vh * 0.46, vw * 0.66, 420));
  const font = Math.round(Math.max(30, big * 0.17));

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    let alive = true;

    const run = async () => {
      const markEl = document.querySelector<HTMLElement>('[data-fb-mark="mascot"]');
      const nameEl = document.querySelector<HTMLElement>('[data-fb-mark="name"]');
      if (!markEl || !nameEl || !mascot.current || !spin.current || !name.current || !screen.current) return;

      // Where everything starts: mascot and name stacked in the middle.
      const gap = big * 0.1;
      const total = big + gap + font * 1.2;
      const top = (vh - total) / 2;
      const startMascot = { x: vw / 2, y: top + big / 2 };
      const startName = { x: vw / 2, y: top + big + gap + font * 0.6 };

      const centre = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width };
      };

      // Each piece is laid out at its landing spot; transforms carry it there.
      const place = (el: HTMLElement, at: { x: number; y: number }) => {
        el.style.left = `${at.x}px`;
        el.style.top = `${at.y}px`;
      };
      place(mascot.current, startMascot);
      place(name.current, startName);

      // 1. In: the mascot grows out of the middle, spinning fast.
      const spinning = animate(spin.current, { rotate: [-1440, 0] }, { duration: 2.3, ease: [0.25, 0.6, 0.25, 1] });
      animate(mascot.current, { scale: [0.2, 1], opacity: [0, 1] }, { duration: 0.7, ease: EASE });
      await animate(name.current, { opacity: [0, 1], y: [16, 0] }, { duration: 0.6, delay: 0.45, ease: EASE });
      await new Promise((r) => setTimeout(r, 650));
      if (!alive) return;

      // 2. Up: both glide onto the hero's mascot and name, which are
      //    measured now, once the font has settled.
      await document.fonts?.ready;
      const toMascot = centre(markEl);
      const toName = centre(nameEl);
      const nameScale = toName.w / name.current.getBoundingClientRect().width;
      const move = { duration: 0.95, ease: EASE };
      animate(mascot.current, { x: toMascot.x - startMascot.x, y: toMascot.y - startMascot.y, scale: toMascot.w / big }, move);
      animate(name.current, { x: toName.x - startName.x, y: toName.y - startName.y, scale: nameScale }, move);
      await new Promise((r) => setTimeout(r, 300));
      if (!alive) return;

      // 3. Away: the screen fades and the page rises in around them.
      onReveal();
      await animate(screen.current, { opacity: [1, 0] }, { duration: 0.65, ease: 'easeOut' });
      await spinning;
    };

    run().finally(() => {
      root.style.overflow = '';
      if (alive) onDone();
    });
    return () => {
      alive = false;
      root.style.overflow = '';
    };
    // Runs once, on first load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <div ref={screen} className="absolute inset-0 bg-bg" />
      <div ref={mascot} className="absolute" style={{ width: big, height: big, marginLeft: -big / 2, marginTop: -big / 2, opacity: 0 }}>
        <span className="fb-halo absolute -inset-[30%] rounded-full" />
        <div ref={spin} className="relative">
          <Mascot size={big} shimmer />
        </div>
      </div>
      <div
        ref={name}
        className="absolute -translate-x-1/2 -translate-y-1/2 font-semibold tracking-tight whitespace-nowrap text-ink"
        style={{ fontSize: font, lineHeight: 1.2, opacity: 0 }}
      >
        Finance Buddy
      </div>
    </div>
  );
}
