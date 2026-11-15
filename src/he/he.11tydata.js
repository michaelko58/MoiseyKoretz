// Defaults for the Hebrew site: he/index.html, and (with pages/pages.11tydata.js on top) he/pages/.
// Translated pages mirror the Russian ones one directory deeper, at the same file names.
export default {
  lang: "he",
  layout: "base.njk",
  root: "../",
  navPrefix: "pages/",
  brandHref: "#top",
  skipTarget: "top",
  skipLabel: "אל התוכן",
  mainId: "top",
  permalink: (data) => `${data.page.filePathStem}.html`,
};
