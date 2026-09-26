import { Link } from "react-router-dom";
import { helpItems } from "./data/resources.js";
import "./feedback.css";

export default function KnowledgeBase() {
  const categories = [...new Set(helpItems.map((item) => item.category))];
  return <>
    <section className="feedback-intro container">
      <p className="eyebrow">Knowledge base</p>
      <h1>Find your way around Unfold.</h1>
      <p>Clear guides for getting started, journaling, privacy, and subscriptions. For a searchable list of answers, visit the <Link to="/faq">FAQs</Link>.</p>
    </section>
    <section className="knowledge-grid container" aria-label="Help topics">
      {categories.map((category, index) => <article className="knowledge-card" key={category}>
        <span className="knowledge-number">0{index + 1}</span>
        <h2>{category}</h2>
        <ul>{helpItems.filter((item) => item.category === category).map((item) => <li key={item.q}><Link to={`/faq?q=${encodeURIComponent(item.q)}`}>{item.q}</Link></li>)}</ul>
      </article>)}
    </section>
    <section className="container knowledge-help"><h2>Need a person?</h2><p>Tell us what you need and the team will get back to you.</p><Link className="button" to="/help">Contact support</Link></section>
  </>;
}
