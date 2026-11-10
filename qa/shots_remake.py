import functools, http.server, socketserver, threading, os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright
PORT=8971
os.chdir(os.path.join(os.path.dirname(__file__),".."))
H=functools.partial(http.server.SimpleHTTPRequestHandler,directory=".")
class Q(socketserver.ThreadingMixIn,http.server.HTTPServer):daemon_threads=True
srv=Q(("127.0.0.1",PORT),H);threading.Thread(target=srv.serve_forever,daemon=True).start()
SIZES=[(1440,900),(1280,800),(768,1024),(390,844),(320,700)]
with sync_playwright() as p:
    b=p.chromium.launch(channel="msedge",headless=True)
    errs=[]
    for w,h in SIZES:
        pg=b.new_page(viewport={"width":w,"height":h})
        pg.on("pageerror",lambda e:errs.append(str(e)[:80]))
        tag=f"{w}"
        pg.goto(f"http://localhost:{PORT}/index.html#/");pg.wait_for_timeout(1100)
        ov=pg.evaluate("document.documentElement.scrollWidth")-w
        pg.screenshot(path=f"qa/shots/remake/landing-{tag}.png")
        if w<901:
            pg.click(".gsnav-burger");pg.wait_for_timeout(250)
            pg.screenshot(path=f"qa/shots/remake/landing-{tag}-menu.png")
            pg.keyboard.press("Escape")
        pg.evaluate("location.hash='#/help'");pg.wait_for_timeout(600)
        pg.screenshot(path=f"qa/shots/remake/help-{tag}.png")
        pg.evaluate("localStorage.clear();seedDemo();location.hash='#/screen';route()");pg.wait_for_timeout(700)
        pg.evaluate("pickOpen()");pg.wait_for_timeout(300)
        pg.evaluate("pickDraw()");pg.wait_for_timeout(300)
        pg.screenshot(path=f"qa/shots/remake/screen-picker-{tag}.png")
        print(tag,"overflow:",ov)
        pg.close()
    b.close()
print("page errors:",len(errs))
sys.stdout.flush(); os._exit(0)
