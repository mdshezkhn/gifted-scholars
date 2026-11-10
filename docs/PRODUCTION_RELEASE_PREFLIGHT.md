# Production Release Preflight — Task 9

Date: 2026-11-11 · Read-only with respect to production and remote Git. **Nothing pushed,
merged, deployed, or changed on any server.** One code fix was made (§4.4) because the task
allows fixing genuine release-blocking regressions.

---

## 1. Git state

| Ref | Commit | Notes |
|---|---|---|
| current branch | `feature/big-screen` | |
| HEAD | `f8af6cf` | preflight cardhit-CSS fix (§4.4); was `d70107c` = `cp-release-audit` |
| local `main` | `24191d1` | unchanged since the release audit |
| `origin/main` | `24191d1` | **unchanged since the audit** (verified by fresh fetch) |
| `origin/feature/big-screen` | **`efca6e5`** | ⚠ **exists — was not there during the audit** |
| working tree | clean (0 changes) | |
| tags | `cp-overnight-final`, `cp-reconstruct`, `cp-remake`, `cp-release-audit` | preserved |

### 1.1 ⚠ HEADLINE FINDING — the remote branch is a parallel line of work

`origin/feature/big-screen` (`efca6e5`) was **pushed from another working session**
(author = GitHub noreply identity, commits dated Nov 9 06:59 → Nov 10 10:28 +0800).
It is **not an ancestor of local HEAD, and local HEAD is not an ancestor of it**; the two
lines share only the base `24191d1`.

What the remote line contains:

1. **The complete granular overnight-program history** (40+ per-task commits: spec, plan,
   WP1–WP5, Tasks 8–15, extras, morning report) — the history that was believed lost in the
   `.git` incident. It was never lost; it was committed and pushed elsewhere.
