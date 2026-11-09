# Final deliverable screenshots (zh, 1920x1080) -> qa/shots/final/
import functools, http.server, socketserver, threading, os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright

PORT = 8963
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
OUT = os.path.join("qa", "shots", "final")
os.makedirs(OUT, exist_ok=True)
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=".")
class Q(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
srv = Q(("127.0.0.1", PORT), H)
threading.Thread(target=srv.serve_forever, daemon=True).start()

CJK20 = ("欧阳铁蛋富强民主文明和谐美丽友善法治平安喜乐健康")[:20]

with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    ctx = b.new_context(viewport={"width": 1920, "height": 1080})
    pg = ctx.new_page()
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.on("console", lambda m: errs.append("console: " + m.text) if m.type == "error" else None)
    pg.goto(f"http://localhost:{PORT}/index.html"); pg.wait_for_timeout(700)
    pg.evaluate("tryDemo(true)")

    # 24 students
    pg.evaluate("(function(){S.students=S.students.slice(0,24);save();})()")
    pg.evaluate("location.hash='#/screen'; route()"); pg.wait_for_timeout(500)
    pg.screenshot(path=os.path.join(OUT, "bigscreen-24.png"))

    # 30 students (long CJK + emoji names included)
    pg.evaluate("(function(){while(S.students.length<30)S.students.push({id:'f'+S.students.length,name:(S.students.length%%3===0?'\\u{1F680}':'%s')+S.students.length,hue:(S.students.length*53)%%360});save();location.hash='#/screen';route();})()" % CJK20)
    pg.wait_for_timeout(500)
    pg.screenshot(path=os.path.join(OUT, "bigscreen-30.png"))

    # drawer open
    pg.evaluate("openDrawer()"); pg.wait_for_timeout(400)
    pg.screenshot(path=os.path.join(OUT, "drawer-open.png"))
    pg.evaluate("closeDrawer()")

    # pop mid-animation: enable sound off (mute), award, shoot ~350ms in
    pg.evaluate("setSound(false)")
    pg.evaluate("(function(){withState(function(){applyRule(S.rules.find(r=>r.value>0),[S.students[0].id,S.students[5].id]);});screenAfterChange();})()")
    pg.wait_for_timeout(320)
    pg.screenshot(path=os.path.join(OUT, "pop-mid.png"))
    pg.wait_for_timeout(2600)

    # classroom (app-ui theme)
    pg.evaluate("location.hash='#/app/classroom'; route()"); pg.wait_for_timeout(400)
    pg.screenshot(path=os.path.join(OUT, "classroom.png"))

    # student room
    pg.evaluate("(function(){location.hash='#/room/'+S.students[0].id;route();})()"); pg.wait_for_timeout(400)
    pg.screenshot(path=os.path.join(OUT, "room.png"))

    # settings
    pg.evaluate("location.hash='#/app/settings'; route()"); pg.wait_for_timeout(400)
    pg.screenshot(path=os.path.join(OUT, "settings.png"))

    # landing
    pg.evaluate("(function(){location.hash='#/';route();})()"); pg.wait_for_timeout(500)
    pg.screenshot(path=os.path.join(OUT, "landing.png"))

    print("errors:", len(errs), errs[:2])
    b.close()
sys.stdout.flush(); sys.stderr.flush()
os._exit(0)
