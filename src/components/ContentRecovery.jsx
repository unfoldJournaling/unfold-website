import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import Seo from "./Seo.jsx";

export default function ContentRecovery({ kind = "story", status = 404 }) {
  const isStory = kind === "story";
  const unavailable = status === 503;
  const noun = isStory ? "story" : "role";
  return (
    <>
      <Seo contentError={{ kind, status }} />
      <section className="container not-found content-recovery">
        <p className="eyebrow">
          {unavailable ? "A momentary pause" : "404 · A little off the page"}
        </p>
        <h1>
          {unavailable ? `This ${noun} couldn’t load.` : `This ${noun} isn’t here.`}
        </h1>
        <p>
          {unavailable
            ? "Please try again in a moment. You can still explore the rest of Unfold."
            : "It may have moved or is no longer available. Let’s find your next step."}
        </p>
        <div className="hero-actions content-recovery-actions">
          {unavailable && (
            <button className="button" onClick={() => window.location.reload()}>
              Try again <Icon name="refresh" />
            </button>
          )}
          <Link className={unavailable ? "text-link" : "button"} to={isStory ? "/blog" : "/careers"}>
            {isStory ? "Explore the Journal" : "View careers"} <Icon />
          </Link>
          {!unavailable && <Link className="text-link" to="/">Back to Unfold <Icon /></Link>}
        </div>
      </section>
    </>
  );
}
