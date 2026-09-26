import { useEffect, useState } from "react";

const REFRESH_INTERVAL = 5000;

export default function usePublishedContent(collection) {
  const [state, setState] = useState({ items: [], loading: true, error: false });

  useEffect(() => {
    let active = true;
    let latestRequest = 0;

    const refresh = async () => {
      if (document.visibilityState === "hidden") return;
      const request = ++latestRequest;
      try {
        const response = await fetch(`/api/content/${collection}`, {
          cache: "no-store",
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("Content is unavailable.");
        const payload = await response.json();
        if (!Array.isArray(payload.items)) throw new Error("Invalid content response.");
        if (active && request === latestRequest) {
          setState({ items: payload.items, loading: false, error: false });
        }
      } catch {
        if (active && request === latestRequest) {
          setState({ items: [], loading: false, error: true });
        }
      }
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    void refresh();
    const timer = window.setInterval(() => void refresh(), REFRESH_INTERVAL);
    window.addEventListener("focus", onVisible);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      active = false;
      window.clearInterval(timer);
      window.removeEventListener("focus", onVisible);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [collection]);

  return state;
}
