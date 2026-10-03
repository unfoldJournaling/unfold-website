import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import SiteRoutes from "./Routes.jsx";
import "./styles.css";
import "./content.css";

const root = document.getElementById("root");
const [errorKind, errorStatus] = (root.dataset.contentError || "").split(":");
const contentError = ["story", "role"].includes(errorKind) && ["404", "503"].includes(errorStatus)
  ? { kind: errorKind, status: Number(errorStatus) }
  : null;
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <SiteRoutes contentError={contentError} />
    </BrowserRouter>
  </React.StrictMode>
);
if (root.dataset.prerendered === "true") hydrateRoot(root, app);
else createRoot(root).render(app);
