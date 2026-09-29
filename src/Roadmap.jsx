import { Link } from "react-router-dom";
import { roadmapColumns } from "./data/feedback.js";
import { CONTACT_EMAIL } from "./data/site.js";
import Icon from "./components/Icon.jsx";
import useFeatureBoard from "./hooks/useFeatureBoard.js";
import "./feedback.css";

export default function Roadmap() {
  const { items, loading, error } = useFeatureBoard();
  return <>
    <section className="feedback-intro roadmap-intro container">
      <p className="eyebrow">The Unfold roadmap</p>
      <h1>What we're making room for.</h1>
      <p>A look at ideas the team has chosen to explore, work on, or release. Priorities can change as we learn. Have something in mind? {error && !items.length ? <a href={`mailto:${CONTACT_EMAIL}?subject=An%20idea%20for%20Unfold`}>Tell us by email</a> : <Link to="/feature-request">Share a request</Link>}.</p>
    </section>
    {error && !items.length && <div className="container roadmap-unavailable" role="status">
      <p className="eyebrow">Current priorities</p>
      <h2>The live roadmap couldn’t load.</h2>
      <p>We only show team-reviewed plans and updates here. Please check back, or tell us what you would like Unfold to make room for.</p>
      <a className="text-link" href={`mailto:${CONTACT_EMAIL}?subject=An%20idea%20for%20Unfold`}>Share an idea by email <Icon size={18} /></a>
    </div>}
    {error && items.length > 0 && <p className="container roadmap-stale" role="status">Live updates couldn’t load. Showing the last available board.</p>}
    {(!error || items.length > 0) && <section className="roadmap-grid container" aria-label="Product roadmap">
      {roadmapColumns.map((column) => <div className="roadmap-column" key={column.status}>
        <div className="roadmap-heading"><span className={`roadmap-dot ${column.status}`} /><h2>{column.title}</h2><span>{items.filter((item) => item.status === column.status).length}</span></div>
        <p>{column.description}</p>
        {loading && <p role="status">Loading…</p>}
        {!loading && !error && !items.some((item) => item.status === column.status) && <div className="roadmap-empty">Nothing to share here yet.</div>}
        {items.filter((item) => item.status === column.status).map((item) => <article className="roadmap-card" key={item.id}><h3>{item.title}</h3><p>{item.details}</p></article>)}
      </div>)}
    </section>}
  </>;
}
