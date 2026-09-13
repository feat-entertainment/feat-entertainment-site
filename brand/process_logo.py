# -*- coding: utf-8 -*-
"""Process feat.Entertainment logo into web-ready assets."""
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import os

SRC = r"E:\Claude\apps\feat-entertainment-site\feat.Entertainment-Logo.png"
OUT_DIR = r"E:\Claude\apps\feat-entertainment-site\assets_generated"
os.makedirs(OUT_DIR, exist_ok=True)

NAVY = (10, 35, 66)       # #0A2342 extracted from logo
TEAL = (15, 158, 174)     # #0F9EAE extracted from logo
BG_REF = (254, 254, 254)  # source background

im = Image.open(SRC).convert("RGB")
arr = np.array(im).astype(np.float32)


def to_transparent(rgb_arr, bg=BG_REF):
    bg_a = np.array(bg, dtype=np.float32)
    diff = np.abs(rgb_arr - bg_a)
    alpha = diff.max(axis=2)
    alpha = np.clip(alpha * 1.18, 0, 255)
    alpha_norm = np.clip(alpha / 255.0, 0.0008, 1.0)[..., None]
    fg = bg_a + (rgb_arr - bg_a) / alpha_norm
    fg = np.clip(fg, 0, 255)
    out = np.dstack([fg, alpha]).astype(np.uint8)
    return out


rgba = to_transparent(arr)  # H,W,4 navy+teal marks, transparent bg


def crop_bbox(rgba_arr, pad_ratio=0.10):
    alpha = rgba_arr[:, :, 3]
    ys, xs = np.where(alpha > 10)
    y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
    h = y1 - y0
    w = x1 - x0
    pad_y = int(h * pad_ratio)
    pad_x = int(w * pad_ratio)
    y0 = max(0, y0 - pad_y)
    y1 = min(rgba_arr.shape[0] - 1, y1 + pad_y)
    x0 = max(0, x0 - pad_x)
    x1 = min(rgba_arr.shape[1] - 1, x1 + pad_x)
    return rgba_arr[y0:y1 + 1, x0:x1 + 1]


def recolor_navy_to_white(rgba_arr, navy=NAVY, teal=TEAL, tol=40):
    out = rgba_arr.copy()
    rgb = out[:, :, :3].astype(np.int16)
    navy_dist = np.abs(rgb - np.array(navy)).sum(axis=2)
    is_navy = navy_dist < tol
    out[is_navy, 0] = 255
    out[is_navy, 1] = 255
    out[is_navy, 2] = 255
    return out


# --- Full lockup (icon + wordmark), rows ~115-615 already includes both ---
full_navy = crop_bbox(rgba, pad_ratio=0.08)
Image.fromarray(full_navy, "RGBA").save(os.path.join(OUT_DIR, "logo-full-navy.png"))

full_white = recolor_navy_to_white(full_navy)
Image.fromarray(full_white, "RGBA").save(os.path.join(OUT_DIR, "logo-full-white.png"))

# --- Icon-only mark (dot - f - line - dot), rows 115-465 in original coords ---
icon_rgba = rgba[95:485, :, :]
icon_navy = crop_bbox(icon_rgba, pad_ratio=0.06)
Image.fromarray(icon_navy, "RGBA").save(os.path.join(OUT_DIR, "logo-mark-navy.png"))

icon_white = recolor_navy_to_white(icon_navy)
Image.fromarray(icon_white, "RGBA").save(os.path.join(OUT_DIR, "logo-mark-white.png"))

# --- Compact mark (left dot + f only) for favicon source, cols ~470-1070 ---
compact_rgba = rgba[95:485, 470:1075, :]
compact = crop_bbox(compact_rgba, pad_ratio=0.10)
compact_white = recolor_navy_to_white(compact)
Image.fromarray(compact, "RGBA").save(os.path.join(OUT_DIR, "logo-compact-navy.png"))
Image.fromarray(compact_white, "RGBA").save(os.path.join(OUT_DIR, "logo-compact-white.png"))

print("Base assets exported to", OUT_DIR)
print("full_navy size", full_navy.shape)
print("icon_navy size", icon_navy.shape)
print("compact size", compact.shape)
