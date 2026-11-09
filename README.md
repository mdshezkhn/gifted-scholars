# Gifted Scholars — little stars. big smiles.

**Live site (school-friendly): <https://my-gifts-with-mo.duckdns.org/>** ·
Direct: <https://mdshezkhn.github.io/gifted-scholars/> ·
Free forever · no ads · no tracking · nothing for sale

A free classroom-points platform for schools: teachers rate students in one
tap, students collect virtual gifts. Created by **Mohammed Shehzad Khan
("Teacher Mo")** and donated to **ZhongFangYuan Bilingual School** — see
`LICENSE.txt` (perpetual free license for the school; ownership and
copyright stay with the author forever; the license ends automatically if
the credit is removed or anyone charges money).

## Run it

Open the [live site](https://my-gifts-with-mo.duckdns.org/) or
`index.html` in any modern browser. That's it — one file, no install, no
server, no account, works offline. All data lives in the browser's local
storage on that device (per-device, per-browser). Use `Settings → Export
class as JSON` for backups.

- Landing: a warm editorial studio page — split wordmark bracketing the
  character, a to-scale drawing of the level curve, and a scroll-computed
  "one week" study. Bilingual: 中文 / EN toggle in the nav.
- Teacher app: `Classroom`, `Gift shop`, `Leaderboard`, `Records` in the
  nav, or `#/app/classroom` etc.
- Students: `Open a room` (type your name), or direct `#/room/<id>`.

## Design

Warm editorial studio system: bone ground `#E7E3DA`, ink `#1A1917`, one
pigment `#9B3418` used only on type/rules/markers; high-contrast display
serif (Instrument Serif) carries the voice, Azeret Mono carries every
measurable fact; square corners; hairline rules; no gradients, glows or
card grids. Motion: scroll-bound split wordmark, IntersectionObserver
reveals with 0.07 s staggers (above-fold pieces reveal on rAF), and a
pinned study whose readouts and marker are computed from one stated model
(d = 5·scroll, pts = 2d, level/progress from the app's LEVELS table).
The app UI shares the same palette and serif headings.

`prefers-reduced-motion: reduce` (or Settings → Motion effects → Reduced)
disables all decorative motion and shows static final states.

## Fonts

Instrument Serif 400 (roman + italic) and Azeret Mono 400/500/600 are
embedded (base64 WOFF2, `font-display: swap`) under the SIL Open Font
License 1.1. The license file is in `/fonts` and must stay with any
redistribution.

## Verification

31 headless tests pass (`gs/` harness: engine, i18n, landing structure,
study-model math, to-scale figure), plus real-headless-Chrome probes:
zero console errors, all routes reachable, scroll-bound transforms and
computed readouts verified, screenshots reviewed at desktop and mobile
widths.

## Files

- `index.html` — the whole site (fonts embedded); deployed to GitHub Pages
- `LICENSE.txt` — ownership + free school license (English + 中文)
- `fonts/` — font license text (OFL 1.1)
- `src/` — source parts + harness (not needed at runtime)

## Rebuild & test

```bash
cd src
python3 assemble.py     # regenerates ../index.html from the src/ parts
python3 build-tests.py  # writes the headless test bundle (test-bundle.js)
node test-bundle.js     # full suite (85 tests)
```

GitHub Actions runs the same three steps on every push (`.github/workflows/ci.yml`)
and fails if the committed `index.html` drifts from a fresh build.

## Big Screen mode (#/screen)

Open `index.html#/screen` on the classroom display.

- **Single display** (screen + teacher on one computer): tap **✨ Quick award**
  (or press `A`) — a drawer opens: tap students, tap a rule, done. Two taps
  per award. `↩︎ Undo last` reverses the newest award.
- **Two displays, one computer**: keep the browser on the big screen at
  `#/screen` and award from a second browser *window* (same browser!) at
  `#/app/classroom`. Both tabs share localStorage; the screen updates within
  ~200 ms via storage events. Two separate browsers do NOT share data.
- **Sound** is off by default. Turn it on with the 🔇/🔊 button; browsers
  require one tap anywhere on the page before audio can play (a chip reminds
  you once). Award chime only — negative points are always silent.
- **Shortcuts**: `A` quick award · `F` fullscreen · `Esc` close drawer.
  They are ignored while typing, with Ctrl/Alt/Win held, or during IME input.
- Negative points show as a small quiet marker; Settings → 🎁 has a toggle to
  hide them on the screen entirely. Points always still count.

## One origin, and back up

`my-gifts-with-mo.duckdns.org` and `mdshezkhn.github.io` are **different
origins with separate localStorage** — data entered on one is invisible on the
other. Pick ONE address and always open the site there. Export a backup
(Settings → Data → Export) weekly; Settings shows the last backup date.

**Windows note**: the repo stores LF line endings (`.gitattributes`); if a
local rebuild produces a huge `index.html` diff, run
`git add --renormalize .` and rebuild before committing.

---

© 2026 Mohammed Shehzad Khan. Free for schools — never for sale. See
`LICENSE.txt` before copying, remixing, or deploying.
