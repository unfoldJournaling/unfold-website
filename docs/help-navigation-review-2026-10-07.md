# Help navigation review — 7 October 2026

## Findings and changes

The live mobile Help page placed contact support after 22 answers and four shortcuts. The knowledge base's Contact support button went to the top of that page. The footer opened an email client even though the site has its own contact form. These paths now reach `/help#contact`, with a visible shortcut beside the Help heading and keyboard focus on the destination. Direct email remains available beneath the form.

Knowledge-base question links previously opened a long search URL at the top of Help. Each answer now has an explicit, stable anchor. Selecting a question opens its answer, scrolls below the header and focuses the question. The purchase-restoration answer also links directly to support. Existing `/faq?q=...` links still redirect and expand their matching answer.

Fragment-selected answers expand after hydration so a fresh load matches the prerendered HTML before applying the browser-only fragment. This also preserves expansion when someone reloads or shares a direct answer link.

The homepage retains its current length, product imagery and reversible motion. Mobile navigation and the download handoff were reviewed without finding a reason to redesign them in this pass.

## Reference and visual review

- [Craft Help Center on Mobbin](https://mobbin.com/sites/sections/d0584891-bcc6-480e-9dea-0c3ec1693cd5): a visible request action alongside searchable self-service content.
- [Fresha Help Centre on Mobbin](https://mobbin.com/sites/sections/c2e8f8f6-5094-465a-a431-3b34133a044a): direct question links and clear topic grouping.

The changes use Unfold's existing Nunito typography, purple text links, line-separated answers and 8/16/24px spacing. Browser screenshots were inspected at 393×852, 768×1024 and 1440×1000. The added action wraps cleanly on mobile and keeps a 48px minimum touch height. A 320×852 viewport with 200% root text and reduced motion has no horizontal overflow; the support heading and form remain readable. Anchor spacing accounts for the existing page scroll padding rather than adding a second header-sized offset.

## Validation

- `npm run build`: passed, zero reported warnings; 23 pages, 404, sitemap, robots and RSS prerendered.
- `node --check src/data/resources.js` and `node --check src/hooks/useResourceQuery.js`: passed.
- `git diff --check`: passed.
- Static output inspection: 22 unique answer IDs, 22 matching knowledge-base links, no missing answer targets, contact anchor present, Help canonical retained.
- Browser checks: contact shortcut, knowledge-base answer navigation, fresh-load and reload expansion of a direct answer, purchase-answer contact link, accordion Enter open/close, Back navigation, search match, empty results, Clear filters and the older FAQ query URL.
- No console warnings or errors in the local review tab.

The repository has no configured lint or typecheck command; the build and syntax checks above are not a substitute for an unconfigured linter. No dependencies, lockfiles or automated tests were added.

## Scope and remaining limits

This pass covers public support navigation and its responsive presentation. It does not claim a complete backend audit, physical-device Safari validation or measured conversion improvement. No support messages were submitted, and production inbox delivery was not retested. Form submission logic is unchanged.

No pending product decision blocks this update. The reversible choice was to make the existing contact form the destination of Contact us, while retaining the email option inside it.
