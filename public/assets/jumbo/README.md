# JUMBO page images

Every image on the JUMBO page lives in this folder. To replace one, upload a new
file with the **exact same name**. The page picks it up after Vercel redeploys.
No code change needed. Paths and sizes are set in `src/jumbo/config.ts`.

Each slot has a fixed shape. Images are fitted with `object-fit: contain`, so they
are never cropped or stretched. Only the hero may extend past the normal page width.

The current files are real screens from the Jumbo-ai-App repo, running on the app's
built-in sample history (every screen shows the "Sample data" label), plus Explore
from the live app.

| Section | File | Shows on desktop at | Shape | File size (px) | Status |
|---|---|---:|---:|---:|---|
| Hero | `jumbo-hero.webp` | up to 1680×1050 | 16:10 | 3360×2100 | Real: Capture, Lifestyle, Today, Ask, Plans |
| Problem | `cards/sleep.webp`, `movement`, `nutrition`, `recovery`, `streak` | 5 cards in a 797×598 frame | card | 555×396 (streak 522×279) | Real Today tiles + streak card, each floats on its own |
| Health Overview | `jumbo-health-overview.webp` | 1060×662 | 16:10 | 2400×1500 | Real desktop web Today |
| Today | `jumbo-today-ui.webp` | 340×736 | phone | 1170×2532 | Real |
| AI Future | `jumbo-ai-future-ui.webp` | 340×736 | phone | 1170×2532 | Real, "Sleep more consistently", 5 years |
| How it works: Capture | `jumbo-capture-ui.webp` | 283×612 | phone | 1170×2532 | Real, with Sam's meal photo in the "Snap your meal" slot |
| How it works: Connect | `jumbo-connect-ui.webp` | 283×612 | phone | 1170×2532 | Real: Connected sources |
| How it works: Understand | `jumbo-understand-ui.webp` | 283×612 | phone | 1170×2532 | Real: Sleep detail, last 21 days |
| How it works: Improve | `jumbo-improve-ui.webp` | 283×612 | phone | 1170×2532 | Real: Training, "Take today off" |
| Capture section | `jumbo-quickadd-ui.webp` | 320×693 | phone | 1170×2532 | Real: Today with the + menu open |
| Ask JUMBO | `jumbo-ask-ui.webp` | 340×736 | phone | 1170×2532 | Real |
| Explore | `jumbo-explore-ui.webp` | 340×736 | phone | 1170×2536 | Real: Sam's iPhone screenshot of the live app (status bar removed) |
| Pro | `jumbo-pro-ui.webp` | 340×736 | phone | 1170×2532 | Real Plans screen, JUMBO Pro card |

Notes

- Every section uses its own screen; no picture appears twice on the page.

- The five cards in `cards/` are separate transparent images so each one can
  float. Their positions and tilt are set in `SCATTER_CARDS` in `src/jumbo/config.ts`.

- Explore comes from the live app (real YouTube videos), captured on an iPhone.
  Only the iOS status bar was covered with the app's background colour.
- Keep the hero under about 500 KB. A transparent background is fine (it sits on black).
