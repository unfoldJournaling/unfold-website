# Unfold Website

The public Unfold site: product information, app downloads, The Unfold Journal,
a prompt library, product and subscription guides, support, and the existing
privacy, terms, and account deletion pages.

## Development

Use Node.js 22 or later and the committed npm lockfile.

```bash
npm ci
npm run dev
```

## Build and validate

```bash
npm run build
npm test
npm audit
npm run preview
```

Run the build before the tests: integration tests inspect the actual `dist/`
output and start a temporary local preview server. They check page HTML and
metadata, article content, local links and anchors, assets, RSS, sitemap, clean
URLs, 404 responses, search behavior, and platform detection.

The production build generates static HTML for every known route, then hydrates
interactive controls in the browser. This makes articles, metadata, and core
navigation available before JavaScript loads. The development server uses normal
client rendering; use the production preview for direct-link and hydration QA.
After adding or removing routes, rebuild and restart the preview server so its
route list matches the generated output.

## Project structure

- `src/App.jsx`: landing page and product interactions.
- `src/Features.jsx`, `src/About.jsx`, `src/Plans.jsx`: product and company pages.
- `src/Prompts.jsx`, `src/Help.jsx`: searchable resources and support.
- `src/data/resources.js`: original prompts, help answers, and resource filtering.
- `src/Blog.jsx`, `src/Article.jsx`: journal library and article pages.
- `src/Careers.jsx`, `src/RoleDetail.jsx`, `src/ReleaseNotes.jsx`:
  public roles and product updates backed by the publishing API.
- `src/FeatureRequest.jsx`, `src/Roadmap.jsx`: private idea submission and
  the owner-curated public roadmap.
- `src/data/articles.js`: article content, categories, search, and reading time.
- `src/data/site.js`: canonical site URL, store URLs, contact, and prompts.
- `src/data/metadata.js`: route metadata and structured data.
- `src/components/`: shared navigation, footer, cards, and download links.
- `src/styles.css`: shared Nunito typography, tokens, and responsive styles.
- `scripts/prerender.mjs`: static pages, sitemap, robots, RSS, and 404 generation.
- `tests/`: content and production-build regression tests.

## Public publishing

The executive dashboard publishes roles, Journal stories, and release notes to
the backend's `marketingContent` Firestore collection. Public pages fetch only
published items through `/api/content/*`; removing or withdrawing one takes it
off the public page without rebuilding the site. The dashboard also moderates
private feature requests from `/feature-request`, publishing selected ideas to
`/roadmap`. Email addresses never appear in the public response. The public
site calls same-origin API paths, which the deployment rewrites to the Unfold
backend. Configure `UNFOLD_CONTENT_API_ORIGIN` for local development and the
server-rendered live feed/sitemap. Deploy and verify the backend publishing API
before enabling a deployed dashboard workflow. Test a real owner publish and
withdraw cycle after deployment; a local preview cannot verify production
Firebase credentials or Firestore data.

## Add an editorial journal article

Add an entry to `src/data/articles.js` with a unique `slug`, title, description,
category, publication date (or `null` until publication), cover, intro, sections, and takeaway. Each section
needs a stable, unique `id` for the table of contents. Categories come from the
same file. The first article is featured on the journal index; the first three
appear on the homepage.

Set the actual first-publication date during the release; never substitute the drafting date. Dates are omitted from the page, structured data, and feed while null.
Add a 1200 × 630 branded share card at `public/images/social-<slug>.png`.
Keep publication dates accurate. Write substantive original copy, distinguish
reflection from medical advice, and verify product claims against current
product information. Avoid unsupported statistics, testimonials, or promises.
Run the build and tests after editing. Editorial articles receive a route,
canonical URL, social metadata, BlogPosting structured data, and RSS/sitemap
entries. Dashboard-published stories also receive public detail pages and
live feed/sitemap entries.

## Hosting

Deploy only the contents of `dist/` using the established hosting workflow.
`vercel.json` enables clean URLs and removes trailing slashes. Netlify's generated
`_redirects` preserves existing static files and sends unknown routes to the
custom 404 page with status 404. Other hosts must resolve `/blog/example` to
`/blog/example.html`, serve `/` from `index.html`, and serve `404.html` with an
HTTP 404 for unknown paths. Do not use an unconditional homepage SPA fallback:
it would serve the wrong article HTML and break hydration and indexing.

Keep `/privacy`, `/terms`, `/delete-account`, and `/get-app` stable. Mobile visits
to `/get-app` redirect to the existing platform store; desktop shows both stores.

## Visuals and content sources

Nunito is self-hosted; its SIL Open Font License is in `public/fonts/OFL.txt`.
Product gallery images come from the public
[Unfold App Store listing](https://apps.apple.com/us/app/unfold-journal-mood-tracker/id6743553743).
The notebook, window, and water images are original editorial artwork in
`public/images/quiet-moment.webp`, `morning-light.webp`, and
`water-reflection.webp`. They illustrate the journal and are not app screenshots.
The website uses the existing Unfold marks. Product descriptions follow the
public app listing and the existing privacy notice; storefronts present current
localized subscription pricing.

## Manual browser checks

Check every public route at phone, tablet, and desktop widths, including the
features, prompts, about, plans, and help pages. Verify menu open/close/Escape, feature
selection, prompt cycling, FAQ disclosure, search/category combinations, empty
results/reset, prompt copying and its unavailable state, feature chapter links,
subscription-help destinations, article contents links, direct refresh, keyboard focus, reduced
motion, and 200% text. Confirm the browser console has no hydration or runtime
errors and that pages do not overflow horizontally.

## Release verification

After an authorized deployment, verify `/robots.txt` is plain text, `/sitemap.xml` is XML, all article URLs return their own HTML, and an unknown URL returns HTTP 404. Verify the configured security headers on the actual host. Submit the sitemap through the authorized Search Console account, and measure field performance after sufficient traffic. Analytics and consent changes require a defined privacy and measurement plan; this site adds no third-party tracking. Confirm store screenshots and subscription entitlements with the product team before replacing listing-derived previews or adding a plan comparison.
