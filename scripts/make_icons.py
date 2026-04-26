"""Generate simple PWA icons (no external deps).

Renders a rounded-square background with a stylized 'W' (workout)
in white. Produces 180/192/512 PNGs needed for iOS + Android PWAs.
"""

import os
import struct
import zlib

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "icons")

BG = (15, 23, 42)        # slate-900
ACCENT = (251, 146, 60)  # orange-400
WHITE = (255, 255, 255)


def rounded_square_mask(size, radius):
    """Return a 2D list of bools: True = inside rounded square."""
    mask = [[False] * size for _ in range(size)]
    r2 = radius * radius
    for y in range(size):
        for x in range(size):
            inside = True
            if x < radius and y < radius:
                dx, dy = radius - x, radius - y
                inside = dx * dx + dy * dy <= r2
            elif x >= size - radius and y < radius:
                dx, dy = x - (size - radius - 1), radius - y
                inside = dx * dx + dy * dy <= r2
            elif x < radius and y >= size - radius:
                dx, dy = radius - x, y - (size - radius - 1)
                inside = dx * dx + dy * dy <= r2
            elif x >= size - radius and y >= size - radius:
                dx, dy = x - (size - radius - 1), y - (size - radius - 1)
                inside = dx * dx + dy * dy <= r2
            mask[y][x] = inside
    return mask


def draw_dumbbell(pixels, size):
    """Draw a simple dumbbell silhouette in white."""
    cx, cy = size // 2, size // 2
    bar_h = max(2, size // 14)
    bar_w = size // 2
    # bar
    for y in range(cy - bar_h // 2, cy + bar_h // 2 + 1):
        for x in range(cx - bar_w // 2, cx + bar_w // 2 + 1):
            pixels[y][x] = WHITE
    # weights (two stacked rectangles each side)
    weight_w = size // 10
    inner_h = size // 3
    outer_h = size // 2
    for sign in (-1, 1):
        bx = cx + sign * (bar_w // 2)
        # inner plate
        for y in range(cy - inner_h // 2, cy + inner_h // 2 + 1):
            for x in range(bx - weight_w if sign > 0 else bx,
                           bx if sign > 0 else bx + weight_w):
                if 0 <= x < size:
                    pixels[y][x] = WHITE
        # outer plate
        ox = bx + sign * weight_w
        for y in range(cy - outer_h // 2, cy + outer_h // 2 + 1):
            for x in range(ox - weight_w if sign > 0 else ox,
                           ox if sign > 0 else ox + weight_w):
                if 0 <= x < size:
                    pixels[y][x] = WHITE
        # accent cap
        cap_x = ox + sign * weight_w
        for y in range(cy - outer_h // 2, cy + outer_h // 2 + 1):
            for x in range(cap_x - max(2, weight_w // 3) if sign > 0 else cap_x,
                           cap_x if sign > 0 else cap_x + max(2, weight_w // 3)):
                if 0 <= x < size:
                    pixels[y][x] = ACCENT


def write_png(path, size):
    radius = size // 5
    mask = rounded_square_mask(size, radius)
    pixels = [[BG if mask[y][x] else (0, 0, 0) for x in range(size)]
              for y in range(size)]
    draw_dumbbell(pixels, size)

    # Build raw RGBA bytes (transparent outside mask)
    raw = bytearray()
    for y in range(size):
        raw.append(0)  # filter type 0
        for x in range(size):
            r, g, b = pixels[y][x]
            a = 255 if mask[y][x] else 0
            raw.extend((r, g, b, a))

    def chunk(tag, data):
        return (struct.pack(">I", len(data)) + tag + data
                + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF))

    sig = b"\x89PNG\r\n\x1a\n"
    ihdr = struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0)
    idat = zlib.compress(bytes(raw), 9)
    png = sig + chunk(b"IHDR", ihdr) + chunk(b"IDAT", idat) + chunk(b"IEND", b"")
    with open(path, "wb") as f:
        f.write(png)


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    for name, size in [
        ("apple-touch-icon.png", 180),
        ("icon-192.png", 192),
        ("icon-512.png", 512),
        ("favicon.png", 64),
    ]:
        path = os.path.join(OUT_DIR, name)
        write_png(path, size)
        print(f"wrote {path}")


if __name__ == "__main__":
    main()
