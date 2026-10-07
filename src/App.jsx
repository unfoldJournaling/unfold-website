import { useRef } from "react";
import { Link } from "react-router-dom";
import { useProductPlatform } from "./components/ProductPlatformPicker.jsx";
import HeroProductStory from "./components/HeroProductStory.jsx";
import { BreathingChapter, FamilyChapter } from "./components/HomeProductChapters.jsx";
import usePageMotion from "./hooks/usePageMotion.js";
import Icon from "./components/Icon.jsx";
import { DownloadCta } from "./components/SiteLayout.jsx";
import { articles } from "./data/articles.js";
import { helpItems } from "./data/resources.js";
import PlatformDownloadLink from "./components/PlatformDownloadLink.jsx";

const faqs = [
  {
    q: "Is Unfold free?",
    a: "Unfold is free to download, with optional subscriptions for premium features. Your app store and the in-app purchase screen show current plans, local prices, billing periods, and any available trial before you subscribe.",
  },
  {
    q: "Do I need a wearable to use it?",
    a: "No. You can journal and check in with your mood without one. Apple Health on iPhone or Health Connect on supported Android devices can add optional sleep and activity context.",
  },
  {
    q: "How does Unfold handle my personal data?",
    a: (
      <>
        Journal content and health information are not sold or used for
        advertising. Applicable AI features ask for your permission, which you
        can withdraw. Read our <Link to="/privacy">privacy notice</Link> for the
        full details and your choices.
      </>
    ),
  },
  {
    q: "Can Family members read my journal?",
    a: "No. Each person has a separate account. Joining or paying for Family does not turn sharing on. You choose which wellness summaries to share and can pause sharing. Journals and conversations are never included.",
  },
  ...helpItems.filter(({ q }) => [
    "Can I journal by speaking?",
    "Do I have to journal every day?",
    "What does Luma do?",
    "How do I cancel a subscription?",
  ].includes(q)),
];

export default function Home() {
  const [platform, setPlatform] = useProductPlatform();
  const motionRoot = useRef(null);
  const featuredArticle = articles[0];
  usePageMotion(motionRoot);
  return (
    <div className="home-motion-root home-compact" ref={motionRoot}>
      <section className="hero container hero--story" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Reflection for your whole day</p>
          <h1 id="hero-title">
            Make room
            <br />
            for <span>yourself.</span>
          </h1>
          <p className="hero-description">
            Write your thoughts, talk with Luma, and take a breathing pause.
            A journal and wellness companion, at your pace.
          </p>
          <div className="hero-actions">
            <PlatformDownloadLink />
            <Link className="text-link" to="/features">
              Explore all features <Icon size={18} />
            </Link>
          </div>
          <p className="hero-footnote">Available on iPhone and Android.</p>
        </div>
        <HeroProductStory platform={platform} onPlatformChange={setPlatform} />
      </section>

      <section className="section routine-section" id="how-it-works" aria-labelledby="routine-title">
        <div className="container">
          <div data-motion="reveal">
            <div>
              <p className="eyebrow">How Unfold works</p>
              <h2 id="routine-title">Start where you are.</h2>
            </div>
          </div>
          <ol className="routine-steps" data-motion="routine">
            <li>
              <span className="step-number" aria-hidden="true">01</span>
              <div><h3>Check in with yourself.</h3><p>Open Unfold and log how you’re feeling. Start with where you are today.</p></div>
            </li>
            <li>
              <span className="step-number" aria-hidden="true">02</span>
              <div><h3>Write it. Or talk it through.</h3><p>Start a journal entry, or open a voice journal with Luma, your AI reflection companion.</p></div>
            </li>
            <li>
              <span className="step-number" aria-hidden="true">03</span>
              <div><h3>Return when you’re ready.</h3><p>Find past entries in your journal history. Revisit a thought or simply remember your day.</p></div>
            </li>
          </ol>
        </div>
      </section>

      <BreathingChapter platform={platform} />
      <FamilyChapter platform={platform} />

      <section className="section home-journal" aria-labelledby="journal-title">
        <div className="container home-journal-row" data-motion="reveal">
          <div>
            <Link className="home-journal-story" to={"/blog/" + featuredArticle.slug}>
              <img
                src={featuredArticle.cover.replace(".webp", "-480.webp")}
                srcSet={featuredArticle.cover.replace(".webp", "-480.webp") + " 480w, " + featuredArticle.cover.replace(".webp", "-960.webp") + " 960w"}
                sizes="(max-width: 600px) 88px, 160px"
                width="480"
                height="320"
                loading="lazy"
                decoding="async"
                alt=""
              />
              <div>
                <p className="eyebrow">From the Journal</p>
                <h2 id="journal-title">{featuredArticle.title}</h2>
                <span className="text-link">Read the story <Icon size={18} /></span>
              </div>
            </Link>
          </div>
          <Link className="text-link" to="/blog">Explore the Journal <Icon size={18} /></Link>
        </div>
      </section>

      <section className="section faq-section" id="faq" aria-labelledby="faq-title">
        <div className="container faq-grid">
          <div>
            <p className="eyebrow">Before you begin</p>
            <h2 id="faq-title">A few good questions.</h2>
            <Link className="text-link" to="/help">All questions & answers <Icon size={18} /></Link>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.q}>
                <summary>{faq.q}<Icon name="plus" size={21} /></summary>
                <div className="faq-answer">
                  {faq.a}
                  {faq.to && <Link className="text-link" to={faq.to}>{faq.label} <Icon size={18} /></Link>}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <div data-motion="closing"><DownloadCta compact /></div>
    </div>
  );
}
