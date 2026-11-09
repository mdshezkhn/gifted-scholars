# Duplicate/unused key audit for src/i18n.js (runs from src/ or repo root).
import io, re, collections, sys, os

SRC = os.path.join(os.path.dirname(__file__), "..", "src", "i18n.js")
s = io.open(SRC, encoding="utf-8").read()

# strip string literals so their contents can't fake keys
stripped = re.sub(r'"(?:[^"\\]|\\.)*"', '""', s)

# locate top-level en:{...} / zh:{...} bodies via depth walk
regions, depth, start, i = [], 0, None, 0
tok = re.finditer(r'[{}]|(?:en|zh)(?=\s*:\s*\{)', stripped)
for m in tok:
    t = m.group(0)
    if t in ("en", "zh") and depth == 1 and start is None:
        start = (t, m.end() + 2); depth += 1; continue
    if t == "{": depth += 1
    elif t == "}":
        depth -= 1
        if start is not None and depth == 1:
            regions.append((start[0], stripped[start[1]:m.start()])); start = None

key = re.compile(r'([A-Za-z_][A-Za-z0-9_]*)\s*:')
allkeys = {}
for nm, body in regions:
    ks = key.findall(body)
    dups = [k for k, c in collections.Counter(ks).items() if c > 1]
    print(nm, "keys:", len(ks), "true duplicates:", dups or "NONE")
    allkeys[nm] = ks
