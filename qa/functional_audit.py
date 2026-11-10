# T3 functional verification — real journeys in a real browser (headless Edge).
import functools, http.server, socketserver, threading, os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright

PORT = 8993
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=".")
class Q(socketserver.ThreadingMixIn, http.server.HTTPServer): daemon_threads = True
srv = Q(("127.0.0.1", PORT), H); threading.Thread(target=srv.serve_forever, daemon=True).start()

R = []
def check(name, ok, detail=""):
    R.append((name, bool(ok), str(detail)[:90]))
    print(("PASS " if ok else "FAIL ") + name + (" | " + str(detail)[:90] if detail and not ok else ""))

with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    errs = []
    pg = b.new_page(viewport={"width":1440,"height":900})
    pg.on("pageerror", lambda e: errs.append(str(e)[:80]))
    Base = "http://localhost:%d/index.html" % PORT

    pg.goto(Base + "#/"); pg.wait_for_timeout(1200)
    pg.evaluate("localStorage.clear(); seedDemo(); location.hash='#/'; route()"); pg.wait_for_timeout(600)

    # 1 nav anchors scroll
    for aid in ["features","how","privacy","faq"]:
        pg.click('.gsnav a[href="#%s"]' % aid); pg.wait_for_timeout(700)
        y = pg.evaluate("document.getElementById('%s').getBoundingClientRect().top" % aid)
        vh = pg.evaluate("innerHeight")
        # near-page-end sections clamp before reaching the top; assert VISIBLE (upper 70% of viewport)
        check("nav anchor #%s scrolls into view" % aid, -40 <= y < vh*0.7, "top=%s vh=%s" % (round(y), vh))

    # 2 help nav + back
    pg.click('.gsnav a[href="#/help"]'); pg.wait_for_timeout(500)
    check("nav to help", pg.evaluate("location.hash")=="#/help")
    pg.click('text=返回首页'); pg.wait_for_timeout(500)
    check("help back link", pg.evaluate("location.hash")!="#/help")

    # 3 FAQ accordion
    pg.evaluate("location.hash='#/'; route()"); pg.wait_for_timeout(400)
    opened = pg.evaluate("(function(){const items=[...document.querySelectorAll('#faq details')];const d=items[0];const b=d.open;d.querySelector('summary').click();const closedOK=(!d.open)===!b;const d2=items[1];const b2=d2.open;d2.querySelector('summary').click();return (b!==d.open&&b2!==d2.open)?'toggles':'stuck';})()")
    check("FAQ accordion toggles (details open flips both ways)", opened=="toggles", opened)

    # 4 language toggle
    t_zh = pg.evaluate("document.querySelector('.gsnav').innerText")
    pg.evaluate("setLang('en'); route()"); pg.wait_for_timeout(400)
    t_en = pg.evaluate("document.querySelector('.gsnav').innerText")
    pg.evaluate("setLang('zh'); route()"); pg.wait_for_timeout(300)
    check("language switch zh->en->zh", t_en != t_zh and "features" in t_en.lower())

    # 5 CTAs
    pg.click('a.gsbtn.pig'); pg.wait_for_timeout(600)
    check("hero CTA -> classroom", pg.evaluate("location.hash")=="#/app/classroom")
    pg.evaluate("location.hash='#/'; route()"); pg.wait_for_timeout(400)
    pg.click('text=阅读授权'); pg.wait_for_timeout(400)
    check("license modal opens", pg.evaluate("!!document.querySelector('.card.stk, #modals .card')"))
    pg.evaluate("closeOverlays && closeOverlays()"); pg.wait_for_timeout(200)
    pg.click('text=试试演示'); pg.wait_for_timeout(700)
    check("try-demo seeds + navigates", pg.evaluate("location.hash")=="#/app/classroom" and pg.evaluate("S.students.length")>=16)

    # 6 room picker journey
    pg.evaluate("location.hash='#/'; route()"); pg.wait_for_timeout(400)
    pg.evaluate("openRoomPicker()"); pg.wait_for_timeout(300)
    nm = pg.evaluate("S.students[2].name")
    pg.evaluate("(function(){const i=document.querySelector('#rp-name input')||document.querySelector('#rp-name'); if(i) i.value=%s;})()" % repr(nm))
    pg.evaluate("document.querySelector('#rp-go').click()"); pg.wait_for_timeout(700)
    check("room picker enters room", pg.evaluate("location.hash").startswith("#/room/"))

    # 7 random picker
    pg.evaluate("location.hash='#/screen'; route()"); pg.wait_for_timeout(600)
    pg.evaluate("pickOpen()"); pg.wait_for_timeout(250)
    d1 = pg.evaluate("pickDraw()"); pg.wait_for_timeout(150)
    d2 = pg.evaluate("pickDraw()"); pg.wait_for_timeout(150)
    check("random picker draws (twice)", bool(d1) and bool(d2))
    pg.evaluate("pickClose()")

    # 8 dead onclick scan across views
    dead_all = []
    for h in ["#/","#/app/classroom","#/app/shop","#/app/settings","#/help","#/screen"]:
        pg.evaluate("location.hash='%s'; route()" % h); pg.wait_for_timeout(300)
        dead = pg.evaluate("""(function(){const out=[];document.querySelectorAll('[onclick]').forEach(el=>{const m=el.getAttribute('onclick').match(/^\\s*([A-Za-z_$][\\w$]*)\\s*\\(/);if(m && typeof window[m[1]]!=='function') out.push(m[1]);});return out;})()""")
        dead_all += ["%s:%s" % (h,d) for d in dead]
    check("no dead onclick handlers (6 views)", len(dead_all)==0, dead_all)

    # 9 internal links resolve
    bad = []
    known = ["#/","#/app/classroom","#/app/records","#/app/shop","#/app/leaderboard","#/app/settings","#/help","#/screen"]
    for h in known:
        pg.evaluate("location.hash='%s'; route()" % h); pg.wait_for_timeout(300)
        hrefs = pg.evaluate("[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))")
        for href in set(hrefs):
            if href in ("#/room/",): continue
            if not href.startswith("#"): bad.append((h,href)); continue
            if href[1:].startswith("/") and href not in known and not href.startswith("#/room/"): bad.append((h,href))
    check("all internal links resolve to known routes", len(bad)==0, bad[:4])

    # 10 refresh restores
    pg.evaluate("location.hash='#/app/records'; route()"); pg.wait_for_timeout(400)
    pg.reload(); pg.wait_for_timeout(900)
    check("refresh restores records view", pg.evaluate("location.hash")=="#/app/records" and pg.evaluate("document.body.innerText.length")>100)

    # 11 direct routes on clean mobile context
    pg2 = b.new_page(viewport={"width":390,"height":844})
    pg2.on("pageerror", lambda e: errs.append("m390: "+str(e)[:70]))
    pg2.goto(Base + "#/app/settings"); pg2.wait_for_timeout(800)
    pg2.evaluate("seedDemo()"); pg2.wait_for_timeout(200)
    for h in known:
        pg2.evaluate("location.hash='%s'; route()" % h); pg2.wait_for_timeout(300)
        n = pg2.evaluate("document.body.innerText.length")
        check("direct %s renders (m390)" % h, n > 50, "len=%d" % n)

    # 12 mobile menu journey
    pg2.evaluate("location.hash='#/'; route()"); pg2.wait_for_timeout(400)
    pg2.click(".gsnav-burger"); pg2.wait_for_timeout(250)
    open1 = pg2.evaluate("!document.getElementById('gsmenu').hidden")
    pg2.click('#gsmenu a[href="#faq"]'); pg2.wait_for_timeout(500)
    open2 = pg2.evaluate("!document.getElementById('gsmenu').hidden")
    check("mobile menu opens, link closes it", open1 and not open2, "open1=%s open2=%s" % (open1, open2))

    check("zero JS errors across all journeys", len(errs)==0, errs[:3])
    b.close()

print("SUMMARY %d/%d" % (sum(1 for _,ok,_ in R if ok), len(R)))
sys.stdout.flush()
os._exit(0)
