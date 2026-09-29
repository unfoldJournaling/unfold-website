import { articles } from "../src/data/articles.js";
import { escapeHtml } from "../src/data/metadata.js";
import { SITE_URL } from "../src/data/site.js";

const apiOrigin = (process.env.UNFOLD_CONTENT_API_ORIGIN || "https://api.tryunfold.ai").replace(/\/$/, "");
const validSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function rssItem(article) {
  const url = `${SITE_URL}/blog/${article.slug}`;
  const published = article.published_at || (article.date ? `${article.date}T12:00:00Z` : null);
  const date = published && Number.isFinite(Date.parse(published))
    ? `<pubDate>${new Date(published).toUTCString()}</pubDate>`
    : "";
  return `<item><title>${escapeHtml(article.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeHtml(article.summary || article.description || "")}</description><category>${escapeHtml(article.category || "Journal")}</category>${date}</item>`;
}

export default async function handler(_request, response) {
  let published = [];
  try {
    const upstream = await fetch(`${apiOrigin}/public/content/articles`, { cache: "no-store" });
    if (!upstream.ok) throw new Error("Content unavailable");
    const payload = await upstream.json();
    if (!Array.isArray(payload.items)) throw new Error("Invalid content response");
    published = payload.items.filter((item) => item.kind === "article" && validSlug.test(item.slug) && item.title);
  } catch {
    // The editorial articles remain available when the publishing API is down.
  }
  const seen = new Set();
  const items = [...published, ...articles].filter((item) => {
    if (!validSlug.test(item.slug) || seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>The Unfold Journal</title><link>${SITE_URL}/blog</link><description>Thoughtful reads, gentle prompts, and small rituals for everyday reflection.</description><language>en</language><atom:link href="${SITE_URL}/feed-live.xml" rel="self" type="application/rss+xml" />${items.map(rssItem).join("")}</channel></rss>\n`;
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.end(xml);
}
