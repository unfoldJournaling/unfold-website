import { Link } from "react-router-dom";
import { roadmapColumns } from "./data/feedback.js";
import useFeatureBoard from "./hooks/useFeatureBoard.js";
import "./feedback.css";

export default function Roadmap() {
  const { items, loading, error } = useFeatureBoard();
  return <>
    <section className="feedback-intro container">
      <p className="eyebrow">The Unfold roadmap</p>
      <h1>What we're making room for.</h1>
      <p>A look at ideas the team has chosen to explore, work on, or release. Priorities can change as we learn. Have something in mind? <Link to="/feature-request">Share a request</Link>.</p>
    </section>
    {error && <p className="container roadmap-error" role="alert">The roadmap is unavailable right now. Please try again later.</p>}
    <section className="roadmap-grid container" aria-label="Product roadmap">
      {roadmapColumns.map((column) => <div className="roadmap-column" key={column.status}>
        <div className="roadmap-heading"><span className={`roadmap-dot ${column.status}`} /><h2>{column.title}</h2><span>{error ? "—" : items.filter((item) => item.status === column.status).length}</span></div>
        <p>{column.description}</p>
        {loading && <p role="status">Loading…</p>}
        {!loading && !error && !items.some((item) => item.status === column.status) && <div className="roadmap-empty">Nothing to share here yet.</div>}
        {items.filter((item) => item.status === column.status).map((item) => <article className="roadmap-card" key={item.id}><h3>{item.title}</h3><p>{item.details}</p></article>)}
      </div>)}
    </section>
  </>;
}
