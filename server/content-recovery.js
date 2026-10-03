import { readFile } from "node:fs/promises";

export async function sendContentRecovery(response, kind, status) {
  const html = await readFile(new URL(`../dist/content-${kind}-${status}.html`, import.meta.url), "utf8");
  response.statusCode = status;
  response.setHeader("Content-Type", "text/html; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("X-Robots-Tag", "noindex, follow");
  if (status === 503) response.setHeader("Retry-After", "60");
  response.end(html);
}
