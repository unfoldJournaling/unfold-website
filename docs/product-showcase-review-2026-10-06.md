# Unfold product showcase review — 6 October 2026

The updated homepage presents the supplied 5 October product state with intact native app screens, explicit platform selection and repeatable scroll motion. Unfold’s existing Nunito typography, violet palette, leaf mark and editorial voice remain the design foundation. Work was reviewed on `feat/current-product-showcase`; Samuel subsequently authorized publishing the completed website update through GitHub `main`. Deployment status is verified separately from these local checks.

## Findings and implemented remedies

| Priority | Issue and user impact | Observed evidence | Implemented remedy |
| --- | --- | --- | --- |
| Medium | Older store posters made the app harder to inspect and did not explain the newer product. | The original desktop hero used a complete store campaign composition inside the website showcase. The supplied native screens now include Luma briefs, voice controls, Family and breathing patterns. | Replaced product-gallery posters with 15 intact native captures. Enlarged the app within the frame, retained native status bars and added iPhone/Android selection with sample-data captions. |
| Medium | Family, breathing, voice and searchable history lacked a clear product story. | The previous Features page had four phone chapters and a text-only pause section. The current source package and mobile code expose the additional experiences and privacy choices. | Added six phone chapters and a separate Apple Watch section; updated the homepage selector, breathing and Family sections. Added six help answers, two knowledge-base topics and a Family link on the subscriptions page. |
| Medium | Fragment navigation could restore an old position instead of showing the requested section. | Clicking section links sometimes changed the hash while the heading remained below the requested position. Native fragment links reused the history key; the shared scroll-restoration effect preferred its saved position. | Use router links for Features navigation, prevent saved-position restoration from overriding a newly selected native hash, and remove duplicate header offsets. Clicking the home mark also returns the existing homepage to its top. Family, Watch, breathing, help cross-links and privacy contents were manually checked. |
| Low | Search descriptions retained older “stress-style reflections” wording. | Existing metadata described an older feature emphasis. | Updated homepage, Features, Help and Knowledge Base descriptions. The final generated HTML has one H1 and a page-specific title, description and apex canonical on each affected route. |
| Requested enhancement | The first gentle-motion implementation was not prominent enough for Samuel’s Apple-inspired direction. | Samuel reviewed the preview and requested a more visible product sequence. | Added a pinned four-scene hero: dashboard, written journal, voice and breathing. The phone turns in perspective; an opaque wipe preserves clear native screens through scene changes. Scrolling back reverses the sequence. Direct scene controls, a progress line and a scroll cue make the interaction understandable. |

## Design references

