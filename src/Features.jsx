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
    image: 7,
    alt: "Unfold journal history with a recent reflection entry",
    to: "/prompts",
    link: "Try a journaling prompt",
  },
  {
    id: "patterns",
    label: "02 / Notice the everyday",
    title: "There’s more to a day than a single feeling.",
    text: "Check in with your mood and add context to your days. On supported Apple devices, optional Apple Health connections bring sleep and activity into the picture.",
    detail:
      "Look for observations that invite curiosity. An association is not a cause, a diagnosis, or a prediction. Your lived experience matters more than any single score.",
    image: 5,
    alt: "Unfold mood tracker with recent check-ins",
    to: "/blog/mood-tracking-with-curiosity",
    link: "A curious approach to mood tracking",
  },
  {
    id: "reflect",
    label: "03 / Return with perspective",
    title: "Small moments can tell a bigger story.",
    text: "Personal trends offer a way to revisit your days. Notice what kept coming up, what changed, and what you would like to carry forward.",
    detail:
      "You don’t need to turn reflection into another performance goal. Use the overview as a starting point for a gentler check-in with yourself.",
    image: 6,
    alt: "Unfold recovery trends across a week",
    to: "/blog/a-weekly-reflection-ritual",
    link: "Try a weekly reflection",
  },
  {
    id: "wellness",
    label: "04 / Read your day in context",
    title: "Wellness trends, with room for nuance.",
    text: "Explore general wellness estimates for stress, recovery, and sleep when supported data is available. See the sources and explanations behind the numbers inside the app.",
    detail: "These views are informational, can be incomplete, and do not diagnose or predict a condition. You decide how much health context to connect and when to pause.",
    image: 9,
    alt: "Unfold stress view showing a daily estimate and trend chart",
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
        Journaling, mood check-ins, and everyday reflection, brought together so
        you can listen to yourself a little more closely.
      </PageIntro>
      <nav className="container chapter-nav" aria-label="On this page">
        <a href="#journal">Journal your way</a>
        <a href="#patterns">Notice your patterns</a>
        <a href="#reflect">Look back</a>
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
              <ProductScreenshot image={item.image} alt={item.alt} />
              <figcaption>iOS App Store imagery. Screens and features may vary by version and platform.</figcaption>
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
