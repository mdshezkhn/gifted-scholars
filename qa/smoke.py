# qa/smoke.py — headless-browser smoke test (run after EVERY task overnight).
# Loads the built index.html, walks core flows, fails on console/page errors.
# Usage:  C:/Python314/python.exe qa/smoke.py   (from repo root; builds nothing)
import functools, http.server, socketserver, threading, os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright

PORT = 8957
ROOT = os.path.join(os.path.dirname(__file__), "..")
os.chdir(ROOT)
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=".")
class Q(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
srv = Q(("127.0.0.1", PORT), H)
threading.Thread(target=srv.serve_forever, daemon=True).start()

fails = []
def check(name, ok, info=""):
    print(("PASS" if ok else "FAIL"), name, ("" if ok else " | " + str(info)))
    if not ok: fails.append(name)

with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    pg = b.new_page(viewport={"width": 1600, "height": 900})
    errs = []
    pg.on("pageerror", lambda e: errs.append("pageerror: " + str(e)))
    pg.on("console", lambda m: errs.append("console.error: " + m.text) if m.type == "error" else None)

    pg.goto(f"http://localhost:{PORT}/index.html")
    pg.wait_for_timeout(1000)
    check("landing loads", pg.evaluate("document.querySelector('.gs-page') !== null"))

    pg.evaluate("localStorage.clear()")
    pg.evaluate("tryDemo(true)")  # fresh empty -> demo, no confirm dialog
    pg.wait_for_timeout(300)

    pg.evaluate("location.hash='#/screen'; route()")
    pg.wait_for_timeout(500)
    check("screen renders", pg.evaluate("document.querySelector('.scr-grid') !== null"))
    check("tiles present", pg.evaluate("document.querySelectorAll('.scr-tile').length") >= 16)

    # award via drawer path (function level): 2 students, first active rule
    before = pg.evaluate("((JSON.parse(localStorage.getItem(LS_KEY))||{}).records||[]).length")
    pg.evaluate("withState(function(){ applyRule(S.rules.find(r=>r.value>0), [S.students[0].id, S.students[1].id]); }); if(typeof screenAfterChange==='function')screenAfterChange();else route();")
    pg.wait_for_timeout(400)
    after = pg.evaluate("((JSON.parse(localStorage.getItem(LS_KEY))||{}).records||[]).length")
    check("award persists", after == before + 1, f"records {before}->{after}")
    check("wallet updates on tile", pg.evaluate("document.querySelector('.scr-tile .scr-pts') !== null"))

    # reload survival
    pg.reload(); pg.wait_for_timeout(900)
    pg.evaluate("location.hash='#/screen'; route()"); pg.wait_for_timeout(400)
    check("survives reload", pg.evaluate("((JSON.parse(localStorage.getItem(LS_KEY))||{}).records||[]).length") == after)

    check("zero console/page errors", len(errs) == 0, errs[:4])
    b.close()

sys.stdout.flush(); sys.stderr.flush()
os._exit(1 if fails else 0)
