// Defaults for every page in pages/; a page's own front matter overrides them.
export default {
  layout: "base.njk",
  root: "../",
  navPrefix: "",
  brandHref: "../index.html",
  skipTarget: "text",
  skipLabel: "К тексту",
  mainId: "text",
  // Keep each page at its old address, pages/<same file name>.html.
  permalink: (data) => `${data.page.filePathStem}.html`,
};
