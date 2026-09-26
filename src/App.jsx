import ProductScreenshot from "./components/ProductScreenshot.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./components/Icon.jsx";
import ArticleCard from "./components/ArticleCard.jsx";
import { DownloadCta } from "./components/SiteLayout.jsx";
import { articles } from "./data/articles.js";
import { prompts, CONTACT_EMAIL } from "./data/site.js";
import PlatformDownloadLink from "./components/PlatformDownloadLink.jsx";

const features = [
  {
    label: "Journal your way",
    title: "A place for the whole of your day.",
    description:
      "The big feelings. The tiny wins. The thought you haven’t found the words for yet. Write it down or talk it through, with a prompt when you need a place to start.",
    image: 7,
    alt: "Unfold journal history screen with a reflection entry",
    note: "Written & voice journaling",
  },
  {
    label: "Notice your patterns",
    title: "Get a little closer to what makes you, you.",
    description:
      "Check in with your mood and look back on your days. With your permission, Apple Health adds sleep and activity context to the story you’re telling.",
    image: 5,
    alt: "Unfold mood tracker showing recent check-ins",
    note: "Mood, sleep & activity context",
  },
  {
    label: "Reflect with Luma",
    title: "Sometimes, a good question is all it takes.",
    description:
      "Luma, your AI journaling companion, offers prompts and reflections to help you explore your thoughts. Take what resonates. Your perspective always comes first.",
    image: 3,
    alt: "Unfold conversation with guided journaling questions",
    note: "Optional AI-guided reflection",
  },
  {
    label: "See the bigger picture",
    title: "A moment to look back. Space to move forward.",
    description:
      "Return to your entries and weekly summaries to notice what has been on your mind. Make room for the routines, moments, and small changes that matter to you.",
    image: 6,
    alt: "Unfold recovery view showing a weekly trend",
    note: "Weekly reports & personal trends",
  },
];
const faqs = [
  {
    q: "What is Unfold?",
    a: "Unfold is a journaling and wellness app for reflecting on your thoughts, checking in with your mood, and exploring your everyday patterns. It brings together written and voice journaling, guided prompts, and optional wellness insights.",
  },
  {
    q: "Do I need a wearable to use it?",
    a: "No. You can journal and check in with your mood without a wearable. On supported Apple devices, you can choose to connect Apple Health for additional sleep and activity context. Available features depend on your device and permissions.",
  },
  {
    q: "Is Unfold available on Android?",
    a: (
      <>
        Yes. Unfold is available on iOS and Android. Visit the{" "}
        <Link to="/get-app">download page</Link> for both stores. Some features,
        including Apple Health and the Apple Watch companion, are specific to
        Apple devices.
      </>
    ),
  },
  {
    q: "Is Unfold free?",
    a: "Unfold is free to download, with optional subscriptions for premium features. Your app store and the in-app purchase screen show current plans, local prices, billing periods, and any available trial before you subscribe.",
  },
  {
    q: "How does Unfold handle my personal data?",
    a: (
      <>
        Unfold’s privacy notice states that journal content and health
        information are not sold or used for advertising. Applicable AI features
        ask for your permission, which you can withdraw. Read the{" "}
        <Link to="/privacy">
          Privacy Policy and Consumer Health Data Privacy Notice
        </Link>{" "}
        for the full details and your choices.
      </>
    ),
  },
  {
    q: "Does Unfold predict stress or provide medical advice?",
    a: "No. Unfold is a general wellness tool. Its insights describe possible patterns and associations, not proven causes or predictions. It does not diagnose or treat conditions and is not a substitute for a doctor, therapist, or emergency service.",
  },
  {
    q: "Can I delete my account?",
    a: (
      <>
        Yes. You can request deletion inside the app or by email. Our{" "}
        <Link to="/delete-account">account deletion page</Link> explains the
        steps, timelines, and data covered.
      </>
    ),
  },
];

