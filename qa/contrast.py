# Extra c: WCAG contrast ratios for text/background pairs in the new UI.
# Large-text threshold (>=24px, or >=18.66px bold): 3:1. Normal text: 4.5:1.
import io, os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

def lum(hexc):
    hexc = hexc.lstrip("#")
    r, g, b = (int(hexc[i:i+2], 16) / 255 for i in (0, 2, 4))
    def lin(c): return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)

def ratio(a, b):
    la, lb = lum(a), lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)

# (fg, bg, where, size class) — size: normal | large (>=18.66px bold / >=24px)
PAIRS = [
    ("#1A1917", "#E7E3DA", "app ink on paper (body)", "normal"),
    ("#4A4741", "#E7E3DA", "app soft ink on paper", "normal"),
    ("#1A1917", "#E88654", "app-ui primary button label (16px bold, dark text)", "normal"),
    ("#1A1917", "#F0EDE4", "card text on white-ish", "normal"),
    ("#1A1917", "#FFFFFF", "drawer/tile text on white", "normal"),
    ("#4A4741", "#FFFFFF", "drawer secondary (wallet count)", "normal"),
    ("#9B3418", "#EDE7DA", "gold on gold-tint (selected chip)", "normal"),
    ("#9B3418", "#FFFFFF", "badge text on white (pop badge 22px bold)", "large"),
    ("#555555", "#EEEEEE", "quiet negative marker (18px)", "normal"),
    ("#2E7D32", "#FFFFFF", "drawer rule value +n", "normal"),
    ("#8A6D3B", "#FFFFFF", "drawer rule value -n", "normal"),
    ("#1A1917", "#FBBC94", "active nav tab on apricot", "normal"),
    ("#1A1917", "#DCD7CB", "screen tile on paper-2", "normal"),
]

rows, fails = [], []
for fg, bg, where, size in PAIRS:
    r = ratio(fg, bg)
    need = 3.0 if size == "large" else 4.5
    ok = r >= need
    rows.append((where, fg, bg, f"{r:.2f}:1", f"need {need}:1", "✅" if ok else "❌"))
    if not ok:
        fails.append((where, r, need))

with io.open(os.path.join(os.path.dirname(__file__), "CONTRAST.md"), "w", encoding="utf-8") as f:
    f.write("# WCAG contrast audit — new UI pairs\n\n| pair | fg | bg | ratio | requirement | |\n|---|---|---|---|---|---|\n")
    for row in rows:
        f.write("| " + " | ".join(row) + " |\n")
    f.write("\n")
    if fails:
        f.write("**Below threshold:** " + "; ".join(f"{w} ({r:.2f}:1 vs {n}:1)" for w, r, n in fails) + "\n")
    else:
        f.write("All pairs pass.\n")

for row in rows:
    print(" | ".join(row))
print("FAILS:", len(fails))
sys.exit(0)
