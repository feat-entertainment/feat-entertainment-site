# -*- coding: utf-8 -*-
"""
Extract 案3 (option 3) artwork from feat.Entertainment-Logo-v2.ai and produce
web-ready assets in public/images/, app/icon.png, app/apple-icon.png and
public/og-image.png, recolored to the site's brand tokens
(Navy #0a2342 / Teal #0f9eae, defined in app/globals.css).

feat.Entertainment-Logo-v2.ai is PDF-compatible (Illustrator default) and
its single page is a comp sheet with 案1/2/3 for both "アプリアイコン" and
"ロゴ" side by side. The pixel offsets below were measured against that
specific layout (see feat.Entertainment-Logo-v2-reference.pdf for a visual
guide) — if the source .ai is redesigned or re-laid-out, re-measure the
crop boxes rather than assume these offsets still line up.

Requires: pip install pymupdf pillow numpy
"""
import os
import numpy as np
import pymupdf as fitz
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
SITE_ROOT = os.path.dirname(HERE)
AI_PATH = os.path.join(HERE, "feat.Entertainment-Logo-v2.ai")

SITE_NAVY = (10, 35, 66)
SITE_TEAL = (15, 158, 174)

# colors as authored in the source artwork (sampled from the render)
SRC_INK = (35, 24, 21)     # near-black dot/f/line, on white panels
SRC_TEAL = (8, 151, 156)
SRC_NAVY = (0, 32, 99)     # navy fill of reversed panels / app icon

# Content bounds for 案3, inset from the comp sheet's reference border box,
# measured at 4x render scale (see render() below).
WHITE_TOP, WHITE_BOTTOM, LEFT, RIGHT = 576, 816, 1186, 1688
NAVY_TOP, NAVY_BOTTOM = 876, 1116
TEXT_GAP_WHITE = 740   # split row between icon glyph and wordmark text
TEXT_GAP_NAVY = 1030
APP_ICON_BOX = (1410, 255, 1615, 430)  # left, top, right, bottom


def render(path, scale=4):
    doc = fitz.open(path)
    page = doc[0]
    pix = page.get_pixmap(matrix=fitz.Matrix(scale, scale), alpha=True)
    arr = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, pix.n)
    if pix.n == 3:
        alpha = np.full((pix.height, pix.width, 1), 255, dtype=np.uint8)
        arr = np.dstack([arr, alpha])
    return arr


def crop_bbox(rgba, pad_ratio=0.08, min_alpha=20):
    alpha = rgba[:, :, 3]
    ys, xs = np.where(alpha > min_alpha)
    y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
    h, w = y1 - y0, x1 - x0
    py, px = max(1, int(h * pad_ratio)), max(1, int(w * pad_ratio))
    y0 = max(0, y0 - py); y1 = min(rgba.shape[0] - 1, y1 + py)
    x0 = max(0, x0 - px); x1 = min(rgba.shape[1] - 1, x1 + px)
    return rgba[y0:y1 + 1, x0:x1 + 1].copy()


def recolor(rgba, mapping, tol=70):
    out = rgba.copy()
    rgb = out[:, :, :3].astype(np.int16)
    for src, target in mapping:
        dist = np.abs(rgb - np.array(src)).sum(axis=2)
        mask = (dist < tol) & (out[:, :, 3] > 0)
        out[mask, 0] = target[0]; out[mask, 1] = target[1]; out[mask, 2] = target[2]
    return out


def punch_out(rgba, color, tol=60):
    out = rgba.copy()
    rgb = out[:, :, :3].astype(np.int16)
    dist = np.abs(rgb - np.array(color)).sum(axis=2)
    out[dist < tol, 3] = 0
    return out


def optimize_save(rgba, path, max_w=900):
    im = Image.fromarray(rgba, "RGBA")
    if im.width > max_w:
        ratio = max_w / im.width
        im = im.resize((max_w, int(im.height * ratio)), Image.LANCZOS)
    q = im.quantize(colors=24, method=Image.FASTOCTREE, dither=Image.NONE)
    q.save(path, optimize=True)
    return im.size


