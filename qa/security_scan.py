# T6 security & privacy — static bundle scan + live XSS probes (local data only, nothing sent anywhere)
import functools, http.server, socketserver, threading, os, sys, re, json
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright

os.chdir(os.path.join(os.path.dirname(__file__), ".."))
bundle = open("index.html", encoding="utf-8").read()

# ---- static scan ----
ext = re.findall(r'(?:src|href)="(https?://[^"]+)"', bundle)
print("EXTERNAL-URLS:", sorted(set(ext)) if ext else "none (fully self-contained)")
for pat, label in [(r'(?i)(api[_-]?key|apikey|secret|password|token)\s*[:=]\s*["\'][^"\']{8,}', "possible-secret"),
                   (r'(?i)fetch\s*\(\s*["\']https?://', "remote-fetch"),
                   (r'(?i)<script[^>]+src=', "external-script"),
                   (r'(?i)XMLHttpRequest', "xhr"),
                   (r'(?i)\beval\s*\(', "eval-use"),
                   (r'(?i)innerHTML\s*=\s*[^`]*(?!esc)\w+\+', "risky-innerhtml")]:
    hits = re.findall(pat, bundle)
    print(("HIT " if hits else "OK  ") + label + (": %d" % len(hits) if hits else ""))
print("ENV-FILES:", "present!" if os.path.exists(".env") or os.path.exists(".env.local") else "none")
print("CNAME:", open("CNAME", encoding="utf-8").read().strip() if os.path.exists("CNAME") else "none")

# ---- live probes ----
PORT = 8987
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=".")
class Q(socketserver.ThreadingMixIn, http.server.HTTPServer): daemon_threads = True
srv = Q(("127.0.0.1", PORT), H); threading.Thread(target=srv.serve_forever, daemon=True).start()
with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    pg = b.new_page(viewport={"width":1440,"height":900})
    reqs = []
    pg.on("request", lambda r: reqs.append(r.url) if not r.url.startswith("http://localhost") else None)
    pg.goto("http://localhost:%d/index.html#/" % PORT); pg.wait_for_timeout(1100)
    # XSS probe 1: hostile student name through every render path
    pg.evaluate("""(function(){
      localStorage.clear(); seedDemo();
      S.students[0].name = '<img src=x onerror=window.__xss=1>';
      S.records.unshift({id:'xss1',ts:Date.now(),studentIds:[S.students[0].id],ruleId:S.rules[0].id,ruleLabel:'<script>window.__xss=2</script>',value:1,undone:false});
      S.settings.className = '<svg onload=window.__xss=3>';
      save();
    })()""")
    for h in ["#/","#/app/classroom","#/app/records","#/app/leaderboard","#/app/settings","#/screen","#/room/"]:
        pg.evaluate("location.hash=%s; route()" % repr(h if h!="#" else "#/"))
        pg.wait_for_timeout(250)
        if h == "#/room/":
            sid = pg.evaluate("S.students[0].id")
            pg.evaluate("location.hash='#/room/'+%s; route()" % repr(sid)); pg.wait_for_timeout(300)
    xss = pg.evaluate("window.__xss || 0")
    print("XSS-EXECUTION:", "FAILED-ESCAPED-OK" if xss == 0 else ("EXECUTED!! code=%s" % xss))
    esc_visible = pg.evaluate("document.body.innerHTML.includes('<img src=x onerror')")
    print("RAW-HTML-IN-DOM:", "yes-leak" if esc_visible else "no (escaped)")
    # XSS probe 2: room-picker input (user-typed name → localStorage → room render)
    pg.evaluate("location.hash='#/'; route()"); pg.wait_for_timeout(300)
    pg.evaluate("openRoomPicker()"); pg.wait_for_timeout(250)
    pg.evaluate("(function(){const i=document.querySelector('#rp-name input')||document.querySelector('#rp-name'); i.value='<b onmouseover=window.__xss=4>X</b>';})()")
    pg.evaluate("document.querySelector('#rp-go').click()"); pg.wait_for_timeout(500)
    xss2 = pg.evaluate("window.__xss || 0")
    print("PICKER-XSS:", "FAILED-ESCAPED-OK" if xss2 == 0 else ("EXECUTED!! code=%s" % xss2))
    # external requests during a full walkthrough
    pg.evaluate("localStorage.clear(); seedDemo(); location.hash='#/app/classroom'; route()"); pg.wait_for_timeout(400)
    for h in ["#/","#/help","#/screen","#/app/shop","#/app/settings","#/app/leaderboard","#/app/records"]:
        pg.evaluate("location.hash='%s'; route()" % h); pg.wait_for_timeout(250)
    print("EXTERNAL-REQUESTS:", sorted(set(r for r in reqs)) if reqs else "none")
    # external links have rel noopener?
    targets = pg.evaluate("[...document.querySelectorAll('a[target=_blank]')].map(a=>a.getAttribute('rel'))")
    print("BLANK-TARGET-RELS:", targets if targets else "no _blank links")
    # storage keys
    keys = pg.evaluate("Object.keys(localStorage)")
    print("LOCALSTORAGE-KEYS:", keys)
    b.close()
sys.stdout.flush()
os._exit(0)
