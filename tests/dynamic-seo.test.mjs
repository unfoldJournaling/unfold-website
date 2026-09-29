import test from "node:test";
import assert from "node:assert/strict";
import handler, { renderPublishedArticle } from "../api/blog/[slug].js";
import roleHandler, { renderPublishedRole } from "../api/careers/[slug].js";
import sitemap from "../api/sitemap.js";
import feed from "../api/feed.js";

const story = {
  kind: "article",
  slug: "a-gentler-week",
  title: "A gentler week",
  summary: "Small ways to reflect on the week.",
  body: "## Notice a moment\n\nWrite what mattered.\n\n- Begin slowly\n- Keep a thought <private>",
  cover: "/images/quiet-moment.webp",
  category: "Journaling",
  published_at: "2026-09-26T08:00:00+00:00",
};
const role = {
  kind: "role",
  slug: "product-designer-12345678",
  title: "Product designer",
  summary: "Shape a more thoughtful journal.",
  body: "## What you will do\n\nDesign with care <always>.\n\n- Listen to people",
  department: "Design",
  location: "Remote",
  application_url: "https://jobs.example.org/apply?team=design&role=product",
  published_at: "2026-09-26T08:00:00+00:00",
};

function fakeResponse() {
  return {
    statusCode: 200,
    headers: {},
    setHeader(name, value) { this.headers[name] = value; },
    end(value) { this.body = value; },
  };
}

test("published stories include unique indexable metadata and escaped readable content", async () => {
  const html = await renderPublishedArticle(story, story.slug);
  assert.match(html, /<title>A gentler week — Unfold Journal<\/title>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/tryunfold.ai\/blog\/a-gentler-week"/);
  assert.match(html, /<meta name="robots" content="index, follow"/);
  assert.match(html, /"@type":"BlogPosting"/);
  assert.match(html, /<h1>A gentler week<\/h1>/);
  assert.match(html, /<nav id="main-navigation"/);
  assert.match(html, /<footer class="site-footer"/);
  assert.match(html, /<h2>Notice a moment<\/h2>/);
  assert.match(html, /Keep a thought &lt;private&gt;/);
  assert.doesNotMatch(html, /<private>/);
  assert.doesNotMatch(html, /data-prerendered="true"/);
});

test("the live sitemap lists only valid published story URLs", async () => {
  const originalFetch = global.fetch;
  try {
    global.fetch = async (url) => new Response(JSON.stringify({ items: url.endsWith("/roles") ? [role, { ...role, slug: "bad<slug" }] : [story, { ...story, slug: "bad<slug" }] }), { status: 200 });
    const result = fakeResponse();
    await sitemap({}, result);
    assert.equal(result.statusCode, 200);
    assert.match(result.body, /https:\/\/tryunfold.ai\/blog\/a-gentler-week/);
    assert.match(result.body, /https:\/\/tryunfold.ai\/careers\/product-designer-12345678/);
    assert.doesNotMatch(result.body, /bad&lt;slug|bad<slug/);
  } finally {
    global.fetch = originalFetch;
  }
});

test("the live RSS feed includes published stories and keeps editorial stories during an outage", async () => {
  const originalFetch = global.fetch;
  try {
    global.fetch = async () => new Response(JSON.stringify({ items: [story, { ...story, slug: "bad<slug" }] }), { status: 200 });
    const published = fakeResponse();
    await feed({}, published);
    assert.equal(published.statusCode, 200);
    assert.match(published.body, /<title>A gentler week<\/title>/);
    assert.match(published.body, /https:\/\/tryunfold.ai\/blog\/how-to-start-journaling/);
    assert.doesNotMatch(published.body, /bad<slug/);

    global.fetch = async () => { throw new Error("upstream unavailable"); };
    const fallback = fakeResponse();
    await feed({}, fallback);
    assert.equal(fallback.statusCode, 200);
    assert.match(fallback.body, /https:\/\/tryunfold.ai\/blog\/how-to-start-journaling/);
  } finally {
    global.fetch = originalFetch;
  }
});

test("published roles have readable details, safe application links and indexable metadata", async () => {
  const html = await renderPublishedRole(role, role.slug);
  assert.match(html, /<title>Product designer — Careers at Unfold<\/title>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/tryunfold.ai\/careers\/product-designer-12345678"/);
  assert.match(html, /"@type":"JobPosting"/);
  assert.match(html, /<h2>What you will do<\/h2>/);
  assert.match(html, /<nav id="main-navigation"/);
  assert.match(html, /<footer class="site-footer"/);
  assert.match(html, /Design with care &lt;always&gt;/);
  assert.match(html, /jobs.example.org\/apply\?team=design&amp;role=product/);
  assert.doesNotMatch(html, /<always>/);
  await assert.rejects(renderPublishedRole({ ...role, application_url: "javascript:alert(1)" }, role.slug));
});

test("the role function returns published content and distinguishes missing roles from outages", async () => {
  const originalFetch = global.fetch;
  try {
    global.fetch = async () => new Response(JSON.stringify(role), { status: 200 });
    const published = fakeResponse();
    await roleHandler({ query: { slug: role.slug } }, published);
    assert.equal(published.statusCode, 200);
    assert.match(published.body, /Product designer/);

    global.fetch = async () => new Response(null, { status: 404 });
    const missing = fakeResponse();
    await roleHandler({ query: { slug: role.slug } }, missing);
    assert.equal(missing.statusCode, 404);

    global.fetch = async () => { throw new Error("upstream unavailable"); };
    const unavailable = fakeResponse();
    await roleHandler({ query: { slug: role.slug } }, unavailable);
    assert.equal(unavailable.statusCode, 503);
  } finally {
    global.fetch = originalFetch;
  }
});

test("the story function returns published content, 404 for missing stories, and 503 for outages", async () => {
  const originalFetch = global.fetch;
  try {
    global.fetch = async () => new Response(JSON.stringify(story), { status: 200 });
    const published = fakeResponse();
    await handler({ query: { slug: story.slug } }, published);
    assert.equal(published.statusCode, 200);
    assert.match(published.body, /A gentler week/);
    assert.equal(published.headers["Cache-Control"], "no-store");

    global.fetch = async () => new Response(null, { status: 404 });
    const missing = fakeResponse();
    await handler({ query: { slug: story.slug } }, missing);
    assert.equal(missing.statusCode, 404);

    global.fetch = async () => { throw new Error("upstream unavailable"); };
    const unavailable = fakeResponse();
    await handler({ query: { slug: story.slug } }, unavailable);
    assert.equal(unavailable.statusCode, 503);
    assert.equal(unavailable.headers["Retry-After"], "60");
  } finally {
    global.fetch = originalFetch;
  }
});
