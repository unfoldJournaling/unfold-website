import { useState } from "react";
import { CONTACT_EMAIL } from "../data/site.js";

export default function SupportContactForm({ initialCategory = "question", heading = "Still have a question?", lockCategory = false, submitLabel = "Send message" }) {
  const [category, setCategory] = useState(initialCategory);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  async function submit(event) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setStatus(null);
    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, email, subject, message, website }),
      });
      if (!response.ok) throw new Error("We could not send your message. Please try again or email us directly.");
      setStatus({ kind: "success", text: "Message received. The team will reply by email." });
      setSubject("");
      setMessage("");
    } catch (error) {
      setStatus({ kind: "error", text: error.message });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="support-contact">
      <h2>{heading}</h2>
      <p>Send the team a message. Please leave out passwords and private journal entries.</p>
      <form className="support-contact-form" onSubmit={submit}>
        {!lockCategory && <><label htmlFor="support-category">What is this about?</label>
          <select id="support-category" value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="question">Question</option>
            <option value="problem">Problem</option>
            <option value="idea">Suggestion</option>
            <option value="billing">Billing</option>
          </select></>}
        <label htmlFor="support-email">Email for a reply</label>
        <input
          id="support-email" type="email" autoComplete="email" required maxLength={254}
          value={email} onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
        />
        <label htmlFor="support-subject">Subject</label>
        <input
          id="support-subject" required minLength={3} maxLength={120}
          value={subject} onChange={(event) => setSubject(event.target.value)}
          placeholder="A short summary"
        />
        <label htmlFor="support-message">Message</label>
        <textarea
          id="support-message" required minLength={3} maxLength={2000} rows={5}
          value={message} onChange={(event) => setMessage(event.target.value)}
          placeholder="Tell us what happened or what you need"
        />
        <div className="support-form-trap" aria-hidden="true">
          <label htmlFor="support-website">Website</label>
          <input id="support-website" tabIndex={-1} autoComplete="off"
            value={website} onChange={(event) => setWebsite(event.target.value)} />
        </div>
        <button type="submit" disabled={sending}>{sending ? "Sending…" : submitLabel}</button>
        {status && <p role={status.kind === "error" ? "alert" : "status"} className={`support-form-${status.kind}`}>{status.text}</p>}
        {status?.kind === "error" && <p className="support-form-recovery">
          Your message is still in the form. <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Unfold ${category}: ${subject}`)}&body=${encodeURIComponent(`Reply email: ${email}\n\n${message}`)}`}>Open an email draft</a> to send it directly.
        </p>}
      </form>
      <p className="support-contact-alternative">Prefer email? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
    </div>
  );
}
