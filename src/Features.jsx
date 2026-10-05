import ProductScreenshot, { ProductPreviewCaption } from "./components/ProductScreenshot.jsx";
import ProductPlatformPicker, { useProductPlatform } from "./components/ProductPlatformPicker.jsx";
import { Link } from "react-router-dom";
import { PageIntro } from "./components/ResourceBrowser.jsx";
import { DownloadCta } from "./components/SiteLayout.jsx";
import Icon from "./components/Icon.jsx";
const chapters = [
  {
    id: "journal",
    label: "01 / Put it into words",
    title: "Your thoughts. Your way of telling them.",
    text: "Some days the words flow. Other days, one sentence is enough. Write about what’s on your mind, with guided prompts when you want somewhere to begin.",
    detail:
      "Luma can offer a follow-up question or a new angle. AI-guided reflection is optional; you decide what feels useful and what to leave behind.",
    screen: "journal",
    to: "/prompts",
    link: "Try a journaling prompt",
  },
  {
    id: "voice",
    label: "02 / Say it out loud",
    title: "Some days, it helps to talk.",
    text: "Open a voice journal and talk it through with Luma. You can control the microphone, speaker and session without finding the perfect words to type.",
    detail: "Voice journaling needs microphone permission and a connection. The app shows current plan access. Luma is an AI reflection companion, not a therapist or emergency service.",
    screen: "voice",
    to: "/plans",
    link: "Understand plan access",
  },
  {
    id: "patterns",
    label: "03 / Notice the everyday",
    title: "There’s more to a day than a single feeling.",
    text: "Check in with your mood and add context to your days. On supported devices, optional Apple Health or Health Connect connections bring sleep and activity into the picture.",
    detail:
      "Sleep, recovery and stress estimates are general wellness information. They can be incomplete and do not diagnose or predict a condition. Your lived experience matters more than any single score.",
    detailId: "wellness",
    screen: "health",
    previewNote: "Apple Health on iPhone. Health Connect on supported Android devices. Connections are optional.",
    to: "/blog/mood-tracking-with-curiosity",
    link: "A curious approach to mood tracking",
  },
  {
    id: "reflect",
    label: "04 / Return with perspective",
    title: "A moment you can come back to.",
    text: "Search your journal by mood, topics and tags. Filter your entries and revisit a written reflection or a voice journal when you want a little perspective.",
    detail:
      "You don’t need to turn every day into a lesson. Your history is a place to remember the small things, notice a recurring thought, or simply see how far you’ve come.",
    screen: "history",
    to: "/blog/a-weekly-reflection-ritual",
    link: "Try a weekly reflection",
  },
  {
    id: "pause",
    label: "05 / Take a pause",
    title: "A rhythm to follow. A moment for yourself.",
    text: "Choose Box Breathing or another available pattern, then follow a visual or audio guide. Pick a pace and session that feel comfortable for you.",
    detail: "Breathing tools offer a way to pause in your day. They are optional, and you can stop whenever you need to. They are not a treatment or a substitute for professional care.",
    screen: "breathing",
    to: "/help?q=breathing",
    link: "About breathing sessions",
  },
  {
    id: "family",
    label: "06 / Stay close, your way",
    title: "Your people. Your own space.",
    text: "Family brings separate accounts together under a shared plan. Invite your people without turning your journal into a shared one. Joining does not switch wellness sharing on.",
    detail: "Choose which wellness summaries to share with each person, and pause sharing when you want. Journals, conversations, Cycle data and location are never included. Paying for a plan does not grant access to another person’s private data.",
    screen: "family",
    previewNote: "Family availability and plans are shown in the app.",
    to: "/plans",
    link: "Explore Family plans",
  },
];
export default function Features() {
  const [platform, setPlatform] = useProductPlatform();
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
        Journal with Luma, talk it through, take a breathing pause, and return
        to your days with perspective. Your people can have their own space, too.
      </PageIntro>
      <div className="container feature-platform-bar">
        <p>Explore the app on your device.</p>
        <ProductPlatformPicker platform={platform} onChange={setPlatform} />
      </div>
      <nav className="container chapter-nav" aria-label="On this page">
        <Link to="#journal">Journal your way</Link>
        <Link to="#voice">Voice journaling</Link>
        <Link to="#patterns">Health context</Link>
        <Link to="#reflect">Journal history</Link>
        <Link to="#pause">Take a pause</Link>
        <Link to="#family">Family</Link>
        <Link to="#watch">Apple Watch</Link>
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
              <p id={item.detailId}>{item.detail}</p>
              <Link className="text-link" to={item.to}>
                {item.link}
                <Icon size={19} />
              </Link>
            </div>
            <figure className="chapter-screen">
              <ProductScreenshot screen={item.screen} platform={platform} />
              <figcaption><ProductPreviewCaption platform={platform}>{item.previewNote}</ProductPreviewCaption></figcaption>
            </figure>
          </section>
        ))}
      </div>
      <section
        id="watch"
        className="section watch-section"
        aria-labelledby="watch-title"
      >
        <div className="container watch-story">
          <div>
            <p className="eyebrow">07 / A little calm, within reach</p>
            <h2 id="watch-title">A pause on your wrist.</h2>
            <p>The Apple Watch companion brings supported breathing sessions and mood logging a little closer. Start a short session without reaching for your phone.</p>
            <p className="small-note">Requires a supported Apple Watch and iPhone. Check the App Store for compatibility. The Watch companion is for Apple devices.</p>
            <Link className="text-link" to="/get-app">Find Unfold for your device <Icon /></Link>
          </div>
          <figure className="watch-preview">
            <img src="/images/product-20261005/watch-breathing.png" width="416" height="496" loading="lazy" decoding="async" alt="Unfold Apple Watch Box Breathing screen with a one-minute session and Start button. Sample app screen." />
            <figcaption>Apple Watch app preview · sample session</figcaption>
          </figure>
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
