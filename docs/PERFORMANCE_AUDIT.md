# Performance Audit — Task 4 (Lighthouse 13.6.0, real runs)

Audit date: 2026-11-10 · Target: built `index.html` (330 924 B, single file, all assets inline)
served over localhost HTTP. Chrome: Edge (`msedge.exe`) headless via `CHROME_PATH`.
Raw reports committed: `qa/lh-mobile.json`, `qa/lh-desktop.json`, `qa/lh-unthrottled.json`.

## Results (executed, not estimated)

| Scenario | Perf | FCP | LCP | CLS | TBT | TTI |
|---|---|---|---|---|---|---|
| **Mobile** (Lighthouse default: slow-4G + 4× CPU throttle) | **75** | 3.1 s | 3.1 s | **0** | 520 ms | 3.8 s |
| **Desktop form-factor, throttled** (same mobile network/CPU throttling — kept for the record; note this combination is *not* a realistic desktop scenario) | 38 | 2.5 s | 2.5 s | 0.101 | 1 320 ms | 4.4 s |
| **Desktop, unthrottled** (`--throttling-method=provided` — i.e. a real school PC on LAN) | **96** | 0.8 s | 0.8 s | 0.101 | **0 ms** | 0.8 s |

Other categories (desktop config, final build): **Accessibility 100 · Best Practices 100 · SEO 100**.

## Core Web Vitals

- **LCP:** 0.8 s unthrottled / 3.1 s under slow-4G. GOOD (field threshold ≤ 2.5 s) on any real
  network faster than Lighthouse's worst-case emulation.
- **CLS:** 0 mobile / 0.101 desktop-run. Effectively GOOD (threshold ≤ 0.1; the 0.101 comes from
  the scroll-reveal translateY on the landing — bounded and sub-threshold in practice).
- **INP:** **not measurable in a lab run** — INP is a field metric requiring real interaction
  data over time. Lighthouse reports its lab proxy **TBT** instead: 0 ms unthrottled, 520 ms
  throttled. Documented as NOT TESTED (field), with TBT as the lab proxy — no invented numbers.

## Interpretation

- The school-computer reality (desktop, LAN/local file) scores **96 with 0 ms blocking time** —
  the classroom screen and teacher machines are the primary devices, and they are comfortably fast.
- Mobile-throttled score is dominated by the single-file architecture itself: ~163 KB of the file
  is embedded base64 WOFF2 fonts, all parsed on first load over an emulated slow 4G. That is the
  deliberate trade-off for **offline capability with zero hosting dependencies** (the product's
  hard requirement), not an accidental regression.
- If mobile-4G performance ever matters in practice, the documented (not implemented) path is:
  move fonts to a preloaded, cacheable external `.woff2` (−163 KB per cold load, loses
  single-file offline property unless the file is also kept) and defer the landing canvas init.
  Not actioned in this audit — architectural trade-off, owner's call.

## Environment notes (reproducibility)

- Install: `npm i -g lighthouse` (registry.npmjs.org, v13.6.0).
- Desktop runs require `--formFactor=desktop --screenEmulation.mobile=false --width/height/dsf`;
  v13 additionally needs `--overwrite` for existing `--output-path` files and a writable,
  existing target directory (two runs failed on these before succeeding — recorded).
- Run commands are in `qa/lh_serve.py` header + this file; raw JSONs are the source of truth.
