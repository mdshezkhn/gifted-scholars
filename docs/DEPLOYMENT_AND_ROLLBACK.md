# Deployment & Rollback Record

Deploy date: 2026-11-11 · All commands below were **executed** unless marked otherwise.

## Production configuration (verified)

| Item | Value |
|---|---|
| Hosting | GitHub Pages, `mdshezkhn/gifted-scholars`, branch `main`, path `/` (legacy Jekyll-free build) |
| Deployed commit | **`47005cc570486c751a58a9fd749690b1f666009f`** |
| Previous production commit | `24191d139b71f38903f47600c2d0b21f5953ef59` |
| Deployment method | `git push origin HEAD:main` (Pages auto-builds) |
| Pages build status | `built` @ `47005cc…` (API `pages/builds/latest`) |
| Custom domain | `my-gifts-with-mo.duckdns.org` (repo CNAME + Pages API cname) |
| DNS | A → 185.199.108.153 (Pages edge); no AAAA |
| Certificate | Let's Encrypt, `CN=my-gifts-with-mo.duckdns.org`, SAN = custom domain, valid 2026-11-10 → 2027-02-08, `https_enforced: true` |

## What was pushed

- `main`: `1766294 → 47005cc` (fast-forward from remote's perspective; includes merge
  `3e81263`, RC `9620f74`, help additions `888266a`, QA `7257a55`, reconciliation merge `47005cc`)
- `feature/big-screen`: `efca6e5 → 47005cc` (fast-forward; both original histories reachable)
- Tags: `rc-2026-11-11`, `rc-2026-11-11-final`

## Rollback procedure (preserve classroom data — it is untouched by any rollback)

Classroom data lives in browser localStorage, not on the server; any rollback below cannot
affect it.

```bash
cd <repo>
git fetch origin

# Option A — revert to the previous production build (recommended; keeps history):
git revert --no-edit 47005cc 2>/dev/null || true   # merge commit → needs -m 1:
git revert --no-edit -m 1 47005cc
git push origin HEAD:main        # Pages rebuilds the old app (~1–2 min)

# Option B — surgical single-file rollback (fastest):
git checkout 24191d1 -- index.html
git -c user.name="Mohammed Shehzad" -c user.email="mdshezkhn@aol.com" \
  commit -m "rollback: restore previous production index.html"
git push origin HEAD:main
```

**Verify a rollback:** `curl -s https://my-gifts-with-mo.duckdns.org/ | wc -c` → ~264,688 bytes
(old build) vs 336,512 (new build); hard-reload with Ctrl+F5.

## Recovery bundle (outside the repository — never committed)

`workspace/github/backups/gifted-scholars-master-task-20261111.bundle`
- 16,423,670 bytes · SHA-256 `4e9f6af542d5dca9df1db26ad0c3447855f84d6df2b201731f09fbc40bb0f178`
- Clone drill: `git clone <bundle> /tmp/x && git -C /tmp/x fsck` → HEAD `8875aa5`, clean
- Contains ALL refs: both original histories, `main`, both release tags
- Older bundles retained: predeploy-20261110, preintegration-20261111, rc-20261111 (16.4 MB, `9b33c458…`)

Full restore from bundle:
```bash
git clone workspace/github/backups/gifted-scholars-master-task-20261111.bundle restored/
cd restored && git checkout rc-2026-11-11-final
```

## Certificate remediation record (executed via GitHub API with stored git credentials)

1. Diagnosis: `GET /repos/.../pages` → cname set, **`https_enforced: false`**, cert never provisioned.
2. Fix: re-PUT cname; toggle cname ""→domain (trigger); then `PUT {"https_enforced":true}` → 204.
3. Verified: openssl SNI shows LE cert for the domain; real Edge loads with zero bypass;
   curl direct `ssl_verify_result 0`. The teacher's parallel web-UI CNAME delete+recreate
   (commits 4d9b214/1766294) was merged and preserved.
