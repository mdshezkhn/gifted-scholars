# Post-deploy LIVE verification on https://my-gifts-with-mo.duckdns.org/
import os, sys, json
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright

LIVE = "https://my-gifts-with-mo.duckdns.org/"
OUT = os.path.join(os.path.dirname(__file__), "shots", "live-after")
os.makedirs(OUT, exist_ok=True)
R = []
def check(name, ok, detail=""):
    R.append((name, bool(ok))); print(("PASS " if ok else "FAIL ") + name + ((" | " + str(detail)[:80]) if not ok and detail else ""))

with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    ctx = b.new_context(viewport={"width": 1440, "height": 900})
    pg = ctx.new_page()
    errs = []; pg.on("pageerror", lambda e: errs.append(str(e)[:70]))
    req = []; pg.on("request", lambda r: req.append(r.url) if not r.url.startswith("data:") else None)

    pg.goto(LIVE); pg.wait_for_timeout(1600)
    check("landing loads (new build)", pg.evaluate("document.body.textContent.includes('gifted scholars')"))
    check("features section present", pg.evaluate("document.querySelectorAll('#features .gscard, .gsfeats .gscard').length >= 3"))
    pg.screenshot(path=os.path.join(OUT, "landing-1440.png"))
    h = pg.evaluate("document.body.scrollHeight"); y = 0
    while y < h:
        pg.evaluate(f"window.scrollTo(0,{y})"); pg.wait_for_timeout(120); y += 600
    pg.screenshot(path=os.path.join(OUT, "landing-full-1440.png"))
    check("no horizontal overflow desktop", pg.evaluate("document.documentElement.scrollWidth") <= 1440)

    pg.goto(LIVE + "#/help"); pg.wait_for_timeout(1200)
    check("help 14 topics live", pg.evaluate("document.querySelectorAll('#help-list details').length") == 14)
    pg.screenshot(path=os.path.join(OUT, "help-1440.png"))

    pg.evaluate("localStorage.clear(); seedDemo(); location.hash='#/screen'; route()"); pg.wait_for_timeout(1400)
    tiles = pg.evaluate("document.querySelectorAll('.scr-tile').length")
    check("big screen tiles live", tiles >= 16, tiles)
    pg.screenshot(path=os.path.join(OUT, "screen-1440.png"))
    check("no horizontal overflow screen", pg.evaluate("document.documentElement.scrollWidth") <= 1440)

    zh = pg.evaluate("document.querySelector('.scr-tile .scr-name') !== null")
    pg.evaluate("setLang('en'); route()"); pg.wait_for_timeout(500)
    en_ok = pg.evaluate("document.documentElement.lang") == "en"
    pg.evaluate("setLang('zh'); route()"); pg.wait_for_timeout(300)
    check("language toggle live", zh and en_ok)

    pg.evaluate("location.hash='#/app/classroom'; route()"); pg.wait_for_timeout(500)
    pg.reload(); pg.wait_for_timeout(1200)
    check("refresh restores classroom", pg.evaluate("location.hash") == "#/app/classroom" and pg.evaluate("document.body.textContent.includes('评分') || document.querySelectorAll('.card').length>0"))

    old = json.dumps({"version": 1, "settings": {"className": "Old Class", "sound": False, "motion": True},
                      "students": [{"id": "sX", "name": "旧学生", "hue": 120}],
                      "records": [{"id": "rX", "ts": 1730000000000, "studentIds": ["sX"], "ruleId": "ruleX", "ruleLabel": "举手", "value": 2, "undone": False}],
                      "requests": [], "collection": {}, "rules": [{"id": "ruleX", "label": "Raise hand", "zh": "举手", "icon": "✋", "value": 2}],
                      "gifts": [], "boxSpent": {}}, ensure_ascii=False)
    pg.evaluate("arguments_ => localStorage.setItem('gifted-scholars-v1', arguments_)", old)
    pg.reload(); pg.wait_for_timeout(1400)
    ok = pg.evaluate("""(function(){try{const S=JSON.parse(localStorage.getItem('gifted-scholars-v1'));
        return S.students.length===1 && S.students[0].name==='旧学生' && S.records.length===1;}catch(e){return false;}})()""")
    check("old localStorage survives new build (live)", ok)
    pg.evaluate("localStorage.clear()")

    m = b.new_context(viewport={"width": 390, "height": 844}).new_page()
    m.on("pageerror", lambda e: errs.append("m390: " + str(e)[:60]))
    m.goto(LIVE); m.wait_for_timeout(1400)
    check("no horizontal overflow mobile", m.evaluate("document.documentElement.scrollWidth") <= 390)
    if m.query_selector(".gsnav-burger"):
        m.click(".gsnav-burger"); m.wait_for_timeout(300)
    m.screenshot(path=os.path.join(OUT, "landing-menu-390.png"))
    m.goto(LIVE + "#/screen"); m.wait_for_timeout(300)
    m.evaluate("seedDemo(); route()"); m.wait_for_timeout(1200)
    m.screenshot(path=os.path.join(OUT, "screen-390.png"))
    th = m.evaluate("document.querySelectorAll('.scr-tile').length>1 ? document.querySelectorAll('.scr-tile')[1].getBoundingClientRect().height : 0")
    check("mobile tiles full height live", th > 100, th)

    check("zero page errors live", len(errs) == 0, errs[:2])
    ext = [u for u in req if not (u.startswith("https://my-gifts-with-mo") or u.startswith("data:") or u.startswith("blob:"))]
    check("zero third-party requests live", len(ext) == 0, ext[:2])
    b.close()

print(f"LIVE-SUMMARY {sum(1 for _, ok in R if ok)}/{len(R)}")
sys.stdout.flush()
os._exit(0)
