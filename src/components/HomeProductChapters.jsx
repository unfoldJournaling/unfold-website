import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import ProductScreenshot from "./ProductScreenshot.jsx";

export function BreathingChapter({ platform }) {
  return <section className="section home-breathing" aria-labelledby="breathing-title">
    <div className="container product-story">
      <div className="chapter-copy" data-motion="reveal">
        <div className="motion-content">
          <p className="eyebrow">A pause, just for you</p>
          <h2 id="breathing-title">Make room for a pause.</h2>
          <p>Follow a visual or audio breathing guide. A few moments for yourself, wherever your day takes you.</p>
          <Link className="text-link" to="/features#pause">Explore guided breathing <Icon size={19} /></Link>
        </div>
      </div>
      <figure className="breathing-chapter" data-motion="breathing">
        <div className="breathing-stage">
          <div className="breathing-rings" aria-hidden="true"><span /><span /><span /></div>
          <div className="breathing-phone"><ProductScreenshot screen="breathing" platform={platform} /></div>
          {platform === "ios" && <div className="breathing-watch"><img src="/images/product-20261005/watch-breathing.png" width="416" height="496" loading="lazy" decoding="async" alt="Unfold Apple Watch breathing companion showing a sample breathing guide." /></div>}
        </div>
        {platform === "ios" && <figcaption>Also on Apple Watch.</figcaption>}
      </figure>
    </div>
  </section>;
}

export function FamilyChapter({ platform }) {
  return <section className="section privacy-section home-family" aria-labelledby="privacy-title">
    <div className="container product-story">
      <div className="chapter-copy" data-motion="reveal">
        <div className="motion-content">
          <p className="eyebrow">Your people. Your choice.</p>
          <h2 id="privacy-title">Your story belongs to you.</h2>
          <p>Bring your people together with Family. Separate accounts, private journals, and wellness sharing you choose to turn on or pause.</p>
          <div className="editorial-links">
            <Link className="text-link" to="/features#family">Meet Unfold Family <Icon size={19} /></Link>
            <Link className="text-link" to="/privacy">Your privacy <Icon size={19} /></Link>
          </div>
          <p className="home-family-note">Family availability and plans are shown in the app.</p>
        </div>
      </div>
      <figure className="family-chapter" data-motion="family">
        <div className="family-stage">
          <div className="family-phone"><ProductScreenshot screen="family" platform={platform} /></div>
        </div>
      </figure>
    </div>
  </section>;
}
