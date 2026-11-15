// English and Hebrew copies of the site live under en/ and he/, at the same paths as the Russian pages.
//
// Filters for the layout and sitemap:
//   langStem(url)       the page's path without the language prefix: "index.html" or "pages/x.html".
//   inLang(url, code)   the same page's path in language code, e.g. "en/pages/x.html" (no leading slash),
//                       for relative links: root + inLang.
//   langUrl(url, code)  the same page's URL in the form Eleventy gives page.url ("/en/", "/en/pages/x.html"),
//                       for canonical-style absolute URLs: langUrl | absoluteUrl.
//
// Transform: translated page bodies are copied verbatim from the Russian layout, so their asset links
// ("../images/…", "images/…") are relative to the Russian location, one directory too shallow.
// For en/ and he/ pages, every relative src/href/srcset inside <main> that does not point at a page
// (.html) gets one more "../". The layout's own links already use the right `root`.
export function langStem(url) {
  let stem = url.replace(/^\/(en|he)\//, "/").replace(/^\//, "");
  if (stem === "" || stem.endsWith("/")) stem += "index.html";
  return stem;
}

export function inLang(url, code) {
  const stem = langStem(url);
  return code === "ru" ? stem : `${code}/${stem}`;
}

export function langUrl(url, code) {
  return `/${inLang(url, code)}`.replace(/(^|\/)index\.html$/, "$1");
}

const isAsset = (ref) => {
  if (!ref || ref.startsWith("#") || ref.startsWith("/") || /^[a-z][a-z0-9+.-]*:/i.test(ref)) return false;
  return !/\.html$/i.test(ref.split(/[?#]/)[0]);
};
const deepen = (ref) => (isAsset(ref) ? `../${ref}` : ref);

export function deepenAssets(html) {
  return html.replace(/(<main\b[^>]*>)([\s\S]*)(<\/main>)/, (_, open, body, close) =>
    open +
    body.replace(/(\s(?:src|href|srcset|poster)=")([^"]*)"/g, (m, attr, value) =>
      attr.endsWith('srcset="')
        ? `${attr}${value.split(",").map((c) => c.replace(/^(\s*)(\S+)/, (_, ws, u) => ws + deepen(u))).join(",")}"`
        : `${attr}${deepen(value)}"`) +
    close);
}

export default function i18n(eleventyConfig) {
  eleventyConfig.addFilter("langStem", langStem);
  eleventyConfig.addFilter("inLang", inLang);
  eleventyConfig.addFilter("langUrl", langUrl);

  // Must run before responsive-images, which expects image paths relative to the output page.
  eleventyConfig.addTransform("translated-asset-paths", function (content) {
    if (!/^\/(en|he)\//.test(this.page.url ?? "") || !this.page.outputPath?.endsWith(".html")) return content;
    return deepenAssets(content);
  });
}
