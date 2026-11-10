import re, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
b = open("index.html", encoding="utf-8").read()
hits = []
for m in re.finditer(r"innerHTML\s*=\s*[^;]{0,100}", b):
    t = m.group(0)
    if "`" not in t and "esc(" not in t and "+" in t:
        hits.append(t[:100])
print("REAL-HITS:", len(hits))
for h in hits:
    print("HIT:", h)
