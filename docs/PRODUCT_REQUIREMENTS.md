# Product Requirements — Gifted Scholars

## Core purpose
A free, offline-first classroom points & virtual-gift tool for one teacher's classroom
(ZhongFangYuan Bilingual School). The teacher awards positive/negative points by rule;
students spend them on gifts, level up from lifetime positives, and see progress live on
the classroom Big Screen. **Child data never leaves the device.** It stays one deployable
HTML file. This program's goal: make the *presentation* of that product professional —
a real product-marketing surface and a coherent, documented design system — without
turning it into a different product (no accounts, no backend, no unrelated classroom-suite
bloat; the reference site's IA is the benchmark, not the blueprint).

## Audiences
1. **Teacher Mo (admin)** — uses the app daily; decides whether the site looks trustworthy.
2. **Students (kids ~7–12)** — see the Big Screen and their gift rooms; need warmth, big type, delight.
3. **Visitors (colleagues/school/parents)** — land on `#/`, skim, must understand the product in 30 s.

## Primary journeys
- Visitor → landing → "enter classroom" (or try demo) → set up class → award.
- Teacher, in class → Big Screen on projector → two-tap drawer award → kids see pop.
- Student → gift room → request gift → teacher approves → gift on shelf.
- Teacher, term end → export backup (JSON) → archive.

## Sitemap (implemented in the single file as views)
| View | Route | Status |
|---|---|---|
| Landing (product marketing) | `#/` | **revamped this program** |
| Classroom (award) | `#/app/classroom` | exists + polish |
| Records | `#/app/records` | exists |
| Shop (requests/approve) | `#/app/shop` | exists |
| Leaderboards | `#/app/leaderboard` | exists |
| Settings (incl. Big-Screen goal, backup, data notes) | `#/app/settings` | exists + polish |
| Big Screen | `#/screen` | exists (overnight) |
| Student room | `#/room/:id` | exists + polish |
| Help / FAQ | `#/help` | **new this program** |
| License / about | modal from landing | exists, bilingual |

## Essential features (must keep working — regression-protected by the 85-test suite)
Quick award (multi-select, rules, undo) · records trail · shop request/approve · gift rooms
(shelf, mystery box, rarity) · levels from lifetime positives · wallet floor 0 · leaderboards ·
Big Screen (goal, tiles, pops, drawer, shortcuts, sound chip, quiet negatives, hide-negatives) ·
zh-default bilingual · demo seed + empty start · export/import backup · one-origin warning ·
motion/sound settings · offline single-file · author credit.

## Additions THIS program (small, finished, on-mission)
1. **Landing IA**: sticky nav (product, how-it-works, big-screen, privacy, FAQ, language,
   enter CTA) with real mobile menu; hero; feature grid (real features, real screenshots);
   how-it-works 3 steps; Big-Screen showcase section; privacy/offline section; FAQ
   (accordion, details/summary); footer (product links, license, credit).
2. **`#/help` view**: static bilingual FAQ/how-to (setup, awards, big screen, backup,
   privacy) with search-filter — mirrors the reference's help-center pattern, client-only.
3. **Design-system layer** (tokens + shared components) documented and applied to landing
   + app shell (buttons, cards, chips, focus rings, empty states already exist → unified).
4. **Random student picker** (tiny, classroom-native, referenced as a benchmark feature):
   pick 1 student from the current class on `#/screen` (big card, fair shuffle, reduced-motion
   aware). No new data model.

## Non-goals (explicit)
Accounts/auth/sync · AI anything · physical goods · school tier · timers/challenges/seating ·
pets (our gifts+rooms already fill this niche) · any network call at runtime.

## Data requirements (unchanged)
`S` = {settings, className, schoolName, students[], rules[], gifts[], records[], requests[],
collection{}, boxSpent{}} in localStorage `gifted-scholars-v1`; export = full JSON backup.

## Technical requirements
Keep: assemble.py single-file build, no dependencies, no framework introduction (PART 5:
retain suitable stack — it is), bilingual i18n dict with parity tests, XSS-safe rendering
(esc everywhere), prefers-reduced-motion + Motion setting honored, 44px touch targets,
8-metre-readable Big Screen type minimums.

## Mobile requirements
Landing must be genuinely responsive (nav menu ≤768px, no horizontal overflow at 320/390).
App views keep ≥44px targets; Big Screen targets projector/large tablet.

## Success criteria
- 85-test suite green + smoke green; new features covered by new tests (RED→GREEN).
- Landing communicates product + privacy in one scroll; bilingual; no raw keys/English leaks in zh.
- Zero console errors on all routes; no runtime network requests.
- No horizontal overflow at 320/390/768/1280/1440.
- WCAG AA on text pairs (verified by qa/contrast script on the NEW palette).
