# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A family memorial site about Моисей Абрамович Корец (1908–1984): his life, letters, poems, case files and photos. It is in Russian, with English and Hebrew translations of every page, and is built with Eleventy (11ty) into plain static HTML (no client-side language switching).

- `npm ci`: install.
- `npm run serve`: dev server with live reload at http://localhost:8080.
- `npm run build`: build into `_site/`.
- `npm test`: build, then run `scripts/check.mjs`. The check fails on:
  - a broken local link, image, `srcset` entry or `#anchor`;
  - an empty title or description;
  - a page not reachable by links from the home page (except `404.html`); the en/he pages are reached through the language switcher;
  - an inline `<script>` whose sha256 hash is missing from the Content-Security-Policy in `vercel.json`. If you edit the nav script in `base.njk`, put the new hash (printed by the failure) into `vercel.json`.

Deployment and previews:
- **Production and previews:** Vercel (`vercel.json`), connected to `motiko/MoiseyKoretz`. Vercel deploys `main` to production and builds a preview of every other branch and PR. `vercel.json` also sets the security headers (CSP and others) and cache headers. `site.css` is cached as immutable, so the layout links it as `site.css?v=<hash>` (content hash from `src/_data/assets.js`); keep that query on any new link to it. The dev server ignores them, so CSP problems only show on a Vercel deployment.
- **GitHub Pages (not in use yet):** `.github/workflows/deploy.yml` publishes to GitHub Pages, but only when it runs in `michaelko58/MoiseyKoretz`. That repo still serves the old hand-written site at https://michaelko58.github.io/MoiseyKoretz/.
- **PR checks:** `.github/workflows/build.yml` runs `npm test` on every PR.

## Structure

- `src/index.html` is the home page. `src/pages/*.html` holds every other page, flat. Each page is published at the same path without `src/`, e.g. `src/pages/камера104.html` → `pages/камера104.html`.
  - Filenames are Cyrillic titles with spaces and punctuation removed. Older ones are transliterated (`pisma1.html`, `ufti3.html`).
  - These filenames are public URLs: don't rename them.
- `src/_includes/base.njk` is the single layout. It holds:
  - the head, with the font preload, the canonical link, `hreflang` alternates, Open Graph tags (`og:locale` per language) and the home page's JSON-LD;
  - the skip link, header and nav;
  - the inline nav script;
  - the language switcher `p.langs`: a link to the same page in each other language, and the current language as `<span aria-current="true">`. Not shown on `404.html`, which is Russian only.
- `src/_data/site.json` holds the production URL, used for canonical, Open Graph and sitemap URLs. `src/sitemap.njk` and `src/robots.njk` generate `sitemap.xml` (all three languages, with `xhtml:link` alternates) and `robots.txt`.
- `src/404.html` is served by Vercel for unknown URLs. It is the only page with root-absolute links (`/pages/…`), because it can be served at any depth.
- `lib/` holds Eleventy plugins:
  - `responsive-images.js` turns the `<img>` tags on the home page and `фотографии.html` into resized WebP/JPEG copies in `_site/img/`, with `srcset`. Their links still point at the full scans in `images/`.
  - `site-urls.js` provides the `absoluteUrl` filter.
  - `i18n.js` provides the `langStem`, `inLang` and `langUrl` filters (the same page in another language) and the transform that fixes asset paths in en/he bodies (see below).
