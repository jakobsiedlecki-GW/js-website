# js-website

Static website for eyepinion.de.

## IONOS Deploy Now settings

Use these settings when connecting the repository in IONOS Deploy Now:

- Repository: `jakobsiedlecki-GW/js-website`
- Branch: `main`
- Install command: leave empty or use `npm install`
- Build command: `npm run build`
- Publish/output directory: `dist`
- Node version: `20` (also pinned in `.nvmrc`)

The build script copies the root HTML files and the `public/` asset directory into `dist/`.
