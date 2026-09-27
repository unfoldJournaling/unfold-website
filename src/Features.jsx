import ProductScreenshot from "./components/ProductScreenshot.jsx";
import { Link } from "react-router-dom";
import { PageIntro } from "./components/ResourceBrowser.jsx";
import { DownloadCta } from "./components/SiteLayout.jsx";
import Icon from "./components/Icon.jsx";
const chapters = [
  {
    id: "journal",
    label: "01 / Put it into words",
    title: "Your thoughts. Your way of telling them.",
    text: "Some days the words flow. Other days, one sentence is enough. Write or speak about what’s on your mind, with guided prompts when you want somewhere to begin.",
    detail:
      "Luma can offer a follow-up question or a new angle. AI-guided reflection is optional; you decide what feels useful and what to leave behind.",
    image: 3,
    alt: "Unfold iPhone preview of an AI-guided journal entry",
    to: "/prompts",
    link: "Try a journaling prompt",
  },
  {
    id: "patterns",
    label: "02 / Notice the everyday",
    title: "There’s more to a day than a single feeling.",
    text: "Check in with your mood and add context to your days. On supported devices, optional Apple Health or Health Connect connections bring sleep and activity into the picture.",
    detail:
      "Look for observations that invite curiosity. An association is not a cause, a diagnosis, or a prediction. Your lived experience matters more than any single score.",
    image: 4,
    alt: "Unfold iPhone preview showing optional Apple Health context",
    previewNote: "This iPhone preview shows Apple Health. Android uses Health Connect on supported devices.",
    to: "/blog/mood-tracking-with-curiosity",
    link: "A curious approach to mood tracking",
  },
  {
    id: "reflect",
    label: "03 / Return with perspective",
    title: "Find words for familiar patterns.",
    text: "Stress style reflections offer a way to notice how you respond to pressure. Take what resonates and leave what does not.",
    detail:
      "A stress style is a starting point for curiosity, not a fixed identity or clinical assessment. Your experience matters more than a label.",
    image: 2,
    alt: "Unfold iPhone preview of a stress style reflection",
    to: "/blog/a-weekly-reflection-ritual",
    link: "Try a weekly reflection",
  },
  {
    id: "wellness",
    label: "04 / Read your day in context",
    title: "Wellness trends, with room for nuance.",
    text: "Explore general wellness estimates for stress, recovery, and sleep when supported data is available. See the sources and explanations behind the numbers inside the app.",
    detail: "These views are informational, can be incomplete, and do not diagnose or predict a condition. You decide how much health context to connect and when to pause.",
    image: 5,
    alt: "Unfold iPhone preview of an illustrative stress trend",
    to: "/privacy",
    link: "Understand your data choices",
  },
];
export default function Features() {
  return (
    <>
      <PageIntro
        eyebrow="Inside Unfold"
        title={
          <>
            Write. Check in.
            <br />
            <span>Reflect on your days.</span>
          </>
        }
      >
        Journaling, mood check-ins, and optional wellness context, brought
        together so you can listen to yourself a little more closely.
      </PageIntro>
      <nav className="container chapter-nav" aria-label="On this page">
        <a href="#journal">Journal your way</a>
        <a href="#patterns">Health context</a>
        <a href="#reflect">Stress style</a>
        <a href="#wellness">Wellness context</a>
        <a href="#pause">Take a pause</a>
      </nav>
      <div className="container feature-chapters">
        {chapters.map((item) => (
          <section
            className="feature-chapter"
            id={item.id}
            key={item.id}
            aria-labelledby={`${item.id}-title`}
          >
            <div className="chapter-copy">
              <p className="eyebrow">{item.label}</p>
              <h2 id={`${item.id}-title`}>{item.title}</h2>
              <p>{item.text}</p>
              <p>{item.detail}</p>
              <Link className="text-link" to={item.to}>
                {item.link}
                <Icon size={19} />
              </Link>
            </div>
            <figure className="chapter-screen">
              <ProductScreenshot image={item.image} alt={item.alt} presentation="device" />
              <figcaption>{item.previewNote || "iPhone app preview. Screens and features may vary by version and platform."}</figcaption>
            </figure>
          </section>
        ))}
      </div>
      <section
        id="pause"
        className="section pause-section"
        aria-labelledby="pause-title"
      >
        <div className="container split-editorial">
          <div>
            <p className="eyebrow">05 / Between the words</p>
            <h2 id="pause-title">
              A moment to pause is part of the picture, too.
            </h2>
          </div>
          <div>
            <p>
              Breathing and focus tools give you another way to make a little
              space in your day. On supported Apple Watches, the companion
              brings mood logging and supported breathing sessions to your
              wrist.
            </p>
            <p>
              Availability depends on your platform, device, app version, and
              permissions. Check your store listing for current compatibility.
            </p>
            <Link className="text-link" to="/get-app">
              Find Unfold for your device
              <Icon />
            </Link>
          </div>
        </div>
      </section>
      <section className="section container split-editorial">
        <div>
          <p className="eyebrow">Your reflection, your choices</p>
          <h2>Context with consent.</h2>
        </div>
        <div>
          <p>
            Health connections and applicable AI features ask for your
            permission. You can review those choices and withdraw consent.
            Unfold’s privacy notice explains how journal and health information
            is handled.
          </p>
          <Link className="text-link" to="/privacy">
            Understand your data choices
            <Icon />
          </Link>
          <p className="small-note">
            Unfold is a general wellness tool, not a medical device or a
            substitute for professional care.
          </p>
        </div>
      </section>
      <DownloadCta />
    </>
  );
}
