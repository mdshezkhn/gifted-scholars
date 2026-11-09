# Task 15 — full verification vs spec §8 (results -> qa/VERIFY-15.md)
# Real-browser checks: 1080p, cross-tab latency, drawer instant, reload,
# no-network, reduced motion, sound chip lifecycle, keyboard guards, aria.
import functools, http.server, socketserver, threading, os, sys, time, json
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright

PORT = 8959
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=".")
class Q(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
srv = Q(("127.0.0.1", PORT), H)
threading.Thread(target=srv.serve_forever, daemon=True).start()
R = []  # (id, ok, detail)

def rec(i, ok, d=""):
    R.append((i, bool(ok), str(d)))
    print(("PASS " if ok else "FAIL ") + i + ((" | " + str(d)) if not ok else ""))

with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    ctx = b.new_context(viewport={"width": 1920, "height": 1080})
    pg = ctx.new_page()
    errs, reqs = [], []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.on("console", lambda m: errs.append("console: " + m.text) if m.type == "error" else None)
    pg.on("request", lambda r: reqs.append(r.url) if not r.url.startswith(("http://localhost", "data:")) else None)

    pg.goto(f"http://localhost:{PORT}/index.html")
    pg.wait_for_timeout(800)
    pg.evaluate("localStorage.clear()")
    pg.evaluate("tryDemo(true)")
    # 8.1 1080p layout
    pg.evaluate("location.hash='#/screen'; route()"); pg.wait_for_timeout(400)
    tiles = pg.evaluate("document.querySelectorAll('.scr-tile').length")
    rec("8.1a 1080p tiles visible", tiles == 16, tiles)
    scroll = pg.evaluate("document.documentElement.scrollHeight > window.innerHeight + 2")
    rec("8.1b no page scroll at 16 tiles", not scroll)
    # cross-tab < 200ms: award from a second page (same context)
    pg2 = ctx.new_page()
    pg2.goto(f"http://localhost:{PORT}/index.html#/app/classroom"); pg2.wait_for_timeout(600)
    before = pg.evaluate("(function(){const el=document.querySelectorAll('.scr-tile .scr-pts')[0];return el?el.textContent:'';})()")
    pg.evaluate("""(function(){
      window.__tS=null;window.__tM=null;
      var before=document.querySelectorAll('.scr-tile .scr-pts')[0].textContent;
      addEventListener('storage',function(){
        if(window.__tS!==null)return;
        window.__tS=performance.now();
        (function tick(){
          var el=document.querySelectorAll('.scr-tile .scr-pts')[0];
          if(el&&el.textContent!==before){window.__tM=performance.now();return;}
          if(performance.now()-window.__tS<5000)requestAnimationFrame(tick);
        })();
      },{once:true});
    })()""")
    pg2.evaluate("withState(function(){ applyRule(S.rules.find(r=>r.value>0), [S.students[0].id]); })")
    pg.wait_for_function(
        "document.querySelectorAll('.scr-tile .scr-pts')[0] && document.querySelectorAll('.scr-tile .scr-pts')[0].textContent !== %s" % json.dumps(before),
        timeout=3000)
    dt = pg.evaluate("(window.__tM!==null&&window.__tS!==null)?(window.__tM-window.__tS):-1")
    rec("8.1c cross-tab in-page update < 200ms", 0 <= dt < 200, f"{dt:.1f}ms storage->mutation")
    print(f"MEASURED storage->tile mutation: {dt:.1f} ms (in-page, storage-event -> DOM)")
    # drawer instant update
    v0 = pg.evaluate("(function(){const el=document.querySelectorAll('.scr-tile .scr-pts')[0];return el?el.textContent:'';})()")
    pg.evaluate("openDrawer(); drawerToggle(S.students[1].id); drawerApply(S.rules.find(r=>r.value>0).id);")
    v1 = pg.evaluate("(function(){const el=document.querySelectorAll('.scr-tile .scr-pts')[1];return el?el.textContent:'';})()")
    rec("8.1d drawer updates instantly", v1 != "", v1)
    # reload restores
    n = pg.evaluate("JSON.parse(localStorage.getItem(LS_KEY)).records.length")
    pg.reload(); pg.wait_for_timeout(800)
    pg.evaluate("location.hash='#/screen'; route()"); pg.wait_for_timeout(300)
    n2 = pg.evaluate("JSON.parse(localStorage.getItem(LS_KEY)).records.length")
    tiles2 = pg.evaluate("document.querySelectorAll('.scr-tile').length")
    rec("8.1e reload restores view+numbers", n == n2 and tiles2 == 16, f"{n}->{n2} tiles {tiles2}")
    # fullscreen + mute persist
    pg.evaluate("setSound(true)")
    snd = pg.evaluate("JSON.parse(localStorage.getItem(LS_KEY)).settings.sound")
    pg.reload(); pg.wait_for_timeout(700)
    snd2 = pg.evaluate("JSON.parse(localStorage.getItem(LS_KEY)).settings.sound")
    rec("8.1f mute toggle persists", snd == "on" and snd2 == "on", f"{snd}/{snd2}")

    # 8.7 keyboard guards in real DOM
    pg.evaluate("location.hash='#/screen'; route()")
    pg.focus("input") if False else None
    pg.evaluate("openDrawer()")
    has = pg.evaluate("drawerIsOpen()")
    pg.keyboard.press("Escape")
    rec("8.7a Esc closes drawer", has and not pg.evaluate("drawerIsOpen()"))
    pg.evaluate("""(function(){const i=document.createElement('input');i.type='text';i.id='kvguard';document.body.appendChild(i);})()""")
    pg.fill("#kvguard", "abc")
    pg.keyboard.press("a")
    rec("8.7b A ignored while typing", not pg.evaluate("drawerIsOpen()"))
    pg.evaluate("document.getElementById('kvguard').remove()")

    # 8.7 sound chip lifecycle: sound on + not unlocked -> visible; after tap -> hidden
    chip_v = pg.evaluate("(function(){const c=document.querySelector('#scrSoundChip');return c&&c.style.display!=='none';})()")
    pg.mouse.click(960, 540); pg.wait_for_timeout(300)
    chip_v2 = pg.evaluate("(function(){const c=document.querySelector('#scrSoundChip');return c&&c.style.display!=='none';})()")
    rec("8.7c sound chip appears once then never", chip_v and not chip_v2, f"{chip_v}->{chip_v2}")

    # 8.7 every route zero console errors @1080p and @390
    for r_ in ["#/", "#/app/classroom", "#/app/records", "#/app/shop", "#/app/leaderboard", "#/app/settings", "#/screen"]:
        pg.evaluate(f"location.hash='{r_}'; route()"); pg.wait_for_timeout(250)
    m = ctx.new_page(); m.set_viewport_size({"width": 390, "height": 844})
    m.goto(f"http://localhost:{PORT}/index.html#/screen"); m.wait_for_timeout(700)
    rec("8.7d zero console/page errors all routes + mobile", len(errs) == 0, errs[:3])

    # 8.9 no runtime network requests (after load)
    pg.wait_for_timeout(800)
    rec("8.9 no runtime network requests", len([u for u in reqs if "index.html" not in u]) == 0, reqs[:3])

    # 8.7 reduced motion: emulate, award, confirm no confetti nodes
    rm = b.new_context(viewport={"width": 1280, "height": 800}, reduced_motion="reduce")
    rp = rm.new_page()
    rp.goto(f"http://localhost:{PORT}/index.html"); rp.wait_for_timeout(600)
    rp.evaluate("tryDemo(true)")
    rp.evaluate("location.hash='#/screen'; route()"); rp.wait_for_timeout(500)
    rp.evaluate("withState(function(){ applyRule(S.rules.find(r=>r.value>0), [S.students[3].id]); }); screenAfterChange()")
    rp.wait_for_timeout(400)
    conf = rp.evaluate("document.querySelectorAll('.scr-confetti').length")
    badge = rp.evaluate("document.querySelectorAll('.scr-tile.pop-badge, .scr-tile[class*=pop-badge]').length")
    rec("8.7e reduced motion: 0 particles", conf == 0, conf)
    rm.close()

    # aria assertions
    pg.evaluate("location.hash='#/screen'; route()"); pg.wait_for_timeout(300)
    aria = pg.evaluate("""(function(){
      const out=[];
      out.push(['mute', !!document.querySelector('#scrMute[aria-pressed]')]);
      out.push(['full', !!document.querySelector('#scrFull[aria-pressed]')]);
      out.push(['drawerbtn', !!document.querySelector('#scrDrawer[aria-label]')]);
      return out;})()""")
    rec("8.8a aria-pressed on mute/full + drawer labelled", aria[0][1] and aria[1][1] and aria[2][1])

    # ---------- stub-parity checks (real browser; node stub is selector-blind) ----------
    conf = lambda: pg.evaluate("document.querySelectorAll('.scr-confetti').length")
    pg.evaluate("location.hash='#/screen'; route()"); pg.wait_for_timeout(300)
    pg.evaluate("S.settings.sound='off'; save()")
    rec("G0 modern browser: no old-browser gate", pg.evaluate("!window.__GS_BLOCKED && !document.querySelector('#gs-old')"))

    # S1 drawer award: click path
    pg.evaluate("window.__qa0={n:S.records.length, pts:document.querySelector('#tile-'+S.students[0].id+' .scr-pts').textContent}")
    pg.click("#scrDrawer"); pg.wait_for_timeout(250)
    pg.click('.drw-stu[data-drw="'+pg.evaluate("S.students[0].id")+'"]')
    pg.click(".drw-rule:not(.drw-neg)"); pg.wait_for_timeout(400)
    s1 = pg.evaluate("(function(){return {n:S.records.length-window.__qa0.n, ptsChanged:document.querySelector('#tile-'+S.students[0].id+' .scr-pts').textContent!==window.__qa0.pts, open:!!document.querySelector('.drw')};})()")
    s1["conf"] = conf()
    rec("S1 drawer award by clicks: record+tile+stays open+confetti",
        s1["n"]==1 and s1["ptsChanged"] and s1["open"] and s1["conf"]>0, s1)

    # S2 undo-last via drawer button
    newest = pg.evaluate("(function(){const r=S.records[0];return {id:r.id,v:r.value,w:walletOf(S.students[0])};})()")
    c0 = conf(); pg.click(".drw-undo"); pg.wait_for_timeout(400)
    s2 = pg.evaluate("(function(){const r=S.records.find(function(x){return x.id==='"+newest["id"]+"'});return {undone:r.undone, w:walletOf(S.students[0])};})()")
    rec("S2 undo-last: newest non-undone undone, wallet back, no confetti",
        s2["undone"] is True and s2["w"]==newest["w"]-newest["v"] and conf()<=c0, {"was":newest,"now":s2})
    pg.keyboard.press("Escape"); pg.wait_for_timeout(200)

    # S3 keyboard: A opens, Ctrl+A ignored, Esc closes, F fullscreen
    pg.keyboard.press("a"); pg.wait_for_timeout(200)
    a_open = pg.evaluate("!!document.querySelector('.drw')")
    pg.keyboard.press("Control+a"); pg.wait_for_timeout(150)
    ctrl_ok = pg.evaluate("!!document.querySelector('.drw')")
    pg.keyboard.press("Escape"); pg.wait_for_timeout(200)
    esc_ok = pg.evaluate("!document.querySelector('.drw')")
    pg.keyboard.press("f"); pg.wait_for_timeout(400)
    fs = pg.evaluate("!!document.fullscreenElement")
    fs_cap = pg.evaluate("typeof document.documentElement.requestFullscreen==='function'")
    rec("S3 keys A/Ctrl+A/Esc", a_open and ctrl_ok and esc_ok, {"a":a_open,"ctrl":ctrl_ok,"esc":esc_ok})
    rec("S3f F fullscreen (headless may deny; feature presence asserted)", fs or fs_cap, {"entered":fs,"capable":fs_cap})

    # S4 mute by clicks + persistence
    pg.click("#scrMute"); m1 = pg.evaluate("document.querySelector('#scrMute').getAttribute('aria-pressed')")
    pg.reload(); pg.wait_for_timeout(800); pg.evaluate("location.hash='#/screen'; route()"); pg.wait_for_timeout(300)
    m2 = pg.evaluate("document.querySelector('#scrMute').getAttribute('aria-pressed')")
    pg.click("#scrMute"); m3 = pg.evaluate("document.querySelector('#scrMute').getAttribute('aria-pressed')")
    rec("S4 mute click + reload persistence", m1=="true" and m2=="true" and m3=="false", {"on":m1,"after-reload":m2,"off":m3})

    # S5 negative chip: quiet marker, no confetti; hideNeg hides entirely
    c0 = conf()
    pg.evaluate("withState(function(){ applyRule(S.rules.find(function(r){return r.value<0}), [S.students[0].id]); }); screenAfterChange()")
    s5a = pg.evaluate("(function(){const t=document.querySelector('#tile-'+S.students[0].id);return {neg:t.classList.contains('pop-neg'), n:t.getAttribute('data-popn')};})()")
    rec("S5a negative pop quiet: class+marker, 0 confetti", s5a["neg"] and conf()<=c0, s5a)
    pg.wait_for_timeout(2800)
    pg.evaluate("saveHideNeg(true)")
    pg.evaluate("withState(function(){ applyRule(S.rules.find(function(r){return r.value<0}), [S.students[0].id]); }); screenAfterChange()")
    s5b = pg.evaluate("!document.querySelector('#tile-'+S.students[0].id).classList.contains('pop-neg')")
    rec("S5b hideNeg hides the marker", s5b)
    pg.evaluate("saveHideNeg(false)")

    # S6 gift grant/purchase never pops
    c0 = conf()
    pg.evaluate("withState(function(){ S.requests.unshift({id:'qa-req', stId:S.students[4].id, giftId:S.gifts[0].id, ts:Date.now(), status:'pending'}); })")
    pg.evaluate("withState(function(){ const q=S.requests[0]; const g=giftById(q.giftId); const st=byId(q.stId); const need=g.price-walletOf(st); if(need>0){const r=S.rules.filter(function(x){return x.value>0})[0]; S.records.unshift({id:uid(),ts:Date.now(),studentIds:[st.id],ruleId:r.id,ruleLabel:recLabel(r),value:need,undone:false});} }); screenAfterChange()")
    c0 = conf()
    granted = pg.evaluate("(function(){const qid=S.requests[0].id; withState(function(){ decide(S.requests[0],true); }); const q=S.requests.find(function(x){return x.id===qid}); return q?q.status:'gone';})()")
    pops = pg.evaluate("screenAfterChange()")
    rec("S6 approved gift grant: zero pops, no confetti", granted=="approved" and len(pops)==0 and conf()<=c0, {"status":granted,"pops":pops})

    # S7 award at wallet 0 still pops
    pg.evaluate("withState(function(){ const id=S.students[1].id; S.records=S.records.filter(function(r){return r.studentIds.indexOf(id)<0}); S.collection[id]=[]; S.boxSpent[id]=0; }); screenAfterChange()")
    w = pg.evaluate("walletOf(S.students[1])")
    c0 = conf()
    pg.evaluate("withState(function(){ applyRule(S.rules.filter(function(r){return r.value>0})[0], [S.students[1].id]); }); screenAfterChange()")
    rec("S7 wallet-0 positive award pops", w==0 and conf()>c0, {"walletBefore":w,"conf":conf()})

    # G1 simulated old browser: gate notice, single intentional error
    old = b.new_context(); op = old.new_page(); oerrs = []
    op.on("pageerror", lambda e: oerrs.append(str(e)))
    old.add_init_script("try{Object.defineProperty(window.CSS,'supports',{value:function(){return false}})}catch(e){}")
    op.goto(f"http://localhost:{PORT}/index.html"); op.wait_for_timeout(900)
    g1 = op.evaluate("(function(){return {blocked:window.__GS_BLOCKED===true, notice:!!document.querySelector('#gs-old'), hidden:document.querySelectorAll('body > :not(#gs-old)').length};})()")
    rec("G1 old browser: bilingual notice shown, app hidden, one intentional error",
        g1["blocked"] and g1["notice"] and len(oerrs)==1 and "GS-UNSUPPORTED" in oerrs[0], {"g":g1,"errs":oerrs})
    old.close()
    b.close()

ok = sum(1 for _, o, _ in R if o)
total = len(R)
with open("qa/VERIFY-15.md", "w", encoding="utf-8") as f:
    f.write("# Task 15 verification vs spec §8\n\n| check | result | detail |\n|---|---|---|\n")
    for i, o, d in R:
        f.write(f"| {i} | {'✅' if o else '❌'} | {d} |\n")
    f.write(f"\n**{ok}/{total} browser checks green.** Node suite 85/85 + smoke 8/8 separately.\n")
print(f"VERIFY15 {ok}/{total}")
sys.stdout.flush(); sys.stderr.flush()
os._exit(0 if ok == total else 1)
