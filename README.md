# Gifted Scholars — little stars. big smiles.

**Live site: <https://mdshezkhn.github.io/gifted-scholars/>** ·
Free forever · no ads · no tracking · nothing for sale

A free classroom-points platform for schools: teachers rate students in one
tap, students collect virtual gifts. Created by **Mohammed Shehzad Khan
("Teacher Mo")** and donated to **ZhongFangYuan Bilingual School** — see
`LICENSE.txt` (perpetual free license for the school; ownership and
copyright stay with the author forever; the license ends automatically if
the credit is removed or anyone charges money).

## Run it

Open the [live site](https://mdshezkhn.github.io/gifted-scholars/) or
`index.html` in any modern browser. That's it — one file, no install, no
server, no account, works offline. All data lives in the browser's local
storage on that device (per-device, per-browser). Use `Setup → Export JSON`
for backups.

- Landing: brand scene — the gift character's eyes follow your cursor
  (fine-pointer devices), click/tap anywhere for a leaf burst.
- Teacher app: `The classroom`, `Gift shop`, `Leaderboard` labels on the
  landing page, or `#/app/classroom` etc.
- Students: `Open a gift room` (type your name), or direct `#/room/<id>`.

## Design & motion

The landing scene applies the Sprig motion system (reference checkpoint
`b9635744`, supplied reference pack): exact layout geometry and breakpoints,
staggered entrances, gentle hover behavior, ambient leaf/sparkle accents,
the 8-second wordmark leaf sway, and click/tap leaf bursts. The gaze
controller is a faithful port of the reference `lib/gaze.ts` (22px dead
zone, rAF-coalesced input, shortest-path angle smoothing with 85ms
damping, exact settle). Necessary adaptations for this site: the character
is an original SVG gift box (no video), so the smoothed angle drives the
pupils; the wordmark is this brand's own mark (Epilogue 900); the four
topic labels navigate because this is a working app; the social icons row
became three promise badges.

`prefers-reduced-motion: reduce` disables entrances, hover motion, ambient
accents, bursts, and pupil tracking, as in the reference.

## Fonts

Epilogue 900 and DM Sans 400 are embedded (base64 WOFF2, `font-display:
swap`, `font-synthesis: none`) under the SIL Open Font License 1.1.
License files are in `/fonts` and must stay with any redistribution.

## Verification

41 unit + render tests pass headlessly (`src/` harness), plus a static
audit of every spec geometry/timing value. No real-browser screenshot
verification was possible on the build machine — visual review in a
browser is recommended (320, 390, 700, 768, 1024, 1440, 1920 px).

## Files

- `index.html` — the whole site (fonts embedded); deployed to GitHub Pages
- `LICENSE.txt` — ownership + free school license
- `fonts/` — font license texts (OFL)
- `src/` — build parts + test harness (not needed at runtime):
  `head/body/tail.html` + `app.css` + `landing.css` + `fonts.css` +
  `app-core.js` + `landing.js`, assembled by `assemble.py` into
  `index.html`; `stubs-new.js` + `test-body-new.js` are the test harness.

## Rebuild & test

```bash
python3 src/assemble.py          # regenerates index.html from src/
node src/run-tests.js            # 41 headless tests (cat parts first)
```

---

© 2026 Mohammed Shehzad Khan. Free for schools — never for sale. See
`LICENSE.txt` before copying, remixing, or deploying.
