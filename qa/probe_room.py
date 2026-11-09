# One-off: does #/room/s1 show the room or the landing? (fall-through probe)
import functools, http.server, socketserver, threading, os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright

PORT = 8953
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=".")
class Q(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
srv = Q(("127.0.0.1", PORT), H)
threading.Thread(target=srv.serve_forever, daemon=True).start()

with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    pg = b.new_page(viewport={"width": 1600, "height": 900})
    pg.goto(f"http://localhost:{PORT}/index.html#/app/settings")
    pg.wait_for_timeout(900)
    pg.evaluate("seedDemo();save()")
    pg.goto(f"http://localhost:{PORT}/index.html#/room/s1")
    pg.wait_for_timeout(1200)
    info = pg.evaluate("""() => ({
      viewClass: (document.querySelector('#view').firstElementChild||{}).className,
      hasRoom: !!document.querySelector('.room'),
      hasLanding: !!document.querySelector('.gs-page'),
      title: document.title
    })""")
    print("RESULT:", info)
    b.close()
sys.stdout.flush(); sys.stderr.flush()
os._exit(0)
