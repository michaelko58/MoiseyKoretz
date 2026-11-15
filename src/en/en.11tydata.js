// Defaults for the English site: en/index.html, and (with pages/pages.11tydata.js on top) en/pages/.
// Translated pages mirror the Russian ones one directory deeper, at the same file names.
export default {
  lang: "en",
  layout: "base.njk",
  root: "../",
  navPrefix: "pages/",
  brandHref: "#top",
  skipTarget: "top",
  skipLabel: "To the contents",
  mainId: "top",
  permalink: (data) => `${data.page.filePathStem}.html`,
};
