# PHASE A INTEGRATION REPORT — Task 10

Date: 2026-11-11 · Local integration only. **No push, no deploy, no DNS/GitHub changes.**

## 1. Starting SHAs (Phase 0, verified on disk)

| Ref | SHA | Role |
|---|---|---|
| local release line | `e796977` | preflight report + cardhit fix (`f8af6cf`) |
| remote line | `efca6e5` | granular overnight program + gate/dataLocalNote/tests |
| common ancestor | `24191d1` | = origin/main (both lines branch from it) |
| merge commit | **`3e81263`** | the integration |
| QA battery commit / **RC** | **`9620f74`** | tag `rc-2026-11-11` |

Recovery points (all OUTSIDE the repo, none deleted): `workspace/github/backups/`
- `gifted-scholars-predeploy-20261110.bundle` (pre-Task-9 state)
- `gifted-scholars-preintegration-20261111.bundle` — 11,896,696 B, sha256 `493b278c…39032`, drill-cloned OK at `e796977`, carries all 9 refs incl. the remote line
- `gifted-scholars-rc-20261111.bundle` (post-integration) — 16,417,822 B, sha256 `9b33c458…fdcae`

## 2. Divergence analysis

- Local-unique: 16 commits — remake program, 9 release-audit fixes, cardhit restore, preflight.
- Remote-unique: 44 commits — the SAME overnight program in granular form (the history
  believed lost after the linkssync `.git` incident — it had been pushed from another
  session), plus 3 commits beyond local knowledge: `dc9a0f4` (old-browser gate,
  dataLocalNote, particle-budget fix, 11 browser checks), `efca6e5` (bilingual classroom
  test sheet), `96d1bb0` (morning report + teacher guide).
- Conflict surface: 15 paths (the 5 predicted + 10 add/add from both lines independently
  creating the same renamed test files/docs). Prediction accurate.

## 3. Preservation matrix + conflict resolutions

| Path | Conflict | Resolution | Rationale |
|---|---|---|---|
| `src/app-core.js` | 2 hunks | Union: kept local `#/help` route + audit fixes; took remote `dataLocalNote` line | disjoint additions |
| `src/i18n.js` | 4 hunks | Union: remote `dataLocalNote` keys ×2; local key blocks ×2 (superset incl. `scrGridLabel`) | key-set comparison |
| `src/app.css` | 1 hunk | keep local cardhit block; remote `.app-ui` theme auto-merged | disjoint regions |
| `src/screen.js` | add/add, 6 hunks | take remote `#tile-` selector + particle-release line; keep local a11y grid/Escape/picker evolution | see latent bug below |
| `src/screen.css` | add/add | local superset (grid-auto-rows fix, picker styles, narrow-screen wrap) | diff evidence |
| `src/build-tests.py` | add/add | local (remote has 0 unit tests local lacks; local adds 5) | comm-scan of T() names |
| `src/test-bundle.js`, `index.html` | generated | regenerated from resolved sources | build artifacts |
| `qa/smoke.py`, `qa/CONTRAST.md`, `qa/EXTRA-CHECKS.md`, `qa/contrast.py` | add/add | local supersets (8 checks / 27 pairs / 8 routes) | content diff |
| `qa/verify15.py` | add/add | REMOTE 24-check suite (mandatory #5) | richer; runs 24/24 here |
| `docs/overnight-log.md` | add/add | remote (authentic granular log) | provenance |
| `docs/RELEASE.md` | add/add | local (integration-aware, newer) | content review |

**Latent local bug fixed BY the merge:** local `applyPop` selected tiles via
`[data-stu=…]` but `tileHTML` renders `id="tile-…"` — confetti could never find its tile
in real browsers (masked by the node stub's selector-blind querySelector). Remote's
`#tile-` selector taken; browser-verified in Phase 3C.

## 4. Mandatory preservation — verified (grep + behavior)

Remote: ① ES5 gate (`__GS_BLOCKED`) ② bilingual notice ③ `dataLocalNote` zh+en
④ particle-budget release ⑤ verify15 suite + CLASSROOM-TEST.md ⑥ granular history
reachable. Local: ① nine audit fixes ② remake IA ③ help view + search ④ a11y fixes
⑤ responsive fixes ⑥ cardhit overlay ⑦ export round-trip ⑧ zh-default i18n (382 keys).

## 5. Test results (executed on `9620f74`)

| Battery | Result |
|---|---|
| Unit suite | ALL PASS (90) |
| Functional 26 checks | 26/26 |
| Smoke | 8/8 |
| verify15 (remote suite, first run on merged build) | 24/24 |
| Phase-3 integration battery (`qa/integration_checks.py`) | 22/22 — gate incl. the *designed* `GS-UNSUPPORTED-BROWSER` stop (A4 re-classified with evidence: thrown by i18n.js line 3 to prevent half-initialization), dataLocalNote zh/en, particle cap + release-on-no-tile, motion=off ⇒ 0 particles, cardhit invisible + keyboard Enter selects, export 9-key JSON + isolated import round-trip |
| axe (4 views) | CLEAN ×4 |
| Overflow 320/390/768/1280/1440 × 5 views | 0 px, 0 page errors |
| Lighthouse desktop-form | perf 42 (lab) · a11y 100 · BP 100 · SEO 100 |
| Lighthouse mobile-form | perf 81 (lab) · a11y 100 · BP 100 · SEO 100 · CLS 0 |

Lab vs field, plainly: Lighthouse figures are laboratory runs on throttled localhost —
not field data; INP is not lab-measurable and TBT is only a proxy. Realistic school-PC
reference from the audit: unthrottled perf 96–97, LCP 0.8 s.

## 6. Known limitations

1. QA rigs avoid `srv.shutdown` (shell command filter) — daemon threads + explicit flush.
2. Keyboard-Enter check uses synthetic events; the human 8-metre readability pass lives
   on the teacher's test sheet (docs/CLASSROOM-TEST.md).
3. Cert incident unresolved — dashboard-side, needs the teacher's GitHub login
   (CERTIFICATE_INCIDENT_DIAGNOSIS.md).

## 7. Proposed deployment commands — **NOT EXECUTED**

```bash
# 0. Teacher exports a data backup from the LIVE site first (设置 → 导出备份)
git status --porcelain                    # must be empty
git checkout main
git merge --ff-only feature/big-screen    # 24191d1 -> 9620f74 (main is ancestor: ff holds)
git push origin main                      # Pages rebuild ~1-3 min
# verify: hard-reload https://my-gifts-with-mo.duckdns.org/ (Ctrl+F5)
# rollback (simplest): git checkout 24191d1 -- index.html
#   git commit -m "rollback: restore previous live build" && git push origin main
```

**Recommended order:** fix the certificate first (re-attach custom domain so Let's
Encrypt starts provisioning), then deploy — the new build should debut on a clean lock.

## 8. Next approval required

1. Approval to run §7 (push main → production deploy).
2. Decision/timing for the certificate remediation (teacher's GitHub login required).
