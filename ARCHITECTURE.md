# Architecture

## App shell

Planchette is a static React application built with Vite.

Routing uses `HashRouter` so GitHub Pages deployment does not require rewrite rules.

## PDF generation path

1. The browser reads the selected image.
2. The image is decoded into an off-screen canvas.
3. The chosen compression preset controls JPEG quality and maximum image dimension.
4. The processed JPEG blob is embedded into a PDF using `pdf-lib`.
5. A single A4 page is created and four copies are drawn in a 2x2 layout.
6. The final blob is downloaded locally.

## Layout model

- Page size: A4 portrait, `210 x 297 mm`
- Grid: `2 x 2`
- Margin control: used as both outer page margin and inter-cell gap
- Background: white
- Fit strategy: preserve source aspect ratio and center inside each cell

## Testing approach

- Unit-test the layout math.
- Smoke-test the pure calculation helpers.
- Validate the production build for GitHub Pages base path compatibility.

## Deployment model

The app is static and can be deployed directly to GitHub Pages.

The Vite base path is controlled through the `PAGES_BASE_PATH` environment variable so the project can work both locally and under a repository sub-path.