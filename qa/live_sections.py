import os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright
OUT = os.path.join(os.path.dirname(__file__), "shots", "live-after")
with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    pg = b.new_context(viewport={"width":1440,"height":900}).new_page()
    pg.goto("https://my-gifts-with-mo.duckdns.org/"); pg.wait_for_timeout(1500)
    for aid in ["features","how","privacy","faq"]:
        pg.evaluate("document.getElementById('" + aid + "').scrollIntoView({behavior:'instant',block:'start'})")
        pg.wait_for_timeout(1100)
        vis = pg.evaluate(f"""(function(){{const e=document.getElementById('{aid}');const r=e.getBoundingClientRect();
            const st=getComputedStyle(e.querySelector('.rv')||e);
            return {{top:Math.round(r.top),opacity:st.opacity,cls:(e.querySelector('.rv')||e).className}};}})()""")
        print(aid.upper(), vis)
        pg.screenshot(path=os.path.join(OUT, f"section-{aid}-1440.png"))
    b.close()
sys.stdout.flush()
import os; os._exit(0)
