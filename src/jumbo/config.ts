/**
 * JUMBO case study: the one file to edit.
 *
 * Every product screen, link and price on the JUMBO page is declared here and
 * nowhere else. To put a real screenshot on the page, export it at the size
 * given below and upload it to `public/assets/` with the exact filename. No
 * code or layout change is needed: each slot has a fixed shape, the image is
 * fitted inside it without stretching, and a neutral placeholder shows until
 * the file exists.
 */

export type SlotShape = 'phone' | 'wide' | 'landscape' | 'portrait';

export interface UiAsset {
  /** Path under /public. */
  src: string;
  /** Describes the screen for screen readers. */
  alt: string;
  /** Short name shown on the placeholder while the file is missing. */
  label: string;
  shape: SlotShape;
  /** Recommended export size in px. Larger is fine; smaller looks soft on retina. */
  width: number;
  height: number;
}

/** Aspect ratio of each slot shape. The export sizes below match these. */
export const SHAPE_RATIO: Record<SlotShape, string> = {
  phone: '1170 / 2532', // a full iPhone screen, portrait
  wide: '16 / 10', // compositions and dashboards
  landscape: '4 / 3',
  portrait: '4 / 5',
};

export const ASSETS = {
  hero: {
    // The finished hero visual. Replace the file; no code change needed.
    src: '/assets/jumbo/jumbo-hero.webp',
    alt: 'JUMBO app: the Today screen in the centre with supporting screens around it',
    label: 'Hero product composition',
    shape: 'wide',
    // Renders up to 1680 x 1050 (92% of the viewport, capped); 2x for retina.
    width: 3360,
    height: 2100,
  },
  overview: {
    src: '/assets/jumbo/jumbo-health-overview.webp',
    alt: 'JUMBO bringing sleep, movement, nutrition and recovery into one view',
    label: 'Unified health overview',
    shape: 'wide',
    width: 2400,
    height: 1500,
  },
  today: {
    src: '/assets/jumbo/jumbo-today-ui.webp',
    alt: 'JUMBO Today screen with the health score, four rings and the day in one sentence',
    label: 'Today screen',
    shape: 'phone',
    width: 1170,
    height: 2532,
  },
  future: {
    src: '/assets/jumbo/jumbo-ai-future-ui.webp',
    alt: 'JUMBO AI Future screen showing a scenario trajectory with its uncertainty',
    label: 'AI Future screen',
    shape: 'phone',
    width: 1170,
    height: 2532,
  },
  capture: {
    src: '/assets/jumbo/jumbo-capture-ui.webp',
    alt: 'JUMBO Capture screen for meals, workouts, measurements and notes',
    label: 'Capture screen',
    shape: 'phone',
    width: 1170,
    height: 2532,
  },
  connect: {
    src: '/assets/jumbo/jumbo-connect-ui.webp',
    alt: 'JUMBO Connected sources: Apple Health, Health Connect, WHOOP and Oura, each with what it shares',
    label: 'Connected sources',
    shape: 'phone',
    width: 1170,
    height: 2532,
  },
  understand: {
    src: '/assets/jumbo/jumbo-understand-ui.webp',
    alt: 'JUMBO Sleep detail: 8h 51m against the last 21 days, explained in plain language',
    label: 'Sleep detail',
    shape: 'phone',
    width: 1170,
    height: 2532,
  },
  improve: {
    src: '/assets/jumbo/jumbo-improve-ui.webp',
    alt: 'JUMBO Training: today’s suggestion to take the day off after four days in a row',
    label: 'Training suggestion',
    shape: 'phone',
    width: 1170,
    height: 2532,
  },
  quickadd: {
    src: '/assets/jumbo/jumbo-quickadd-ui.webp',
    alt: 'JUMBO with the + button pressed: Meal, Workout, Sleep, Measure, Note and Training floating over Today',
    label: 'Quick add menu',
    shape: 'phone',
    width: 1170,
    height: 2532,
  },
  ask: {
    src: '/assets/jumbo/jumbo-ask-ui.webp',
    alt: 'Ask JUMBO conversation answering from the person’s own data',
    label: 'Ask JUMBO screen',
    shape: 'phone',
    width: 1170,
    height: 2532,
  },
  explore: {
    src: '/assets/jumbo/jumbo-explore-ui.webp',
    alt: 'JUMBO Explore screen with videos kept apart from JUMBO’s own guidance',
    label: 'Explore screen',
    shape: 'phone',
    width: 1170,
    height: 2532,
  },
  pro: {
    src: '/assets/jumbo/jumbo-pro-ui.webp',
    alt: 'JUMBO Plans screen showing the JUMBO Free plan and what it includes',
    label: 'JUMBO Pro visual',
    shape: 'phone',
    width: 1170,
    height: 2532,
  },
} satisfies Record<string, UiAsset>;

export interface ScatterCard {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Position and size as a percentage of the 4:3 frame. */
  left: number;
  top: number;
  size: number;
  /** Resting tilt in degrees. */
  rotate: number;
}

/**
 * The Problem section and the "Connect" step: five real cards from the app
 * (Today tiles and the streak card), each its own file so each can float.
 * Replace a file in public/assets/jumbo/cards/ to change a card.
 */
export const SCATTER_CARDS: ScatterCard[] = [
  { src: '/assets/jumbo/cards/sleep.webp', alt: 'Sleep: 8h 51m asleep', width: 555, height: 396, left: 8, top: 11, size: 30, rotate: -6 },
  { src: '/assets/jumbo/cards/movement.webp', alt: 'Movement: 6,130 steps', width: 555, height: 396, left: 61, top: 8, size: 30, rotate: 5 },
  { src: '/assets/jumbo/cards/streak.webp', alt: 'Current streak: 7 days', width: 522, height: 279, left: 34, top: 41, size: 32, rotate: -2 },
  { src: '/assets/jumbo/cards/nutrition.webp', alt: 'Nutrition: 347 kcal', width: 555, height: 396, left: 11, top: 65, size: 30, rotate: 4 },
  { src: '/assets/jumbo/cards/recovery.webp', alt: 'Recovery: 100 out of 100', width: 555, height: 396, left: 59, top: 63, size: 30, rotate: -5 },
];

/** The JUMBO app icon. Same file as the JUMBO card in the portfolio. */
export const BRAND_MARK = '/project-2.png';

export const LINKS = {
  /** Where every "Get JUMBO" button goes: the live app, to create an account. */
  getJumbo: 'https://jumbo-ai-app.vercel.app',
  /** Full privacy policy. Leave empty until it is published. */
  privacyPolicy: '',
  /** Back to the My Projects section of the portfolio. */
  portfolio: '/#projects',
};

/**
 * JUMBO Pro, as defined in the app (Jumbo-ai-App, src/data/plans.ts).
 * Only capabilities marked as built there are listed. Update both together.
 */
export const PRO_PLAN = {
  monthly: 349,
  yearly: 2499,
  currency: 'INR',
  locale: 'en-IN',
  credits: 500,
  freeCredits: 25,
  value: [
    'Full history, as far back as it goes',
    'Long-term trend analysis',
    'Cross-category correlations',
    'Charts and tables inside answers',
    'Advanced future scenarios',
    'Deeper nutrition analysis',
  ],
};

/** Sources the app can really connect to (Jumbo-ai-App, server/lib/providers.js). */
export const CONNECTIONS = {
  direct: ['WHOOP', 'Oura', 'Fitbit', 'Withings', 'Garmin'],
  viaApp: ['Apple Health', 'Health Connect'],
};
