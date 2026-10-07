# Homepage motion and FAQ review — 7 October 2026

## Findings and changes

1. A fast swipe could leave the hero on a stale screen. The old handler skipped updates whenever the entire track was outside the viewport. Five repeated downward swipes past the track left its selected state at Your day. The new handler always settles the start/end state, including offscreen, and uses the same scroll position mapping in both directions.
2. Pin eligibility and distance used `window.innerHeight`, while the phone dimensions used CSS `100svh`. Those describe different heights when mobile browser chrome expands. A narrow viewport change in the baseline switched pinning off and collapsed the track from 1,256px to 599px. The revised geometry consistently measures CSS's small viewport. In a developer simulation with the small viewport fixed at 680px and `innerHeight` alternating between 680px and 852px, pinning remained enabled and the track stayed at 1,678px.
3. The old sequence covered all four screens within about 554px of scrolling at 393 × 852. Each transition now has its own scroll allowance: approximately 1,406px total at that size. The reveal uses a gentler curve and less device rotation. One frame loop smooths position changes and stops when settled; competing CSS transform/clip transitions have been removed. The four hero captures load eagerly for the return journey.
4. The FAQ now contains eight answers. Voice journaling, daily journaling, Luma and cancellation reuse the Help page's content. Appropriate answers link to further reading or store subscription instructions. Opening an answer has a restrained 320ms entrance, disabled for reduced motion. Existing section and breathing transitions are also slower.

The page keeps its current sections, native product screenshots and Unfold typography. There is no new animation library, scroll interception, timed autoplay or new backend behavior. Short screens and enlarged text retain manual preview controls when the complete stage cannot fit.

## Browser validation

- Phone 393 × 852: five complete hero passes, plus five full-page trips from the footer back to the top. Every downward endpoint reached Pause and every upward endpoint reached Your day. The complete page height remained 7,403px during the full-page cycles, all six main section headings remained present, and loaded images had no failures.
- Explicit upward sequence checked: Pause → Talk → Write → Your day.
- Tablet 768 × 1024 and desktop 1440 × 1000: five down/up cycles each. The track stayed at 2,253px; every return reached Your day with no horizontal overflow.
- Compact phone 375 × 667: the smaller phone frame fits with pinning enabled. Reduced motion and 200% root text at 320 × 852 disable pinning; keyboard preview selection remains functional.
- Android selection loaded all four Android images, displayed the selected Pause screen and removed the Apple Watch presentation. With reduced motion enabled, Enter selected Write and the device transform was `none`.
- All eight FAQs opened by click and closed by Enter. Enlarged text wraps without horizontal page overflow; reduced motion removes the answer entrance animation. The cancellation link opens `/plans#manage`, where both store instructions are present.
- Screenshots of the changed hero and FAQ were inspected for hierarchy, spacing, typography and readable states. The changed surfaces met the scoped 10/10 visual acceptance target; this is a design judgment, not a universal browser or business-performance score.
- No console warnings or errors were observed in the local QA session.

Sixteen other public routes were checked on the live site at mobile width for headings, horizontal overflow and failed loaded images: Features, About, Plans, Get App, Help, Knowledge Base, Blog, Careers, Releases, Roadmap, Feature Request, Report Bug, Prompts, Privacy, Terms and Delete Account. These checks found no layout overflow or failed loaded images. This was not a new end-to-end test of publishing, authenticated administration or form delivery; no production submissions were made.

## Build and static checks

- `npm run build`: passed after the final code change, with zero warnings/errors; 88 modules compiled and 23 routes prerendered.
- `git diff --check`: passed.
- Generated-output inspection: all 23 routes retained one h1, canonical metadata, descriptions and social-image metadata, with existing referenced image files.
- The repository has no lint/typecheck command. No dependencies, lockfiles or automated test files were added.

## References and limits

[Craft's FAQ](https://mobbin.com/sites/sections/2a7f5774-6456-4b1f-ac56-bc01e3ef9125) and [Family's FAQ](https://mobbin.com/sites/sections/e64d9ea0-551d-4122-823a-cac8c58e8661), inspected through the official Mobbin connector, informed the restrained accordion rows and useful support links. Unfold's existing 64px minimum question rows and brand system are retained.

The browser toolbar check is a developer simulation of changing `innerHeight` against stable CSS viewport dimensions, not a physical iPhone/Safari test. Real-device Safari, field performance and conversion outcomes remain unmeasured. Screenshots and cycle observations are saved locally in the task visualization directory under `unfold-motion-review-20261007`.

Temporary browser overrides are reset and the task preview server is stopped after deployment verification. Pre-existing untracked `artifacts/` remains untouched and excluded.

## Pending decisions

The reported “static one touch” section was interpreted as the closing “Start with one thought” area. Full-page footer-to-hero cycles were included to cover that journey. No decision blocks the changes; a different specific location can be reviewed separately if needed.
