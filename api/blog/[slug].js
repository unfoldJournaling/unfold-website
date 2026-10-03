import { readFile } from "node:fs/promises";
import { escapeHtml } from "../../src/data/metadata.js";
import { SITE_URL } from "../../src/data/site.js";
import { contentHtml } from "../../src/data/content-html.js";
import { sendContentRecovery } from "../../server/content-recovery.js";

const apiOrigin = (process.env.UNFOLD_CONTENT_API_ORIGIN || "https://api.tryunfold.ai").replace(/\/$/, "");
const validSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function renderArticleMetadata(article, slug) {
  const title = `${article.title} — Unfold Journal`;
  const description = article.summary;
  const url = `${SITE_URL}/blog/${slug}`;
  const cover = /^\/images\/[a-z0-9-]+\.webp$/.test(article.cover) ? article.cover : "/images/quiet-moment.webp";
  const image = `${SITE_URL}${cover}`;
  const published = /^\d{4}-\d{2}-\d{2}$/.test(article.published_at?.slice(0, 10) || "") ? article.published_at.slice(0, 10) : null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description,
    ...(published ? { datePublished: published } : {}),
    image,
    author: { "@type": "Organization", name: "Unfold", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Unfold", url: SITE_URL },
    mainEntityOfPage: url,
  };
  return `<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}" />
<link rel="canonical" href="${url}" />
<meta name="robots" content="index, follow" />
<meta property="og:type" content="article" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${image}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(title)}" />
<meta name="twitter:description" content="${escapeHtml(description)}" />
<meta name="twitter:image" content="${image}" />
<script id="page-schema" type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`;
}

export async function renderPublishedArticle(article, slug) {
  const shell = await readFile(new URL("../../dist/article-shell.html", import.meta.url), "utf8");
  const title = escapeHtml(article.title);
  const summary = escapeHtml(article.summary);
  const category = escapeHtml(article.category);
  const cover = /^\/images\/[a-z0-9-]+\.webp$/.test(article.cover) ? article.cover : "/images/quiet-moment.webp";
  const published = /^\d{4}-\d{2}-\d{2}$/.test(article.published_at?.slice(0, 10) || "") ? article.published_at.slice(0, 10) : null;
  const date = published && !Number.isNaN(Date.parse(published))
    ? `<time datetime="${published}">${escapeHtml(new Date(`${published}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }))}</time>`
    : "";
  const content = `<article class="article-page"><header class="article-header container"><a class="back-link" href="/blog">Back to the Journal</a><div class="article-meta"><span>${category}</span></div><h1>${title}</h1><p class="article-deck">${summary}</p><div class="article-byline"><span>Unfold</span>${date}</div></header><div class="container article-hero"><img class="article-cover" src="${cover}" alt="" /></div><div class="container article-layout published-article-layout"><div class="article-body">${contentHtml(article.body)}<p class="editorial-note">The Journal offers ideas for everyday reflection and general information. It is not medical or mental-health advice.</p></div></div></article>`;
  return shell
    .replace(/<!--page-meta-start-->[\s\S]*?<!--page-meta-end-->/, () => renderArticleMetadata(article, slug))
    .replace("<!--dynamic-content-->", content);
}

export default async function handler(request, response) {
  const slug = String(request.query?.slug || "");
  if (!validSlug.test(slug)) {
    await sendContentRecovery(response, "story", 404);
    return;
  }
  try {
    const upstream = await fetch(`${apiOrigin}/public/content/articles/${slug}`, { cache: "no-store", signal: AbortSignal.timeout(8000) });
    if (upstream.status === 404) {
      await sendContentRecovery(response, "story", 404);
      return;
    }
    if (!upstream.ok) throw new Error("Content unavailable");
    const article = await upstream.json();
    if (article.kind !== "article" || article.slug !== slug || !article.title || !article.summary || !article.body) throw new Error("Invalid content response");
    const html = await renderPublishedArticle(article, slug);
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.setHeader("Cache-Control", "no-store");
    response.statusCode = 200;
    response.end(html);
  } catch {
    await sendContentRecovery(response, "story", 503);
  }
}
