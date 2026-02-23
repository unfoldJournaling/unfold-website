import { Link } from "react-router-dom";

export default function Terms() {
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

        <h1 style={{ fontFamily: fontDisplay, fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 400, lineHeight: 1.2, marginBottom: "2rem" }}>Terms of Use</h1>

        <div style={{ fontSize: "1rem", lineHeight: 1.8, color: s.barkLight }}>
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>Acceptance of this Agreement</h2>
            <p>These Terms of Use ("Terms") form a binding contract between you ("you" or "Member") and Unfold Inc. ("Unfold," "we," "us," or "our"). By creating an Unfold account, installing or using the Unfold mobile or web application, pairing a wearable device, visiting our sites, or paying for any Unfold subscription, you confirm that you have read, understood, and agree to be bound by these Terms and by our Privacy Policy. If you do not agree, do not use the Service.</p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>The Service</h2>
            <p>Unfold provides software, content, and analytics that help you track journal entries, mood, and wellness metrics collected from supported wearables (the "Service"). The Service may change over time as we add, remove, or refine features, or as laws and technology evolve. Some beta or preview features may be offered for limited periods or only to specific groups.</p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>Eligibility & Registration</h2>
            <p style={{ marginBottom: "1rem" }}>You must be at least 13 years old (or the minimum legal age in your jurisdiction) and capable of forming a binding contract to open an account. If you create an account on behalf of a company or organization, you represent that you have authority to bind that entity to these Terms.</p>
            <p>When you register, you agree to provide accurate information, keep your password secure, and promptly update your details if they change. You are responsible for all activity that occurs under your credentials.</p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>Subscription, Fees, and Billing</h2>
            <p>Unfold is offered through recurring membership plans such as monthly or annual subscriptions. The price, billing cycle, and included features are presented during signup. By choosing a paid plan you authorize us, or our payment processor, to charge your chosen payment method at the start of each billing period until you cancel. Fees are non-refundable except where required by law. Your membership will automatically renew unless you cancel before the end of the current term. You can cancel at any time in your account settings; cancellation prevents future charges but does not retroactively refund past payments.</p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>Trials and Promotions</h2>
            <p>From time to time we may offer free or discounted trials. If a trial converts to a paid subscription, the first charge will occur on the day the trial ends unless you cancel beforehand. We may modify or withdraw a trial at any time.</p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>License to Use the Service</h2>
            <p>Subject to these Terms and an active subscription, Unfold grants you a personal, non-exclusive, non-transferable, revocable license to install and use our application and related content for your own non-commercial wellness purposes. You may not copy, distribute, sell, reverse engineer, modify, or create derivative works from any part of the Service except as allowed by law. All trademarks, logos, and content on the Service remain the property of Unfold or its licensors.</p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>Acceptable Use</h2>
            <p style={{ marginBottom: "0.75rem" }}>You agree not to:</p>
            <ul style={{ marginLeft: "1.5rem", marginBottom: "1rem" }}>
              <li>Upload or share content that is unlawful, harassing, defamatory, obscene, or infringes any third-party rights.</li>
              <li>Access the Service by automated means, scrape data, or disrupt our servers.</li>
              <li>Reverse-engineer or attempt to discover source code except where such restriction is prohibited by law.</li>
              <li>Use Unfold for commercial purposes without our prior written permission.</li>
              <li>Violate any applicable laws or regulations.</li>
            </ul>
            <p>We reserve the right to suspend or terminate accounts that violate these rules.</p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>User Content</h2>
            <p>"User Content" means journal text, voice recordings, images, survey responses, comments, and any other material you submit. You retain ownership of your User Content. By submitting it you grant Unfold a worldwide, royalty-free license to host, process, back up, and display the content as necessary to operate and improve the Service. You can delete individual entries at any time; deleting your account removes remaining personal data from active systems within 30 days and backups within 90 days. If you choose to share certain entries with another user, therapist, or coach, you acknowledge that Unfold is not responsible for any further use or disclosure by those recipients.</p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>No Medical or Mental-Health Advice</h2>
            <p>Unfold provides wellness insights and prompts for informational purposes only. The Service is not a medical device and is not intended to diagnose, cure, mitigate, treat, or prevent any disease or mental health condition. Metrics such as heart rate variability or sleep stages may sometimes be inaccurate or incomplete due to sensor limitations. Always consult a qualified healthcare professional before making decisions about your health, therapy, exercise, or medication. In an emergency, call your local emergency services; do not rely on Unfold.</p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>Artificial-Intelligence Features</h2>
            <p>Some insights and prompts are generated by artificial intelligence systems, which can occasionally produce errors, omissions, or biased output. Use your own judgment and do not rely solely on AI-generated suggestions.</p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>Third-Party Services and Devices</h2>
            <p>The Service integrates with third-party wearables and apps. Unfold is not responsible for the accuracy, availability, or security of third-party products, and your use of them is governed by their own terms. Loss of connectivity or vendor changes may affect certain features.</p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>Changes to the Service or Terms</h2>
            <p>We may modify these Terms or the Service to reflect new features, legal requirements, or business changes. If we make material changes we will notify you in-app or by email at least 30 days in advance. Continuing to use the Service after the effective date means you accept the revised Terms. If you do not agree, you may cancel for a prorated refund of any prepaid, unused subscription period.</p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>Termination</h2>
            <p>You may stop using Unfold at any time. We may suspend or terminate your access (with or without notice) if you violate these Terms or if required by law. Sections that by their nature should survive (including intellectual property provisions, disclaimers, limitation of liability, arbitration, and indemnification) will remain in effect.</p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>Disclaimer of Warranties</h2>
            <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE." TO THE MAXIMUM EXTENT PERMITTED BY LAW, UNFOLD DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, ACCURACY, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.</p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>Limitation of Liability</h2>
            <p style={{ marginBottom: "1rem" }}>TO THE FULLEST EXTENT PERMITTED BY LAW, UNFOLD, ITS OFFICERS, DIRECTORS, EMPLOYEES, AFFILIATES, AND LICENSORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF DATA, PROFITS, GOODWILL, OR OTHER INTANGIBLE LOSSES ARISING OUT OF OR RELATING TO THE SERVICE OR THESE TERMS, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID UNFOLD IN THE 12 MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM.</p>
            <p>Some jurisdictions do not allow the exclusion or limitation of certain damages; in such cases our liability shall be limited to the maximum extent permitted by law.</p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>Indemnification</h2>
            <p>You agree to defend, indemnify, and hold harmless Unfold and its affiliates from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from or related to: (a) your use of the Service; (b) your User Content; (c) your violation of these Terms; or (d) your violation of any rights of a third party.</p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>Governing Law & Dispute Resolution</h2>
            <p>These Terms are governed by the laws of the State of California, without regard to its conflict of law principles, and by applicable federal laws of the United States. Any dispute arising out of or relating to these Terms or the Service will be resolved by binding arbitration administered by the American Arbitration Association under its Consumer Arbitration Rules. Arbitration will take place in San Francisco, California, unless the parties agree otherwise. You and Unfold waive any right to a jury trial or to participate in a class action.</p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>Miscellaneous</h2>
            <p>If any provision of these Terms is held unenforceable, that provision will be limited or removed to the minimum extent necessary, and the remainder will remain in full force. Unfold's failure to enforce any right or provision is not a waiver. You may not transfer your rights or obligations under these Terms without our consent. We may assign our rights and obligations at any time.</p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark }}>Contact</h2>
            <p>Questions about these Terms? E-mail <a href="mailto:kings@tryunfold.ai" style={{ color: s.sage, textDecoration: "underline" }}>kings@tryunfold.ai</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
