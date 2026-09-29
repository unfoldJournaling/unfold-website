import { Link } from "react-router-dom";
import Icon from "./components/Icon.jsx";
export default function NotFound() {
  return (
    <section className="container not-found">
      <p className="eyebrow">404 · A little off the page</p>
      <h1>
        Let’s find your
        <br />
        way back.
      </h1>
      <p>This page isn’t here. There’s still plenty to explore.</p>
      <div className="hero-actions">
        <Link className="button" to="/">
          Back to Unfold <Icon />
        </Link>
        <Link className="text-link" to="/blog">
          Explore the Journal <Icon />
        </Link>
      </div>
    </section>
  );
}
