import { useEffect, useState } from "react";
import { feedbackRequest } from "../data/feedback.js";

export default function useFeatureBoard() {
  const [state, setState] = useState({ items: [], loading: true, error: false });
  useEffect(() => {
    let active = true;
    let requestNumber = 0;
    async function refresh() {
      if (document.visibilityState === "hidden") return;
      const request = ++requestNumber;
      try {
        const payload = await feedbackRequest();
        if (!Array.isArray(payload.items)) throw new Error("Invalid roadmap response.");
        if (active && request === requestNumber) setState({ items: payload.items, loading: false, error: false });
      } catch {
        if (active && request === requestNumber) setState((current) => ({ ...current, loading: false, error: true }));
      }
    }
    const timer = window.setInterval(() => void refresh(), 60000);
    const onVisible = () => { if (document.visibilityState === "visible") void refresh(); };
    void refresh();
    window.addEventListener("focus", onVisible);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      active = false;
      window.clearInterval(timer);
      window.removeEventListener("focus", onVisible);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);
  return state;
}
