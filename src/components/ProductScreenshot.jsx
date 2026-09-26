export default function ProductScreenshot({ image = 3, alt, eager = false }) {
  return <div className="app-screen-window">
    <img src={`/images/store-${image}.webp`} width="600" height="1300"
      loading={eager ? "eager" : "lazy"} fetchpriority={eager ? "high" : "auto"} alt={alt} />
  </div>;
}
