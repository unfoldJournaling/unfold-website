import { Link } from "react-router-dom";

export default function Privacy() {
  const s = {
    sage: "#382CBE",
    sageDeep: "#382CBE",
    sageLight: "#B5B8EE",
    cream: "#FFFFFF",
    warmWhite: "#FBFBFB",
    bark: "#000000",
    barkLight: "#666666",
  };

  const fontDisplay = "var(--font-body)";
  const fontBody = "var(--font-body)";

  const secS = { marginBottom: "2.5rem" };
  const h2S = { fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 500, marginBottom: "1rem", color: s.bark };
  const h3S = { fontFamily: fontDisplay, fontSize: "1.25rem", fontWeight: 500, marginTop: "1.5rem", marginBottom: "0.75rem", color: s.bark };
  const h4S = { fontFamily: fontDisplay, fontSize: "1.1rem", fontWeight: 600, marginTop: "1.25rem", marginBottom: "0.5rem", color: s.bark };
  const pS = { marginBottom: "1rem" };
  const ulS = { marginLeft: "1.5rem", marginBottom: "1rem" };
  const calloutS = { marginBottom: "1rem", fontWeight: 600, color: s.bark };
  const linkS = { color: s.sage, textDecoration: "underline" };

  return (
    <div style={{ fontFamily: fontBody, background: s.cream, color: s.bark, minHeight: "100vh", padding: "4rem 2rem" }}>

      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Link to="/" style={{ display: "inline-block", color: s.barkLight, textDecoration: "none", fontSize: "0.95rem", marginBottom: "3rem", transition: "color 0.3s" }}
          onMouseEnter={e => e.target.style.color = s.bark}
          onMouseLeave={e => e.target.style.color = s.barkLight}>
          ← Back to Home
        </Link>

        <h1 style={{ fontFamily: fontDisplay, fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 400, lineHeight: 1.2, marginBottom: "0.5rem" }}>Privacy Policy and Consumer Health Data Privacy Notice</h1>

        <div style={{ fontSize: "1rem", lineHeight: 1.8, color: s.barkLight }}>
          <p style={{ marginBottom: "2rem", color: s.bark }}>
            <strong>Effective date:</strong> July 13, 2026<br />
            <strong>Last updated:</strong> July 13, 2026
          </p>

          <nav className="privacy-toc" aria-label="Privacy policy contents">
              <h2>Find what you need</h2>
              <ol>
              <li>
              <a href="#privacy-section-1">Our privacy commitments</a>
              </li>
              <li>
              <a href="#privacy-section-2">Information we collect</a>
              </li>
              <li>
              <a href="#privacy-section-3">Where information comes from</a>
              </li>
              <li>
              <a href="#privacy-section-4">How we use information</a>
              </li>
              <li>
              <a href="#privacy-section-5">Artificial intelligence and voice features</a>
              </li>
              <li>
              <a href="#privacy-section-6">How we disclose information</a>
              </li>
              <li>
              <a href="#privacy-section-7">What we do not do</a>
              </li>
              <li>
              <a href="#privacy-section-8">How long we retain information</a>
              </li>
              <li>
              <a href="#privacy-section-9">Consumer Health Data Privacy Notice</a>
              </li>
              <li>
              <a href="#privacy-section-10">Your privacy rights and choices</a>
              </li>
              <li>
              <a href="#privacy-section-11">Information security</a>
              </li>
              <li>
              <a href="#privacy-section-12">International data transfers</a>
              </li>
              <li>
              <a href="#privacy-section-13">Children</a>
              </li>
              <li>
              <a href="#privacy-section-14">Website cookies and similar technologies</a>
              </li>
              <li>
              <a href="#privacy-section-15">Third-party links and services</a>
              </li>
              <li>
              <a href="#privacy-section-16">Changes to this policy</a>
              </li>
              <li>
              <a href="#privacy-section-17">Contact us</a>
              </li>
              </ol>
              </nav>
          <section style={secS}>
            <p style={pS}>Unfold Labs, Inc., a Delaware corporation ("Unfold," "we," "us," or "our"), provides the Unfold mobile application, the website located at tryunfold.ai, and related features and services together referred to as the "Services."</p>
            <p style={pS}>Unfold combines journaling, artificial intelligence, and information from wearable devices to help people better understand patterns in their mental and physical well-being.</p>
            <p style={pS}>This Privacy Policy explains:</p>
            <ul style={ulS}>
              <li>The information we collect</li>
              <li>How we use it</li>
              <li>When and why we disclose it</li>
              <li>How our artificial intelligence features work</li>
              <li>How we handle consumer health data</li>
              <li>The rights and choices available to you</li>
            </ul>
            <p>This Privacy Policy also serves as Unfold's Consumer Health Data Privacy Notice for residents of Washington and Nevada.</p>
          </section>

          <section style={secS}>
            <h2 id="privacy-section-1" style={h2S}>1. Our privacy commitments</h2>
            <p style={pS}>Journal entries, voice recordings, emotional reflections, and health information can be deeply personal. We design Unfold around the following commitments:</p>
            <ul style={ulS}>
              <li>We do not sell your personal information.</li>
              <li>We do not sell your consumer health data.</li>
              <li>We do not use your journal content or health information for advertising.</li>
              <li>We do not share your journal content or health information with data brokers.</li>
              <li>We do not permit OpenAI or Hume AI to use information submitted by Unfold to train their models.</li>
              <li>We ask for permission before sending applicable journal, voice, or health information to our artificial intelligence providers.</li>
              <li>You may withdraw that permission and delete your information.</li>
              <li>We do not attempt to re-identify information that we have de-identified.</li>
            </ul>
            <p>Unfold is a wellness product. It is not a substitute for a doctor, therapist, emergency service, diagnosis, or medical treatment.</p>
          </section>

          <section style={secS}>
            <h2 id="privacy-section-2" style={h2S}>2. Information we collect</h2>
            <p style={pS}>The information we collect depends on which Unfold features you use and which permissions you grant.</p>

            <h3 style={h3S}>2.1 Account and profile information</h3>
            <p style={pS}>When you create or manage an account, we may collect:</p>
            <ul style={ulS}>
              <li>Your email address</li>
              <li>Your name or display name, if provided</li>
              <li>Authentication credentials, tokens, or account identifiers</li>
              <li>Profile preferences</li>
              <li>Notification and communication preferences</li>
              <li>Your account creation and last-access dates</li>
            </ul>
            <p>Authentication may be managed through Google Firebase or another authentication provider. Unfold does not ordinarily have access to your unencrypted password.</p>

            <h3 style={h3S}>2.2 Journal and conversational content</h3>
            <p style={pS}>We collect content you choose to create, submit, or save through the Services, including:</p>
            <ul style={ulS}>
              <li>Written journal entries</li>
              <li>Responses to journaling prompts</li>
              <li>Messages sent to Luma, Unfold's AI journaling and wellness assistant</li>
              <li>Mood entries and emotional check-ins</li>
              <li>Goals, priorities, reflections, and self-reported wellness information</li>
              <li>Voice recordings and their transcripts</li>
              <li>Feedback you provide about AI responses or other features</li>
            </ul>
            <p style={pS}>This content may reveal information about your physical health, mental health, emotions, relationships, beliefs, habits, work, or personal experiences.</p>
            <p>We treat journal and conversational content as sensitive information.</p>

            <h3 style={h3S}>2.3 Health and wellness information</h3>
            <p style={pS}>With your permission, Unfold may connect to:</p>
            <ul style={ulS}>
              <li>Apple Health through HealthKit</li>
              <li>Health Connect on supported Android devices</li>
              <li>Other wearable or health-data services that we identify before requesting access</li>
            </ul>
            <p style={pS}>Depending on the feature, your device, and the permissions you grant, Unfold may import information such as:</p>
            <ul style={ulS}>
              <li>Heart rate</li>
              <li>Resting heart rate</li>
              <li>Heart rate variability</li>
              <li>Sleep duration, timing, and stages</li>
              <li>Steps and movement</li>
              <li>Exercise and physical activity</li>
              <li>Respiratory rate</li>
              <li>Blood oxygen measurements</li>
              <li>Age-related information</li>
              <li>Other health or fitness measurements that you expressly authorize</li>
            </ul>
            <p style={pS}>Unfold only requests access to health-data categories needed for features offered through the Services.</p>
            <p>You may review or revoke these permissions through Apple Health, Health Connect, or your device settings. HealthKit information may not be used for advertising, and Health Connect allows users to manage access on a per-app basis.</p>

            <h3 style={h3S}>2.4 Information derived from your activity</h3>
            <p style={pS}>We may use information you provide and information imported with your permission to generate wellness-related measurements and observations, including:</p>
            <ul style={ulS}>
              <li>Stress scores</li>
              <li>Recovery scores</li>
              <li>Sleep scores</li>
              <li>Mood scores</li>
              <li>Trends and changes over time</li>
              <li>Journaling summaries</li>
              <li>Personalized reflections</li>
              <li>Associations between your habits, journal content, and wellness measurements</li>
            </ul>
            <p>These results are estimates intended for personal wellness and self-reflection. They are not medical diagnoses.</p>

            <h3 style={h3S}>2.5 Voice information</h3>
            <p style={pS}>When you use a voice feature, we may collect and process:</p>
            <ul style={ulS}>
              <li>The audio you submit</li>
              <li>A transcript of the audio</li>
              <li>Technical information needed to transmit and process the recording</li>
            </ul>
            <p style={pS}>The transcript may be stored as part of your journal or conversation history.</p>
            <p>Voice recordings may be transmitted to Hume AI as described in Section 5.</p>

            <h3 style={h3S}>2.6 Subscription and purchase information</h3>
            <p style={pS}>When you purchase a subscription through the Apple App Store or Google Play, the applicable store processes your payment.</p>
            <p style={pS}>Unfold and RevenueCat may receive information such as:</p>
            <ul style={ulS}>
              <li>Subscription status</li>
              <li>Product or plan purchased</li>
              <li>Purchase and renewal dates</li>
              <li>Expiration or cancellation status</li>
              <li>Trial eligibility and status</li>
              <li>Store transaction or receipt identifiers</li>
              <li>Country, currency, and storefront</li>
              <li>Refund information</li>
              <li>An app-specific user identifier</li>
            </ul>
            <p>We do not receive your full payment-card number from Apple, Google, or RevenueCat.</p>

            <h3 style={h3S}>2.7 Device, technical, and usage information</h3>
            <p style={pS}>When you use the Services, we may automatically collect:</p>
            <ul style={ulS}>
              <li>Device type and model</li>
              <li>Operating-system and app version</li>
              <li>Browser type</li>
              <li>Internet Protocol address</li>
              <li>Approximate location inferred from your IP address</li>
              <li>Language and time-zone settings</li>
              <li>Device or app identifiers</li>
              <li>Screens viewed and features used</li>
              <li>Session times and interaction events</li>
              <li>Crash reports, diagnostic information, and performance logs</li>
              <li>Security, authentication, and fraud-prevention events</li>
            </ul>
            <p>We use this information to operate, secure, troubleshoot, and improve the Services. We do not use health information or journal content to target advertisements.</p>

            <h3 style={h3S}>2.8 Communications and support</h3>
            <p style={pS}>When you contact us, participate in a survey, report a problem, or request support, we may collect:</p>
            <ul style={ulS}>
              <li>Your contact information</li>
              <li>The contents of your communication</li>
              <li>Screenshots, attachments, or diagnostic details you provide</li>
              <li>Records of how we handled your request</li>
            </ul>
            <p>Please avoid including sensitive information that is not necessary for us to address your request.</p>

            <h3 style={h3S}>2.9 Website information</h3>
            <p style={pS}>When you visit tryunfold.ai, we may collect:</p>
            <ul style={ulS}>
              <li>IP address</li>
              <li>Browser and device information</li>
              <li>Pages viewed</li>
              <li>Referral source</li>
              <li>Website interactions</li>
              <li>Cookie and analytics information</li>
              <li>Information submitted through forms, quizzes, waitlists, or newsletter signups</li>
            </ul>
            <p style={pS}>If you provide your email address to receive quiz results or another requested resource, we use it to provide that resource.</p>
            <p>We send promotional emails only where permitted by law and where you have opted in or otherwise agreed to receive them. You may unsubscribe through the link in any promotional email.</p>
          </section>

          <section style={secS}>
            <h2 id="privacy-section-3" style={h2S}>3. Where information comes from</h2>
            <p style={pS}>We obtain information from the following categories of sources:</p>
            <ul style={ulS}>
              <li>Directly from you</li>
              <li>From your device</li>
              <li>From Apple Health or Health Connect, with your permission</li>
              <li>From wearable devices or services you connect</li>
              <li>From your interactions with Unfold</li>
              <li>From Apple, Google, and RevenueCat in connection with subscriptions</li>
              <li>From authentication, infrastructure, security, and analytics providers</li>
              <li>From customer-service communications</li>
              <li>From publicly available information when you intentionally provide a public link, such as a link included in a journal entry</li>
            </ul>
            <p>We do not purchase sensitive journal or health information about you from data brokers.</p>
          </section>

          <section style={secS}>
            <h2 id="privacy-section-4" style={h2S}>4. How we use information</h2>
            <p style={pS}>We use personal information for the following purposes.</p>

            <h3 style={h3S}>4.1 Providing the Services</h3>
            <p style={pS}>We use information to:</p>
            <ul style={ulS}>
              <li>Create and maintain your account</li>
              <li>Store and display journal entries</li>
              <li>Provide journaling prompts and reflections</li>
              <li>Import authorized health information</li>
              <li>Calculate stress, recovery, sleep, mood, and other wellness measurements</li>
              <li>Provide voice transcription</li>
              <li>Deliver AI-guided journaling and personalized insights</li>
              <li>Maintain continuity across your conversations with Luma</li>
              <li>Manage subscriptions and paid access</li>
              <li>Synchronize information across supported devices</li>
            </ul>

            <h3 style={h3S}>4.2 Personalization</h3>
            <p style={pS}>With your permission, we may use journal content, health information, wellness scores, and relevant prior interactions to personalize:</p>
            <ul style={ulS}>
              <li>Journaling prompts</li>
              <li>AI responses</li>
              <li>Wellness observations</li>
              <li>Trends and summaries</li>
              <li>Recommendations about reflective or wellness-related activities</li>
            </ul>
            <p>You may turn off applicable AI personalization as described in Section 5.</p>

            <h3 style={h3S}>4.3 Communications and support</h3>
            <p style={pS}>We use information to:</p>
            <ul style={ulS}>
              <li>Respond to questions and requests</li>
              <li>Provide customer support</li>
              <li>Send security and account notices</li>
              <li>Send subscription and service communications</li>
              <li>Inform you about material changes</li>
              <li>Send promotional communications where permitted</li>
            </ul>

            <h3 style={h3S}>4.4 Safety, security, and legal compliance</h3>
            <p style={pS}>We use information as reasonably necessary to:</p>
            <ul style={ulS}>
              <li>Secure accounts and systems</li>
              <li>Detect fraud, abuse, unauthorized access, and malicious activity</li>
              <li>Investigate technical or security incidents</li>
              <li>Enforce our agreements</li>
              <li>Protect Unfold, our users, and others</li>
              <li>Comply with applicable legal obligations</li>
            </ul>

            <h3 style={h3S}>4.5 Improving Unfold</h3>
            <p style={pS}>We may use usage information, diagnostics, feedback, and aggregated or de-identified information to:</p>
            <ul style={ulS}>
              <li>Correct errors</li>
              <li>Improve performance and reliability</li>
              <li>Evaluate feature usefulness</li>
              <li>Develop new features</li>
              <li>Conduct internal analytics</li>
              <li>Understand general usage patterns</li>
            </ul>
            <p>We do not use identifiable journal content or health information to train publicly available or general-purpose artificial intelligence models.</p>

            <h3 style={h3S}>4.6 Legal bases for users in the EEA, United Kingdom, and Switzerland</h3>
            <p style={pS}>Where applicable, we rely on one or more of the following legal bases:</p>
            <ul style={ulS}>
              <li><strong>Consent:</strong> For importing health information, processing special-category information, sending applicable information to AI providers, and certain marketing activities</li>
              <li><strong>Performance of a contract:</strong> To create your account and provide features you request</li>
              <li><strong>Legitimate interests:</strong> To secure, maintain, troubleshoot, and improve the Services, where those interests are not overridden by your rights</li>
              <li><strong>Legal obligations:</strong> To comply with applicable laws, legal requests, accounting requirements, and regulatory obligations</li>
              <li><strong>Protection of vital interests:</strong> In limited circumstances involving an immediate threat to an individual's safety</li>
            </ul>
            <p>You may withdraw consent at any time. Withdrawal does not affect processing that lawfully occurred before consent was withdrawn.</p>
          </section>

          <section style={secS}>
            <h2 id="privacy-section-5" style={h2S}>5. Artificial intelligence and voice features</h2>

            <h3 style={h3S}>5.1 Luma</h3>
            <p style={pS}>Luma is Unfold's AI journaling and wellness assistant. You can interact with Luma in writing or through spoken voice conversations.</p>
            <p style={pS}>Luma may use information you provide to:</p>
            <ul style={ulS}>
              <li>Respond to journal entries</li>
              <li>Ask reflective questions</li>
              <li>Summarize patterns</li>
              <li>Generate personalized wellness insights</li>
              <li>Maintain relevant conversational context</li>
              <li>Help you reflect on your goals, emotions, sleep, activity, or stress</li>
            </ul>
            <p>Luma does not independently access all information in your account. Unfold determines which information is relevant and permitted to be sent for a requested feature.</p>

            <h3 style={h3S}>5.2 OpenAI</h3>
            <p style={pS}>Unfold uses services provided by OpenAI, L.L.C. to support AI-guided journaling, responses, summaries, and personalized insights.</p>
            <p style={pS}>Depending on the feature you use and the permission you provide, Unfold may send OpenAI:</p>
            <ul style={ulS}>
              <li>Journal entries</li>
              <li>Messages and prompts submitted to Luma</li>
              <li>Voice transcripts</li>
              <li>Relevant prior conversation or journal context</li>
              <li>Mood or self-reported wellness information</li>
              <li>Summaries of wellness measurements, such as stress scores, sleep, resting heart rate, or heart rate variability</li>
              <li>Instructions needed to generate the response you requested</li>
            </ul>
            <p style={pS}>We configure requests so that they do not intentionally include your name, email address, or direct Unfold account identifier. However, text you write or speak may itself contain identifying or sensitive information.</p>
            <p>OpenAI states that business API data is not used to train its models by default. OpenAI may retain API inputs and outputs for up to 30 days for abuse monitoring and security unless a different retention control, product configuration, endpoint rule, or legal obligation applies.</p>

            <h3 style={h3S}>5.3 Hume AI</h3>
            <p style={pS}>Unfold uses Hume AI, Inc. to process audio for voice transcription and for real-time voice conversations with Luma.</p>
            <p style={pS}>When you use a voice feature, Unfold may send Hume AI:</p>
            <ul style={ulS}>
              <li>Audio you choose to submit, including your side of a voice conversation</li>
              <li>Technical data necessary to establish and maintain the voice session</li>
              <li>Session instructions necessary to return a transcript or generate Luma's spoken responses</li>
            </ul>
            <p style={pS}>Hume AI's Empathic Voice Interface (EVI) generates Luma's spoken responses during voice conversations. As part of how EVI works, it analyzes vocal characteristics of your speech — such as tone, rhythm, and other expressive qualities — to understand you and respond naturally. These vocal characteristics may relate to your emotional state, and we treat them as sensitive information under this policy.</p>
            <p style={pS}>We configure these requests so they do not intentionally include your name, email address, or direct Unfold account identifier. Spoken content may nevertheless include personal information you choose to say.</p>
            <p style={pS}>For the Hume EVI service used by Unfold, we have enabled:</p>
            <ul style={ulS}>
              <li>Zero data retention</li>
              <li>Opt-out of data training</li>
            </ul>
            <p>Under those settings, Hume AI does not retain EVI chat histories, voice recordings, or transcripts and does not use future EVI interactions to train its models. Hume AI may retain limited operational metadata, such as API usage information.</p>

            <h3 style={h3S}>5.4 Your permission and control</h3>
            <p style={pS}>Before Unfold sends applicable journal content, voice information, or health information to OpenAI or Hume AI, we request permission in the app.</p>
            <p style={pS}>If you decline, features that require the applicable processing may be unavailable. You may still use core features that do not require AI or voice processing.</p>
            <p style={pS}>You may withdraw permission through:</p>
            <p style={calloutS}>Settings → Luma & Your Data → Turn Off Luma Personalization</p>
            <p style={pS}>Withdrawing permission stops future information from being sent for the disabled features. It does not reverse processing that occurred before you withdrew permission.</p>
            <p>Disconnecting Apple Health or Health Connect separately stops future health-data imports but does not automatically delete information that Unfold previously imported. You may delete previously imported information by deleting your account or submitting a deletion request.</p>

            <h3 style={h3S}>5.5 AI-generated information</h3>
            <p>AI-generated responses may be inaccurate, incomplete, or inappropriate for your circumstances. Unfold does not use AI responses to make decisions about your eligibility for employment, housing, insurance, credit, education, or other services that produce legal or similarly significant effects.</p>
          </section>

          <section style={secS}>
            <h2 id="privacy-section-6" style={h2S}>6. How we disclose information</h2>
            <p style={pS}>We disclose information only as described below.</p>

            <h3 style={h3S}>6.1 Service providers</h3>
            <p style={pS}>We use service providers to operate the Services. They may process information only as needed to perform services for Unfold and are subject to contractual confidentiality, privacy, and security obligations designed to protect the information and limit processing to our instructions and applicable law.</p>
            <p style={pS}>Our principal providers include:</p>

            <h4 style={h4S}>Google Firebase and Google Cloud</h4>
            <p style={pS}>We use Google services for functions that may include:</p>
            <ul style={ulS}>
              <li>Authentication</li>
              <li>Cloud database and storage</li>
              <li>Hosting and infrastructure</li>
              <li>App-performance monitoring</li>
              <li>Crash reporting</li>
              <li>Security and diagnostics</li>
            </ul>
            <p>Depending on the service, Google may process account information, stored app information, device identifiers, usage events, logs, and diagnostic information.</p>

            <h4 style={h4S}>Amazon Web Services (AWS)</h4>
            <p>We use AWS for cloud hosting and computing infrastructure for our backend services. Depending on the feature, AWS infrastructure may process journal content, voice transcripts, wellness measurements, account information, and related technical data as part of operating the Services, including preparing and transmitting requests to the AI providers described in Section 5.</p>

            <h4 style={h4S}>OpenAI</h4>
            <p>OpenAI processes journal, conversational, transcript, and relevant wellness information for AI features, as described in Section 5.</p>

            <h4 style={h4S}>Hume AI</h4>
            <p>Hume AI processes voice information for transcription and real-time voice conversations, as described in Section 5.</p>

            <h4 style={h4S}>RevenueCat</h4>
            <p style={pS}>RevenueCat helps Unfold:</p>
            <ul style={ulS}>
              <li>Validate purchase receipts</li>
              <li>Determine subscription status</li>
              <li>Manage trials, renewals, cancellations, and entitlements</li>
              <li>Make paid features available to eligible users</li>
              <li>Synchronize subscription information across supported platforms</li>
            </ul>
            <p>Apple or Google processes the underlying App Store or Google Play payment. RevenueCat validates receipts and provides continuously updated subscription status.</p>

            <h4 style={h4S}>Other operational providers</h4>
            <p style={pS}>We may use additional providers for:</p>
            <ul style={ulS}>
              <li>Cloud infrastructure</li>
              <li>Email delivery</li>
              <li>Push notifications</li>
              <li>Customer support</li>
              <li>Security monitoring</li>
              <li>Error and crash reporting</li>
              <li>Internal communications</li>
              <li>Product analytics</li>
              <li>Legal, accounting, and professional services</li>
            </ul>
            <p style={pS}>These providers receive only the information reasonably necessary to perform their functions.</p>
            <p>We may update our service providers as the Services evolve. Any new use of health information or journal content will be handled consistently with this policy and applicable consent requirements. If we change the artificial intelligence providers that process journal, voice, or health information, we will update this policy and request any consent required by law before the new provider receives your information.</p>

            <h3 style={h3S}>6.2 Apple and Google</h3>
            <p style={pS}>Apple and Google may process information connected with:</p>
            <ul style={ulS}>
              <li>App downloads</li>
              <li>Operating-system permissions</li>
              <li>App Store or Google Play subscriptions</li>
              <li>Payment processing</li>
              <li>Device health-data permissions</li>
              <li>Store analytics and diagnostics</li>
            </ul>
            <p>Their handling of information is governed by their own privacy policies and platform terms.</p>

            <h3 style={h3S}>6.3 Research</h3>
            <p style={pS}>We may use aggregated or de-identified information for scientific or product research.</p>
            <p style={pS}>We do not provide identifiable journal content or consumer health data to independent researchers without obtaining any consent required by law.</p>
            <p>Where we disclose de-identified information, we require recipients not to attempt to re-identify it.</p>

            <h3 style={h3S}>6.4 Legal and safety disclosures</h3>
            <p style={pS}>We may disclose information where we reasonably believe disclosure is necessary to:</p>
            <ul style={ulS}>
              <li>Comply with a law, regulation, subpoena, court order, or valid legal process</li>
              <li>Protect the rights, property, or safety of Unfold, our users, or another person</li>
              <li>Detect, prevent, or investigate fraud, abuse, or security incidents</li>
              <li>Establish, exercise, or defend legal claims</li>
              <li>Enforce our terms and policies</li>
            </ul>
            <p>We seek to disclose only the information reasonably necessary under the circumstances.</p>

            <h3 style={h3S}>6.5 Business transactions</h3>
            <p style={pS}>If Unfold is involved in a merger, acquisition, financing, restructuring, bankruptcy, or sale of some or all of its assets, personal information may be reviewed or transferred as part of that transaction.</p>
            <p>Any recipient will be required to handle the information in accordance with applicable law. We will provide notice before personal information becomes subject to a materially different privacy policy and request additional consent where required.</p>
          </section>

          <section style={secS}>
            <h2 id="privacy-section-7" style={h2S}>7. What we do not do</h2>
            <p style={pS}>Unfold does not:</p>
            <ul style={ulS}>
              <li>Sell personal information</li>
              <li>Sell consumer health data</li>
              <li>Share personal information for cross-context behavioral advertising</li>
              <li>Use journal content or health information for third-party advertising</li>
              <li>Provide journal content or health information to data brokers</li>
              <li>Use HealthKit or Health Connect information for advertising</li>
              <li>Use health information for unrelated marketing or commercial data mining</li>
              <li>Use journal content or health information to determine credit, insurance, employment, housing, or educational eligibility</li>
              <li>Permit OpenAI or Hume AI to use information submitted by Unfold to train their models</li>
              <li>Attempt to re-identify properly de-identified information</li>
            </ul>
            <p>We do not display third-party behavioral advertisements in the Unfold mobile application.</p>
          </section>

          <section style={secS}>
            <h2 id="privacy-section-8" style={h2S}>8. How long we retain information</h2>
            <p style={pS}>We retain personal information only for as long as reasonably necessary to provide the Services, fulfill the purposes described in this policy, comply with legal obligations, resolve disputes, enforce agreements, and protect the integrity and security of Unfold.</p>

            <h3 style={h3S}>8.1 Journal and health information</h3>
            <p style={pS}>We generally retain journal content, imported health information, wellness measurements, and AI conversation history until:</p>
            <ul style={ulS}>
              <li>You delete the applicable entry or information</li>
              <li>You delete your account</li>
              <li>You submit a valid deletion request</li>
              <li>The information is no longer needed for the feature for which it was collected</li>
            </ul>
            <p>Deleting information from Unfold does not delete the original information from Apple Health, Health Connect, or another connected service.</p>

            <h3 style={h3S}>8.2 Account deletion</h3>
            <p style={pS}>When you request account deletion, we begin deleting your personal information from active production systems promptly after verifying the request.</p>
            <p style={pS}>Copies may remain temporarily in encrypted backups until they are deleted or overwritten according to our backup-retention schedule. While information remains in backups:</p>
            <ul style={ulS}>
              <li>It is isolated from ordinary business use</li>
              <li>It is not restored except where needed for disaster recovery, security, or legal compliance</li>
              <li>If restored, applicable deletion requests will be reapplied where technically feasible</li>
            </ul>
            <p style={pS}>We also instruct applicable service providers to delete information associated with the request, subject to legal obligations, technical limitations, and the providers' applicable retention practices.</p>
            <p>For consumer health data covered by Washington law, deletion from archived or backup systems will be completed no later than six months after we authenticate the deletion request.</p>

            <h3 style={h3S}>8.3 AI-provider retention</h3>
            <p style={pS}>OpenAI may retain API inputs and outputs for up to 30 days for abuse prevention and service security unless a different retention configuration, endpoint rule, or legal requirement applies.</p>
            <p>Hume AI's zero-data-retention setting is enabled for the EVI service used by Unfold. Hume AI therefore does not retain EVI voice recordings, transcripts, or chat histories. Limited operational metadata may be retained.</p>

            <h3 style={h3S}>8.4 Account, subscription, and legal records</h3>
            <p style={pS}>We may retain limited records after account deletion when reasonably necessary for:</p>
            <ul style={ulS}>
              <li>Subscription and transaction reconciliation</li>
              <li>Fraud prevention</li>
              <li>Tax, accounting, or legal obligations</li>
              <li>Security investigations</li>
              <li>Establishing or defending legal claims</li>
              <li>Documenting privacy requests and consent history</li>
            </ul>
            <p>These records are not used to recreate your deleted journal or health profile.</p>

            <h3 style={h3S}>8.5 De-identified information</h3>
            <p>We may retain aggregated or de-identified information that no longer reasonably identifies you. We will not attempt to re-identify it.</p>
          </section>

          <section style={secS}>
            <h2 id="privacy-section-9" style={h2S}>9. Consumer Health Data Privacy Notice</h2>
            <p style={pS}>This section applies to consumer health data governed by Washington's My Health My Data Act and Nevada's consumer-health-data law.</p>
            <p style={pS}>Washington law requires covered businesses to clearly disclose the categories, sources, purposes, and recipients of consumer health data and explain how consumers may exercise their rights.</p>

            <h3 style={h3S}>9.1 Categories of consumer health data we collect</h3>
            <p style={pS}>Depending on the features you use, consumer health data may include:</p>
            <ul style={ulS}>
              <li>Heart rate and resting heart rate</li>
              <li>Heart rate variability</li>
              <li>Sleep information</li>
              <li>Steps, exercise, and activity</li>
              <li>Respiratory rate</li>
              <li>Blood oxygen information</li>
              <li>Stress, recovery, sleep, and mood scores</li>
              <li>Emotional or mental-wellness reflections</li>
              <li>Journal content discussing physical or mental health</li>
              <li>Voice recordings or transcripts discussing health or emotions</li>
              <li>Vocal characteristics, such as tone and rhythm, processed during voice conversations</li>
              <li>Wellness goals, habits, and symptoms you report</li>
              <li>Inferences about your physical or mental wellness</li>
              <li>Information about your interaction with health and wellness features</li>
            </ul>

            <h3 style={h3S}>9.2 Sources of consumer health data</h3>
            <p style={pS}>We collect consumer health data from:</p>
            <ul style={ulS}>
              <li>You</li>
              <li>Your journal entries and conversations</li>
              <li>Your voice recordings</li>
              <li>Apple Health, with permission</li>
              <li>Health Connect, with permission</li>
              <li>Connected wearable devices or health services</li>
              <li>Measurements and scores derived by Unfold</li>
              <li>Your interactions with Unfold's wellness features</li>
            </ul>

            <h3 style={h3S}>9.3 Why we collect and use consumer health data</h3>
            <p style={pS}>We use consumer health data to:</p>
            <ul style={ulS}>
              <li>Provide features you request</li>
              <li>Import authorized wearable information</li>
              <li>Calculate wellness measurements</li>
              <li>Generate personalized insights</li>
              <li>Support journaling and reflection</li>
              <li>Show changes and trends over time</li>
              <li>Provide AI-assisted wellness features with permission</li>
              <li>Maintain, secure, and troubleshoot the Services</li>
              <li>Comply with applicable law</li>
              <li>Create aggregated or de-identified analytics</li>
            </ul>
            <p>We do not use consumer health data for advertising or unrelated marketing.</p>

            <h3 style={h3S}>9.4 Categories of consumer health data we disclose</h3>
            <p style={pS}>Depending on the feature you request, we may disclose:</p>
            <ul style={ulS}>
              <li>Voice recordings, vocal characteristics, and associated technical information to Hume AI</li>
              <li>Journal content, transcripts, wellness summaries, and relevant health measurements to OpenAI</li>
              <li>Stored health and journal information to Google Firebase or Google Cloud as our infrastructure provider</li>
              <li>Journal content, transcripts, and health information processed on Amazon Web Services as our backend infrastructure provider</li>
              <li>Limited technical and diagnostic information to security and performance providers</li>
              <li>Information required by law to government authorities or legal recipients</li>
            </ul>

            <h3 style={h3S}>9.5 Categories of recipients</h3>
            <p style={pS}>Consumer health data may be disclosed to:</p>
            <ul style={ulS}>
              <li>Cloud-hosting and database providers</li>
              <li>AI-processing providers</li>
              <li>Voice-processing providers</li>
              <li>Security and technical-support providers</li>
              <li>Professional advisors</li>
              <li>Government authorities or legal recipients where required</li>
              <li>Parties involved in an applicable business transaction</li>
            </ul>
            <p style={pS}>The principal service providers receiving consumer health data are Google Firebase or Google Cloud, Amazon Web Services, OpenAI, and Hume AI.</p>
            <p>Unfold does not currently disclose consumer health data to a corporate affiliate for the affiliate's independent use.</p>

            <h3 style={h3S}>9.6 Sale of consumer health data</h3>
            <p style={pS}>We do not sell consumer health data.</p>
            <p>If our practices change, we will update this notice and obtain any authorization or consent required by law before selling consumer health data.</p>

            <h3 style={h3S}>9.7 Consumer health-data rights</h3>
            <p style={pS}>Subject to applicable law, you may request to:</p>
            <ul style={ulS}>
              <li>Confirm whether we collect, share, or sell your consumer health data</li>
              <li>Access your consumer health data</li>
              <li>Receive a list of the third parties or affiliates with whom we shared it, where required</li>
              <li>Withdraw consent for collection or sharing</li>
              <li>Delete your consumer health data</li>
              <li>Appeal our refusal to act on a request</li>
            </ul>
            <p style={pS}>To submit a request, email <a href="mailto:kings@tryunfold.ai" style={linkS}>kings@tryunfold.ai</a> with the subject line:</p>
            <p style={calloutS}>Consumer Health Data Request</p>
            <p style={pS}>To appeal a decision, email <a href="mailto:kings@tryunfold.ai" style={linkS}>kings@tryunfold.ai</a> with the subject line:</p>
            <p style={calloutS}>Privacy Request Appeal</p>
            <p style={pS}>Describe the decision you are appealing and any additional information you would like us to consider. We will respond within the timeframe required by applicable law and provide information about additional complaint options where required.</p>
            <p style={pS}>We may need to verify your identity before acting on a request.</p>
            <p>Withdrawing consent stops future collection or disclosure covered by the withdrawal. It does not affect processing that lawfully occurred before withdrawal.</p>
          </section>

          <section style={secS}>
            <h2 id="privacy-section-10" style={h2S}>10. Your privacy rights and choices</h2>

            <h3 style={h3S}>10.1 Rights available to everyone</h3>
            <p style={pS}>Regardless of where you live, you may ask us to:</p>
            <ul style={ulS}>
              <li>Provide access to your personal information</li>
              <li>Correct inaccurate account information</li>
              <li>Export information associated with your account</li>
              <li>Delete specific journal content</li>
              <li>Delete your account</li>
              <li>Withdraw AI permission</li>
              <li>Stop marketing emails</li>
              <li>Disconnect Apple Health or Health Connect</li>
              <li>Ask a privacy-related question or submit a complaint</li>
            </ul>
            <p>Some rights may be limited where we must retain information for legal, security, fraud-prevention, or other lawful reasons.</p>

            <h3 style={h3S}>10.2 Account deletion</h3>
            <p style={pS}>You may delete your account through:</p>
            <p style={calloutS}>Settings → Manage Account → Delete Account</p>
            <p style={pS}>You may also request deletion by emailing <a href="mailto:kings@tryunfold.ai" style={linkS}>kings@tryunfold.ai</a>.</p>
            <p>We may ask you to verify that you control the account before processing the request.</p>

            <h3 style={h3S}>10.3 California residents</h3>
            <p style={pS}>Where California privacy law applies, California residents may have the right to:</p>
            <ul style={ulS}>
              <li>Know the categories and specific pieces of personal information collected</li>
              <li>Know the sources, purposes, and categories of recipients</li>
              <li>Request correction</li>
              <li>Request deletion</li>
              <li>Request data portability</li>
              <li>Opt out of the sale or sharing of personal information</li>
              <li>Limit certain uses or disclosures of sensitive personal information</li>
              <li>Be free from discrimination for exercising privacy rights</li>
            </ul>
            <p style={pS}>We do not sell personal information and do not share it for cross-context behavioral advertising.</p>
            <p style={pS}>Because we do not engage in those activities, Unfold does not currently provide a "Do Not Sell or Share My Personal Information" link.</p>
            <p>You may use an authorized agent where permitted by law. We may request proof of the agent's authority and verify your identity directly.</p>

            <h3 style={h3S}>10.4 EEA, United Kingdom, and Switzerland</h3>
            <p style={pS}>Where applicable, you may have the right to:</p>
            <ul style={ulS}>
              <li>Access your personal data</li>
              <li>Correct inaccurate personal data</li>
              <li>Delete personal data</li>
              <li>Restrict processing</li>
              <li>Object to certain processing</li>
              <li>Receive data in a portable format</li>
              <li>Withdraw consent</li>
              <li>Lodge a complaint with your local data-protection authority</li>
              <li>Request information about international-transfer safeguards</li>
            </ul>
            <p>Unfold Labs, Inc. is the data controller for personal data processed under this policy. Our contact details appear in Section 17.</p>

            <h3 style={h3S}>10.5 Marketing communications</h3>
            <p style={pS}>You may unsubscribe from promotional email by using the unsubscribe link in the message.</p>
            <p>We may continue sending non-promotional communications necessary to operate your account, such as security, billing, or material service notices.</p>

            <h3 style={h3S}>10.6 Non-discrimination</h3>
            <p>We will not unlawfully discriminate against you for exercising a privacy right.</p>
          </section>

          <section style={secS}>
            <h2 id="privacy-section-11" style={h2S}>11. Information security</h2>
            <p style={pS}>We use administrative, technical, and organizational safeguards designed to protect personal information.</p>
            <p style={pS}>These measures may include:</p>
            <ul style={ulS}>
              <li>Transport Layer Security for information transmitted between your device and our systems</li>
              <li>Encryption at rest through our infrastructure providers</li>
              <li>Access controls based on job responsibilities</li>
              <li>Multi-factor authentication for sensitive systems</li>
              <li>Logging and monitoring of administrative access</li>
              <li>Restricted access to production environments</li>
              <li>Secure development and code-review practices</li>
              <li>Dependency and vulnerability management</li>
              <li>Security incident-response procedures</li>
              <li>Periodic reviews of privacy and security practices</li>
              <li>Workforce confidentiality and security obligations</li>
            </ul>
            <p style={pS}>Employees and contractors do not have routine access to user journal or health information. Access may be granted where reasonably necessary to resolve a technical issue, respond to a support request, investigate a security incident, or comply with law.</p>
            <p style={pS}>No service can guarantee absolute security. You are responsible for protecting your account credentials and maintaining appropriate security on your devices.</p>
            <p>If you believe your account or information has been compromised, contact <a href="mailto:kings@tryunfold.ai" style={linkS}>kings@tryunfold.ai</a>.</p>
          </section>

          <section style={secS}>
            <h2 id="privacy-section-12" style={h2S}>12. International data transfers</h2>
            <p style={pS}>Unfold is operated from the United States. Personal information may be stored and processed in the United States and other countries where Unfold or its service providers operate.</p>
            <p style={pS}>These countries may have privacy laws different from those in your country.</p>
            <p style={pS}>Where required for transfers from the EEA, United Kingdom, or Switzerland, we use recognized safeguards, which may include:</p>
            <ul style={ulS}>
              <li>Standard Contractual Clauses</li>
              <li>Applicable United Kingdom transfer addenda</li>
              <li>Adequacy decisions</li>
              <li>Other legally recognized transfer mechanisms</li>
            </ul>
          </section>

          <section style={secS}>
            <h2 id="privacy-section-13" style={h2S}>13. Children</h2>
            <p style={pS}>Unfold is intended for users aged 13 and older. In jurisdictions where applicable law requires a higher minimum age to use the Services without parental or guardian consent, you must meet that higher age. Unfold does not currently provide a parental-consent process.</p>
            <p style={pS}>We do not knowingly collect personal information from a child below the applicable minimum age.</p>
            <p style={pS}>If you believe a child has provided information to Unfold in violation of this section, contact <a href="mailto:kings@tryunfold.ai" style={linkS}>kings@tryunfold.ai</a>. We will investigate and take appropriate steps, which may include deleting the account and associated information.</p>
            <p>Parents and guardians should understand that journal entries, voice features, health information, and AI conversations can contain sensitive information.</p>
          </section>

          <section style={secS}>
            <h2 id="privacy-section-14" style={h2S}>14. Website cookies and similar technologies</h2>
            <p style={pS}>The Unfold mobile application does not rely on browser cookies in the same way as a website. It may, however, use software-development kits and similar technologies for authentication, subscriptions, diagnostics, security, and product operation.</p>
            <p style={pS}>Our website may use:</p>
            <ul style={ulS}>
              <li>Essential technologies needed to operate the website</li>
              <li>Functional cookies that remember preferences</li>
              <li>Analytics technologies that help us understand website use</li>
              <li>Security technologies that prevent abuse</li>
            </ul>
            <p style={pS}>Where required, we will request consent before using nonessential cookies.</p>
            <p style={pS}>You may control cookies through your browser settings. Disabling certain cookies may affect website functionality.</p>
            <p>Unfold does not use journal content, health information, or consumer health data for behavioral advertising.</p>
          </section>

          <section style={secS}>
            <h2 id="privacy-section-15" style={h2S}>15. Third-party links and services</h2>
            <p style={pS}>The Services may contain links to websites or services that Unfold does not operate.</p>
            <p style={pS}>This Privacy Policy does not govern those third parties. Review their privacy policies before providing information to them.</p>
            <p>Connecting Apple Health, Health Connect, the App Store, Google Play, or another third-party service is also subject to that provider's terms and privacy practices.</p>
          </section>

          <section style={secS}>
            <h2 id="privacy-section-16" style={h2S}>16. Changes to this policy</h2>
            <p style={pS}>We may update this Privacy Policy as our Services, technology, providers, and legal obligations evolve.</p>
            <p style={pS}>The effective date at the top indicates when the current version took effect.</p>
            <p style={pS}>If we make a material change, we will provide notice through an appropriate method, such as:</p>
            <ul style={ulS}>
              <li>An in-app notice</li>
              <li>An email</li>
              <li>A notice on our website</li>
              <li>A renewed consent request</li>
            </ul>
            <p>If a change involves collecting, using, or disclosing a new category of consumer health data or using existing information for a materially different purpose, we will obtain consent where required before beginning that activity.</p>
          </section>

          <section style={secS}>
            <h2 id="privacy-section-17" style={h2S}>17. Contact us</h2>
            <p style={pS}>Questions, concerns, complaints, appeals, and privacy requests may be directed to:</p>
            <p style={pS}>
              <strong>Unfold Labs, Inc.</strong><br />
              Email: <a href="mailto:kings@tryunfold.ai" style={linkS}>kings@tryunfold.ai</a><br />
              Website: tryunfold.ai<br />
              Mailing address: 269 24th St, Oakland, CA 94612, United States
            </p>
            <p style={pS}>For faster handling, use one of the following email subject lines:</p>
            <ul style={ulS}>
              <li>Privacy Request</li>
              <li>Consumer Health Data Request</li>
              <li>Privacy Request Appeal</li>
              <li>Security Concern</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
