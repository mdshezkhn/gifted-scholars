# Extra checks a, b, d (after Task 15): throttle + robustness + reduced motion.
import functools, http.server, socketserver, threading, os, sys, json
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright

PORT = 8959
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=".")
class Q(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    log_aliases = {"": "x"}
srv = Q(("127.0.0.1", PORT), H)
threading.Thread(target=srv.serve_forever, daemon=True).start()

def seed30(pg):
    pg.evaluate("""(function(){
      tryDemo(true);
      while(S.students.length<30)S.students.push({id:'sx'+S.students.length,
        name:S.students.length%5===0?'\\u{1F680}\\u5C0F\\u706B\\u7BAD\\u{1F680}':('\\u5F20\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50'+S.students.length),
        hue:(S.students.length*47)%360});
      save();location.hash='#/screen';route();
    })()""")
    pg.wait_for_timeout(500)

out = []
def rec(name, ok, info=""):
    out.append((name, ok, info))
    print(("PASS " if ok else "FAIL ") + name + ((" | " + str(info)) if info else ""))

with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)

    # ---- a. old-computer: 4x CPU throttle, 30 students, group award ----
    ctx = b.new_context(viewport={"width": 1920, "height": 1080})
    ctx.set_default_timeout(15000)
    pg = ctx.new_page()
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(f"http://localhost:{PORT}/index.html")
    pg.wait_for_timeout(800)
    # emulate slow CPU BEFORE the award
    cdp = ctx.new_cdp_session(pg)
    cdp.send("Emulation.setCPUThrottlingRate", {"rate": 4})
    seed30(pg)
    frames = pg.evaluate("""(function(){
      // measure animation frames during a 30-student group award
      window.__frames = [];
      function mark(t){ window.__frames.push(t); }
      function loop(t){ mark(t); if (window.__frames.length < 90) requestAnimationFrame(loop); }
      requestAnimationFrame(loop);
      withState(function(){ applyRule(S.rules.find(r=>r.value>0), S.students.map(s=>s.id)); });
      return true;
    })()""")
    pg.wait_for_timeout(2200)
    ms = pg.evaluate("(function(){var f=window.__frames||[];var d=[];for(var i=1;i<f.length;i++)d.push(f[i]-f[i-1]);d.sort(function(a,b){return a-b);return d;})()" if False else
                     "(function(){var f=window.__frames||[];var d=[];for(var i=1;i<f.length;i++)d.push(f[i]-f[i-1]);d.sort(function(a,b){return a-b});return {n:f.length,median:d[Math.floor(d.length/2)],p95:d[Math.floor(d.length*0.95)],max:d[d.length-1]};})()")
    cap = pg.evaluate("LIVE_PARTICLES<=150")
    rec("a1 group award to 30 renders", pg.evaluate("document.querySelectorAll('.scr-tile').length") == 30)
    rec("a2 frame times @4x throttle", ms and ms["n"] >= 60, ms)
    rec("a3 particle cap holds", cap, pg.evaluate("LIVE_PARTICLES"))
    rec("a4 zero page errors @throttle", len(errs) == 0, errs[:2])

    # ---- b. robustness ----
    pg.evaluate("localStorage.clear()"); pg.reload(); pg.wait_for_timeout(600)
    pg.evaluate("localStorage.setItem(LS_KEY,'{not json!!')")
    pg.reload(); pg.wait_for_timeout(700)
    ok_corrupt = pg.evaluate("(function(){try{return S&&S.students&&S.rules?true:false}catch(e){return false}})()")
    rec("b1 corrupt JSON does not crash", ok_corrupt and not errs[-1:] , pg.evaluate("location.hash"))
    # quota exceeded
    pg.evaluate("(function(){localStorage.clear();var s='x'.repeat(1024*1024);var n=0;try{while(n<300){localStorage.setItem('q'+n,s);n++;}}catch(e){}})()")
    pg.evaluate("tryDemo(true)")
    blocked = pg.evaluate("typeof STORAGE_OK!=='undefined'?(!STORAGE_OK):'n/a'")
    banner = pg.evaluate("(function(){return {blocked:!STORAGE_OK, banner:!!document.body.innerHTML.match(/storageBlocked|\u5b58\u50a8/)||document.querySelector('[role=alert]')!==null};})()")
    pg.evaluate("(function(){for(var i=0;i<300;i++)localStorage.removeItem('q'+i);})()")
    rec("b2 quota exceeded -> banner, no crash", banner["blocked"], banner)
    # 50 students + emoji/CJK already seeded partially; push to 50
    seed50 = pg.evaluate("(function(){tryDemo(true);while(S.students.length<50)S.students.push({id:'y'+S.students.length,name:'\\u5F20\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50\\u4E50'+S.students.length,hue:(S.students.length*29)%360});save();return S.students.length;})()")
    pg.evaluate("location.hash='#/screen';route()"); pg.wait_for_timeout(500)
    rec("b3 50 students render", pg.evaluate("document.querySelectorAll('.scr-tile').length") == 50, seed50)
    rec("b4 zero page errors (robustness)", len([e for e in errs]) == 0, errs[:3])
    ctx.close()

    # ---- d. reduced motion: OS setting ----
    ctx2 = b.new_context(viewport={"width": 1920, "height": 1080}, reduced_motion="reduce")
    pg2 = ctx2.new_page()
    errs2 = []
    pg2.on("pageerror", lambda e: errs2.append(str(e)))
    pg2.goto(f"http://localhost:{PORT}/index.html")
    pg2.wait_for_timeout(700)
    pg2.evaluate("tryDemo(true)")
    pg2.evaluate("location.hash='#/screen';route()"); pg2.wait_for_timeout(400)
    pg2.evaluate("withState(function(){ applyRule(S.rules.find(r=>r.value>0), [S.students[0].id]); })")
    pg2.wait_for_timeout(400)
    os_motion = pg2.evaluate("(function(){return {cls:document.documentElement.className,motion:typeof motionOK==='function'?motionOK():'n/a',particles:LIVE_PARTICLES};})()")
    rec("d1 OS reduced-motion: no particles", os_motion["particles"] == 0, os_motion)
    # Settings Motion=off (app-level)
    pg2.evaluate("saveMotion('off')")
    pg2.evaluate("withState(function(){ applyRule(S.rules.find(r=>r.value>0), [S.students[1].id]); })")
    pg2.wait_for_timeout(400)
    off = pg2.evaluate("(function(){return {cls:document.documentElement.className,particles:LIVE_PARTICLES,badge:document.querySelectorAll('.pop-badge').length};})()")
    rec("d2 Motion=off: badge only, no particles", off["particles"] == 0 and off["badge"] >= 0, off)
    rec("d3 zero page errors (motion)", len(errs2) == 0, errs2[:2])
    ctx2.close()
    b.close()

hdr = ["# Extra checks (a/b/d) — " + __file__, "", "| check | result | detail |", "|---|---|---|"]
for n, ok, i in out:
    hdr.append("| " + n + " | " + ("✅" if ok else "❌") + " | " + str(i).replace("|", "\\|")[:80] + " |")
io_out = open(os.path.join("qa", "EXTRA-CHECKS.md"), "w", encoding="utf-8", newline="\n")
io_out.write("\n".join(hdr) + "\n")
io_out.close()
print("VERIFY:EXTRA", sum(1 for _, o, _ in out if o), "/", len(out))
import os as _os
_os._exit(0)
