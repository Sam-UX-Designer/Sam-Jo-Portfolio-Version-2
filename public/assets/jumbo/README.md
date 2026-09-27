# JUMBO page images

Every image on the JUMBO page lives in this folder. To replace one, upload a new
file with the **exact same name**. The page picks it up after Vercel redeploys.
No code change needed. Paths and sizes are set in `src/jumbo/config.ts`.

Each slot has a fixed shape. Images are fitted with `object-fit: contain`, so they
are never cropped or stretched. Only the hero may extend past the normal page width.

The current files are real screens from the Jumbo-ai-App repo, running on the app's
built-in sample history (every screen shows the "Sample data" label).

| Section | File | Shows on desktop at | Shape | File size (px) | Status |
|---|---|---:|---:|---:|---|
| Hero | `jumbo-hero.webp` | up to 1680×1050 | 16:10 | 3360×2100 | Real: Capture, Lifestyle, Today, Ask, Plans |
| Problem + How it works (Connect) | `jumbo-scattered-data.webp` | 797×598 | 4:3 | 1600×1200 | Real Today tiles + streak card |
| Health Overview + How it works (Understand) | `jumbo-health-overview.webp` | 1060×662 | 16:10 | 2400×1500 | Real desktop web Today |
| Today + How it works (Improve) + phone hero | `jumbo-today-ui.webp` | 340×736 | phone | 1170×2532 | Real |
| AI Future | `jumbo-ai-future-ui.webp` | 340×736 | phone | 1170×2532 | Real, "Sleep more consistently", 5 years |
| Capture + How it works (Capture) | `jumbo-capture-ui.webp` | 320×693 | phone | 1170×2532 | Real |
| Ask JUMBO | `jumbo-ask-ui.webp` | 340×736 | phone | 1170×2532 | Real |
| Explore | `jumbo-explore-ui.webp` | 340×736 | phone | 1170×2532 | **Missing: add a screenshot from the live app** |
| Pro | `jumbo-pro-ui.webp` | 340×736 | phone | 1170×2532 | Real Plans screen, JUMBO Pro card |

Notes

- Explore needs the live YouTube connection to show real videos, so it was not
  captured. Screenshot it on the live app (iPhone size) and upload it as
  `jumbo-explore-ui.webp` (a .png renamed is not enough; export as WebP, or ask Claude
  to convert it).
- Keep the hero under about 500 KB. A transparent background is fine (it sits on black).
