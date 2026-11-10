# Reference Website Analysis — learn-fun.cn

Date: 2026-11-10 · Crawler: Playwright (Edge headless), desktop 1440×900 + mobile 390×844.
Compliance: robots.txt fetched first — `Allow: /`, `Disallow: /api/`, `Disallow: /uploads/`.
Captured ONLY public pages from sitemap.xml + nav-discovered routes. The authenticated
application behind `/#/auth` was **not** entered (boundary respected; login form observed
from the public shell only). Captures live in `workspace/study/learn-fun/` (LOCAL study
material, never published; no markup/assets copied into this product).

## A. Page inventory (public surface = 11 routes)

| Route | Height (px) | Content W | Sections | Purpose |
|---|---|---|---|---|
| `/` | 7569 | 1080px | 14 | Marketing home: hero+carousel, stats, 6 feature rows, interaction/mystery-box video, 7 classroom-tool cards, pricing teaser, 3-step start, guide articles, CTA band, footer |
| `/pricing.html` | 2684 | 960px | 13 | "What you get" 2×3 card grid, 3-tier price table (trial / annual **recommended** / lifetime), purchase notes, 3 steps, contact QR, dark footer |
| `/start.html` | 1775 | 760px | 3 | Getting-started walkthrough (long-form guide) |
| `/topics/*.html` (5) | 2250–2726 | 720px | 3 | SEO article pages: class-points management, term comments, e-certificates, class-mgmt software, random picker |
| `/school.html` | 8104 | — | many | School-wide tier: batch class creation, unified rules, teacher handover, usage export, role-based scoring, school rankings; own screenshot set |
| `/#/help` (SPA) | 1860 | — | — | Help center: search box + 12 categories (~150+ articles by counts shown) |
| `/#/auth` (SPA) | 1011 | — | — | Login/register: username+password, WeChat scan QR, activation-code recovery links, Android download link |

## B. Navigation map

- **Top nav**: logo · Product & pricing · School plans · Classroom tools · Download notes · Help center · [Login (outline)] [Register (filled)].
- **Footer**: register/login · help center · product & pricing · download notes · ICP filing · copyright.
- **SPA routes** discovered in nav links: `/#/help/*` (12 help categories), `/#/auth`.
- **In-page anchors** on home jump to feature/tool/pricing sections; article hub links out to `/topics/*`.
- **Mobile (390px)**: nav links are hidden; only logo + Login/Register remain — **no hamburger menu** (a real weakness; nav destinations are unreachable on phones except via footer).

## C. Feature inventory (user's 16 categories → observed evidence)

| Category | Marketing evidence | Needs auth? |
|---|---|---|
| Classroom management | hero + feature rows (roster import, custom items) | yes |
| Student records / scoring | "1-second" award rows, undo, audit trail copy | yes |
| Group scoring | pill tags (batch/group awards) | yes |
| Gamification (virtual pets) | pet-evolution row, 80 pets / 5 stages, interaction+mystery-box video | yes |
| Progression & rewards | evolution stages, points shop exchange | yes |
| Rankings | school page screenshots (class/student/group boards) | yes |
| Classroom statistics | stats row (trends, weekly summaries) | yes |
| AI reports / summaries / parent phrases | feature rows (AI term comments, summaries, parent-communication phrases) | yes + paid tiers |
| Random selection | tool card (student/group/in-group draw) | yes |
| Timers | tool card (countdown/stopwatch) | yes |
| Challenges | tool cards (mute challenge, task challenge, morning-reading challenge) | yes |
| E-certificates | feature row + topic article (batch generate/print) | yes |
| Seating chart | tool card | yes |
| Mobile / PWA | "add to desktop" copy, Android APK page, PWA install | yes |
| Real-goods redemption | physical reward tiers (¥1.9 series / ¥6 collectible cards), roster-verified handout | yes + logistics |
| School admin | school.html (batch classes, unified rules, handover, export, roles) | yes + school tier |

**Conclusion:** the marketing site demonstrates nearly everything through screenshots/videos;
the working product is fully behind auth. Nothing internal was accessed.

## D. Component inventory

