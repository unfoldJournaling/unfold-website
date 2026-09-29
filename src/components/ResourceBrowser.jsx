import Icon from "./Icon.jsx";
export function PageIntro({ eyebrow, title, children }) {
  return (
    <section className="container page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{children}</p>
    </section>
  );
}
export function ResourceFilters({
  label,
  query,
  setQuery,
  categories,
  category,
  setCategory,
  count,
  noun,
}) {
  return (
    <div className="resource-controls">
      <label className="search-field">
        <Icon name="search" size={20} />
        <span className="sr-only">{label}</span>
        <input
          type="search"
          placeholder={label}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <div
        className="category-filters"
        role="group"
        aria-label={`Filter ${noun} by topic`}
      >
        {["All", ...categories].map((item) => (
          <button
            key={item}
            aria-pressed={category === item}
            className={category === item ? "is-selected" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="results-count" role="status">
        {count} {count === 1 ? noun : `${noun}s`}
        {query.trim() ? ` matching “${query.trim()}”` : ""}
      </p>
    </div>
  );
}
export function EmptyResources({ reset }) {
  return (
    <div className="resource-empty">
      <h3>Nothing here just yet.</h3>
      <p>Try another word or explore every topic.</p>
      <button className="button button-outline" onClick={reset}>
        Clear filters
      </button>
    </div>
  );
}
