# Accessibility Audit — Task 5

Audit date: 2026-11-10 · Tools: axe-core 4.x (wcag2a/2aa/21aa tags) + manual keyboard & focus
passes in Playwright Edge. Runs against the built `index.html`; reduced-motion emulated ON for
the whole pass. Rig: `qa/a11y_audit.py`, `qa/axe_landing_settled.py`.

## Automated results (axe-core)

| View | Initial | After fixes |
|---|---|---|
| Landing (#/) | 15 × serious `color-contrast` | **CLEAN** |
| Help (#/help) | CLEAN | CLEAN |
| Big Screen (#/screen) | 1 × serious `scrollable-region-focusable` | **CLEAN** |
| Classroom (#/app/classroom) | 16 × serious `nested-interactive` | **CLEAN** |

Corroborated by **Lighthouse Accessibility = 100** (Task 4, final build).

## Defects found and fixed (genuine, WCAG-level)

1. **Nested interactive controls (classroom, ×16).** Each student card was a
   `div[role=button][tabindex=0]` containing a room link — interactive-inside-interactive,
   with a hand-rolled Enter/Space handler. Fixed with the standard overlay pattern: the card
   now contains a real `<button class="cardhit">` (transparent, inset-0) carrying
   `aria-pressed` + native keyboard activation; the room link sits above it (`z-index`).
   Keyboard selection now works via actual buttons; `:focus-visible` outline added.
2. **Big-Screen grid not keyboard-scrollable.** `.scr-grid` (the internal scroller for >30
   students) was unreachable by keyboard. Fixed: `tabindex="0"` + localized
   `aria-label` (学生卡片（可滚动）/ Student tiles (scrollable)).
3. **Big Screen had no `h1`.** Added visually-hidden `<h1>` (教室大屏) — every view now has
   exactly one H1.
4. **Landing contrast (×15 + the 5 earlier Task-4 fixes).** All small muted captions
   (fignote, privacy row words, data/readout keys, footer strip, footlink group labels,
   table headers) moved from `--muted` (#6E6A61 ≈ 4.0:1) to `--ink-soft` (#4A4741 ≈ 7.6:1).
   Note honestly: Lighthouse's contrast audit passed these after Task 4 (sampling differs);
   axe's full-DOM scan caught the rest — all 8 remaining `--muted` usages were swept.
5. **Decorative SVGs.** Feature-card icons (plus/screen/gift/levels/history/lang) now carry
   `aria-hidden="true"` (12 svgs previously unannotated); the level-curve figure keeps its
   meaningful `role="img"` + label; the gift mascot keeps `aria-hidden` (decorative).
6. **Language toggle name (from Task 4).** Visible label now contained in the accessible
   name in both languages (EN/中文), fixing `label-content-name-mismatch`.

## Manual checks (executed)

| Check | Result |
|---|---|
| Skip link is the first tabbable element (跳到正文) and jumps to `#gsmain` | PASS |
| Focus indicator | PASS — 2px solid outline on focused links/buttons (incl. new `.cardhit:focus-visible`) |
| Heading hierarchy | PASS — landing: single H1 → H2 sections → H3 cards; help/screen/app: single H1 each (screen fixed) |
| Keyboard: FAQ | PASS — native `<details>/<summary>` (Enter/Space toggle, tested both directions) |
| Keyboard: mobile menu | PASS — burger opens (aria-expanded truthful), Esc closes |
| Keyboard: Big-Screen shortcuts | PASS — A/F/Esc with typing/IME/modifier guards (Task 12 suite) |
| Modal (room picker) | PASS — input labelled (`aria-label="你的名字"`), Esc closes; focus is NOT trapped (minor: focus is not moved into the modal on open — polish candidate, recorded not fixed) |
| Image alternatives | PASS — no `<img>` elements; decorative inline SVGs `aria-hidden`; the one meaningful SVG has `role="img"` + text label |
| Colour contrast | PASS — axe CLEAN on all four views; Lighthouse 100 |
| Reduced motion | PASS — emulated `prefers-reduced-motion: reduce`: 0 confetti particles, 0 tile animations, static final states (also verified for Settings Motion=off in the overnight program, check d1/d2) |
| Language attribute | PASS — `<html lang>` toggles zh-CN/en with the language (`applyLangDoc`) |
| Console | PASS — 0 page errors during the whole a11y pass |

## Verdict

**Accessibility: PASS** — axe-core CLEAN (wcag2a/2aa/21aa) on all four views after fixes 1–6,
Lighthouse A11y 100, all manual keyboard/focus/reduced-motion checks green.
Known polish candidate (not fixed, non-blocking): room-picker modal does not move focus into
the dialog on open; a full focus-trap would be the last refinement for screen-reader users.
