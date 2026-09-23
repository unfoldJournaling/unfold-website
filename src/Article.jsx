import { Link, useParams } from "react-router-dom";
import { articles, getArticle, readingTime } from "./data/articles.js";
import ArticleCard, { ArticleCover } from "./components/ArticleCard.jsx";
import Icon from "./components/Icon.jsx";
import { DownloadCta } from "./components/SiteLayout.jsx";
import NotFound from "./NotFound.jsx";

export default function Article() {
  const { slug } = useParams();
  const article = getArticle(slug);
  if (!article) return <NotFound />;
  const related = articles
    .filter((item) => item.slug !== slug)
    .sort(
      (a, b) =>
        Number(b.category === article.category) -
        Number(a.category === article.category),
    )
    .slice(0, 3);
  return (
    <>
      <article className="article-page">
        <header className="article-header container">
          <Link className="back-link" to="/blog">
            <Icon /> Back to the Journal
          </Link>
          <div className="article-meta">
            <span>{article.category}</span>
            <span>{readingTime(article)} min read</span>
          </div>
          <h1>{article.title}</h1>
          <p className="article-deck">{article.description}</p>
          <div className="article-byline">
            <img src="/Icon%20logo.png" width="32" height="32" alt="" />
            <span>Unfold</span>
            {article.date && <><span aria-hidden="true">·</span>
            <time dateTime={article.date}>
              {new Date(`${article.date}T12:00:00Z`).toLocaleDateString(
                "en-GB",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "UTC",
                },
              )}
            </time></>}
          </div>
        </header>
        <div className="container article-hero">
          <ArticleCover article={article} eager />
        </div>
        <div className="container article-layout">
          <aside className="article-toc">
            <nav aria-label="In this story">
              <p className="eyebrow">In this story</p>
              {article.sections.map((section) => (
                <a href={`#${section.id}`} key={section.id}>
                  {section.title}
                </a>
              ))}
            </nav>
            <Link className="text-link" to="/get-app">
              Make space with Unfold <Icon size={17} />
            </Link>
          </aside>
          <div className="article-body">
            <p className="article-intro">{article.intro}</p>
            {article.sections.map((section) => (
              <section id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.after && <p>{section.after}</p>}
              </section>
            ))}
            <aside className="article-takeaway">
              <p className="eyebrow">A moment to try</p>
              <p>{article.takeaway}</p>
            </aside>
            {slug === "reflecting-with-ai" && (
              <p>
                For Unfold’s data practices, read our{" "}
                <Link to="/privacy">
                  Privacy Policy and Consumer Health Data Privacy Notice
                </Link>
                .
              </p>
            )}
            <p className="editorial-note">
              The Journal offers ideas for everyday reflection and general
              information. It is not medical or mental-health advice.
            </p>
            <Link className="text-link" to="/blog">
              Explore the Journal <Icon size={18} />
            </Link>
          </div>
        </div>
      </article>
      <section className="section related-section">
        <div className="container">
          <div className="section-heading">
            <h2>Keep a little space open.</h2>
            <Link className="text-link" to="/blog">
              All stories <Icon />
            </Link>
          </div>
          <div className="article-grid">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </div>
      </section>
      <DownloadCta />
    </>
  );
}
