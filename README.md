# Planchette

Planchette is a mobile-friendly web toolbox for useful browser-only utilities.

The first tool generates an A4 PDF from one uploaded image repeated four times in a 2x2 layout, with a margin slider in millimeters and compression presets suitable for printing or sharing.

## Internationalization

The full interface is available in:

- English
- Francais
- Espanol

Language can be switched from the header and is persisted locally in the browser.

## Current stack

- React 19
- TypeScript
- Vite
- pdf-lib
- Hash-based routing for GitHub Pages compatibility
- Lightweight in-app i18n provider (no backend dependency)

## Development

Use nvm to match the project runtime:

```bash
nvm use
```

```bash
npm install
npm run dev
```

The app runs entirely client-side. No backend is required.

## Commands

```bash
npm run dev
npm run build
npm run preview
npm run test
npm run lint
```

## Project docs

- `PRODUCT.md` defines user-facing scope and UX rules.
- `ARCHITECTURE.md` records the technical approach.
- `ROADMAP.md` lists likely next tools.
- `DEPLOYMENT.md` explains GitHub Pages publishing.

## Source layout

- `src/apps/home/` home sub-app
- `src/apps/a6-to-a4/` first tool sub-app (UI + domain logic)
- `src/core/i18n/` language provider, locale model, and dictionaries
- `src/core/ui/` shared app UI controls
- `src/assets/icon.svg` primary Planchette logo used in the header

## First tool behavior

- Accept one uploaded image.
- Re-encode it in the browser according to the selected compression preset.
- Build an A4 portrait PDF.
- Place four copies of the image on the sheet.
- Use the selected margin value both as the outer page margin and the gap between placements.
- Download the final PDF locally.
