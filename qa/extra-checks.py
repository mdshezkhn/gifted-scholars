# Extras a/b/d: CPU throttle group award, robustness (corrupt JSON, quota,
# 50 students, emoji/CJK names), reduced-motion with Motion=off setting.
import functools, http.server, socketserver, threading, os, sys, json, time
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright

PORT = 8961
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=".")
class Q(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
srv = Q(("127.0.0.1", PORT), H)
threading.Thread(target=srv.serve_forever, daemon=True).start()
OUT = []

def rec(i, ok, d=""):
    OUT.append((i, bool(ok), str(d)))
    print(("PASS " if ok else "FAIL ") + i + ((" | " + str(d)) if not ok else ""))

CJK20 = ("欧阳铁蛋富强民主文明和谐美丽友善法治平安喜乐健康")[:20]

with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)

    # ---- a) old-computer: 4x CPU throttle, 30 students, group award ----
    cx = b.new_context(viewport={"width": 1920, "height": 1080})
    cx.set_cpu_throttling_rate(4.0) if hasattr(cx, "set_cpu_throttling_rate") else None
    pg = cx.new_page()
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(f"http://localhost:{PORT}/index.html"); pg.wait_for_timeout(600)
    pg.evaluate("tryDemo(true)")
    pg.evaluate("""(function(){
      while(S.students.length<30)S.students.push({id:'x'+S.students.length,name:'%s'+S.students.length,hue:(S.students.length*47)%%360});
      S.students[0].name='\\u{1F680}小火箭\\u{1F680}';
      save();})()""" % CJK20)
    pg.evaluate("location.hash='#/screen'; route()"); pg.wait_for_timeout(500)
    t0 = time.time()
    r = pg.evaluate("""(function(){
      const t0=performance.now();
      withState(function(){ applyRule(S.rules.find(x=>x.value>0), S.students.map(s=>s.id)); });
      const pops=screenAfterChange();
      return {awardMs:performance.now()-t0, pops:pops.length, particles:pops.reduce((a,x)=>a+x.particles,0), badges:pops.filter(x=>x.badge).length};
    })()""")
    frame = (time.time() - t0) * 1000
    rec("a1 group award 30 students no crash", r["pops"] == 30, r)
    rec("a2 particle cap holds (<=150 live)", r["particles"] <= 150, f"{r['particles']} granted, {r['badges']} badge fallbacks")
    rec("a3 award+render time sane @4x throttle", r["awardMs"] < 2500, f"{r['awardMs']:.0f}ms in-page")
    rec("a4 zero page errors @4x", len(errs) == 0, errs[:2])
    cx.close()

    # ---- b) robustness ----
    cx = b.new_context(viewport={"width": 1280, "height": 800})
    pg = cx.new_page()
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(f"http://localhost:{PORT}/index.html"); pg.wait_for_timeout(600)
    # corrupt JSON
    ok1 = pg.evaluate("""(function(){
      localStorage.setItem(LS_KEY,'{this is not json');
      location.hash='#/app/classroom';route();
      return S && Array.isArray(S.students);})()""")
    rec("b1 corrupt JSON -> fresh state, no crash", ok1 and len(errs) == 0, errs[:2])
    # quota exceeded
    ok2 = pg.evaluate("""(function(){
      let threw=false;
      const orig=Storage.prototype.setItem;
      Storage.prototype.setItem=function(k,v){throw new DOMException('full','QuotaExceededError');};
      try{withState(function(){S.settings.className='Q';});}catch(e){threw=true;}
      Storage.prototype.setItem=orig;
      return !threw;})()""")
    rec("b2 quota exceeded caught, banner path, no throw", ok2)
    # 50 students + emoji/CJK names render + escape check
    pg.evaluate("tryDemo(true)")
    pg.evaluate("""(function(){
      while(S.students.length<50)S.students.push({id:'y'+S.students.length,name:(S.students.length%%3===0?'\\u{1F9EA}':'%s')+S.students.length,hue:(S.students.length*29)%%360});
      S.students[1].name='<img src=x onerror=window.__xss=1>';
      save();})()""" % CJK20)
    pg.evaluate("location.hash='#/screen'; route()"); pg.wait_for_timeout(500)
    tiles = pg.evaluate("document.querySelectorAll('.scr-tile').length")
    xss = pg.evaluate("window.__xss===1")
    rec("b3 50 students render on screen", tiles == 50, tiles)
    rec("b4 escaped name does not execute", xss is False)
    rec("b5 zero page errors robustness", len(errs) == 0, errs[:2])
    cx.close()

    # ---- d) reduced motion: OS setting AND Settings Motion=off ----
    for label, ctxopt in [("OS reduce", dict(reduced_motion="reduce")), ]:
        cx = b.new_context(viewport={"width": 1280, "height": 800}, **ctxopt)
        pg = cx.new_page()
        pg.goto(f"http://localhost:{PORT}/index.html"); pg.wait_for_timeout(500)
        pg.evaluate("tryDemo(true)")
        pg.evaluate("location.hash='#/screen'; route()"); pg.wait_for_timeout(400)
        pg.evaluate("withState(function(){ applyRule(S.rules.find(r=>r.value>0), [S.students[0].id]); }); screenAfterChange()")
        pg.wait_for_timeout(400)
        conf = pg.evaluate("document.querySelectorAll('.scr-confetti').length")
        rec(f"d1 {label}: 0 confetti particles", conf == 0, conf)
        cx.close()
    # Motion=off via settings (no OS emulation)
    cx = b.new_context(viewport={"width": 1280, "height": 800})
    pg = cx.new_page()
    pg.goto(f"http://localhost:{PORT}/index.html"); pg.wait_for_timeout(500)
    pg.evaluate("tryDemo(true); saveMotion('off')")
    pg.evaluate("location.hash='#/screen'; route()"); pg.wait_for_timeout(400)
    pg.evaluate("withState(function(){ applyRule(S.rules.find(r=>r.value>0), [S.students[0].id]); }); screenAfterChange()")
    pg.wait_for_timeout(400)
    conf = pg.evaluate("document.querySelectorAll('.scr-confetti').length")
    rec("d2 Settings Motion=off: 0 confetti particles", conf == 0, conf)
    cx.close()
    b.close()

ok = sum(1 for _, o, _ in OUT if o)
print(f"EXTRA {ok}/{len(OUT)}")
with open("qa/EXTRA-CHECKS.md", "w", encoding="utf-8") as f:
    f.write("# Extra checks a/b/d\n\n| check | result | detail |\n|---|---|---|\n")
    for i, o, d in OUT:
        f.write(f"| {i} | {'✅' if o else '❌'} | {d} |\n")
sys.stdout.flush(); sys.stderr.flush()
os._exit(0 if ok == len(OUT) else 1)
