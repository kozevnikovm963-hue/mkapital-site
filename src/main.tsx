import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import Home from "../app/page";
import SeoPage from "../app/SeoPage";
import { seoPages } from "../app/seo-data";
import "../app/globals.css";

const segments = window.location.pathname.split("/").filter(Boolean);
const slug = segments.at(-1) === "mkapital-site" ? "" : segments.at(-1) ?? "";
const seoData = seoPages[slug];

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    {seoData ? <SeoPage data={seoData} /> : <Home />}
  </StrictMode>
);

if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