1. Sticky top nav (blur/translucent white, 92% opacity white over page).
2. Hero: eyebrow pill → H1 (38px/800) → paragraph → 2 CTAs (filled orange + outline) → fine print → screenshot carousel (dots).
3. Stats band (tinted bg): 4 big numbers + footnote.
4. Feature row (alternating): rounded icon tile → H2/H3 + body + pill-tag row (orange-100 bg chips) ↔ product screenshot. 6 rows.
5. Inline video player blocks with "play video" overlay buttons.
6. Tool card grid (2-col desktop / 1-col mobile): screenshot + H3 + one-liner.
7. Pricing: 3 cards, middle highlighted ("Recommended" ribbon, accent border, filled CTA), per-tier checklists (✓ items); notes card; contact-QR card.
8. Steps: 3 numbered cards (also reused on pricing page).
9. Article hub: title + blurb list (link farm for SEO).
10. Full-width CTA band (accent gradient) with single button.
11. Footer (light on home, **dark slate** on pricing — inconsistent).
12. Help center: big search input + category grid with counts.
13. Auth card: tabs (login/register), fields, show-password, remember-me, QR alt-path, recovery links.

## E. Design observations (measured)

- **Palette (computed):** Tailwind-orange family — primary `rgb(249,115,22)` (orange-500), hover `rgb(234,88,12)` (600), deep `rgb(194,65,12)` (700), tints `rgb(255,237,213)` (100) / `rgb(255,247,237)` (50); text grays `rgb(31,41,55)` headings / `rgb(75,85,99)` body / `rgb(107,114,128)` muted; page bg `rgb(244,245,251)`; cards white.
- **Type:** system CJK stack (PingFang SC → Hiragino → Microsoft YaHei → …). H1 38px/800/-0.5px; H2 28px/800; body ~16px. No webfont (fast, zero font cost).
- **Shape:** buttons 12px radius; pill chips 999px; cards ~12–16px; soft shadows.
- **Widths:** marketing 1080px; pricing 960px; long-form/articles 720px.
- **Spacing:** generous section padding (~96–128px), consistent card gaps.
- **Inconsistencies found (avoid):** pricing page uses a *purple/indigo* accent while the rest of the site is orange; footer flips light↔dark between pages; icon tiles use varied hues (orange/green/blue/red) decoratively.

## F. Interaction observations

- Hero screenshot carousel (arrow + dots); inline videos with poster overlay buttons; lazy-loaded images (grey placeholders appear in full-page captures until scrolled); anchor-based in-page nav; pill chips as static tags; help-center search (client-side filter); auth show-password toggle.
- No visible scroll-triggered animation libraries; motion budget is low (fast, utilitarian).
- Hover states not capturable in static crawl (NOT TESTED — noted honestly).

## G. Responsive observations (390×844)

- No horizontal overflow on any of the 11 routes (scrollWidth 390 everywhere).
- Home: single column; stats 2×2; feature rows stack (text → screenshot); tool grid 1-col; pricing cards stack.
- Weaknesses: nav links vanish (no hamburger); hero carousel is heavy on mobile; some tool-card images render as empty grey frames until scrolled (lazy strategy costs LCP).

## H. Opportunities for OUR product (differentiators, not copies)

1. **One accent family, everywhere** (their orange/purple split reads as two brands).
2. **Real mobile navigation** (their nav disappears <768px).
3. **Offline-first marketing + app in ONE file** (they need a server for everything; our privacy story — data never leaves the device — is a genuine selling point to feature loudly).
4. **Kid-facing warmth** (their palette is admin-facing corporate; our product has two audiences: teacher-admin AND kids on the big screen).
5. **Accessibility as a feature** (contrast-checked buttons, aria-live award announcements, reduced-motion support — none of this is visible on the reference).
6. **Bilingual zh/EN** (reference is zh-only).
7. Their IA patterns worth adopting: stats band, alternating feature rows with real screenshots, 3-step start, tool grid, help/search, one honest pricing/free page (ours: free-forever + license).

## I. Implementable independently vs. needs-backend

- **Implementable now (client-only, fits our single-file app):** quick award + undo trail, big-screen mode, gift rooms/collections, levels, leaderboards, random picker, timer, seating (future), certificates (print view, future), PWA/offline, help center (static), bilingual.
- **Needs a backend (out of scope by project rule — child data stays on device):** accounts/auth, cross-device sync, AI comment generation (needs a model API + cost), physical-goods fulfilment, school admin tier, parent portals.

## J. Capture inventory (local, study only)

`workspace/study/learn-fun/` — `pages/*-d.png / *-m.png` (22 screenshots), `text/*.txt`
(per-page innerText dumps), `tokens.json` (computed styles), `sitemap-urls.txt`,
`crawl.py` (the crawler). Nothing from this folder ships in the product.
