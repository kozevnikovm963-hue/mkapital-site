import { renderToString } from "react-dom/server";
import Home from "../app/page";
import SeoPage from "../app/SeoPage";
import { seoPages } from "../app/seo-data";

export function render(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const slug = segments.at(-1) === "mkapital-site" ? "" : segments.at(-1) ?? "";
  const seoData = seoPages[slug];
  return renderToString(seoData ? <SeoPage data={seoData} /> : <Home />);
}
