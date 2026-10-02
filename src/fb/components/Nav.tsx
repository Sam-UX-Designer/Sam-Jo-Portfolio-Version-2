import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { ART, LINKS } from '../config';
import type { Theme } from '../lib/theme';
import { TryDemo } from './Buttons';

const IN_PAGE = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Privacy', href: '#privacy' },
];

/**
 * A floating glass bar, the shape of the app's own tab bar. Back to Sam's
 * projects on the left, the sections in the middle, theme and the live demo
 * on the right. On phones it keeps only the essentials.
 */
export default function Nav({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-4 sm:pt-4">
      <nav aria-label="Finance Buddy" className="fb-glass mx-auto flex h-14 max-w-[880px] items-center rounded-full px-1.5">
        <a
          href={LINKS.portfolio}
          aria-label="Back to Sam's projects"
          className="flex h-11 shrink-0 items-center gap-1.5 rounded-full px-3 text-ink-2 transition-colors duration-200 hover:text-ink"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span aria-hidden="true" className="hidden text-[13px] font-bold sm:inline">
            SAM’S<span className="text-[#1683FF]">®</span>
          </span>
        </a>

        <span aria-hidden="true" className="h-5 w-px shrink-0 bg-line" />

        <a href="#top" className="flex h-11 shrink-0 items-center gap-2 rounded-full px-2.5">
          <img
            src={ART.mascotSmall}
            alt=""
            width={28}
            height={28}
            className="size-7"
            style={{ viewTransitionName: 'fb-mark' }}
          />
          <span translate="no" className="text-[15px] font-semibold tracking-tight text-ink">
            Finance Buddy
          </span>
        </a>

        <ul className="mx-auto hidden items-center lg:flex">
          {IN_PAGE.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="flex h-11 items-center rounded-full px-3 text-[13px] font-medium text-ink-2 transition-colors duration-200 hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex shrink-0 items-center gap-1 lg:ml-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${next} mode`}
            className="grid size-11 place-items-center rounded-full text-ink-2 transition-[color,background-color] duration-200 hover:bg-muted hover:text-ink"
          >
            {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <span className="hidden sm:block">
            <TryDemo size="sm" label="Live demo" />
          </span>
        </div>
      </nav>
    </header>
  );
}
