# Visual Release Audit — Task 2

Audit date: 2026-11-10 · Fresh captures after fixes: `qa/shots/release-audit/` (59 PNGs,
5 viewports × 12 targets, plus verification probes). Capture rig: Playwright Edge headless
(`qa/shots_release_audit.py`), built `index.html`, zh default.

## Method note (important for reading the screenshots)

The landing reveals content on scroll (`.rv` + IntersectionObserver, gated behind
`html.gs-motion`). A naive `full_page` screenshot does not scroll, so first-round captures
showed blank sections. **This is a capture artifact, not a product defect** — verified:
without JS (no `gs-motion` class), without IntersectionObserver, or with reduced motion,
`.rv` elements are fully visible (landing.css line 148 gates hiding on `html.gs-motion`).
The capture rig now scrolls through the page before shooting. Two real defects were found
by the audit and **fixed** (below).

## Targets captured

| # | Target | Viewports | Result |
|---|---|---|---|
| 01 | Homepage hero | 5 | PASS — wordmark, gift character, CTAs, chips all render; no overflow at any width |
| 02 | Complete homepage (full page) | 5 | PASS (after scroll-through) — all sections populated, cohesive rhythm |
| 03 | Feature grid | 5 | PASS — 3×2 cards, consistent icon/hairline style |
| 04 | How-it-works | 5 | PASS — 3 numbered steps, aligned |
| 05 | Big Screen section | 5 | **DEFECT FOUND → FIXED** (see D1) |
| 06 | Privacy section | 5 | PASS — 3 tiles + tip line |
| 07 | FAQ | 5 | PASS — accordion, first item open by default, +/− indicators |
| 08 | Footer | 5 | PASS — 4 link groups, school line, credit, giant wordmark |
| 09 | Mobile navigation open | 768/390/320 | PASS — 44px rows, boxed CTA, EN toggle; closes on link click, Esc, burger |
| 10 | Help page | 5 | PASS — 10 items, search box, back links, consistent editorial style |
| 11 | Random picker | 5 | PASS — drawn name shown, draw/close work; controls all visible at 390 (top bar wraps) |
| 12 | Room picker modal | 5 | PASS — localized, focused input with visible ring; backdrop dim is subtle (minor, noted) |

## Defects found and fixed (allowed: genuine defects)

**D1 — Night-band chips unreadable (cream-on-cream).** The four spec chips (班级目标 / 加分动效 /
快速加分抽屉 / 8 米外可读) rendered as cream-filled pills with cream text. Root cause: global
`app.css .chip` (kid voice: cream background, hard shadow, 44px min-height) leaked into the
landing's `.nightband .chip` (which only overrode color/border → same-specificity properties
merged). Fix: explicit `background:transparent; box-shadow:none; min-height:0` in the landing
scope (landing.css). Verified visually post-fix. *Systemic note: generic class names are shared
across the two voices; recommend a one-off rename audit post-release (not in this audit's scope).*

**D2 — Big Screen tiles collapsed to ~31px on narrow layouts.** At 390px the `#/screen` tiles
rendered as 30–48px slivers (name invisible, progress bar missing). Root cause: Task-10 pop
effects gave `.scr-tile{overflow:hidden}`, which zeroes the item's automatic minimum-size
contribution; the grid's implicit rows then collapsed on narrow configurations (measured:
tile 31px vs content 110px). Fix: `grid-auto-rows:min-content` on `.scr-grid` (screen.css).
Verified: mobile tiles now 144px (avatar + name + ★ points + bar all visible); desktop 163px;
**binding density re-verified at 1920×1080: 24 and 30 tiles fit with zero page AND zero grid
scroll; 40 students scroll inside the grid only** (page never scrolls); binding fonts intact
(name 32px / points 44px / level 24px).

## Minor observations (recorded, intentionally NOT fixed in audit — no functional impact)

- Hero em-phrase 大大的笑容 can wrap leaving 容。 alone at some widths — natural CJK line
  breaking; acceptable.
- Landing study-figure readouts (天数/点数/…) start at 0 and accumulate live — static captures
  show zeros; by design (animated demo).
- Mobile menu is a dropdown sheet without page backdrop; closes via link, Esc, or burger.
  Clicking outside does not close (minor UX polish candidate).
- Room-picker modal backdrop dim is subtle; input focus ring is clearly visible (a11y ✓).

## Verdict

**Visual quality: PASS** after the two fixes. No remaining misalignment, overflow,
typographic inconsistency, or broken interaction observed at any of the five viewports.
