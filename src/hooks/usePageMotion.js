import { useEffect } from "react";

const clamp = (value) => Math.max(0, Math.min(1, value));

// One passive listener drives the homepage's reversible viewport sequences.
// Content stays visible before hydration, with no timer or continuous render loop.
export default function usePageMotion(root) {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = [...root.current.querySelectorAll("[data-motion]")];
    let frame = null;
    let enabled = false;

    const paint = () => {
      frame = null;
      if (!enabled || document.hidden) return;
      const height = window.innerHeight;
      const positions = elements.map((element) => ({ element, bounds: element.getBoundingClientRect() }));
      positions.forEach(({ element, bounds }) => {
        // The marker is stationary; only its children move, avoiding feedback.
        if (bounds.bottom < -80 || bounds.top > height + 80) return;
        const progress = clamp((height - bounds.top) / (height + bounds.height));
        const arrival = clamp((height * 0.94 - bounds.top) / (height * 0.38));
        const departure = clamp(bounds.bottom / (height * 0.24));
        const presence = Math.min(arrival, departure);
        element.style.setProperty("--motion-progress", progress.toFixed(4));
        element.style.setProperty("--motion-presence", presence.toFixed(4));
        element.style.setProperty("--motion-breath", (Math.sin(progress * Math.PI * 2) * 0.12).toFixed(4));
      });
    };
    const schedule = () => {
      if (enabled && !document.hidden && frame === null) frame = window.requestAnimationFrame(paint);
    };
    const synchronize = () => {
      enabled = !preference.matches && parseFloat(getComputedStyle(document.documentElement).fontSize) <= 24;
      elements.forEach((element) => {
        element.dataset.motionReady = String(enabled);
        if (!enabled) {
          element.style.removeProperty("--motion-progress");
          element.style.removeProperty("--motion-presence");
          element.style.removeProperty("--motion-breath");
        }
      });
      if (enabled) schedule();
      else if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", synchronize, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    preference.addEventListener("change", synchronize);
    const resize = window.ResizeObserver ? new ResizeObserver(synchronize) : null;
    resize?.observe(document.documentElement);
    synchronize();
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      resize?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", synchronize);
      document.removeEventListener("visibilitychange", schedule);
      preference.removeEventListener("change", synchronize);
    };
  }, [root]);
}
