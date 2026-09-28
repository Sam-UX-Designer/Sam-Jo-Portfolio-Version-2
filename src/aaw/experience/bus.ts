import { FREE_TASK_KEY } from '../config';

/**
 * How the marketing page talks to the product in the hero.
 *
 * Buttons anywhere on the page ("Try it free", a use case's "Try this goal")
 * ask the command bar to take focus, optionally with a goal filled in. The
 * product's own side navigation asks the page to show a screen in the
 * product preview. Window events keep the two halves independent.
 */

export type PreviewTab = 'home' | 'tools' | 'history';

export const tryGoal = (prompt?: string) =>
  window.dispatchEvent(new CustomEvent<{ prompt?: string }>('aaw:try', { detail: { prompt } }));

export const showPreview = (tab: PreviewTab) =>
  window.dispatchEvent(new CustomEvent<{ tab: PreviewTab }>('aaw:preview', { detail: { tab } }));

/** Whether this browser has already had its one free task. */
export function freeTaskUsed(): boolean {
  try {
    return localStorage.getItem(FREE_TASK_KEY) === '1';
  } catch {
    return false;
  }
}

export function markFreeTaskUsed() {
  try {
    localStorage.setItem(FREE_TASK_KEY, '1');
  } catch {
    // Storage blocked: the gate still holds for the rest of this visit.
  }
  sessionUsed = true;
}

/** Holds for the visit even where storage is blocked. */
let sessionUsed = false;
export const freeTaskSpent = () => sessionUsed || freeTaskUsed();
