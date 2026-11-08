# Big-Screen Rewards — Design Spec

Date: 2026-11-08 · Project: Gifted Scholars (`github/mdshezkhn/gifted-scholars`)
Status: **DRAFT — awaiting Teacher Mo's approval. No code written yet.**
Author: Links agent, continuing task_022 (original build, 2026-10-22/23).

---

## 1. Intent & why

Gifted Scholars works: the teacher rates students in one tap, students earn stars and
spend them on virtual gifts, everything lives in one offline `index.html`. What's
missing is the moment that actually motivates a primary-school class: **the classroom
digital screen showing progress live while the lesson happens**, with a celebration the
whole room can see when someone earns a star.

This update adds a **Big Screen mode** (`#/screen`) for the classroom display, a
**two-tap quick-award flow**, a **kid-friendly visual system** across the app (the
editorial look stays on the landing page only), and fixes the known bugs and hygiene
issues. Constraints stay hard: no backend, no accounts, no child data leaving the
device, one deployable offline file.

**Confirmed by teacher (2026-11-08):** awards are tapped **on the same computer that
drives the screen**. No cross-device sync. Everything stays in `localStorage`.

## 2. Current state (verified by reading `src/` in full)

- Build: `python3 src/assemble.py` concatenates `head/body/tail.html` +
  `fonts/app/landing.css` + `i18n.js + app-core.js + landing.js` → `index.html`.
  Tests: `src/gen-test.py` writes `src/tmp-test.js` (DOM stubs + sources + ~31
  assertions), run with `node`. No npm dependencies anywhere.
- State: single object `S` in `localStorage["gifted-scholars-v1"]` — settings, rules,
  gifts, students, records, requests, collection, boxSpent. Derived values
  (growth, wallet, level) are computed, never stored. Persistence on every mutation.
- Router (hash): `#/` landing · `#/app/<classroom|records|shop|leaderboard|settings>` ·
  `#/room/<id>`.
- Economy today: `growthOf = netOf` = sum of **all** record values **including
  negatives** → a negative point can visually drop a student's level. This change
  re-bases levels (approved, §6.2).
- i18n: `I18N` dict (en/zh) + `t(key, vars)` + `nm()` for object names. Language from
  `localStorage["gs-lang"]`, else `navigator.language`, else **en** (default must
  become zh, §6.5). Motion setting (`auto/on/off`) already respects
  `prefers-reduced-motion`.
- Escaping: `esc()` ( escapes `& < > " '`) is used on all user-entered names — keep
  this invariant everywhere new.

### 2.1 Verified bug & leak audit (`src/app-core.js` unless noted)

**Raw-code bugs — `${t(…)}` or `t(…)` inside plain-quoted strings, users see literal code:**

| # | Line | Bug |
|---|------|-----|
| B1 | 207 | `${t("celebrate")}` inside single-quoted string in level-up overlay |
| B2 | 306 | `${t("undone")}` and `${t("undo")}` inside plain strings in `recRow` |
| B3 | 548 | `t("yesDo")` as literal text in `confirmModal` (plus hardcoded `Cancel`) |
| B4 | 586 | `${t("empty")}` inside single-quoted string in gift-room shelf slots |

**Hard-coded English (leaks in Chinese mode) — all move to `src/i18n.js`:**

