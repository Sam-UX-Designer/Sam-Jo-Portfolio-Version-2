# JUMBO page images

Upload each finished image to the GitHub path below, using the exact filename.
The page picks it up automatically after Vercel redeploys. No code change needed.

Every slot has a fixed shape. Images are fitted inside it with `object-fit: contain`,
so they are never cropped or stretched. Only the hero may extend past the normal
page width. "Recommended export" is 2x the largest desktop size, for sharp retina screens.

| Section | Asset | Desktop size (1280 / 1440 / 1920) | Ratio | Tablet 820 | Phone 390 | Recommended export | GitHub path |
|---|---|---:|---:|---:|---:|---:|---|
| Hero | jumbo-hero | 1178×736 / 1325×828 / **1680×1050 (max)** | 16:10 | 754×471 | *uses Today screen* | **3360×2100** | `public/assets/jumbo/jumbo-hero.webp` |
| Problem | jumbo-scattered-data | 797×598 (all widths) | 4:3 | 756×567 | 350×263 | 1600×1200 | `public/assets/jumbo-scattered-data.png` |
| How it works, Connect | *same file as Problem* | 588×441 | 4:3 | 756×567 | 350×263 | *(same file)* | *(same)* |
| Health Overview | jumbo-health-overview | 1060×662 | 16:10 | 696×435 | 322×201 | 2400×1500 | `public/assets/jumbo-health-overview.png` |
| How it works, Understand | *same file as Health Overview* | 564×353 | 16:10 | 756×473 | 350×219 | *(same file)* | *(same)* |
| Today | jumbo-today-ui | 340×736 | phone (1170:2532) | 340×736 | 238×515 | 1170×2532 | `public/assets/jumbo-today-ui.png` |
| AI Future | jumbo-ai-future-ui | 340×736 | phone | 340×736 | 238×515 | 1170×2532 | `public/assets/jumbo-ai-future-ui.png` |
| Capture | jumbo-capture-ui | 320×693 | phone | 340×736 | 238×515 | 1170×2532 | `public/assets/jumbo-capture-ui.png` |
| Ask JUMBO | jumbo-ask-ui | 340×736 | phone | 340×736 | 238×515 | 1170×2532 | `public/assets/jumbo-ask-ui.png` |
| Explore | jumbo-explore-ui | 340×736 | phone | 340×736 | 238×515 | 1170×2532 | `public/assets/jumbo-explore-ui.png` |
| Pro | jumbo-pro-ui | 460×575 | 4:5 | 460×575 | 350×438 | 1000×1250 | `public/assets/jumbo-pro-ui.png` |

Notes

- Hero: design at 16:10. A different shape will not stretch, but it will leave black
  bars. On phones the hero currently shows the Today screen instead.
- Keep the hero webp under about 500 KB. A transparent background is fine (it sits on black).
- All paths and sizes are set in `src/jumbo/config.ts`.
