import useResourceQuery from "./hooks/useResourceQuery.js";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  PageIntro,
  ResourceFilters,
  EmptyResources,
} from "./components/ResourceBrowser.jsx";
import Icon from "./components/Icon.jsx";
import { helpItems, filterResources } from "./data/resources.js";
import SupportContactForm from "./components/SupportContactForm.jsx";
export default function Help() {
  const { hash } = useLocation();
  const { query, setQuery, category, setCategory, reset, hydrated } = useResourceQuery("All");
  const visible = filterResources(helpItems, query, category);
  useEffect(() => {
    if (!hydrated) return;
    const target = hash === "#contact" ? "contact" : helpItems.find((item) => hash === `#${item.id}`)?.id;
    if (target) document.getElementById(target)?.focus({ preventScroll: true });
  }, [hash, hydrated]);
  return (
    <>
      <PageIntro
        eyebrow="Unfold help"
        title={
          <>
            A little help.
            <br />
            <span>A clear next step.</span>
          </>
        }
      >
        From your first entry to your data choices, find answers to the
        questions that come up along the way.
      </PageIntro>
      <section
        className="container support-layout section"
        aria-labelledby="answers-title"
      >
        <div>
          <div className="support-heading">
            <h2 id="answers-title">How can we help?</h2>
            <a className="text-link" href="#contact">Contact support <Icon size={18} /></a>
          </div>
          <ResourceFilters
            label="Search help"
            query={query}
            setQuery={setQuery}
            category={category}
            setCategory={setCategory}
            categories={[...new Set(helpItems.map((item) => item.category))]}
            count={visible.length}
            noun="answer"
          />
          {visible.length ? (
            <div className="faq-list">
              {visible.map((item) => (
                <details key={item.id} open={(hydrated && hash === `#${item.id}`) || query === item.q || undefined}>
                  <summary id={item.id}>
                    {item.q}
                    <Icon name="plus" size={21} />
                  </summary>
                  <div className="faq-answer">
                    <p>{item.a}</p>
                    {item.to && (
                      <Link className="text-link" to={item.to}>
                        {item.label}
                        <Icon size={18} />
                      </Link>
                    )}
                  </div>
                </details>
              ))}
            </div>
          ) : (
            <EmptyResources
              reset={() => {
                reset();
              }}
            />
          )}
        </div>
        <aside className="support-aside">
          <p className="eyebrow">Useful shortcuts</p>
          <Link to="/get-app">
            Download Unfold <Icon />
          </Link>
          <Link to="/plans#manage">
            Manage a subscription <Icon />
          </Link>
          <Link to="/privacy">
            Privacy & your data <Icon />
          </Link>
          <Link to="/delete-account">
            Delete your account <Icon />
          </Link>
          <SupportContactForm id="contact" />
        </aside>
      </section>
    </>
  );
}
