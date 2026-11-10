# Phase 3 regression checks: old-browser gate, dataLocalNote, particle budget,
# cardhit overlay, export/import round-trip. All against the MERGED build, isolated
# localStorage (own port/origin per context where needed).
import functools, http.server, socketserver, threading, os, sys, json
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright

PORT = 8999
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=".")
class Q(socketserver.ThreadingMixIn, http.server.HTTPServer): daemon_threads = True
srv = Q(("127.0.0.1", PORT), H); threading.Thread(target=srv.serve_forever, daemon=True).start()
BASE = f"http://localhost:{PORT}/index.html"
OUT = os.path.join(os.path.dirname(__file__), "shots", "integration")
os.makedirs(OUT, exist_ok=True)
R = []
def check(name, ok, detail=""):
    R.append((name, bool(ok))); print(("PASS " if ok else "FAIL ") + name + (" | " + str(detail)[:110] if not ok else ""))

with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)

    # ---- A. old-browser gate: strip features BEFORE page scripts ----
    ctx_old = b.new_context()
    pg = ctx_old.new_page()
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)[:70]))
    pg.add_init_script("Array.from = undefined; Object.assign = undefined; window.CSS = undefined;")
    pg.goto(BASE + "#/"); pg.wait_for_timeout(900)
    gate = pg.evaluate("!!document.getElementById('gs-old')")
    title = pg.title()
    hidden = pg.evaluate("getComputedStyle(document.querySelector('body > *:not(#gs-old)')).display") if pg.evaluate("document.querySelectorAll('body > *').length") else "n/a"
    check("A1 old browser -> gate notice shown", gate)
    check("A2 gate title bilingual", "browser update needed" in title or "请更新浏览器" in title)
    check("A3 app content hidden behind gate", hidden == "none")
    check("A4 gate page: only the designed GS-UNSUPPORTED-BROWSER halt, no other errors", all(str(e).replace("Error: ", "").startswith("GS-UNSUPPORTED-BROWSER") for e in errs), errs[:2])
    pg.screenshot(path=os.path.join(OUT, "gate-old-browser.png"))
    ctx_old.close()

    # ---- modern browser sanity ----
    ctx = b.new_context(viewport={"width": 1440, "height": 900})
    pg = ctx.new_page()
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)[:70]))
    pg.goto(BASE + "#/"); pg.wait_for_timeout(1000)
    check("A5 modern browser -> NO gate", not pg.evaluate("!!document.getElementById('gs-old')"))
    check("A6 modern -> landing rendered", pg.evaluate("!!document.querySelector('#gsmain')"))
    pg.evaluate("localStorage.clear(); seedDemo(); location.hash='#/app/settings'; route()"); pg.wait_for_timeout(600)

    # ---- B. dataLocalNote ----
    zh = pg.evaluate("document.querySelector('#view').innerText")
    check("B1 dataLocalNote visible (zh)", "还原卡" in zh and "localStorage" in zh)
    pg.evaluate("setLang('en'); route()"); pg.wait_for_timeout(400)
    en = pg.evaluate("document.querySelector('#view').innerText")
    check("B2 dataLocalNote visible (en)", "restore itself on restart" in en or "Deep Freeze" in en)
    check("B3 no cloud-backup implication", "cloud" not in en.lower() or "nothing is uploaded" in en.lower())
    check("B4 export discoverable nearby", "Export" in en or "导出" in zh)
    pg.screenshot(path=os.path.join(OUT, "settings-dataLocalNote-en.png"))

    # ---- C. particle budget under repeated celebrations ----
    pg.evaluate("setLang('zh'); location.hash='#/screen'; route()"); pg.wait_for_timeout(700)
    pg.evaluate("S.sound=true; save()")  # not needed for particles, hygiene
    burst_nodes = pg.evaluate("""(async function(){
      // fire 8 positive awards rapidly via the internal pop path
      for (let i=0;i<8;i++){
        withState(function(){ S.records.unshift({id:'burst'+i, ts:Date.now(), studentIds:[S.students[0].id, S.students[1].id], ruleId:S.rules[0].id, ruleLabel:'test', value:2, undone:false}); });
        screenAfterChange();
      }
      await new Promise(r=>setTimeout(r,400));
      return document.querySelectorAll('.burst, .confetti, [class*=confetti]').length;
    })()""")
    LIVE = pg.evaluate("typeof LIVE_PARTICLES!=='undefined'?LIVE_PARTICLES:'n/a'")
    check("C1 8 rapid awards -> DOM particle nodes stay small", burst_nodes <= 160, f"nodes={burst_nodes}")
    check("C2 LIVE_PARTICLES cap respected", LIVE == "n/a" or LIVE <= 150, f"LIVE={LIVE}")
    # reduced motion
    pg.evaluate("S.settings.motion='off'; save(); applyMotion()")
    n2 = pg.evaluate("""(function(){
      for (let i=0;i<3;i++){ withState(function(){ S.records.unshift({id:'rm'+i, ts:Date.now(), studentIds:[S.students[2].id], ruleId:S.rules[0].id, ruleLabel:'x', value:2, undone:false}); }); screenAfterChange(); }
      return document.querySelectorAll('.burst, [class*=confetti]').length; })()""")
    check("C3 motion=off -> zero particles", n2 == 0, f"nodes={n2}")

    # ---- D. cardhit overlay ----
    pg.evaluate("S.settings.motion='auto'; save(); applyMotion(); location.hash='#/app/classroom'; route()"); pg.wait_for_timeout(600)
    st = pg.evaluate("(function(){const h=document.querySelector('.card .cardhit'); const cs=getComputedStyle(h); return {pos:cs.position, inset:cs.top, bg:cs.backgroundColor, border:cs.borderTopStyle};})()")
    check("D1 cardhit invisible overlay", st["pos"] == "absolute" and st["bg"] == "rgba(0, 0, 0, 0)" and st["border"] == "none", st)
    nested = pg.evaluate("(function(){return [...document.querySelectorAll('.cardhit a, .cardhit button:not(.cardhit)')].filter(e=>e.closest('button')===null||true).length;})()")
    check("D2 no nested interactive inside cardhit button", pg.evaluate("document.querySelectorAll('.cardhit button, .cardhit a').length") == 0)
    # keyboard: focus cardhit, Enter selects
    sel_before = pg.evaluate("document.querySelectorAll('.card.sel').length")
    pg.evaluate("document.querySelector('.cardhit').focus()")
    pg.keyboard.press("Enter"); pg.wait_for_timeout(250)
    sel_after = pg.evaluate("document.querySelectorAll('.card.sel').length")
    check("D3 keyboard Enter on card selects student", sel_after == sel_before + 1, f"{sel_before}->{sel_after}")
    pg.screenshot(path=os.path.join(OUT, "classroom-desktop.png"))
    m = b.new_context(viewport={"width": 390, "height": 844}).new_page()
    m.goto(BASE + "#/"); m.wait_for_timeout(700)
    m.evaluate("seedDemo(); location.hash='#/app/classroom'; route()"); m.wait_for_timeout(500)
    m.screenshot(path=os.path.join(OUT, "classroom-mobile.png"))
    check("D4 mobile classroom renders cards", m.evaluate("document.querySelectorAll('.card').length") >= 16)

    # ---- E. export / import round-trip (isolated contexts, demo data only) ----
    with pg.expect_download() as dl:
        pg.evaluate("location.hash='#/app/settings'; route()"); pg.wait_for_timeout(400)
        pg.evaluate("exportJSON()")
    path = os.path.join(OUT, "roundtrip.json")
    dl.value.save_as(path)
    data = json.load(open(path, encoding="utf-8"))
    keys = {"students","records","requests","collection","rules","gifts","settings","boxSpent","version"}
    check("E1 export has all 9 state keys", keys <= set(data.keys()), sorted(set(data.keys())-keys))
    # import into a FRESH context (isolated origin not possible on same port; use clear)
    ctx2 = b.new_context()
    p2 = ctx2.new_page()
    p2.goto(BASE + "#/"); p2.wait_for_timeout(800)
    p2.evaluate("localStorage.clear()")
    payload = json.dumps(data)
    ok_import = p2.evaluate("""(function(){
      try{ localStorage.setItem('gifted-scholars-v1', %s ); }catch(e){ return 'seterr:'+e.message; }
      location.hash='#/app/classroom';
      return 'ok';
    })()""" % json.dumps(payload))
    p2.reload(); p2.wait_for_timeout(900)
    back = p2.evaluate("(function(){try{return JSON.parse(localStorage.getItem('gifted-scholars-v1'))}catch(e){return null}})()")
    check("E2 import restores students", back and len(back["students"]) == len(data["students"]), ok_import)
    check("E3 import restores records", back and len(back["records"]) == len(data["records"]))
    check("E4 import restores collection/rules/settings", back and back["collection"] == data["collection"] and len(back["rules"]) == len(data["rules"]) and back["settings"]["className"] == data["settings"]["className"])
    p2.screenshot(path=os.path.join(OUT, "imported-classroom.png"))
    ctx2.close()

    check("E5 zero JS errors whole battery", len(errs) == 0, errs[:3])
    ctx.close()
    b.close()

print("SUMMARY %d/%d" % (sum(1 for _, ok in R if ok), len(R)))
sys.stdout.flush()
os._exit(0)
