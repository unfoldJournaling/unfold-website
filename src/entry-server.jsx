import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import SiteRoutes from "./Routes.jsx";
export function render(url, contentError = null) {
  return renderToString(
    <StaticRouter location={url}>
      <SiteRoutes contentError={contentError} />
    </StaticRouter>,
  );
}
