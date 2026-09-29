import { Link } from "react-router-dom";
import { PageIntro } from "./components/ResourceBrowser.jsx";
import Icon from "./components/Icon.jsx";
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
        Unfold is free to download, with optional subscriptions for premium
        features. Explore the current options in the app before you decide.
      </PageIntro>
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
