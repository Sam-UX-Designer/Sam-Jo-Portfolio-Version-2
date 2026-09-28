import { useCallback, useEffect, useState } from 'react';

export type ThemeChoice = 'dark' | 'light' | 'system';
export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'aaw-theme';
const LIGHT = '(prefers-color-scheme: light)';

const systemTheme = (): Theme => (window.matchMedia(LIGHT).matches ? 'light' : 'dark');

function readChoice(): ThemeChoice {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    // Storage blocked: follow the system.
  }
  return 'system';
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bg);
}

/**
 * Dark, Light or System. The first paint is set by the inline script in
 * ai-agents-world/index.html, so there is no flash; System keeps following
 * the device when it changes.
 */
export function useTheme() {
  const [choice, setChoice] = useState<ThemeChoice>(readChoice);
  const [system, setSystem] = useState<Theme>(systemTheme);
  const theme: Theme = choice === 'system' ? system : choice;

  useEffect(() => {
    apply(theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia(LIGHT);
    const onChange = () => setSystem(mq.matches ? 'light' : 'dark');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const choose = useCallback((next: ThemeChoice) => {
    setChoice(next);
    try {
      if (next === 'system') localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage blocked: the choice lasts for this visit.
    }
  }, []);

  return { choice, theme, choose };
}