Lines 189 (error toast), 248 (pagehead "Rate …" + selection sub), 253–254 (★/# legend),
277 (`pick()` sub update), 282 ("Select one or more students first"), 286 (award toast),
296 + 298 (records sub/empty), 311 ("Undone: …"), 321 (shop sub), 345 (stock pills —
partially inline-ternaried), 362/364/365/366/369 (approve/decline toasts), 375–379
(Give-now modal), 386–388 + 392 (give toasts), 410 ("Leaderboards" h1), 436 (progress
board empty), 442 + **450–451 (pagehead "Setup" rendered TWICE — dedupe)**, 447 (credit
box sentence), 468–474 (rule editor labels, "Delete", "+ Add rule"), 481–485 (add-student
placeholder — key `addStudent` already exists — and remove-button label), 495 (data
paragraph), 507/515–516/521–523/527/530 (settings toasts & confirm bodies), 542 (reset
confirm body — copy changes anyway with empty-start), 548 (modal buttons), 555 (room
not-found), 563/567/568/570 (room head), 577 (mystery-box button + title), 583 (shelf
sub), 598 ("No requests yet…"), 606 (box-win toast, incl. rarity words), 611–620 (ask
modal, "Ask" button), 630 ("Requested: …"). Plus `src/landing.js` `openLicense()`
(English-only body — localize summary paragraphs, keep the bilingual legal lines).

**Demo seed on first run:** `seed()` (line 90–120) creates "Class 4B / Maple Grove
Primary" + 16 students + fake history; `init` runs `if(!load())seed()` at the bottom of
`landing.js`. **Renames:** `src/tmp-test.js`, `src/gen-test.py`. **No CI workflow
exists.**

## 3. Goals / Non-goals / Anti-goals

**Goals**
1. `#/screen` big-screen mode for the classroom display: class goal + live student
   tiles + award pops, readable from 8 m on 1080p, updates instantly, survives reload.
2. Two-tap quick-award (select student(s) → tap rule), undo preserved, positive and
   negative rules both stay.
3. Kid visual system app-wide: rounded, bright-warm, emoji-first, short text, ≥44 px
   touch targets. Landing page keeps its editorial studio look untouched.
4. All bugs in §2.1 fixed; zero English leaks in Chinese mode; Chinese becomes the
   default language.
5. Levels based on lifetime positive points (never lost); wallet = positives −
   negatives − spending, floored at 0.
6. Fresh installs start empty with a "Try demo" button; existing teacher data is never
   touched.
7. Hygiene: proper file names, GitHub Actions CI (assemble + tests), README updated.

**Non-goals (this round)**
- Cross-device sync, accounts, backend, analytics, export formats beyond current JSON.
- Changing the landing page's editorial design or copy.
- Removing negative points (they stay, by decision).
- Embedding new font files (system-ui rounded stack for the app instead).

**Anti-goals (failure even if it works)**
- Any child name or class data leaving the device; any network request at runtime.
- Public shaming on the big screen: no red alarms, no sirens, no sound for negatives.
- Copying code, artwork, names or copy from learn-fun.cn.
- Deploying to Vercel (blocked in mainland China). Deploys stay GitHub Pages +
  my-gifts-with-mo.duckdns.org, and only with the teacher's approval.

## 4. Constraints

- One deployable `index.html`, offline-capable, fast on an old school computer; size
  budget: ≤ +20 KB over today's file (no new embedded assets; sounds are synthesized).
- `localStorage` only; `LS_KEY` unchanged; **must not wipe or migrate away existing
  data** — new settings keys use `(S.settings.x || default)` fallbacks.
- Bilingual 中文/EN, **Chinese default**; every user-visible string through `t()`.
- All user-entered text through `esc()` (XSS-safe). No `eval`, no inline JSON injection.
- Respect `prefers-reduced-motion` **and** the existing Settings → Motion
  (auto/on/off) switch; the two combine as they do today (`.gs-motion` class).
- No push, no deploy, no CI-secret setup without approval. Local commits in small
  steps are expected.
- Dev reality: build machine is Windows; `python3` + `node` on PATH; keep the
  no-dependency test harness (DOM stubs) so CI needs no browser download.

## 5. Approaches considered

**A. How the big screen gets live updates** *(the core architectural choice)*
1. **Two-tab + `storage` event + on-screen award drawer (CHOSEN).** The teacher keeps
   the Classroom tab open next to (or instead of) `#/screen`; every mutation already
   calls `save()`, and a `storage` listener re-renders the screen (same browser, same
   machine, zero new infrastructure). For single-tab use, `#/screen` also has a
   teacher-only quick-award drawer (bottom slide-up, §6.1) — same two-tap flow. Works
   on GitHub Pages and duckdns (real origins). Limitation noted: `storage` events are
   unreliable on `file://` — there the drawer is the path; documented in README.
2. Big Screen as the only award surface (no sync needed). Rejected: the award UI would
   cover the kids' view every time the teacher rates, and the Classroom tab (with
   legend, undo list, levels) already exists and works.