function ProductFeatures() {
  const [selected, setSelected] = useState(0);
  const feature = features[selected];
  return (
    <section
      className="section product-section"
      id="features"
      aria-labelledby="features-title"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Inside Unfold</p>
            <h2 id="features-title">
              Your thoughts, moods,
              <br />
              and patterns, together.
            </h2>
          </div>
          <p>
            Your words, your feelings, your everyday rhythms.
            <br className="desktop-break" /> A little more connected.
          </p>
        </div>
        <div className="product-grid">
          <div
            className="feature-list"
            role="group"
            aria-label="Explore Unfold features"
          >
            {features.map((item, index) => (
              <button
                key={item.label}
                className={`feature-option ${selected === index ? "is-selected" : ""}`}
                aria-pressed={selected === index}
                aria-controls="feature-preview"
                onClick={() => setSelected(index)}
              >
                <span>{item.label}</span>
                <Icon size={18} />
              </button>
            ))}
            <div className="feature-copy" aria-live="polite">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <Link className="text-link" to="/features">
                Explore all features <Icon size={19} />
              </Link>
            </div>
          </div>
          <div id="feature-preview" className="product-preview">
            <ProductScreenshot key={feature.image} image={feature.image} alt={feature.alt} />
            <div className="preview-caption">
              <span>{feature.note}</span>
            </div>
            <p className="preview-source">
              Shown on iOS. Features vary by platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
function PromptMoment() {
  const [index, setIndex] = useState(0);
  return (
    <section className="prompt-section section" aria-labelledby="prompt-title">
      <div className="container prompt-inner">
        <div>
          <p className="eyebrow">Start right here</p>
          <h2 id="prompt-title">
            A small question.
            <br />A little space to think.
          </h2>
          <p>
            You don’t need the perfect words.
            <br />
            Just a moment to check in with yourself.
          </p>
        </div>
        <div className="prompt-card">
          <div className="prompt-card-top">
            <span>A moment of reflection</span>
            <span>
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(prompts.length).padStart(2, "0")}
            </span>
          </div>
          <p className="prompt-question" aria-live="polite" aria-atomic="true">
            {prompts[index]}
          </p>
          <div className="prompt-card-bottom">
            <button
              className="text-link"
              onClick={() => setIndex((index + 1) % prompts.length)}
            >
              <Icon name="refresh" size={18} /> Another prompt
            </button>
            <Link
              to="/prompts"
              aria-label="Explore more journal prompts"
            >
              <Icon name="diagonal" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Your everyday journaling companion</p>
          <h1 id="hero-title">
            Make room
            <br />
            for <span>yourself.</span>
          </h1>
          <p className="hero-description">
            A journal for your thoughts, moods, and everyday patterns. Write or speak, check in with yourself, and explore a different perspective with optional Luma reflections.
          </p>
          <div className="hero-actions">
            <PlatformDownloadLink />
            <Link className="text-link" to="/#how-it-works">
              See how it works <Icon size={18} />
            </Link>
          </div>
          <p className="hero-footnote">
            Journaling, mood tracking & reflection.
            <br />
            On iOS and Android. At your own pace.
          </p>
        </div>
        <figure className="hero-visual hero-product">
          <ProductScreenshot image={3} eager alt="Unfold iOS guided journal with reflection questions" />
          <figcaption className="hero-caption">Unfold iOS App Store preview · screens may change</figcaption>
        </figure>
      </section>
      <div className="benefit-strip">
        <div className="container">
          <span>Write it. Say it. Make it yours.</span>
          <span>Notice how you feel.</span>
          <span>You choose what to share.</span>
        </div>
      </div>
      <ProductFeatures />
      <section
        className="section routine-section"
        id="how-it-works"
        aria-labelledby="routine-title"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A routine that fits your life</p>
              <h2 id="routine-title">
                Come as you are.
                <br />
                Start with a moment.
              </h2>
            </div>
            <Link className="text-link" to="/blog/how-to-start-journaling">
              New to journaling? Start here <Icon size={18} />
            </Link>
          </div>
          <ol className="routine-steps">
            <li>
              <span className="step-number">01</span>
              <h3>Check in with yourself.</h3>
              <p>
                How are you, really? Pick a mood, name a feeling, or simply
                notice where you are today.
              </p>
            </li>
            <li>
              <span className="step-number">02</span>
              <h3>Let your thoughts unfold.</h3>
              <p>
                Write, speak, or follow a gentle prompt. There’s no right length
                and no right way to begin.
              </p>
            </li>
            <li>
              <span className="step-number">03</span>
              <h3>Return with curiosity.</h3>
              <p>
                Look back on your reflections. Notice the moments and patterns
                you want to understand a little better.
              </p>
            </li>
          </ol>
        </div>
      </section>
      <PromptMoment />
      <section
        className="section privacy-section"
        aria-labelledby="privacy-title"
      >
        <div className="container privacy-inner">
          <div>
            <p className="eyebrow">Personal means personal</p>
            <h2 id="privacy-title">Your story belongs to you.</h2>
            <p>
              Your journal and health information are not sold or used for
              advertising. Optional AI features ask for your permission, and you
              can change your mind.
            </p>
            <Link className="text-link" to="/privacy">
              Read our privacy commitments <Icon size={19} />
            </Link>
          </div>
          <ul className="privacy-points">
            <li>Your permission for optional AI features</li>
            <li>Choices you can change</li>
            <li>A clear account deletion process</li>
          </ul>
        </div>
      </section>
      <section
        className="section journal-section"
        aria-labelledby="journal-title"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The Unfold Journal</p>
              <h2 id="journal-title">
                From the Journal.
                <br />Ideas you can put into practice.
              </h2>
            </div>
            <Link className="text-link" to="/blog">
              Explore all stories <Icon />
            </Link>
          </div>
          <div className="article-grid">
            {articles.slice(0, 3).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>
      <section
        className="section faq-section"
        id="faq"
        aria-labelledby="faq-title"
      >
        <div className="container faq-grid">
          <div>
            <p className="eyebrow">A few things you might wonder</p>
            <h2 id="faq-title">
              Good questions.
              <br />
              Straight answers.
            </h2>
            <p>Something else on your mind?</p>
            <a className="text-link" href={`mailto:${CONTACT_EMAIL}`}>
              Say hello <Icon size={18} />
            </a>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.q}>
                <summary>
                  {faq.q}
                  <Icon name="plus" size={21} />
                </summary>
                <div className="faq-answer">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <DownloadCta />
    </>
  );
}
