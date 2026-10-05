import { Link } from "react-router-dom";
import { PageIntro } from "./components/ResourceBrowser.jsx";
import Icon from "./components/Icon.jsx";

const plans = [
  {
    name: "Free",
    label: "A place to begin",
    description: "Build a journaling practice at your own pace.",
    benefits: ["Basic journaling", "Access to your existing entries", "Optional AI previews where available"],
    billing: "No subscription needed.",
  },
  {
    name: "Pro",
    label: "For your own practice",
    description: "Go deeper with your personal reflections.",
    benefits: ["Everything in Free", "Deeper AI insights and memory", "Voice journaling and Unfold Clarity"],
    billing: "Choose Monthly or Yearly in the app.",
  },
  {
    name: "Family",
    label: "For you and your loved ones",
    description: "One person pays. Everyone has their own account.",
    benefits: ["Premium benefits for each member", "2, 4 or 6 accounts, including the payer", "Private journals and optional wellness sharing"],
    billing: "Choose your account count and Monthly or Yearly in the app.",
  },
];

export default function Plans() {
  return (
    <>
      <PageIntro
        eyebrow="Subscriptions & billing"
        title={
          <>
            Subscriptions, explained.
            <br />
            <span>Know before you subscribe.</span>
          </>
        }
      >
        Start with free journaling. Choose an optional subscription when you
        want more, for yourself or your loved ones.
      </PageIntro>
      <section className="section container plan-comparison" aria-labelledby="compare-title">
        <p className="eyebrow">Choose what fits</p>
        <h2 id="compare-title">Your journal. Your choice.</h2>
        <div className="plan-comparison-grid">
          {plans.map((plan) => (
            <article key={plan.name}>
              <p className="plan-label">{plan.label}</p>
              <h3>{plan.name}</h3>
              <p className="plan-description">{plan.description}</p>
              <ul>{plan.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
              <p className="plan-billing">{plan.billing}</p>
            </article>
          ))}
        </div>
        <p className="plan-availability">
          Available plans, features and usage allowances are shown in the app.
          Your store shows the current local price and total charge before you pay.
          Family payment never unlocks another person’s journal or wellness data.
        </p>
        <Link className="text-link" to="/features#family">See how Family sharing works <Icon /></Link>
      </section>
      <section className="container plan-overview" aria-labelledby="plan-title">
        <div>
          <p className="eyebrow">Your store. Your local price.</p>
          <h2 id="plan-title">
            The details belong
            <br />
            before the decision.
          </h2>
            <p>
              Your purchase screen shows the available features, price, billing
              period, and any eligible trial. These can vary by platform and
              region.
            </p>
            <p>
              Yearly is billed as one annual payment. Any monthly equivalent is
              a comparison, not a monthly charge.
            </p>
          <Link className="button" to="/get-app">
            Get Unfold
            <Icon />
          </Link>
        </div>
        <div className="plan-checklist">
          <h3>Before you subscribe, check:</h3>
          <ol>
            <li>
              <strong>What’s included</strong>
              <span>The features available with your selected plan.</span>
            </li>
            <li>
              <strong>What you’ll pay</strong>
              <span>The local price, currency, and billing period.</span>
            </li>
            <li>
              <strong>When it renews</strong>
              <span>Any trial end date and the price after the trial.</span>
            </li>
            <li>
              <strong>Where to manage it</strong>
              <span>The Apple or Google account used for the purchase.</span>
            </li>
          </ol>
        </div>
      </section>
      <section
        id="manage"
        className="section container"
        aria-labelledby="manage-title"
      >
        <p className="eyebrow">Already subscribed?</p>
        <h2 id="manage-title">Keep your plan in your hands.</h2>
        <div className="management-grid">
          <article>
            <h3>Purchased through Apple</h3>
            <p>
              Manage your subscription through the Apple Account used for your
              purchase. Apple’s guide explains cancellation on your device or on
              the web.
            </p>
            <a
              className="text-link"
              href="https://support.apple.com/en-us/118428"
              target="_blank"
              rel="noreferrer"
            >
              Apple subscription guide
              <Icon />
            </a>
          </article>
          <article>
            <h3>Purchased through Google Play</h3>
            <p>
              Use the Google account that made your purchase to review or cancel
              your subscription. Google’s guide explains the available options.
            </p>
            <a
              className="text-link"
              href="https://support.google.com/googleplay/answer/7018481"
              target="_blank"
              rel="noreferrer"
            >
              Google Play subscription guide
              <Icon />
            </a>
          </article>
        </div>
        <p className="subscription-note">
          Deleting the app or requesting account deletion does not replace
          managing your store subscription.
        </p>
      </section>
      <section className="section plans-help">
        <div className="container split-editorial">
          <div>
            <p className="eyebrow">Need a hand?</p>
            <h2>Let’s find the next step.</h2>
          </div>
          <div>
            <p>
              If a purchase is missing, check that you’re signed into the store
              account that made it and look for the restore-purchases option in
              the app. For anything else, our help page has answers and a way to
              reach the team.
            </p>
            <div className="editorial-links">
              <Link className="text-link" to="/help">
                Visit Unfold help
                <Icon />
              </Link>
              <Link className="text-link" to="/terms">
                Read the terms of use
                <Icon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
