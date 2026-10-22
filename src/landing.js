/* ======================================================================
   Gifted Scholars — studio landing (warm editorial system)
   Seven sections: nav / split-wordmark hero / to-scale drawing /
   computed pinned study / practice rows / work table / cropped close.
   Every figure is computed from the app's own data (LEVELS, seed counts).
   ====================================================================== */
const GS_CHAR_SVG = `
<svg id="gs-char" viewBox="0 0 520 560" fill="none" aria-hidden="true">
  <defs>
    <linearGradient id="gsBody" x1="120" y1="220" x2="420" y2="520" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#FFFEF9"/><stop offset=".55" stop-color="#F8F1E2"/><stop offset="1" stop-color="#EFE3CC"/>
    </linearGradient>
    <linearGradient id="gsLid" x1="110" y1="170" x2="420" y2="260" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#FBF5E8"/><stop offset="1" stop-color="#EBDFC6"/>
    </linearGradient>
    <linearGradient id="gsRib" x1="236" y1="110" x2="292" y2="520" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#F4D28C"/><stop offset=".5" stop-color="#E2AE55"/><stop offset="1" stop-color="#C89340"/>
    </linearGradient>
    <clipPath id="gsSockL"><ellipse cx="196" cy="330" rx="33" ry="39"/></clipPath>
    <clipPath id="gsSockR"><ellipse cx="324" cy="330" rx="33" ry="39"/></clipPath>
  </defs>
  <ellipse cx="260" cy="524" rx="158" ry="24" fill="#E3DDC9"/>
  <ellipse cx="260" cy="521" rx="118" ry="17" fill="#DAD3BC"/>
  <ellipse cx="194" cy="500" rx="35" ry="21" fill="#F3EADA"/>
  <ellipse cx="326" cy="500" rx="35" ry="21" fill="#EFE6D2"/>
  <rect x="86" y="210" width="348" height="302" rx="58" fill="url(#gsBody)"/>
  <rect x="74" y="164" width="372" height="88" rx="40" fill="url(#gsLid)"/>
  <path d="M96 186c22-12 68-16 122-16" stroke="#FFFFFF" stroke-opacity=".55" stroke-width="7" stroke-linecap="round"/>
  <rect x="228" y="164" width="64" height="348" rx="10" fill="url(#gsRib)"/>
  <path d="M344 158c4-24-2-42-16-58" stroke="#6E8B5E" stroke-width="7" stroke-linecap="round"/>
  <path d="M330 96c-14 4-20 16-16 28 14-2 22-12 16-28Z" fill="#7FA06B"/>
  <path d="M344 92c2-14 12-22 26-22-2 16-12 26-26 22Z" fill="#93AF7E"/>
  <path d="M262 152c-58-50-112-30-94 12 10 24 62 20 90-4Z" fill="url(#gsRib)"/>
  <path d="M258 152c58-50 112-30 94 12-10 24-62 20-90-4Z" fill="url(#gsRib)"/>
  <circle cx="260" cy="158" r="19" fill="#D9A64E"/>
  <ellipse cx="196" cy="330" rx="36" ry="42" fill="#FFFDF4"/>
  <ellipse cx="196" cy="330" rx="36" ry="42" stroke="#E3D7BC" stroke-width="3.5"/>
  <ellipse cx="324" cy="330" rx="36" ry="42" fill="#FFFDF4"/>
  <ellipse cx="324" cy="330" rx="36" ry="42" stroke="#E3D7BC" stroke-width="3.5"/>
  <g clip-path="url(#gsSockL)"><g id="gs-pupil-l" transform="translate(0,-6)">
    <circle cx="196" cy="332" r="17" fill="#243B2C"/>
    <circle cx="190" cy="325" r="5.5" fill="#FFFFFF"/>
    <circle cx="202" cy="338" r="2.6" fill="#FFFFFF" opacity=".75"/>
  </g></g>
  <g clip-path="url(#gsSockR)"><g id="gs-pupil-r" transform="translate(0,-6)">
    <circle cx="324" cy="332" r="17" fill="#243B2C"/>
    <circle cx="318" cy="325" r="5.5" fill="#FFFFFF"/>
    <circle cx="330" cy="338" r="2.6" fill="#FFFFFF" opacity=".75"/>
  </g></g>
  <path d="M228 398q32 26 64 0" stroke="#243B2C" stroke-width="9" stroke-linecap="round"/>
</svg>`;

