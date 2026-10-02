/**
 * Finance Buddy project page: links, artwork and screens.
 *
 * Every screen is a real capture of the app running on its sample data:
 * phone at 390 x 844 (2x), desktop at 1440 x 900 (2x, resized). Each one
 * exists in light and dark, taken at the same moment, so the numbers
 * match when the theme changes. Files live in public/assets/finance-buddy/.
 */

export const LINKS = {
  demo: 'https://finance-buddy-theta.vercel.app',
  portfolio: '/#projects',
};

const A = '/assets/finance-buddy';

export const ART = {
  /** The mascot's body without its face; the face is drawn on top so it can move. */
  mascotBody: `${A}/mascot-body.webp`,
  /** The full mascot, static: small uses and Reduce Motion. */
  mascot: `${A}/mascot-512.webp`,
  mascotSmall: `${A}/mascot-128.webp`,
};

export type ScreenId =
  | 'signin'
  | 'consent'
  | 'aha'
  | 'home'
  | 'card'
  | 'customise'
  | 'activity'
  | 'calendar'
  | 'si'
  | 'si-answer'
  | 'si-why'
  | 'si-history'
  | 'si-setup'
  | 'wealth'
  | 'plan'
  | 'forecast';

/** Alt text describes what the screen shows, not how it looks. */
export const SCREENS: Record<ScreenId, string> = {
  signin: 'Finance Buddy sign-in screen with the mascot: your money, all in one place',
  consent: 'Approving access to seven accounts, with what is shared and why',
  aha: 'Net worth revealed after connecting accounts, with three things Super Intelligence already found',
  home: 'Finance Buddy home screen: greeting, total balance card and today’s spending',
  card: 'An HDFC Bank card on Home after swiping through the bank cards',
  customise: 'Customising Home: cards can be moved or hidden, with updated cards shown first',
  activity: 'Transactions list with merchant logos, search and filters',
  calendar: 'Filtering transactions by a custom date range on a calendar',
  si: 'Super Intelligence weekly brief and the offer to set up your plan',
  'si-answer': 'Super Intelligence listing four subscriptions with their next payment dates',
  'si-why': 'Super Intelligence explaining why spending went up this month, category by category',
  'si-history': 'Chat history with Super Intelligence, grouped by date',
  'si-setup': 'Super Intelligence asking setup questions, with the salary already filled in from bank data',
  wealth: 'Wealth overview: total net worth, growth this year, holdings and allocation',
  plan: 'Plan: an emergency fund goal and the projected net worth',
  forecast: 'Cash forecast until the next salary, with a safety buffer and how it was worked out',
};

export type DesktopId = 'home' | 'activity' | 'si' | 'wealth' | 'plan';

/** The web app's five tabs, in the order of its sidebar. */
export const DESKTOP: Record<DesktopId, { label: string; short?: string; alt: string }> = {
  home: { label: 'Home', alt: 'Finance Buddy on desktop: total balance, every bank card, this month, spending, a Super Intelligence chat and upcoming payments' },
  activity: { label: 'Activity', alt: 'Transactions on desktop, with filters and the details of the selected payment beside the list' },
  si: { label: 'Super Intelligence', short: 'SI', alt: 'Super Intelligence on desktop: past chats beside the weekly brief and suggested questions' },
  wealth: { label: 'Wealth', alt: 'Wealth on desktop: net worth growth, assets, asset allocation and mutual funds' },
  plan: { label: 'Plan', alt: 'Plan on desktop: goals, the cash forecast and monthly budgets side by side' },
};

export const screenSrc = (id: ScreenId, theme: 'light' | 'dark') => `${A}/screens/${id}-${theme}.webp`;
export const desktopSrc = (id: DesktopId, theme: 'light' | 'dark') => `${A}/screens/desktop-${id}-${theme}.webp`;

/** The net worth on the "aha" screen, from the sample data in the captures. */
export const SAMPLE_NET_WORTH = 793760;

/** Money as the sample data shows it in the app: ₹7,93,760. */
export const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;
