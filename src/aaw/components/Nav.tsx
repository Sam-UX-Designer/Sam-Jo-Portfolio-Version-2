import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowLeft, ChevronDown, Menu, Monitor, Moon, Sun, X } from 'lucide-react';
import { ASSETS, LINKS } from '../config';
import { tryGoal } from '../experience/bus';
import type { ThemeChoice } from '../lib/theme';

export const NAV_LINKS = [
  { label: 'Product', href: '#product' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Tools', href: '#tools' },
  { label: 'Security', href: '#security' },
];

export const RESOURCES = [
  { label: 'Open the app', href: LINKS.app, external: true },
  { label: 'Product preview', href: '#preview', external: false },
  { label: 'Back to Sam’s projects', href: LINKS.portfolio, external: false },
];

const THEMES: { value: ThemeChoice; label: string; icon: typeof Sun }[] = [
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'system', label: 'System', icon: Monitor },
];

function ThemeSwitch({ choice, onChoose }: { choice: ThemeChoice; onChoose: (c: ThemeChoice) => void }) {
  return (
    <div role="radiogroup" aria-label="Theme" className="flex h-9 items-center rounded-full border border-line p-0.5">
      {THEMES.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          role="radio"
          aria-checked={choice === value}
          aria-label={label}
          title={label}
          onClick={() => onChoose(value)}
          className={`grid size-8 place-items-center rounded-full transition-colors duration-200 ${
            choice === value ? 'bg-accent-soft text-accent-text' : 'text-ink-3 hover:text-ink'
          }`}
        >
          <Icon size={15} strokeWidth={1.8} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}

function Resources() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !wrap.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={wrap} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex h-9 items-center gap-1 rounded-full px-3 text-sm text-ink-2 transition-colors hover:text-ink"
      >
        Resources
        <ChevronDown size={14} aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul className="aw-glass absolute top-full left-1/2 mt-2 w-60 -translate-x-1/2 rounded-2xl p-1.5">
          {RESOURCES.map((r) => (
            <li key={r.label}>
              <a
                href={r.href}
                onClick={() => setOpen(false)}
                {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="block rounded-xl px-3 py-2.5 text-sm text-ink-2 transition-colors hover:bg-accent-soft hover:text-ink"
              >
                {r.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * One line, 64px, part of the page rather than a bar on top of it: brand on
 * the left, the page's sections in the centre, actions on the right. At the
 * top of the page it has no fill and no edge. Once the page scrolls under it,
 * it takes the page's own colour and a hairline, so text never runs behind
 * the links.
 */
export default function Nav({ choice, onChoose }: { choice: ThemeChoice; onChoose: (c: ThemeChoice) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8));

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="fixed inset-x-0 top-0 z-40 border-b border-transparent transition-[background-color,border-color] duration-300 data-[scrolled]:border-line data-[scrolled]:bg-bg/90 data-[scrolled]:backdrop-blur-xl"
    >
      <nav
        aria-label="AI Agents World website"
        className="mx-auto flex h-16 max-w-[1320px] items-center gap-2 px-3 sm:px-6 xl:grid xl:grid-cols-[1fr_auto_1fr]"
      >
        <div className="flex min-w-0 items-center gap-2">
          <a
            href={LINKS.portfolio}
            aria-label="Back to Sam’s projects"
            className="-ml-1 grid size-9 shrink-0 place-items-center rounded-full text-ink-3 transition-colors hover:text-ink"
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </a>
          <a href="#top" aria-label="AI Agents World, top of page" className="flex shrink-0 items-center gap-2.5 pr-1">
            <img
              src={ASSETS.logo}
              alt=""
              width={30}
              height={30}
              className="size-[30px]"
              style={{ viewTransitionName: 'aaw-mark' }}
            />
            <span className="hidden text-[15px] font-semibold tracking-tight min-[400px]:inline">AI Agents World</span>
          </a>
        </div>

        <div className="hidden items-center gap-0.5 xl:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-3 py-2 text-sm text-ink-2 transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
          <Resources />
        </div>

        <div className="ml-auto flex items-center justify-end gap-1.5 sm:gap-2 xl:ml-0">
          <div className="hidden md:block">
            <ThemeSwitch choice={choice} onChoose={onChoose} />
          </div>
          <a href={LINKS.signIn} className="hidden rounded-full px-3 py-2 text-sm font-medium text-ink-2 transition-colors hover:text-ink sm:block">
            Sign In
          </a>
          <button
            onClick={() => tryGoal()}
            className="h-10 rounded-full bg-accent px-3.5 text-sm font-semibold whitespace-nowrap text-accent-ink sm:px-4 transition-[background-color,transform] duration-200 hover:bg-accent-press active:scale-[0.98]"
          >
            Try for Free
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="aaw-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-10 place-items-center rounded-full text-ink-2 hover:text-ink xl:hidden"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="aaw-menu" className="aw-glass mx-3 mt-2 rounded-3xl bg-surface/95 p-3 xl:hidden">
          <ul className="grid gap-0.5">
            {[...NAV_LINKS, ...RESOURCES.map((r) => ({ label: r.label, href: r.href, external: r.external }))].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  {...('external' in l && l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="block rounded-2xl px-4 py-3 text-[15px] text-ink-2 hover:bg-accent-soft hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between border-t border-line px-2 pt-3">
            <a href={LINKS.signIn} className="px-2 py-2 text-[15px] font-medium text-ink-2">
              Sign In
            </a>
            <ThemeSwitch choice={choice} onChoose={onChoose} />
          </div>
        </div>
      )}
    </header>
  );
}