/* ---------- fig 01 · the level curve, drawn strictly to scale ----------
   Scale: x — 64 px per level · y — 2.2 px per point. Thresholds come
   straight from LEVELS[]; the fignote repeats the same numbers. */
function figureSVG(){
  const X0=70, DX=64, Y0=392, SY=2.2, TOP=40, LEFT=46, RIGHT=700;
  const Y=v=>Y0-v*SY;
  let s='';
  for(let p=0;p<=160;p+=40){
    s+='<line x1="'+LEFT+'" y1="'+Y(p)+'" x2="'+RIGHT+'" y2="'+Y(p)+'" stroke="rgba(26,25,23,.16)" stroke-width="1"/>'
      +'<text x="'+(LEFT-8)+'" y="'+(Y(p)+3.5)+'" text-anchor="end" class="ax">'+p+'</text>';
  }
  for(let i=0;i<10;i++){
    const x=X0+i*DX;
    s+='<line x1="'+x+'" y1="'+TOP+'" x2="'+x+'" y2="'+Y0+'" stroke="rgba(26,25,23,.09)" stroke-width="1"/>'
      +'<text x="'+x+'" y="'+(Y0+20)+'" text-anchor="middle" class="ax">L'+(i+1)+'</text>';
  }
  s+='<line x1="'+LEFT+'" y1="'+Y0+'" x2="'+RIGHT+'" y2="'+Y0+'" stroke="#1A1917" stroke-width="1.4"/>';
  s+='<polyline points="'+LEVELS.map((l,i)=>(X0+i*DX)+','+Y(l.min)).join(' ')
    +'" fill="none" stroke="#1A1917" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>';
  LEVELS.forEach((l,i)=>{ s+='<circle cx="'+(X0+i*DX)+'" cy="'+Y(l.min)+'" r="3" fill="#9B3418"/>'; });
  const leader=(i,dy,left)=>{
    const l=LEVELS[i], x=X0+i*DX, y=Y(l.min);
    return left
      ? '<line x1="'+x+'" y1="'+y+'" x2="'+(x-26)+'" y2="'+(y-dy)+'" stroke="#9B3418" stroke-width="1"/>'
        +'<text x="'+(x-31)+'" y="'+(y-dy+3.5)+'" text-anchor="end" class="lb">L'+(i+1)+' · '+l.min+'</text>'
      : '<line x1="'+x+'" y1="'+y+'" x2="'+(x+26)+'" y2="'+(y-dy)+'" stroke="#9B3418" stroke-width="1"/>'
        +'<text x="'+(x+31)+'" y="'+(y-dy+3.5)+'" class="lb">L'+(i+1)+' · '+l.min+'</text>';
  };
  s+=leader(0,30,false)+leader(4,34,false)+leader(9,30,true);
  return '<svg viewBox="0 0 760 470" role="img" aria-label="Level curve, drawn to scale">'
    +'<style>.ax{font:10.5px "Azeret Mono",monospace;fill:#6E6A61;letter-spacing:.1em}'
    +'.lb{font:10.5px "Azeret Mono",monospace;fill:#9B3418;letter-spacing:.12em}</style>'+s+'</svg>';
}

/* ---------- fig 02 · one week, computed ----------
   THE MODEL (stated once, in the copy): five school days, "answered well"
   (+2) each day.  d = 5·scroll · pts = 2d · level & progress from LEVELS[].
   The marker's arc and the printed readouts are the same calculation. */
