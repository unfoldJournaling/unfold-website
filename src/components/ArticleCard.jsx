import { Link } from "react-router-dom";
import { readingTime } from "../data/articles.js";
import Icon from "./Icon.jsx";

export function ArticleCover({ article, eager = false }) {
  return (
    <div className="article-cover" aria-hidden="true">
      <img
        src={article.cover}
        srcSet={`${article.cover.replace(".webp", "-480.webp")} 480w, ${article.cover.replace(".webp", "-960.webp")} 960w, ${article.cover} 1536w`}
        sizes={eager ? "(max-width: 820px) 100vw, 1100px" : "(max-width: 600px) 100vw, (max-width: 820px) 50vw, 33vw"}
        width="1536"
        height="1024"
        loading={eager ? "eager" : "lazy"}
        alt=""
      />
    </div>
  );
}
export default function ArticleCard({ article }) {
  return (
    <article className="article-card">
      <Link className="article-card-link" to={`/blog/${article.slug}`}>
        <ArticleCover article={article} />
        <div className="article-meta">
          <span>{article.category}</span>
          <span>{readingTime(article)} min read</span>
        </div>
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <span className="text-link">
          Read the story <Icon size={18} />
        </span>
      </Link>
    </article>
  );
}
