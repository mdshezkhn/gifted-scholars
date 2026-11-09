# Task 9 layout check @1920x1080: 24/30 fit (no page scroll), 40 scrolls inside
# the grid; computed fonts >= binding minimums (name 32, pts 44, lv 24).
# Screenshots include long CJK + emoji names. zh default.
import functools, http.server, socketserver, threading, os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright

PORT = 8955
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=".")
class Q(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
srv = Q(("127.0.0.1", PORT), H)
threading.Thread(target=srv.serve_forever, daemon=True).start()

CJK20 = ("欧阳铁蛋富强民主文明和谐美丽友善法治平安喜乐健康")[:20]
EMOJI = "🚀小火箭🚀⭐🌟"

def student_json(n):
    import json
    studs = []
    for i in range(n):
        if i == 0: nm = CJK20
        elif i == 1: nm = EMOJI
        else: nm = f"学生{i:02d}"
        studs.append({"id": f"t{i}", "name": nm, "hue": (i * 23) % 360})
    return json.dumps(studs, ensure_ascii=False)

results = []
shots = [("24", "qa/shots/6-screen-24.png"), ("30", "qa/shots/7-screen-30.png"), ("40", "qa/shots/8-screen-40.png")]

with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    pg = b.new_page(viewport={"width": 1920, "height": 1080})
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(f"http://localhost:{PORT}/index.html#/app/settings")
    pg.wait_for_timeout(900)
    pg.evaluate("localStorage.clear()")
    pg.reload(); pg.wait_for_timeout(800)
    for n, shot in shots:
        pg.evaluate(f"""() => {{
          S = emptyState();
          S.settings.className = "三年二班";
          S.students = {student_json(int(n))};
          S.students.forEach((st,i) => {{ for(let k=0;k<=i%6;k++) S.records.unshift({{id:"r"+st.id+k, ts:Date.now()-60000*(k+1), studentIds:[st.id], ruleId:S.rules[0].id, ruleLabel:"举手", value:2, undone:false}}); }});
          save();
        }}""")
        if pg.url.split("#")[-1] == "/screen":
            pg.evaluate("location.hash='#/screen';route()")
        else:
            pg.goto(f"http://localhost:{PORT}/index.html#/screen")
        pg.wait_for_timeout(700)
        m = pg.evaluate("""() => {
          const doc = document.documentElement;
          const grid = document.getElementById("scrGrid");
          const cs = el => { const s = getComputedStyle(el); return parseFloat(s.fontSize); };
          const name = document.querySelector(".scr-name");
          const pts = document.querySelector(".scr-pts");
          const lv = document.querySelector(".scr-lv");
          return {
            tiles: grid.children.length,
            pageScroll: doc.scrollHeight > window.innerHeight,
            gridScrolls: grid.scrollHeight > grid.clientHeight + 1,
            fName: cs(name), fPts: cs(pts), fLv: cs(lv),
            cjkVisible: name.textContent.length === 20,
            emojiTile: (document.querySelector("#tile-t1 .scr-name")||{}).textContent
          };
        }""")
        pg.screenshot(path=shot)
        results.append((n, m))
    print("page errors:", len(errs))
    for n, m in results:
        print(f"N={n}: tiles={m['tiles']} pageScroll={m['pageScroll']} gridScrolls={m['gridScrolls']} "
              f"fonts name/pts/lv={m['fName']}/{m['fPts']}/{m['fLv']} cjk20={m['cjkVisible']} emoji={m['emojiTile']}")
    b.close()
srv.server_close()
sys.stdout.flush(); sys.stderr.flush()
os._exit(0)