function studyModel(p){
  const d=Math.min(5,Math.floor(p*5.0001));
  const pts=2*d;
  let li=0; for(let i=0;i<LEVELS.length;i++){ if(pts>=LEVELS[i].min) li=i; }
  const cur=LEVELS[li], next=LEVELS[li+1];
  const into=next ? (pts-cur.min)/(next.min-cur.min) : 1;
  return {day:d, pts:pts, level:li+1, into:Math.round(into*100), stars:pts};
}
const ARC={p0:[12,80], p1:[46,30], p2:[88,10]};
function arcPoint(t){
  const u=1-t;
  return [ u*u*ARC.p0[0]+2*u*t*ARC.p1[0]+t*t*ARC.p2[0],
           u*u*ARC.p0[1]+2*u*t*ARC.p1[1]+t*t*ARC.p2[1] ];
}
function setReadouts(m){
  const set=(id,v)=>{const n=document.getElementById(id); if(n&&n.textContent!==v)n.textContent=v;};
  set('rd-day',String(m.day)); set('rd-pts','+'+m.pts); set('rd-lvl','L'+m.level);
  set('rd-into',m.into+'%'); set('rd-stars',m.stars+' ★');
}

/* ---------- render ---------- */
function renderLanding(){
  applyLangDoc();
  const langBtn='<button class="sqbtn" type="button" onclick="setLang(\''+(LANG==='en'?'zh':'en')+'\')" aria-label="Switch language">'+(LANG==='en'?'中文':'EN')+'</button>';
  document.querySelector('#view').innerHTML=`
  <div class="gs-page">
    <nav class="gsnav">
      <a class="brand" href="#/">gifted scholars<i>.</i></a>
      <div class="links">
        <a href="#/app/classroom">${t("navClass")}</a>
        <a class="xtra" href="#/app/shop">${t("navShop")}</a>
        <a class="xtra" href="#/app/leaderboard">${t("navBoard")}</a>
        <a class="xtra" href="#/app/records">${t("navRec")}</a>
        ${langBtn}
        <button class="sqbtn" type="button" onclick="openRoomPicker()">${t("navRoom")}</button>
      </div>
    </nav>

    <header class="gshero">
      <div class="gswm" aria-hidden="true">
        <div class="wm-line wm-top rv rv-raf">gifted</div>
        <div class="wm-line wm-bot rv rv-raf">scholars</div>
      </div>
      <div class="subject rv rv-raf">${GS_CHAR_SVG}</div>
      <div class="copystack">
        <span class="eyebrow rv rv-raf">${t("L_eyebrow")}</span>
        <h1 class="rv rv-raf">${t("L_headA")} <em class="it">${t("L_headB")}</em></h1>
        <p class="lede rv rv-raf">${t("L_lede")}</p>
        <div class="ctas" data-stagger>
          <a class="gsbtn pig rv" href="#/app/classroom">${t("L_btnEnter")}</a>
          <button class="gsbtn rv" type="button" onclick="openLicense()">${t("L_btnLicense")}</button>
        </div>
      </div>
      <p class="corner-cap rv rv-raf">${t("L_caption")}</p>
    </header>

    <section class="gsec" id="fig-draw">
      <div class="gsdraw">
        <div>
          <span class="eyebrow rv">${t("L_drawEyebrow")}</span>
          <h2 class="rv">${t("L_drawHead")}</h2>
          <p class="seclede rv">${t("L_drawLede")}</p>
          <dl class="dl" data-stagger>
            <div class="rv"><dt>${t("L_dlGrowth")}</dt><dd>${t("L_dlGrowthD")}</dd><span class="val num">0 – 160 pts</span></div>
            <div class="rv"><dt>${t("L_dlStars")}</dt><dd>${t("L_dlStarsD")}</dd><span class="val num">1 ★ = 1 pt</span></div>
            <div class="rv"><dt>${t("L_dlApproval")}</dt><dd>${t("L_dlApprovalD")}</dd><span class="val">${t("L_valAlways")}</span></div>
          </dl>
        </div>
        <figure class="figwrap rv">
          ${figureSVG()}
          <figcaption class="fignote">${t("L_figNote")}</figcaption>
        </figure>
      </div>
    </section>

    <section class="gsstudy" id="fig-study">
      <div class="stage">
        <div>
          <span class="eyebrow rv rv-raf">${t("L_studyEyebrow")}</span>
          <h2 class="rv rv-raf">${t("L_studyHead")}</h2>
        </div>
        <div class="arcbox" aria-hidden="true">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M12,80 Q46,30 88,10"/></svg>
          <div class="subject">${GS_CHAR_SVG}</div>
          <div class="marker" id="gs-marker"></div>
        </div>
        <div class="readouts">
          <div><span class="k">${t("L_rdDay")}</span><span class="v num" id="rd-day">0</span></div>
          <div><span class="k">${t("L_rdPts")}</span><span class="v num" id="rd-pts">+0</span></div>
          <div><span class="k">${t("L_rdLvl")}</span><span class="v num" id="rd-lvl">L1</span></div>
          <div><span class="k">${t("L_rdInto")}</span><span class="v num" id="rd-into">0%</span></div>
          <div><span class="k">${t("L_rdStars")}</span><span class="v num" id="rd-stars">0 ★</span></div>
        </div>
        <p class="modelnote">${t("L_studyFoot")}</p>
      </div>
    </section>

    <section class="gsec gsmat">
      <span class="eyebrow rv">${t("L_matEyebrow")}</span>
      <h2 class="rv">${t("L_matHead")}</h2>
      <div class="rows" data-stagger>
        <div class="row rv"><span class="k">${t("L_m1")}</span><span class="d">${t("L_m1d")}</span><span class="c">${t("L_m1c")}</span></div>
        <div class="row rv"><span class="k">${t("L_m2")}</span><span class="d">${t("L_m2d")}</span><span class="c">${t("L_m2c")}</span></div>
        <div class="row rv"><span class="k">${t("L_m3")}</span><span class="d">${t("L_m3d")}</span><span class="c">${t("L_m3c")}</span></div>
        <div class="row rv"><span class="k">${t("L_m4")}</span><span class="d">${t("L_m4d")}</span><span class="c">${t("L_m4c")}</span></div>
        <div class="row rv"><span class="k">${t("L_m5")}</span><span class="d">${t("L_m5d")}</span><span class="c">${t("L_m5c")}</span></div>
        <div class="row rv"><span class="k">${t("L_m6")}</span><span class="d">${t("L_m6d")}</span><span class="c">${t("L_m6c")}</span></div>
      </div>
      <div class="pair">
        <div>
          <h3 class="rv">${t("L_pairHead")}</h3>
          <p class="rv">${t("L_pairBody")}</p>
        </div>
        <div class="data" data-stagger>
          <div class="rv"><span class="k">${t("L_d1")}</span><span class="num">${SEED_STUDENTS.length}</span></div>
          <div class="rv"><span class="k">${t("L_d2")}</span><span class="num">${S.gifts.length}</span></div>
          <div class="rv"><span class="k">${t("L_d3")}</span><span class="num">${LEVELS.length}</span></div>
          <div class="rv"><span class="k">${t("L_d4")}</span><span class="num">${S.rules.length}</span></div>
        </div>
      </div>
    </section>

    <section class="gsec gstable">
      <span class="eyebrow rv">${t("L_tblEyebrow")}</span>
      <h2 class="rv">${t("L_tblHead")}</h2>
      <table class="tbl">
        <thead><tr>
          <th scope="col">${t("L_thA")}</th><th scope="col">${t("L_thB")}</th>
          <th scope="col">${t("L_thC")}</th><th scope="col">${t("L_thD")}</th>
        </tr></thead>
        <tbody data-stagger>
          <tr class="rv"><td class="name" data-k="${t("L_thA")}">${t("L_r1")}</td><td data-k="${t("L_thB")}">${t("L_r1d")}</td><td data-k="${t("L_thC")}">${t("L_r1w")}</td><td class="enter" data-k="${t("L_thD")}"><a href="#/app/classroom">#/app/classroom</a></td></tr>
          <tr class="rv"><td class="name" data-k="${t("L_thA")}">${t("L_r2")}</td><td data-k="${t("L_thB")}">${t("L_r2d")}</td><td data-k="${t("L_thC")}">${t("L_r2w")}</td><td class="enter" data-k="${t("L_thD")}"><a href="#/app/records">#/app/records</a></td></tr>
          <tr class="rv"><td class="name" data-k="${t("L_thA")}">${t("L_r3")}</td><td data-k="${t("L_thB")}">${t("L_r3d")}</td><td data-k="${t("L_thC")}">${t("L_r3w")}</td><td class="enter" data-k="${t("L_thD")}"><a href="#/app/shop">#/app/shop</a></td></tr>
          <tr class="rv"><td class="name" data-k="${t("L_thA")}">${t("L_r4")}</td><td data-k="${t("L_thB")}">${t("L_r4d")}</td><td data-k="${t("L_thC")}">${t("L_r4w")}</td><td class="enter" data-k="${t("L_thD")}"><a href="#/app/leaderboard">#/app/leaderboard</a></td></tr>
          <tr class="rv"><td class="name" data-k="${t("L_thA")}">${t("L_r5")}</td><td data-k="${t("L_thB")}">${t("L_r5d")}</td><td data-k="${t("L_thC")}">${t("L_r5w")}</td><td class="enter" data-k="${t("L_thD")}"><a href="#/">#/room/…</a></td></tr>
        </tbody>
      </table>
    </section>

    <footer class="gsclose">
      <span class="eyebrow rv">${t("L_closeEyebrow")}</span>
      <h2 class="rv">${t("L_closeHeadA")} <em class="it">${t("L_closeHeadB")}</em></h2>
      <p class="fine rv">${t("L_fine")}</p>
      <div class="ctas">
        <button class="gsbtn rv" type="button" onclick="openRoomPicker()">${t("L_closeBtnA")}</button>
        <a class="gsbtn pig rv" href="#/app/classroom">${t("L_closeBtnB")}</a>
      </div>
      <div class="strip">
        <span>ZHONGFANGYUAN BILINGUAL SCHOOL</span>
        <span>${t("L_stripMid")}</span>
        <span>© 2026 MOHAMMED SHEHZAD KHAN</span>
      </div>
      <div class="endwm" aria-hidden="true">gifted scholars</div>
    </footer>
  </div>`;
  initStudio();
  window.scrollTo(0,0);
}

