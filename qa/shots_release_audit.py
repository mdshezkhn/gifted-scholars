# T2 visual audit captures — 12 targets x 5 viewports (fresh, from built index.html)
import functools, http.server, socketserver, threading, os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright

PORT = 8991
OUT = os.path.join(os.path.dirname(__file__), "shots", "release-audit")
os.makedirs(OUT, exist_ok=True)
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=".")
class Q(socketserver.ThreadingMixIn, http.server.HTTPServer): daemon_threads = True
srv = Q(("127.0.0.1", PORT), H); threading.Thread(target=srv.serve_forever, daemon=True).start()

SIZES = [(1440,900,"d1440"),(1280,800,"d1280"),(768,1024,"t768"),(390,844,"m390"),(320,700,"m320")]
errs = []
with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    for w,h,tag in SIZES:
        pg = b.new_page(viewport={"width":w,"height":h})
        pg.on("pageerror", lambda e: errs.append(f"{tag}: {e}"[:90]))
        pg.goto(f"http://localhost:{PORT}/index.html#/"); pg.wait_for_timeout(1300)
        def scroll_through(pg):
            hgt = pg.evaluate("document.body.scrollHeight")
            y = 0
            while y < hgt:
                pg.evaluate(f"window.scrollTo(0,{y})"); pg.wait_for_timeout(160); y += 500
            pg.evaluate("window.scrollTo(0,document.body.scrollHeight)"); pg.wait_for_timeout(350)
            pg.evaluate("window.scrollTo(0,0)"); pg.wait_for_timeout(450)
        scroll_through(pg)
        # 1 hero
        pg.screenshot(path=f"{OUT}/01-hero-{tag}.png")
        # 2 complete homepage (full page)
        pg.screenshot(path=f"{OUT}/02-full-{tag}.png", full_page=True)
        # 3-8 sections (element shots; graceful if id missing)
        for name,sel in [("03-features",'#features'),("04-how",'#how'),("05-bigscreen",'#bigscreen, #screen-show, .gsshow'),
                         ("06-privacy",'#privacy'),("07-faq",'#faq'),("08-footer",'footer, .gsfooter')]:
            try:
                el = pg.query_selector(sel.replace(" ",""))
                if el: el.screenshot(path=f"{OUT}/{name}-{tag}.png")
            except Exception as ex: print(name, tag, "ERR", str(ex)[:50])
        # 9 mobile nav open (mobile/tablet widths only)
        if w < 1000:
            try:
                pg.click(".gsnav-burger"); pg.wait_for_timeout(350)
                pg.screenshot(path=f"{OUT}/09-menu-{tag}.png")
                pg.keyboard.press("Escape"); pg.wait_for_timeout(200)
            except Exception as ex: print("menu", tag, "ERR", str(ex)[:50])
        # 10 help
        pg.evaluate("location.hash='#/help'; route()"); pg.wait_for_timeout(600)
        pg.screenshot(path=f"{OUT}/10-help-{tag}.png")
        # 11 random picker (screen + drawn)
        pg.evaluate("localStorage.clear(); seedDemo(); location.hash='#/screen'; route()"); pg.wait_for_timeout(700)
        pg.evaluate("pickOpen()"); pg.wait_for_timeout(250)
        pg.evaluate("pickDraw()"); pg.wait_for_timeout(350)
        pg.screenshot(path=f"{OUT}/11-picker-{tag}.png")
        pg.evaluate("pickClose()")
        # 12 room picker modal (from landing)
        pg.evaluate("location.hash='#/'; route()"); pg.wait_for_timeout(500)
        pg.evaluate("openRoomPicker()"); pg.wait_for_timeout(400)
        pg.screenshot(path=f"{OUT}/12-roompicker-{tag}.png")
        pg.evaluate("closeOverlays && closeOverlays()")
        pg.close()
    b.close()
n = len([f for f in os.listdir(OUT) if f.endswith(".png")])
print(f"captured {n} screenshots; page errors: {len(errs)}")
for e in errs[:6]: print(" ", e)
os._exit(0)
