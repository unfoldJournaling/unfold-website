import { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./App.jsx";
import Blog from "./Blog.jsx";
import Article from "./Article.jsx";
import Privacy from "./Privacy.jsx";
import Terms from "./Terms.jsx";
import DeleteAccount from "./DeleteAccount.jsx";
import GetApp from "./GetApp.jsx";
import NotFound from "./NotFound.jsx";
import SiteLayout from "./components/SiteLayout.jsx";
import Seo from "./components/Seo.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import Features from "./Features.jsx";
import Prompts from "./Prompts.jsx";
import Help from "./Help.jsx";
import About from "./About.jsx";
import Plans from "./Plans.jsx";
import Careers from "./Careers.jsx";
import CareerRole from "./CareerRole.jsx";
import Releases from "./Releases.jsx";
import FeatureRequest from "./FeatureRequest.jsx";
import Roadmap from "./Roadmap.jsx";
import KnowledgeBase from "./KnowledgeBase.jsx";
import ReportBug from "./ReportBug.jsx";
import ContentRecovery from "./components/ContentRecovery.jsx";

function FaqRedirect() {
  const { search, hash } = useLocation();
  return <Navigate to={{ pathname: "/help", search, hash }} replace />;
}

export default function SiteRoutes({ contentError = null }) {
  const location = useLocation();
  const [initialPath] = useState(location.pathname);
  const showRecovery = contentError && location.pathname === initialPath;
  return (
    <>
      {!showRecovery && <Seo />}
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          {showRecovery ? <Route path="*" element={<ContentRecovery {...contentError} />} /> : <>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/help" element={<Help />} />
          <Route path="/faq" element={<FaqRedirect />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/feature-request" element={<FeatureRequest />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/report-bug" element={<ReportBug />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:slug" element={<CareerRole />} />
          <Route path="/releases" element={<Releases />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/get-app" element={<GetApp />} />
          <Route
            path="/privacy"
            element={
              <div className="legacy-page">
                <Privacy />
              </div>
            }
          />
          <Route
            path="/terms"
            element={
              <div className="legacy-page">
                <Terms />
              </div>
            }
          />
          <Route
            path="/delete-account"
            element={
              <div className="legacy-page">
                <DeleteAccount />
              </div>
            }
          />
          <Route path="*" element={<NotFound />} />
          </>}
        </Route>
      </Routes>
    </>
  );
}