/* ---------- studio controller: reveals + scroll-bound layers ---------- */
function initStudio(){
  const root=document.querySelector('.gs-page'); if(!root) return;
  const motion=document.documentElement.classList.contains('gs-motion')
    && !matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero=document.querySelector('.gshero');
  const study=document.querySelector('.gsstudy');
  const marker=document.getElementById('gs-marker');
  /* above-fold pieces reveal on rAF — never observed (they can sit inside a
     negative root margin on short viewports and would never fire) */
  requestAnimationFrame(()=>{ document.querySelectorAll('.rv-raf').forEach(n=>n.classList.add('in')); });
  /* stagger indices */
  document.querySelectorAll('[data-stagger]').forEach(g=>{
    g.querySelectorAll('.rv').forEach((n,i)=>n.style.setProperty('--si',i));
  });
  /* in-view reveals */
  let io=null;
  if(motion && 'IntersectionObserver' in window){
    io=new IntersectionObserver(es=>{
      es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    },{rootMargin:'0px 0px -8% 0px',threshold:.12});
    document.querySelectorAll('.rv:not(.rv-raf)').forEach(n=>io.observe(n));
  }else{
    document.querySelectorAll('.rv').forEach(n=>n.classList.add('in'));
  }
  /* scroll-position-bound layer: split wordmark + computed study */
  let raf=0;
  const onScroll=()=>{
    if(raf) return;
    raf=requestAnimationFrame(()=>{
      raf=0;
      if(hero){
        const r=hero.getBoundingClientRect();
        const p=Math.max(0,Math.min(1,-r.top/(r.height*.9)));
        hero.style.setProperty('--wp',p.toFixed(4));
      }
      if(study&&marker){
        const r=study.getBoundingClientRect();
        const total=r.height-window.innerHeight;
        const p=Math.max(0,Math.min(1,-r.top/(total||1)));
        const pt=arcPoint(p);
        marker.style.left=pt[0]+'%'; marker.style.top=pt[1]+'%';
        setReadouts(studyModel(p));
      }
    });
  };
  if(motion){
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll,{passive:true});
    onScroll();
    window._gsLandCleanup=()=>{
      window.removeEventListener('scroll',onScroll);
      window.removeEventListener('resize',onScroll);
      if(io) io.disconnect();
      if(raf) cancelAnimationFrame(raf);
    };
  }else{
    /* static final states: the completed week, wordmark fully parted */
    if(hero) hero.style.setProperty('--wp','1');
    if(marker){ const pt=arcPoint(1); marker.style.left=pt[0]+'%'; marker.style.top=pt[1]+'%'; }
    setReadouts(studyModel(1));
    window._gsLandCleanup=null;
  }
}

