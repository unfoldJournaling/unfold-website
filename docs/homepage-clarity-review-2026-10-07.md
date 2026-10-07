# Homepage clarity review — 7 October 2026

## Changes

- Removed the homepage prompt rotator. It asked a question without providing an answer flow or explaining why it belonged on a product landing page.
- Replaced the split prompt/routine layout with three concrete app actions: log a feeling, write or open a voice journal, and revisit journal history. The copy identifies Luma as an AI reflection companion.
- Removed Prompts from primary navigation. The standalone library remains linked from the footer and the Features page.
- Corrected mobile step spacing: the former number styling spanned an unnecessary second grid row. Numbers now retain a 16px text gap even with enlarged text.
- Moved route scroll restoration after page effects. Previously, opening the homepage at `#how-it-works` could land approximately 535px too early because the hero reserved its animated scroll space afterward. The corrected mobile landing position was below the 77px sticky header.

The reversible phone, breathing, Family and section animations remain. Native screenshots, Nunito, download destinations and backend behavior are retained.

## Design references

The official Mobbin connector supplied these inspected references:

- [Calm — how it works](https://mobbin.com/sites/sections/03cc29b6-86e2-4186-a3d1-18ddac44ab4f): concise action headings with short explanations in three columns.
- [Beside — how it works](https://mobbin.com/sites/sections/2cfd3169-f61f-4ca5-bd2a-67627febbc84): numbered steps, restrained rules and clear reading order.

Unfold uses its existing colors and typography, with 40px desktop column gaps, 24px tablet gaps and 16px spacing between mobile step numbers and copy. No decorative icons or new UI packages were introduced. The web-vibe-code-audit skill guided the evidence-based review.

## Validation

- `npm run build` passed after the final code edit, with zero reported warnings or errors. Vite compiled 88 modules and prerendered 23 pages, a 404 page, sitemap, robots.txt and RSS feed.
- `git diff --check` passed.
- Static inspection of all 23 generated routes found one h1 per page, canonical URLs, descriptions and social image metadata. Referenced local image files exist. The homepage output contains the new explanation and no prompt widget.
- Manual browser review covered desktop 1440 × 1000, tablet 768 × 1024, phone 393 × 852 and a short 320 × 568 phone viewport.
- The changed section's hierarchy, spacing and typography met the scoped 10/10 visual acceptance target after refinement. No horizontal overflow was observed. This is a design review judgment, not a claim about every browser or conversion performance.
- At 320 × 852 with 200% root text, numbers and copy keep a 16px gap, text wraps without clipping, and the page has no horizontal overflow.
- Reduced motion disables pinned scrolling and motion transforms; manual preview selection remains usable. Short screens also retain manual preview controls without pinning.
- Desktop scroll progression reversed from Pause to Talk on upward scrolling, then advanced again. Android selection loaded all four Android captures and removed the Apple Watch presentation. Talk selection and keyboard Write selection worked.
- All four FAQ disclosures opened with a click and closed with Enter. The mobile menu opened and closed; the reduced navigation retains Features, The Journal, About, Help and Get Unfold.
- The breathing link opened the correct Features section below the header. Browser Back returned to the homepage reading section. The prompt library and download destination opened successfully; Apple and Google store links are present.
- No broken homepage images or browser console warnings/errors were observed in the checked states.

The repository has no lint or typecheck script. Validation used the production compiler, static output inspection and manual browser checks. No automated tests, dependencies or lockfile changes were added. Field performance, conversion rates and physical-device Safari testing were not measured in this review.

Screenshots are saved locally in `unfold-homepage-review-20261007` under the task's visualization directory. Existing untracked `artifacts/` is excluded from this change. Temporary text and motion overrides are reset after review; the preview server and QA tab are cleaned up after release verification.

## Pending decisions

“Prompts are not needed on the landing page” is interpreted as removing the homepage widget and primary navigation item, while retaining the useful library through secondary links. The library can be retired separately if desired; no decision blocks this release.
