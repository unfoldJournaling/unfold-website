export default function ProductScreenshot({ image = 3, alt, eager = false, presentation = "poster" }) {
  return <div className={`app-screen-window app-screen-window--${presentation}`}>
    <img src={`/images/store-${image}.webp`} width="600" height="1298"
      loading={eager ? "eager" : "lazy"} fetchpriority={eager ? "high" : "auto"} alt={alt} />
  </div>;
}
