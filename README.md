# js-website

Static website for eyepinion.de.

## IONOS Deploy Now settings

Use these settings when connecting the repository in IONOS Deploy Now:

- Repository: `jakobsiedlecki-GW/js-website`
- Branch: `main`
- Install command: leave empty or use `npm ci`
- Build command: `npm run build`
- Publish/output directory: `dist`
- Node version: `24` (also pinned in `.nvmrc`)

The build script copies the root HTML files, `.htaccess`, and the `public/` asset directory into `dist/`. The Deploy Now workflow also builds `dist/` before uploading, so repository files such as `README.md`, `package.json`, `.github/`, and scripts are not part of the published website.
