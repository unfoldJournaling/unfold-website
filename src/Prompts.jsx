import useResourceQuery from "./hooks/useResourceQuery.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  PageIntro,
  ResourceFilters,
  EmptyResources,
} from "./components/ResourceBrowser.jsx";
import { DownloadCta } from "./components/SiteLayout.jsx";
import Icon from "./components/Icon.jsx";
import {
  filterResources,
  promptGroups,
  promptLibrary,
} from "./data/resources.js";

const featuredPrompt = promptLibrary[0];
const startingIds = new Set(
  Object.keys(promptGroups).flatMap((group) =>
    promptLibrary
      .filter((prompt) => prompt.category === group && prompt.id !== featuredPrompt.id)
      .slice(0, 2)
      .map((prompt) => prompt.id),
  ),
);

export default function Prompts() {
  const { query, setQuery, category, setCategory, reset } = useResourceQuery("All");
  const [copyFeedback, setCopyFeedback] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const visible = filterResources(promptLibrary, query, category);
  const browsingAll = showAll || category !== "All" || Boolean(query.trim());
  const shown = browsingAll ? visible : visible.filter((prompt) => startingIds.has(prompt.id));

  async function copyPrompt(prompt, surface) {
    try {
      await navigator.clipboard.writeText(prompt.text);
      setCopyFeedback({ id: prompt.id, surface, text: "Copied. Paste this question into a new journal entry." });
    } catch {
      setCopyFeedback({ id: prompt.id, surface, text: "Copy is unavailable here. Select the question to copy it manually." });
    }
  }

  function copyAction(prompt, featured = false) {
    const surface = featured ? "starter" : "library";
    const feedbackHere = copyFeedback?.id === prompt.id && copyFeedback.surface === surface;
    return <>
      <button
        className={featured ? "button button-small" : "text-link"}
        type="button"
        onClick={() => void copyPrompt(prompt, surface)}
        aria-label={`Copy question: ${prompt.text}`}
      >
        {feedbackHere ? "Copy again" : featured ? "Copy this question" : "Copy question"}
        {!featured && <Icon size={18} />}
      </button>
      {feedbackHere && <p className="prompt-copy-feedback" role="status">{copyFeedback.text}</p>}
    </>;
  }

  return (
    <>
      <PageIntro
        eyebrow="Journaling prompts"
        title={
          <>
            A place to start
            <br />
            <span>writing.</span>
          </>
        }
      >
        Choose a question and copy it into your Unfold journal or a notebook.
        A few words are enough.
      </PageIntro>
      <section
        className="container prompt-guidance"
        aria-label="How to use these prompts"
      >
        <div>
          <p className="eyebrow">Start with one question</p>
          <h2>Begin wherever you are.</h2>
          <p>Paste the question into a new journal entry and write what comes. Skip anything that doesn’t feel right; you can always choose another.</p>
          <div className="prompt-guidance-links">
            <Link className="text-link" to="/get-app">Get Unfold <Icon /></Link>
            <Link className="text-link" to="/blog/how-to-start-journaling">New to journaling? <Icon /></Link>
          </div>
        </div>
        <div className="prompt-starter">
          <p className="eyebrow">A starting point</p>
          <blockquote>{featuredPrompt.text}</blockquote>
          {copyAction(featuredPrompt, true)}
        </div>
      </section>
      <section
        className="section container resource-library"
        aria-labelledby="library-title"
      >
        <h2 id="library-title">Find your next question.</h2>
        <p className="prompt-library-intro">Browse by topic or search for what is on your mind.</p>
        <ResourceFilters
          label="Search prompts"
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          categories={Object.keys(promptGroups)}
          count={visible.length}
          noun="prompt"
        />
        {!browsingAll && <p className="prompt-preview-note">Showing {shown.length} of {visible.length} prompts, with a starting point from each topic.</p>}
        {visible.length ? (
          <>
            <div className="prompt-grid">
              {shown.map((prompt) => (
                <article className="prompt-entry" key={prompt.id}>
                  <p className="eyebrow">{prompt.category}</p>
                  <h3>{prompt.text}</h3>
                  {copyAction(prompt)}
                </article>
              ))}
            </div>
            {!browsingAll && <button className="button button-outline prompt-show-all" type="button" onClick={() => setShowAll(true)}>See all {visible.length} prompts <Icon size={18} /></button>}
          </>
        ) : (
          <EmptyResources
            reset={() => {
              reset();
            }}
          />
        )}
      </section>
      <DownloadCta />
    </>
  );
}
