# -*- coding: utf-8 -*-
"""
Extract the wordmark logo AND the app-icon panel from
feat.Entertainment-Logo-v3.svg (native vector, provided 2026-09-20) and
produce web-ready assets in public/images/, app/icon.png,
app/apple-icon.png and public/og-image.png, using the artwork's OWN
authored colors as-is (not recolored to the site's UI brand tokens) — per
explicit user instruction (2026-09-20): "ロゴ画像のみこのSVGの色で作り直し、
サイトUI(ボタン・見出しなど)の色は現状のまま", extended on the same day to
cover the favicon too ("faviconも渡したSVGにあるものに変更して"). Site UI
tokens (buttons, headings, Philosophy background, ...) are unaffected and
remain Navy #0a2342 / Teal #0f9eae (app/globals.css).

The favicon/app-icon uses this SVG's white-background app-icon panel as-is
(rounded square, white fill, dark outline) — there is no navy-filled
variant in this source, so unlike the previous favicon it no longer has a
solid colored background; the corners outside the rounded square are made
transparent via a border flood-fill (the panel's outline and its white
interior fill are otherwise indistinguishable by color alone).

Two-step pipeline:
  1) `node brand/render_svg.mjs` rasterizes the SVG to brand/_render.png at
     high resolution (it's an Illustrator export of many clipPath-based
     glyph outlines — impractical to hand-edit as text).
  2) `python brand/extract_logo_v3.py` crops/recolors/optimizes from that
     render into the final site assets.

Requires: npm install playwright && npx playwright install chromium
          pip install pillow numpy
"""
import os
from collections import deque
import numpy as np
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
SITE_ROOT = os.path.dirname(HERE)
RENDER_PATH = os.path.join(HERE, "_render.png")

SITE_TEAL = (15, 158, 174)  # keep OG/text teal consistent with site tokens

# authored colors in this SVG (see feat.Entertainment-Logo-v3.svg)
SRC_INK = (35, 31, 32)      # #231f20 - dot / f / line / wordmark text
SRC_TEAL = (8, 151, 157)    # #08979d - accent dot
WHITE = (255, 255, 255)

# Wordmark (icon + "feat.Entertainment" text) bounding box, measured at
# render width 3200px against this specific SVG's layout. Re-measure via
# brand/render_svg.mjs + manual inspection if the source file changes.
WORDMARK_BOX = (1270, 605, 2480, 1180)  # left, top, right, bottom
TEXT_GAP_Y = 1010  # absolute row that splits the icon glyph from the wordmark text

# App-icon panel (rounded square) bounding box, same measurement basis as above.
APP_ICON_BOX = (283, 650, 797, 1164)  # left, top, right, bottom


def crop_bbox(rgba, pad_ratio=0.06):
    alpha = rgba[:, :, 3]
    ys, xs = np.where(alpha > 10)
    y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
    h, w = y1 - y0, x1 - x0
    py, px = max(1, int(h * pad_ratio)), max(1, int(w * pad_ratio))
    y0 = max(0, y0 - py); y1 = min(rgba.shape[0] - 1, y1 + py)
    x0 = max(0, x0 - px); x1 = min(rgba.shape[1] - 1, x1 + px)
    return rgba[y0:y1 + 1, x0:x1 + 1].copy()


def to_transparent(rgb_arr, bg=WHITE, boost=1.18):
    bg_a = np.array(bg, dtype=np.float32)
    diff = np.abs(rgb_arr.astype(np.float32) - bg_a)
    alpha = np.clip(diff.max(axis=2) * boost, 0, 255)
    alpha_norm = np.clip(alpha / 255.0, 0.0008, 1.0)[..., None]
    fg = bg_a + (rgb_arr.astype(np.float32) - bg_a) / alpha_norm
    fg = np.clip(fg, 0, 255)
    return np.dstack([fg, alpha]).astype(np.uint8)


def recolor(rgba, mapping, tol=70):
    out = rgba.copy()
    rgb = out[:, :, :3].astype(np.int16)
    for src, target in mapping:
        dist = np.abs(rgb - np.array(src)).sum(axis=2)
        mask = (dist < tol) & (out[:, :, 3] > 0)
        out[mask, 0] = target[0]; out[mask, 1] = target[1]; out[mask, 2] = target[2]
    return out


def flood_bg_mask(arr, white_tol=12):
    """Mark pixels connected to the image border through near-white color as
    background. Unlike a plain white color-key, this correctly leaves an
    enclosed white interior (e.g. the app-icon panel's own white fill)
    intact, since it isn't reachable from the border without crossing the
    dark outline stroke."""
    h, w, _ = arr.shape
    is_white = np.all(np.abs(arr.astype(np.int16) - 255) <= white_tol, axis=2)
    visited = np.zeros((h, w), dtype=bool)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if is_white[y, x] and not visited[y, x]:
                visited[y, x] = True
                q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if is_white[y, x] and not visited[y, x]:
                visited[y, x] = True
                q.append((x, y))
    while q:
        x, y = q.popleft()
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not visited[ny, nx] and is_white[ny, nx]:
                visited[ny, nx] = True
                q.append((nx, ny))
    return visited


