import { useEffect, useRef, useState } from "react";
import ProductPlatformPicker from "./ProductPlatformPicker.jsx";
import { ProductPreviewCaption } from "./ProductScreenshot.jsx";

const scenes = [
  { screen: "dashboard", label: "Your day", alt: "dashboard with a Luma insight brief and sample wellness summaries" },
  { screen: "journal", label: "Write", alt: "guided journal with a question from Luma and a sample response" },
  { screen: "voice", label: "Talk", alt: "voice journal with listening, microphone and session controls" },
  { screen: "breathing", label: "Pause", alt: "breathing patterns with visual and audio guide options" },
];
const clamp = (value, minimum = 0, maximum = 1) => Math.max(minimum, Math.min(maximum, value));

export default function HeroProductStory({ platform, onPlatformChange }) {
  const track = useRef(null);
  const pin = useRef(null);
  const phone = useRef(null);
  const layers = useRef([]);
  const controller = useRef(null);
  const selected = useRef(0);
  const [scene, setScene] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const section = track.current;
    const stage = pin.current;
    const device = phone.current;
    const hero = section.closest(".hero");
    const copy = hero.querySelector(".hero-copy");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let enabled = false;
    let distance = 0;
    let top = 0;
    let frame = null;

    const paint = (progress, motion) => {
      const position = progress * (scenes.length - 1);
      const base = Math.floor(position);
      // Hold a readable screen, then reveal the next one without double-exposing
      // native status bars, text or controls during the transition.
      const reveal = motion ? clamp((position - base - 0.65) / 0.35) : 0;
      const index = motion ? Math.min(scenes.length - 1, base + (reveal >= 0.5 ? 1 : 0)) : Math.round(position);
      if (selected.current !== index) {
        selected.current = index;
        setScene(index);
      }
      layers.current.forEach((layer, order) => {
        layer.style.opacity = order === index || (motion && (order === base || order === base + 1)) ? "1" : "0";
        layer.style.clipPath = motion && order === base + 1 ? `inset(0 0 0 ${((1 - reveal) * 100).toFixed(2)}%)` : "none";
      });
      section.style.setProperty("--hero-progress", progress.toFixed(4));
      device.style.transform = motion
        ? `perspective(1100px) translate3d(0, ${(-Math.sin(progress * Math.PI) * 4).toFixed(2)}px, 0) rotateY(${(-10 + Math.sin(progress * Math.PI * 2) * 12).toFixed(2)}deg) rotateZ(${(-2 + progress * 4).toFixed(2)}deg) scale(${(1 + Math.sin(progress * Math.PI) * 0.01).toFixed(3)})`
        : "none";
    };
    const update = () => {
      frame = null;
      if (!enabled || document.hidden) return;
      const bounds = section.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
      paint(clamp((top - bounds.top) / distance), true);
    };
    const schedule = () => {
      if (enabled && !document.hidden && frame === null) frame = window.requestAnimationFrame(update);
    };
    const stop = () => {
      window.removeEventListener("scroll", schedule);
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = null;
    };
    const synchronize = () => {
      if (!document.hidden) schedule();
      else if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
    };
    const measure = () => {
      top = (document.querySelector(".site-header")?.offsetHeight || 90) + 16;
      const enlarged = parseFloat(getComputedStyle(document.documentElement).fontSize) > 24;
      section.dataset.enlargedText = String(enlarged);
      enabled = !preference.matches
        && !enlarged && stage.offsetHeight < window.innerHeight - top - 8
        && (window.innerWidth <= 600 || copy.offsetHeight < window.innerHeight - top - 8);
      distance = Math.min(window.innerHeight * 0.65, 640);
      section.style.setProperty("--hero-stick-top", `${top}px`);
      hero.style.setProperty("--hero-copy-top", `${Math.max(top, (window.innerHeight - copy.offsetHeight) / 2)}px`);
      section.style.setProperty("--hero-track-height", `${stage.offsetHeight + distance}px`);
      section.dataset.scrollReady = String(enabled);
      hero.classList.toggle("is-scroll-story", enabled);
      setPinned(enabled);
      if (enabled) schedule();
      else paint(selected.current / (scenes.length - 1), false);
      synchronize();
    };
    controller.current = (index) => {
      if (enabled) {
        window.scrollTo({
          top: window.scrollY + section.getBoundingClientRect().top - top + distance * index / (scenes.length - 1),
          behavior: "smooth",
        });
      } else paint(index / (scenes.length - 1), false);
    };
    const resize = window.ResizeObserver ? new ResizeObserver(measure) : null;
    resize?.observe(stage);
    resize?.observe(copy);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    document.addEventListener("visibilitychange", synchronize);
    preference.addEventListener("change", measure);
    measure();
    return () => {
      stop();
      resize?.disconnect();
      window.removeEventListener("resize", measure);
      document.removeEventListener("visibilitychange", synchronize);
      preference.removeEventListener("change", measure);
      hero.classList.remove("is-scroll-story");
      controller.current = null;
    };
  }, [platform]);

  return (
    <div className="hero-story" ref={track}>
      <figure className="hero-visual hero-product hero-story-pin" ref={pin}>
        <ProductPlatformPicker platform={platform} onChange={onPlatformChange} />
        <div className="hero-story-device-stage">
          <div ref={phone} className={`hero-story-device app-screen-window app-screen-window--${platform}`}>
            {scenes.map((item, index) => (
              <img
                key={item.screen}
                ref={(element) => { layers.current[index] = element; }}
                src={`/images/product-20261005/${platform}-${item.screen}.png`}
                width={platform === "android" ? 1080 : 1206}
                height={platform === "android" ? 2340 : 2622}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                fetchpriority={index === 0 ? "high" : "auto"}
                style={{ opacity: index === 0 ? 1 : 0 }}
                aria-hidden={scene !== index}
                alt={`Unfold ${platform === "android" ? "Android" : "iPhone"} ${item.alt}. Sample app screen.`}
              />
            ))}
          </div>
        </div>
        <div className="hero-story-navigation">
          <div className="hero-story-steps" role="group" aria-label="Explore app previews">
            {scenes.map((item, index) => <button
              key={item.screen}
              type="button"
              aria-pressed={scene === index}
              aria-label={`Show ${item.label.toLowerCase()} preview`}
              onClick={() => controller.current?.(index)}
            >{item.label}</button>)}
          </div>
          <div className="hero-story-progress" aria-hidden="true"><span /></div>
        </div>
        <p className="hero-story-cue" aria-hidden="true">{pinned ? "Scroll to explore" : "Choose a preview"}<span>{String(scene + 1).padStart(2, "0")} / 04</span></p>
        <figcaption className="hero-caption"><ProductPreviewCaption platform={platform} compact /></figcaption>
      </figure>
    </div>
  );
}