def main():
    full = render(AI_PATH)
    images_dir = os.path.join(SITE_ROOT, "public", "images")
    os.makedirs(images_dir, exist_ok=True)

    # Full logo (icon + wordmark), navy ink on transparent
    crop = full[WHITE_TOP:WHITE_BOTTOM, LEFT:RIGHT].copy()
    crop = recolor(crop, [(SRC_INK, SITE_NAVY), (SRC_TEAL, SITE_TEAL)])
    crop = crop_bbox(crop)
    size = optimize_save(crop, os.path.join(images_dir, "logo-full-navy.png"))
    print("logo-full-navy.png", size)

    # Full logo, white ink on transparent (for use on navy backgrounds)
    crop = full[NAVY_TOP:NAVY_BOTTOM, LEFT:RIGHT].copy()
    crop = punch_out(crop, SRC_NAVY)
    crop = recolor(crop, [(SRC_TEAL, SITE_TEAL)])
    crop = crop_bbox(crop)
    size = optimize_save(crop, os.path.join(images_dir, "logo-full-white.png"))
    print("logo-full-white.png", size)

    # Icon mark only (dot-f-line-dot, no wordmark)
    crop = full[WHITE_TOP:TEXT_GAP_WHITE, LEFT:RIGHT].copy()
    crop = recolor(crop, [(SRC_INK, SITE_NAVY), (SRC_TEAL, SITE_TEAL)])
    crop = crop_bbox(crop, pad_ratio=0.10)
    size = optimize_save(crop, os.path.join(images_dir, "logo-mark-navy.png"))
    print("logo-mark-navy.png", size)

    crop = full[NAVY_TOP:TEXT_GAP_NAVY, LEFT:RIGHT].copy()
    crop = punch_out(crop, SRC_NAVY)
    crop = recolor(crop, [(SRC_TEAL, SITE_TEAL)])
    crop = crop_bbox(crop, pad_ratio=0.10)
    size = optimize_save(crop, os.path.join(images_dir, "logo-mark-white.png"))
    print("logo-mark-white.png", size)

    # App icon (rounded square, navy fill) -> favicon / apple-icon sizes
    x0, y0, x1, y1 = APP_ICON_BOX
    crop = full[y0:y1, x0:x1].copy()
    crop = recolor(crop, [(SRC_NAVY, SITE_NAVY), (SRC_TEAL, SITE_TEAL)])
    crop = crop_bbox(crop, pad_ratio=0.02)
    icon_src = Image.fromarray(crop, "RGBA")

    for size, filename, out_dir in [
        (512, "icon.png", os.path.join(SITE_ROOT, "app")),
        (180, "apple-icon.png", os.path.join(SITE_ROOT, "app")),
    ]:
        icon_src.resize((size, size), Image.LANCZOS).save(os.path.join(out_dir, filename))
        print(filename, size)

    # OG image
    og = Image.new("RGBA", (1200, 630), (*SITE_NAVY, 255))
    draw = ImageDraw.Draw(og)
    logo_full_white = Image.open(os.path.join(images_dir, "logo-full-white.png")).convert("RGBA")
    scale = 420 / logo_full_white.width
    logo_small = logo_full_white.resize(
        (int(logo_full_white.width * scale), int(logo_full_white.height * scale)), Image.LANCZOS
    )
    og.alpha_composite(logo_small, (80, 80))

    font_path = r"C:\Windows\Fonts\NotoSansJP-VF.ttf"
    font_main = ImageFont.truetype(font_path, 54)
    font_sub = ImageFont.truetype(font_path, 30)
    draw.text((80, 260), "主役は、私たちではありません。", font=font_main, fill=(255, 255, 255, 255))
    draw.text((80, 340), "暮らしを少し、もっと豊かに。", font=font_sub, fill=(210, 224, 235, 255))
    draw.text((80, 560), "feat.Entertainment合同会社", font=font_sub, fill=(*SITE_TEAL, 255))
    og.convert("RGB").save(os.path.join(SITE_ROOT, "public", "og-image.png"), quality=92)
    print("og-image.png")

    print("DONE")


if __name__ == "__main__":
    main()
