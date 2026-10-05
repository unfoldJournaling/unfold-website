import { useEffect, useRef } from "react";

export default function ScrollShowcase({ children, hero = false }) {
  const anchor = useRef(null);
  const visual = useRef(null);

  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const element = anchor.current;
    const layer = visual.current;
    let visible = false;
    let active = false;
    let frame = null;

    const paint = () => {
      frame = null;
      if (!active) return;
      // Measure the unmoving anchor so the transform cannot feed back into itself.
      const bounds = element.getBoundingClientRect();
      const height = window.innerHeight;
      const progress = Math.max(-1, Math.min(1, (bounds.top + bounds.height / 2 - height * 0.55) / (height * 0.7)));
      const compact = window.innerWidth <= 600;
      const travel = compact ? 18 : 32;
      const turn = hero ? (compact ? -3 : -7) + progress * 6 : progress * 2;
      layer.style.setProperty("--showcase-y", `${(progress * travel).toFixed(2)}px`);
      layer.style.setProperty("--showcase-turn", `${turn.toFixed(2)}deg`);
      layer.style.setProperty("--showcase-lean", `${(progress * (hero ? 1.5 : 0.5)).toFixed(2)}deg`);
      layer.style.setProperty("--showcase-opacity", (1 - Math.abs(progress) * (compact ? 0.14 : 0.2)).toFixed(3));
    };
    const schedule = () => {
      if (active && frame === null) frame = window.requestAnimationFrame(paint);
    };
    const stop = () => {
      active = false;
      window.removeEventListener("scroll", schedule);
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = null;
      layer.removeAttribute("data-moving");
    };
    const synchronize = () => {
      if (preference.matches) {
        stop();
        layer.style.removeProperty("--showcase-y");
        layer.style.removeProperty("--showcase-turn");
        layer.style.removeProperty("--showcase-lean");
        layer.style.removeProperty("--showcase-opacity");
      } else if (visible && !document.hidden) {
        if (!active) {
          active = true;
          layer.setAttribute("data-moving", "true");
          window.addEventListener("scroll", schedule, { passive: true });
        }
        schedule();
      } else {
        stop();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      synchronize();
    }, { rootMargin: "80px 0px" });
    observer.observe(element);
    window.addEventListener("resize", schedule, { passive: true });
    document.addEventListener("visibilitychange", synchronize);
    preference.addEventListener("change", synchronize);
    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", synchronize);
      preference.removeEventListener("change", synchronize);
    };
  }, [hero]);

  return <div ref={anchor} className={`scroll-showcase${hero ? " scroll-showcase--hero" : ""}`}>
    <div ref={visual} className="scroll-showcase-visual">{children}</div>
  </div>;
}
