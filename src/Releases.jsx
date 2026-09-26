import usePublishedContent from "./hooks/usePublishedContent.js";
import ContentBody from "./components/ContentBody.jsx";
import { DownloadCta } from "./components/SiteLayout.jsx";

const platformNames = { all: "iOS & Android", ios: "iOS", android: "Android" };

export default function Releases() {
  const { items, loading, error } = usePublishedContent("releases");
  return (
    <>
      <section className="container releases-heading" aria-labelledby="releases-title">
        <p className="eyebrow">Product updates</p>
        <h1 id="releases-title">A clearer way to see what’s new.</h1>
        <p>Changes to Unfold, shared with the same care that goes into making them.</p>
      </section>
      <section className="container releases-list" aria-label="Release notes">
        {items.map((item) => <article className="release-entry" key={item.slug}>
          <div className="release-meta">
            <span className="eyebrow">{platformNames[item.platform] || "Unfold"}</span>
            <time dateTime={item.published_at?.slice(0, 10)}>{item.published_at && new Date(item.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time>
          </div>
          <div className="release-copy">
            <p className="release-version">Version {item.version}</p>
            <h2>{item.title}</h2>
            <p className="release-summary">{item.summary}</p>
            <ContentBody text={item.body} headingLevel={3} />
          </div>
        </article>)}
        {!items.length && loading && <p className="content-status" role="status">Checking for updates…</p>}
        {!items.length && error && <p className="content-status" role="status">Release notes are temporarily unavailable. Please check back shortly.</p>}
        {!items.length && !loading && !error && <div className="release-empty"><h2>Updates are coming.</h2><p>When there is something new to share, you’ll find the details here.</p></div>}
      </section>
      <DownloadCta />
    </>
  );
}
