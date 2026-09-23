import { Link } from "react-router-dom";
import { PageIntro } from "./components/ResourceBrowser.jsx";
import { DownloadCta } from "./components/SiteLayout.jsx";
import Icon from "./components/Icon.jsx";
import { CONTACT_EMAIL } from "./data/site.js";
export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="About Unfold"
        title={
          <>
            Your words come first.
            <br />
            <span>Unfold helps you reflect.</span>
          </>
        }
      >
        Unfold brings written and voice journaling, mood check-ins, and optional Luma reflections into one app. Your interpretation of your experience stays at the center.
      </PageIntro>
      <figure className="container about-photo">
        <img
          src="/images/morning-light.webp"
          width="1536"
          height="1024"
          alt="A ceramic cup by an open window in warm morning light"
        />
        <figcaption>Space for the ordinary moments, too.</figcaption>
      </figure>
      <section className="section container split-editorial">
        <div>
          <p className="eyebrow">Why we’re here</p>
          <h2>Understanding starts with paying attention.</h2>
        </div>
        <div>
          <p>
            Not every day comes with a clear beginning, middle, and end.
            Sometimes you only know that something felt different. Sometimes the
            same thought keeps returning.
          </p>
          <p>
            We’re building Unfold to make room for those moments. A journal
            entry, a mood check-in, or a thoughtful question can give you a
            place to begin. Over time, those small observations become something
            you can return to.
          </p>
          <p>
            The aim is simple: to help you reflect in a way that fits your life,
            with your own perspective at the center.
          </p>
        </div>
      </section>
      <section className="principles-section section">
        <div className="container">
          <p className="eyebrow">What guides the experience</p>
          <h2>Room to be a person.</h2>
          <div className="principles-list">
            {[
              [
                "Your words come first.",
                "A prompt is an invitation. An AI reflection is a perspective. Neither gets the final say on what your experience means.",
              ],
              [
                "Small is enough.",
                "A sentence counts. A quiet check-in counts. Reflection should fit into your life without becoming another standard to meet.",
              ],
              [
                "Curiosity over conclusions.",
                "Patterns can open a useful question. They don’t tell the whole story, establish a cause, or replace professional care.",
              ],
              [
                "Choices should be clear.",
                "Understand what you are sharing, review your permissions, and find the information you need about your data.",
              ],
            ].map(([title, text], index) => (
              <article key={title}>
                <span className="principle-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section container split-editorial">
        <div>
          <p className="eyebrow">Keep the conversation going</p>
          <h2>A thoughtful product keeps listening.</h2>
        </div>
        <div>
          <p>
            Have a question about Unfold or an idea that would make it more
            useful? We’d like to hear it.
          </p>
          <div className="editorial-links">
            <a className="text-link" href={`mailto:${CONTACT_EMAIL}`}>
              Say hello
              <Icon />
            </a>
            <a
              className="text-link"
              href="https://unfold.canny.io/feature-requests"
              target="_blank"
              rel="noreferrer"
            >
              Share a feature idea
              <Icon />
            </a>
            <Link className="text-link" to="/help">
              Find an answer
              <Icon />
            </Link>
          </div>
        </div>
      </section>
      <DownloadCta />
    </>
  );
}
