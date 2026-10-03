import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import { staticRoutes } from "./src/data/metadata.js";
import feedHandler from "./api/feed.js";
import sitemapHandler from "./api/sitemap.js";
import articleHandler from "./api/blog/[slug].js";
import roleHandler from "./api/careers/[slug].js";

const deployment = JSON.parse(readFileSync(new URL("./vercel.json", import.meta.url), "utf8"));
const responseHeaders = Object.fromEntries(deployment.headers[0].headers.map(({key, value}) => [key, value]));
const contentOrigin = process.env.UNFOLD_CONTENT_API_ORIGIN;
const contentProxy = contentOrigin ? {
  "/api/content": {
    target: contentOrigin,
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api\/content/, "/public/content"),
  },
  "/api/feedback": {
    target: contentOrigin,
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api\/feedback/, "/public/feature-requests"),
  },
  "/api/support": {
    target: contentOrigin,
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api\/support/, "/support/contact"),
  },
} : {};

export default defineConfig(({ isPreview }) => ({
  appType: isPreview ? "mpa" : "spa",
  server: { proxy: contentProxy },
  preview: { headers: responseHeaders },
  plugins: [
    react(),
    {
      name: "static-page-preview",
      configurePreviewServer(server) {
        server.middlewares.use(async (request, response, next) => {
          const url = new URL(request.url, "http://localhost");
          const publicApiPath = url.pathname === "/api/feedback" ? "/public/feature-requests"
            : url.pathname === "/api/support" ? "/support/contact" : null;
          if (contentOrigin && publicApiPath) {
            try {
              const chunks = [];
              for await (const chunk of request) chunks.push(chunk);
              const upstream = await fetch(`${contentOrigin}${publicApiPath}`, {
                method: request.method,
                headers: { "Content-Type": "application/json" },
                ...(chunks.length ? { body: Buffer.concat(chunks) } : {}),
                cache: "no-store",
              });
              response.writeHead(upstream.status, { "Content-Type": upstream.headers.get("content-type") || "application/json", "Cache-Control": "no-store" });
              response.end(request.method === "HEAD" ? undefined : await upstream.text());
            } catch (error) { next(error); }
            return;
          }
          if (!["GET", "HEAD"].includes(request.method)) return next();
          if (url.pathname === "/faq" || url.pathname === "/faq/") {
            response.writeHead(308, { Location: `/help${url.search}` });
            response.end();
            return;
          }
          if (url.pathname === "/feed-live.xml" || url.pathname === "/sitemap-live.xml") {
            await (url.pathname === "/feed-live.xml" ? feedHandler : sitemapHandler)(request, response);
            return;
          }
          if (contentOrigin && url.pathname.startsWith("/api/content/")) {
            try {
              const upstream = await fetch(`${contentOrigin}${url.pathname.replace(/^\/api\/content/, "/public/content")}${url.search}`, { cache: "no-store" });
              response.writeHead(upstream.status, { "Content-Type": upstream.headers.get("content-type") || "application/json", "Cache-Control": "no-store" });
              response.end(request.method === "HEAD" ? undefined : await upstream.text());
            } catch (error) { next(error); }
            return;
          }
          if (url.pathname !== "/" && url.pathname.endsWith("/")) {
            response.writeHead(308, {
              Location: url.pathname.replace(/\/+$/, "") + url.search,
            });
            response.end();
            return;
          }
          if (url.pathname.startsWith("/blog/") && !staticRoutes.includes(url.pathname) && !extname(url.pathname)) {
            request.query = { slug: url.pathname.slice(6) };
            await articleHandler(request, response);
            return;
          }
          if (url.pathname.startsWith("/careers/") && !extname(url.pathname)) {
            request.query = { slug: url.pathname.slice(9) };
            await roleHandler(request, response);
            return;
          }
          if (!staticRoutes.includes(url.pathname) && !extname(url.pathname)) {
            try {
              const html = await readFile(
                resolve(
                  server.config.root,
                  server.config.build.outDir,
                  "404.html",
                ),
              );
              response.writeHead(404, {
                "Content-Type": "text/html; charset=utf-8",
              });
              response.end(request.method === "HEAD" ? undefined : html);
            } catch (error) {
              next(error);
            }
            return;
          }
          next();
        });
      },
    },
  ],
}));
