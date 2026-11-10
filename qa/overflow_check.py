import functools, http.server, socketserver, threading, os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright
PORT = 8998
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=".")
class Q(socketserver.ThreadingMixIn, http.server.HTTPServer): daemon_threads = True
srv = Q(("127.0.0.1", PORT), H); threading.Thread(target=srv.serve_forever, daemon=True).start()
with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    errs = []
    for w, h in [(1440, 900), (1280, 800), (768, 1024), (390, 844), (320, 700)]:
        pg = b.new_context(viewport={"width": w, "height": h}).new_page()
        pg.on("pageerror", lambda e: errs.append(f"{w}px: " + str(e)[:60]))
        for view in ["#/", "#/help", "#/app/classroom", "#/app/settings", "#/screen"]:
            pg.goto(f"http://localhost:{PORT}/index.html{view}")
            pg.wait_for_timeout(500)
            ov = pg.evaluate("document.documentElement.scrollWidth - window.innerWidth")
            if ov > 0:
                print(f"OVERFLOW {view} @{w}: +{ov}px")
        pg.close()
    print("errors:", len(errs), errs[:3])
    b.close()
sys.stdout.flush()
os._exit(0)
