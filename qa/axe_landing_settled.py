import functools, http.server, socketserver, threading, os, sys, json
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
AXE = r"C:\Users\Mohammed Shehzad\AppData\Roaming\npm\node_modules\axe-core\axe.min.js"
H=functools.partial(http.server.SimpleHTTPRequestHandler,directory=".")
class Q(socketserver.ThreadingMixIn,http.server.HTTPServer):daemon_threads=True
srv=Q(("127.0.0.1",8988),H);threading.Thread(target=srv.serve_forever,daemon=True).start()
with sync_playwright() as p:
    b=p.chromium.launch(channel="msedge",headless=True)
    pg=b.new_page(viewport={"width":1440,"height":900})
    pg.goto("http://localhost:8988/index.html#/");pg.wait_for_timeout(1000)
    h=pg.evaluate("document.body.scrollHeight");y=0
    while y<h:
        pg.evaluate(f"window.scrollTo(0,{y})");pg.wait_for_timeout(120);y+=500
    pg.evaluate("window.scrollTo(0,0)");pg.wait_for_timeout(500)
    pg.add_script_tag(path=AXE)
    res=pg.evaluate("axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}).then(r=>r.violations.map(v=>({id:v.id,impact:v.impact,n:v.nodes.length,s:v.nodes[0].target[0]})))")
    print("AXE-SETTLED:",json.dumps(res,ensure_ascii=False)[:400] if res else "CLEAN")
    det=pg.evaluate("axe.run(document,{runOnly:{type:'rule',values:['color-contrast']}}).then(r=>r.violations[0]?r.violations[0].nodes.map(n=>({sel:n.target[0],html:n.html.slice(0,90)})):[])")
    for it in det[:16]: print("CC:",it["sel"][:80],"::",it["html"].replace(chr(10)," ")[:70])
    b.close()
sys.stdout.flush()
os._exit(0)
