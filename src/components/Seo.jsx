import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getMetadata } from "../data/metadata.js";
export default function Seo({ contentError = null }) {
  const { pathname } = useLocation();
  const errorKind = contentError?.kind;
  const errorStatus = contentError?.status;
  useEffect(() => {
    const meta = getMetadata(pathname, errorStatus ? { kind: errorKind, status: errorStatus } : null);
    document.title = meta.title;
    const setMeta = (attribute, name, content) => {
      let element = document.head.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.append(element);
      }
      element.content = content;
    };
    setMeta("name", "description", meta.description);
    setMeta(
      "name",
      "robots",
      meta.noindex ? "noindex, follow" : "index, follow",
    );
    for (const [key, value] of Object.entries({
      title: meta.title,
      description: meta.description,
      url: meta.url,
      image: meta.image,
      "image:alt": meta.imageAlt,
      type: meta.type,
      site_name: "Unfold",
    }))
      setMeta("property", `og:${key}`, value);
    for (const [key, value] of Object.entries({
      title: meta.title,
      description: meta.description,
      image: meta.image,
      card: "summary_large_image",
    }))
      setMeta("name", `twitter:${key}`, value);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = meta.url;
    document.getElementById("page-schema")?.remove();
    if (meta.schema) {
      const script = document.createElement("script");
      script.id = "page-schema";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(meta.schema);
      document.head.append(script);
    }
  }, [pathname, errorKind, errorStatus]);
  return null;
}
