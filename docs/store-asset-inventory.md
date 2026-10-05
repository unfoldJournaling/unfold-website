# Product imagery — 5 October 2026

The website uses 15 native app captures from Samuel’s **Unfold CEO Screenshot Review - 2026-10-05** package. The accompanying README identifies all names, entries, Family members and wellness values as fictional offline samples. These files show the supplied product state; they do not establish availability in an App Store or Google Play release.

The new store campaign artwork in both supplied store folders is a **draft awaiting CEO approval**. It is useful for reviewing the intended product story, but is not rendered as an app screenshot inside another device frame.

## Selected assets

All files live in `public/images/product-20261005/`. Original pixels are preserved, with no cropping, retouching, screen reconstruction or added status bars. `sources.json` records original filenames, dimensions, byte counts and verified SHA-256 checksums. The complete selection is 3.21 MiB; only the active phone platform is rendered and only the homepage hero loads eagerly.

| Screen | Original capture | Website use |
| --- | --- | --- |
| Dashboard | `01-dashboard.png` on iOS and Android | Homepage hero; Luma brief and wellness summaries |
| Guided journal | `03-guided-journaling.png` on both platforms | Luma feature selector and journal chapter |
| Voice journal | `14-voice-journaling.png` on both platforms | Voice feature selector and chapter |
| Health | `02-health.png` on both platforms | Optional health context; each platform shows its own connection |
| Journal history | `04-journal-history.png` on both platforms | Searchable history feature selector and chapter |
| Breathing patterns | `10-breathing-patterns.png` on both platforms | Homepage pause section and breathing chapter |
| Family | `05-family.png` on both platforms | Homepage privacy/Family section and Family chapter |
| Watch breathing | Apple Watch `02-breathing.png` | Dedicated Apple Watch feature section |

The iPhone originals are 1206 × 2622; Android originals are 1080 × 2340. The Watch capture is 416 × 496. iPhone captures include their native Dynamic Island; the decorative CSS frame does not add a second Island. Android previews preserve Android system navigation and do not use an iPhone frame.

## Selection boundaries

- The home and Features pages offer explicit iPhone/Android switches, defaulting to Android on detected Android devices. Captions identify sample data and version/device variation.
- Family descriptions follow the current app’s `FamilyCategory` model and `familyPrivacyBoundary` copy: optional sleep, recovery, stress, mood and activity summaries; journals, conversations, Cycle data and location excluded. Plan payment is distinct from sharing permission. Current Family availability is checked in the app.
- The Watch section names the iPhone requirement. There is no released Wear OS app to imply.
- Watch wellbeing and appearance QA captures were excluded because the supplied review flags unresolved native contrast issues. Sharing-editor captures were excluded from the main showcase because they lack the complete native status-bar composition. They informed the consent descriptions.
- No sample score is presented as a real customer result, clinical outcome, testimonial or product-performance claim.
- Older App Store posters remain in the repository with their historical source manifest. They no longer appear in the product gallery.

## Motion

The hero is a scroll-driven, pinned product sequence: dashboard → written journal → voice → breathing. The phone turns in perspective as its native screen changes, with an opaque wipe rather than double-exposed status bars or text. Scrolling back reverses the sequence. Four scene controls also provide direct access. A brief entrance animation introduces the phone on page load. Short laptop windows use a compact arrangement.

The remaining phone previews respond to their viewport position with a small translation and fade. Motion uses the existing React stack and browser APIs, with passive scroll listeners, frame-coalesced writes, visibility checks and cleanup on unmount. Reduced-motion preferences disable pinning and motion while preserving manual scene selection. Enlarged text or an insufficient viewport also uses the static layout so controls cannot be trapped offscreen. No GSAP, WebGL, video payload or additional dependency is required.

The spacing around each screen reserves room for movement so it stays separate from its caption and platform switch. The motion is visual presentation, not an interactive recreation of the native app. Original files remain intact; the screen wipe temporarily masks part of a capture during the transition, then shows the complete next screen.
