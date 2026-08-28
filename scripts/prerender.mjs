import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = resolve(import.meta.dirname, "..");
const { render } = await import(pathToFileURL(resolve(projectRoot, ".ssr/entry-server.js")));
const routes = [
  ["/mkapital-site/", "dist/index.html"],
  ["/mkapital-site/materinskiy-kapital-nalichnymi/", "dist/materinskiy-kapital-nalichnymi/index.html"],
  ["/mkapital-site/obnalichit-materinskiy-kapital/", "dist/obnalichit-materinskiy-kapital/index.html"],
  ["/mkapital-site/zaim-pod-materinskiy-kapital/", "dist/zaim-pod-materinskiy-kapital/index.html"],
  ["/mkapital-site/ostatok-materinskogo-kapitala/", "dist/ostatok-materinskogo-kapitala/index.html"],
  ["/mkapital-site/na-chto-potratit-materinskiy-kapital/", "dist/na-chto-potratit-materinskiy-kapital/index.html"],
];

for (const [pathname, relativeFile] of routes) {
  const file = resolve(projectRoot, relativeFile);
  const html = await readFile(file, "utf8");
  const rendered = render(pathname);
  await writeFile(file, html.replace('<div id="root"></div>', `<div id="root">${rendered}</div>`));
}

console.log(`Prerendered ${routes.length} pages`);
