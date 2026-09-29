import { useEffect } from "react";
import { Link } from "react-router-dom";
import ArticleCard, { ArticleCover } from "./components/ArticleCard.jsx";
import ContentBody from "./components/ContentBody.jsx";
import Icon from "./components/Icon.jsx";
import { DownloadCta } from "./components/SiteLayout.jsx";
import { articles, readingTime } from "./data/articles.js";
import { SITE_URL } from "./data/site.js";
import usePublishedContent from "./hooks/usePublishedContent.js";
import NotFound from "./NotFound.jsx";

function setMeta(name, value, attribute = "name") {
  const element = document.head.querySelector(`meta[${attribute}="${name}"]`);
  if (element) element.content = value;
}

export default function PublishedArticle({ slug }) {
  const { items, loading, error } = usePublishedContent("articles");
  const article = items.find((item) => item.slug === slug);
  useEffect(() => {
    if (!article) return;
    const title = `${article.title} — Unfold Journal`;
    const url = `${SITE_URL}/blog/${slug}`;
    document.title = title;
    setMeta("description", article.summary);
    setMeta("robots", "index, follow");
    setMeta("og:title", title, "property");
    setMeta("og:description", article.summary, "property");
    setMeta("og:url", url, "property");
    setMeta("og:type", "article", "property");
    setMeta("og:image", `${SITE_URL}${article.cover}`, "property");
    setMeta("twitter:title", title);
    setMeta("twitter:description", article.summary);
    setMeta("twitter:image", `${SITE_URL}${article.cover}`);
    const schema = document.createElement("script");
    schema.id = "page-schema";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.summary,
      datePublished: article.published_at,
      image: `${SITE_URL}${article.cover}`,
      author: { "@type": "Organization", name: "Unfold", url: SITE_URL },
      publisher: { "@type": "Organization", name: "Unfold", url: SITE_URL },
      mainEntityOfPage: url,
    });
    document.getElementById("page-schema")?.remove();
    document.head.append(schema);
    return () => {
      setMeta("robots", "noindex, follow");
      schema.remove();
    };
  }, [article, slug]);
  if (loading && !article) return <p className="container content-status" role="status">Loading story…</p>;
  if (error && !article) return <p className="container content-status" role="status">This story is temporarily unavailable. Please try again shortly.</p>;
  if (!article) return <NotFound />;
  const published = article.published_at?.slice(0, 10);
  return (
    <>
      <article className="article-page">
        <header className="article-header container">
          <Link className="back-link" to="/blog"><Icon /> Back to the Journal</Link>
          <div className="article-meta"><span>{article.category}</span><span>{readingTime(article)} min read</span></div>
          <h1>{article.title}</h1>
          <p className="article-deck">{article.summary}</p>
          <div className="article-byline">
            <img src="/Icon%20logo.png" width="32" height="32" alt="" />
            <span>Unfold</span>
            {published && <><span aria-hidden="true">·</span><time dateTime={published}>{new Date(`${published}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time></>}
          </div>
        </header>
        <div className="container article-hero"><ArticleCover article={article} eager /></div>
        <div className="container article-layout published-article-layout">
          <aside className="article-toc">
            <Link className="text-link" to="/get-app">Make space with Unfold <Icon size={17} /></Link>
          </aside>
          <div className="article-body">
            <ContentBody text={article.body} />
            <p className="editorial-note">The Journal offers ideas for everyday reflection and general information. It is not medical or mental-health advice.</p>
            <Link className="text-link" to="/blog">Explore the Journal <Icon size={18} /></Link>
          </div>
        </div>
      </article>
      <section className="section related-section"><div className="container"><div className="section-heading"><h2>Keep a little space open.</h2><Link className="text-link" to="/blog">All stories <Icon /></Link></div><div className="article-grid">{articles.slice(0, 3).map((item) => <ArticleCard key={item.slug} article={item} />)}</div></div></section>
      <DownloadCta />
    </>
  );
}
