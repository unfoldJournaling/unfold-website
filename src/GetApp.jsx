import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APP_STORE_URL, PLAY_STORE_URL, detectPlatform } from "./data/site.js";
import StoreLinks from "./components/StoreLinks.jsx";
import Icon from "./components/Icon.jsx";

export default function GetApp() {
  const [platform, setPlatform] = useState("desktop");
  useEffect(() => {
    const detected = detectPlatform();
    setPlatform(detected);
    if (detected === "ios") window.location.replace(APP_STORE_URL);
    else if (detected === "android") window.location.replace(PLAY_STORE_URL);
  }, []);
  return (
    <section className="get-app container">
      <img
        className="app-icon"
        src="/Icon%20logo.png"
        width="88"
        height="88"
        alt=""
      />
      <p className="eyebrow">Meet your everyday companion</p>
      <h1>
        {platform === "desktop"
          ? "A little space, wherever you are."
          : "Opening your app store…"}
      </h1>
      <p>
        {platform === "desktop"
          ? "Download Unfold and make a little room for yourself. Choose your app store to get started."
          : "If the store doesn’t open, choose a download below."}
      </p>
      <StoreLinks />
      <p className="small-text">
        Free to download. Optional subscriptions are available in the app.
        <br />
        Features and pricing can vary by platform and region.
      </p>
      <Link className="text-link" to="/">
        Back to Unfold <Icon />
      </Link>
    </section>
  );
}
