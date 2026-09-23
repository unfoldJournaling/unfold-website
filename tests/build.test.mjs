import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { join } from "node:path";
import { staticRoutes, getMetadata, escapeHtml } from "../src/data/metadata.js";
import { articles } from "../src/data/articles.js";
const readPage = (route) =>
  readFile(
    route === "/" ? "dist/index.html" : join("dist", `${route}.html`),
    "utf8",
  );
const unescape = (value) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"');

test("every public route ships usable HTML with unique metadata, one main heading and no hydration-only shell", async () => {
  for (const route of staticRoutes) {
    const html = await readPage(route);
    const meta = getMetadata(route);
    assert.match(html, /data-prerendered="true"/, route);
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, route);
    assert.ok(html.includes(`<title>${escapeHtml(meta.title)}</title>`), route);
    assert.ok(html.includes(`href="${meta.url}"`), route);
    assert.match(html, /<main id="main-content"/, route);
    assert.doesNotMatch(html, /\.project-local/, route);
  }
});

test("all local hyperlinks, fragment targets and image assets resolve in the production output", async () => {
  for (const route of staticRoutes) {
    const html = await readPage(route);
    const hrefs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) =>
      unescape(match[1]),
    );
    for (const href of hrefs) {
      if (!href.startsWith("/") && !href.startsWith("#")) continue;
      const url = new URL(href, `https://tryunfold.ai${route}`);
      if (/\.[a-z0-9]+$/i.test(url.pathname)) {
        await access(join("dist", decodeURIComponent(url.pathname)));
      } else {
        const target = await readPage(url.pathname);
        if (url.hash)
          assert.ok(
            target.includes(`id="${url.hash.slice(1)}"`),
            `${route}: ${href}`,
          );
      }
    }
  }
});

test("articles include complete copy and valid BlogPosting JSON before JavaScript runs", async () => {
  for (const article of articles) {
    const html = await readPage(`/blog/${article.slug}`);
    for (const section of article.sections) {
      assert.ok(html.includes(`id="${section.id}"`));
      assert.ok(
        html.includes(
          escapeHtml(section.paragraphs[0]).replace(/&#39;/g, "&#x27;"),
        ),
      );
    }
    const json = JSON.parse(
      html.match(
        /<script id="page-schema" type="application\/ld\+json">([^<]+)<\/script>/,
      )[1],
    );
    assert.equal(json["@type"], "BlogPosting");
    assert.equal(json.headline, article.title);
  }
});

test("RSS, sitemap, robots and the actual 404 page are generated", async () => {
  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  const rss = await readFile("dist/feed.xml", "utf8");
  const notFound = await readFile("dist/404.html", "utf8");
  for (const route of staticRoutes)
    assert.ok(sitemap.includes(`https://tryunfold.ai${route}`));
  for (const article of articles)
    assert.ok(
      rss.includes(
        `<guid isPermaLink="true">https://tryunfold.ai/blog/${article.slug}</guid>`,
      ),
    );
  assert.equal((rss.match(/<item>/g) || []).length, articles.length);
  assert.match(
    await readFile("dist/robots.txt", "utf8"),
    /Sitemap: https:\/\/tryunfold.ai\/sitemap.xml/,
  );
  assert.match(notFound, /noindex, follow/);
  assert.match(notFound, /This page isn/);
});


test("share assets, image variants and privacy contents are included in the release", async () => {
  for (const article of articles) {
    await access(`dist/images/social-${article.slug}.png`);
    for (const width of [480, 960]) await access(`dist${article.cover.replace('.webp', `-${width}.webp`)}`);
  }
  const privacy = await readPage('/privacy');
  assert.match(privacy, /Find what you need/);
  for (let i = 1; i <= 17; i++) {
    assert.ok(privacy.includes(`href="#privacy-section-${i}"`));
    assert.ok(privacy.includes(`id="privacy-section-${i}"`));
  }
  assert.doesNotMatch(await readFile('dist/feed.xml', 'utf8'), /Invalid Date/);
});
