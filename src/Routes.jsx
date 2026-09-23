import { Route, Routes } from "react-router-dom";
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
export default function SiteRoutes() {
  return (
    <>
      <Seo />
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
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
        </Route>
      </Routes>
    </>
  );
}
