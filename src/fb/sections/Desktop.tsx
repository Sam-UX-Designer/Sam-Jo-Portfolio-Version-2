import { useId, useState } from 'react';
import { m } from 'motion/react';
import { DESKTOP, desktopSrc, type DesktopId } from '../config';
import { useMedia, useScene, useScrub } from '../lib/scene';

/**
 * Scene 7. The web app grows from a small window to fill the screen as the
 * visitor scrolls, with a tab for each of its five screens. On phones it is a
 * plain section: the window is small there, so pinning it only left space.
 */
export default function Desktop() {
  const { ref, progress } = useScene<HTMLElement>();
  const [shot, setShot] = useState<DesktopId>('home');
  const base = useId();
  const ids = Object.keys(DESKTOP) as DesktopId[];

  const still = !useMedia('(min-width: 1024px)');
  const scale = useScrub(progress, [0, 0.6], [0.62, 1], 1, still);
  const radius = useScrub(progress, [0, 0.6], [36, 18], 12, still);
  const titleOpacity = useScrub(progress, [0.35, 0.6], [1, 0.0], 1, still);

  return (
    <section ref={ref} id="desktop" aria-labelledby="desktop-title" className="relative py-20 lg:h-[220vh] lg:py-0">
      <div className="flex flex-col items-center px-5 sm:px-8 lg:sticky lg:top-0 lg:h-[100dvh] lg:justify-center lg:overflow-hidden lg:pt-20">
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
          className="relative mt-8 aspect-[16/10] w-full lg:w-[min(100%,calc((100dvh-19rem)*1.6),1100px)] origin-center overflow-hidden bg-muted shadow-[var(--shadow-phone)] ring-1 ring-line"
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

        <div
          role="tablist"
          aria-label="Desktop screens"
          className="relative z-10 mt-5 flex max-w-full overflow-x-auto rounded-full bg-muted p-1 [scrollbar-width:none]"
        >
          {ids.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-label={DESKTOP[id].label}
              id={`${base}-${id}`}
              aria-selected={shot === id}
              aria-controls={`${base}-panel`}
              onClick={() => setShot(id)}
              className={`h-10 shrink-0 rounded-full px-3.5 text-sm sm:px-4 font-semibold whitespace-nowrap transition-colors duration-200 ${
                shot === id ? 'bg-card text-ink shadow-sm' : 'text-ink-2 hover:text-ink'
              }`}
            >
              {DESKTOP[id].short ? (
                <>
                  <span className="sm:hidden">{DESKTOP[id].short}</span>
                  <span className="max-sm:hidden">{DESKTOP[id].label}</span>
                </>
              ) : (
                DESKTOP[id].label
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
