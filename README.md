# Runjian Malaysia

A Vite multi-page reproduction of the public English Runjian website, prepared for GitHub Pages. The source layouts and visual assets are preserved; Malaysia contact details are configured in `src/site-config.js`.

## Run locally

Requires Node.js 22.12+.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. To build the complete static site:

```sh
npm run build
npm run preview
```

## GitHub Pages

The public preview deploys from the `gh-pages` branch (root directory). The editable Vite source lives on `main`. In **Settings → Pages**, select **Deploy from a branch → gh-pages → / (root)**. Build with `npm run build`, then publish the contents of `dist/` to that branch. `public/.nojekyll` disables Jekyll processing.

An optional GitHub Actions workflow is provided at `docs/templates/pages-workflow.yml`. To enable automatic builds, copy it to `.github/workflows/pages.yml` using a GitHub token with workflow permissions, then select **GitHub Actions** as the Pages source. The current account token supports repository and branch publishing but does not have workflow permissions.

Relative links and assets support both repository subpaths and custom domains; no history fallback or application server is needed.

GitHub Pages is a public website unless a GitHub Enterprise access-control configuration explicitly makes it private. A private repository alone does not make its Pages website private. Local development does not publish anything.

## Scope and content

- `docs/site-manifest.json` records the source pages and asset mappings.
- Original same-site pages resolve locally; third-party careers, partner sites and WeChat articles remain external.
- The site retains the original group information, Chinese telephone numbers, group-wide statistics and news. Do not present these as Malaysia-specific facts. Set approved regional details in `src/site-config.js` and update the relevant HTML when the copy is approved.
- Local search uses a static page index, rather than the original hosted CMS.
- Enquiry forms validate locally. With a configured email, they open the visitor's mail application; without it they explicitly say that nothing was sent. GitHub Pages cannot process forms or store submissions by itself.
- Source CMS, analytics, admin APIs and automated submissions are not imported.
- Original public imagery and presentation libraries retain their source copyrights and license notices.

## Import and verification

`scripts/mirror-site.py` discovers public same-domain HTML pages and assets. `scripts/download-media.mjs` downloads media with the reference site’s required request headers. `scripts/prepare-site.py` generates local pages from the ignored `.reference/` snapshot. These import tools are not required to run, build or deploy the delivered site.

The implementation uses static HTML rather than a Vue rewrite to preserve the source DOM and styles. Vite bundles the shared local runtime; source-specific presentation scripts remain local static files.

## Verification

See [verification and known differences](docs/verification.md) for route coverage, browser tests, source URLs that were already unavailable, and static-hosting limitations. Run `npm test` for interaction tests after installing Playwright Chromium (`npx playwright install chromium`), or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to an existing Chromium executable.
