import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'fb-theme';

const readTheme = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#000000' : '#F2F2F7');
};

/**
 * Light or dark, like the app. The first paint is set by the inline script in
 * finance-buddy/index.html (saved choice, else the system setting), so there
 * is no flash. Until the visitor picks one, the page follows the system.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(STORAGE_KEY);
      } catch {
        /* storage blocked: keep following the system */
      }
      if (!saved) setTheme(mq.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage blocked: the choice lasts for this visit */
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
