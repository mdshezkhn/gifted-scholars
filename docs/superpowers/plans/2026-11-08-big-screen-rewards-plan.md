# Big-Screen Rewards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the approved Big-Screen Rewards update for Gifted Scholars — `#/screen` classroom display with live tiles and award pops, two-tap quick-award, kid visual system, economy re-base, i18n completion, empty start, hygiene — as one deployable offline `index.html`.

**Architecture:** Same single-file build (`src/assemble.py` concatenates parts → `index.html`, no dependencies). New `src/screen.js` + `src/screen.css` parts carry the big-screen view; state stays one `S` object in `localStorage["gifted-scholars-v1"]`, now re-read before every mutation and replaced on `storage` events so two same-browser tabs never lose records. All new UI strings go through the existing `I18N`/`t()` dict.

**Tech Stack:** Vanilla JS (ES2020), hash router, CSS custom properties, WebAudio (synthesized chime), Python 3 build script, Node test harness with DOM stubs (no npm), Playwright + system Edge for final headless QA (local only, not CI).

**Spec:** `docs/superpowers/specs/2026-11-08-big-screen-rewards-design.md` (APPROVED with amendments 2026-11-08). Executors read both. Section references below (§n) point at the spec.

## Global Constraints

- One deployable `index.html`; offline; no runtime network requests; size budget ≤ current +20 KB.
- `LS_KEY = "gifted-scholars-v1"` unchanged; no stored key renamed/removed; new settings (`sound`, `screenHideNeg`, `goal`, `lastBackupAt`) read as `S.settings.x || default`.
- No backend, no accounts, no cross-device sync; child data never leaves the device.
- Every user-visible string via `t()` with zh + en; **zh is the default language**; en/zh key parity is test-enforced.
- All user-entered text through `esc()`; no `eval`; no inline event handlers with interpolated user data.
- Motion: `prefers-reduced-motion: reduce` OR Settings Motion=off ⇒ opacity-only feedback; `motion:"on"` overrides OS (existing semantics).
- Accessibility (§7 binding): AA contrast; ≥44 px kid-facing targets (36 px teacher-only); progressbars `role="progressbar"` + aria-values; `aria-pressed` on toggles/tiles; polite live region for award feedback; negatives never color-only, never audible.
- Local commits only; **no push, no deploy without the teacher's approval**.
- Build commands before the Task-14 rename: `python3 src/assemble.py` · `python3 src/gen-test.py && node src/tmp-test.js`. After: `python3 src/gen_tests.py && node src/tests_run.js`.
- WP1 (Tasks 2–3) lands as ONE fully tested commit before any other work package starts (teacher's ordering).

## Review Focus

The five input classes the spec implies but no ordinary task exercises; each is pinned to its owning task's test:

1. **Two tabs interleaving awards** (amendment 1) — a second tab holding stale `S` must not overwrite the first tab's records. → Task 7 `test_two_tabs_no_lost_records`.
2. **Chime with no user gesture in the screen tab** (amendment 2) — WebAudio stays suspended; UI must show the one-time unlock chip instead of silently failing. → Task 10 `test_sound_chip_logic`.
3. **Class data split across origins** (amendment 3) — teacher opens duckdns one day, github.io the next and "loses" the class. Behavior: persistent note in Settings + README warning to use ONE address. → Task 6 `test_backup_note_renders`, Task 14 README check.
4. **Extreme roster inputs** — 50-student class, 20-char CJK names, emoji names. Expect: grid scrolls past ~30 tiles, names ellipsize on one line, everything escaped. → Task 9 `test_screen_grid_scroll_and_ellipsis`.
5. **localStorage unavailable** (school browser private mode) — app must not crash; a banner explains data won't persist. → Task 7 `test_storage_blocked_banner`.

---

### Task 1: Baseline (no code changes)

**Files:** none.

- [ ] **Step 1: Rebuild and run the current suite; record the numbers**

Run: `cd github/gifted-scholars && python3 src/assemble.py && python3 src/gen-test.py && node src/tmp-test.js && git status --porcelain`
Expected: all current tests PASS; `git status` clean (regenerated `index.html` byte-identical — if not, STOP and report before proceeding). Record: test pass count, `wc -c index.html` (size budget baseline).

### Task 2: Fix raw-code bugs B1–B4 (§2.1)

**Files:**
- Modify: `src/app-core.js:207` (B1 celebrate), `:306` (B2 undone/undo), `:548` (B3 yesDo + Cancel), `:586` (B4 empty shelf)
- Test: bundle inside `src/gen-test.py` (regenerates `src/tmp-test.js`)

**Interfaces:**
- Consumes: existing `t(key)`, `esc()`, `confirmModal()`.
- Produces: none (bug fixes only; no new keys — `celebrate`, `undone`, `undo`, `yesDo`, `empty`, `cancel` already exist or are added in Task 3; B3's `Cancel` uses key `cancel`).

- [ ] **Step 1: Write the failing test**

Add to the bundle: `test_no_raw_t_code` — for each route HTML snapshot already captured by the harness, plus the level-up overlay HTML (call the level-up renderer with a fabricated student), the confirm-modal HTML, and the shelf-slot HTML, assert `html.includes("${") === false` and `html.includes('t("') === false`. Assert the level-up overlay contains the *translated* celebrate label in zh and en runs.

- [ ] **Step 2: Run to verify it fails**

Run: `python3 src/gen-test.py && node src/tmp-test.js`
Expected: FAIL — literal `${t(` found in level-up/record-row/modal/shelf HTML.

- [ ] **Step 3: Fix the four sites**

Convert each plain-quoted string to a template literal (or string concat) so `${t("celebrate")}`, `${t("undone")}`, `${t("undo")}`, `${t("empty")}` interpolate, replace literal `t("yesDo")`/`Cancel` text with `t("yesDo")`/`t("cancel")` interpolations. No behavior change beyond rendering.

- [ ] **Step 4: Run to verify it passes**

Run: `python3 src/gen-test.py && node src/tmp-test.js`
Expected: PASS (new test green, all old tests green).

### Task 3: Full i18n sweep + zh default + dedupe (§2.1, §6.5) — WP1 commit

**Files:**
- Modify: `src/i18n.js` (≈60 new keys, zh+en), `src/app-core.js` (all lines in §2.1 audit incl. dedupe of the doubled "Setup" pagehead at 442/450–451), `src/landing.js` (`openLicense()` body)
- Test: bundle additions

**Interfaces:**
- Consumes: `t(key, vars)`, `nm()`.
- Produces: complete `I18N.en` / `I18N.zh` with identical key sets; `curLang()` now returns stored `gs-lang` else `"zh"` (was `"en"`); new keys `cancel`, `leakSweep` copy set, `demo*`, `empty*`, `backup*`, `originNote`, `screen*`, `goal*`, `sound*` (later tasks consume these; naming: camelCase keys, zh copy kid-friendly & short, en natural).

- [ ] **Step 1: Write the failing tests**

`test_i18n_parity` — `Object.keys(I18N.en).sort()` deep-equals `Object.keys(I18N.zh).sort()`; every `t()` call site key exists in both. `test_no_english_leak_zh` — render every route + modal in zh; assert none of the audit's literal strings appear ("Rate ", "Select one or more", "No requests yet", "Requested:", "Ask for a gift", "Undone:", "Leaderboards", "Setup", "Add rule", "Delete", "Cancel", "Try demo", …) and the Setup pagehead appears exactly once. `test_default_lang_zh` — no `gs-lang` in storage ⇒ `curLang()==="zh"`.

- [ ] **Step 2: Run to verify they fail**

Run: `python3 src/gen-test.py && node src/tmp-test.js`
Expected: FAIL (missing keys, leaks present, default en).

- [ ] **Step 3: Implement**

Add all keys to both dicts (zh authored, en natural); replace every audited literal with `t()` calls; dedupe the double pagehead; localize `openLicense()` summary paragraphs (legal lines stay bilingual verbatim); flip `curLang()` default to `"zh"`.

- [ ] **Step 4: Run to verify they pass; rebuild; WP1 commit**

Run: `python3 src/gen-test.py && node src/tmp-test.js && python3 src/assemble.py && git diff --stat`
Expected: all PASS; only `src/i18n.js`, `src/app-core.js`, `src/landing.js`, `index.html` changed.

```bash
git add src/i18n.js src/app-core.js src/landing.js index.html && git commit -m "fix(i18n): raw \${t()} bugs B1-B4, full zh/en coverage, zh default (WP1)"
```

### Task 4: Economy re-base (§6.2)

**Files:**
- Modify: `src/app-core.js` (`growthOf`, `walletOf`, level-up detection in `applyRule`, leaderboard queries, legend labels)
- Test: bundle additions

**Interfaces:**
- Consumes: records `{id, ts, studentIds[], ruleId, ruleLabel, value, undone}` (`S.records`, newest first), existing `spentOf(st)`, `S.boxSpent`.
- Produces: `growthOf(st) -> Number` = lifetime positives (`value > 0`, `undone` excluded); new `positivesOf(st)` / `negativesOf(st)` helpers; `walletOf(st) -> Number` = `Math.max(0, positivesOf(st) - negativesOf(st) - spentOf(st) - (S.boxSpent[st.id]||0))`; level-up detection consumes `growthOf`. Other signatures unchanged so callers keep working.

- [ ] **Step 1: Write the failing tests**

`test_level_ignores_negatives` — student with 12 positives stays Lv 3 (curve `[0,5,12,22,…]`) after any number of negative awards. `test_undo_can_lower_level` — undo of a positive that caused a level-up returns the old level. `test_wallet_formula` — positives 20, negatives 5, spent 10, box 2 ⇒ wallet 3; negatives > positives ⇒ wallet 0, never negative. `test_leaderboard_rebases` — all-time board orders by lifetime positives.

- [ ] **Step 2: Run to verify they fail**

Run: `python3 src/gen-test.py && node src/tmp-test.js`
Expected: FAIL (current growth nets negatives in).

- [ ] **Step 3: Implement**

Rewrite `growthOf`/`walletOf` bodies; update legend/label i18n keys (`boardAllTime`, `boardWeek`) copy to "lifetime stars"/"weekly stars" wording; Classroom card swaps the `#` number for a progress bar using `lvlProgress` (markup exists in screen work — here only the classroom card).

- [ ] **Step 4: Run to verify they pass; update affected legacy tests (list each edit in the final summary); commit**

Run: `python3 src/gen-test.py && node src/tmp-test.js`
Expected: PASS.
```bash
git add -A src/ index.html && git commit -m "feat(economy): levels on lifetime positives; wallet formula (WP2)"
```

### Task 5: Empty start + guarded Try demo (§6.4)

**Files:**
- Modify: `src/app-core.js` (`seed` → `seedDemo()`, new `emptyState()`), `src/landing.js` (init: `if(!load()) S=emptyState()`), landing enter-flow button
- Test: bundle additions

**Interfaces:**
- Produces: `emptyState() -> S` (default settings, className zh "我的班级"/en "My class" via `t()`, zero students/records); `seedDemo() -> void` (existing demo data, unchanged content); `tryDemo()` — no-op with confirm modal when students/records exist, else `seedDemo()`; Settings `startEmpty()` with confirm; i18n keys `tryDemo`, `demoConfirmBody`, `startEmpty`, `emptyHint` (Task 3 reserved).

- [ ] **Step 1: Write the failing tests**

`test_fresh_start_empty` — no stored state ⇒ init yields `emptyState()`, 0 students; classroom renders onboarding card with Try-demo button. `test_trydemo_guard` — with ≥1 student or record, `tryDemo()` shows confirm (mock `confirmModal` records call) and does NOT mutate until confirmed. `test_start_empty_wipes` — `startEmpty()` after confirm ⇒ 0 students, settings defaults.

- [ ] **Step 2: Run to verify they fail** — Run: `python3 src/gen-test.py && node src/tmp-test.js` — Expected: FAIL.
- [ ] **Step 3: Implement** — as interfaces above; landing enter flow gains one "Try demo" tertiary button calling `tryDemo()`.
- [ ] **Step 4: Run to verify they pass; commit** — `git commit -m "feat(start): empty first run + guarded Try demo (WP3)"`

### Task 6: One-origin note + last-backup reminder (§6.7, amendment 3)

**Files:**
- Modify: `src/app-core.js` (export handler sets `S.settings.lastBackupAt = new Date().toISOString()`; Settings data section renders note), `src/i18n.js`
- Test: bundle additions

**Interfaces:**
- Produces: `backupNote() -> String` (i18n: "Last backup: {date} / never" + nudge when >7 days old or never-with-students); Settings renders `originNote` ("use ONE address — data does not transfer between duckdns and github.io") once, above the data buttons.

- [ ] **Step 1: Write the failing test**

`test_backup_note_renders` — never exported + 3 students ⇒ note contains the nudge key; export ⇒ `lastBackupAt` set, note shows formatted date, no nudge within 7 days. `test_origin_note` — Settings HTML contains the `originNote` string (zh + en runs).

- [ ] **Step 2: Run to verify it fails** — Expected: FAIL.
- [ ] **Step 3: Implement** — date format via `new Date(x).toLocaleDateString(curLang()==="zh"?"zh-CN":"en-GB")`.
- [ ] **Step 4: Pass; commit** — `git commit -m "feat(data): one-origin note + last-backup reminder (WP3)"`

### Task 7: Multi-tab-safe state (§6.1 State safety, amendment 1; Review Focus 1 & 5)

**Files:**
- Modify: `src/app-core.js` (`load`, `save`, mutation entry points), `src/landing.js` (init registers listener)
- Test: bundle additions

**Interfaces:**
- Produces: `syncIn() -> void` (`S = load()`); `withState(fn) -> void` — `syncIn(); fn(); save();` — EVERY mutation entry point (award via classroom or drawer, undo, give/spend, mystery box, request approve/decline, settings saves, `seedDemo`, `startEmpty`, export datestamp) is wrapped in it; `window.addEventListener("storage", e => { if(e.key===LS_KEY){ S=load(); rerender-current-view; } })`; `load()`/`save()` wrapped in try/catch setting `STORAGE_OK=false` → non-blocking banner via `storageBlockedNote()` (i18n key `storageBlocked`).

- [ ] **Step 1: Write the failing tests**

`test_two_tabs_no_lost_records` — simulate: tab A `withState(award Alice +2)` → capture `localStorage` JSON as tab B's stale snapshot; restore stale `S`; `withState(award Bob +3)`; assert stored `S.records` contains a record with Alice's id in `studentIds` AND a record with Bob's id (nothing overwritten). `test_storage_event_rerenders` — dispatch a fake `storage` event `{key:LS_KEY}` with new JSON; assert S replaced and current view re-rendered. `test_storage_blocked_banner` — make setItem throw; assert no exception escapes `save()` and banner flag set.

- [ ] **Step 2: Run to verify they fail** — Expected: FAIL (awards currently mutate stale S).
- [ ] **Step 3: Implement** — as interfaces. Rerender = call current route renderer; on `#/screen` the handler also feeds the pop differ (Task 10 consumes via a registered hook `onSync(cb)`; Task 7 defines `onSync(cb)` registry, calls callbacks after S replacement).
- [ ] **Step 4: Pass; commit** — `git commit -m "feat(state): re-read before mutation + storage-event sync (WP4)"`

### Task 8: Big Screen shell + class goal (§6.1)

**Files:**
- Create: `src/screen.js`, `src/screen.css`
- Modify: `src/assemble.py` (insert both parts), `src/gen-test.py` (embed `screen.js`), `src/app-core.js` (`route()` gains `#/screen`)
- Test: bundle additions

**Interfaces:**
- Consumes: `withState`, `onSync`, `t`, `esc`, `hueOf`, `LEVELS`, `growthOf`, `walletOf`, `lvlProgress`.
- Produces: `renderScreen() -> String` (full view: top bar [class+goal, mute, fullscreen, drawer, exit] + `<main id=scrGrid>` + live region + sound chip mount); `goalState() -> {enabled,label,target,earned,pct,left}` where `earned` = positives since Monday-`weekStart()`; `toggleFullscreen()`, `setSound(on)` persisting `S.settings.sound` (default `"off"`); route `#/screen`; screen type sizes as CSS custom properties `--scr-name:32px; --scr-pts:44px; --scr-lv:24px; --scr-goal:32px;` (BINDING values from §6.1).

- [ ] **Step 1: Write the failing tests**

`test_screen_route_renders` — hash `#/screen` with 3 students ⇒ top bar + 3 tiles + goal panel; goal disabled by default (no goal shown until Settings enables). `test_goal_math` — 10 positives this week, target 40 ⇒ `pct=25`, `left=30`; last week's positives excluded (fabricate timestamps). `test_screen_aria` — goal track `role="progressbar"` with `aria-valuemin/max/now`; mute + fullscreen buttons carry `aria-pressed` and `aria-label`; live region `aria-live="polite"`.

- [ ] **Step 2: Run to verify they fail** — Expected: FAIL (no route).
- [ ] **Step 3: Implement** — as interfaces; Settings gains goal fields (label + target + enable) reading `S.settings.goal || {enabled:false}`.
- [ ] **Step 4: Pass; rebuild; commit** — `git commit -m "feat(screen): #/screen shell, class goal, top bar (WP5)"`

### Task 9: Tile grid + binding type scale + density (§6.1, amendment 4; Review Focus 4)

**Files:**
- Modify: `src/screen.js` (`tileHTML`), `src/screen.css`
- Test: bundle additions

**Interfaces:**
- Produces: `tileHTML(st) -> String` — avatar initial on `hueOf` bg, name (one line, ellipsis), badge + `Lv N`, `★ wallet`, progress bar to next level with aria values; grid `.scr-grid` uses `repeat(auto-fill,minmax(var(--scr-tile),1fr))` sized so 24–30 tiles fit 1080p without scroll; overflow container scrolls vertically; names pass through `esc()`.

- [ ] **Step 1: Write the failing tests**

`test_screen_grid_scroll_and_ellipsis` — 30 students ⇒ 30 `.tile` nodes, container class allows scroll but computed fit intended for 24–30 (assert CSS declares `--scr-tile` and overflow rule exists in `screen.css` text); 50 students ⇒ still 50 tiles, no crash; 20-char CJK name ⇒ rendered, escaped (`&` in name stays `&amp;`). `test_tile_content` — each tile shows name, `Lv`, `★`, progressbar aria triple.

- [ ] **Step 2: Run to verify they fail** — Expected: FAIL.
- [ ] **Step 3: Implement** — type sizes ONLY via the binding custom properties; no ad-hoc font sizes in tile CSS.
- [ ] **Step 4: Pass; commit** — `git commit -m "feat(screen): student tiles, binding type scale, density (WP5)"`

### Task 10: Award pops, quiet negatives, chime + sound chip (§6.1, §7; Review Focus 2)

**Files:**
- Modify: `src/screen.js`, `src/screen.css`
- Test: bundle additions

**Interfaces:**
- Consumes: `onSync` (Task 7), `.gs-motion` class semantics (set by existing `applyMotion()`).
- Produces: `motionOK() -> Boolean` = `document.documentElement.classList.contains("gs-motion")` (NEW helper — does not exist yet); `snapshot() -> Object` (`{sid: {w: wallet, l: level}}`); `diffPops(prev) -> Array<{sid, kind:"pos"|"neg", n, leveled}>` — called after every re-render (direct or storage); `popTile(sid,kind,n,leveled)` — positive: bounce + ≤16 confetti dots + floating `+N` (transform/opacity only, auto-cleanup ≤1.2 s; skipped when `!motionOK()` → opacity-only badge); negative: quiet grey `−N` chip ~60 s, suppressed entirely when `S.settings.screenHideNeg`; `announceAward(text)` writes to the polite live region; `chime()` — two-note WebAudio, only when `S.settings.sound==="on"` AND context running; `maybeShowSoundChip()` — chip visible iff sound on AND context suspended; tap ⇒ `ctx.resume()` + hide for the session.

- [ ] **Step 1: Write the failing tests**

`test_pop_diff` — snapshot A (wallet 5, lv 2) → award +2 ⇒ diff `{sid, kind:"pos", n:2, leveled:false}`; award crossing threshold ⇒ `leveled:true`. Negative award ⇒ `kind:"neg"`, no chime call. `test_hide_neg` — `screenHideNeg=true` ⇒ negative produces no chip (diff still computed for wallet). `test_sound_chip_logic` — sound off ⇒ no chip, no chime; sound on + suspended ctx ⇒ chip visible; after resume ⇒ chip flag false for session. `test_reduced_motion_pops` — `motionOK()===false` ⇒ pop path renders static badge class, zero confetti nodes created.

- [ ] **Step 2: Run to verify they fail** — Expected: FAIL.
- [ ] **Step 3: Implement** — WebAudio ctx created lazily on first gesture; all timers `setTimeout`-owned and cleared on re-render.
- [ ] **Step 4: Pass; commit** — `git commit -m "feat(screen): award pops, quiet negatives, chime + unlock chip (WP5)"`

### Task 11: Quick-award drawer (§6.1)

**Files:**
- Modify: `src/app-core.js` (extract shared `studentChips(sel)` + `ruleChips(onAward)` generators from the classroom view), `src/screen.js`, `src/screen.css`
- Test: bundle additions

**Interfaces:**
- Produces: `drawerOpen()/drawerClose()` (slide-up panel, motion-gated); `drawerAward(ruleId)` — `withState(()=> applyRule(rule, [...sel]))` using the EXISTING `applyRule(rule, ids)` unchanged — identical record shape `{id, ts, studentIds, ruleId, ruleLabel, value, undone:false}`; "Undo last" button → `withState(()=> undoRecord(S.records[0]))` (existing `undoRecord` marks `undone:true`); shares the `sel` Set with classroom semantics.

- [ ] **Step 1: Write the failing tests**

`test_drawer_award_shape` — award via drawer with 2 selected students ⇒ ONE record with `studentIds.length===2`, shape `{id, ts, studentIds, ruleId, ruleLabel, value, undone:false}` (applyRule is shared, not duplicated); wallet/level update the same as a classroom award. `test_drawer_undo` — undo marks exactly the newest record `undone:true` and nothing else. `test_drawer_chips_shared` — classroom view still renders after the generator extraction (existing classroom tests stay green).

- [ ] **Step 2: Run to verify they fail** — Expected: FAIL.
- [ ] **Step 3: Implement** — extraction is refactor-only for the classroom (its tests must stay green untouched).
- [ ] **Step 4: Pass; commit** — `git commit -m "feat(screen): two-tap quick-award drawer (WP5)"`

### Task 12: Keyboard shortcuts + input guard (§7.3, amendment 5)

**Files:**
- Modify: `src/screen.js`
- Test: bundle additions

**Interfaces:**
- Produces: `isTyping(e) -> Boolean` (`e.target.matches("input,textarea,[contenteditable]")`); global keydown on `#/screen`: `A`→drawer, `F`→fullscreen, `Esc`→close drawer/overlays (browser handles fullscreen exit) — ALL ignored when `isTyping(e)`.

- [ ] **Step 1: Write the failing tests**

`test_shortcut_input_guard` — fake events `{key:"a", target: input}` / `{key:"f", target: textarea}` / `{key:"Escape", target: contenteditable}` ⇒ no action taken (drawer stays closed, fullscreen not requested); same keys on `document.body` ⇒ actions fire.

- [ ] **Step 2: Run to verify they fail** — Expected: FAIL.
- [ ] **Step 3: Implement** — single `keydown` listener registered with the screen view, removed on route change.
- [ ] **Step 4: Pass; commit** — `git commit -m "feat(screen): A/F/Esc shortcuts with input-focus guard (WP5)"`

### Task 13: Kid visual system, app scope (§6.3)

**Files:**
- Modify: `src/app.css` (`.app-ui` token scope + landing-scoped overrides for shared primitives), `src/app-core.js` (wrap app/room shells in `.app-ui`), `src/screen.css`, `src/i18n.js` (kid-friendly copy pass)
- Test: bundle additions

**Interfaces:**
- Produces: `.app-ui` scope: `--radius:18px` (24 px big tiles), warm palette accents (amber `#F5B841` family + teal/coral/mint, AA-checked pairs), rounded system font stack body (`ui-rounded,"Segoe UI","PingFang SC","Microsoft YaHei",system-ui`), `--tap:44px` enforced on kid-facing buttons (`.btn.sm` stays 36 px, teacher-only); landing HTML untouched.

- [ ] **Step 1: Write the failing tests**

`test_app_ui_scope` — landing HTML has NO `.app-ui`; every `#/app/*`, `#/room/*`, `#/screen` shell HAS it. `test_tap_targets_css` — `app.css` text declares the 44 px tap rule for `.app-ui .btn` and keeps `.btn.sm` at 36 px. `test_landing_untouched` — landing render string equal to pre-task snapshot (golden string in test).

- [ ] **Step 2: Run to verify they fail** — Expected: FAIL.
- [ ] **Step 3: Implement** — start with the audit of which shared primitives the landing uses (spec §5C); override those under the landing scope only.
- [ ] **Step 4: Pass; commit** — `git commit -m "feat(theme): kid visual system scoped to app-ui (WP6)"`

### Task 14: Renames, CI, README (§6.6; Review Focus 3 README half)

**Files:**
- Create: `.github/workflows/ci.yml`, `.gitignore` (add `src/tests_run.js`)
- Rename: `src/gen-test.py` → `src/gen_tests.py` (writes `src/tests_run.js`; delete `src/tmp-test.js` from tracking)
- Modify: `README.md`, `src/gen_tests.py` (new output name)

**Interfaces:**
- Produces: CI on push+PR — Python 3.x + Node 20 → `python3 src/assemble.py` → `git diff --exit-code index.html` (byte-identical) → `python3 src/gen_tests.py && node src/tests_run.js`. README sections: Big Screen mode (two-tab setup, single-display drawer flow, `F`/`A`/`Esc`, sound chip, `file://` caveat), **ONE-origin warning (duckdns vs github.io localStorage)**, backup reminder, build/test commands (new names), Windows line-ending note, verification section.

- [ ] **Step 1: Implement renames + workflow + README** (docs/config only; no app behavior).
- [ ] **Step 2: Verify locally**

Run: `python3 src/assemble.py && git diff --exit-code index.html && python3 src/gen_tests.py && node src/tests_run.js && rm src/tmp-test.js 2>/dev/null; git status`
Expected: byte-diff clean, tests PASS, old artifact gone. Validate `ci.yml` by inspection against GitHub Actions schema (no local runner).

- [ ] **Step 3: Commit** — `git commit -m "chore: rename test files, add CI, rewrite README (WP7)"`

### Task 15: Final verification — §8 as amended (WP8, no commit until teacher sees results)

**Files:**
- Create: `qa/qa.py` (Playwright + system Edge headless, pattern from sibling workspace projects), `qa/*.png` outputs

- [ ] **Step 1: Run the headless suite** — routes × {zh,en} console/page errors = 0; `#/screen` at 1920×1080: computed styles meet the binding type minimums, 30-tile class has no grid overflow, 40-tile scrolls; drawer award updates instantly; two-window `storage` update < 200 ms; reload restores numbers; `A`/`F`/`Esc` inert while typing; reduced-motion pass creates zero confetti/transform nodes; sound chip lifecycle; no network requests (route interception log empty); `wc -c index.html` ≤ baseline +20 KB.
- [ ] **Step 2: Screenshots** — classroom/screen/drawer/landing × zh+en; landing compared by eye to pre-theme shot for zero drift.
- [ ] **Step 3: Report** — numbers + screenshots + list of legacy tests edited (Task 4) + what remains; remind the teacher of the §9 manual check (project it in the real classroom, 8 m readability, two-tab setup on the school computer) before sign-off; ask about push/deploy. Commit QA rig: `git commit -m "test: headless QA rig for big-screen release"`.

---

## Self-Review (run after writing — results recorded here)

1. **Spec coverage** — §2.1→Tasks 2–3 · §6.2→4 · §6.4→5 · §6.7→6 · §6.1 state safety→7 · §6.1 shell/goal→8 · tiles/type→9 · pops/sound→10 · drawer→11 · keyboard→12 · §6.3→13 · §6.6→14 · §8→15 · §7 distributed (3→12, 4→8/10, 6→10, 7→8/10, 8→15). Amendments 1→7, 2→10/12, 3→6+14, 4→8+9+15, 5→12. No gaps.
2. **Step scan** — steps carry exact signatures/values or exact test assertions; no TBDs.
3. **Type consistency** — `withState`/`syncIn`/`onSync` defined T7, consumed T8/T10/T11; `goalState` T8; `snapshot`/`diffPops` T10; `studentChips`/`ruleChips` T11; `isTyping` T12; all names used once.
4. **Review Focus** — five lines above, each with its owning task test.
5. **Proportion** — plan ≈ spec length; code blocks are signatures/assertions only.

Corrections made during this review: record shape fixed to
`{id, ts, studentIds[], ruleId, ruleLabel, value, undone}` (one record covers all
selected students); `applyRule(rule, ids)` argument order fixed; `motionOK()`
marked NEW (not existing); wallet formula term fixed to existing `spentOf(st)`;
manual classroom check added to Task 15 reporting.
