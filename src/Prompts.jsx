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

const featuredPrompt = promptLibrary[1];
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
  const [showAll, setShowAll] = useState(false);
  const visible = filterResources(promptLibrary, query, category);
  const browsingAll = showAll || category !== "All" || Boolean(query.trim());
  const shown = browsingAll ? visible : visible.filter((prompt) => startingIds.has(prompt.id));

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
        Choose a question, then answer it in your own words. A few words are
        enough.
      </PageIntro>
      <section
        className="container prompt-guidance"
        aria-label="How to use these prompts"
      >
        <div>
          <p className="eyebrow">Start with one question</p>
          <h2>The question is for you to answer.</h2>
          <p>Open Interactive Journal in Unfold and write your response, or use a notebook. You don’t need to paste the question into the chat. Morning and Evening Reflection begin with their own questions.</p>
          <div className="prompt-guidance-links">
            <Link className="text-link" to="/get-app">Get Unfold <Icon /></Link>
            <Link className="text-link" to="/blog/how-to-start-journaling">New to journaling? <Icon /></Link>
          </div>
        </div>
        <div className="prompt-starter">
          <p className="eyebrow">An example question</p>
          <blockquote>{featuredPrompt.text}</blockquote>
          <div className="prompt-starter-answer">
            <p className="eyebrow">You might write</p>
            <p>“Emotionally, today felt cloudy in the morning, then clearer after a walk. Work overwhelmed me, but I’m calmer now.”</p>
          </div>
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