3. Cross-device presentation (BroadcastChannel/QR/WebSocket). Rejected by teacher
   decision: no cross-device sync.

**B. Level re-base: derived vs. stored snapshot**
Derived (CHOSEN): `levelOf(positivesOnly)` — nothing stored changes, no migration, old
data instantly reinterprets correctly. Stored snapshots would allow "level history"
but require a migration touching every past record — not worth it now.

**C. Kid theme: retokenize globally vs. scope a playful layer (CHOSEN: scoped)**
Landing keeps the editorial tokens; the app shell (`#/app`, `#/room`, `#/screen`)
renders inside an `.app-ui` scope that swaps tokens: `--radius` 0→18 px, soft shadows,
bright warm accents (sunny amber, teal, coral, mint) tuned for AA contrast, system
rounded font stack for body (`ui-rounded, "Segoe UI", "PingFang SC", "Microsoft
YaHei", system-ui`), Instrument Serif stays for big headings. Shared primitives used
by the landing get a landing-scoped override so the landing is pixel-unchanged.
(Builder step WP5 starts with an audit of which primitives the landing actually uses.)

**D. Award sound: asset files vs. WebAudio synthesis (CHOSEN: synthesis)**
Keeps the single-file promise (no audio downloads, no licensing), ~1–2 KB of code: a
short two-note chime for positives only. Default **muted**; toggle on screen and in
Settings (`settings.sound`, default `"off"`).

## 6. The design

### 6.1 Big Screen mode — `#/screen`

**Entry & chrome.** New route in `route()`. Full-bleed playful background. Top bar
(left→right): class name + goal panel · spacer · mute button 🔊/🔇 (`aria-pressed`,
persisted) · fullscreen button ⛶ (requestFullscreen + webkit fallback, also `F` key;
Esc exits natively) · exit link back to `#/app/classroom` (also `Esc` when not in
fullscreen). Language toggle available via the drawer only (keeps the kids' view
clean).

**Class goal panel (top).** Horizontal track, large rocket 🚀 at the progress head,
label + numbers: `goal.label` (default zh "周五奖励" / en "Friday reward"),
percentage and remaining points. Basis: **sum of positive points earned this school
week** (Monday-based `weekStart()`, already in the code). Teacher sets target + label
in Settings; goal hidden until enabled. My call (flagged): weekly basis matches the
"Friday reward" framing and auto-resets; alternative (all-time) would make the bar
freeze after week one.

**Student tile grid.** Tiles: avatar (initial on hue bg — existing `hueOf`), name,
level badge + `Lv N`, wallet `★ N`, thin progress bar to next level. Density: CSS
grid, `repeat(auto-fill, minmax(…))` tuned so **up to 48 students fit 1920×1080 with
no scrolling** (8×6); beyond that the grid scrolls vertically (rare). Tiles are
display-only — no click navigation (my call: avoids accidental route changes on a
touch screen).

**Type scale for 8 m on 1080p** (acceptance-tested, §8): student name ≥ 32 px bold ·
wallet/points ≥ 44 px tabular · level ≥ 24 px · goal label ≥ 32 px, numbers ≥ 44 px ·
negative marker ≥ 20 px. Ink-on-light contrast ≥ 4.5:1 everywhere (≥ 3:1 for ≥ 24 px
text).

**Live updates.** (1) `window.addEventListener("storage", …)` → re-render the grid +
goal when the `gifted-scholars-v1` key changes (other tab, same browser). (2) Awards
made through the drawer re-render directly. Which path applies depends on the
classroom setup, both supported: **single display** (computer drives only the
projector) → the teacher lives inside `#/screen` and awards through the drawer; that
is the complete flow on its own. **Dual display** (teacher monitor + projector) →
Classroom tab on the monitor, `#/screen` fullscreen on the projector, `storage` events
keep it live. Re-render is a full grid rebuild (≤ 48
tiles, no inputs → no focus loss); a before/after snapshot (wallet + level per
student) drives the **pop animations on exactly the changed tiles**, so celebration
survives the rebuild.

