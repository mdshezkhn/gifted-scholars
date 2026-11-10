import functools, http.server, socketserver, threading, os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
H=functools.partial(http.server.SimpleHTTPRequestHandler,directory=".")
class Q(socketserver.ThreadingMixIn,http.server.HTTPServer):daemon_threads=True
srv=Q(("127.0.0.1",8992),H);threading.Thread(target=srv.serve_forever,daemon=True).start()
with sync_playwright() as p:
    b=p.chromium.launch(channel="msedge",headless=True)
    pg=b.new_page(viewport={"width":1440,"height":900})
    pg.goto("http://localhost:8992/index.html#/");pg.wait_for_timeout(1200)
    r=pg.evaluate("""(function(){
      function lum(c){const m=c.match(/[\d.]+/g).map(Number);const f=m.slice(0,3).map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return 0.2126*f[0]+0.7152*f[1]+0.0722*f[2];}
      function ratio(a,b_){const l1=Math.max(lum(a),lum(b_)),l2=Math.min(lum(a),lum(b_));return Math.round(((l1+0.05)/(l2+0.05))*100)/100;}
      function bg(el){let e=el;while(e){const c=getComputedStyle(e).backgroundColor;if(c&&c!=='rgba(0, 0, 0, 0)'&&c!=='transparent')return c;e=e.parentElement;}return 'rgb(231,227,218)';}
      const out=[];
      const probe=(sel,label)=>{const el=document.querySelector(sel);if(!el){out.push([sel,'MISSING']);return;}const cs=getComputedStyle(el);out.push([label,cs.color+' on '+bg(el)+' fs='+cs.fontSize]);};
      probe('a.gsbtn.pig','pig-btn');probe('.gshero .corner-cap','corner-cap');probe('.stage .readouts span.k','readout-k');
      document.querySelectorAll('a.gsbtn').forEach((el,i)=>{const cs=getComputedStyle(el);out.push(['gsbtn#'+i+'='+el.textContent.trim().slice(0,6),cs.color+' on '+bg(el)]);});
      const lb=document.querySelector('.sqbtn');out.push(['langBtn-arialabel',lb?lb.getAttribute('aria-label'):'?']);
      return out;
    })()""")
    for row in r: print("COL",row)
    b.close()
sys.stdout.flush()
os._exit(0)
