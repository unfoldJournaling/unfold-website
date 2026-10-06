import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import ProductScreenshot, { ProductPreviewCaption } from "./ProductScreenshot.jsx";

export function BreathingChapter({ platform }) {
  return <section className="section home-breathing" aria-labelledby="breathing-title">
    <div className="container product-story">
      <div className="chapter-copy" data-motion="reveal">
        <div className="motion-content">
          <p className="eyebrow">A pause, just for you</p>
          <h2 id="breathing-title">A little space between one thing and the next.</h2>
          <p>Choose a breathing pattern and follow a visual or audio guide. A few moments to pause, whether you’re starting your day or stepping away from a full one.</p>
          <Link className="text-link" to="/features#pause">Explore guided breathing <Icon size={19} /></Link>
        </div>
      </div>
      <figure className="breathing-chapter" data-motion="breathing">
        <div className="breathing-stage">
          <div className="breathing-rings" aria-hidden="true"><span /><span /><span /></div>
          <div className="breathing-phone"><ProductScreenshot screen="breathing" platform={platform} /></div>
          {platform === "ios" && <div className="breathing-watch"><img src="/images/product-20261005/watch-breathing.png" width="416" height="496" loading="lazy" decoding="async" alt="Unfold Apple Watch breathing companion showing a sample breathing guide." /></div>}
        </div>
        <figcaption>
          <span className="chapter-preview-label">{platform === "ios" ? "A pause on your phone. A companion on your wrist." : "A breathing pause, wherever your day takes you."}</span>
          <ProductPreviewCaption platform={platform}>{platform === "ios" ? "Apple Watch companion on supported Apple devices. Sample previews." : "Visual and audio guides in the Android app. Features may vary by app version."}</ProductPreviewCaption>
        </figcaption>
      </figure>
    </div>
  </section>;
}

export function FamilyChapter({ platform }) {
  return <section className="section privacy-section" aria-labelledby="privacy-title">
    <div className="container product-story">
      <div className="chapter-copy" data-motion="reveal">
        <div className="motion-content">
          <p className="eyebrow">Your people. Your choice.</p>
          <h2 id="privacy-title">Your story belongs to you.</h2>
          <p>Family brings your people together, with a separate account for each person. Your journal stays private. Choose which wellness summaries to share, with whom, and when to pause.</p>
          <ul className="family-sharing-steps">
            <li><span aria-hidden="true">01</span><div><strong>A place for your people.</strong><p>Joining does not turn sharing on.</p></div></li>
            <li><span aria-hidden="true">02</span><div><strong>Your words stay yours.</strong><p>Journals and conversations stay out of Family sharing.</p></div></li>
            <li><span aria-hidden="true">03</span><div><strong>You stay in control.</strong><p>Paying for the plan does not grant access to others’ data.</p></div></li>
          </ul>
          <div className="editorial-links">
            <Link className="text-link" to="/features#family">Meet Unfold Family <Icon size={19} /></Link>
            <Link className="text-link" to="/privacy">Read our privacy commitments <Icon size={19} /></Link>
          </div>
        </div>
      </div>
      <figure className="family-chapter" data-motion="family">
        <div className="family-stage">
          <div className="family-choice family-choice--first"><span>Separate accounts</span><strong>Room for everyone.</strong></div>
          <div className="family-choice family-choice--last"><span>Your choice</span><strong>Sharing starts with you.</strong></div>
          <div className="family-phone"><ProductScreenshot screen="family" platform={platform} /></div>
        </div>
        <figcaption><ProductPreviewCaption platform={platform}>Family availability and plans are shown in the app.</ProductPreviewCaption></figcaption>
      </figure>
    </div>
  </section>;
}