/* ---------- open a gift room by student name ---------- */
function openRoomPicker(){
  modal(`<div class="card stk" style="max-width:420px"><h2 style="font-family:var(--font-round)">Open a gift room</h2>
  <p style="margin:8px 0 14px;color:var(--ink-soft)">${t("nameHint")}</p>
  <input id="rp-name" placeholder="${t("yourName")}" style="width:100%;padding:12px 14px;border:var(--bd);border-radius:12px;font-size:16px" aria-label="${t("yourName")}">
  <div class="btns" style="margin-top:14px"><button class="btn ghost" onclick="closeOverlays()">Cancel</button><button class="btn primary" id="rp-go">${t("openMyRoom")}</button></div></div>`);
  const openIt=()=>{
    const q=($("#rp-name").value||"").trim().toLowerCase();
    if(!q){toast(t("typeFirst"));return;}
    const st=S.students.find(x=>x.name.toLowerCase()===q)||S.students.find(x=>x.name.toLowerCase().startsWith(q));
    if(!st){toast(t("noStudent") + $("#rp-name").value.trim() + t("noStudent2"));return;}
    go("#/room/"+st.id);
  };
  $("#rp-go").addEventListener("click",openIt);
  $("#rp-name").addEventListener("keydown",e=>{if(e.key==="Enter")openIt();});
  $("#rp-name").focus();
}

