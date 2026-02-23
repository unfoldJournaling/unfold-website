import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const LOGO_SRC = "/logo.png";

// Company logos as SVG components
const CompanyLogos = {
  Google: () => (
    <svg viewBox="0 0 272 92" width="120" height="40">
      <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335"/>
      <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05"/>
      <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4"/>
      <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853"/>
      <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335"/>
      <path d="M35.29 41.19V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49-.21z" fill="#4285F4"/>
    </svg>
  ),
  Meta: () => (
    <svg viewBox="0 0 120 40" width="100" height="34">
      <text x="0" y="30" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="28" fill="currentColor" opacity="0.5">Meta</text>
    </svg>
  ),
  Salesforce: () => (
    <svg viewBox="0 0 160 40" width="130" height="34">
      <text x="0" y="30" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="24" fill="currentColor" opacity="0.5">salesforce</text>
    </svg>
  ),
  Stripe: () => (
    <svg viewBox="0 0 120 40" width="100" height="34">
      <text x="0" y="30" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="28" fill="currentColor" opacity="0.5">stripe</text>
    </svg>
  ),
  Notion: () => (
    <svg viewBox="0 0 120 40" width="100" height="34">
      <text x="0" y="30" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="28" fill="currentColor" opacity="0.5">Notion</text>
    </svg>
  ),
  Figma: () => (
    <svg viewBox="0 0 120 40" width="90" height="34">
      <text x="0" y="30" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="28" fill="currentColor" opacity="0.5">Figma</text>
    </svg>
  ),
};

const testimonials = [
  { text: "I used to hit a wall every Wednesday afternoon. Unfold predicted it before I even noticed the pattern and gave me a breathing exercise right when I needed it.", name: "Maria R.", role: "Product Manager, Google", color: "#382CBE" },
  { text: "The journaling prompts feel like they actually know me. Two minutes in the morning completely changed how I approach high-stakes meetings.", name: "James T.", role: "Investment Analyst, JP Morgan", color: "#382CBE" },
  { text: "I've tried Calm, Headspace, all of them. Unfold is the first app that doesn't just react — it actually prevents my stress from spiraling. Game changer.", name: "Sarah K.", role: "Senior Engineer, Stripe", color: "#B5B8EE" },
  { text: "My team's productivity went up 23% after we started using Unfold. The anonymous insights feature lets me support my people without being invasive.", name: "David L.", role: "VP Engineering, Notion", color: "#382CBE" },
  { text: "As a surgeon, I can't afford to be stressed during procedures. Unfold helps me identify when I need recovery time before it becomes a problem.", name: "Dr. Priya N.", role: "Cardiothoracic Surgeon", color: "#B5B8EE" },
  { text: "The stress personality framework was eye-opening. Turns out I'm a Simmerer — I bottle things up until they explode. Now I catch it early.", name: "Alex M.", role: "Creative Director, Figma", color: "#382CBE" },
  { text: "I was skeptical about another wellness app, but the biometric integration makes this feel like real science, not just vibes. The predictions are scarily accurate.", name: "Rachel W.", role: "Data Scientist, Meta", color: "#382CBE" },
  { text: "After my burnout last year, Unfold has been essential to my recovery. It's like having a therapist who's always watching your vitals.", name: "Marcus J.", role: "Startup Founder", color: "#B5B8EE" },
];

const pricingPlans = {
  monthly: [
    { name: "Free", desc: "Get started with the basics", price: 0, period: "/month", features: ["Basic mood tracking", "Daily journal prompts", "Weekly stress summary", "3 CBT exercises"], cta: "Get Started Free", featured: false },
    { name: "Pro", desc: "Full predictive power, unlimited access", price: 12, period: "/month", features: ["Everything in Free", "24–48 hr stress prediction", "Apple Watch integration", "Unlimited CBT interventions", "AI-personalized journaling", "Detailed analytics dashboard"], cta: "Download App", featured: true },
    { name: "Teams", desc: "Wellbeing at scale for your org", price: 8, period: "/user/mo", features: ["Everything in Pro", "Team wellness dashboard", "Anonymous insights for managers", "SSO & admin controls", "Dedicated onboarding"], cta: "Contact Sales", featured: false },
  ],
  annual: [
    { name: "Free", desc: "Get started with the basics", price: 0, period: "/month", features: ["Basic mood tracking", "Daily journal prompts", "Weekly stress summary", "3 CBT exercises"], cta: "Get Started Free", featured: false },
    { name: "Pro", desc: "Full predictive power, unlimited access", price: 9, period: "/month", features: ["Everything in Free", "24–48 hr stress prediction", "Apple Watch integration", "Unlimited CBT interventions", "AI-personalized journaling", "Detailed analytics dashboard"], cta: "Download App", featured: true, save: "Save 25%" },
    { name: "Teams", desc: "Wellbeing at scale for your org", price: 6, period: "/user/mo", features: ["Everything in Pro", "Team wellness dashboard", "Anonymous insights for managers", "SSO & admin controls", "Dedicated onboarding"], cta: "Contact Sales", featured: false, save: "Save 25%" },
  ],
};

// Parallax hook
function useParallax(speed = 0.3) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(center * speed);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);
  return [ref, offset];
}

