import functools, http.server, socketserver, threading, os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
H=functools.partial(http.server.SimpleHTTPRequestHandler,directory=".")
class Q(socketserver.ThreadingMixIn,http.server.HTTPServer):daemon_threads=True
srv=Q(("127.0.0.1",8994),H);threading.Thread(target=srv.serve_forever,daemon=True).start()
with sync_playwright() as p:
    b=p.chromium.launch(channel="msedge",headless=True)
    pg=b.new_page(viewport={"width":1440,"height":900})
    pg.goto("http://localhost:8994/index.html#/");pg.wait_for_timeout(1200)
    # A: setLang
    pg.evaluate("setLang('en')");pg.wait_for_timeout(500)
    nav=pg.evaluate("document.querySelector('.gsnav').innerText.slice(0,80)")
    print("A nav-after-en:",repr(nav))
    pg.evaluate("setLang('zh')");pg.wait_for_timeout(300)
    # B: anchor click — what happens to hash + scroll
    pg.evaluate("window.scrollTo(0,0)");pg.wait_for_timeout(200)
    pg.click('.gsnav a[href="#features"]');pg.wait_for_timeout(700)
    print("B hash:",pg.evaluate("location.hash"),"scrollY:",pg.evaluate("Math.round(scrollY)"),
          "landingRendered:",pg.evaluate("!!document.querySelector('.gsmain')"))
    # C: details toggle
    st=pg.evaluate("(function(){const d=document.querySelector('#faq details');const b=d.open;d.querySelector('summary').click();return [b,!d.open];})()")
    print("C details toggle:",st)
    # D: menu at mobile
    pg2=b.new_page(viewport={"width":390,"height":844})
    pg2.goto("http://localhost:8994/index.html#/");pg2.wait_for_timeout(1000)
    d0=pg2.evaluate("document.getElementById('gsmenu').hidden")
    vis0=pg2.evaluate("getComputedStyle(document.getElementById('gsmenu')).display")
    pg2.click(".gsnav-burger");pg2.wait_for_timeout(300)
    d1=pg2.evaluate("document.getElementById('gsmenu').hidden")
    print("D menu hidden-before:",d0,"display-before:",vis0,"hidden-after-click:",d1)
    b.close()
sys.stdout.flush()
os._exit(0)
