// Bring upstream content edits (michaelko58/MoiseyKoretz, hand-written pages) into src/.
//
//   git fetch upstream
//   node scripts/sync-upstream.mjs [base] [theirs]
//
// base defaults to `git merge-base HEAD upstream/main`, theirs to upstream/main.
// For every upstream page it three-way merges the Russian <main> body, title and
// description into the matching src/ file, and each translation into src/en/ and src/he/. Conflicts are left as <<<<<<< markers
// and listed at the end. After a sync, record it with `git merge -s ours upstream/main`
// so the next run starts from there.
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

// Upstream file name → ours, for pages we renamed. null means we deleted the page.
const RENAMED = {
  "pages/допросдавидаландау.html": "pages/допрослдландау3августа1938.html",
  "pages/стихи.html": null,
};

const git = (...args) =>
  execFileSync("git", args, { encoding: "utf8", maxBuffer: 1 << 28, stdio: ["ignore", "pipe", "pipe"] });
const theirsRev = process.argv[3] || "upstream/main";
const baseRev = process.argv[2] || git("merge-base", "HEAD", theirsRev).trim();
const tmp = mkdtempSync(join(tmpdir(), "sync-upstream-"));

const lf = (s) => s.replace(/\r\n/g, "\n");

function show(rev, path) {
  try {
    return lf(git("show", `${rev}:${path}`));
  } catch {
    return null;
  }
}

// The Russian page: first <main>, before any translation <template>.
function parsePage(html) {
  const open = html.match(/<main\b[^>]*>/);
  const close = html.indexOf("</main>", open.index);
  const attr = (re) => (html.match(re) || [])[1];
  return {
    // Our bodies end with one newline, upstream's with the closing tag's indent.
    body: html.slice(open.index + open[0].length, close).trimEnd() + "\n",
    title: attr(/<title>([\s\S]*?)<\/title>/),
    description: attr(/<meta name="description" content="([^"]*)"/),
  };
}

function relink(s) {
  for (const [from, to] of Object.entries(RENAMED)) {
    if (to) s = s.replaceAll(from.replace("pages/", ""), to.replace("pages/", ""));
  }
  return s;
}

function merge3(ours, base, theirs, label) {
  const files = ["ours", "base", "theirs"].map((n) => join(tmp, n));
  [ours, base, theirs].forEach((s, i) => writeFileSync(files[i], s));
  let conflicts = 0;
  try {
    git("merge-file", "-L", `ours ${label}`, "-L", "base", "-L", "upstream", ...files);
  } catch (e) {
    conflicts = e.status;
  }
  return { text: readFileSync(files[0], "utf8"), conflicts };
}

function frontMatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n/);
  return { fm: m[1], body: src.slice(m[0].length) };
}

function setField(fm, key, value) {
  return fm.replace(new RegExp(`^${key}: ".*"$`, "m"), `${key}: ${JSON.stringify(value)}`);
}

const upstreamFiles = git("-c", "core.quotepath=false", "ls-tree", "--name-only", "-r", theirsRev)
  .split("\n")
  .filter((f) => f === "index.html" || /^pages\/.*\.html$/.test(f));

// Translations: <template id="page-en"> (or "home-en" on the home page) holds a translated
// <main>; the page's title and description are its data-title/data-desc, or HOME_TITLE and
// HOME_DESC in i18n.js for the home page.
const LANGS = ["en", "he"];

function homeStrings(rev) {
  const js = show(rev, "i18n.js") || "";
  const pick = (name, lang) => {
    const obj = (js.match(new RegExp(`${name} = \\{([\\s\\S]*?)\\};`)) || [])[1] || "";
    const m = obj.match(new RegExp(`${lang}: ("(?:[^"\\\\]|\\\\.)*")`));
    return m && JSON.parse(m[1]);
  };
  return (lang) => ({ title: pick("HOME_TITLE", lang), description: pick("HOME_DESC", lang) });
}

