# Final Deployment Checklist — Task 7

**Status: PREPARED ONLY — nothing deployed. Execute after Teacher Mo approves.**

## Hosting facts (verified)

| Item | Fact |
|---|---|
| Live host | **GitHub Pages** (A records 185.199.108–111.153; `CNAME` file + `.nojekyll` present) |
| Deployed ref | `origin/main` @ `24191d1` (Pages serves the default branch root) |
| Entry point | `index.html` at repo root (single file; fonts/QA/docs are static extras) |
| Routing | hash-based (`#/...`) — deep links & browser refresh need **no server config**; GH Pages serves `/` for any direct hit |
| HTTPS | GitHub Pages auto-certificate for the custom domain (already issued & working pre-audit) |
| DNS | duckdns CNAME → GitHub Pages — **no DNS changes needed for this release** |
| Caching | GH Pages default `max-age=600`; single-file app → 10-minute propagation after deploy |
| Unused config | `vercel.json` is inert leftover (Pages ignores it); candidate for later cleanup, harmless now |
| Production build | byte-identical to working tree `index.html` (assemble.py verified; QA ran against this exact file) |

## Pre-flight (order matters)

1. **Export a backup from the LIVE site first** (protects existing classroom data):
   open https://my-gifts-with-mo.duckdns.org/ → 设置 → 导出备份 → save the JSON locally.
   *(Data survives this release untouched — localStorage schema unchanged, verified by the
   upgrade-fixture test — but the backup is the rollback of last resort.)*
2. Refresh the safety bundle (current one predates the remake program):
   ```
   git bundle create .git-history-backup.bundle --all
   git add .git-history-backup.bundle
   git commit -m "chore: refresh history bundle pre-deploy"
   ```
3. Confirm clean tree + green gates one last time:
   ```
   cd src && python3 assemble.py && python3 build-tests.py && node test-bundle.js
   cd .. && python qa/smoke.py
   ```

## Deploy (one fast-forward, no force)

```
git checkout main
git merge --ff-only feature/big-screen
git push origin main
```
- Push triggers the Pages build (~1–3 min).
- Verify: hard-reload https://my-gifts-with-mo.duckdns.org/ (Ctrl+F5; 10-min cache) →
  check: nav 产品特性 scrolls, 使用帮助 opens, 教室大屏 → #/screen renders, FAQ opens,
  language EN/中文 toggles. Then classroom smoke: award → undo → shop request → approve.

## Rollback (no force, no history rewrite)

```
git revert --no-edit <bad-sha>     # creates an inverse commit
git push origin main               # Pages redeploys the reverted tree (~1–3 min)
```
Escalation (only if main must move backward fast and the revert is impractical):
`git reset --hard 24191d1 && git push origin main` — still a normal push (fast-forward from
origin's view is broken → this DOES require `--force-with-lease`; use only with explicit
approval, teacher data is unaffected since it lives in browsers, not the repo).

## Post-deploy verification (5 minutes)

- [ ] Landing loads, zero console errors
- [ ] 进入教室 → classroom renders (existing data intact — student count matches)
- [ ] Award on a student updates records + leaderboard
- [ ] #/screen renders with tiles; award in another tab updates < 200 ms
- [ ] Settings → goal → shows on #/screen
- [ ] Language toggle both ways; export backup works