**Award pops.**
- *Positive:* tile does one soft bounce + scale (CSS transform only, ≤ 0.6 s), a burst
  of ≤ 16 confetti dots from the tile (DOM particles, transform+opacity only, cleaned
  up after ≤ 1.2 s), the value `+N` floats up, and — if unmuted — the two-note chime.
  If the award crosses a level threshold: the level badge pops and the new badge emoji
  shows briefly on the tile (the full-screen level-up overlay stays in the Classroom
  tab; on `#/screen` it's tile-local so the lesson isn't hijacked — my call).
- *Negative:* **no sound, no red, no alarm.** A small quiet grey `−N` chip fades in on
  the tile for ~60 s, then fades out. Settings toggle **"Hide negatives on big
  screen"** (`settings.screenHideNeg`, default off) suppresses even that. Points count
  either way (wallet math unchanged).
- *Reduced motion / Motion=off:* no bounce, no confetti, no float. Feedback is a
  static `+N`/`−N` badge that appears and fades (opacity only) — still immediate and
  visible, zero movement.

**Quick-award drawer (teacher-only).** Button on the top bar (🖐 icon, also `A` key)
slides a panel up over the bottom ~35% of the screen. Inside: student chips
(multi-select, same `sel` set + `aria-pressed`), then rule chips — reusing the
Classroom generators so both surfaces can't drift apart. Two taps total: student(s) →
rule. Includes "Undo last" (undoes the most recent record via the existing
`undoRecord`) and Close. Sliding animation obeys the motion switch (fades in place
when reduced). Drawer is the only place with small-ish text — it's for the teacher at
the desk, not the class.

### 6.2 Economy re-base (approved decisions)

- `growthOf(st)` → **lifetime positive points**: sum of `value > 0` record values
  (undone excluded). Levels (`levelOf`, `lvlProgress`, level-up detection in
  `applyRule`) follow this — **a level can never be lost**.
- `walletOf(st)` = `max(0, positives − negatives − spentOnGifts − boxSpent)` —
  negatives still bite the spendable wallet, floored at 0.
- Displays: Classroom card keeps `★ wallet` but the old `# growth` number becomes the
  level + progress bar (growth score was teacher-jargon; the bar says the same thing
  to kids). Leaderboards: All-time = lifetime positives; This week = weekly net
  (positives − negatives, mirrors wallet thinking); Progress = delta of weekly net vs
  previous week. Legend/labels updated accordingly.
- No stored data changes → no migration; the teacher's existing localStorage keeps
  working and levels can only go up on re-open.

### 6.3 Kid visual system (app scope only)

- `.app-ui` scope swaps tokens: radius 18 px (24 px on big tiles), soft small shadows,
  warm bright palette (amber `#F5B841` family, teal, coral, mint) on the existing bone
  paper — tuned, not neon; AA contrast verified per pair used for text.
- Emoji-first: every heading, button, tab and empty-state leads with emoji; short
  strings (i18n keys get kid-friendly copy, e.g. zh "点学生，再点规则" not formal
  sentences).
- All interactive targets ≥ 44×44 px (`.btn.sm` on the teacher-only surfaces stays 36
  px — teacher surfaces, not kid surfaces; flagged as my call).
- Landing page: zero visual change (verified by screenshot diff in QA).

### 6.4 Empty start + Try demo

- Fresh browser (no saved state): **empty class** — default settings
  (`className` zh "我的班级" / en "My class", teacher "", school ""), zero students,
  zero records; `seed()` is no longer called by init.
- Classroom shows a friendly onboarding card: "Add students in Setup" + big
  **"Try demo"** button (seeds the existing demo class so the teacher can explore).
  Same button on the landing page's enter flow (my call — one more discovery point).
  Guard: if any real data already exists (students or records), "Try demo" asks for
  confirmation before replacing it — the empty-state card never shows in that case,
  but the landing entry point can.
- Settings keeps an explicit "Reset to demo data" (danger-styled, confirm modal) and
  gains "Start empty" (wipes to the empty class, confirm modal). Copy for both is
  honest about what's deleted.

### 6.5 i18n completion & default language

- Fix B1–B4 and move every string in §2.1's audit into `I18N` with natural zh + en
  (en is the fallback locale; zh reviewed for kid-appropriate tone). Interpolated
  values via `t(key, {n})`.
