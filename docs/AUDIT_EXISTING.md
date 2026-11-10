# Existing Project Audit — Gifted Scholars (my-gifts-with-mo.duckdns.org)

Date: 2026-11-10 · Auditor: overnight program, machine DESKTOP-FUMPBJ9.

## Stack & architecture
- **Single-file app**, built from modular sources: `python3 src/assemble.py` → `index.html`
  (one deployable file, offline-capable, zero runtime network requests — verified).
- Sources: `src/head.html`, `body.html`, `tail.html`, `fonts.css` (embedded WOFF2, 163 KB),
  `app.css`, `landing.css`, `screen.css`, `i18n.js` (zh/en dicts, parity-tested),
  `app-core.js`, `screen.js`, `landing.js`; `build-tests.py` → `test-bundle.js` (node suite).
- **No backend by design** (privacy rule: child data never leaves the device; localStorage only).
- Hosting: Cloudflare Pages (project `englishwithmo` family) + GitHub Pages mirror; live site
  currently runs the OLD `main` build. **The `feature/big-screen` branch is local-only, not pushed.**

## Current functionality (working, tested)
- Teacher app: classroom quick-award (multi-select + rules), full undo trail, records,
  gift shop with request/approve flow, student gift rooms (mystery boxes, collections),
  leaderboards (week/progress/all-time), settings (motion, sound, language, goal, hide-negatives).
- **Big Screen mode `#/screen`** (overnight program): class goal rocket (weekly positives),
  24–30 tiles no-scroll @1080p, record-id-driven award pops (confetti ≤150 particles, badge
  fallback), quiet negative markers (+ hide toggle), WebAudio chime + one-tap sound chip,
  two-tap quick-award drawer, A/F/Esc shortcuts (typing/IME/modifier-guarded), fullscreen, mute.
- Bilingual zh (default) / EN everywhere; zh demo class; empty start with onboarding + demo seed.
- Multi-tab state safety (`withState` + storage-event re-sync, no lost records — tested).

## Quality state
- Node suite **85/85 PASS** (strict `=== true`; includes i18n parity, zh leak sweep, missing-key
  detector, route coverage, goal-boundary tests, fixture-upgrade test, save-call allow-list scan).
- Headless smoke 8/8 (landing, screen, award persistence, reload, zero console errors).
- Extra checks: 4× CPU throttle (median frame 16.7ms, cap holds), robustness (corrupt JSON,
  quota-exceeded banner + recovery, 50-student roster, emoji/CJK names), WCAG contrast
  (26 pairs, 0 below threshold after fixes), reduced-motion (OS + setting), fresh-clone build proof.
- Size: index.html **301,888 B** (+37.2 KB of the agreed +40 KB budget; 163 KB of that is fonts).
- CI workflow ready (`.github/workflows/ci.yml`, `cd src` build+test+byte-diff).

## Branch / recovery state
- `feature/big-screen` = 4 commits since fork from `origin/main` (`24191d1`), tags
  `cp-reconstruct`, `cp-overnight-final`. History was **reconstructed** on 2026-11-10 after the
  local `.git` was lost to a linkssync sync-dance failure (working tree was intact; per-task
  history cp-task10..13 existed only in the lost `.git`; narrative preserved in
  `docs/overnight-log.md`). In-tree safety bundle: `.git-history-backup.bundle`.
- **Recovery point for THIS program:** tag `cp-overnight-final` (commit `d50739d`).

## Known gaps this program addresses
- Marketing/landing page is a single editorial hero — no product IA (features, how-it-works,
  FAQ/help, footer nav), no mobile menu.
- App UI is functional but visually plain in places; two-audience identity (teacher/kid) not
  yet expressed as a documented design system.
- Help/onboarding content thin; no FAQ; no printable guide.
