# Verification and known differences

Reference: https://en.runjian.com/
Repository: https://github.com/WeiZheng-Runjian/runjian-malaysia

- 351 accessible source URLs imported; 348 generated HTML files (encoded URL aliases share output files).
- 351 browser route checks; 0 pages with JavaScript errors or initialization failures.
- Five Playwright interaction tests passed for solution tabs, mobile navigation, local search, enquiry behavior and nested product routes. Also run against the production build under `/runjian-malaysia/`.
- 39,172 local HTML links/media references checked; 0 missing targets.
- Production build: 990,665,238 bytes, below the 1 GB Pages site limit. No individual file exceeds GitHub’s 100 MiB file limit.
- Desktop homepage and solution-section screenshots inspected; mobile viewport checked at 390 px, with no horizontal overflow. This is not a claim of automated pixel-perfect verification for every page.
- 114 PNG files converted to lossless WebP with exact RGBA preservation, saving 39 MB. Original videos are retained unchanged.

## Source limitations

28 source page URLs already return HTTP 404 and cannot be cloned as working pages. Their existing external links remain pointed to the original site. See `site-manifest.json` for the URL list. Two source image URLs also return 404; their missing CSS backgrounds are disabled locally. See `media-errors.json`.

Third-party websites, WeChat articles and external careers systems remain external. Group claims, Chinese company information, global contact details, legal text and news are preserved from the source; Malaysia-localized company copy has not been supplied. Page titles identify the Malaysia version.

Search uses a local static index. Enquiries validate locally and do not submit to Runjian’s original CMS. Configure an approved email in `src/site-config.js` to open the visitor’s mail app. No backend submission or CMS editing is included.

Shared legacy scripts were adapted to current Swiper, guarded against absent sliders/map containers, and loaded without the original CMS, tracking scripts or API calls. Malformed source links and encoded category URL filenames were corrected for static hosting.

## Published preview

https://weizheng-runjian.github.io/runjian-malaysia/

GitHub Pages serves the `gh-pages` deployment commit `fe44e8c7cd5e18cfc5f28cef47315965cff96262`. The live homepage returned HTTP 200, and all five Playwright interaction tests passed against the public URL on 15 October 2026.
