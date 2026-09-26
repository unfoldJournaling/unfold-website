import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import SiteRoutes from "./Routes.jsx";
import "./styles.css";
import "./content.css";

const root = document.getElementById("root");
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <SiteRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
if (root.dataset.prerendered === "true") hydrateRoot(root, app);
else createRoot(root).render(app);
