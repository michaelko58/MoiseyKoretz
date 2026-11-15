// Checks the built site in _site: every local link, image and #anchor resolves,
// every page has a title and description, no page is orphaned, and every inline script is allowed by the CSP.
// srcset candidates count as images.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { parse } from "node-html-parser";

const site = path.resolve(process.argv[2] ?? "_site");
const pages = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (p.endsWith(".html")) pages.push(p);
  }
})(site);

const docs = new Map(pages.map((p) => [p, parse(fs.readFileSync(p, "utf8"))]));
const ids = (p) => new Set(docs.get(p).querySelectorAll("[id]").map((el) => el.id));
const links = new Map(pages.map((p) => [p, new Set()]));
const problems = [];

for (const [file, doc] of docs) {
  const rel = path.relative(site, file);
  const report = (msg) => problems.push(`${rel}: ${msg}`);

  if (!doc.querySelector("title")?.text.trim()) report("empty <title>");
  if (!doc.querySelector('meta[name="description"]')?.getAttribute("content")?.trim()) report("empty description");
  const refs = [
    ...doc.querySelectorAll("a[href], link[href]").map((el) => el.getAttribute("href")),
    ...doc.querySelectorAll("img[src]").map((el) => el.getAttribute("src")),
    ...doc.querySelectorAll("img[srcset], source[srcset]")
      .flatMap((el) => el.getAttribute("srcset").split(",").map((c) => c.trim().split(/\s+/)[0])),
  ];
  for (const ref of refs) {
    if (/^[a-z][a-z0-9+.-]*:/i.test(ref) || ref.startsWith("//")) continue;
    const [targetWithQuery, hash] = ref.split("#");
    const target = targetWithQuery.split("?")[0];
    // Root-absolute links (only on 404.html) resolve against the site root; "/" means index.html.
    let dest = !target ? file
      : target.startsWith("/") ? path.join(site, decodeURI(target))
      : path.resolve(path.dirname(file), decodeURI(target));
    if (fs.existsSync(dest) && fs.statSync(dest).isDirectory()) dest = path.join(dest, "index.html");
    if (!dest.startsWith(site) || !fs.existsSync(dest)) {
      report(`broken link ${ref}`);
    } else if (hash && docs.has(dest) && !ids(dest).has(decodeURIComponent(hash))) {
      report(`missing anchor ${ref}`);
    } else if (docs.has(dest)) {
      links.get(file).add(dest);
    }
  }
}

// Every page must be reachable by following links from the home page
// (404.html is served by the host for unknown URLs, so nothing links to it).
const seen = new Set([path.join(site, "index.html"), path.join(site, "404.html")]);
for (const p of seen) for (const next of links.get(p) ?? []) seen.add(next);
for (const p of pages) if (!seen.has(p)) problems.push(`${path.relative(site, p)}: not linked from any page reachable from index.html`);

// Every inline script must be allowed by its sha256 hash in the Content-Security-Policy in vercel.json,
// otherwise the browser refuses to run it in production.
const csp = JSON.parse(fs.readFileSync("vercel.json", "utf8")).headers
  ?.flatMap((rule) => rule.headers)
  .find((h) => h.key === "Content-Security-Policy")?.value;
if (csp) {
  for (const p of pages) {
    const html = fs.readFileSync(p, "utf8");
    for (const m of html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)) {
      const hash = `sha256-${crypto.createHash("sha256").update(m[1], "utf8").digest("base64")}`;
      if (!csp.includes(`'${hash}'`)) problems.push(`${path.relative(site, p)}: inline script ${hash} is not allowed by the CSP in vercel.json`);
    }
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  console.error(`\n${problems.length} problem(s) in ${pages.length} pages.`);
  process.exitCode = 1;
} else {
  console.log(`${pages.length} pages checked, no problems.`);
}
