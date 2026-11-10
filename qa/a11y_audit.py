# T5 a11y — axe-core on 4 views + manual keyboard/focus/hierarchy checks
import functools, http.server, socketserver, threading, os, sys, json
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright

PORT = 8989
AXE = r"C:\Users\Mohammed Shehzad\AppData\Roaming\npm\node_modules\axe-core\axe.min.js"
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=".")
class Q(socketserver.ThreadingMixIn, http.server.HTTPServer): daemon_threads = True
srv = Q(("127.0.0.1", PORT), H); threading.Thread(target=srv.serve_forever, daemon=True).start()

with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    ctx = b.new_context(reduced_motion="reduce")   # reduced-motion ON for the whole pass
    pg = ctx.new_page()
    errs = []; pg.on("pageerror", lambda e: errs.append(str(e)[:80]))
    Base = "http://localhost:%d/index.html" % PORT
    pg.goto(Base + "#/"); pg.wait_for_timeout(1100)
    pg.evaluate("localStorage.clear(); seedDemo(); location.hash='#/'; route()"); pg.wait_for_timeout(400)

    for view in ["#", "#/help", "#/screen", "#/app/classroom"]:
        pg.evaluate("location.hash='%s'; route()" % view); pg.wait_for_timeout(600)
        pg.add_script_tag(path=AXE)
        res = pg.evaluate("""axe.run(document, {runOnly:{type:'tag', values:['wcag2a','wcag2aa','wcag21aa']}}).then(r=>({
            violations: r.violations.map(v=>({id:v.id, impact:v.impact, n:v.nodes.length, what:v.help, s:v.nodes[0].target[0]}))
        }))""")
        print("AXE", view, "->", json.dumps(res["violations"], ensure_ascii=False)[:600] if res["violations"] else "CLEAN")

    # ---- manual checks ----
    pg.evaluate("location.hash='#/'; route()"); pg.wait_for_timeout(500)
    # heading hierarchy per view
    for view in ["#", "#/help", "#/screen", "#/app/classroom"]:
        pg.evaluate("location.hash='%s'; route()" % view); pg.wait_for_timeout(350)
        hs = pg.evaluate("[...document.querySelectorAll('h1,h2,h3,h4')].map(h=>h.tagName).join(',')")
        print("HEADINGS", view, hs[:70])
    # skip link is first tabbable
    pg.evaluate("location.hash='#/'; route()"); pg.wait_for_timeout(400)
    first = pg.evaluate("""(function(){const el=document.activeElement;document.body.focus();return 'n/a';})()""")
    pg.keyboard.press("Tab")
    skip = pg.evaluate("document.activeElement.className + '|' + document.activeElement.textContent.trim().slice(0,20)")
    print("FIRST-TAB", skip)
    # focus visibility: outline width on focused nav link
    pg.keyboard.press("Tab"); pg.keyboard.press("Tab")
    vis = pg.evaluate("(function(){const el=document.activeElement;const cs=getComputedStyle(el);return (cs.outlineWidth+' '+cs.outlineStyle)+' @ '+el.tagName;})()")
    print("FOCUS-VISIBLE", vis)
    # keyboard: Esc closes mobile menu
    pg.set_viewport_size({"width":390,"height":844})
    pg.evaluate("toggleMenu()"); pg.wait_for_timeout(150)
    opened = pg.evaluate("!document.getElementById('gsmenu').hidden")
    pg.keyboard.press("Escape"); pg.wait_for_timeout(150)
    closed = pg.evaluate("document.getElementById('gsmenu').hidden")
    print("MENU-ESC", "opens+esc-closes" if (opened and closed) else "FAIL %s/%s" % (opened, closed))
    # room picker modal: input labelled?
    pg.set_viewport_size({"width":1440,"height":900})
    pg.evaluate("location.hash='#/'; route()"); pg.wait_for_timeout(300)
    pg.evaluate("openRoomPicker()"); pg.wait_for_timeout(300)
    lab = pg.evaluate("(function(){const i=document.querySelector('#modals input, .card input');if(!i)return 'no-input';const lb=i.labels&&i.labels[0];return (lb?lb.textContent.trim().slice(0,20):'NO-LABEL')+' aria='+JSON.stringify(i.getAttribute('aria-label'));})()")
    print("PICKER-INPUT-LABEL", lab)
    # svg alt coverage: every svg has aria-hidden or title
    svgbad = pg.evaluate("[...document.querySelectorAll('svg')].filter(s=>!s.getAttribute('aria-hidden')&&!s.querySelector('title')).length")
    print("SVG-MISSING-A11Y", svgbad)
    # reduced motion: no particles (context has reduced_motion=reduce)
    pg.evaluate("location.hash='#/screen'; route()"); pg.wait_for_timeout(500)
    pg.evaluate("withState(function(){applyRule(S.rules.find(r=>r.value>0),[S.students[0].id]);}); screenAfterChange && screenAfterChange()")
    pg.wait_for_timeout(200)
    parts = pg.evaluate("document.querySelectorAll('.scr-confetti').length")
    anims = pg.evaluate("(function(){let n=0;document.querySelectorAll('.scr-tile').forEach(t=>{if(getComputedStyle(t).animationName!=='none')n++;});return n;})()")
    print("REDUCED-MOTION particles:", parts, "tiles-animating:", anims)
    print("PAGE-ERRORS", len(errs))
    b.close()
sys.stdout.flush()
os._exit(0)
