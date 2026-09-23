export default function ProductScreenshot({ image = 3, alt, eager = false }) {
  return <div className="app-screen-window">
    <img src={`/images/app-${image}.webp`} width="443" height="960"
      loading={eager ? "eager" : "lazy"} fetchpriority={eager ? "high" : "auto"} alt={alt} />
  </div>;
}
