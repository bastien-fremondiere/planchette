# Deployment

## GitHub Pages

Planchette is configured for static deployment to GitHub Pages.

The provided workflow builds the app and publishes the generated `dist` folder to Pages.

## Repository path

The workflow sets:

```bash
PAGES_BASE_PATH=/<repository-name>/
```

That allows the same codebase to build correctly under the GitHub Pages sub-path for the repository.

## Manual local production check

```bash
PAGES_BASE_PATH=/planchette/ npm run build
npm run preview
```

## GitHub requirements

1. Push the repository to GitHub.
2. In repository settings, enable GitHub Pages with GitHub Actions as the source.
3. Let the included workflow publish future changes.