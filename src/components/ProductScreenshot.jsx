import ScrollShowcase from "./ScrollShowcase.jsx";

const descriptions = {
  dashboard: "dashboard with a Luma insight brief and wellness summaries",
  journal: "guided journal with a question from Luma and a sample response",
  voice: "voice journal with listening, microphone and call controls",
  health: "health view with optional health connections and wellness estimates",
  history: "journal history with search, mood filters and sample entries",
  breathing: "breathing patterns with visual and audio guide options",
  family: "Family view with separate accounts, invitations and sharing settings",
};

export default function ProductScreenshot({ screen = "journal", platform = "ios", eager = false }) {
  const android = platform === "android";
  return (
    <ScrollShowcase hero={eager}>
      <div className={`app-screen-window app-screen-window--${platform}`}>
        <img
          src={`/images/product-20261005/${platform}-${screen}.png`}
          width={android ? 1080 : 1206}
          height={android ? 2340 : 2622}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchpriority={eager ? "high" : "auto"}
          alt={`Unfold ${android ? "Android" : "iPhone"} ${descriptions[screen]}. Sample app screen.`}
        />
      </div>
    </ScrollShowcase>
  );
}

export function ProductPreviewCaption({ platform, children }) {
  return <>
    <span>{platform === "android" ? "Android" : "iPhone"} app preview · sample data</span>
    <span className="preview-source">{children || "Features may vary by device and app version."}</span>
  </>;
}
