// Build-time thumbnails for the two image-heavy pages (home and Фотографии), in every language.
// Each local <img src="…images/….jpg"> on those pages gets a srcset of resized
// JPEG copies in _site/img/ (content-hashed file names), wrapped in a <picture>
// with WebP copies where WebP is clearly smaller.
// Alt text, width/height, loading and the surrounding <a href> to the
// full-size scan are left exactly as written in the page source.
import path from "node:path";
import Image from "@11ty/eleventy-img";

const PAPER_SIZES = "(max-width: 800px) calc(100vw - 2.5rem), 680px";
const GALLERY_SIZES = "(max-width: 495px) calc(100vw - 2.5rem), (max-width: 800px) calc(50vw - 1.75rem), 300px";

// Page input path → how to size its images (first matching rule wins).
const PAGES = {
  "./src/index.html": [
    { match: /^images\/moisey\.jpg$/, widths: [544], sizes: "(max-width: 800px) 260px, 320px" },
    { match: /^images\/site\//, widths: [700, 1400], sizes: PAPER_SIZES },
  ],
  "./src/pages/фотографии.html": [
    { match: /^images\/site\//, widths: [360, 720], sizes: GALLERY_SIZES },
  ],
};
// The English and Hebrew copies of those pages get the same thumbnails.
for (const lang of ["en", "he"]) {
  PAGES[`./src/${lang}/index.html`] = PAGES["./src/index.html"];
  PAGES[`./src/${lang}/pages/фотографии.html`] = PAGES["./src/pages/фотографии.html"];
}

const IMAGE_OPTIONS = {
  formats: ["webp", "jpeg"],
  sharpWebpOptions: { quality: 78 },
  sharpJpegOptions: { quality: 78, mozjpeg: true },
};

const srcset = (list) => list.map((f) => `${f.url} ${f.width}w`).join(", ");

export default function responsiveImages(eleventyConfig) {
  eleventyConfig.addTransform("responsive-images", async function (content) {
    const rules = PAGES[this.page.inputPath];
    if (!rules || !this.page.outputPath?.endsWith(".html")) return content;

    // Relative prefix back to the site root, e.g. "" for /, "../" for /pages/x.html or /en/.
    const dir = this.page.url.endsWith("/") ? this.page.url : path.posix.dirname(this.page.url);
    const root = "../".repeat(dir.split("/").filter(Boolean).length);
    const outDir = path.join(eleventyConfig.directories.output, "img");

    const tags = [...new Set(content.match(/<img\b[^>]*>/g) ?? [])];
    const replacements = new Map();
    await Promise.all(tags.map(async (tag) => {
      const src = tag.match(/\ssrc="([^"]+)"/)?.[1];
      if (!src || !src.startsWith(root) || !src.endsWith(".jpg")) return;
      const file = path.posix.normalize(src.slice(root.length));
      const rule = rules.find((r) => r.match.test(file));
      if (!rule) return;

      const meta = await Image(file, { ...IMAGE_OPTIONS, widths: rule.widths, urlPath: `${root}img/`, outputDir: outDir });
      const jpeg = meta.jpeg, webp = meta.webp;
      const sizes = rule.sizes;
      const img = tag.replace(/\ssrc="[^"]+"/,
        ` src="${jpeg.at(-1).url}" srcset="${srcset(jpeg)}" sizes="${sizes}"`);
      // Noisy typed scans often compress worse as WebP; offer WebP only where it is clearly smaller.
      const webpWins = webp.every((w, i) => w.size < 0.9 * jpeg[i].size);
      replacements.set(tag, webpWins
        ? `<picture><source type="image/webp" srcset="${srcset(webp)}" sizes="${sizes}">${img}</picture>`
        : img);
    }));

    return content.replace(/<img\b[^>]*>/g, (tag) => replacements.get(tag) ?? tag);
  });
}
