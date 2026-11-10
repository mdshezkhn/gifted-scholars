# Extract the gifted-scholars localStorage JSON from Chrome leveldb (read-only).
import sys, io, os, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

SRC = os.path.expandvars(r"%LOCALAPPDATA%\Google\Chrome\User Data\Profile 1\Local Storage\leveldb\014291.ldb")
raw = open(SRC, "rb").read()
print("ldb size:", len(raw))

# Chromium localStorage values are stored with an 0x01 type prefix before the UTF-8/UTF-16 payload.
# Find candidate JSON blobs: look for the state shape starting {"version"
cands = []
for m in re.finditer(rb'\{"version"', raw):
    # walk forward to a balanced JSON object (string-aware)
    i = m.start(); depth = 0; in_str = False; esc = False; j = i
    while j < len(raw) and j - i < 8_000_000:
        c = raw[j]
        if in_str:
            if esc: esc = False
            elif c == 0x5C: esc = True
            elif c == 0x22: in_str = False
        else:
            if c == 0x22: in_str = True
            elif c == 0x7B: depth += 1
            elif c == 0x7D:
                depth -= 1
                if depth == 0:
                    cands.append(raw[i:j+1]); break
        j += 1
print("candidates:", len(cands))
best = None
for b in cands:
    try:
        d = json.loads(b.decode("utf-8"))
    except Exception:
        continue
    keys = sorted(d.keys())
    students = len(d.get("students", []))
    records = len(d.get("records", []))
    print("blob:", len(b), "bytes | keys:", ",".join(keys)[:90], "| students:", students, "| records:", records)
    if students > 0 and (best is None or len(b) > len(best)):
        best = b
if best:
    out = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "backups", "REAL-classroom-export-20261111.json"))
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, "wb").write(best)
    d = json.loads(best)
    print("SAVED:", out)
    print("students:", len(d.get("students", [])), "records:", len(d.get("records", [])),
          "requests:", len(d.get("requests", [])), "rules:", len(d.get("rules", [])),
          "gifts:", len(d.get("gifts", [])), "settings.className:", (d.get("settings") or {}).get("className"))
    # names sample (first 3 only, for evidence — not published)
    print("sample students:", [s.get("name") for s in d.get("students", [])[:3]])
else:
    print("NO VALID BLOB FOUND")