- Language detection order becomes: stored `gs-lang` → **zh default** (was en). A
  visitor who wants English taps 中文/EN once and it persists.
- **Parity is enforced by tests**: en/zh key sets identical; a rendered-DOM scan of
  every route asserts none of the known leak-strings and no literal `${` appears.

### 6.6 Hygiene: renames, CI, README

- `src/gen-test.py` → **`src/gen_tests.py`**; it writes **`src/tests_run.js`** (was
  `tmp-test.js`), which is gitignored (generated artifact). README + any docs updated.
- `.github/workflows/ci.yml` (push + PR): setup Python 3.x + Node 20 →
  `python3 src/assemble.py` → assert regenerated `index.html` is byte-identical to the
  committed one (catches hand-edits) → `python3 src/gen_tests.py && node
  src/tests_run.js`. No browser download, no npm install, < 1 min. The runner checks
  out LF (ubuntu), so the byte-diff is stable in CI; local Windows rebuilds can differ
  in line endings — README notes it.
- README: new "Big Screen mode" section (how to run the two-tab setup, the `file://`
  caveat, `F`/`A`/`Esc` keys), updated build/test commands, updated Verification
  section.

### 6.7 Compatibility & privacy

- `LS_KEY` unchanged; no key is renamed or removed; new settings (`sound`,
  `screenHideNeg`, `goal`) read with fallbacks. A teacher with live class data
  upgrades by reloading the page — nothing asks them anything.
