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
  const viewport = useRef(null);
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
    let progress = selected.current / (scenes.length - 1);
    let lastTime = null;

    const paint = (progress, motion) => {
      const position = progress * (scenes.length - 1);
      const base = Math.floor(position);
      // Hold a readable screen, then reveal the next one without double-exposing
      // native status bars, text or controls during the transition.
      const phase = motion ? clamp((position - base - 0.35) / 0.65) : 0;
      const reveal = phase * phase * (3 - 2 * phase);
      const index = motion ? Math.min(scenes.length - 1, base + (reveal >= 0.5 ? 1 : 0)) : Math.round(position);
      if (selected.current !== index) {
        selected.current = index;
        setScene(index);
      }
      layers.current.forEach((layer, order) => {
        if (!layer) return;
        layer.style.opacity = order === index || (motion && (order === base || order === base + 1)) ? "1" : "0";
        layer.style.clipPath = motion && order === base + 1 ? `inset(0 0 0 ${((1 - reveal) * 100).toFixed(2)}%)` : "none";
      });
      section.style.setProperty("--hero-progress", progress.toFixed(4));
      device.style.transform = motion
        ? `perspective(1100px) translate3d(0, ${(-Math.sin(progress * Math.PI) * 4).toFixed(2)}px, 0) rotateY(${(-6 + Math.sin(progress * Math.PI * 2) * 8).toFixed(2)}deg) rotateZ(${(-1.5 + progress * 3).toFixed(2)}deg) scale(${(1 + Math.sin(progress * Math.PI) * 0.01).toFixed(3)})`
        : "none";
    };
    const update = (time) => {
      frame = null;
      if (!enabled || document.hidden) return;
      const bounds = section.getBoundingClientRect();
      const target = clamp((top - bounds.top) / distance);
      // Always settle the endpoints after a fast swipe, even offscreen. Otherwise
      // returning to the hero can display an old screen from the previous visit.
      const outside = bounds.bottom < 0 || bounds.top > window.innerHeight;
      const elapsed = lastTime === null ? 16 : Math.min(time - lastTime, 64);
      progress = outside ? target : progress + (target - progress) * (1 - Math.exp(-elapsed / 140));
      const settled = Math.abs(target - progress) < 0.0001;
      if (settled) progress = target;
      paint(progress, true);
      lastTime = settled ? null : time;
      if (!settled) frame = window.requestAnimationFrame(update);
    };
    const schedule = () => {
      if (enabled && !document.hidden && frame === null) frame = window.requestAnimationFrame(update);
    };
    const stop = () => {
      window.removeEventListener("scroll", schedule);
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = null;
      lastTime = null;
    };
    const synchronize = () => {
      if (!document.hidden) schedule();
      else if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
        lastTime = null;
      }
    };
    const measure = () => {
      top = (document.querySelector(".site-header")?.offsetHeight || 90) + 16;
      const enlarged = parseFloat(getComputedStyle(document.documentElement).fontSize) > 24;
      // Match CSS's small viewport rather than the changing space left by mobile
      // browser toolbars. Expanding the address bar must not remove the track.
      const height = viewport.current.offsetHeight;
      section.dataset.enlargedText = String(enlarged);
      enabled = !preference.matches
        && !enlarged && stage.offsetHeight < height - top - 8
        && (window.innerWidth <= 600 || copy.offsetHeight < height - top - 8);
      distance = Math.min(height * 0.55, 480) * (scenes.length - 1);
      section.style.setProperty("--hero-stick-top", `${top}px`);
      hero.style.setProperty("--hero-copy-top", `${Math.max(top, (height - copy.offsetHeight) / 2)}px`);
      section.style.setProperty("--hero-track-height", `${stage.offsetHeight + distance}px`);
      section.dataset.scrollReady = String(enabled);
      hero.classList.toggle("is-scroll-story", enabled);
      setPinned(enabled);
      if (enabled) schedule();
      else {
        if (frame !== null) window.cancelAnimationFrame(frame);
        frame = null;
        lastTime = null;
        progress = selected.current / (scenes.length - 1);
        paint(progress, false);
      }
      synchronize();
    };
    controller.current = (index) => {
      if (enabled) {
        window.scrollTo({
          top: window.scrollY + section.getBoundingClientRect().top - top + distance * index / (scenes.length - 1),
          behavior: "smooth",
        });
      } else {
        progress = index / (scenes.length - 1);
        paint(progress, false);
      }
    };
    const resize = window.ResizeObserver ? new ResizeObserver(measure) : null;
    resize?.observe(stage);
    resize?.observe(copy);
    resize?.observe(viewport.current);
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
      <div className="hero-story-viewport" ref={viewport} aria-hidden="true" />
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
                loading="eager"
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
