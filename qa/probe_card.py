import functools, http.server, socketserver, threading, os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
H=functools.partial(http.server.SimpleHTTPRequestHandler,directory=".")
class Q(socketserver.ThreadingMixIn,http.server.HTTPServer):daemon_threads=True
srv=Q(("127.0.0.1",8995),H);threading.Thread(target=srv.serve_forever,daemon=True).start()
with sync_playwright() as p:
    b=p.chromium.launch(channel="msedge",headless=True)
    pg=b.new_page(viewport={"width":1440,"height":900})
    pg.goto("http://localhost:8995/index.html#/");pg.wait_for_timeout(800)
    pg.evaluate("localStorage.clear();seedDemo();location.hash='#/app/classroom';route()");pg.wait_for_timeout(800)
    pg.screenshot(path="qa/shots/live-before/classroom-cardhit-check.png")
    info=pg.evaluate("(function(){const b=document.querySelector('.cardhit');if(!b)return 'NO-BUTTON';const cs=getComputedStyle(b);return {pos:cs.position,inset:cs.inset,bg:cs.backgroundColor,border:cs.borderStyle};})()")
    print("CARDHIT-STYLE:",info)
    b.close()
sys.stdout.flush(); os._exit(0)
