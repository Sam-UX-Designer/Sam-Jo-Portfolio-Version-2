import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { BRAND_MARK, LINKS } from '../config';
import type { Theme } from '../lib/hooks';
import { GetJumbo } from './Buttons';

const LINKS_IN_PAGE = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Product', href: '#today' },
  { label: 'Privacy', href: '#control' },
  { label: 'Pro', href: '#pro' },
];

interface JumboNavProps {
  theme: Theme;
  onToggleTheme: () => void;
}

const JumboNav: React.FC<JumboNavProps> = ({ theme, onToggleTheme }) => {
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-4 sm:pt-4">
      <nav
        aria-label="JUMBO"
        className="jb-glass mx-auto flex h-14 max-w-[780px] items-center rounded-full px-1.5"
      >
        <a
          href={LINKS.portfolio}
          aria-label="Back to Sam's projects"
          className="flex h-11 shrink-0 items-center gap-1.5 rounded-full px-3 text-ink-2 transition-colors duration-200 hover:text-ink"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span aria-hidden="true" className="hidden text-[13px] font-bold sm:inline">
            SAM'S<span className="text-[#1683FF]">®</span>
          </span>
        </a>

        <span aria-hidden="true" className="h-5 w-px shrink-0 bg-line-strong" />

        <a href="#top" className="flex h-11 shrink-0 items-center gap-2 rounded-full px-2.5">
          <img
            src={BRAND_MARK}
            alt=""
            width={28}
            height={28}
            className="size-7 rounded-[8px]"
            style={{ viewTransitionName: 'jumbo-mark' }}
          />
          <span translate="no" className="text-[15px] font-bold tracking-tight text-ink">
            JUMBO
          </span>
        </a>

        <ul className="ml-auto hidden items-center lg:flex">
          {LINKS_IN_PAGE.map((link) => (
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

        <div className="ml-auto flex shrink-0 items-center gap-1 lg:ml-1">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${next} theme`}
            className="grid size-11 place-items-center rounded-full text-ink-2 transition-[color,background-color] duration-200 hover:bg-surface-2 hover:text-ink"
          >
            {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <GetJumbo size="sm" />
        </div>
      </nav>
    </header>
  );
};

export default JumboNav;