def optimize_save(rgba, path, max_w=900):
    im = Image.fromarray(rgba, "RGBA")
    if im.width > max_w:
        ratio = max_w / im.width
        im = im.resize((max_w, int(im.height * ratio)), Image.LANCZOS)
    q = im.quantize(colors=24, method=Image.FASTOCTREE, dither=Image.NONE)
    q.save(path, optimize=True)
    return im.size


def main():
    full = np.array(Image.open(RENDER_PATH).convert("RGB"))
    images_dir = os.path.join(SITE_ROOT, "public", "images")
    x0, y0, x1, y1 = WORDMARK_BOX

    # --- full lockup (icon + wordmark text), authored ink color as-is ---
    word_rgb = full[y0:y1, x0:x1]
    rgba = to_transparent(word_rgb)
    rgba = crop_bbox(rgba)
    size = optimize_save(rgba, os.path.join(images_dir, "logo-full-navy.png"))
    print("logo-full-navy.png", size)

    # white-ink derivative for the site's navy Philosophy section (this SVG
    # only ships light/white-bg panels, so this variant is derived here)
    rgba_white = recolor(rgba, [(SRC_INK, WHITE)])
    size = optimize_save(rgba_white, os.path.join(images_dir, "logo-full-white.png"))
    print("logo-full-white.png", size)

    # --- icon mark only (dot-f-line-dot, no wordmark text) ---
    icon_rgb = full[y0:TEXT_GAP_Y, x0:x1]
    rgba_icon = to_transparent(icon_rgb)
    rgba_icon = crop_bbox(rgba_icon, pad_ratio=0.10)
    size = optimize_save(rgba_icon, os.path.join(images_dir, "logo-mark-navy.png"))
    print("logo-mark-navy.png", size)

    rgba_icon_white = recolor(rgba_icon, [(SRC_INK, WHITE)])
    size = optimize_save(rgba_icon_white, os.path.join(images_dir, "logo-mark-white.png"))
    print("logo-mark-white.png", size)

    # --- OG image (navy bg, white lockup, same layout as before) ---
    og = Image.new("RGBA", (1200, 630), (10, 35, 66, 255))
    draw = ImageDraw.Draw(og)
    # use just the icon mark (not the full wordmark-with-text lockup) so it
    # doesn't collide with the headline set below it
    logo_mark_white = Image.open(os.path.join(images_dir, "logo-mark-white.png")).convert("RGBA")
    scale = 260 / logo_mark_white.width
    logo_small = logo_mark_white.resize(
        (int(logo_mark_white.width * scale), int(logo_mark_white.height * scale)), Image.LANCZOS
    )
    og.alpha_composite(logo_small, (80, 70))
    font_path = r"C:\Windows\Fonts\NotoSansJP-VF.ttf"
    font_main = ImageFont.truetype(font_path, 54)
    font_sub = ImageFont.truetype(font_path, 30)
    draw.text((80, 260), "主役は、私たちではありません。", font=font_main, fill=(255, 255, 255, 255))
    draw.text((80, 340), "暮らしを少し、もっと豊かに。", font=font_sub, fill=(210, 224, 235, 255))
    draw.text((80, 560), "feat.Entertainment合同会社", font=font_sub, fill=(*SITE_TEAL, 255))
    og.convert("RGB").save(os.path.join(SITE_ROOT, "public", "og-image.png"), quality=92)
    print("og-image.png")

    # --- favicon / app icon: the SVG's white-bg rounded-square panel, as-is ---
    ax0, ay0, ax1, ay1 = APP_ICON_BOX
    icon_crop = full[ay0:ay1, ax0:ax1]
    bg_mask = flood_bg_mask(icon_crop)
    icon_alpha = np.where(bg_mask, 0, 255).astype(np.uint8)
    icon_rgba = np.dstack([icon_crop, icon_alpha])
    icon_rgba = crop_bbox(icon_rgba, pad_ratio=0.0)
    icon_src = Image.fromarray(icon_rgba, "RGBA")

    app_dir = os.path.join(SITE_ROOT, "app")
    for size, filename in [(512, "icon.png"), (180, "apple-icon.png")]:
        icon_src.resize((size, size), Image.LANCZOS).save(os.path.join(app_dir, filename))
        print(filename, size)

    print("DONE")


if __name__ == "__main__":
    main()
