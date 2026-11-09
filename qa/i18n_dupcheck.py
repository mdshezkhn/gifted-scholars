# Which duplicate keys have SAME vs DIFFERENT values across occurrences? (utf-8 safe)
import io, re, collections, os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

SRC = os.path.join(os.path.dirname(__file__), "..", "src", "i18n.js")
s = io.open(SRC, encoding="utf-8").read()

regions, depth, start = [], 0, None
tok = re.finditer(r"[{}]|(?:en|zh)(?=\s*:\s*\{)", s)
for m in tok:
    t = m.group(0)
    if t in ("en", "zh") and depth == 1 and start is None:
        start = (t, m.end()); continue  # following '{' token raises depth itself
    if t == "{": depth += 1
    elif t == "}":
        depth -= 1
        if start is not None and depth == 1:
            regions.append((start[0], s[start[1]:m.start()])); start = None

kv = re.compile(r"([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(?:\"((?:[^\"\\]|\\.)*)\"|'((?:[^'\\]|\\.)*)')")
for nm, body in regions:
    seen = collections.defaultdict(list)
    for m in kv.finditer(body):
        v = m.group(2) if m.group(2) is not None else m.group(3)
        seen[m.group(1)].append(v)
    same = [k for k, v in seen.items() if len(v) > 1 and len(set(v)) == 1]
    diff = [(k, v) for k, v in seen.items() if len(v) > 1 and len(set(v)) > 1]
    print(nm, "dup keys:", sum(1 for v in seen.values() if len(v) > 1),
          "| identical:", len(same), "| DIFFERING:", len(diff))
    for k, v in diff[:15]:
        print("  DIFF", k, "->", [x[:34] for x in v])
