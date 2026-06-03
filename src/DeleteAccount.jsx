import { Link } from "react-router-dom";

export default function DeleteAccount() {
  const s = {
    sage: "#382CBE",
    sageDeep: "#382CBE",
    sageLight: "#B5B8EE",
    cream: "#FFFFFF",
    warmWhite: "#FBFBFB",
    bark: "#000000",
    barkLight: "#666666",
  };

  const fontDisplay = "'Fraunces', serif";
  const fontBody = "'Plus Jakarta Sans', sans-serif";

  return (
    <div style={{ fontFamily: fontBody, background: s.cream, color: s.bark, minHeight: "100vh", padding: "4rem 2rem" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
      `}</style>

      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Link to="/" style={{ display: "inline-block", color: s.barkLight, textDecoration: "none", fontSize: "0.95rem", marginBottom: "3rem", transition: "color 0.3s" }}
          onMouseEnter={e => e.target.style.color = s.bark}
          onMouseLeave={e => e.target.style.color = s.barkLight}>
          ← Back to Home
        </Link>

        <h1 style={{ fontFamily: fontDisplay, fontSize: "clamp(2.25rem, 4.5vw, 3rem)", fontWeight: 400, lineHeight: 1.2, marginBottom: "1rem", fontFeatureSettings: "'dlig' 0, 'swsh' 0, 'salt' 0" }}>
          Delete Your Unfold Account
        </h1>
        <p style={{ fontSize: "1.05rem", color: s.barkLight, lineHeight: 1.7, marginBottom: "3rem" }}>
          This page explains how to permanently delete your Unfold AI account and the data associated with it. You can request deletion from inside the Unfold app or directly from this page — no need to reinstall the app.
        </p>

        <div style={{ fontSize: "1rem", lineHeight: 1.8, color: s.barkLight }}>

          {/* Option 1: in-app */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>
              Option 1 — Delete from inside the app
            </h2>
            <p style={{ marginBottom: "1rem" }}>If you still have Unfold installed, this is the fastest path. Your request is processed immediately.</p>
            <ol style={{ marginLeft: "1.5rem", marginBottom: "1rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>Open the Unfold app and go to the <strong>Settings</strong> tab.</li>
              <li style={{ marginBottom: "0.5rem" }}>Tap <strong>Manage Account</strong>.</li>
              <li style={{ marginBottom: "0.5rem" }}>Scroll to the bottom and tap <strong>Delete account</strong>.</li>
              <li style={{ marginBottom: "0.5rem" }}>In the confirmation dialog, tap <strong>Yes, Delete</strong>.</li>
            </ol>
            <p style={{ marginBottom: "1rem" }}>Your account and all associated data are permanently removed. This action is irreversible.</p>
          </section>

          {/* Option 2: by email */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>
              Option 2 — Request deletion by email
            </h2>
            <p style={{ marginBottom: "1rem" }}>If you've uninstalled the Unfold app or can't access it, you can request deletion from us directly. You don't need to reinstall the app.</p>
            <ol style={{ marginLeft: "1.5rem", marginBottom: "1rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>Send an email <strong>from the email address tied to your Unfold account</strong> to <a href="mailto:kings@tryunfold.ai?subject=Delete%20my%20account" style={{ color: s.sage, textDecoration: "underline" }}>kings@tryunfold.ai</a>.</li>
              <li style={{ marginBottom: "0.5rem" }}>Use the subject line: <strong>Delete my account</strong>.</li>
              <li style={{ marginBottom: "0.5rem" }}>That's it — no other details needed. We'll verify the email matches your account and delete your account and all associated data.</li>
            </ol>
            <p style={{ marginBottom: "1rem" }}>We verify the request matches your account email, then process the deletion. <strong>We confirm by email within 7 days</strong> and complete the full deletion within 30 days.</p>
          </section>

          {/* What gets deleted */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>
              What gets deleted
            </h2>
            <p style={{ marginBottom: "0.75rem" }}>When you delete your account, we permanently remove all of the following from our active systems:</p>
            <ul style={{ marginLeft: "1.5rem", marginBottom: "1rem" }}>
              <li>Your account profile (name, email, password hash, settings)</li>
              <li>All journal entries — written, voice, and any uploaded images</li>
              <li>Biometric data imported from Apple Health, Google Fit, or other connected sources (heart rate, HRV, sleep, activity, etc.)</li>
              <li>Your personal stress model, predictions, and pattern history</li>
              <li>In-app notification, subscription, and intervention history</li>
              <li>Device and usage logs tied to your account</li>
            </ul>
            <p>Encryption keys for your data are destroyed and backups containing your data are purged within 30 days.</p>
          </section>

          {/* What we retain and why */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>
              What we may retain (and why)
            </h2>
            <p style={{ marginBottom: "1rem" }}>In limited cases, we retain a small amount of data after account deletion, only as long as required and only for the specific purposes below:</p>
            <ul style={{ marginLeft: "1.5rem", marginBottom: "1rem" }}>
              <li style={{ marginBottom: "0.5rem" }}><strong>Billing &amp; tax records:</strong> Transaction records associated with paid subscriptions, retained for the period required by applicable tax and accounting laws (typically up to 7 years).</li>
              <li style={{ marginBottom: "0.5rem" }}><strong>Fraud and abuse prevention:</strong> Minimal signals (e.g., hashed device identifiers) to prevent re-creation of accounts that violated our Terms of Service.</li>
              <li style={{ marginBottom: "0.5rem" }}><strong>Legal compliance:</strong> Data we are legally required to preserve in response to a valid legal request.</li>
              <li><strong>Aggregated, anonymized statistics:</strong> Data that has already been combined into non-identifiable aggregate form for product analytics — this cannot be linked back to you.</li>
            </ul>
            <p>For more detail, see our <Link to="/privacy" style={{ color: s.sage, textDecoration: "underline" }}>Privacy Policy</Link>.</p>
          </section>

          {/* Subscription note */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>
              Before you delete — active subscriptions
            </h2>
            <p style={{ marginBottom: "1rem" }}>If you have an active Pro subscription, cancel it <strong>before</strong> deleting your account — otherwise Apple or Google may continue to bill you, since subscriptions are processed by the app store and not by Unfold directly. There are three ways to cancel:</p>
            <ul style={{ marginLeft: "1.5rem", marginBottom: "1rem" }}>
              <li style={{ marginBottom: "0.5rem" }}><strong>Inside the Unfold app:</strong> Settings → Manage Account → <em>Manage Subscription</em>. This opens your app store's subscription page.</li>
              <li style={{ marginBottom: "0.5rem" }}><strong>iOS / App Store directly:</strong> Settings → [your Apple ID name] → Subscriptions → Unfold → Cancel Subscription.</li>
              <li style={{ marginBottom: "0.5rem" }}><strong>Google Play directly:</strong> Play Store → Profile → Payments &amp; subscriptions → Subscriptions → Unfold → Cancel.</li>
            </ul>
            <p>You'll keep Pro access through the end of the current billing period. If you need help cancelling, email <a href="mailto:kings@tryunfold.ai" style={{ color: s.sage, textDecoration: "underline" }}>kings@tryunfold.ai</a> before requesting deletion.</p>
          </section>

          {/* Timeline */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>
              Timeline
            </h2>
            <ul style={{ marginLeft: "1.5rem", marginBottom: "1rem" }}>
              <li><strong>In-app deletion:</strong> Immediate. Your account is closed and active data is deleted within minutes.</li>
              <li><strong>Email-based request:</strong> Confirmed within 7 days; full deletion within 30 days.</li>
              <li><strong>Backups:</strong> Any encrypted backups containing your data are purged within 30 days of the deletion request.</li>
            </ul>
          </section>

          {/* Regional rights */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>
              Your rights under GDPR, UK GDPR, and CCPA
            </h2>
            <p style={{ marginBottom: "1rem" }}>If you are a resident of the EU, UK, or California (or another jurisdiction with similar laws), you have additional rights including the right to access, correct, port, and erase your personal data. The deletion path on this page satisfies your "right to erasure" (GDPR Article 17) and "right to delete" (CCPA §1798.105) requests. You may also contact <a href="mailto:kings@tryunfold.ai" style={{ color: s.sage, textDecoration: "underline" }}>kings@tryunfold.ai</a> to exercise these rights specifically.</p>
          </section>

          {/* Help */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>
              Need help?
            </h2>
            <p>Email <a href="mailto:kings@tryunfold.ai" style={{ color: s.sage, textDecoration: "underline" }}>kings@tryunfold.ai</a> with any questions about deleting your account or data. A real person reads every email, usually within one business day.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
