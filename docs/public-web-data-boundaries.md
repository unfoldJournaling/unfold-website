# Public website data boundaries

Unfold's public pages should show information that the team has deliberately published. The browser does not write to Firestore or hold Firebase administrative credentials. It calls the Unfold API through same-origin website routes; the executive dashboard uses its authenticated backend proxy.

| Data | System of record | Reason |
| --- | --- | --- |
| Careers, Journal stories, release notes | Firestore `marketingContent`, written through owner-only backend routes | Small editorial documents need drafts, revisions, fast publication and reversible withdrawal. |
| Feature requests and roadmap status | Firestore `websiteFeatureRequests`, written through the public and owner backend routes | Requests need moderation before they appear publicly; contact email remains private. |
| Bug reports and support replies | Backend support tickets in Neo4j | A ticket is an owned conversation with a message history and existing executive support access controls. |
| Executive identity and permissions | Existing Firebase executive identity plus backend verification | Publication and moderation require a verified owner; the website never decides who is an owner. |
| Journals, health context, and member product data | Existing backend product stores | Public marketing content must not become a second copy of sensitive member records. |

The public API returns only published roles, articles and release notes. Drafts and removed entries stay private. Public feature requests contain no email address. The owner can publish, unpublish, remove and restore content; revision checks prevent silently overwriting another editor's changes. The website refreshes visible public lists and roadmap cards, and rechecks when the tab regains focus.

Published roles and stories have dedicated server-rendered URLs, so shared links expose the content and metadata before client JavaScript runs. The live sitemap includes published role and story URLs. The live RSS feed includes published stories and falls back to the site's editorial stories when the publishing API is temporarily unavailable. Withdrawal removes the dynamic URL from the public API and the live sitemap; the detail route then returns 404.

Deploy the backend routes before the executive dashboard and website routes. Verify with a non-sensitive test item: create a draft, confirm it is absent publicly, publish it, confirm its detail URL and sitemap entry, withdraw it, and confirm the public URL returns 404. Check both desktop and mobile and confirm public responses contain no private contact details. The Firestore collections are currently read as small editorial sets; pagination and indexed queries should precede any large import of historical Canny requests.