- [Bevel feature selector on Mobbin](https://mobbin.com/sites/sections/6c021d8c-0dff-4d1d-9eb0-a091e30af6f0): clear copy hierarchy beside a native phone, generous spacing and a restrained feature selector.
- [Bevel product composition on Mobbin](https://mobbin.com/sites/sections/f051fa2e-d46c-4db9-8046-bdd726b28a7d): product-led hardware composition. This static reference does not establish its animation implementation.
- [Zendesk device composition on Mobbin](https://mobbin.com/sites/sections/7cc71c84-8646-455a-98b2-3cedfb8df355): distinct device presentations rather than implying one platform works on every device.
- [Live Bevel homepage](https://www.bevel.health/): inspected its phone/Watch hero and video-led presentation. No claim is made about whether Bevel uses GSAP or WebGL.
- [Apple iPhone composition on Mobbin](https://mobbin.com/sites/sections/fae8666e-aa8f-401c-8456-63eea00ed5d9): a large device composition beneath concise product copy, with perspective used to distinguish the devices. This reference informed the stronger hero presentation; a static Mobbin capture does not establish scroll behavior.

The implementation adapts the hierarchy and breathing room to Unfold; it does not copy another company’s visual identity. Native Android navigation remains Android. iPhone captures already contain a Dynamic Island, so the website does not add a second one.

## Motion and accessibility

The existing React stack is sufficient for this effect. The hero’s passive scroll listener schedules at most one requestAnimationFrame update, reads the unmoving track and only paints while the track is in view. Its native screens remain readable between short wipe transitions. The device turn ranges from −22° to 2°; vertical travel is capped at 4px and scale at 1.01. This keeps the phone separate from controls and captions. The opening reveal lasts 900ms and does not loop.

For other phone previews, an Intersection Observer gates passive scroll listeners and the unmoving wrapper supplies the measurement, avoiding transform feedback. Translation is limited to 18px on phones and 32px on wider screens; opacity remains at least 0.86 and 0.80 respectively. There is no continuous animation loop, autoplay video, GSAP dependency or WebGL canvas.

Reduced-motion mode removes pinning, the entrance reveal, perspective and fading, leaving manual scene selection and fully opaque static screens. The hero also disables pinning when enlarged text or a short viewport would prevent the complete controls from fitting. Short laptop windows use an adaptive compact card. Background-tab checks cancel scheduled frames; component cleanup removes listeners and observers. The relevant browser API behavior is documented by [MDN’s Intersection Observer guide](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) and [requestAnimationFrame reference](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame).

Normal-motion verification showed desktop “Talk” at scroll position 677.5 and returned to “Your day” at position 0 through the home link. Phone scrolling reversed from “Pause” (position 1304.5, progress 0.9998) into “Talk” (position 1015, progress 0.6421). On the 320px Android presentation, the complete pinned card measured 747.82px high, from viewport y=93 to y=840.82 in an 852px viewport. Reduced-motion inspection confirmed no pinning, `transform: none`, no entrance animation and working manual scene selection. A 200% text check likewise confirmed no pinning, no transform and no horizontal overflow.

## Completed validation

| Surface | Browser viewports and manual coverage |
| --- | --- |
| Homepage | 1440×1000, 1440×768, 768×1024, 393×852 and 320×852. Pinned hero, four scenes and reverse scrolling, platform switch, all four feature choices, new breathing and Family sections, keyboard selection, mobile menu/Escape, same-page home link and reduced motion. |
| Features | Desktop, tablet and phone. Native platform switching, Family and breathing layouts, Watch presentation, section links and retained `#wellness` target. |
| Help | Desktop, tablet and phone. Family’s four answers, breathing/Watch answers, query-based expansion and cross-page links. |
| Knowledge Base | Desktop, tablet and phone. New topic cards, wrapping and links into relevant answers. |
| Subscriptions | Desktop, tablet and phone. Existing billing guidance and the new link into Family. No prices or entitlements were invented. |

- No horizontal overflow was observed at the reviewed widths. The 320px homepage also passed a manual 200% root-text enlargement check; controls wrapped without clipping. Platform controls are at least 48px tall.
- Sample captions remained separate from the animated phones. The changed hierarchy, padding and typography met the project’s 10/10 visual review target in inspected captures. This is a design judgment about the changed surfaces, not an objective score for every website behavior.
- All 15 new PNG URLs returned HTTP 200 with `image/png`. Each file matches its supplied original and recorded SHA-256. No pixel retouching or screen cropping was performed.
- Preview console inspection returned no warnings or errors.
- `npm run build` passed without warnings or errors: 86 transformed modules, 23 prerendered pages, a 404 page, sitemap, robots.txt and RSS.
- `node --check src/data/resources.js`, `node --check src/data/metadata.js` and `git diff --check` passed. The repository has no separate lint or TypeScript-check script.
- No automated tests were written or run. No dependency or lockfile changes were made.

The selected image folder totals 3.21 MiB. Only the selected phone platform is rendered; only the homepage dashboard image is eager, with subsequent hero scenes lazy-loaded. The JavaScript bundle is 386.50kB (115.82kB gzip) and CSS 59.07kB (12.19kB gzip). These are build observations, not measured field performance or conversion results.

## Visual evidence

Screenshots are saved locally in:

`/Users/Apple/.codex/visualizations/2026/09/17/01a0af98-f845-77b3-968b-dab547ab4973/unfold-current-product-review-20261005/`

Useful comparisons and checks:

- `before-home-desktop.png` and `after-home-desktop.png`
- `after-home-phone-final.png` and `after-hero-phone-motion-final.png`
- `after-home-tablet.png`, `after-home-320.png` and `after-home-text200.png`
- `after-features-family-desktop.png`, `after-features-family-tablet.png` and `after-family-features-phone.png`
- `after-features-breathing-tablet.png` and `after-watch-phone.png`
- `after-help-family-phone.png`, `after-help-breathing-tablet.png` and `after-knowledge-topics-tablet.png`
- Final stronger hero: `premium-hero-desktop-day.png`, `premium-hero-desktop-write.png`, `premium-hero-desktop-talk.png`, `premium-hero-phone-pause.png`, `premium-hero-320-pause.png` and `premium-hero-tablet-android.png`
- Adaptive/accessibility checks: `premium-hero-laptop-compact.png`, `premium-home-text200-top.png` and `premium-home-text200.png`

## Release boundaries and remaining decisions

1. **App-release alignment:** The supplied README identifies fictional offline data, draft store campaign artwork and pending native release builds. Native captures use sample labels and availability qualifications; campaign posters were excluded. Samuel separately authorized the website publication. Confirm current native availability with the product team and adjust the website if release scope changes; publishing this site does not publish a native app build.
2. **Domain configuration:** On 5 October, `https://tryunfold.ai/` returned HTTP 200, while `https://www.tryunfold.ai/` failed certificate hostname validation. This requires the hosting/domain owner to configure valid www TLS and redirect it to the apex. A source-code redirect cannot fix the certificate handshake. Production configuration was not changed.
3. **Unverified scope:** Physical Safari/Android devices, automatic Android selection under a real Android user agent, screen-reader navigation, field Core Web Vitals, search indexing, conversion uplift and native app/store availability were not established by this browser review. Manual platform switching and session persistence were verified. Backend endpoints and authenticated executive-dashboard publishing were not revalidated or modified in this task.
4. **Preview and cleanup:** Local review used `http://127.0.0.1:4193/`. Reference tabs are closed and temporary viewport/text/media overrides are restored after validation. The task-owned preview process is stopped after publication verification. Existing unrelated `artifacts/` files are preserved.
