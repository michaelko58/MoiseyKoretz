import i18n from "./lib/i18n.js";
import responsiveImages from "./lib/responsive-images.js";
import siteUrls from "./lib/site-urls.js";

export default function (eleventyConfig) {
  for (const path of ["images", "fonts", "site.css", "favicon.svg", ".nojekyll"]) {
    eleventyConfig.addPassthroughCopy({ [path]: path });
  }

  // English and Hebrew pages under en/ and he/: langStem/inLang filters, and asset paths in their bodies
  // moved one directory deeper. Added before responsive-images so its transform sees the corrected paths.
  eleventyConfig.addPlugin(i18n);
  // Resized WebP/JPEG copies of the scans on the home and Фотографии pages.
  eleventyConfig.addPlugin(responsiveImages);
  // absoluteUrl filter for canonical, Open Graph and sitemap URLs.
  eleventyConfig.addPlugin(siteUrls);
}

export const config = {
  dir: { input: "src", output: "_site" },
  // Page bodies are plain HTML from the archive; never run them through a template engine.
  htmlTemplateEngine: false,
};
