import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import { ProductPreviewCaption } from "./ProductScreenshot.jsx";

const features = [
  { label: "Write", title: "Start with a thought.", description: "Write about what’s on your mind. Luma can offer a question or a follow-up when you want a little guidance. You decide what feels useful.", screen: "journal", alt: "guided journal with a sample question and response" },
  { label: "Speak", title: "Give your thoughts a voice.", description: "Talk with Luma when you’d rather speak than type. Microphone and session controls stay in your hands. Voice access depends on your plan and app version.", screen: "voice", alt: "voice journal with microphone and session controls" },
  { label: "Connect", title: "See more of your day.", description: "Check in with your mood. If you choose, Apple Health on iPhone or Health Connect on supported Android devices can add sleep and activity context.", screen: "health", alt: "health view with optional connections and sample wellness estimates" },
  { label: "Revisit", title: "Return with a little perspective.", description: "Find an entry by mood, topic or tags. Revisit your reflections and notice the moments you want to carry forward.", screen: "history", alt: "journal history with mood filters and sample entries" },
];
const clamp = (value) => Math.max(0, Math.min(1, value));

export default function FeatureProductStory({ platform }) {
  const track = useRef(null);
  const pin = useRef(null);
  const phone = useRef(null);
  const images = useRef([]);
  const selection = useRef(0);
  const controller = useRef(null);
  const [scene, setScene] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const element = track.current;
    const stage = pin.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let enabled = false;
    let distance = 0;
    let top = 0;
    let frame = null;

    const paint = (progress, motion) => {
      const position = progress * (features.length - 1);
      const base = Math.floor(position);
      const reveal = motion ? clamp((position - base - 0.65) / 0.35) : 0;
      const index = motion ? Math.min(features.length - 1, base + (reveal >= 0.5 ? 1 : 0)) : Math.round(position);
      if (selection.current !== index) {
        selection.current = index;
        setScene(index);
      }
      images.current.forEach((image, order) => {
        image.style.opacity = order === index || (motion && (order === base || order === base + 1)) ? "1" : "0";
        image.style.clipPath = motion && order === base + 1 ? `inset(${((1 - reveal) * 100).toFixed(2)}% 0 0 0)` : "none";
      });
      element.style.setProperty("--feature-progress", progress.toFixed(4));
      phone.current.style.transform = motion
        ? `perspective(1200px) rotateY(${(12 - progress * 24).toFixed(2)}deg) rotateZ(${(2 - progress * 4).toFixed(2)}deg) translate3d(0, ${(-Math.sin(progress * Math.PI) * 8).toFixed(2)}px, 0)`
        : "none";
    };
    const update = () => {
      frame = null;
      if (!enabled || document.hidden) return;
      const bounds = element.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
      paint(clamp((top - bounds.top) / distance), true);
    };
    const schedule = () => {
      if (enabled && !document.hidden && frame === null) frame = window.requestAnimationFrame(update);
    };
    const measure = () => {
      top = (document.querySelector(".site-header")?.offsetHeight || 90) + 16;
      const enlarged = parseFloat(getComputedStyle(document.documentElement).fontSize) > 24;
      element.dataset.enlargedText = String(enlarged);
      enabled = !preference.matches
        && !enlarged
        && stage.offsetHeight < window.innerHeight - top - 8;
      distance = Math.min(window.innerHeight * 1.65, 1500);
      element.dataset.scrollReady = String(enabled);
      element.style.setProperty("--feature-stick-top", `${top}px`);
      element.style.setProperty("--feature-track-height", `${stage.offsetHeight + distance}px`);
      setPinned(enabled);
      if (enabled) schedule();
      else paint(selection.current / (features.length - 1), false);
    };
    controller.current = (index) => {
      if (enabled) window.scrollTo({ top: window.scrollY + element.getBoundingClientRect().top - top + distance * index / (features.length - 1), behavior: "smooth" });
      else paint(index / (features.length - 1), false);
    };
    const resize = window.ResizeObserver ? new ResizeObserver(measure) : null;
    resize?.observe(stage);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    preference.addEventListener("change", measure);
    measure();
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      resize?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      document.removeEventListener("visibilitychange", schedule);
      preference.removeEventListener("change", measure);
      controller.current = null;
    };
  }, [platform]);

  return <div className="feature-story-track" ref={track}>
    <div className="feature-story-pin" ref={pin}>
      <div className="feature-story-controls" role="group" aria-label="Explore Unfold features">
        {features.map((item, index) => <button key={item.screen} id={`feature-story-control-${index}`} type="button" aria-pressed={scene === index} aria-controls={`feature-story-panel-${index}`} onClick={() => controller.current?.(index)}>
          <span className="feature-story-number" aria-hidden="true">0{index + 1}</span>{item.label}
        </button>)}
      </div>
      <div className="feature-story-copy">
        <div className="feature-story-panels">{features.map((item, index) => <div key={item.screen} id={`feature-story-panel-${index}`} role="region" aria-labelledby={`feature-story-control-${index}`} aria-hidden={scene !== index} className={scene === index ? "is-active" : ""}>
          <p className="eyebrow">{item.label === "Connect" ? "Optional wellness context" : item.label === "Speak" ? "Voice journaling" : item.label === "Write" ? "Guided journaling" : "Your journal history"}</p>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>)}</div>
        <Link className="text-link" to="/features">Explore all features <Icon size={19} /></Link>
      </div>
      <figure className="feature-story-preview">
        <div className="feature-story-device-stage">
          <div ref={phone} className={`app-screen-window feature-story-device app-screen-window--${platform}`}>
            {features.map((item, index) => <img key={item.screen} ref={(image) => { images.current[index] = image; }}
              src={`/images/product-20261005/${platform}-${item.screen}.png`} width={platform === "android" ? 1080 : 1206} height={platform === "android" ? 2340 : 2622}
              loading="lazy" decoding="async" style={{ opacity: index === 0 ? 1 : 0 }} aria-hidden={scene !== index}
              alt={`Unfold ${platform === "android" ? "Android" : "iPhone"} ${item.alt}. Sample app screen.`} />)}
          </div>
        </div>
        <figcaption><ProductPreviewCaption platform={platform} /></figcaption>
      </figure>
      <div className="feature-story-footer" aria-hidden="true"><span>{pinned ? "Scroll to explore, or choose above" : "Choose a feature above"}</span><span>0{scene + 1} / 04</span></div>
      <div className="feature-story-progress" aria-hidden="true"><span /></div>
    </div>
  </div>;
}
