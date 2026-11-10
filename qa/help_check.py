import functools, http.server, socketserver, threading, os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=".")
class Q(socketserver.ThreadingMixIn, http.server.HTTPServer): daemon_threads = True
srv = Q(("127.0.0.1", 8996), H); threading.Thread(target=srv.serve_forever, daemon=True).start()
with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    pg = b.new_page(viewport={"width": 1440, "height": 900})
    errs = []; pg.on("pageerror", lambda e: errs.append(str(e)[:60]))
    pg.goto("http://localhost:8996/index.html#/help"); pg.wait_for_timeout(1000)
    items = pg.evaluate("document.querySelectorAll('#help-list details').length")
    has8 = pg.evaluate("document.body.textContent.includes('还原卡') && document.body.textContent.includes('导入备份')")
    pg.fill("#help-q", "deep freeze"); pg.wait_for_timeout(300)
    vis = pg.evaluate("[...document.querySelectorAll('#help-list details')].filter(d=>!d.classList.contains('gs-hide')).length")
    none = pg.evaluate("!document.getElementById('help-none').classList.contains('hide')")
    pg.fill("#help-q", "zzzznope"); pg.wait_for_timeout(250)
    none2 = pg.evaluate("!document.getElementById('help-none').classList.contains('hide')")
    print("ITEMS", items, "| zh-new-topics", has8, "| search-deepfreeze-visible", vis, "| en-none", none, "| empty-none", none2, "| errors", len(errs))
    b.close()
sys.stdout.flush()
os._exit(0)
