import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ASSETS, LINKS } from '../config';

/**
 * The sign-up gate, in the app's own style (the .gate recipe from
 * apps/web/components/auth/SignInGate.tsx).
 *
 * Raised when a visitor tries to go past the one free task: a second goal,
 * saving a result, renaming an agent. Dismissable on the backdrop, on Escape
 * and on its own link, so changing your mind lands you back on the product.
 *
 * Every sign-up option opens the app's own sign-up screen, where Google,
 * Apple and email are offered. No phone number is asked for.
 */

export type GateReason = 'next' | 'running' | 'save' | 'rename';

const TITLE: Record<GateReason, string> = {
  next: 'Your first task is complete.',
  running: 'Your free task is already running.',
  save: 'Create an account to save your work.',
  rename: 'Create an account to name your agents.',
};

const BODY =
  'Create your free AI Agents World account to continue, save your work, connect tools, and unlock your AI workforce.';

export default function Gate({ reason, onClose }: { reason: GateReason; onClose: () => void }) {
  const first = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    first.current?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(
    <div className="aw-ui">
      <div
        className="gate"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gate-title"
        aria-describedby="gate-body"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="gate__card glass">
          <img src={ASSETS.logo} alt="" aria-hidden="true" width={44} height={44} />
          <h2 id="gate-title" className="gate__title">
            {TITLE[reason]}
          </h2>
          <p id="gate-body" className="gate__body">
            {BODY}
          </p>

          <div className="gate__actions">
            <a ref={first} className="btn btn--ghost gate__go" href={LINKS.signUp}>
              <GoogleMark />
              Continue with Google
            </a>
            <a className="btn btn--ghost gate__go" href={LINKS.signUp}>
              <AppleMark />
              Continue with Apple
            </a>
            <a className="btn btn--ghost gate__go" href={LINKS.signUp}>
              <MailMark />
              Continue with email
            </a>
          </div>

          <p className="gate__body" style={{ fontSize: 12.5 }}>
            Already have an account?{' '}
            <a href={LINKS.signIn} style={{ color: 'var(--color-accent-soft)' }}>
              Sign in
            </a>
          </p>

          <button className="gate__back" onClick={onClose}>
            Keep looking around
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/** Google's own mark, as the app's sign-in screen draws it. */
function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
      <path fill="#4285F4" d="M23 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.16a5.27 5.27 0 0 1-2.29 3.46v2.87h3.7C21.72 18.84 23 15.86 23 12.27Z" />
      <path fill="#34A853" d="M12 23.5c3.1 0 5.7-1.03 7.6-2.79l-3.71-2.87c-1.03.69-2.35 1.1-3.89 1.1-2.99 0-5.52-2.02-6.43-4.73H1.73v2.96A11.48 11.48 0 0 0 12 23.5Z" />
      <path fill="#FBBC05" d="M5.57 14.21a6.9 6.9 0 0 1 0-4.41V6.84H1.73a11.5 11.5 0 0 0 0 10.33l3.84-2.96Z" />
      <path fill="#EA4335" d="M12 5.07c1.69 0 3.2.58 4.39 1.72l3.29-3.29C17.7 1.6 15.1.5 12 .5 7.53.5 3.67 3.07 1.73 6.84l3.84 2.96C6.48 7.09 9.01 5.07 12 5.07Z" />
    </svg>
  );
}

/** Apple's mark, as the app's sign-in screen draws it. */
function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M16.36 12.62c-.02-2.2 1.79-3.26 1.87-3.31-1.02-1.49-2.6-1.7-3.17-1.72-1.35-.14-2.63.79-3.32.79-.68 0-1.74-.77-2.86-.75-1.47.02-2.83.85-3.59 2.16-1.53 2.65-.39 6.58 1.1 8.73.73 1.05 1.6 2.23 2.75 2.19 1.1-.05 1.52-.71 2.85-.71 1.33 0 1.71.71 2.87.69 1.19-.02 1.94-1.07 2.66-2.13.84-1.22 1.19-2.4 1.21-2.46-.03-.01-2.32-.89-2.34-3.52M14.2 6.2c.6-.74 1.01-1.75.9-2.77-.87.04-1.93.58-2.56 1.31-.56.65-1.05 1.69-.92 2.68.97.08 1.96-.49 2.58-1.22" />
    </svg>
  );
}

function MailMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
