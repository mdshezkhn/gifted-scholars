# Functional Release Audit — Task 3

Audit date: 2026-11-10 · Rig: `qa/functional_audit.py` (Playwright Edge headless, real
clicks/keys against the built `index.html`; desktop 1440×900 + mobile 390×844 contexts).
**Final result: 26/26 PASS. Zero JavaScript errors across every journey.**

## Defects found and fixed (genuine, allowed)

**F1 — Landing nav anchors wiped the page instead of scrolling.** Clicking 产品特性 /
三步上手 / … set `location.hash="#features"`, the hash router re-rendered the landing
(replacing `#view`), cancelling the native anchor scroll — the page jumped to top and the
section never came into view. Root causes: (a) router treated any non-route hash as
"render landing"; (b) the audit's first guard attempt queried a non-existent `.gsmain`
class (the element is `id="gsmain"`). Fix: `route()` returns early for non-`#/` hashes
while the landing is mounted (`app-core.js`). Verified: `#features` → scrollY 1525 (was 2).

**F2 — Mobile menu structurally broken.** Two stacked bugs: (a) `.gsmenu{display:flex}`
beat the UA's `[hidden]{display:none}` rule, so the menu was **permanently visible** on
mobile/tablet regardless of state; (b) `toggleMenu()`'s logic (`open=(m.hidden===false)&&!forceClose`)
could never transition hidden→visible, so the burger did nothing. Fixes: explicit
`.gsmenu[hidden]{display:none}` + rewritten toggle (`open = forceClose ? false : !!m.hidden`).
Verified: hidden-before=true / display=none; after click hidden=false (menu opens);
`aria-expanded`/`aria-label` now truthful.

## Passed journeys (evidence per check)

| Area | Checks | Result |
|---|---|---|
| Homepage nav anchors | #features/#how/#privacy/#faq scroll into view (near-page-end sections clamp correctly; asserted visible-in-viewport) | PASS ×4 |
| Help navigation | nav → `#/help`; 返回首页 back | PASS ×2 |
| FAQ accordion | `<details>` open state flips both directions on click | PASS |
| Language switch | zh→en→zh via `setLang`; nav re-renders EN (FEATURES HOW IT WORKS…), persists via `gs-lang` | PASS |
| CTAs | hero 进入教室 → `#/app/classroom`; 阅读授权 opens license modal; 试试演示 seeds demo + navigates | PASS ×3 |
| Room picker | open modal → name → 打开我的礼物小屋 → lands on `#/room/<id>` | PASS |
| Random picker | pickOpen → pickDraw ×2 both return a student | PASS |
| Dead-button scan | every `[onclick]` handler across 6 views resolves to a defined function — zero dead | PASS |
| Internal links | every `a[href]` on all 8 views resolves to a known route or in-page anchor — zero unknown/external surprises | PASS |
| Refresh behaviour | reload on `#/app/records` restores the records view from localStorage | PASS |
| Direct hash routes | all 8 routes render non-empty from a clean mobile context | PASS ×8 |
| Mobile menu journey | burger opens (state was: never could), link click closes, `#faq` anchor scrolls | PASS |
| Console | zero `pageerror` events across all journeys on both viewports | PASS |

## Test-harness corrections (documented for honesty)

Three initial failures were audit-script bugs, not product bugs, corrected and re-run:
(1) language check compared against `"Features"` but CSS `text-transform` makes innerText
uppercase; (2) FAQ measured `innerHTML.length` though `<details>` toggles only the `open`
attribute; (3) anchor threshold demanded section-at-viewport-top, impossible for
near-page-end sections (browser clamps at document end — #privacy rests 545px from top,
fully visible).

## Verdict

**Functional: PASS (26/26)** after fixes F1 and F2. No dead buttons, no dead links, no
incorrect destinations, no JS errors, mobile interactions work.
