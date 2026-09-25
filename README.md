# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

---

## JUMBO case study page (`/jumbo/`)

Clicking **Jumbo AI** in My Projects opens the JUMBO case study at `/jumbo/`.
It is a separate page (`jumbo/index.html`, code in `src/jumbo/`), so the
portfolio itself is unchanged.

### Adding the JUMBO screenshots

Upload each file to `public/assets/` with the **exact** filename below. No
code change is needed: every slot has a fixed shape, the image is fitted
without stretching, and a neutral placeholder shows until the file exists.

| File | Shape | Export at (minimum) |
|---|---|---|
| `jumbo-hero-ui.png` | Wide 16:10, one central screen with 2-4 around it | 3200 × 2000 |
| `jumbo-scattered-data.png` | 4:3 | 2400 × 1800 |
| `jumbo-health-overview.png` | Wide 16:10 | 3200 × 2000 |
| `jumbo-today-ui.png` | Phone screen | 1170 × 2532 |
| `jumbo-ai-future-ui.png` | Phone screen | 1170 × 2532 |
| `jumbo-capture-ui.png` | Phone screen | 1170 × 2532 |
| `jumbo-ask-ui.png` | Phone screen | 1170 × 2532 |
| `jumbo-explore-ui.png` | Phone screen | 1170 × 2532 |
| `jumbo-pro-ui.png` | Portrait 4:5 | 1600 × 2000 |

### Other settings

All in `src/jumbo/config.ts`:

- `LINKS.getJumbo`: the live JUMBO app URL for every "Get JUMBO" button.
  While empty, the button opens an email to Sam.
- `LINKS.privacyPolicy`: link to the full privacy policy once published.
- `PRO_PLAN`: price, credits and Pro features. Mirrors `src/data/plans.ts`
  in the Jumbo-ai-App repo; update both together.
