import { Link } from "react-router-dom";
import Icon from "./components/Icon.jsx";
import { CONTACT_EMAIL } from "./data/site.js";
import usePublishedContent from "./hooks/usePublishedContent.js";
import "./careers.css";

const principles = [
  {
    number: "01",
    title: "Listen before interpreting.",
    description:
      "A journal is personal. We build tools that help people notice patterns and ask better questions, while leaving the meaning of their experience with them.",
  },
  {
    number: "02",
    title: "Make small moments count.",
    description:
      "One sentence, a voice note, or a quick mood check-in should feel worthwhile. The details matter when someone is making space in an ordinary day.",
  },
  {
    number: "03",
    title: "Earn trust in the details.",
    description:
      "Clear choices about data and honest boundaries for AI are part of the experience. People should understand what the product does and what it cannot do.",
  },
];

export default function Careers() {
  const { items: roles, loading, error } = usePublishedContent("roles");
  return (
    <>
      <section className="careers-hero container" aria-labelledby="careers-title">
        <div className="careers-hero-copy">
          <p className="eyebrow">Careers at Unfold</p>
          <h1 id="careers-title">
            Build a little more <span>room to reflect.</span>
          </h1>
          <p className="careers-lead">
            We’re making everyday reflection feel more human. If that is work
            you care about, this is where you can learn what guides it and find
            opportunities to join us.
          </p>
          <Link className="button" to="/careers#open-roles">
            See open roles <Icon size={19} />
          </Link>
        </div>
        <figure className="careers-hero-image">
          <img
            src="/images/quiet-moment.webp"
            srcSet="/images/quiet-moment-480.webp 480w, /images/quiet-moment-960.webp 960w, /images/quiet-moment.webp 1536w"
            sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 44vw, 500px"
            width="1536"
            height="1024"
            alt="An open blank journal in the morning light"
          />
          <figcaption>A little space can change how a day feels.</figcaption>
        </figure>
      </section>

      <section className="careers-purpose section" aria-labelledby="careers-purpose-title">
        <div className="container careers-purpose-inner">
          <p className="eyebrow">Why this work matters</p>
          <h2 id="careers-purpose-title">
            The tools we make should leave room for the person using them.
          </h2>
          <div className="careers-purpose-copy">
            <p>
              Unfold brings journaling, mood check-ins, and optional AI
              reflection together. People bring their own words, questions, and
              context. Our job is to make that space useful without claiming to
              know them better than they know themselves.
            </p>
            <Link className="text-link" to="/about">
              Get to know Unfold <Icon size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="careers-principles section container" aria-labelledby="careers-principles-title">
        <div className="careers-section-heading">
          <p className="eyebrow">What shapes the work</p>
          <h2 id="careers-principles-title">Care in every decision.</h2>
          <p>
            These product principles help us decide what belongs in Unfold and
            how each part should feel.
          </p>
        </div>
        <div className="careers-principle-list">
          {principles.map(({ number, title, description }) => (
            <article key={number}>
              <span className="careers-principle-number" aria-hidden="true">
                {number}
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="careers-openings section" id="open-roles" aria-labelledby="careers-openings-title">
        <div className="container">
          <div className="careers-section-heading">
            <p className="eyebrow">Join us</p>
            <h2 id="careers-openings-title">Open roles</h2>
          </div>
          {roles.length > 0 && (
            <div className="careers-role-list">
              {roles.map((role) => (
                <article key={role.slug} className="careers-role">
                  <span className="careers-role-department">{role.department}</span>
                  <div>
                    <h3><Link to={`/careers/${role.slug}`}>{role.title}</Link></h3>
                    <p className="careers-role-location">{role.location}</p>
                    {role.summary && <p>{role.summary}</p>}
                    <Link className="careers-role-details" to={`/careers/${role.slug}`}>Read role details <Icon size={16} /></Link>
                  </div>
                  <a className="text-link" href={role.application_url} target="_blank" rel="noopener noreferrer">
                    Apply <Icon size={18} />
                  </a>
                </article>
              ))}
            </div>
          )}
          {roles.length === 0 && loading && <p className="careers-openings-status" role="status">Checking current openings…</p>}
          {roles.length === 0 && error && <div className="careers-empty-state" role="status">
            <div>
              <h3>Current openings couldn’t load.</h3>
              <p>Please check back shortly. If you have a question about working with Unfold, you can reach the team directly.</p>
            </div>
            <a className="text-link" href={`mailto:${CONTACT_EMAIL}?subject=Careers%20at%20Unfold`}>
              Ask about careers <Icon size={18} />
            </a>
          </div>}
          {roles.length === 0 && !loading && !error && <div className="careers-empty-state">
            <div>
              <h3>No roles are listed right now.</h3>
              <p>
                We’ll share opportunities here when they become available. If
                you have a question about working with Unfold, get in touch.
              </p>
            </div>
            <a
              className="text-link"
              href={`mailto:${CONTACT_EMAIL}?subject=Careers%20at%20Unfold`}
            >
              Ask about careers <Icon size={18} />
            </a>
          </div>}
        </div>
      </section>
    </>
  );
}
