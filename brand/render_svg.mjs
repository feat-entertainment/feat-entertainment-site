// Renders feat.Entertainment-Logo-v3.svg to a large raster PNG (brand/_render.png)
// for extract_logo_v3.py to crop/recolor from. The source is an Illustrator
// export made of many clipPath-based glyph outlines, impractical to hand-edit
// as text, so we rasterize at high resolution instead.
//
// Requires: npm install playwright  (or run once via: npx playwright ...)
//           npx playwright install chromium
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SVG_NAME = "feat.Entertainment-Logo-v3.svg";
const RENDER_WIDTH = 3200; // px, upscales the ~442pt-wide SVG for a crisp source

const wrapperPath = path.join(HERE, "_render_wrapper.html");
fs.writeFileSync(
  wrapperPath,
  `<!DOCTYPE html><html><head><style>html,body{margin:0;}img{display:block;width:${RENDER_WIDTH}px}</style></head><body><img src="${SVG_NAME}"></body></html>`
);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: RENDER_WIDTH, height: Math.round(RENDER_WIDTH * 0.7) } });
await page.goto("file:///" + wrapperPath.replace(/\\/g, "/"));
await page.waitForTimeout(300);
const box = await page.locator("img").boundingBox();
const height = Math.ceil(box.height) + 40;
await page.setViewportSize({ width: RENDER_WIDTH, height });
await page.waitForTimeout(150);
await page.screenshot({ path: path.join(HERE, "_render.png") });
await browser.close();
fs.unlinkSync(wrapperPath);
console.log("rendered brand/_render.png", RENDER_WIDTH, "x", height);
