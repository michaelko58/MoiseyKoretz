import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

// Content hashes for the layout's asset URLs (site.css?v=…). A deploy that changes site.css
// gets a new URL, so browsers never pair fresh HTML with a stale cached stylesheet.
const hash = (file) => createHash("sha256").update(readFileSync(file)).digest("hex").slice(0, 10);

export default {
  siteCss: hash("site.css"),
};
