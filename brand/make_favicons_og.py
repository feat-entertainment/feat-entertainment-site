# -*- coding: utf-8 -*-
from PIL import Image, ImageDraw, ImageFont
import os

GEN = r"E:\Claude\apps\feat-entertainment-site\assets_generated"
NAVY = (10, 35, 66, 255)
TEAL = (15, 158, 174, 255)

compact_white = Image.open(os.path.join(GEN, "logo-compact-white.png")).convert("RGBA")


def make_favicon(size, filename, pad_ratio=0.30):
    canvas = Image.new("RGBA", (size, size), NAVY)
    max_w = int(size * (1 - pad_ratio))
    scale = max_w / compact_white.width
    new_h = int(compact_white.height * scale)
    # avoid overly tall scaling beyond canvas
    if new_h > max_w:
        scale = max_w / compact_white.height
        new_h = max_w
    resized = compact_white.resize((int(compact_white.width * scale), int(compact_white.height * scale)), Image.LANCZOS)
    x = (size - resized.width) // 2
    y = (size - resized.height) // 2
    canvas.alpha_composite(resized, (x, y))
    canvas.save(os.path.join(GEN, filename))


for size, name in [(32, "icon-32.png"), (48, "icon-48.png"), (192, "icon-192.png"),
                    (512, "icon-512.png"), (180, "apple-icon-180.png")]:
    make_favicon(size, name)

# --- OG image 1200x630 ---
OG_W, OG_H = 1200, 630
og = Image.new("RGBA", (OG_W, OG_H), NAVY)
draw = ImageDraw.Draw(og)

logo_full_white = Image.open(os.path.join(GEN, "logo-full-white.png")).convert("RGBA")
scale = 420 / logo_full_white.width
lw = int(logo_full_white.width * scale)
lh = int(logo_full_white.height * scale)
logo_small = logo_full_white.resize((lw, lh), Image.LANCZOS)
og.alpha_composite(logo_small, (80, 80))

font_path = r"C:\Windows\Fonts\NotoSansJP-VF.ttf"
try:
    font_main = ImageFont.truetype(font_path, 54)
    font_sub = ImageFont.truetype(font_path, 30)
except Exception as e:
    print("font load failed", e)
    font_main = ImageFont.load_default()
    font_sub = font_main

draw.text((80, 260), "主役は、私たちではありません。", font=font_main, fill=(255, 255, 255, 255))
draw.text((80, 340), "暮らしを少し、もっと豊かに。", font=font_sub, fill=(210, 224, 235, 255))
draw.text((80, 560), "feat.Entertainment合同会社", font=font_sub, fill=TEAL)

og.convert("RGB").save(os.path.join(GEN, "og-image.png"), quality=92)

print("done")
