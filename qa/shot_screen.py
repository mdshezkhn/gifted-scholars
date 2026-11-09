# Big Screen (#/screen) zh screenshot — demo data + enabled goal.
import functools, http.server, socketserver, threading, os
from playwright.sync_api import sync_playwright

PORT = 8951
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=".")
class Q(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
srv = Q(("127.0.0.1", PORT), H)
threading.Thread(target=srv.serve_forever, daemon=True).start()

with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    pg = b.new_page(viewport={"width": 1600, "height": 900})
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(f"http://localhost:{PORT}/index.html#/app/settings")
    pg.wait_for_timeout(1200)
    pg.evaluate("localStorage.clear()")
    pg.reload()
    pg.wait_for_timeout(1200)
    pg.evaluate("seedDemo();S.settings.goal={enabled:true,target:60,label:'周五奖励'};"
                "S.records=[];['s1','s2','s3','s4'].forEach((id,i)=>{"
                "for(let k=0;k<3+i;k++)S.records.unshift({id:'x'+id+k,"
                "ts:weekStart(Date.now(),0)+36e5*(k+1),studentIds:[id],"
                "ruleId:S.rules[0].id,ruleLabel:'举手',value:2,undone:false})});save()")
    pg.goto(f"http://localhost:{PORT}/index.html#/screen")
    pg.wait_for_timeout(1500)
    pg.screenshot(path="qa/shots/5-bigscreen-zh.png")
    print("errors:", len(errs))
    b.close()
srv.server_close()
print("done")
