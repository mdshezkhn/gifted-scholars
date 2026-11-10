# Quality Assurance Report — professional-remake program

Date: 2026-11-10 · Branch `feature/big-screen` @ `54f59f6` (tag `cp-remake`).
Legend: PASS / FAIL / NOT TESTED / BLOCKED. Nothing is marked PASS that was not executed.

## A. Technical
| Check | Result | Evidence |
|---|---|---|
| Build (`assemble.py`) | PASS | `assembled: 330168 bytes`, exit 0 |
| Node test suite | PASS | **90/90 ALL PASS** (strict `=== true` harness; incl. 5 new RED→GREEN tests) |
| RED phase for new tests | PASS | all 5 new tests failed first (`missing…/no…`) before implementation; commits show test commit preceding feature commit |
| Route coverage (10 routes incl. new `#/help`) | PASS | `route coverage all views` + per-route leak sweep |
| i18n parity en/zh | PASS | `test_i18n_parity` (regression pin) |
| zh leak sweep (raw keys, English phrases, snake_case, missing keys) | PASS | 10 routes × combined view+modal+toast scan |
| Missing-key detector | PASS | `no missing i18n keys (final)` |
| Browser console errors | PASS | 0 page errors across: smoke 8 checks, 5-width × 3-view sweep, contrast crawl |
| Runtime network requests | PASS | `8.9 no runtime network requests` (verify15) — unchanged; page is fully offline |
| Save-call discipline (`save()` inside `withState`) | PASS | allow-list scan green |
| Fresh-clone build | PASS | (overnight check e, rerun after reconstruction) |

## B. Functional
| Check | Result | Evidence |
|---|---|---|
| Landing renders (zh default) | PASS | smoke `landing loads`; hero + all sections |
| Mobile menu (≤900px) | PASS | burger → panel with 7 links + room + lang; Esc closes; 768/390/320 screenshots |
| Skip-to-content link | PASS | present + target `#gsmain` |
| `#/help` view + live search | PASS | 10 items; pure filter fn tested (hide-all / keep-match); view renders in browser shots |
| FAQ accordion | PASS | 6 `<details>` items, first open by default; visual confirmed |
| Room-picker modal localization | PASS | title/cancel localized; English-leak phrases added to sweep (`Open a gift room`, `>Cancel<`) |
| Random picker (Big Screen) | PASS | fair-bag test: every student drawn once before reshuffle; Esc/close; aria-live announce; button visible at 390 after topbar wrap fix |
| Big Screen goal/tiles/pops/drawer/shortcuts | PASS | unchanged overnight suites (goal math + Monday/Sunday boundaries + pops + two-tab) |
| Data safety (localStorage, withState, storage events) | PASS | two-tab + undo/approve-after-storage tests; fixture-upgrade test |
| Demo / empty start / backup-first confirms | PASS | WP3 suites unchanged |

## C. Visual / responsive
| Check | Result | Evidence |
|---|---|---|
| Horizontal overflow at 1440/1280/768/390/320 | PASS | scrollWidth − width = 0 at every width (landing + help + screen) |
| Screenshots captured | PASS | 19 files in `qa/shots/remake/` (5 widths × landing/help/screen-picker + mobile menus + full-page) |
| Landing lower sections inspected by eye | PASS | feature grid, steps, night band + mock, privacy cards, FAQ, footer link groups render as designed |
| Screen top bar on phones | PASS after fix | buttons wrapped to own rows; `scrPick` rect fits (right 132 ≤ 390) — was clipped (453) before fix |
| Big-Screen 1080p density (24–30 tiles no scroll) | PASS | overnight layout9 check (unchanged files) |

## D. Accessibility
| Check | Result | Evidence |
|---|---|---|
| WCAG contrast, all 8 views | PASS | **27 text/bg pairs measured in DOM, 0 below** (4.5:1 normal / 3:1 large); script `qa/contrast.py`, output `qa/CONTRAST.md` |
| Keyboard: menu Esc, drawer Esc, picker Esc, A/F guards | PASS | unit + verify15 checks (typing/IME/modifier guards) |
| aria (menu aria-expanded, tiles progressbar, live region, aria-current) | PASS | existing suites + new menu aria |
| Reduced motion (OS + Settings) | PASS | overnight extra-check d (no particles/transforms) |
| Lighthouse score | NOT TESTED | no Lighthouse runner configured on this machine; honest omission |

## E. Security / privacy
| Check | Result | Evidence |
|---|---|---|
| No runtime network calls | PASS | verify15 8.9 |
| No secrets/keys in bundle | PASS | grep for token patterns clean; no env use |
| XSS: all user text escaped | PASS | esc() on names/labels; `&x` adversarial-name tests |
| Child data leaves device? | PASS (never) | architecture: localStorage only; no accounts |
| Dependency audit | NOT APPLICABLE | zero runtime dependencies |

## F. Reference-site conduct
| Check | Result |
|---|---|
| robots.txt honoured (`Allow /`, avoided `/api/`, `/uploads/`) | PASS |
| Only public pages captured (11 routes; auth boundary not crossed) | PASS |
| No reference code/assets/copy shipped in product | PASS — all landing art is original SVG; copy is original bilingual text |
| Captures kept out of the repo (`study/learn-fun/`) | PASS |

## Summary
90/90 unit · 8/8 smoke · 0 console errors · 0 overflow · 0 contrast failures · 0 network calls.
FAIL: none. BLOCKED: none. NOT TESTED: Lighthouse (tooling unavailable).
