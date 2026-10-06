import { useProductPlatform } from "./components/ProductPlatformPicker.jsx";
import HeroProductStory from "./components/HeroProductStory.jsx";
import { useRef, useState } from "react";
import FeatureProductStory from "./components/FeatureProductStory.jsx";
import { BreathingChapter, FamilyChapter } from "./components/HomeProductChapters.jsx";
import usePageMotion from "./hooks/usePageMotion.js";
import { Link } from "react-router-dom";
import Icon from "./components/Icon.jsx";
import ArticleCard from "./components/ArticleCard.jsx";
import { DownloadCta } from "./components/SiteLayout.jsx";
import { articles } from "./data/articles.js";
import { prompts, CONTACT_EMAIL } from "./data/site.js";
import PlatformDownloadLink from "./components/PlatformDownloadLink.jsx";

const faqs = [
  {
    q: "What is Unfold?",
    a: "Unfold is a journaling and wellness app for reflecting on your thoughts, checking in with your mood, and exploring your everyday patterns. It brings together written and voice journaling, guided prompts, and optional wellness insights.",
  },
  {
    q: "Do I need a wearable to use it?",
    a: "No. You can journal and check in with your mood without a wearable. On supported devices, you can choose to connect Apple Health on iOS or Health Connect on Android for additional sleep and activity context. Available features depend on your device and permissions.",
  },
  {
    q: "Is Unfold available on Android?",
    a: (
      <>
        Yes. Unfold is available on iOS and Android. Visit the{" "}
        <Link to="/get-app">download page</Link> for both stores. Some features,
        including the Apple Watch companion, are specific to Apple devices.
        Android health connections use Health Connect on supported devices.
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
    q: "Does Family let other people read my journal?",
    a: "No. Family keeps each person’s journal separate. Joining does not switch wellness sharing on. You choose which wellness summaries to share with each person and can pause sharing. Journals, conversations, Cycle data and location are never included in Family sharing. Check the app for current Family availability.",
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

function PromptMoment() {
  const [index, setIndex] = useState(0);
  return (
    <section className="prompt-section section" aria-labelledby="prompt-title">
      <div className="container prompt-inner" data-motion="prompt">
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
            <span key={index} className="prompt-question-text">{prompts[index]}</span>
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
  const [platform, setPlatform] = useProductPlatform();
  const motionRoot = useRef(null);
  usePageMotion(motionRoot);
  return (
    <div className="home-motion-root" ref={motionRoot}>
      <section className="hero container hero--story" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Reflection for your whole day</p>
          <h1 id="hero-title">
            Make room
            <br />
            for <span>yourself.</span>
          </h1>
          <p className="hero-description">
            Write it down. Talk it through with Luma. Make time for a breathing
            pause, and bring a little more context to the way you feel.
            A journal and wellness companion, at your pace.
          </p>
          <div className="hero-actions">
            <PlatformDownloadLink />
            <Link className="text-link" to="/#how-it-works">
              See how it works <Icon size={18} />
            </Link>
          </div>
          <p className="hero-footnote">
            Journaling, mood & wellness context.
            <br />
            On iOS and Android. At your own pace.
          </p>
        </div>
        <HeroProductStory platform={platform} onPlatformChange={setPlatform} />
      </section>
      <div className="benefit-strip">
        <div className="container">
          <span>Write it. Say it. Make it yours.</span>
          <span>Notice how you feel.</span>
          <span>You choose what to share.</span>
        </div>
      </div>
      <section className="section product-section" id="features" aria-labelledby="features-title">
        <div className="container">
          <div className="section-heading" data-motion="reveal">
            <div className="motion-content">
              <p className="eyebrow">Inside Unfold</p>
              <h2 id="features-title">Your thoughts, moods,<br />and patterns, together.</h2>
            </div>
            <p>Your words, your feelings, your everyday rhythms.<br className="desktop-break" /> A little more connected.</p>
          </div>
          <FeatureProductStory platform={platform} />
        </div>
      </section>
      <section
        className="section routine-section"
        id="how-it-works"
        aria-labelledby="routine-title"
      >
        <div className="container">
          <div className="section-heading" data-motion="reveal">
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
          <ol className="routine-steps" data-motion="routine">
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
      <BreathingChapter platform={platform} />
      <PromptMoment />
      <FamilyChapter platform={platform} />
      <section
        className="section journal-section"
        aria-labelledby="journal-title"
      >
        <div className="container">
          <div className="section-heading" data-motion="reveal">
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
          <div className="article-grid" data-motion="articles">
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
      <div data-motion="closing"><DownloadCta /></div>
    </div>
  );
}