2. **Three commits beyond anything on the local line**, containing real code:
   - `dc9a0f4` — **old-browser gate** (ES5 feature-detect in `head.html`; browsers without
     CSS-vars/grid/`Array.from` get a bilingual "update your browser" notice instead of a
     broken app — relevant to the school's old screen computer), **`dataLocalNote`** in
     Settings (warns that school restore-cards / Deep Freeze wipe localStorage; advises
     weekly export), a particle-budget return fix in `screen.js`, 11 extra real-browser
     checks, latency measurements, "24/24 verify15".
   - `efca6e5` — **bilingual one-page classroom test sheet** (`docs/CLASSROOM-TEST.md`) for
     non-technical checking.
3. The remote line does **NOT** contain: the remake program (landing IA, `#/help`, random
   picker, tokens) or the release-audit fixes (9 defects) — it still carries the pre-audit
   defects (nested-interactive cards, mobile tile collapse, router anchor wipe, mobile-menu
   breakage, contrast failures, invalid `<dl>`, …).

### 1.2 Ancestry / fast-forward safety

- `origin/main` (`24191d1`) **is** an ancestor of local HEAD → a `main ← feature/big-screen`
  fast-forward remains mechanically safe.
- However, **deploying local as-is would silently drop the remote line's unique hardening**
  (old-browser gate, data-loss warning, classroom test sheet) and leave `origin/feature`
  diverged forever.

### 1.3 Merge feasibility (read-only `git merge-tree`)

Conflicts ("changed in both") in exactly **5 files**: `index.html`,
`src/app-core.js`, `src/app.css`, `src/i18n.js`, `src/landing.js`.
Resolution policy when approved: keep local (audit-fixed) versions as the base, port the
remote-only additions (gate stays in `head.html` untouched — no conflict expected there;
`dataLocalNote` key merges into `i18n.js`; settings note line ports into `app-core.js`;
particle-budget line ports into `screen.js` — one-sided, likely clean).
Docs/QA/test files from the remote line are additive and merge without conflict.

## 2. Recovery backup

| Artifact | Path | Size | SHA-256 |
|---|---|---|---|
| committed bundle (kept, not deleted) | repo `.git-history-backup.bundle` | 1 859 425 B | `ac2baa14…bfe9e7b408928` |
| **fresh pre-deploy bundle (outside the repo)** | `web/workspace/backups/gifted-scholars-predeploy-20261110.bundle` | 11 438 617 B | `3ef1caaf…60a994b1f4bb` |

- Fresh bundle `verify`: OK; contains **both lines** (local `feature/big-screen` @ `d70107c`,
  `origin/feature/big-screen` @ `efca6e5`, `origin/main`, all 4 tags).
- **Recovery drill PASSED**: `git clone <bundle> /tmp/bundle-drill` → checks out `d70107c`,
  `git fsck` clean.
- Restoration instructions (any machine):
  1. `git clone D:\…\backups\gifted-scholars-predeploy-20261110.bundle restored-repo`
  2. `cd restored-repo && git checkout feature/big-screen`
  3. Remote branch recoverable too: `git update-ref refs/heads/remote-line efca6e5`
  4. Rebuild: `cd src && python3 assemble.py` (needs only Python 3; no npm).
- Per instruction, the refreshed bundle lives **outside** the website repository. The older
  committed bundle remains in-repo as a historical recovery point (removing it is left for a
  later housekeeping commit, not this release).

## 3. Production data backup

**Storage model (from architecture, verified):** all data lives in
`localStorage["gifted-scholars-v1"]` in the teacher's browser. No accounts, no server, no
database — deployment changes **no** stored data; but the browser profile itself is the only
copy, so an export before deploy is still mandatory hygiene.

**Export function verified to exist AND work:**
- Release build: `exportJSON` wired to the Settings button (导出备份 / Export backup).
- Live site (old build): present too (`exportJSON` ×4 in served HTML; button renders).
- **Live demo on the local build** (own storage, demo data only): clicking the button
  downloaded `gifted-scholars-三年二班.json` (30 611 B) containing **all 9 state keys**
  (`students, records, requests, collection, gifts, rules, settings, boxSpent, version`) —
  the export is a complete backup.

**Instructions for you (before approving deployment):**
1. On the classroom computer (the browser profile you actually teach with), open
   <https://my-gifts-with-mo.duckdns.org/> → 设置 → 导出备份.
2. Save the JSON somewhere that is NOT that computer (USB stick / your phone / email to
   yourself). The remote line's own research notes that **school restore-cards wipe
   localStorage on reboot** — weekly exports are the real safety net.
3. Do NOT rely on the github.io mirror — it is a **different origin**, its localStorage is
   separate (one-origin rule), and it currently just redirects to the duckdns domain.

## 4. Release content verification (release commit = `f8af6cf`)

### 4.1 Build & tests (all executed at HEAD)
| Check | Result |
|---|---|
| `assemble.py` | PASS — `assembled: 331 584 bytes` |
| Node unit suite | **PASS — 90/90 ALL PASS** |
| Functional journeys (`qa/functional_audit.py`) | **PASS — 26/26**, 0 JS errors |
| Smoke (`qa/smoke.py`) | **PASS — 8/8** |
| axe-core (landing / help / screen / classroom) | **CLEAN** (re-run after §4.4) |
| Working tree | clean |

### 4.2 The nine audit fixes — verified present
tile `grid-auto-rows:min-content` ✓ · nightband chip isolation ✓ · router `#gsmain` anchor
guard ✓ · mobile-menu `[hidden]` + toggle fix ✓ · muted→`--ink-soft` contrast sweep ✓ ·
lang-button accessible name contains visible text ✓ · `<dl>` validity (`dd.valdd`) ✓ ·
`.cardhit` overlay-button (no nested interactive) ✓ · `scrGrid` tabindex + label + `h1` ✓.

### 4.3 Tag
`cp-release-audit` = `d70107c` (audit state, preserved). The release commit is now
`f8af6cf`; a final tag is applied after this document (see §7).

### 4.4 Genuine regression discovered & fixed during preflight (allowed by task)
The T5 `.cardhit` CSS had been appended via a chain that aborted before the append ran, so
**every classroom card rendered a default gray button** (UA styling: `position:static`,
`rgb(240,240,240)` background, outset border) on the main teaching view — verified by
computed-style probe + screenshot, then fixed (`f8af6cf`): overlay `position:absolute;
inset:0`, transparent, room-link kept above it, focus ring retained. Re-verified: build,
90/90, 26/26, smoke 8/8, axe clean, screenshot clean.

## 5. Deployment plan (commands use the real SHAs discovered here)

### Phase A — RECOMMENDED before any push: integrate the remote line (needs your approval)
```bash
cd github/gifted-scholars
git merge origin/feature/big-screen          # resolve the 5 conflicted files per §1.3
# port remote-only additions: dataLocalNote key + settings line, screen.js particle fix,
# keep head.html old-browser gate (additive), keep docs/CLASSROOM-TEST.md + qa extras
python3 src/assemble.py && (cd src && python3 build-tests.py && node test-bundle.js)
/c/Python314/python.exe qa/functional_audit.py && /c/Python314/python.exe qa/smoke.py
/c/Python314/python.exe qa/a11y_audit.py       # axe must stay CLEAN
git tag cp-preflight-integrated
```
### Phase B — deploy (only after Phase A is green AND you approve)
```bash
git checkout main
git merge --ff-only feature/big-screen        # stays a fast-forward after Phase A
git push origin main                          # Pages builds ~1–3 min
git push origin feature/big-screen            # align the remote branch
```
### Phase C — deployment verification
```bash
curl -sk https://my-gifts-with-mo.duckdns.org/ -o /tmp/live-after.html
grep -c 'renderHelp\|pickDraw' /tmp/live-after.html   # new-feature markers present
# byte-size sanity: served index.html ≈ the new assembled size (331 584 B ± doc drift)
```
Then the §6 checklist in a real browser (hard-refresh: Ctrl+F5 / Ctrl+Shift+R — the old
build may be cached; Pages serves with 10-minute cache).

### Rollback
```bash
git checkout main && git revert --no-edit <deploy-merge-sha> && git push origin main
# Pages redeploys the previous content in ~1–3 min; classroom data unaffected (localStorage).
```

### ⚠ Pre-existing production incident (independent of this release)
**GitHub Pages is serving the `*.github.io` certificate for the custom domain**
(openssl: SNI `my-gifts-with-mo.duckdns.org` → `CN=*.github.io`; headless Edge:
`ERR_CERT_COMMON_NAME_INVALID`; plain HTTP dead). Every visitor currently gets a browser
security warning and must click "proceed anyway". Fix is dashboard-side, needs your action:
GitHub repo → Settings → Pages → remove & re-add custom domain `my-gifts-with-mo.duckdns.org`
(let Let's Encrypt re-issue; minutes–hours), re-enable "Enforce HTTPS". If GitHub demands
domain verification (it de-provisions unverified multi-owner domains like duckdns
subdomains), add the TXT challenge at the duckdns dashboard. **Recommend fixing this before
or together with the release** — the release push alone does not touch it.

## 6. Production verification checklist (post-deploy, on the live domain)

Captured **before** screenshots already saved: `qa/shots/live-before/` (live-home-1440,
live-home-390, live-settings-1440 — old build). After deploy, capture the same set **after**
(`live-after/`) and verify:
- [ ] Homepage renders (hero, sections, footer) at 1440 & 390
- [ ] Desktop nav anchors scroll; mobile burger opens/navigates/closes
- [ ] `#/help` renders + search filters
- [ ] `#/screen` Big Screen: goal, tiles ≥144 px tall on mobile, picker draws fairly
- [ ] Room picker: correct name → correct room; wrong name → bilingual error
- [ ] FAQ accordion; language toggle zh↔en persists across reload
- [ ] Browser refresh restores the current view (hash routing, no server config needed)
- [ ] Direct hash routes (`#/app/*`, `#/screen`, `#/help`) all render
- [ ] **Data preservation**: on a TEST browser profile, seed demo → export → import round
      trip. Never touch the teacher's real profile for this test.
- [ ] Certificate: no security warning after the Pages cert fix (§5)
- [ ] 0 console errors on every checked route

## 7. Final recommendation

**HOLD the deployment.** Two gates, both outside this preflight's authority:
1. **Integration (recommended):** merge `origin/feature/big-screen` into the local line and
   re-verify — otherwise the release drops the old-browser gate, the restore-card data
   warning, and the classroom test sheet. Approve and I will run Phase A immediately.
2. **Certificate incident:** the live site is currently warning every visitor; fix via the
   GitHub Pages dashboard (your credentials) before or with the release.

After both gates: Phase B is a two-command, fast-forward, reversible deploy. All preflight
checks otherwise **PASS** — the release content itself (build, 90/90, 26/26, smoke, axe,
nine fixes) is verified at `f8af6cf`, tagged `cp-preflight-final`, with a recoverable
11.4 MB bundle containing both lines of history.
