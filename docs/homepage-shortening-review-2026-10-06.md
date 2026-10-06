# Homepage shortening review — 6 October 2026

The homepage now introduces Unfold in fewer sections and less scrolling. The four-scene hero remains reversible. The second pinned feature sequence is replaced by four direct preview controls; the routine and prompt share one section. Family has a compact product introduction, the Journal has one featured story, FAQs show four useful questions with a Help link, and the closing download message is shorter.

Repeated iPhone/Android preview captions are removed from the homepage. One brief note says “App screens show sample content.” Image alt text still identifies sample screens. The full Features page keeps its detailed availability notes. Nunito, native product captures, brand colors, footer destinations and product detail routes are retained.

## Measured page height

Measurements include the footer, with default text size, iPhone previews and closed FAQs. Baseline is the previously published homepage at df237be; these are document heights rather than conversion or performance scores.

| Viewport | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| Phone, 393 × 852 | 13,109 px | 7,380 px | 43.7% |
| Tablet, 768 × 1024 | 9,970 px | 5,544 px | 44.4% |
| Desktop, 1440 × 1000 | 10,226 px | 5,691 px | 44.3% |

## Validation

- `npm run build`: passed without warnings or errors; generated 23 pages, the 404 page, sitemap, robots.txt and RSS.
- `git diff --check`: passed.
- Static output inspection: each of the 23 routes has one h1, canonical metadata, a description and social-image metadata; referenced static images exist. URL-encoded asset names were decoded for filesystem inspection.
- Manual browser review at 393 × 852, 768 × 1024 and 1440 × 1000: hierarchy, spacing and typography accepted; no horizontal page overflow.
- At 320 × 852 with 200% root text: feature controls wrap into two rows; no clipped text or horizontal overflow. The original four-column layout had overlapping labels at this size and was corrected.
- Reduced motion: pinned hero scrolling is disabled; feature selection and prompt entrance animations are disabled. Temporary emulation and text overrides are reset after review.
- Native preview platform switching updates product captures and only shows Apple Watch for iPhone. Hero scroll direction reverses the selected scene.
- Four direct feature selections, keyboard selection, all six prompt lengths and all four FAQ disclosures were checked. Prompt height stays stable at standard phone size. Menu Escape closes the menu and returns focus to its toggle.
- Features, prompt library, Help, Journal, featured article and download destinations were opened. Apple and Google store destinations remain available. Detailed feature captions and normal download blocks remain on neighboring pages.
- No broken images or console warnings/errors were observed on the checked routes; homepage labelled regions resolve to existing headings.

The repository has no lint or typecheck command. No packages, lockfiles or automated tests were added. Validation is the production compilation, static artifact inspection and manual browser review, not a measured field-performance or conversion result.

## Design reference

[Headspace feature section on Mobbin](https://mobbin.com/sites/sections/70f38a75-1f35-4df1-bce5-936b209e737a) informed the compact direct controls and contained product stage. Unfold retains its own typography, color, copy and app captures. The web-vibe-code-audit skill guided the review.

## Scope

Only the website presentation changes. Backend and executive dashboard behavior are unchanged. Pre-existing untracked `artifacts/` is preserved and excluded from the commit. The temporary preview server and QA tab are stopped after verification.
