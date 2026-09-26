import { SITE_URL } from "../src/data/site.js";

const apiOrigin = (process.env.UNFOLD_CONTENT_API_ORIGIN || "https://api.tryunfold.ai").replace(/\/$/, "");
const validSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export default async function handler(request, response) {
  try {
    const upstream = await fetch(`${apiOrigin}/public/content/articles`, { cache: "no-store" });
    if (!upstream.ok) throw new Error("Content unavailable");
    const payload = await upstream.json();
    if (!Array.isArray(payload.items)) throw new Error("Invalid content response");
    const urls = payload.items.filter((item) => item.kind === "article" && validSlug.test(item.slug))
      .map((item) => `<url><loc>${SITE_URL}/blog/${item.slug}</loc></url>`).join("");
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/xml; charset=utf-8");
    response.setHeader("Cache-Control", "no-store");
    response.end(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
  } catch {
    response.statusCode = 503;
    response.setHeader("Retry-After", "60");
    response.end("Sitemap temporarily unavailable.");
  }
}
