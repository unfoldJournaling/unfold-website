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
export default function Prompts() {
  const { query, setQuery, category, setCategory, reset } = useResourceQuery("All");
  const [copied, setCopied] = useState(null);
  const [message, setMessage] = useState("");
  const visible = filterResources(promptLibrary, query, category);
  async function copyPrompt(prompt) {
    try {
      await navigator.clipboard.writeText(prompt.text);
      setCopied(prompt.id);
      setMessage(
        "Prompt copied. Paste it into your journal whenever you’re ready.",
      );
    } catch {
      setCopied(null);
      setMessage(
        "Copy is unavailable in this browser. Select the prompt text to copy it manually.",
      );
    }
  }
  return (
    <>
      <PageIntro
        eyebrow="The prompt library"
        title={
          <>
            A way into
            <br />
            <span>what’s on your mind.</span>
          </>
        }
      >
        You don’t need a big story to start. Pick a question, take a breath, and
        see where a few honest words lead.
      </PageIntro>
      <section
        className="container prompt-guidance"
        aria-label="How to use these prompts"
      >
        <span className="eyebrow">Make it your own</span>
        <p>
          Choose one question. Write for a minute or stay a little longer. Skip
          anything that doesn’t feel right for you.
        </p>
        <Link className="text-link" to="/blog/how-to-start-journaling">
          New to journaling? Start here <Icon />
        </Link>
      </section>
      <section
        className="section container resource-library"
        aria-labelledby="library-title"
      >
        <h2 id="library-title">What do you have space for today?</h2>
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
        <p className="copy-status" role="status">
          {message}
        </p>
        {visible.length ? (
          <div className="prompt-grid">
            {visible.map((prompt) => (
              <article className="prompt-entry" key={prompt.id}>
                <p className="eyebrow">{prompt.category}</p>
                <h3>{prompt.text}</h3>
                <button
                  className="text-link"
                  onClick={() => copyPrompt(prompt)}
                  aria-label={`${copied === prompt.id ? "Copy again" : "Copy prompt"}: ${prompt.text}`}
                >
                  {copied === prompt.id ? "Copied — copy again" : "Copy prompt"}
                  <Icon size={18} />
                </button>
              </article>
            ))}
          </div>
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
