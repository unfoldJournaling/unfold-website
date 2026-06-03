import { useEffect } from "react";
import { Link } from "react-router-dom";
import { APP_STORE_URL, PLAY_STORE_URL, detectPlatform } from "./App.jsx";

// /get-app — smart redirect endpoint used by the QR code in the desktop download modal.
// On iOS / Android it sends users to the right store immediately.
// On desktop (rare for a QR target) it falls back to showing both store options.
export default function GetApp() {
  const platform = detectPlatform();

  useEffect(() => {
    if (platform === "ios") window.location.replace(APP_STORE_URL);
    else if (platform === "android") window.location.replace(PLAY_STORE_URL);
  }, [platform]);

  const s = {
    sage: "#382CBE",
    cream: "#FFFFFF",
    bark: "#000000",
    barkLight: "#666666",
    sand: "#E5E5E5",
  };
  const fontDisplay = "'Fraunces', serif";
  const fontBody = "'Plus Jakarta Sans', sans-serif";

  return (
    <div style={{ fontFamily: fontBody, background: s.cream, color: s.bark, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
      `}</style>

      <div style={{ maxWidth: 420, width: "100%", textAlign: "center" }}>
        <h1 style={{ fontFamily: fontDisplay, fontSize: "2rem", fontWeight: 400, marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
          {platform === "desktop" ? "Get Unfold" : "Opening the store…"}
        </h1>
        <p style={{ color: s.barkLight, marginBottom: "2rem", lineHeight: 1.6 }}>
          {platform === "desktop"
            ? "Choose your platform to download Unfold."
            : "If the store doesn't open automatically, use a button below."}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "2rem" }}>
          <a href={APP_STORE_URL} style={{ background: s.bark, color: s.cream, padding: "0.9rem 1.5rem", borderRadius: 100, textDecoration: "none", fontWeight: 600, fontSize: "0.95rem", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.55rem" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            Download on the App Store
          </a>
          <a href={PLAY_STORE_URL} style={{ background: "transparent", color: s.bark, padding: "0.85rem 1.5rem", borderRadius: 100, textDecoration: "none", fontWeight: 600, fontSize: "0.95rem", border: `1.5px solid ${s.sand}`, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.55rem" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.119 12l2.579-2.491zM5.864 2.658L16.802 8.99l-2.302 2.303-8.636-8.635z" />
            </svg>
            Get it on Google Play
          </a>
        </div>

        <Link to="/" style={{ color: s.barkLight, fontSize: "0.9rem", textDecoration: "none" }}>
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
