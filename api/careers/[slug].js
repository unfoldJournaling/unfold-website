import { readFile } from "node:fs/promises";
import { escapeHtml } from "../../src/data/metadata.js";
import { contentHtml } from "../../src/data/content-html.js";
import { SITE_URL } from "../../src/data/site.js";
import { sendContentRecovery } from "../../server/content-recovery.js";

const apiOrigin = (process.env.UNFOLD_CONTENT_API_ORIGIN || "https://api.tryunfold.ai").replace(/\/$/, "");
const validSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function safeApplicationUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}

export async function renderPublishedRole(role, slug) {
  const applicationUrl = safeApplicationUrl(role.application_url);
  if (!applicationUrl) throw new Error("Invalid role application URL");
  const shell = await readFile(new URL("../../dist/article-shell.html", import.meta.url), "utf8");
  const title = `${role.title} — Careers at Unfold`;
  const summary = role.summary || `Learn about the ${role.title} role at Unfold.`;
  const url = `${SITE_URL}/careers/${slug}`;
  const published = /^\d{4}-\d{2}-\d{2}$/.test(role.published_at?.slice(0, 10) || "") ? role.published_at.slice(0, 10) : null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: role.body,
    ...(published ? { datePosted: published } : {}),
    hiringOrganization: { "@type": "Organization", name: "Unfold", sameAs: SITE_URL },
    ...(role.location.toLowerCase().includes("remote") ? { jobLocationType: "TELECOMMUTE" } : { jobLocation: { "@type": "Place", address: role.location } }),
    url,
  };
  const metadata = `<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(summary)}" />
<link rel="canonical" href="${url}" />
<meta name="robots" content="index, follow" />
<meta property="og:type" content="website" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(summary)}" />
<meta property="og:url" content="${url}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(title)}" />
<meta name="twitter:description" content="${escapeHtml(summary)}" />
<script id="page-schema" type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`;
  const content = `<article class="career-detail container"><a class="back-link" href="/careers#open-roles">All open roles</a><header class="career-detail-heading"><p class="eyebrow">${escapeHtml(role.department)} · ${escapeHtml(role.location)}</p><h1>${escapeHtml(role.title)}</h1><p class="career-detail-lead">${escapeHtml(summary)}</p><a class="button" href="${escapeHtml(applicationUrl)}" target="_blank" rel="noopener noreferrer">Apply for this role</a></header><div class="career-detail-layout"><aside><p class="eyebrow">At a glance</p><p>${escapeHtml(role.department)}</p><p>${escapeHtml(role.location)}</p></aside><div class="article-body career-detail-body">${contentHtml(role.body)}<a class="button" href="${escapeHtml(applicationUrl)}" target="_blank" rel="noopener noreferrer">Apply for this role</a></div></div></article>`;
  return shell
    .replace(/<!--page-meta-start-->[\s\S]*?<!--page-meta-end-->/, () => metadata)
    .replace("<!--dynamic-content-->", content);
}

export default async function handler(request, response) {
  const slug = String(request.query?.slug || "");
  if (!validSlug.test(slug)) {
    await sendContentRecovery(response, "role", 404);
    return;
  }
  try {
    const upstream = await fetch(`${apiOrigin}/public/content/roles/${slug}`, { cache: "no-store", signal: AbortSignal.timeout(8000) });
    if (upstream.status === 404) {
      await sendContentRecovery(response, "role", 404);
      return;
    }
    if (!upstream.ok) throw new Error("Content unavailable");
    const role = await upstream.json();
    if (role.kind !== "role" || role.slug !== slug || !role.title || !role.body || !role.department || !role.location) throw new Error("Invalid content response");
    const html = await renderPublishedRole(role, slug);
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.setHeader("Cache-Control", "no-store");
    response.statusCode = 200;
    response.end(html);
  } catch {
    await sendContentRecovery(response, "role", 503);
  }
}
