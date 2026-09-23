import test from "node:test";
import assert from "node:assert/strict";
import {
  articles,
  categories,
  filterArticles,
  getArticle,
  readingTime,
} from "../src/data/articles.js";
import { detectPlatform } from "../src/data/site.js";
import { getMetadata, renderMetadata } from "../src/data/metadata.js";

test("journal search supports case, whitespace, category intersections and empty results", () => {
  assert.equal(filterArticles("  WRITER  ")[0].slug, "how-to-start-journaling");
  assert.equal(filterArticles("", "Everyday rituals").length, 2);
  assert.equal(filterArticles("Sunday", "Everyday rituals").length, 1);
  assert.equal(filterArticles("Sunday", "Prompts").length, 0);
  assert.equal(filterArticles("no such topic").length, 0);
  assert.equal(filterArticles(" ").length, articles.length);
});

test("published stories have stable unique URLs, complete sections and valid categories", () => {
  assert.ok(articles.length >= 6);
  assert.equal(
    new Set(articles.map((article) => article.slug)).size,
    articles.length,
  );
  for (const article of articles) {
    assert.match(article.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(categories.includes(article.category));
    assert.ok(article.intro.length > 100);
    assert.ok(article.sections.length >= 3);
    assert.equal(
      new Set(article.sections.map((section) => section.id)).size,
      article.sections.length,
    );
    assert.ok(
      article.sections.every(
        (section) => section.paragraphs.length && section.title,
      ),
    );
    assert.ok(readingTime(article) >= 2);
    assert.equal(getArticle(article.slug), article);
  }
  assert.equal(getArticle("does-not-exist"), undefined);
});

test("platform detection preserves iPhone, iPadOS, Android and desktop download paths", () => {
  assert.equal(detectPlatform({ userAgent: "Mozilla iPhone OS 18" }), "ios");
  assert.equal(detectPlatform({ userAgent: "Mozilla iPad" }), "ios");
  assert.equal(
    detectPlatform({ userAgent: "Mozilla Macintosh", maxTouchPoints: 5 }),
    "ios",
  );
  assert.equal(
    detectPlatform({ userAgent: "Mozilla Macintosh", maxTouchPoints: 0 }),
    "desktop",
  );
  assert.equal(detectPlatform({ userAgent: "Mozilla Android 15" }), "android");
  assert.equal(detectPlatform({ userAgent: "Mozilla Windows" }), "desktop");
  assert.equal(detectPlatform({}), "desktop");
  assert.equal(detectPlatform(), "desktop");
});

test("article metadata resolves deep links, canonical trailing slashes and unknown pages", () => {
  const article = articles[0];
  const meta = getMetadata(`/blog/${article.slug}/`);
  assert.equal(meta.type, "article");
  assert.equal(meta.url, `https://tryunfold.ai/blog/${article.slug}`);
  assert.equal(meta.schema.headline, article.title);
  assert.equal(meta.noindex, false);
  assert.equal(
    getMetadata("/privacy").title,
    "Privacy & Consumer Health Data Notice — Unfold",
  );
  assert.equal(getMetadata("/blog/unknown").noindex, true);
  assert.equal(getMetadata("/unknown").noindex, true);
  assert.match(renderMetadata("/privacy"), /Privacy &amp; Consumer/);
  assert.match(
    renderMetadata(`/blog/${article.slug}`),
    /application\/ld\+json/,
  );
});

test("resource search intersects topics and text, handles whitespace and recovers from no matches", async () => {
  const { promptLibrary, helpItems, filterResources } =
    await import("../src/data/resources.js");
  assert.equal(promptLibrary.length, 24);
  assert.equal(new Set(promptLibrary.map((item) => item.id)).size, 24);
  assert.equal(filterResources(promptLibrary, "", "Checking in").length, 6);
  assert.equal(
    filterResources(promptLibrary, "  WEATHER ", "Checking in").length,
    1,
  );
  assert.equal(
    filterResources(promptLibrary, "weather", "Small joys").length,
    0,
  );
  assert.equal(filterResources(promptLibrary, "unmatched word").length, 0);
  assert.equal(filterResources(promptLibrary, "  ").length, 24);
  assert.equal(filterResources(helpItems, "", "Subscriptions").length, 4);
  assert.ok(filterResources(helpItems, "cancel").length >= 1);
  assert.equal(filterResources(helpItems, "xyzxyz").length, 0);
});


test("metadata describes the category and uses branded share images with truthful dates", () => {
  assert.match(getMetadata("/").title, /Journaling & Mood Tracking/);
  assert.equal(getMetadata("/").schema.publisher["@type"], "Organization");
  for (const article of articles) {
    const meta = getMetadata(`/blog/${article.slug}`);
    assert.ok(meta.image.endsWith(`/social-${article.slug}.png`));
    assert.ok(meta.imageAlt.includes(article.title));
    assert.equal(meta.schema.breadcrumb.itemListElement.at(-1).item, meta.url);
    if (!article.date) assert.equal(meta.schema.datePublished, undefined);
    else assert.match(article.date, /^\d{4}-\d{2}-\d{2}$/);
  }
});
