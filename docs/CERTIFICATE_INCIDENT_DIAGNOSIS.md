# Certificate Incident Diagnosis — my-gifts-with-mo.duckdns.org

Date: 2026-11-11 · Phase 6 of Task 10 · **Read-only: nothing was changed on DNS, GitHub, or the live site.**

## Symptom

Browsers show `ERR_CERT_COMMON_NAME_INVALID` (Edge/Chromium) when visiting
<https://my-gifts-with-mo.duckdns.org/>. The page IS served (HTTP 200) after the user
clicks through the warning.

## Evidence (all reproducible)

| # | Test | Result | Interpretation |
|---|---|---|---|
| E1 | `openssl s_client -connect 185.199.108.153:443 -servername my-gifts-with-mo.duckdns.org` (raw TCP, **no proxy**) | Certificate `CN=*.github.io`, SANs = github.com/github.io/githubusercontent.com only | GitHub's edge has **no certificate containing my-gifts-with-mo.duckdns.org** for this site |
| E2 | Same probe with `-servername mdshekhn.github.io` | Same `*.github.io` cert | Expected/correct — proves the edge is a normal Pages front |
| E3 | Chromium (headless Edge), proxy bypassed | `net::ERR_CERT_COMMON_NAME_INVALID` | Browser-level confirmation, independent of the local MITM proxy |
| E4 | DNS A record | `my-gifts-with-mo.duckdns.org → 185.199.108.153` (Pages anycast IP; no CNAME) | DNS still points at Pages correctly — **DNS is NOT the problem** |
| E5 | `http://` plain | no response from this network | Not diagnostic (port-80 path unreliable here); irrelevant while E1 stands |
| E6 | Live content | old build 264,688 B, served 200 over TLS-after-warning | Site data intact; this is a TLS-layer incident only |

## Confirmed facts vs hypotheses

**Confirmed:** the domain still resolves to GitHub Pages; the site is deployed and serving;
the certificate served for the custom hostname does not cover it (E1–E3).

**Hypothesis (most likely, consistent with all evidence):** the custom domain has been
**removed from (or lost by) the repository's Pages configuration** — when that happens,
GitHub stops serving the per-domain Let's Encrypt cert and falls back to the platform
default `*.github.io` certificate. Known triggers: the `CNAME` file being absent from the
deployed branch at some point, a Pages settings change, or a domain-verification lapse
(GitHub now requires verified custom domains on some account types; unverified domains
get dropped with an email notice).

**Ruled out:** local proxy interference (E1 is raw TCP); DNS misconfiguration (E4);
anything caused by this release work (incident predates Task 9; live build is still the
Nov-8-era `24191d1`).

## Recommended manual remediation (needs YOUR GitHub login — I have not done any of this)

1. Open <https://github.com/mdshezkhn/gifted-scholars/settings/pages>.
2. Under **Custom domain**: if `my-gifts-with-mo.duckdns.org` is missing → type it, **Save**.
   If present → remove it, Save, re-add it, Save (forces re-provisioning).
3. If GitHub shows **"unverified domain"** → follow its instruction to add the shown
   `TXT` record at <https://www.duckdns.org/update.jsp> (DuckDNS supports TXT via the
   update API / dashboard fields), then click **Verify**.
4. Wait for the DNS check to pass (usually minutes; DNS here already points correctly —
   no A/AAAA changes should be made; the current A record to 185.199.108.153 is the
   documented Pages IP and can stay).
5. Keep **Enforce HTTPS** checked once the certificate shows as available.
6. Let's Encrypt provisioning takes up to ~15–60 min after the domain is re-attached.

## Verification steps after remediation (I can run these on request)

1. `openssl s_client -connect my-gifts-with-mo.duckdns.org:443 -servername my-gifts-with-mo.duckdns.org` →
   cert must list the duckdns hostname in SAN (or CN).
2. Headless Edge loads <https://my-gifts-with-mo.duckdns.org/> with **zero** TLS errors
   (no `ignore_https_errors`).
3. `https://` resolves 200 with redirect from `http://` once Enforce HTTPS is back.

## Impact if left unfixed

Every student/teacher device gets a full-page security warning on every visit. Browsers
remember "proceed anyway" per-device only. This should be fixed **before or together
with** the production release so the new build debuts on a clean lock icon.

Do NOT instruct anyone to disable certificate validation or ignore warnings as a
"fix" — that is explicitly out of bounds.
