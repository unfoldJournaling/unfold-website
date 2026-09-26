import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { detectPlatform } from "./data/site.js";
import StoreLinks from "./components/StoreLinks.jsx";
import Icon from "./components/Icon.jsx";

export default function GetApp() {
  const [platform, setPlatform] = useState("desktop");
  useEffect(() => {
    const detected = detectPlatform();
    setPlatform(detected === "desktop" && /Macintosh|Mac OS X/.test(navigator.userAgent) ? "ios" : detected);
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
        A little space, wherever you are.
      </h1>
      <p>
        {platform === "android" ? "Download Unfold for Android from Google Play." : platform === "ios" ? "Download Unfold for iPhone from the App Store." : "Download Unfold and make a little room for yourself. Choose your app store to get started."}
      </p>
      <StoreLinks preferred={platform} />
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
