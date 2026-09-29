import { Link } from "react-router-dom";
import SupportContactForm from "./components/SupportContactForm.jsx";
import "./feedback.css";

export default function ReportBug() {
  return <>
    <section className="feedback-intro container">
      <p className="eyebrow">Report a bug</p>
      <h1>Something not working?</h1>
      <p>Help us understand what happened and how to reproduce it. If you're looking for answers, try the <Link to="/knowledge-base">knowledge base</Link>.</p>
    </section>
    <section className="container bug-report-layout">
      <div><h2>What to include</h2><p>Tell us what you expected, what happened instead, and which device and app version you're using. Please avoid passwords, payment information, and private journal entries.</p><p>We’ll reply by email when we can help or need more detail.</p></div>
      <SupportContactForm initialCategory="problem" heading="Send a bug report" lockCategory submitLabel="Send bug report" />
    </section>
  </>;
}
