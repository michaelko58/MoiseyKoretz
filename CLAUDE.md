# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Russian-language family memorial site about Моисей Абрамович Корец (1908–1984): his life, letters, poems, case files and photos. It is plain static HTML served by GitHub Pages (`.nojekyll`). There is no build step, package manager, linter or test suite.

To preview it, open `index.html` in a browser, or run `python3 -m http.server` from the repo root. When a PR is opened, `.github/workflows/pr-preview.yml` comments a raw.githack.com preview link for the branch. The workflow builds the URL and never checks out the PR's code.

## Structure

- `index.html` is the home page. Its page-specific styles are inline in its `<style>` block, and the shared look comes from `site.css`.
- `pages/*.html` holds every other page, flat (133 files). Most filenames are Cyrillic titles with spaces and punctuation removed, e.g. `камера104.html` and `допросдавидаландау.html`. Older ones are transliterated, e.g. `pisma1.html` and `ufti3.html`. Links use the raw Cyrillic filenames, not percent-encoding.
- `site.css` is the single shared stylesheet. Colors are CSS variables on `:root` (`--paper`, `--ink`, `--seal`, …).
- `images/site/` holds scans and photos. Archive scans are numbered (`0003.jpg`, …), and pages reference them as `../images/site/NNNN.jpg`.

## Page template (duplicated in every page)

No templating system exists, so every page in `pages/` repeats the same boilerplate: the `<head>` (Google Fonts Cormorant Garamond + Literata, `../favicon.svg`, `../site.css`), the skip link, `.sheet`, and a `<header>` with the brand link, the section `<nav>` and an inline scroll script. **A change to the nav or header has to be made in all 133 pages plus `index.html`**, usually with a scripted find-and-replace across `pages/*.html`. Afterwards, check with `grep` that every file changed.

The nav has six sections: Жизнь, Письма, Творчество (`стихиразныхлет.html`), Фотографии, Воспоминания, Документы и публикации. On each page, the link for the section that page belongs to has `aria-current="page"`. Keep that marker when you add or edit pages.

`<main id="text">` takes one of three classes:
- `verse` (poems): each line is its own `<p class="verse">`. A stanza break is `<p class="verse stanza">` or a separator `<p class="item">-----</p>`. Optional lines are `p.dedicate` (dedication), `p.desc` (e.g. a «Музыкальное исполнение» YouTube link) and `p.year` (the date, at the bottom).
- `prose` (letters, essays, documents): `p.intro`, `p.toc`, footnotes (`a.fn` → `ol.footnotes` with `a.back`).
- `prose wide`: wider layout.

Archive document pages (interrogations, case files) use `p.jump` page anchors, then one `<article class="doc" id="pNN">` per scanned page. Each article holds an `<h2>`, a `<figure>` with the scan and a `<div class="transcript">` with the verbatim typed transcription (whitespace preserved). `.shaky` marks uncertain readings.

## Neighbour links

Pages in a sequence (poems in Творчество, letters, chapters) end with `<p class="continue neighbors"><a href="prev.html">Prev</a><a class="next" href="next.html">Next</a></p>`. When you remove, add or reorder a page, also fix the neighbour links on the pages before and after it. Also update the index page that lists it (e.g. `стихиразныхлет.html`, `письма.html`, `документы.html`).

## Content conventions

- The text is historical source material. Keep the original spelling, punctuation and typos in poems, letters and transcripts unless asked to correct them. Edits are usually small and targeted, e.g. restoring a missing opening line or moving a date.
- Each page has `<meta name="description">`, made from its title plus the opening text.
- Commit messages are one plain English sentence describing the content change, with Russian titles in «guillemets». For example: `Remove the stanza number from «Из Гейне».`
