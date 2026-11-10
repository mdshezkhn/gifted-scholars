# Extra check c — WCAG contrast for every text/bg pair in the NEW palette
# (.app-ui + #/screen), measured from the real rendered DOM.
import functools, http.server, socketserver, threading, os, sys, json
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright

PORT = 8963
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=".")
class Q(socketserver.ThreadingMixIn, http.server.HTTPServer): daemon_threads = True
srv = Q(("127.0.0.1", PORT), H)
threading.Thread(target=srv.serve_forever, daemon=True).start()

JS = """(function(){
  function lum(c){ // c = [r,g,b]
    var f=function(v){v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);};
    return 0.2126*f(c[0])+0.7152*f(c[1])+0.0722*f(c[2]);
  }
  function parse(s){
    var m=s.match(/rgba?\\(([^)]+)\\)/);if(!m)return null;
    var p=m[1].split(',').map(Number);if(p.length<3)return null;
    return {c:[p[0],p[1],p[2]],a:p.length>3?p[3]:1};
  }
  function bgOf(el){
    var e=el,pending=1,acc=[0,0,0];
    while(e&&e!==document.documentElement){
      var b=parse(getComputedStyle(e).backgroundColor);
      if(b&&b.a>0){
        if(b.a>=1)return [b.c,true];
        for(var i=0;i<3;i++)acc[i]=acc[i]+b.c[i]*b.a*pending;pending*=(1-b.a);
        if(pending<0.05)return [[Math.round(acc[0]),Math.round(acc[1]),Math.round(acc[2])],true];
      }
      e=e.parentElement;
    }
    var root=parse(getComputedStyle(document.body).backgroundColor);
    if(root&&root.a>0)return [root.c,true];
    return [[255,255,255],true]; // page default
  }
  var out=[];
  document.querySelectorAll('.app-ui *, .screen-root *, .app-ui, .screen-root').forEach(function(el){
    var cs=getComputedStyle(el);var t=(cs.color||'');
    var fg=parse(t);if(!fg)return;
    var txt=(el.innerText||'').trim();if(!txt)return;
    var bg=bgOf(el);if(!bg)return;
    var fs=parseFloat(cs.fontSize)||16, fw=parseInt(cs.fontWeight)||400;
    var large=fs>=24||(fs>=18.66&&fw>=700);
    var l1=lum(fg.c),l2=lum(bg[0]);
    var ratio=(Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05);
    out.push({s:txt.slice(0,24),fg:'rgb('+fg.c.join(',')+')',bg:'rgb('+bg[0].join(',')+')',
              fs:Math.round(fs),fw:fw,large:large,ratio:Math.round(ratio*100)/100});
  });
  return out;
})()"""

def ratio_needed(large): return 3.0 if large else 4.5

with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    pg = b.new_page(viewport={"width": 1920, "height": 1080})
    pg.goto(f"http://localhost:{PORT}/index.html")
    pg.wait_for_timeout(700)
    pg.evaluate("localStorage.clear();tryDemo(true);")
    rows = {}
    for view in ["#/screen", "#/app/classroom", "#/app/settings", "#/app/shop", "#/app/leaderboard"]:
        pg.evaluate(f"location.hash='{view}';route()"); pg.wait_for_timeout(250)
        for r in pg.evaluate(JS):
            key = (r["fg"], r["bg"], r["large"])
            if key not in rows or r["ratio"] < rows[key]["ratio"]:
                r2 = dict(r); r2["view"] = view
                rows[key] = r2
    b.close()

bad = [r for r in rows.values() if r["ratio"] < ratio_needed(r["large"])]
lines = ["# WCAG contrast — new palette (.app-ui + #/screen), measured in DOM", "",
         f"unique fg/bg pairs measured: {len(rows)}; below threshold: {len(bad)}", "",
         "| text | fg | bg | size | large? | ratio | need | views |", "|---|---|---|---|---|---|---|---|"]
for r in sorted(rows.values(), key=lambda x: x["ratio"]):
    need = ratio_needed(r["large"])
    flag = " ❌" if r["ratio"] < need else ""
    lines.append(f"| {r['s'][:22]} | {r['fg']} | {r['bg']} | {r['fs']}px/{r['fw']} | {'Y' if r['large'] else 'n'} | {r['ratio']}:1{flag} | {need}:1 | {r['view']} |")
open(os.path.join("qa", "CONTRAST.md"), "w", encoding="utf-8", newline="\n").write("\n".join(lines) + "\n")
print(f"PAIRS {len(rows)} BELOW {len(bad)}")
for r in bad[:12]:
    print(f"  BELOW {r['ratio']}:1 (need {ratio_needed(r['large'])}) — {r['s'][:22]!r} fg {r['fg']} bg {r['bg']} {r['fs']}px @{r['view']}")
sys.stdout.flush(); os._exit(0)
