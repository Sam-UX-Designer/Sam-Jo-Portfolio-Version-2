/**
 * AI Agents World website: links and images, in one place.
 *
 * The app itself lives at APP_URL (the Vercel project ai-agents-world-web).
 * Every "create an account" and "sign in" on this site goes there.
 */

const APP_URL = 'https://ai-agents-world-web.vercel.app';

export const LINKS = {
  app: APP_URL,
  /** The app's own sign-up screen: Google, Apple or email. */
  signUp: `${APP_URL}/signin?mode=register`,
  signIn: `${APP_URL}/signin?mode=signin`,
  /** Leave empty until the page is published; the footer hides empty links. */
  privacy: '',
  terms: '',
  /** Back to the My Projects section of the portfolio. */
  portfolio: '/#projects',
};

const A = '/assets/ai-agents-world';

export const ASSETS = {
  /** The supplied island render, 1672 x 941. Never regenerated or redrawn. */
  island: `${A}/island-hero.webp`,
  islandSize: { width: 1672, height: 941 },
  /** The distant island behind Tools and History in the app. */
  distant: `${A}/tools-bg.webp`,
  logo: `${A}/logo-128.webp`,
  logoLarge: `${A}/logo-512.webp`,
  /**
   * Screenshots of the running app (demo workspace), 2400 x 1500. Each one
   * is used once on the page: `working` in See the work happen, the other
   * three in the product preview.
   */
  screens: {
    working: {
      src: `${A}/screens/home.webp`,
      alt: 'AI Agents World Home: the Orchestrator has handed a marketing campaign to the Sales and Marketing agents, with Active Agents and Task in progress on the right',
    },
    home: {
      src: `${A}/screens/home-agent.webp`,
      alt: 'AI Agents World Home with the Marketing Agent open: its task, its instructions, and its six tools, each marked automatic or asks you',
    },
    tools: {
      src: `${A}/screens/tools.webp`,
      alt: 'AI Agents World Tools: Gmail, Google Calendar and Slack connected, with Google Drive, Notion, Figma, GitHub, Linear, Meta and X marked Soon',
    },
    history: {
      src: `${A}/screens/history.webp`,
      alt: 'AI Agents World History: three completed goals, with the details of Organize my schedule open on the right',
    },
  },
};

/** How long one free task is remembered in this browser. */
export const FREE_TASK_KEY = 'aaw-free-task-used';
