# Morning report — overnight run 2026-11-09→10

Branch `feature/big-screen` (from `ae53535`), **local commits only, nothing pushed**.
Checkpoint tags: `cp-task10` … `cp-task15`.

## Per-task status

| task | status | commit/tag | notes |
|---|---|---|---|
| Pre: T() strict `=== true` | ✅ done | 73837dd | 69/69 stayed green (tests were already boolean) |
| Pre: route-coverage test | ✅ done | 73837dd | every route renders non-empty; unknown #/app tab falls back |
| Pre: qa/smoke.py | ✅ done | 73837dd + later | 9 checks incl. confetti-spawn; run after EVERY task |
| Task 10 pops/quiet-neg/chime/chip | ✅ done | 47b265c `cp-task10` | record-id driven; seen-init no-replay; 10 s window; 150 cap + badge; hideNeg toggle; WebAudio + gesture chip |
| Task 11 drawer | ✅ done | 21535a9 `cp-task11` | two-tap; stays open; sel clears; undo-last = newest `undone===false` |
| Task 12 shortcuts | ✅ done | d959630 `cp-task12` | A/F/Esc; guards: typing (incl. select), ctrl/meta/alt, isComposing |
| Task 13 kid theme | ✅ done | abb4917 `cp-task13` | scoped `.app-ui`; landing untouched; golden-string tests stayed green (no revert) |
| Task 14 renames/CI/README | ✅ done | (Task 14 commit) `cp-task14` | `gen-test.py→build-tests.py`, `tmp-test.js→test-bundle.js`; ci.yml `working-directory: src`; README big-screen/one-origin/backup/CRLF |
| Task 15 verification | ✅ done | 851b7f8 `cp-task15` | qa/VERIFY-15.md — now **24/24** (13 original + 11 stub-parity/gate, see §Pre-push) |
| Extra a (4× CPU throttle) | ✅ done | qa/EXTRA-CHECKS.md | group award 30 students OK; cap holds; sane timing; 0 errors |
| Extra b (robustness) | ✅ done | qa/EXTRA-CHECKS.md | corrupt JSON → fresh state; quota caught; 50 students; XSS inert |
| Extra c (contrast) | ✅ done | qa/CONTRAST.md | 13/13 pairs after one fix (see decisions) |
| Extra d (reduced motion ×2) | ✅ done | qa/EXTRA-CHECKS.md | OS setting and Settings Motion=off both: 0 particles |
| Extra e (fresh clone) | ✅ done | (temp dir, removed) | clone→build→85/85→byte-diff clean |

**No task failed three attempts; no reverts were needed.**

## Test counts

- Node suite: **85/85 PASS** (`cd src && python3 build-tests.py && node test-bundle.js`)
- qa/smoke.py: **9/9**
- qa/verify15.py (spec §8, real browser): **24/24** (13 §8 checks + 7 stub-parity + 2 old-browser-gate)
- qa/extra-checks.py: **11/11**
- qa/contrast.py: **13/13 pairs pass**

## index.html size

- Baseline (Task 1): 264,688 B
- Final: **304,432 B** (+39,744 B = **+39.7 KB of the +40 KB budget**; fonts alone are 162.9 KB of the file)

## Legacy tests edited (complete list)

1. `t en default` → `t zh default` (WP1 — documents the zh default).
2. `seed loads` — seeds explicitly (WP3 empty-start changed init) + 8 call sites `seed()`→`seedDemo()`.
3. Fixture upgrade test (Task 9): `setItem(LS_KEY, JSON.stringify(FIXTURE))` + typeof-robust parse — it had been a false PASS since birth; now genuinely passes.
4. Task-11 drawer tests rewired to `drawerIsOpen()` (Task 12) — stub `querySelector` is selector-blind, existence checks were vacuous.
5. Five WP4 tests and nine Task-10 tests written as functions with boolean returns after `T()` hardening (string returns = FAIL).

## Bugs found & fixed overnight

- **Pop tile selector** (found by screenshot + probe): tiles are `id="tile-…"` but applyPop looked for `[data-stu=…]` → pops "happened" invisibly and leaked the particle budget (cap would jam after ~6 awards). Fixed; confetti verified live; smoke now asserts `.scr-confetti > 0`.
- **Particle budget leak** when tile missing (same bug) — budget now returned.
- **Primary-button contrast**: white on #E88654 = 2.64:1 → dark text = 6.6:1 (contrast audit).
- (Carried from Task 9, fixed same-day: WP4 route fall-through regression on `#/room/`.)

## Decisions (one-line each; full context in docs/overnight-log.md)