/* ---------- license / authorship ---------- */
function openLicense(){
  modal(`<div class="card stk" style="max-width:560px;max-height:80vh;overflow:auto"><h2 style="font-family:var(--font-round)">About this gift</h2>
  <div style="font-size:14.5px;line-height:1.65;margin-top:10px">
  <p><b>Gifted Scholars</b> — classroom points &amp; virtual gifts.<br>© 2026 Mohammed Shehzad Khan. All rights reserved.</p>
  <p style="margin-top:10px">${t("createdBy")}<b>Mohammed Shehzad Khan</b> ("Teacher Mo") and donated as a free gift to ZhongFangYuan Bilingual School. It will always be free: no fees, no ads, no tracking, nothing for sale.</p>
  <p style="margin-top:10px"><b>Ownership.</b> The site, its code, design and artwork remain the property of the author. Donating it to the school does not transfer copyright. The school may keep using it for everyday school life, free of charge, even after the author moves on.</p>
  <p style="margin-top:10px">The school may use it forever, for free, even if the author moves on. <b>You may not</b> sell, charge for, or relicense this work, and the credit in the footer must stay. The author owns this work and may update it or share it with other schools. If these terms are broken, this license ends automatically.</p>
      <p style="margin-top:10px" lang="zh-CN">学校可以永远免费使用本作品，即使作者日后离开。<b>不得</b>出售、收费或再许可本作品，页脚署名必须保留。版权归作者所有，作者可继续更新或分享给其他学校。如违反以上条款，本许可自动终止。</p>
  <p style="margin-top:10px">Fonts: Instrument Serif &amp; Azeret Mono (SIL Open Font License). Provided “as is”, without warranty of any kind.</p>
  </div>
  <div class="btns" style="margin-top:14px"><button class="btn primary" onclick="closeOverlays()">Close</button></div></div>`);
}

/* ============ init (must run last) ============ */
if(!load())seed();
save();
applyMotion();
try{matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change",applyMotion);}catch(_){}
route();