// Reveal on scroll hook
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold, rootMargin: "0px 0px -50px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

// Floating testimonials component
function FloatingTestimonials() {
  const scrollRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isMobile) return; // Disable auto-scroll on mobile
    let animId;
    let pos = 0;
    const speed = 0.5;
    const animate = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    const pause = () => cancelAnimationFrame(animId);
    const resume = () => { animId = requestAnimationFrame(animate); };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    return () => { cancelAnimationFrame(animId); el.removeEventListener("mouseenter", pause); el.removeEventListener("mouseleave", resume); };
  }, [isMobile]);

  const cards = [...testimonials, ...testimonials];

  return (
    <div ref={scrollRef} className="testimonials-scroll" style={{ display: "flex", gap: "1.5rem", overflow: isMobile ? "auto" : "hidden", paddingBottom: "1rem", cursor: isMobile ? "default" : "grab", scrollSnapType: isMobile ? "x mandatory" : "none", WebkitOverflowScrolling: "touch" }}>
      {cards.map((t, i) => (
        <div key={i} className="testimonial-card" style={{ minWidth: isMobile ? "85%" : 340, maxWidth: isMobile ? "85%" : 340, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "1.75rem", flexShrink: 0, transition: "background 0.4s, transform 0.4s", scrollSnapAlign: isMobile ? "center" : "none" }}
          onMouseEnter={e => { if (!isMobile) { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(-4px)"; } }}
          onMouseLeave={e => { if (!isMobile) { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "translateY(0)"; } }}>
          <div style={{ color: "#E8C06A", fontSize: "0.85rem", letterSpacing: 2, marginBottom: "0.75rem" }}>★★★★★</div>
          <p style={{ fontSize: "0.92rem", lineHeight: 1.75, color: "rgba(250,248,245,0.8)", marginBottom: "1.25rem", fontStyle: "italic" }}>"{t.text}"</p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.85rem", color: "#FAF8F5" }}>
              {t.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#FAF8F5" }}>{t.name}</div>
              <div style={{ fontSize: "0.78rem", color: "rgba(250,248,245,0.5)" }}>{t.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function UnfoldSite() {
  const [scrolled, setScrolled] = useState(false);
  const [billing, setBilling] = useState("monthly");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroRef, heroOffset] = useParallax(0.15);
  const [featRef, featOffset] = useParallax(0.08);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const plans = pricingPlans[billing];

  const s = {
    sage: "#382CBE",
    sageDeep: "#382CBE",
    sageLight: "#B5B8EE",
    cream: "#FFFFFF",
    warmWhite: "#FBFBFB",
    sand: "#E5E5E5",
    bark: "#3D3530",
    barkLight: "#666666",
    sky: "#382CBE",
    skyLight: "#B5B8EE",
    blush: "#B5B8EE",
    moss: "#382CBE",
  };

  const fontDisplay = "'Fraunces', serif";
  const fontBody = "'Plus Jakarta Sans', sans-serif";

  return (
    <div style={{ fontFamily: fontBody, background: s.cream, color: s.bark, lineHeight: 1.7, overflowX: "hidden", WebkitFontSmoothing: "antialiased" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        @keyframes breathe { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
        @keyframes float { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-30px)} }
        @keyframes meterPulse { 0%,100%{width:32%} 50%{width:38%} }

        .mobile-menu-button { display: none; }

        .grid-3-col { display: grid; grid-template-columns: repeat(3, 1fr); }
        .grid-2-col { display: grid; grid-template-columns: 1fr 1fr; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; }
        .footer-main { display: flex; justify-content: space-between; align-items: flex-start; }
        .footer-links { display: flex; gap: 4rem; }
        .hero-stats { display: flex; align-items: center; justify-content: center; gap: 2rem; flex-wrap: wrap; }

        .testimonials-scroll::-webkit-scrollbar { display: none; }
        .testimonials-scroll { -ms-overflow-style: none; scrollbar-width: none; }

        @media (min-width: 769px) {
          .mobile-nav-links { display: flex; }
        }

        @media (max-width: 768px) {
          .mobile-nav-links {
            display: none !important;
          }
          .mobile-nav-links.active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255,255,255,0.98);
            backdrop-filter: blur(20px);
            padding: 1rem 2rem;
            gap: 1rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          }
          .mobile-menu-button { display: block; }
          .grid-3-col { grid-template-columns: 1fr; gap: 2rem; }
          .grid-2-col {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .grid-2-col > div:first-child { order: 2; }
          .grid-2-col > div:last-child { order: 1; }
          .footer-main { flex-direction: column; gap: 2rem; }
          .footer-links { flex-direction: column; gap: 2rem; }
          .testimonials-scroll {
            padding: 0 7.5% !important;
            gap: 1rem !important;
          }
          .hero-stats {
            display: flex !important;
            gap: 0 !important;
            flex-wrap: nowrap !important;
            justify-content: space-between !important;
            width: 100% !important;
            padding: 0 !important;
            margin-top: 2rem !important;
          }
          .hero-stats > div {
            display: flex !important;
            gap: 0 !important;
            flex: 0 0 33.333% !important;
            width: 33.333% !important;
            max-width: 33.333% !important;
            min-width: 0 !important;
            justify-content: center !important;
          }
          .hero-stats > div > div:last-child {
            display: none !important;
          }
          .hero-stats > div > div:first-child {
            text-align: center !important;
            width: 100% !important;
          }
          .hero-stats > div > div:first-child > div:first-child {
            font-size: 0.75rem !important;
            font-weight: 700 !important;
            white-space: nowrap !important;
            line-height: 1.1 !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }
          .hero-stats > div > div:first-child > div:last-child {
            font-size: 0.5rem !important;
            white-space: nowrap !important;
            line-height: 1.2 !important;
            margin-top: 0.2rem !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }

          section { padding: 3rem 1.5rem !important; }
          nav { padding: 1rem 1.5rem !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "all 0.4s", background: s.cream }}>
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", zIndex: 101 }}>
          <img src={LOGO_SRC} alt="Unfold" style={{ height: 36 }} />
        </a>
        <button className="mobile-menu-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", zIndex: 101 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={s.bark} strokeWidth="2" strokeLinecap="round">
            {mobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>
        <div className={`mobile-nav-links ${mobileMenuOpen ? 'active' : ''}`} style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          {["Features", "How It Works", "Testimonials", "Pricing"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: "none", color: s.barkLight, fontSize: "0.9rem", fontWeight: 500, transition: "color 0.3s" }}
              onMouseEnter={e => e.target.style.color = s.sageDeep}
              onMouseLeave={e => e.target.style.color = s.barkLight}>{l}</a>
          ))}
          <a href="https://apps.apple.com/us/app/unfold-journal-mood-tracker/id6743553743" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: "none", background: s.bark, color: s.cream, padding: "0.65rem 1.5rem", borderRadius: 100, fontWeight: 600, fontSize: "0.9rem", transition: "all 0.3s", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
            onMouseEnter={e => { e.target.style.background = s.moss; e.target.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.target.style.background = s.bark; e.target.style.transform = "translateY(0)"; }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
            Download App</a>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "8rem 2rem 6rem", overflow: "hidden" }}>
        {/* Orbs with parallax */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", filter: "blur(80px)", opacity: 0.5, background: `radial-gradient(circle, ${s.sageLight}, transparent 70%)`, top: "-10%", right: "-5%", animation: "float 12s ease-in-out infinite", transform: `translateY(${heroOffset}px)` }} />
          <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", filter: "blur(80px)", opacity: 0.5, background: `radial-gradient(circle, ${s.skyLight}, transparent 70%)`, bottom: "-15%", left: "-10%", animation: "float 15s ease-in-out infinite reverse", transform: `translateY(${-heroOffset}px)` }} />
          <div style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", filter: "blur(80px)", opacity: 0.3, background: `radial-gradient(circle, ${s.blush}, transparent 70%)`, top: "30%", left: "40%", animation: "float 10s ease-in-out infinite 2s" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 800, textAlign: "center" }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: `rgba(56,44,190,0.1)`, border: `1px solid rgba(56,44,190,0.25)`, padding: "0.5rem 1.25rem", borderRadius: 100, fontSize: "0.82rem", fontWeight: 600, color: s.sageDeep, marginBottom: "2rem", letterSpacing: "0.03em" }}>
              <span style={{ width: 8, height: 8, background: s.sage, borderRadius: "50%", animation: "breathe 3s ease-in-out infinite" }} />
              AI-Powered Stress Prediction
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 style={{ fontFamily: fontDisplay, fontSize: "clamp(2.8rem, 6vw, 4.5rem)", fontWeight: 400, lineHeight: 1.15, color: s.bark, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
              Know your stress <em style={{ fontStyle: "italic", color: s.sageDeep }}>before</em> it knows you
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: "1.15rem", color: s.barkLight, maxWidth: 560, margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
              Unfold combines Apple Watch biometrics with AI-guided journaling to predict stress episodes 24–48 hours in advance — so you can stay ahead, not catch up.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://apps.apple.com/us/app/unfold-journal-mood-tracker/id6743553743" style={{ background: s.bark, color: s.cream, padding: "1rem 2.25rem", borderRadius: 100, textDecoration: "none", fontWeight: 600, fontSize: "0.95rem", transition: "all 0.35s", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
                onMouseEnter={e => { e.currentTarget.style.background = s.moss; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 30px rgba(56,44,190,0.25)`; }}
                onMouseLeave={e => { e.currentTarget.style.background = s.bark; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                Download App
              </a>
              <a href="#how-it-works" style={{ background: "transparent", color: s.bark, padding: "1rem 2.25rem", borderRadius: 100, textDecoration: "none", fontWeight: 600, fontSize: "0.95rem", border: `1.5px solid ${s.sand}`, transition: "all 0.35s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = s.sage; e.currentTarget.style.background = "rgba(56,44,190,0.04)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = s.sand; e.currentTarget.style.background = "transparent"; }}>
                See How It Works
              </a>
            </div>
          </Reveal>
          <div style={{ display: 'flex', width: '100%', marginTop: '3.5rem' }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontFamily: fontDisplay, fontSize: 'clamp(1rem, 4vw, 1.5rem)', fontWeight: 600, color: s.sageDeep }}>24–48 hrs</div>
              <div style={{ fontSize: 'clamp(0.6rem, 2.5vw, 0.78rem)', color: s.barkLight, marginTop: '0.15rem' }}>Early warning</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center', borderLeft: `1px solid ${s.sand}`, borderRight: `1px solid ${s.sand}` }}>
              <div style={{ fontFamily: fontDisplay, fontSize: 'clamp(1rem, 4vw, 1.5rem)', fontWeight: 600, color: s.sageDeep }}>92%</div>
              <div style={{ fontSize: 'clamp(0.6rem, 2.5vw, 0.78rem)', color: s.barkLight, marginTop: '0.15rem' }}>Prediction accuracy</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontFamily: fontDisplay, fontSize: 'clamp(1rem, 4vw, 1.5rem)', fontWeight: 600, color: s.sageDeep }}>CBT-Based</div>
              <div style={{ fontSize: 'clamp(0.6rem, 2.5vw, 0.78rem)', color: s.barkLight, marginTop: '0.15rem' }}>Interventions</div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY LOGOS */}
      <section style={{ padding: "2rem 2rem 3rem", background: s.cream }}>
        <Reveal>
          <p style={{ textAlign: "center", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: s.barkLight, marginBottom: "1.5rem" }}>
            Trusted by teams at leading companies
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "3rem", flexWrap: "wrap", maxWidth: 900, margin: "0 auto", opacity: 0.45 }}>
            {Object.entries(CompanyLogos).map(([name, Logo]) => (
              <div key={name} style={{ transition: "opacity 0.3s", cursor: "default" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                onMouseLeave={e => e.currentTarget.style.opacity = "0.7"}>
                <Logo />
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* FEATURES */}
      <section id="features" ref={featRef} style={{ padding: "4rem 2rem 7rem", background: s.cream }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: s.sageDeep, marginBottom: "1.25rem" }}>
                <span style={{ width: 20, height: 2, background: s.sage, borderRadius: 2 }} /> Features
              </div>
              <h2 style={{ fontFamily: fontDisplay, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, lineHeight: 1.2, color: s.bark, letterSpacing: "-0.02em" }}>Everything your wellbeing needs, nothing it doesn't</h2>
              <p style={{ fontSize: "1.05rem", color: s.barkLight, maxWidth: 520, margin: "1rem auto 0", lineHeight: 1.8 }}>Built for high-pressure knowledge workers who need science, not fluff.</p>
            </div>
          </Reveal>

          {/* Feature 1 */}
          <Reveal>
            <div className="grid-2-col" style={{ gap: "4rem", alignItems: "center", marginBottom: "5rem" }}>
              <div style={{ background: `linear-gradient(145deg, ${s.warmWhite}, rgba(56,44,190,0.04))`, border: `1px solid rgba(56,44,190,0.1)`, borderRadius: 24, padding: "3rem", aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", transform: `translateY(${featOffset * 0.5}px)`, transition: "transform 0.1s linear" }}>
                <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 260 }}>
                  <div style={{ background: s.bark, borderRadius: 32, padding: 12, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
                    <div style={{ background: s.warmWhite, borderRadius: 24, padding: "1.5rem", minHeight: 340 }}>
                      <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
                        <div style={{ fontSize: "0.7rem", color: s.barkLight }}>9:41 AM</div>
                        <div style={{ fontFamily: fontDisplay, fontSize: "1.1rem", marginTop: "0.5rem" }}>Your Stress Forecast</div>
                      </div>
                      <div style={{ margin: "1.5rem 0" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: s.barkLight, marginBottom: "0.5rem" }}>
                          <span>Low</span><span>Current: Calm</span><span>High</span>
                        </div>
                        <div style={{ height: 8, background: s.sand, borderRadius: 10, overflow: "hidden" }}>
                          <div style={{ height: "100%", background: `linear-gradient(90deg, ${s.sage}, ${s.sageDeep})`, borderRadius: 10, animation: "meterPulse 3s ease-in-out infinite" }} />
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                        {[{ dot: s.sage, text: "HRV trending upward +12%" }, { dot: s.sky, text: "Sleep quality: Excellent (7.5h)" }, { dot: s.blush, text: "No stress episode expected 48h" }].map((ins, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.75rem", color: s.barkLight, padding: "0.5rem 0.65rem", background: "rgba(56,44,190,0.04)", borderRadius: 10 }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: ins.dot, flexShrink: 0 }} />{ins.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: s.sageDeep, marginBottom: "0.75rem" }}>Predictive Intelligence</div>
                <h3 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 400, lineHeight: 1.25, marginBottom: "1rem" }}>See stress coming 24–48 hours away</h3>
                <p style={{ color: s.barkLight, lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "1.5rem" }}>Our AI model analyzes your biometric patterns alongside journaling data to forecast stress episodes before they happen — giving you time to intervene.</p>
                {["Real-time HRV & sleep pattern analysis", "Personalized stress signature modeling", "Proactive alerts, not reactive reminders"].map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem", fontSize: "0.9rem", color: s.barkLight, lineHeight: 1.6, marginBottom: "0.6rem" }}>
                    <span style={{ color: s.sageDeep, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</span>{b}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Feature 2 */}
          <Reveal>
            <div className="grid-2-col" style={{ gap: "4rem", alignItems: "center", marginBottom: "5rem" }}>
              <div style={{ order: 2 }}>
                <div style={{ background: `linear-gradient(145deg, ${s.warmWhite}, rgba(56,44,190,0.04))`, border: `1px solid rgba(56,44,190,0.1)`, borderRadius: 24, padding: "3rem", aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 260 }}>
                    <div style={{ background: s.bark, borderRadius: 32, padding: 12, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
                      <div style={{ background: s.warmWhite, borderRadius: 24, padding: "1.5rem", minHeight: 340 }}>
                        <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
                          <div style={{ fontSize: "0.7rem", color: s.barkLight }}>8:15 AM</div>
                          <div style={{ fontFamily: fontDisplay, fontSize: "1.1rem", marginTop: "0.5rem" }}>Morning Check-In</div>
                        </div>
                        <div style={{ fontSize: "0.8rem", color: s.sageDeep, fontStyle: "italic", background: "rgba(56,44,190,0.06)", padding: "0.75rem", borderRadius: 10, borderLeft: `3px solid ${s.sage}`, lineHeight: 1.5 }}>
                          "What's taking up the most space in your mind right now?"
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginTop: "1rem" }}>
                          {[90, 75, 60, 85, 50].map((w, i) => (
                            <div key={i} style={{ height: 2, background: i < 3 ? `linear-gradient(90deg, ${s.sageLight}, ${s.sand})` : s.sand, borderRadius: 2, width: `${w}%` }} />
                          ))}
                        </div>
                        <div style={{ marginTop: "1rem", padding: "0.6rem", background: "rgba(56,44,190,0.05)", borderRadius: 10, fontSize: "0.72rem", color: s.sageDeep }}>
                          🧠 AI insight: You tend to feel overwhelmed on Mondays when sleep dips below 7 hours.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ order: 1 }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: s.sageDeep, marginBottom: "0.75rem" }}>AI-Guided Journaling</div>
                <h3 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 400, lineHeight: 1.25, marginBottom: "1rem" }}>Two minutes that change your whole day</h3>
                <p style={{ color: s.barkLight, lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "1.5rem" }}>Smart prompts adapt to your mood, biometrics, and stress patterns. Every journal entry trains the AI to understand you better and deliver sharper predictions.</p>
                {["Adaptive prompts based on real-time data", "Pattern recognition across entries", "Builds emotional self-awareness over time"].map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem", fontSize: "0.9rem", color: s.barkLight, lineHeight: 1.6, marginBottom: "0.6rem" }}>
                    <span style={{ color: s.sageDeep, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</span>{b}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Feature 3 */}
          <Reveal>
            <div className="grid-2-col" style={{ gap: "4rem", alignItems: "center" }}>
              <div style={{ background: `linear-gradient(145deg, ${s.warmWhite}, rgba(56,44,190,0.04))`, border: `1px solid rgba(56,44,190,0.1)`, borderRadius: 24, padding: "3rem", aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 260 }}>
                  <div style={{ background: s.bark, borderRadius: 32, padding: 12, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
                    <div style={{ background: s.warmWhite, borderRadius: 24, padding: "1.5rem", minHeight: 340 }}>
                      <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
                        <div style={{ fontSize: "0.7rem", color: s.barkLight }}>2:30 PM</div>
                        <div style={{ fontFamily: fontDisplay, fontSize: "1.1rem", marginTop: "0.5rem" }}>Intervention Ready</div>
                      </div>
                      <div style={{ background: "rgba(56,44,190,0.1)", borderRadius: 12, padding: "1rem", marginTop: "0.75rem" }}>
                        <div style={{ fontSize: "0.72rem", color: s.sky, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>⚡ Stress Alert</div>
                        <div style={{ fontSize: "0.82rem", lineHeight: 1.5 }}>Based on your patterns, elevated stress is likely in the next 6 hours.</div>
                      </div>
                      <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {["🫁 4-7-8 Breathing (3 min)", "📝 Thought Reframe Exercise", "🚶 5-Minute Walk Break"].map((ex, i) => (
                          <div key={i} style={{ background: s.cream, border: `1px solid ${s.sand}`, borderRadius: 12, padding: "0.75rem", fontSize: "0.78rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>{ex}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: s.sageDeep, marginBottom: "0.75rem" }}>CBT Micro-Interventions</div>
                <h3 style={{ fontFamily: fontDisplay, fontSize: "1.75rem", fontWeight: 400, lineHeight: 1.25, marginBottom: "1rem" }}>Science-backed tools, perfectly timed</h3>
                <p style={{ color: s.barkLight, lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "1.5rem" }}>When the AI detects rising stress, it delivers personalized cognitive behavioral therapy exercises — from breathing techniques to thought reframing — right when they'll have the most impact.</p>
                {["Evidence-based CBT techniques", "Personalized to your stress profile", "Delivered at the optimal moment"].map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem", fontSize: "0.9rem", color: s.barkLight, lineHeight: 1.6, marginBottom: "0.6rem" }}>
                    <span style={{ color: s.sageDeep, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</span>{b}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "7rem 2rem", background: s.warmWhite }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: s.sageDeep, marginBottom: "1.25rem" }}>
                <span style={{ width: 20, height: 2, background: s.sage, borderRadius: 2 }} /> How It Works
              </div>
              <h2 style={{ fontFamily: fontDisplay, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, lineHeight: 1.2, color: s.bark, letterSpacing: "-0.02em" }}>Three steps to getting ahead of stress</h2>
              <p style={{ fontSize: "1.05rem", color: s.barkLight, maxWidth: 520, margin: "1rem auto 0", lineHeight: 1.8 }}>Unfold learns your unique stress signature and delivers personalized interventions before burnout takes hold.</p>
            </div>
          </Reveal>

          <div className="grid-3-col" style={{ gap: "2.5rem", position: "relative" }}>
            {[
              { icon: "⌚", num: "Step One", title: "Wear & Sync", desc: "Connect your Apple Watch and let Unfold passively track heart rate variability, sleep patterns, and activity — no extra effort needed." },
              { icon: "✍️", num: "Step Two", title: "Journal & Reflect", desc: "Spend 2 minutes on AI-guided prompts that help Unfold understand your emotional landscape and map your personal stress triggers." },
              { icon: "🧠", num: "Step Three", title: "Predict & Prevent", desc: "Receive timely alerts with personalized CBT exercises and micro-interventions before stress episodes even begin." },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div style={{ textAlign: "center", padding: "2rem 1.5rem" }}>
                  <div style={{ width: 80, height: 80, borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "2rem", background: s.cream, border: `1.5px solid ${s.sand}`, transition: "all 0.4s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = s.sage; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 40px rgba(56,44,190,0.1)`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = s.sand; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                    {step.icon}
                  </div>
                  <div style={{ fontFamily: fontDisplay, fontSize: "0.75rem", fontWeight: 700, color: s.sageDeep, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>{step.num}</div>
                  <h3 style={{ fontFamily: fontDisplay, fontSize: "1.35rem", fontWeight: 500, marginBottom: "0.75rem" }}>{step.title}</h3>
                  <p style={{ fontSize: "0.92rem", color: s.barkLight, lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ padding: "7rem 0", background: s.bark, color: "rgba(250,248,245,0.6)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, rgba(56,44,190,0.15), transparent 70%)`, top: "-20%", right: "-10%" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: s.sageLight, marginBottom: "1.25rem" }}>
                <span style={{ width: 20, height: 2, background: s.sageLight, borderRadius: 2 }} /> Testimonials
              </div>
              <h2 style={{ fontFamily: fontDisplay, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, lineHeight: 1.2, color: "#FAF8F5", letterSpacing: "-0.02em" }}>What early users are saying</h2>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <div style={{ padding: "0 2rem" }}>
            <FloatingTestimonials />
          </div>
        </Reveal>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "7rem 2rem", background: s.warmWhite }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: s.sageDeep, marginBottom: "1.25rem" }}>
                <span style={{ width: 20, height: 2, background: s.sage, borderRadius: 2 }} /> Pricing
              </div>
              <h2 style={{ fontFamily: fontDisplay, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, lineHeight: 1.2, color: s.bark, letterSpacing: "-0.02em" }}>Invest in the most important metric — you</h2>
              <p style={{ fontSize: "1.05rem", color: s.barkLight, maxWidth: 520, margin: "1rem auto 0", lineHeight: 1.8 }}>Start free, upgrade when you're ready. No hidden fees, cancel anytime.</p>
            </div>
          </Reveal>

          {/* Toggle */}
          <Reveal delay={0.1}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}>
              <div style={{ display: "flex", background: s.cream, border: `1.5px solid ${s.sand}`, borderRadius: 100, padding: 4 }}>
                {["monthly", "annual"].map(opt => (
                  <button key={opt} onClick={() => setBilling(opt)} style={{ padding: "0.6rem 1.5rem", borderRadius: 100, border: "none", cursor: "pointer", fontFamily: fontBody, fontWeight: 600, fontSize: "0.85rem", transition: "all 0.3s", background: billing === opt ? s.bark : "transparent", color: billing === opt ? s.cream : s.barkLight }}>
                    {opt === "monthly" ? "Monthly" : "Annual"}
                    {opt === "annual" && <span style={{ marginLeft: 6, fontSize: "0.72rem", color: billing === "annual" ? "#B5B8EE" : s.sage, fontWeight: 700 }}>Save 25%</span>}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid-3-col" style={{ gap: "1.5rem", alignItems: "start" }}>
            {plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 0.1}>
                <div style={{ background: plan.featured ? s.bark : s.cream, color: plan.featured ? "#FAF8F5" : s.bark, border: `1.5px solid ${plan.featured ? s.bark : s.sand}`, borderRadius: 20, padding: "2.5rem 2rem", transition: "all 0.4s", position: "relative", transform: plan.featured ? "scale(1.03)" : "scale(1)" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = plan.featured ? "scale(1.03) translateY(-4px)" : "translateY(-4px)"; e.currentTarget.style.boxShadow = plan.featured ? "0 16px 50px rgba(0,0,0,0.2)" : "0 12px 40px rgba(0,0,0,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = plan.featured ? "scale(1.03)" : "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
                  {plan.featured && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: s.sage, color: "white", padding: "0.3rem 1rem", borderRadius: 100, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>Most Popular</div>}
                  <div style={{ fontFamily: fontDisplay, fontSize: "1.25rem", fontWeight: 500, marginBottom: "0.5rem" }}>{plan.name}</div>
                  <div style={{ fontSize: "0.82rem", opacity: 0.6, marginBottom: "1.5rem", lineHeight: 1.5 }}>{plan.desc}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "1.75rem" }}>
                    <span style={{ fontSize: "1.25rem", fontWeight: 600, opacity: 0.6 }}>$</span>
                    <span style={{ fontFamily: fontDisplay, fontSize: "3rem", fontWeight: 600, lineHeight: 1 }}>{plan.price}</span>
                    <span style={{ fontSize: "0.82rem", opacity: 0.5 }}>{plan.period}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "2rem" }}>
                    {plan.features.map((f, fi) => (
                      <div key={fi} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.85rem", lineHeight: 1.5 }}>
                        <span style={{ flexShrink: 0, marginTop: 2 }}>✓</span>{f}
                      </div>
                    ))}
                  </div>
                  {plan.cta === "Download App" ? (
                    <a href="https://apps.apple.com/us/app/unfold-journal-mood-tracker/id6743553743" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", width: "100%", padding: "0.9rem", borderRadius: 100, fontWeight: 600, fontSize: "0.9rem", transition: "all 0.3s", cursor: "pointer", fontFamily: fontBody, border: plan.featured ? "none" : `1.5px solid ${s.sand}`, background: plan.featured ? s.sage : "transparent", color: plan.featured ? "white" : s.bark, textDecoration: "none" }}
                      onMouseEnter={e => { e.target.style.borderColor = plan.featured ? s.sageDeep : s.sage; e.target.style.background = plan.featured ? s.sageDeep : "rgba(56,44,190,0.04)"; }}
                      onMouseLeave={e => { e.target.style.borderColor = plan.featured ? "transparent" : s.sand; e.target.style.background = plan.featured ? s.sage : "transparent"; }}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                      {plan.cta}
                    </a>
                  ) : plan.cta === "Get Started Free" ? (
                    <a href="https://apps.apple.com/us/app/unfold-journal-mood-tracker/id6743553743" style={{ display: "block", width: "100%", textAlign: "center", padding: "0.9rem", borderRadius: 100, fontWeight: 600, fontSize: "0.9rem", transition: "all 0.3s", cursor: "pointer", fontFamily: fontBody, border: plan.featured ? "none" : `1.5px solid ${s.sand}`, background: plan.featured ? s.sage : "transparent", color: plan.featured ? "white" : s.bark, textDecoration: "none" }}
                      onMouseEnter={e => { e.target.style.borderColor = plan.featured ? s.sageDeep : s.sage; e.target.style.background = plan.featured ? s.sageDeep : "rgba(56,44,190,0.04)"; }}
                      onMouseLeave={e => { e.target.style.borderColor = plan.featured ? "transparent" : s.sand; e.target.style.background = plan.featured ? s.sage : "transparent"; }}>
                      {plan.cta}
                    </a>
                  ) : plan.cta === "Contact Sales" ? (
                    <a href="mailto:kings@tryunfold.ai" style={{ display: "block", width: "100%", textAlign: "center", padding: "0.9rem", borderRadius: 100, fontWeight: 600, fontSize: "0.9rem", transition: "all 0.3s", cursor: "pointer", fontFamily: fontBody, border: plan.featured ? "none" : `1.5px solid ${s.sand}`, background: plan.featured ? s.sage : "transparent", color: plan.featured ? "white" : s.bark, textDecoration: "none" }}
                      onMouseEnter={e => { e.target.style.borderColor = plan.featured ? s.sageDeep : s.sage; e.target.style.background = plan.featured ? s.sageDeep : "rgba(56,44,190,0.04)"; }}
                      onMouseLeave={e => { e.target.style.borderColor = plan.featured ? "transparent" : s.sand; e.target.style.background = plan.featured ? s.sage : "transparent"; }}>
                      {plan.cta}
                    </a>
                  ) : (
                    <button style={{ display: "block", width: "100%", textAlign: "center", padding: "0.9rem", borderRadius: 100, fontWeight: 600, fontSize: "0.9rem", transition: "all 0.3s", cursor: "pointer", fontFamily: fontBody, border: plan.featured ? "none" : `1.5px solid ${s.sand}`, background: plan.featured ? s.sage : "transparent", color: plan.featured ? "white" : s.bark }}
                      onMouseEnter={e => { e.target.style.borderColor = plan.featured ? s.sageDeep : s.sage; e.target.style.background = plan.featured ? s.sageDeep : "rgba(56,44,190,0.04)"; }}
                      onMouseLeave={e => { e.target.style.borderColor = plan.featured ? "transparent" : s.sand; e.target.style.background = plan.featured ? s.sage : "transparent"; }}>
                      {plan.cta}
                    </button>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ background: s.cream, padding: "8rem 2rem" }}>
        <Reveal>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: s.sageDeep, marginBottom: "1.25rem" }}>
              <span style={{ width: 20, height: 2, background: s.sage, borderRadius: 2 }} /> Get Started
            </div>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, lineHeight: 1.2, color: s.bark, maxWidth: 500, margin: "0 auto 1rem", letterSpacing: "-0.02em" }}>Ready to unfold a calmer you?</h2>
            <p style={{ fontSize: "1.05rem", color: s.barkLight, maxWidth: 520, margin: "0 auto 2.5rem", lineHeight: 1.8 }}>Join thousands of professionals who are staying ahead of stress instead of recovering from it.</p>
            <a href="https://apps.apple.com/us/app/unfold-journal-mood-tracker/id6743553743" style={{ background: s.bark, color: s.cream, padding: "1rem 2.25rem", borderRadius: 100, textDecoration: "none", fontWeight: 600, fontSize: "0.95rem", transition: "all 0.35s", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
              onMouseEnter={e => { e.currentTarget.style.background = s.moss; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 30px rgba(56,44,190,0.25)`; }}
              onMouseLeave={e => { e.currentTarget.style.background = s.bark; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              Download App
            </a>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer style={{ background: s.bark, color: "rgba(250,248,245,0.6)", padding: "4rem 2rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="footer-main" style={{ marginBottom: "3rem" }}>
            <div style={{ maxWidth: 320 }}>
              <div style={{ marginBottom: "1rem" }}>
                <img src="/logo_white.png" alt="Unfold" style={{ height: 30 }} />
              </div>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>AI-powered stress prediction that helps you stay calm, focused, and in control — before burnout takes hold.</p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <a href="https://www.instagram.com/try_unfold/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(250,248,245,0.5)", transition: "color 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "rgba(250,248,245,0.9)"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(250,248,245,0.5)"}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/tryunfold" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(250,248,245,0.5)", transition: "color 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "rgba(250,248,245,0.9)"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(250,248,245,0.5)"}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-links">
              <div>
                <h4 style={{ color: "#FAF8F5", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>Resources</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <a href="#" style={{ color: "rgba(250,248,245,0.5)", textDecoration: "none", fontSize: "0.85rem", transition: "color 0.3s" }}
                    onMouseEnter={e => e.target.style.color = s.sageLight}
                    onMouseLeave={e => e.target.style.color = "rgba(250,248,245,0.5)"}>Getting Started</a>
                  <a href="#" style={{ color: "rgba(250,248,245,0.5)", textDecoration: "none", fontSize: "0.85rem", transition: "color 0.3s" }}
                    onMouseEnter={e => e.target.style.color = s.sageLight}
                    onMouseLeave={e => e.target.style.color = "rgba(250,248,245,0.5)"}>FAQ</a>
                  <a href="https://unfold.canny.io/feature-requests" style={{ color: "rgba(250,248,245,0.5)", textDecoration: "none", fontSize: "0.85rem", transition: "color 0.3s" }}
                    onMouseEnter={e => e.target.style.color = s.sageLight}
                    onMouseLeave={e => e.target.style.color = "rgba(250,248,245,0.5)"}>Request a Feature</a>
                </div>
              </div>
              <div>
                <h4 style={{ color: "#FAF8F5", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>Support</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <a href="mailto:kings@tryunfold.ai" style={{ color: "rgba(250,248,245,0.5)", textDecoration: "none", fontSize: "0.85rem", transition: "color 0.3s" }}
                    onMouseEnter={e => e.target.style.color = s.sageLight}
                    onMouseLeave={e => e.target.style.color = "rgba(250,248,245,0.5)"}>Contact</a>
                  <a href="mailto:kings@tryunfold.ai" style={{ color: "rgba(250,248,245,0.5)", textDecoration: "none", fontSize: "0.85rem", transition: "color 0.3s" }}
                    onMouseEnter={e => e.target.style.color = s.sageLight}
                    onMouseLeave={e => e.target.style.color = "rgba(250,248,245,0.5)"}>Report a Bug</a>
                </div>
              </div>
              <div>
                <h4 style={{ color: "#FAF8F5", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>Legal</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <Link to="/privacy" style={{ color: "rgba(250,248,245,0.5)", textDecoration: "none", fontSize: "0.85rem", transition: "color 0.3s" }}
                    onMouseEnter={e => e.target.style.color = s.sageLight}
                    onMouseLeave={e => e.target.style.color = "rgba(250,248,245,0.5)"}>Privacy Policy</Link>
                  <Link to="/terms" style={{ color: "rgba(250,248,245,0.5)", textDecoration: "none", fontSize: "0.85rem", transition: "color 0.3s" }}
                    onMouseEnter={e => e.target.style.color = s.sageLight}
                    onMouseLeave={e => e.target.style.color = "rgba(250,248,245,0.5)"}>Terms of Service</Link>
                </div>
              </div>
            </div>
          </div>
          <div style={{ paddingTop: "2rem", borderTop: "1px solid rgba(250,248,245,0.08)", fontSize: "0.8rem" }}>
            <span>© 2026 Unfold AI. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