function parseTranslation(html, lang, home) {
  if (html === null) return null;
  const tpl = html.match(new RegExp(`<template id="(?:page|home)-${lang}"([^>]*)>([\\s\\S]*?)</template>`));
  if (!tpl) return null;
  const open = tpl[2].match(/<main\b[^>]*>/);
  const close = tpl[2].lastIndexOf("</main>");
  const attr = (name) => (tpl[1].match(new RegExp(`${name}="([^"]*)"`)) || [])[1];
  return {
    body: tpl[2].slice(open.index + open[0].length, close).trimEnd() + "\n",
    ...(home ? home(lang) : { title: attr("data-title"), description: attr("data-desc") }),
  };
}

const changed = [], conflicted = [], skipped = [];

// Merge upstream's base → theirs change into srcPath. A missing srcPath is created from
// theirs, with front matter copied from the Russian page (newFm).
function sync(srcPath, b, t, newFm) {
  const notes = [];
  let src, fm, body;
  if (existsSync(srcPath)) {
    src = readFileSync(srcPath, "utf8");
    ({ fm, body } = frontMatter(src));
  } else if (newFm) {
    src = "";
    fm = setField(setField(newFm, "title", t.title), "description", t.description);
    body = relink(t.body);
    b = t;
  } else {
    return;
  }
  if (!b) {
    if (relink(t.body) !== body) notes.push("no upstream base to merge from, left as is");
  } else if (relink(b.body) !== relink(t.body)) {
    // Merge without our trailing whitespace, then put it back.
    const trail = body.match(/\s*$/)[0];
    const r = merge3(body.trimEnd() + "\n", relink(b.body), relink(t.body), srcPath);
    body = r.text.trimEnd() + trail;
    if (r.conflicts) notes.push(`${r.conflicts} body conflict(s)`);
  }
  for (const key of ["title", "description"]) {
    if (!b || b[key] === t[key]) continue;
    const ours = JSON.parse(fm.match(new RegExp(`^${key}: (".*")$`, "m"))[1]);
    if (ours === b[key]) fm = setField(fm, key, t[key]);
    else if (ours !== t[key]) notes.push(`${key} changed upstream to ${JSON.stringify(t[key])}, ours differs`);
  }
  const out = `---\n${fm}\n---\n${body}`;
  if (out !== src) {
    mkdirSync(dirname(srcPath), { recursive: true });
    writeFileSync(srcPath, out);
    changed.push(srcPath);
  }
  if (notes.length) conflicted.push(`${srcPath}: ${notes.join("; ")}`);
}

const baseHome = homeStrings(baseRev), theirsHome = homeStrings(theirsRev);
for (const file of upstreamFiles) {
  const base = show(baseRev, file), theirs = show(theirsRev, file);
  if (base === null) { skipped.push(`${file} (new upstream page, add by hand)`); continue; }
  const ourFile = file in RENAMED ? RENAMED[file] : file;
  if (ourFile === null) { skipped.push(`${file} (deleted here)`); continue; }
  const srcPath = join("src", ourFile);
  if (!existsSync(srcPath)) { skipped.push(`${file} (no ${srcPath})`); continue; }

  sync(srcPath, parsePage(base), parsePage(theirs));

  // Translated pages keep the Russian page's section, mainClass and headStyle.
  const ruFm = frontMatter(readFileSync(srcPath, "utf8")).fm
    .split("\n").filter((l) => /^(title|description|section|mainClass|headStyle):/.test(l)).join("\n");
  const home = file === "index.html";
  for (const lang of LANGS) {
    const t = parseTranslation(theirs, lang, home && theirsHome);
    if (!t) continue;
    sync(join("src", lang, ourFile), parseTranslation(base, lang, home && baseHome), t, ruFm);
  }
}

console.log(`base ${baseRev.slice(0, 7)} → ${theirsRev}`);
console.log(`\nchanged ${changed.length} files`);
if (skipped.length) console.log(`\nskipped:\n  ${skipped.join("\n  ")}`);
if (conflicted.length) console.log(`\nneeds a look:\n  ${conflicted.join("\n  ")}`);
console.log("\nNot handled: images, site.css, menu and other markup outside <main>. Check `git diff --stat " + `${baseRev.slice(0, 7)} ${theirsRev}` + "`.");
