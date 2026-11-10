# Gifted Scholars — Design System ("Two Voices, One Token Layer")

One product, two audiences: adults reading marketing/help (Editorial voice) and kids
watching the Big Screen / gift rooms (Play voice). Both draw from the SAME token layer,
so the product reads as one brand. Implemented in `src/tokens.css`; this document is the
spec. All text pairs below are WCAG-AA verified (qa/contrast.py).

## 1. Colour tokens
| Token | Value | Use |
|---|---|---|
| `--ink` | #1A1917 | headings/body text (exists) |
| `--ink-2`/`--ink-soft` | #4A4741 | secondary text |
| `--muted` | #6E6A61 | captions (landing scope) |
| `--paper` | #E7E3DA | page ground (warm, exists) |
| `--paper-2` | #DCD7CB | tinted bands (exists) |
| `--white` | #F0EDE4 | card surface (exists) |
| `--pigment` | #9B3418 | THE accent: editorial actions, eyebrows, links, `--gold`/`--coral` alias (white label 7.25:1) |
| `--hair` | rgba(26,25,23,.16) | hairlines (exists) |
| `--apricot` | #E88654 | Play-voice action (`.app-ui`/screen; ink label 6.66:1) |
| `--apricot-deep` | #C96A38 | apricot border/hover |
| `--coral-tint` | #EFE0D8 | quiet negative chips |
| `--leaf` | #2E7D5B | success/approve (white 5.2:1) — NEW |
| `--leaf-tint` | #E2F1EA | approved states — NEW |
| `--violet` | #9C86CE | MSK brand mark only |
| `--night` | #16130E | footer band / Big Screen ground — NEW |

Rules: one accent family (apricot) for actions across ALL views — no per-page accent
switching (a flaw observed in the reference). Coral is reserved for negative semantics.
Emoji are content (gifts, celebrations), never UI chrome.

## 2. Typography
- **Display**: Instrument Serif 400 (embedded) — editorial headlines, big numbers. Track -1%.
- **UI/text**: system CJK stack: `-apple-system, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Segoe UI", sans-serif` (zh-first reality; zero webfont cost for text).
- **Mono**: Azeret Mono (embedded) — counters, version, code, kbd.
- Scale: display 56/44/36 (clamp) · h2 28 · h3 20 · body 16/1.6 · small 14 · Big Screen minimums unchanged (32/44/24, binding).
- Weights: system stack 400/600/700 only.

## 3. Spacing, layout, radii
- Space scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 (`--s1..--s9`).
- Content widths: marketing 1080px; long-form/help/FAQ 720px; app fluid; Big Screen fluid.
- Radii: `--r-s 10px` (inputs, small buttons) · `--r-m 16px` (cards) · `--r-l 24px` (hero/media frames) · `--r-pill 999px` (chips).
- Shadows: `--shadow-s 0 1px 2px rgba(60,45,20,.08)` · `--shadow-m 0 8px 24px rgba(60,45,20,.10)` · hover lift = translateY(-2px)+`--shadow-m` (disabled under reduced motion).
- Breakpoints: 640 (mobile design target) · 768 (nav switch) · 1024 · 1440.

## 4. Components
- **Buttons** (min-height 44): `primary` apricot/ink · `secondary` transparent + 1.5px `--ink` border · `gold` gold/white · `danger` coral/white · `ghost` underline text. Radius `--r-s`; hover darken; active press (translateY 1px, no shadow).
- **Chips**: pill, tint bg + deep text (`apricot-tint`/`apricot-deep` etc.); used for feature tags, rule labels.
- **Cards**: `--card` bg, 1px `--line`, radius `--r-m`, `--shadow-s`.
- **Nav (landing)**: sticky, `--card` 92% opacity + blur, 64px tall; links ink-2 → ink hover; language toggle (中文/EN); primary CTA "进入教室". ≤768px: hamburger (44px) → slide-down panel with the same links (closes on nav/Esc).
- **Hero**: eyebrow chip · display headline · one-sentence value line · primary+secondary CTA · fine print · original SVG product illustration (no photos of the reference).
- **Feature card**: SVG spot icon (1.8 stroke, round caps, original drawings) + h3 + 2-line body + chip row; grid 3/2/1 by breakpoint.
- **Steps**: numbered circles (apricot-tint bg, apricot-deep number) + title + body.
- **FAQ**: native `<details>`/`<summary>` + chevron rotation; 44px row min-height.
- **Footer**: `--night` bg, paper text, 3 link groups + license line + credit (kept verbatim).
- **Screens show REAL product**, presented in an original SVG "screen frame" (rounded bezel + dot) — screenshots drawn as simplified original vector mocks, never the reference's images.
- **Forms/modals/toasts/empty states**: already exist; re-skinned via tokens only.

## 5. Motion
Durations 150ms (micro) / 250ms (panels) / 400ms (hero reveal), ease-out. Award pops,
confetti, chime = existing overnight system (cap 150 particles, badge fallback). ALL
decorative motion off under `prefers-reduced-motion` or Settings→Motion=Reduced (existing
`motionOK`/`applyMotion` pipeline governs everything new).

## 6. Accessibility contract
Semantic landmarks (`header/nav/main/footer`), single h1 per view, skip-to-content link on
landing, visible focus ring `3px var(--apricot)` offset 2, aria-expanded on menu/FAQ,
aria-current on nav, contrast per table above, keyboard-operable everything (menu Esc,
drawer Esc already), language attribute flips with `setLang`.

## 7. Voice & tone
zh default; short sentences; kid-safe warmth in Play voice ("小星星", celebration words);
adult Editorial voice stays factual and calm; EN mirrors zh meaning, not word-for-word.
Every new string lives in BOTH i18n dicts (parity test enforces).
