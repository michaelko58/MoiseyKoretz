// Absolute, percent-encoded URLs for canonical links, Open Graph and the sitemap.
// Eleventy's page.url keeps Cyrillic file names as-is; new URL() encodes them.
export default function siteUrls(eleventyConfig) {
  eleventyConfig.addFilter("absoluteUrl", (url, base) => new URL(url, base).href);
}
