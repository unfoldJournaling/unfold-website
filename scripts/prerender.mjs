import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { createServer } from "vite";
import {
  staticRoutes,
  renderMetadata,
  escapeHtml,
} from "../src/data/metadata.js";
import { articles } from "../src/data/articles.js";
import { SITE_URL } from "../src/data/site.js";

const template = await readFile("dist/index.html", "utf8");
const vite = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
  ssr: {
    noExternal: ["react-router", "react-router-dom"],
    resolve: { conditions: ["module-sync", "module", "node", "import"] },
  },
  optimizeDeps: { noDiscovery: true },
});
try {
  const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");
  await writeFile(
    "dist/article-shell.html",
    template.replace(/<!--page-meta-start-->[\s\S]*?<!--page-meta-end-->/, () => `<!--page-meta-start-->${renderMetadata("/blog/_published")}<!--page-meta-end-->`),
  );
  for (const route of [...staticRoutes, "/404"]) {
    const output =
      route === "/" ? "dist/index.html" : join("dist", `${route}.html`);
    const html = template
      .replace(/<!--page-meta-start-->[\s\S]*?<!--page-meta-end-->/, () =>
        renderMetadata(route),
      )
      .replace(
        '<div id="root"></div>',
        () => `<div id="root" data-prerendered="true">${render(route)}</div>`,
      );
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, html);
  }
  const publishedFallback = template
    .replace(/<!--page-meta-start-->[\s\S]*?<!--page-meta-end-->/, () => renderMetadata("/blog/_published"))
    .replace('<div id="root"></div>', () => `<div id="root" data-prerendered="true">${render("/blog/_published")}</div>`);
  await writeFile("dist/blog/_published.html", publishedFallback);
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticRoutes.map((route) => `<url><loc>${SITE_URL}${route}</loc></url>`).join("")}</urlset>\n`,
  );
  await writeFile(
    "dist/robots.txt",
    `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\nSitemap: ${SITE_URL}/sitemap-live.xml\n`,
  );
  await writeFile(
    "dist/feed.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>The Unfold Journal</title><link>${SITE_URL}/blog</link><description>Thoughtful reads, gentle prompts, and small rituals for everyday reflection.</description><language>en</language><atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />${articles.map((article) => `<item><title>${escapeHtml(article.title)}</title><link>${SITE_URL}/blog/${article.slug}</link><guid isPermaLink="true">${SITE_URL}/blog/${article.slug}</guid><description>${escapeHtml(article.description)}</description><category>${escapeHtml(article.category)}</category>${article.date ? `<pubDate>${new Date(`${article.date}T12:00:00Z`).toUTCString()}</pubDate>` : ""}</item>`).join("")}</channel></rss>\n`,
  );
  console.log(
    `Prerendered ${staticRoutes.length} pages, a 404 page, sitemap, robots.txt, and RSS feed.`,
  );
} finally {
  await vite.close();
}
