# Reference Design Analysis — learn-fun.cn

Date: 2026-11-11 · Source captures: `study/learn-fun/` (22 screenshots + text dumps + computed
design tokens, crawled 2026-11-10 under robots.txt rules) · This document records what was
observed, what was adopted, and what was deliberately NOT copied.

## 1. Observed reference design (summary)

| Aspect | Reference (learn-fun.cn) |
|---|---|
| Palette | Tailwind-ish orange scale (#F97316/#EA580C/#C2410C) + orange-50/100 tints, gray-900 ink |
| Typography | System Chinese stack (PingFang/Microsoft YaHei), sans; weights 400–800 |
| Layout | Max-width ~1080/960/720 px containers; alternating feature rows w/ product screenshots |
| Cards | 12 px radius, 1 px gray borders, soft shadows, pill chips |
| Landing IA | Hero + 2 CTAs → stats band → feature grid (tools) → pricing → 3-step onboarding → SEO article links → rich footer |
| Interactions | Card hover lifts, tabbed sections, accordions, mobile hamburger (single dropdown) |
| Weaknesses found | Pricing uses a purple accent clashing with the orange system; mobile loses all nav links except auth; stats claims are unverifiable; some sections text-heavy |

## 2. Adopted principles (in original implementation)

1. **Complete product IA** — hero, proposition, features, how-it-works, product showcase
   (Big Screen), privacy, FAQ, footer — mapped to OUR real features, not theirs.
2. **Alternating feature rows / card grids with real screenshots** → our features grid uses
   original inline SVG icons + concise bilingual copy; the Big Screen gets a dark "night band"
   showcase with spec chips.
3. **Stats band** → we show *product facts* (levels count, points math, per-level pixel math)
   instead of invented adoption numbers.
4. **3-step onboarding** → our "三步上手" (add students → two-tap award → Big Screen).
5. **Content-width rhythm** (wide/asymmetric/narrow sections) → adopted via our editorial
   grid (`gsdraw` 5fr/7fr, 1080/960/720 containers).
6. **Mobile adaptation that keeps navigation** — we deliberately IMPROVED on the reference:
   our mobile burger menu keeps every destination reachable (theirs drops nav links).

## 3. Deliberately not copied

- **Pricing / paid plans / subscriptions** — the product is a free gift to one school; adding
  monetization UI would be false advertising (explicit instruction).
- **User counts / school counts / testimonials** — unverifiable claims; replaced with factual
  product data (per §5.2 of the master task: no invented statistics).
- **AI-report marketing copy** — our app has no AI backend; advertising one would be false.
- **Proprietary artwork, logos, illustrations, mascot, copy** — all visuals here are original
  SVG drawn for this project; all text is original bilingual copy.
- **Their purple pricing accent** — noted as an inconsistency to avoid; our system stays
  single-accent (rust #9B3418 / apricot) across every route.

## 4. Final comparison (post-deployment, live site)

| Dimension | Reference | This project (deployed) |
|---|---|---|
| First impression | Polished SaaS marketing | Editorial studio style, single accent, real product demo |
| IA completeness | Full (incl. pricing) | Full minus pricing/monetization (deliberate) |
| Mobile nav | Links dropped, auth only | Burger with ALL destinations (improvement) |
| Design-system consistency | One inconsistency (purple pricing) | Single accent across landing/app/screen/help |
| Honesty of content | Marketing claims | Product facts only |
| Accessibility (axe/Lighthouse) | Not measured publicly | axe CLEAN ×4 views, LH A11y 100 |

Evidence: live screenshots `qa/shots/live-after/`, reference captures `study/learn-fun/`,
side-by-side notes above. Quality bar: comparable polish, zero copied assets.
