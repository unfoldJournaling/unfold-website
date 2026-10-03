const artwork = {
  1: "overview",
  2: "mood",
  3: "journal",
  4: "health",
  5: "trends",
};

export default function ProductScreenshot({ image = 3, alt, eager = false }) {
  return <div className="app-screen-window app-screen-window--poster">
    <img src={`/images/app-store-${artwork[image]}.jpg`} width="600" height="1300"
      loading={eager ? "eager" : "lazy"} fetchpriority={eager ? "high" : "auto"} alt={alt} />
  </div>;
}
