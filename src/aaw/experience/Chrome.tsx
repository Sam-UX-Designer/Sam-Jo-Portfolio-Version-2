import { useEffect, useRef, useState } from 'react';
import { ASSETS, LINKS } from '../config';
import { showPreview, type PreviewTab } from './bus';

/**
 * The app's chrome for a guest (apps/web/components/world/Chrome.tsx): the
 * brand, Home / Tools / History, and search, notifications and Sign in at the
 * top right. A guest has no account, so there is no profile and no avatar,
 * exactly as in the app.
 *
 * Home is this screen. Tools and History open the product preview further
 * down the page, on that screen.
 */

const NAV: { tab: PreviewTab; label: string; icon: () => React.ReactElement }[] = [
  { tab: 'home', label: 'Home', icon: HomeIcon },
  { tab: 'tools', label: 'Tools', icon: ToolsIcon },
  { tab: 'history', label: 'History', icon: HistoryIcon },
];

export default function Chrome() {
  return (
    <>
      <div className="brand">
        <img className="brand__mark" src={ASSETS.logo} alt="" aria-hidden="true" width={38} height={38} draggable={false} />
        <span className="brand__text">
          <strong>AI Agents World</strong>
          <em>Think it. Delegate it. Get it done.</em>
        </span>
      </div>

      <nav className="sidenav" aria-label="AI Agents World">
        {NAV.map(({ tab, label, icon: Icon }) => (
          <a
            key={tab}
            href={tab === 'home' ? '#top' : '#preview'}
            className="sidenav__item"
            data-active={tab === 'home'}
            aria-current={tab === 'home' ? 'page' : undefined}
            onClick={(e) => {
              if (tab === 'home') {
                e.preventDefault();
                return;
              }
              showPreview(tab);
            }}
          >
            <Icon />
            <span>{label}</span>
          </a>
        ))}
      </nav>

      <TopRight />
    </>
  );
}

type Panel = 'search' | 'bell' | null;

function TopRight() {
  const [open, setOpen] = useState<Panel>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    const onDown = (e: MouseEvent) => !wrap.current?.contains(e.target as Node) && setOpen(null);
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onDown);
    };
  }, [open]);

  const toggle = (panel: Panel) => setOpen((o) => (o === panel ? null : panel));

  return (
    <div className="topright" ref={wrap}>
      <button className="iconbtn glass" aria-label="Search" aria-expanded={open === 'search'} onClick={() => toggle('search')}>
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      <button className="iconbtn glass" aria-label="Notifications" aria-expanded={open === 'bell'} onClick={() => toggle('bell')}>
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
          <path d="M18 15V10a6 6 0 1 0-12 0v5l-1.5 2.5h15L18 15Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M10 20a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </button>

      <a href={LINKS.signIn} className="btn btn--primary chrome__signin">
        Sign in
      </a>

      {open === 'search' && (
        <div className="pop lg" role="dialog" aria-label="Search">
          <p className="pop__empty">No goals yet. Ask for something below.</p>
        </div>
      )}
      {open === 'bell' && (
        <div className="pop lg" role="dialog" aria-label="Notifications">
          <p className="pop__head">Notifications</p>
          <p className="pop__empty">Nothing needs you right now.</p>
        </div>
      )}
    </div>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
