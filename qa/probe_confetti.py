# Probe: do confetti particles actually spawn on award?
import functools, http.server, socketserver, threading, os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright

PORT = 8965
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=".")
class Q(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
srv = Q(("127.0.0.1", PORT), H)
threading.Thread(target=srv.serve_forever, daemon=True).start()

with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    pg = b.new_page(viewport={"width": 1920, "height": 1080})
    pg.goto(f"http://localhost:{PORT}/index.html"); pg.wait_for_timeout(600)
    pg.evaluate("tryDemo(true)")
    pg.evaluate("location.hash='#/screen'; route()"); pg.wait_for_timeout(400)
    info = pg.evaluate("""(function(){
      withState(function(){applyRule(S.rules.find(r=>r.value>0),[S.students[0].id]);});
      const pops=screenAfterChange();
      return {
        pops: JSON.stringify(pops),
        confetti: document.querySelectorAll('.scr-confetti').length,
        motion: document.documentElement.classList.contains('gs-motion'),
        popClass: !!document.querySelector('.scr-tile.pop-pos')
      };
    })()""")
    print("INFO:", info)
    pg.wait_for_timeout(100)
    print("confetti@100ms:", pg.evaluate("document.querySelectorAll('.scr-confetti').length"))
    b.close()
sys.stdout.flush(); sys.stderr.flush()
os._exit(0)
