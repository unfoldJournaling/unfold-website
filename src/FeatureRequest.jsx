import { useState } from "react";
import { Link } from "react-router-dom";
import { feedbackRequest, roadmapColumns } from "./data/feedback.js";
import useFeatureBoard from "./hooks/useFeatureBoard.js";
import "./feedback.css";

export default function FeatureRequest() {
  const { items, loading, error: loadError } = useFeatureBoard();
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({ title: "", details: "", email: "", website: "" });
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState(null);

  async function submit(event) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setMessage(null);
    try {
      await feedbackRequest("", { method: "POST", body: JSON.stringify(form) });
      setForm({ title: "", details: "", email: "", website: "" });
      setMessage({ type: "success", text: "Thanks for sharing your idea. The team will review it before it appears publicly." });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setSending(false);
    }
  }

  const visible = items.filter((item) => `${item.title} ${item.details}`.toLowerCase().includes(query.toLowerCase().trim()));
  return <>
    <section className="feedback-intro container">
      <p className="eyebrow">Shape what comes next</p>
      <h1>Your ideas have a place here.</h1>
      <p>Tell us what would make Unfold more useful for your everyday reflection. We read every request and share selected work on our <Link to="/roadmap">public roadmap</Link>.</p>
    </section>
    <section className="feedback-layout container" aria-label="Feature requests">
      <div className="feedback-browser">
        <div className="feedback-heading"><h2>Explore requests</h2><span>{visible.length} public ideas</span></div>
        <label htmlFor="feature-search">Search ideas</label>
        <input id="feature-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by topic" />
        {loading && <p role="status">Loading requests…</p>}
        {loadError && <p role="alert">Requests are unavailable right now. You can still send your idea.</p>}
        {!loading && !loadError && !visible.length && <p className="feedback-empty">{query ? "No ideas match that search." : "No public ideas yet. Be the first to share one."}</p>}
        {visible.map((item) => <article className="feedback-item" key={item.id}>
          <div><h3>{item.title}</h3><p>{item.details}</p></div>
          <span className="feedback-status">{roadmapColumns.find((column) => column.status === item.status)?.title}</span>
        </article>)}
      </div>
      <aside className="feedback-submit">
        <p className="eyebrow">A note to the team</p>
        <h2>Suggest an improvement</h2>
        <p>Describe the problem or moment where Unfold could help. Please leave out private journal entries and health details.</p>
        <form onSubmit={submit}>
          <label htmlFor="feature-title">Short title</label>
          <input id="feature-title" required minLength={5} maxLength={120} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="What would you like to do?" />
          <label htmlFor="feature-details">Tell us more</label>
          <textarea id="feature-details" required minLength={10} maxLength={2000} rows={6} value={form.details} onChange={(event) => setForm({ ...form, details: event.target.value })} placeholder="What would this help you with?" />
          <label htmlFor="feature-email">Email for a follow-up</label>
          <input id="feature-email" type="email" required maxLength={254} autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" />
          <div className="support-form-trap" aria-hidden="true"><label htmlFor="feature-website">Website</label><input id="feature-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} /></div>
          <button className="button" type="submit" disabled={sending}>{sending ? "Sending…" : "Send request"}</button>
          {message && <p role={message.type === "error" ? "alert" : "status"} className={`feedback-${message.type}`}>{message.text}</p>}
        </form>
        <p className="feedback-note">Your email stays with the team. Public roadmap cards show only the idea, details, and progress.</p>
      </aside>
    </section>
  </>;
}