- `src/_data/nav.json` lists the four menu sections, with `label` in Russian and `en`/`he` labels. A page's `section` key decides which menu item gets `aria-current="page"`.
- `src/pages/pages.11tydata.js` holds the defaults for every page under `pages/` (layout, relative paths, permalink).
- `src/_data/lang.js` sets the default page language (`ru`). `src/_data/languages.json` holds the per-language UI strings: switcher label, `dir`, `og:locale`, site name, the «Главная» link and the nav's `aria-label`.
- `src/_includes/styles/*.css` holds per-page CSS that is inlined into the page's `<style>` (`home.css`, `life.css`), selected by front matter `headStyle`.
- `site.css`, `favicon.svg`, `images/`, `fonts/` and `.nojekyll` stay at the repo root and are copied into `_site/` unchanged. `site.css` is the shared stylesheet. Its `:root` block holds the design tokens: colours, shadows, font sizes (`--text-2xs` … `--text-2xl`, `--text-display`), line heights (`--leading-*`), spacing (`--space-3xs` … `--space-3xl`, `--gutter`, `--tap-pad`) and text widths (`--measure-*`, `--max`). Use them in `site.css` and `styles/*.css` instead of literal colours, sizes and spacing. Only one-off geometry (grid columns, tap areas, image widths, the home page's display sizes) stays literal. Archive scans are numbered `images/site/NNNN.jpg`.
- Fonts are self-hosted: Literata and Cormorant Garamond, Cyrillic + Latin woff2 subsets in `fonts/`. Their `@font-face` rules are at the top of `site.css`, together with metric-matched fallback faces ("Literata Fallback", "Cormorant Garamond Fallback") that prevent layout shift when the fonts swap in. Every `font-family` stack names the fallback face right after the web font.
  - Hebrew pages use Noto Serif Hebrew (text) and Frank Ruhl Libre (headings), Hebrew-subset woff2 files with fallback faces built on Times New Roman. The stacks live in the custom properties `--font-text` and `--font-display`, which `[lang="he"]` switches to the Hebrew faces: write `font-family: var(--font-text)` / `var(--font-display)`, not a literal stack.
  - Hebrew pages are `dir="rtl"`: use logical properties (`margin-inline-start`, `text-align: start`, `border-inline-start`, …) rather than left/right.

All links except those on the 404 page are relative (`../site.css`, `камера104.html`), so the site works both at a Vercel root and under `/MoiseyKoretz/` on GitHub Pages. Keep them relative. External links open in the same tab (no `target="_blank"`).

## Translations

- `src/en/` and `src/he/` mirror the Russian tree: `src/en/index.html` and `src/en/pages/<same file name>.html` are published at `en/index.html` and `en/pages/<same file name>.html` (likewise `he/`). Every Russian page has a copy in both languages, at the same file name.
- A translated page has the same front matter as its Russian page (`title`, `description`, `section`, `mainClass`; `headStyle` on the home page), translated, and its body is the translated inner HTML of `<main>`.
- Their defaults (`lang`, layout, permalink, relative paths, skip link label) come from `src/en/en.11tydata.js` (home) and `src/en/pages/pages.11tydata.js` (pages), likewise for `he`. The layout sets `<html lang>` and, for Hebrew, `dir="rtl"`.
- Page links in the bodies (`камера104.html`, `pages/x.html` on home) are the same as in Russian and work as is. Asset links (`../images/…`, `images/…`) are also written as in Russian, i.e. relative to the Russian location; the `translated-asset-paths` transform in `lib/i18n.js` adds one `../` to every relative non-`.html` `src`, `href` and `srcset` inside `<main>` of en/he pages. Write bodies as if they were in the Russian location.
- `scripts/sync-upstream.mjs` merges upstream edits (`michaelko58/MoiseyKoretz`) into `src/`, the Russian pages and the translations in `src/en/` and `src/he/`.
- When you change a Russian page's markup (structure, classes, images, links, neighbour links, anchors), mirror the change in its `src/en/` and `src/he/` copies. When you add or remove a page, do it in all three languages.

## A page

```html
---
title: "Камера 104"
description: "…"
section: "works"          # key from nav.json; leave out for pages not in a section (e.g. the 1935/1938 case files)
mainClass: "verse"        # verse | prose | prose wide
---

      <h1>Камера 104</h1>
<p class="verse">…</p>
```

- The body is the exact inner HTML of `<main>`. Title and description are stored already HTML-escaped and output as-is.
- **Page bodies are never run through a template engine** (`htmlTemplateEngine: false` in `eleventy.config.js`), so archive text containing `{{` or `{%` is safe. Template logic belongs in `.njk` layouts and includes.

Body conventions by `mainClass`:
- `verse` (poems): each line is its own `<p class="verse">`. A stanza break is `<p class="verse stanza">` or the separator `<p class="item" aria-hidden="true">-----</p>`. Optional lines are `p.dedicate` (dedication), `p.desc` (e.g. a «Музыкальное исполнение» YouTube link) and `p.year` (the date, at the bottom).
- `prose` (letters, essays, documents): `p.intro`, `p.toc`, footnotes (`a.fn` → `ol.footnotes` with `a.back`).
- Archive document pages (interrogations, case files) use `p.jump` page anchors, then one `<article class="doc" id="pNN">` per scanned page. Each article holds an `<h2>`, a `<figure>` with the scan and a `<div class="transcript">` with the verbatim typed transcription (`white-space: pre-wrap`). `.shaky` marks uncertain readings.

## Neighbour links

Pages in a sequence (poems in Творчество, letters, chapters) end with `<p class="continue neighbors"><a href="prev.html">Prev</a><a class="next" href="next.html">Next</a></p>`, written by hand in the body. When you remove, add or reorder a page, also fix the neighbour links on the pages before and after it. Also update the index page that lists it: `стихиразныхлет.html` (years as `h2.year`, poems in `ul.toc`), `pisma_main.html` for the letters, or `документы.html`. Letters also carry an «К оглавлению» link between prev and next.

The first image on a page should not be `loading="lazy"` and should have `fetchpriority="high"`. Later images stay lazy. Run `npm test` to catch broken or orphaned links.

## Content conventions

- The text is historical source material. Keep the original spelling, punctuation and typos in poems, letters and transcripts unless asked to correct them. Edits are usually small and targeted.
- Commit messages are one plain English sentence describing the content change, with Russian titles in «guillemets». For example: `Remove the stanza number from «Из Гейне».`
