"""Generate the workout app's PWA icons (no external deps).

Renders a rounded-square dark background with a stylized capital "W" in
light blue. Produces 180/192/512 PNGs needed for iOS + Android PWAs and
a 64px favicon.
"""

import os
import struct
import zlib

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "icons")

BG = (17, 17, 19)            # matches app --bg
LIGHT_BLUE = (96, 165, 250)  # tailwind blue-400


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


def stamp_disc(pixels, size, cx, cy, radius, color):
    r2 = radius * radius
    for dy in range(-radius, radius + 1):
        for dx in range(-radius, radius + 1):
            if dx * dx + dy * dy <= r2:
                x, y = int(cx + dx), int(cy + dy)
                if 0 <= x < size and 0 <= y < size:
                    pixels[y][x] = color


def draw_thick_line(pixels, size, p1, p2, color, thickness):
    x1, y1 = p1
    x2, y2 = p2
    length = max(abs(x2 - x1), abs(y2 - y1))
    steps = max(1, int(length) + 1)
    radius = max(1, thickness // 2)
    for i in range(steps + 1):
        t = i / steps
        cx = x1 + (x2 - x1) * t
        cy = y1 + (y2 - y1) * t
        stamp_disc(pixels, size, cx, cy, radius, color)


def draw_w(pixels, size):
    """Draw a capital W using four thick diagonal strokes."""
    s = size
    # Vertices for the W shape, padded ~18% on each side.
    pts = [
        (0.18 * s, 0.24 * s),   # top-left
        (0.34 * s, 0.78 * s),   # bottom-left-of-center
        (0.50 * s, 0.48 * s),   # middle dip
        (0.66 * s, 0.78 * s),   # bottom-right-of-center
        (0.82 * s, 0.24 * s),   # top-right
    ]
    stroke = max(2, int(0.13 * s))
    for i in range(len(pts) - 1):
        draw_thick_line(pixels, s, pts[i], pts[i + 1], LIGHT_BLUE, stroke)


def write_png(path, size):
    radius = size // 5
    mask = rounded_square_mask(size, radius)
    pixels = [[BG if mask[y][x] else (0, 0, 0) for x in range(size)]
              for y in range(size)]
    draw_w(pixels, size)

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
