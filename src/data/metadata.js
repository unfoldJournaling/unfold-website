import { articles, getArticle } from "./articles.js";
import { SITE_URL } from "./site.js";
export const staticRoutes = [
  "/",
  "/blog",
  "/features",
  "/prompts",
  "/help",
  "/knowledge-base",
  "/feature-request",
  "/roadmap",
  "/report-bug",
  "/about",
  "/careers",
  "/releases",
  "/plans",
  "/get-app",
  "/privacy",
  "/terms",
  "/delete-account",
  ...articles.map((article) => `/blog/${article.slug}`),
];
const pageData = {
  "/features": [
    "Explore Unfold — Journaling, Mood & Wellness Features",
    "Explore written and voice journaling, mood check-ins, stress-style reflections, and optional wellness context in Unfold.",
  ],
  "/prompts": [
    "Interactive Journal Prompts — Find a place to begin | Unfold",
    "Browse 24 Unfold prompts by topic, then answer one in your own words in Interactive Journal.",
  ],
  "/help": [
    "Unfold Help — Answers & support",
    "Find answers about getting started with Unfold, journaling, privacy, subscriptions, and account deletion. Contact the team for help.",
  ],
  "/knowledge-base": ["Unfold Knowledge Base — Guides & answers", "Browse Unfold help topics for getting started, journaling, privacy, and subscriptions."],
  "/feature-request": ["Request a Feature — Help shape Unfold", "Suggest an improvement to Unfold and explore product requests shared on the public board."],
  "/roadmap": ["Unfold Roadmap — What’s planned and released", "Explore ideas planned, in progress, and released for Unfold."],
  "/report-bug": ["Report a Bug — Unfold Support", "Tell the Unfold team about a product issue and get help by email."],
  "/about": [
    "About Unfold — Space for everyday reflection",
    "Learn what guides Unfold: thoughtful journaling, curiosity, clear choices, and space to understand your own experience.",
  ],
  "/careers": [
    "Careers at Unfold — Build space for reflection",
    "Explore careers at Unfold, the principles behind our journaling and mood check-in experience, and how to ask about future opportunities.",
  ],
  "/releases": [
    "Release Notes — What’s new in Unfold",
    "See the latest Unfold updates for iOS and Android, with clear notes on what changed.",
  ],
  "/plans": [
    "Unfold Subscriptions — Billing & subscription guidance",
    "Learn about Unfold’s optional subscriptions, where to find current local prices, and how to manage an Apple or Google Play subscription.",
  ],
  "/": [
    "Unfold — Journaling, Mood & Wellness App",
    "Make room for yourself with Unfold. Explore journaling, mood check-ins, stress reflections, and optional wellness context on iOS and Android.",
  ],
  "/blog": [
    "The Unfold Journal — Ideas for everyday reflection",
    "Thoughtful reads, journaling prompts, and simple rituals to help you get to know yourself. Explore the Unfold Journal.",
  ],
  "/get-app": [
    "Get Unfold — Your everyday wellness companion",
    "Download Unfold for iOS or Android. Make room for journaling, mood check-ins, and optional wellness context.",
  ],
  "/privacy": [
    "Privacy & Consumer Health Data Notice — Unfold",
    "Read the Unfold Privacy Policy and Consumer Health Data Privacy Notice, including your permissions, data choices, and rights.",
  ],
  "/terms": [
    "Terms of Use — Unfold",
    "Read the terms that apply to Unfold, including subscriptions, acceptable use, and wellness information.",
  ],
  "/delete-account": [
    "Delete Your Account — Unfold",
    "Learn how to request deletion of your Unfold account and associated data through the app or by email.",
  ],
};
export function getMetadata(pathname, contentError = null) {
  if (contentError) {
    const unavailable = contentError.status === 503;
    return {
      ...getMetadata(pathname),
      title: unavailable ? "Temporarily unavailable — Unfold" : "Page not found — Unfold",
      description: unavailable
        ? "This content couldn’t load. Try again in a moment or explore the rest of Unfold."
        : "This content may have moved or is no longer available. Explore Unfold to find your next step.",
      noindex: true,
      schema: null,
    };
  }
  const requestedPath = pathname.replace(/\/+$/, "") || "/";
  const path = requestedPath === "/faq" ? "/help" : requestedPath;
  const article = path.startsWith("/blog/")
    ? getArticle(path.slice(6))
    : undefined;
  const data = pageData[path];
  const title = article
    ? `${article.title} — Unfold Journal`
    : data?.[0] || "Page not found — Unfold";
  const description =
    article?.description ||
    data?.[1] ||
    "This page could not be found. Explore Unfold or return to the Journal.";
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  const image = `${SITE_URL}${article ? `/images/social-${article.slug}.png` : "/og-image.png"}`;
  const imageAlt = article ? `Unfold Journal: ${article.title}` : "Unfold — Journaling, mood and wellness context";
  let schema = article
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.title,
        description,
        ...(article.date ? {datePublished: article.date, dateModified: article.date} : {}),
        image,
        author: { "@type": "Organization", name: "Unfold", url: SITE_URL },
        publisher: {
          "@type": "Organization",
          name: "Unfold",
          url: SITE_URL,
          logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      }
    : path === "/"
      ? {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Unfold",
          url: SITE_URL,
          description,
        }
      : null;
  const organization = { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Unfold", url: SITE_URL, logo: `${SITE_URL}/logo.png` };
  const breadcrumbs = path === "/" || (!article && !data) ? null : {
    "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Unfold", item: `${SITE_URL}/` },
      ...(article ? [{ "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/blog` }] : []),
      { "@type": "ListItem", position: article ? 3 : 2, name: article?.title || title.split(" — ")[0], item: url },
    ],
  };
  schema = schema ? {...schema, ...(path === "/" ? { publisher: organization } : {}), ...(breadcrumbs ? {breadcrumb: breadcrumbs} : {})} : breadcrumbs ? {"@context": "https://schema.org", "@type": "WebPage", name: title, url, breadcrumb: breadcrumbs} : null;
  return {
    title,
    description,
    url,
    image,
    imageAlt,
    type: article ? "article" : "website",
    noindex: !article && !data,
    schema,
  };
}
export function escapeHtml(text) {
  return String(text).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
}
export function renderMetadata(path, contentError = null) {
  const meta = getMetadata(path, contentError);
  return `<title>${escapeHtml(meta.title)}</title>\n<meta name="description" content="${escapeHtml(meta.description)}" />\n<link rel="canonical" href="${escapeHtml(meta.url)}" />\n<meta name="robots" content="${meta.noindex ? "noindex, follow" : "index, follow"}" />\n<meta property="og:site_name" content="Unfold" />\n<meta property="og:type" content="${meta.type}" />\n<meta property="og:title" content="${escapeHtml(meta.title)}" />\n<meta property="og:description" content="${escapeHtml(meta.description)}" />\n<meta property="og:url" content="${escapeHtml(meta.url)}" />\n<meta property="og:image" content="${meta.image}" />\n<meta property="og:image:alt" content="${escapeHtml(meta.imageAlt)}" />\n<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:title" content="${escapeHtml(meta.title)}" />\n<meta name="twitter:description" content="${escapeHtml(meta.description)}" />\n<meta name="twitter:image" content="${meta.image}" />\n${meta.schema ? `<script id="page-schema" type="application/ld+json">${JSON.stringify(meta.schema).replace(/</g, "\\u003c")}</script>` : ""}`;
}