- No new network requests; sounds synthesized; confetti is DOM. Child names stay in
  localStorage on the device (and in the teacher's own JSON export).

## 7. Accessibility & reduced-motion requirements (binding)

1. **Contrast:** WCAG 2.1 AA — 4.5:1 normal text, 3:1 large (≥ 24 px) in the new
   palette; verified per text/background pair in QA.
2. **Targets:** ≥ 44×44 px for every kid-facing control; drawer/teacher-only controls
   ≥ 36 px.
3. **Keyboard:** Classroom tiles and drawer controls operable by keyboard
   (Enter/Space on tiles already exists — keep); `A` opens drawer, `Esc` closes
   overlays/drawer, `F` toggles fullscreen; focus-visible outlines never removed.
4. **Semantics:** progress bars are `role="progressbar"` with `aria-valuemin/max/now`
   + labels; tiles use `aria-pressed`; mute/fullscreen use `aria-pressed` +
   `aria-label`s; toasts stay in the `aria-live="polite"` wrap; award feedback on the
   screen has a polite live-region twin (`+2 · Chen`) so the change is announced
   without motion.
5. **No color-only meaning:** negatives carry a minus sign + icon, never just red;
   levels carry badge emoji + text.
6. **Motion:** `prefers-reduced-motion: reduce` OR Settings Motion=off ⇒ no bounce,
   no confetti, no float, no slide — opacity-only feedback, static final states.
   `motion:"on"` overrides the OS preference (existing semantics preserved).
7. **Sound:** default muted; positives-only; negatives never audible; the mute state
   is discoverable (icon button, persisted).
8. **Zoom/reflow:** app usable at 200% zoom and 390 px width (screen view scrolls if
   needed — it's a display surface, the phone target is the app tabs).

## 8. Acceptance criteria (Definition of Done)

1. **`#/screen` on 1920×1080:** goal panel + ≥ 40 student tiles with no scrolling;
   type minimums of §6.1 met (checked programmatically on computed styles); an award
   in the other tab updates the tile in < 200 ms (measured); an award via the drawer
   updates instantly; reload restores the same view + numbers from localStorage;
   fullscreen and mute buttons work and persist.
2. **Raw-code bugs gone:** automated test asserts no `${` and no `t("` literal in any
   rendered route's HTML; B1–B4 verified visually in screenshots (zh + en).
3. **No English leaks in zh:** i18n parity test (identical en/zh key sets) + rendered
   scan of every route in zh against the leak-list + manual spot-check of all modals.
4. **Economy:** unit tests — level depends only on positives (adding negatives never
   lowers it), wallet = the approved formula incl. floor-at-0, level-up fires on
   threshold cross, undo restores previous state exactly.
5. **Empty start:** fresh profile shows empty class + Try demo; demo button seeds;
   existing populated profile (simulated old data) upgrades with all data intact.
6. **Green:** full node suite passes (old tests updated where behavior legitimately
   changed — e.g. growth now positives-only — each such edit listed in the summary);
   CI workflow green on push/PR; assemble byte-diff check passes.
7. **Headless browser:** zero console errors/page errors on every route incl.
   `#/screen` at 1920×1080 and 390×844; reload persistence verified; reduced-motion
   pass shows no particle/transform animations; screenshots reviewed (zh default).
8. **Accessibility checklist §7** verified in QA (contrast pairs, keyboard pass,
   aria assertions in the headless run).
9. **Single file, offline:** no runtime network requests (headless-verified); size
   ≤ +20 KB.
10. Final summary to the teacher: what changed, what was tested (with numbers), what
    remains — before any push/deploy approval.

## 9. Test & verification plan

- **Unit (node harness, extended):** economy rules; level-up detection on positives;
  goal math; i18n parity + interpolation; empty-init; render smoke for every route
  incl. `#/screen` (grid count, goal, buttons); leak-scan assertions; storage-event
  handler presence; drawer award flow mutates state identically to Classroom.
- **Headless browser (local QA rig, Playwright + system Edge — same pattern as the
  other workspace projects):** routes/console errors, 1080p + 390 widths, reload
  persistence, two-tab `storage` update timing, reduced-motion pass, keyboard pass,
  screenshots (zh + en, classroom + screen + drawer).
- **Manual (teacher, before release):** project it in the real classroom; check 8 m
  readability with real names; try the two-tab setup on the actual school computer.

## 10. Build stages & skills used

| Stage | Work | Skills |
|---|---|---|
| 0 (this doc) | Spec | superpowers:brainstorming (architectural path) |
| 1 | Implementation plan | superpowers:writing-plans → teacher picks execution mode |
| 2 · WP1 | i18n completion + B1–B4 + leak sweep | i18n-sync (parity discipline), superpowers:test-driven-development, superpowers:systematic-debugging |
| 2 · WP2 | Economy re-base (levels/wallet) | superpowers:test-driven-development |
| 2 · WP3 | Empty start + Try demo | superpowers:test-driven-development |
| 2 · WP4 | Big Screen view + drawer + storage sync | frontend-design, accessibility, accessible-animation, 60fps-animation, superpowers:test-driven-development, superpowers:systematic-debugging |
| 2 · WP5 | Kid theme (`.app-ui` tokens) | frontend-design, accessibility |
| 2 · WP6 | Renames + CI + README | superpowers:verification-before-completion |
| 3 | Full verification vs §8 | superpowers:verification-before-completion |

All skills verified installed in the local library — no downloads needed.
Execution is inline (Links has no subagent runtime); `dispatching-parallel-agents`
not applicable.

## 11. Commit plan (local only; push/deploy only after approval)

1. `docs: big-screen rewards design spec` (this file)
2. `fix(i18n): raw ${t()} bugs + full zh/en coverage, zh default`
3. `feat(economy): levels on lifetime positives; wallet formula`
4. `feat(start): empty first run + Try demo`
5. `feat(screen): #/screen big-screen mode + quick-award drawer`
6. `feat(theme): kid visual system for app scope`
7. `chore: rename test files, add CI, update README`

## 12. My calls (builder decisions — flag anything you disagree with)

1. Goal basis = weekly positives (auto-resets Monday), default label "周五奖励".
2. Sound default **muted**; positives only.
3. Big-screen tiles are display-only (no navigation).
4. Level-up celebration on `#/screen` is tile-local, not full-screen.
5. `.btn.sm` stays 36 px on teacher-only surfaces.
6. Language default flips to zh for everyone without a saved choice.
7. "Try demo" also appears once on the landing enter flow.
8. Classroom card drops the raw `# growth` number for a progress bar.
9. Settings gains "Start empty" next to "Reset to demo".
10. CI regenerates `index.html` and fails on byte-diff (keeps the source→file contract
    honest).

## 13. Explicitly out of scope / future ideas

Cross-device or phone-based awarding; per-student weekly caps; printable reports;
sound themes; more than zh/en languages. Recorded, not built.
