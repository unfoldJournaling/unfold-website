import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Icon from "./Icon.jsx";
import { CONTACT_EMAIL } from "../data/site.js";
import PlatformDownloadLink from "./PlatformDownloadLink.jsx";

export function Brand({ light = false }) {
  return (
    <Link className="brand" to="/" aria-label="Unfold home">
      <img
        src={light ? "/logo_white.png" : "/images/wordmark.webp"}
        width="120"
        height="40"
        alt="Unfold"
      />
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggle = useRef(null);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 821px)");
    const reset = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", reset);
    return () => desktop.removeEventListener("change", reset);
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [location]);
  useEffect(() => {
    if (!open) return;
    const close = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <button
          ref={toggle}
          className="menu-toggle icon-button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
        <nav
          id="main-navigation"
          className={`main-nav ${open ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          <NavLink to="/features">Features</NavLink>
          <NavLink to="/prompts">Prompts</NavLink>
          <NavLink to="/blog">The Journal</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/help">Help</NavLink>
          <Link className="button button-small" to="/get-app">
            Get Unfold <Icon size={17} />
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function DownloadCta({ compact = false }) {
  return (
    <section className="download-cta section" aria-labelledby="download-title">
      <div className="container download-inner">
        <div>
          {!compact && <p className="eyebrow">A moment for you</p>}
          <h2 id="download-title">
            {compact ? "Start with one thought." : <>Your journal. Your pace.<br />Start with one thought.</>}
          </h2>
          <p>Write, reflect, and return when you’re ready.</p>
        </div>
        <div className="download-actions">
          <PlatformDownloadLink light />
          <span>Available on iOS and Android</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>
              A little more reflection.
              <br />A little more understanding.
              <br />A little more you.
            </p>
          </div>
          <div>
            <h2>Company</h2>
            <Link to="/about">About Unfold</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/blog">The Journal</Link>
          </div>
          <div>
            <h2>Product</h2>
            <Link to="/features">Features</Link>
            <Link to="/prompts">Prompt library</Link>
            <Link to="/plans">Subscriptions</Link>
            <Link to="/releases">Release notes</Link>
            <Link to="/roadmap">Roadmap</Link>
            <Link to="/get-app">Get the app</Link>
          </div>
          <div>
            <h2>Support</h2>
            <Link to="/help">Help & FAQs</Link>
            <Link to="/knowledge-base">Knowledge base</Link>
            <a href={`mailto:${CONTACT_EMAIL}`}>Contact us</a>
            <Link to="/feature-request">Request a feature</Link>
            <Link to="/report-bug">Report a bug</Link>
          </div>
          <div>
            <h2>Legal</h2>
            <Link to="/privacy">Privacy & your data</Link>
            <Link to="/terms">Terms of use</Link>
            <Link to="/delete-account">Delete your account</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-signoff"><span>© {new Date().getFullYear()} Unfold. All rights reserved.</span><span><a href="https://www.instagram.com/try_unfold/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.linkedin.com/company/tryunfold" target="_blank" rel="noreferrer">LinkedIn</a></span></div>
          <p>
            Made for everyday reflection. Unfold is a wellness tool, not a
            medical device or a substitute for professional care.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function SiteLayout() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" tabIndex="-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
