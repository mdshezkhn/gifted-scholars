import functools, http.server, socketserver, threading, os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
H=functools.partial(http.server.SimpleHTTPRequestHandler,directory=".")
class Q(socketserver.ThreadingMixIn,http.server.HTTPServer):daemon_threads=True
srv=Q(("127.0.0.1",8997),H);threading.Thread(target=srv.serve_forever,daemon=True).start()
with sync_playwright() as p:
    b=p.chromium.launch(channel="msedge",headless=True)
    pg=b.new_page(viewport={"width":390,"height":844})
    pg.goto("http://localhost:8997/index.html#/");pg.wait_for_timeout(900)
    pg.evaluate("localStorage.clear();seedDemo();location.hash='#/screen';route()");pg.wait_for_timeout(900)
    m=pg.evaluate("""(function(){
      const g=document.querySelector('.scr-grid');
      const t=g.querySelectorAll('.scr-tile')[1];
      const out={};
      out.before=Math.round(t.getBoundingClientRect().height);
      const cs=getComputedStyle(g);
      out.alignContent=cs.alignContent; out.gridH=Math.round(g.getBoundingClientRect().height);
      out.disp=cs.display;
      out.tileAlignSelf=getComputedStyle(t).alignSelf;
      g.style.gridAutoRows='min-content';
      out.afterAutoRowsMinContent=Math.round(t.getBoundingClientRect().height);
      g.style.gridAutoRows='';
      t.style.minHeight='110px';
      out.afterMinHeight110=Math.round(t.getBoundingClientRect().height);
      t.style.minHeight='';
      return out;
    })()""")
    print("PROBE:", m)
    b.close()
sys.stdout.flush()
os._exit(0)
