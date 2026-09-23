import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import { staticRoutes } from "./src/data/metadata.js";

const deployment = JSON.parse(readFileSync(new URL("./vercel.json", import.meta.url), "utf8"));
const responseHeaders = Object.fromEntries(deployment.headers[0].headers.map(({key, value}) => [key, value]));

export default defineConfig(({ isPreview }) => ({
  appType: isPreview ? "mpa" : "spa",
  preview: { headers: responseHeaders },
  plugins: [
    react(),
    {
      name: "static-page-preview",
      configurePreviewServer(server) {
        server.middlewares.use(async (request, response, next) => {
          if (!["GET", "HEAD"].includes(request.method)) return next();
          const url = new URL(request.url, "http://localhost");
          if (url.pathname !== "/" && url.pathname.endsWith("/")) {
            response.writeHead(308, {
              Location: url.pathname.replace(/\/+$/, "") + url.search,
            });
            response.end();
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
