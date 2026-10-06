# Homepage motion review — 6 October 2026

The homepage now extends the existing hero story into distinct product chapters. The hero's four previews and platform controls remain unchanged.

## Changes

- **Inside Unfold:** a pinned Write / Speak / Connect / Revisit sequence changes the native screen and explanation as the visitor scrolls. It runs in either direction. Every scene also has a direct button. Screens reveal with an opaque wipe, avoiding double-exposed app text and status bars.
- **Breathing:** phone and watch move at different rates, with scroll-driven breathing rings. The Apple Watch preview appears only when iPhone is selected; Android has its own native breathing screen and caption.
- **Family:** the device turns gently between separate-account and sharing-choice labels. The actual privacy boundaries stay visible in the written explanation.
- **Page rhythm:** routine steps, Journal cards, headings, the reflection card and closing download area have reversible movement. Changing a prompt also animates its new text. Body-copy reveals retain at least 92% opacity.

All previews use the existing, intact 5 October app captures. This change adds no package, lockfile edit, third-party request, generated app image or backend change. Nunito and the existing Unfold palette remain in use.

## Design references

Inspected official Mobbin image results: [Headspace's feature controls and phone composition](https://mobbin.com/sites/sections/7a6d3cc1-55b5-4e16-a8a5-465c309210f3) and [Norma's contained product stage](https://mobbin.com/sites/sections/237a69bd-7e6d-48fd-9aab-7eaf08f5551c). These were static layout references, not evidence of either site's animation implementation. Unfold uses its own captures, copy, typography, color and motion.

## Manual browser validation

Reviewed the local production build in the Codex browser at 1440×1000, 1280×720, 768×1024, 393×852 and 320×852.

- Final 320px feature panel: 730.4px tall, begins below the 77px header, with 58.5×48px scene controls and no horizontal overflow.
- Final 393px feature panel: 708.7px tall and fits beneath the header. Manual scene selection and reverse scrolling change both the selected control and native capture.
- Tablet and compact desktop retain the two-column layout and fit the sticky panel. Scene copy reserves the tallest explanation, so switching scenes does not change the scroll distance.
- Breathing and Family captures were visually inspected on desktop and phone, and Family on tablet. Labels and watch remain clear of the native phone screens.
- Reduced motion disables pinning, phone transforms, viewport sequences and prompt entrance animation. Mouse selection and native Tab / Return selection still work.
- At 320px with 200% root text, pinning is disabled, scene controls form two columns, and the final page has no horizontal overflow. This pass found and fixed prompt-grid and Family-label overflow.
- Mobile menu opens, Escape closes it, and focus returns to the menu button.
- Family and breathing links navigate to their matching feature anchors, with the destination headings below the header. Returning home resets scroll to the top.
- Prompt changes produce new question text; Journal covers load; inspected images have no completed-but-broken loads. Console warning/error log was empty.

The changed layouts meet the requested **10/10 visual review gate as a subjective assessment of hierarchy, spacing, typography and screen composition**. This is not an objective score for the whole website, accessibility conformance, conversion performance or field Core Web Vitals.

Screenshots are saved locally at `/Users/Apple/.codex/visualizations/2026/09/17/01a0af98-f845-77b3-968b-dab547ab4973/unfold-motion-chapters-20261006/` (features, breathing, Family, prompt, Journal, reduced motion and enlarged text).

## Static validation and limits

`npm run build`, `node --check src/hooks/usePageMotion.js` and `git diff --check` pass without warnings or errors. The repository has no lint or TypeScript script. The production build prerenders 23 pages plus the 404, sitemap, robots file and RSS feed. No automated tests were written or run for this motion change.

Animations are driven by passive scroll listeners and coalesced animation frames, with offscreen painting skipped and listeners/observers removed on unmount. There is no continuously running animation timer or scroll interception. If a sticky panel cannot fit its viewport, it falls back to direct controls and normal document flow.

Physical Safari/Android browser testing, native app release status, field performance and conversion effects remain unverified. App captions retain sample-data and version qualifications. Backend and executive-dashboard deployment are outside this motion change.
