import useResourceQuery from "./hooks/useResourceQuery.js";
import { Link } from "react-router-dom";
import {
  articles,
  categories,
  filterArticles,
  readingTime,
} from "./data/articles.js";
import ArticleCard, { ArticleCover } from "./components/ArticleCard.jsx";
import Icon from "./components/Icon.jsx";
import { DownloadCta } from "./components/SiteLayout.jsx";

export default function Blog() {
  const { query, setQuery, category, setCategory, reset } = useResourceQuery("All stories");
  const allResults = filterArticles(query, category);
  const filtered = !query.trim() && category === "All stories" ? allResults.slice(1) : allResults;
  const featured = articles[0];
  return (
    <>
      <section className="blog-heading container">
        <p className="eyebrow">The Unfold Journal</p>
        <h1>
          Ideas for your journal.
          <br />
          <span>A practice of your own.</span>
        </h1>
        <p>
          Thoughtful reads, gentle prompts, and small rituals
          <br className="desktop-break" /> for getting to know yourself a little
          better.
        </p>
      </section>
      <section
        className="container featured-story"
        aria-labelledby="featured-title"
      >
        <Link
          className="featured-image"
          to={`/blog/${featured.slug}`}
          aria-label={`Read: ${featured.title}`}
        >
          <ArticleCover article={featured} eager />
        </Link>
        <div className="featured-copy">
          <p className="eyebrow">A good place to begin</p>
          <div className="article-meta">
            <span>{featured.category}</span>
            <span>{readingTime(featured)} min read</span>
          </div>
          <h2 id="featured-title">
            <Link to={`/blog/${featured.slug}`}>{featured.title}</Link>
          </h2>
          <p>{featured.description}</p>
          <Link className="text-link" to={`/blog/${featured.slug}`}>
            Read the story <Icon />
          </Link>
        </div>
      </section>
      <section
        className="section container stories"
        aria-labelledby="stories-title"
      >
        <div className="stories-heading">
          <h2 id="stories-title">Find something for today.</h2>
          <label className="search-field">
            <Icon name="search" size={20} />
            <span className="sr-only">Search stories</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the journal"
            />
          </label>
        </div>
        <div
          className="category-filters"
          role="group"
          aria-label="Filter stories by topic"
        >
          {categories.map((item) => (
            <button
              key={item}
              aria-pressed={category === item}
              className={category === item ? "is-selected" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="results-count" role="status">
          {filtered.length} {filtered.length === 1 ? "story" : "stories"}
          {category !== "All stories" ? ` in ${category}` : ""}
          {query.trim() ? ` matching “${query.trim()}”` : ""}
        </p>
        {filtered.length ? (
          <div className="article-grid">
            {filtered.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No stories found, yet.</h3>
            <p>Try a different word or explore another topic.</p>
            <button
              className="button"
              onClick={() => {
                reset();
              }}
            >
              Show all stories <Icon size={18} />
            </button>
          </div>
        )}
        <div className="journal-note">
          <p>
            Good things to come back to.
            <br />
            <span>
              Save a story for later, or follow along with our{" "}
              <a href="/feed.xml">RSS feed</a>.
            </span>
          </p>
        </div>
      </section>
      <DownloadCta />
    </>
  );
}
