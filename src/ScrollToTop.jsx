import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
const positions = new Map();
export default function ScrollToTop() {
  const location = useLocation();
  const navigation = useNavigationType();
  const previous = useRef(null);
  useEffect(() => {
    const prior = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => { window.history.scrollRestoration = prior; };
  }, []);
  useEffect(() => {
    const old = previous.current;
    const samePage = old?.pathname === location.pathname;
    // Native fragment links reuse the history key; a saved position must not
    // override the newly selected anchor (including privacy-page contents links).
    const nativeAnchorChange = samePage && old.key === location.key && old.hash !== location.hash;
    if (navigation === "POP" && positions.has(location.key) && !nativeAnchorChange) {
      window.scrollTo({ top: positions.get(location.key), behavior: "instant" });
    } else if (location.hash) {
      let anchor = location.hash.slice(1);
      try { anchor = decodeURIComponent(anchor); } catch { /* Keep literal malformed anchors. */ }
      document.getElementById(anchor)?.scrollIntoView();
    } else if (!samePage || (["PUSH", "REPLACE"].includes(navigation) && old.key !== location.key && old.search === location.search)) {
      window.scrollTo({ top: 0, behavior: "instant" });
      if (old) document.getElementById("main-content")?.focus({ preventScroll: true });
    }
    previous.current = location;
    const record = () => {
      // Ignore scroll events from a destination committed before effect cleanup.
      if ((window.history.state?.key || "default") === location.key) {
        positions.set(location.key, window.scrollY);
      }
    };
    record();
    window.addEventListener("scroll", record, { passive: true });
    return () => window.removeEventListener("scroll", record);
  }, [location, navigation]);
  return null;
}
