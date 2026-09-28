import { useEffect, useId, useRef, useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'motion/react';
import { ASSETS, LINKS } from '../config';
import type { PreviewTab } from '../experience/bus';
import { EASE, Reveal } from '../components/Motion';
import { H2, SECTION, WRAP } from '../components/type';

const TABS: { id: PreviewTab; label: string; line: string }[] = [
  { id: 'home', label: 'Home', line: 'Direct the workforce, and open any agent to see its task, instructions and tools.' },
  { id: 'tools', label: 'Tools', line: 'Connect its tools, and see what each one lets your agents do.' },
  { id: 'history', label: 'History', line: 'Understand the work it completed: every goal, agent, tool and result.' },
];

/**
 * Real screenshots of the three screens the app has, in a window. The
 * product's own side navigation in the hero opens this on Tools or History.
 */
export default function Preview() {
  const [tab, setTab] = useState<PreviewTab>('home');
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const base = useId();

  useEffect(() => {
    const onPreview = (e: Event) => {
      setTab((e as CustomEvent<{ tab: PreviewTab }>).detail.tab);
      section.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    };
    window.addEventListener('aaw:preview', onPreview);
    return () => window.removeEventListener('aaw:preview', onPreview);
  }, [reduce]);

  const shot = ASSETS.screens[tab]; // home, tools or history; never the See the work shot

  return (
    <section ref={section} id="preview" aria-labelledby="preview-title" className={`${SECTION} overflow-hidden`}>
      <div aria-hidden="true" className="aw-atmos pointer-events-none absolute inset-0" />
      <div className={`${WRAP} relative`}>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 id="preview-title" className={H2}>
            Home, Tools and History.
          </h2>
          <p className="mx-auto mt-5 max-w-[56ch] text-lg leading-relaxed text-ink-2">
            One place to direct your AI workforce, connect its tools, and understand the work it completed.
          </p>
        </Reveal>

        <div role="tablist" aria-label="Screens" className="mx-auto mt-10 flex w-fit rounded-full border border-line p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              id={`${base}-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`${base}-panel`}
              onClick={() => setTab(t.id)}
              className={`h-10 rounded-full px-5 text-sm font-semibold transition-colors duration-200 ${
                tab === t.id ? 'bg-accent text-accent-ink' : 'text-ink-2 hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="mt-4 text-center text-[15px] text-ink-3" aria-live="polite">
          {TABS.find((t) => t.id === tab)!.line}
        </p>

        <Reveal className="mt-8">
          <div
            id={`${base}-panel`}
            role="tabpanel"
            aria-labelledby={`${base}-${tab}`}
            className="aw-frame overflow-hidden rounded-[22px] bg-[#04070D] sm:rounded-[28px]"
          >
            <div className="flex h-10 items-center gap-2 border-b border-white/10 bg-[#0b1322] px-4" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="mx-auto truncate rounded-full bg-white/5 px-4 py-1 text-[12px] text-white/55">
                {new URL(LINKS.app).host}
              </span>
            </div>
            <div className="relative aspect-[16/10]">
              <AnimatePresence initial={false}>
                <m.img
                  key={tab}
                  src={shot.src}
                  alt={shot.alt}
                  width={2400}
                  height={1500}
                  loading="lazy"
                  initial={reduce ? false : { opacity: 0, scale: 1.01 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
        <p className="mt-4 text-center text-[13px] text-ink-3">Screens from the running app, in a demo workspace.</p>
      </div>
    </section>
  );
}
