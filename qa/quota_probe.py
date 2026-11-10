import functools, http.server, socketserver, threading, os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
H=functools.partial(http.server.SimpleHTTPRequestHandler,directory=".")
class Q(socketserver.ThreadingMixIn, http.server.HTTPServer):daemon_threads=True
srv=Q(("127.0.0.1",8961),H);threading.Thread(target=srv.serve_forever,daemon=True).start()
with sync_playwright() as p:
    b=p.chromium.launch(channel="msedge",headless=True);pg=b.new_page()
    pg.goto("http://localhost:8961/index.html");pg.wait_for_timeout(800)
    r=pg.evaluate("""(function(){
      localStorage.clear();tryDemo(true);
      var orig=localStorage.setItem.bind(localStorage);
      localStorage.setItem=function(k,v){if(k===LS_KEY)throw new DOMException('full','QuotaExceededError');orig(k,v);};
      withState(function(){ applyRule(S.rules.find(r=>r.value>0),[S.students[0].id]); });
      route();
      var blocked=!STORAGE_OK;
      var bannerShown=document.querySelector('#view').innerHTML.indexOf('存储')>=0;
      localStorage.setItem=orig;save();
      return {blocked:blocked,bannerShown:bannerShown,recovered:STORAGE_OK===true};
    })()""")
    print("RESULT",r);sys.stdout.flush();b.close()
os._exit(0)
