import test from "node:test";
import assert from "node:assert/strict";
import { preview } from "vite";
import { staticRoutes, getMetadata, escapeHtml } from "../src/data/metadata.js";

test("production server serves every clean URL, redirects trailing slashes and returns real 404s", async () => {
  const server = await preview({
    preview: { host: "127.0.0.1", port: 0, strictPort: true, open: false },
  });
  const origin = `http://127.0.0.1:${server.httpServer.address().port}`;
  try {
    for (const route of staticRoutes) {
      const response = await fetch(origin + route);
      assert.equal(response.status, 200, route);
      assert.equal(response.headers.get("x-content-type-options"), "nosniff");
      assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
      assert.match(response.headers.get("content-security-policy"), /object-src 'none'/);
      const html = await response.text();
      assert.ok(
        html.includes(`<title>${escapeHtml(getMetadata(route).title)}</title>`),
        `Wrong HTML for ${route}`,
      );
      assert.match(html, /data-prerendered="true"/);
    }
    const redirect = await fetch(`${origin}/blog/`, { redirect: "manual" });
    assert.equal(redirect.status, 308);
    assert.equal(redirect.headers.get("location"), "/blog");
    for (const path of ["/not-a-page", "/blog/not-a-story"]) {
      const response = await fetch(origin + path);
      assert.equal(response.status, 404);
      assert.match(await response.text(), /Page not found — Unfold/);
    }
    const font = await fetch(`${origin}/fonts/nunito-latin.woff2`);
    assert.equal(font.status, 200);
    assert.match(font.headers.get("content-type"), /font\/woff2/);
  } finally {
    server.httpServer.closeAllConnections();
    await new Promise((resolve, reject) =>
      server.httpServer.close((error) => (error ? reject(error) : resolve())),
    );
  }
});
