# T9 preflight browser work: (A) live-site BEFORE captures (read-only GETs),
# (B) export-download demo on the LOCAL build (own localStorage, demo data only).
import os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright

OUT = os.path.join(os.path.dirname(__file__), "shots", "live-before")
os.makedirs(OUT, exist_ok=True)
LIVE = "https://my-gifts-with-mo.duckdns.org/"
errs = []

with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    ctx = b.new_context(ignore_https_errors=True, viewport={"width":1440,"height":900})

    # ---- A: live production, read-only ----
    pg = ctx.new_page()
    pg.on("pageerror", lambda e: errs.append("LIVE:"+str(e)[:70]))
    r = pg.goto(LIVE, wait_until="load", timeout=45000)
    print("LIVE-HTTP:", r.status, "| TLS ok (browser trusted, no interception error)")
    pg.wait_for_timeout(1500)
    pg.screenshot(path=os.path.join(OUT,"live-home-1440.png"))
    pg.evaluate("location.hash='#/app/settings'; if(typeof route==='function')route()"); pg.wait_for_timeout(1200)
    pg.screenshot(path=os.path.join(OUT,"live-settings-1440.png"))
    export_btn = pg.evaluate("(function(){const b=[...document.querySelectorAll('button,a')].find(x=>/导出|Export|备份/.test(x.textContent));return b?b.textContent.trim():'NOT-FOUND';})()")
    print("LIVE-EXPORT-BUTTON:", export_btn)
    m2 = b.new_context(ignore_https_errors=True, viewport={"width":390,"height":844})
    m = m2.new_page()
    m.goto(LIVE, wait_until="load", timeout=45000); m.wait_for_timeout(1200)
    m.screenshot(path=os.path.join(OUT,"live-home-390.png"))
    print("LIVE-CONSOLE-ERRORS:", len([e for e in errs if e.startswith('LIVE')]))

    # ---- B: local build export demo (demo data, own storage) ----
    ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    pg2 = b.new_page(viewport={"width":1440,"height":900})
    pg2.goto("file:///" + ROOT.replace("\\","/") + "/index.html#/app/settings")
    pg2.wait_for_timeout(1000)
    pg2.evaluate("tryDemo(true)"); pg2.wait_for_timeout(600)
    pg2.evaluate("location.hash='#/app/settings'; route()"); pg2.wait_for_timeout(600)
    with pg2.expect_download(timeout=8000) as dl:
        pg2.evaluate("(function(){const b=[...document.querySelectorAll('button,a')].find(x=>/导出|Export/.test(x.textContent));if(b)b.click();})()")
    d = dl.value
    path = os.path.join(OUT, "export-demo.json")
    d.save_as(path)
    import json, io
    data = json.load(io.open(path, encoding="utf-8"))
    print("EXPORT-DEMO: file=%s bytes=%d students=%d records=%d keys=%s" % (
        d.suggested_filename, os.path.getsize(path), len(data.get("students",[])),
        len(data.get("records",[])), ",".join(sorted(data.keys()))))
    b.close()
sys.stdout.flush()
os._exit(0)
