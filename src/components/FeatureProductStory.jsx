import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import ScrollShowcase from "./ScrollShowcase.jsx";

const features = [
  { label: "Write", title: "Start with a thought.", description: "Write about what’s on your mind. Luma can offer a question or a follow-up when you want a little guidance.", screen: "journal", alt: "guided journal with a sample question and response" },
  { label: "Speak", title: "Give your thoughts a voice.", description: "Talk with Luma when you’d rather speak than type. Voice access depends on your plan and app version.", screen: "voice", alt: "voice journal with microphone and session controls" },
  { label: "Connect", title: "See more of your day.", description: "Check in with your mood. Apple Health on iPhone or Health Connect on supported Android devices can add optional sleep and activity context.", screen: "health", alt: "health view with optional connections and sample wellness estimates" },
  { label: "Revisit", title: "Return with perspective.", description: "Find an entry by mood, topic or tags. Revisit your reflections and notice the moments you want to carry forward.", screen: "history", alt: "journal history with mood filters and sample entries" },
];

export default function FeatureProductStory({ platform }) {
  const [scene, setScene] = useState(0);
  return (
    <div className="feature-story-track">
      <div className="feature-story-pin">
        <div className="feature-story-controls" role="group" aria-label="Explore Unfold features">
          {features.map((item, index) => (
            <button
              key={item.screen}
              id={"feature-story-control-" + index}
              type="button"
              aria-pressed={scene === index}
              aria-controls={"feature-story-panel-" + index}
              onClick={() => setScene(index)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="feature-story-copy">
          <div className="feature-story-panels">
            {features.map((item, index) => (
              <div
                key={item.screen}
                id={"feature-story-panel-" + index}
                role="region"
                aria-labelledby={"feature-story-control-" + index}
                aria-hidden={scene !== index}
                className={scene === index ? "is-active" : ""}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
          <Link className="text-link" to="/features">Explore all features <Icon size={19} /></Link>
        </div>
        <div className="feature-story-preview">
          <ScrollShowcase>
            <div className={"app-screen-window feature-story-device app-screen-window--" + platform}>
              {features.map((item, index) => (
                <img
                  key={item.screen}
                  src={"/images/product-20261005/" + platform + "-" + item.screen + ".png"}
                  width={platform === "android" ? 1080 : 1206}
                  height={platform === "android" ? 2340 : 2622}
                  loading="lazy"
                  decoding="async"
                  style={{ opacity: scene === index ? 1 : 0, visibility: scene === index ? "visible" : "hidden" }}
                  aria-hidden={scene !== index}
                  alt={"Unfold " + (platform === "android" ? "Android" : "iPhone") + " " + item.alt + ". Sample app screen."}
                />
              ))}
            </div>
          </ScrollShowcase>
        </div>
      </div>
    </div>
  );
}
