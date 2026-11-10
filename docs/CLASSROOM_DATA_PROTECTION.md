# Classroom Data Protection — Gifted Scholars

Date: 2026-11-11 · Read this before reinstalling Windows, "restoring" a school computer,
or switching classroom browsers.

## 1. Where data lives (architecture fact)

All classroom data (students, records, requests, gifts, collection, rules, settings) lives
**only in the browser's localStorage** on the computer that opened the site, under the origin
`https://my-gifts-with-mo.duckdns.org/`. There is **no server, no account, no cloud backup**.
Nothing ever leaves the device (verified: zero third-party network requests).

Deployment of a new website version does **not** touch this data (verified: an old-format
state blob loaded into the new build on the live origin with students/records intact —
`qa/live_verify.py`, check "old localStorage survives new build").

## 2. Export (30 seconds)

1. Open https://my-gifts-with-mo.duckdns.org/ in the classroom browser (the one that has your data).
2. 设置 → 导出数据（备份） — a JSON file downloads, e.g. `gifted-scholars-三年二班.json`.
3. Save it somewhere OFF the computer: USB drive, network folder, or personal cloud folder.
   Do not leave it only on a Deep-Freeze/restore-card machine.

## 3. Import / restore

1. On the (possibly new or freshly-reset) computer, open the same website.
2. 设置 → 导入数据 → choose the exported JSON file.
3. Everything returns: students, records, requests, gifts, collection, rules, settings.
   Verified by isolated round-trip test (`qa/integration_checks.py`, E-checks).

## 4. Restore-card / Deep Freeze danger

School restore software wipes the whole disk on reboot — **including browser localStorage**.
The app shows a standing warning in Settings (`dataLocalNote`, bilingual). Rules of thumb:

- Export **at the end of every teaching day** (or at minimum every Friday).
- Keep **two** backup generations (this week + last week).
- Never keep the only copy on the classroom computer.

## 5. Data schema (exported JSON, v1)

Nine top-level keys — `version`, `settings`, `students`, `records`, `requests`,
`collection`, `rules`, `gifts`, `boxSpent`. Record shape:
`{id, ts, studentIds[], ruleId, ruleLabel, value, undone}`.

## 6. Real classroom data status (2026-11-11 audit)

- A scan of every browser profile on the home laptop found **only auto-seeded demo data**
  ("Maple Grove Primary / Class 4B / Ms. Rivera") in Chrome Profile 1 — created by an
  old-build visit, not real classroom data (extractor: `qa/extract_real_data.py`).
- The **real classroom data therefore lives only on the school computer's browser.**
- **Action for Teacher Mo:** on the classroom computer, do §2 once now and weekly after.
  The site will remind you (Settings shows 上次备份 date and nudges after 7 days).

## 7. Recovery test results

| Test | Result |
|---|---|
| Export produces 9-key JSON | PASS (live demo export, 30,611 B) |
| Import restores full state (isolated env) | PASS |
| Old-state → new-build upgrade (live origin) | PASS |
| Deploy preserves localStorage (same origin) | PASS (verified on live site) |
| Privacy: no network egress of data | PASS (zero third-party requests, live-verified) |
