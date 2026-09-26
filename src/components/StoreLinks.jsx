import { APP_STORE_URL, PLAY_STORE_URL } from "../data/site.js";
export default function StoreLinks({ preferred = "desktop" }) {
  const apple = (
    <a className={`store-link${preferred === "ios" ? " is-preferred" : ""}`} href={APP_STORE_URL} aria-label="Download Unfold on the App Store">
      <svg viewBox="0 0 24 24" width="25" height="25" fill="currentColor" aria-hidden="true"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z" /></svg>
      <span><small>Download on the</small>App Store</span>
    </a>
  );
  const google = (
    <a className={`store-link${preferred === "android" ? " is-preferred" : ""}`} href={PLAY_STORE_URL} aria-label="Get Unfold on Google Play">
      <svg viewBox="0 0 24 24" width="25" height="25" fill="currentColor" aria-hidden="true"><path d="M3.6 1.8 13.8 12 3.6 22.2A1 1 0 0 1 3 21.3V2.7a1 1 0 0 1 .6-.9Zm10.9 10.9 2.3 2.3L5.9 21.3l8.6-8.6Zm3.2-3.2 2.8 1.6a1 1 0 0 1 0 1.8l-2.8 1.6-2.6-2.5 2.6-2.5ZM5.9 2.7 16.8 9l-2.3 2.3-8.6-8.6Z" /></svg>
      <span><small>Get it on</small>Google Play</span>
    </a>
  );
  return (
    <div className="store-links">
      {preferred === "android" ? <>{google}{apple}</> : <>{apple}{google}</>}
    </div>
  );
}
