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
  scattered: {
    src: '/assets/jumbo-scattered-data.png',
    alt: 'Health information spread across sleep, movement, nutrition, recovery and habits',
    label: 'Scattered health information',
    shape: 'landscape',
    width: 2400,
    height: 1800,
  },
  overview: {
    src: '/assets/jumbo-health-overview.png',
    alt: 'JUMBO bringing sleep, movement, nutrition and recovery into one view',
    label: 'Unified health overview',
    shape: 'wide',
    width: 3200,
    height: 2000,
  },
  today: {
    src: '/assets/jumbo-today-ui.png',
    alt: 'JUMBO Today screen with the health score, four rings and the day in one sentence',
    label: 'Today screen',
    shape: 'phone',
    width: 1170,
    height: 2532,
  },
  future: {
    src: '/assets/jumbo-ai-future-ui.png',
    alt: 'JUMBO AI Future screen showing a scenario trajectory with its uncertainty',
    label: 'AI Future screen',
    shape: 'phone',
    width: 1170,
    height: 2532,
  },
  capture: {
    src: '/assets/jumbo-capture-ui.png',
    alt: 'JUMBO Capture screen for meals, workouts, measurements and notes',
    label: 'Capture screen',
    shape: 'phone',
    width: 1170,
    height: 2532,
  },
  ask: {
    src: '/assets/jumbo-ask-ui.png',
    alt: 'Ask JUMBO conversation answering from the person’s own data',
    label: 'Ask JUMBO screen',
    shape: 'phone',
    width: 1170,
    height: 2532,
  },
  explore: {
    src: '/assets/jumbo-explore-ui.png',
    alt: 'JUMBO Explore screen with videos kept apart from JUMBO’s own guidance',
    label: 'Explore screen',
    shape: 'phone',
    width: 1170,
    height: 2532,
  },
  pro: {
    src: '/assets/jumbo-pro-ui.png',
    alt: 'JUMBO Pro experience',
    label: 'JUMBO Pro visual',
    shape: 'portrait',
    width: 1600,
    height: 2000,
  },
} satisfies Record<string, UiAsset>;

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
