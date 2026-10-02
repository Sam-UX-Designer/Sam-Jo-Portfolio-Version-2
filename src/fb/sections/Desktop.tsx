import { useId, useState } from 'react';
import { m } from 'motion/react';
import { DESKTOP, desktopSrc, type DesktopId } from '../config';
import { useScene, useScrub } from '../lib/scene';

/**
 * Scene 7. The web app grows from a small window to fill the screen as the
 * visitor scrolls, with a switch between two of its screens.
 */
export default function Desktop() {
  const { ref, progress } = useScene<HTMLElement>();
  const [shot, setShot] = useState<DesktopId>('home');
  const base = useId();
  const ids = Object.keys(DESKTOP) as DesktopId[];

  const scale = useScrub(progress, [0, 0.6], [0.62, 1], 1);
  const radius = useScrub(progress, [0, 0.6], [36, 18], 18);
  const titleOpacity = useScrub(progress, [0.35, 0.6], [1, 0.0], 1);

  return (
    <section ref={ref} id="desktop" aria-labelledby="desktop-title" className="relative h-[220vh]">
      <div className="sticky top-0 flex h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 pt-20 sm:px-8">
        <m.div style={{ opacity: titleOpacity }} className="text-center">
          <h2 id="desktop-title" className="text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[1] font-bold tracking-[-0.045em]">
            Big screen, too.
          </h2>
          <p className="mt-4 text-lg text-ink-2 sm:text-xl">A real web app with a sidebar, not a stretched phone screen.</p>
        </m.div>

        <m.div
          id={`${base}-panel`}
          role="tabpanel"
          aria-labelledby={`${base}-${shot}`}
          style={{ scale, borderRadius: radius }}
          className="relative mt-8 aspect-[16/10] w-[min(100%,calc((100dvh-19rem)*1.6),1100px)] origin-center overflow-hidden bg-muted shadow-[var(--shadow-phone)] ring-1 ring-line"
        >
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
        </m.div>

        <div role="tablist" aria-label="Desktop screens" className="relative z-10 mt-5 flex rounded-full bg-muted p-1">
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
    </section>
  );
}