- Cross-tab pop attach deferred one tick: `onStorage` re-renders after callbacks, so pops must land on the fresh DOM.
- Cross-tab latency measured in-page (storage event → tile mutation), excluding Playwright cross-process overhead — the honest app metric.
- Sound chip shows only while sound=on AND AudioContext not yet unlocked; any tap on `#/screen` unlocks.
- Negative pops: quiet marker only, never sound/confetti; fully suppressed when Settings hideNeg is on.
- Drawer awards return their pop descriptors (testability) and keep the drawer open for rapid awards.
- Kid theme lives only under `.app-ui`; `landing.css` contains no app-ui reference (asserted by a test).
- CI byte-diff uses `git diff --exit-code` — safe because `.gitattributes` already forces LF.
- Extra-check order followed the brief (a→e); e ran in a temp clone that was deleted after proof.

## Anything unfinished

- Nothing from the queue. All six queue items + all five extras shipped.

## Open questions for you

1. Push `feature/big-screen` now, or wait for your review? (Nothing is pushed.)
2. GitHub Actions will run on push — approve enabling it (no secrets involved)?
3. Deploy: RELEASE.md has the checklist — confirm before we touch the live site.
4. The 40 KB budget has 2.8 KB left; fonts are 57% of the file — want a font-subset pass someday?
5. Drawer rule chips currently include negative rules (marked, quiet on screen). Fine, or hide negatives from the drawer too?

## Pre-push additions (2026-11-10, teacher items 1–4; no push, no deploy)

### 1. Stub audit — node tests that checked element presence via the selector-blind stub

The node stub's `document.querySelector()` ALWAYS returns a truthy fake element, so
existence checks could never fail. Content checks (`innerHTML` on `#view/#main/#modals`)
and state checks were always valid. Full list of vacuous checks found (3, in 2 tests):

| test | vacuous assertion | replacement | real-browser coverage |
|---|---|---|---|
| `drawer two-tap award` | `document.querySelector("#drwPanel")` truthiness | `drawerIsOpen()` state flag | **S1** drawer award by real clicks (panel visible, record+tile+confetti, drawer stays open) |
| `shortcut guards` | `#drwPanel` truthiness after A | `drawerIsOpen()` | **S3** real key presses: A opens, Ctrl+A ignored, Esc closes (+ S3f F/fullscreen) |
| `shortcut guards` | `#drwPanel` truthiness for checkbox | `drawerIsOpen()` | same S3 (checkbox case is also unit-covered via `isTyping` state) |

All other suite assertions were content/state based (records, wallets, flags, innerHTML) —
never stub-blind. New real-browser checks added to qa/verify15.py: **S1** drawer award,
**S2** undo-last (newest `undone===false`, wallet returns to pre-award), **S3/S3f** A/F/Esc,
**S4** mute click + reload persistence, **S5a/b** negative chip quiet + hideNeg hidden,
**S6** approved gift grant ⇒ zero pops, **S7** wallet-0 positive award ⇒ pops.

### 2. Measured storage-event → tile update time

**0.0–0.2 ms in-page** (three runs: 0.1 / 0.2 / 0.0 ms; median 0.1 ms), measured as
performance.now() delta from the `storage` event firing to the tile DOM mutating
(a rAF-poll inside the page, excluding Playwright's cross-process evaluate overhead).
Spec limit: < 200 ms. Printout: `MEASURED storage->tile mutation` line in verify15 output.

### 3. Browser requirements + old-browser fallback

Features that set the floor (verified by grep, all used):

| feature | where | min Chrome |
|---|---|---|
| CSS `inset` (7 uses) | overlays/drawer | **87** ← the floor |
| CSS flex `gap` | screen tiles/top bar | 84 |
| CSS `min()` | drawer width | 79 |
| `prefers-reduced-motion` | motion setting | 74 |
| `matchMedia().addEventListener` (try/catch'd, degrades gracefully) | landing | (88 — optional) |
| CSS grid `auto-fill/minmax` | tiles/shelf | 57 |
| `Array.from` / `Set` / `Promise` / `codePointAt` / `Object.assign` | all JS | 45 |
| template literals / arrows / let/const / CSS vars | all | 49 |
| `requestFullscreen` (feature-detected) | big screen | 71 |

**Minimum: Chrome/Edge 87** (2011-era school PCs on Win10 evergreen Edge are fine).
**Fallback added:** an ES5-only gate at the top of `<head>` (in `src/head.html`) feature-detects
CSS vars + inset + grid auto-fill + the JS features; on failure it hides the app and shows a
plain bilingual "please update your browser / 请更新浏览器" notice (data-safe wording), and the
bundle guard throws one intentional `GS-UNSUPPORTED-BROWSER` error before any code runs.
**Tested both ways:** G0 (modern ⇒ no gate, no notice) and G1 (CSS.supports stubbed off via
init-script ⇒ notice shown, app hidden, exactly one intentional error) — both in verify15.

### 4. Settings note on local-only data

New `dataLocalNote` (zh + en) paragraph in Settings → 数据, right under the one-origin
warning: data lives only in this browser (localStorage), nothing is uploaded; if the school
computer restores itself on restart (还原卡/Deep Freeze) the data may be wiped; export a
backup every week and keep it somewhere safe. Parity-tested, renders in zh.
