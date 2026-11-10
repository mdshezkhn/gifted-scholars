# Security & Privacy Release Audit — Task 6

Audit date: 2026-11-10 · Read-only review + local XSS probes (`qa/security_scan.py`).
No data left the machine; no third-party services introduced.

## Static bundle scan (`index.html`, 330 988 B)

| Check | Result |
|---|---|
| External `src=`/`href=` URLs | **none — fully self-contained file** |
| External `<script src>` | none |
| Remote `fetch()` / XHR | none |
| `eval()` usage | none |
| Hard-coded secrets / api keys / tokens / passwords | none |
| Environment files (`.env`, `.env.local`) | none in repo |
| External requests during full UI walkthrough (network listener) | **zero** |
| `target="_blank"` links (noopener concern) | none present |
| localStorage keys after full session | exactly one: `gifted-scholars-v1` (the app state) — no analytics, no tracking keys |

## Injection review

Six `innerHTML = '…' + …` concatenation sites exist (legacy + modals). Site-by-site review:
1–2. storage-blocked banner prepend — concatenates a **static** i18n note with existing markup;
3. `modal()` wrapper — callers interpolate; the user-data paths verified escaped (below);
4. level-up modal — concatenates level **badge/name from the app's own constants** and uses
   `esc(st.name)` for the student name;
5. mystery-box result — gift **emoji from the app's own catalog**;
6. room shell header — i18n string only; the rest of the room template escapes names.

**Live XSS probes (executed, not assumed):** (a) a student named
`<img src=x onerror=window.__xss=1>` plus a record whose `ruleLabel` is
`<script>window.__xss=2</script>` plus a class name `<svg onload=window.__xss=3>` rendered
through ALL six views including the student room → **flag never set, raw HTML absent from the
DOM (escaped entities only)**; (b) typing a hostile name into the room-picker input and
submitting → **escaped, not executed**. The `esc()` discipline holds on every path probed.

## Privacy-claim verification

- "所有数据只留在这台浏览器里 / all data stays in this browser" — **verified**: single
  localStorage key, zero external requests, no telemetry, no fonts/CDN calls at runtime.
- Export is manual (Settings → 导出备份) via a local Blob download — no upload path exists in
  the code (no `fetch`/`XHR` at all).
- Child data: names live only in localStorage; clearing browser data is the only deletion path
  (Settings offers 删除 per student + backup export first).

## Verdict

**Security & privacy: PASS.** Self-contained, no external surface, no secret material,
injection-safe on every probed path, privacy claims match observable behavior.
No changes required.
