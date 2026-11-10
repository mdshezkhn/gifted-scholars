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
  const langBtn='<button class="sqbtn" type="button" onclick="setLang(\''+(LANG==='en'?'zh':'en')+'\')" aria-label="'+(LANG==='en'?'中文':'EN')+' - switch language">'+(LANG==='en'?'中文':'EN')+'</button>';
  document.querySelector('#view').innerHTML=`
  <div class="gs-page">
    <a class="skip-link" href="#gsmain">${t("skipToContent")}</a>
    <nav class="gsnav">
      <a class="brand" href="#/">gifted scholars<i>.</i></a>
      <div class="links">
        <a class="xtra" href="#features">${t("navFeatures")}</a>
        <a class="xtra" href="#how">${t("navHow")}</a>
        <a class="xtra" href="#screen-show">${t("navScreen")}</a>
        <a class="xtra" href="#privacy">${t("navPrivacy")}</a>
        <a class="xtra" href="#faq">${t("navFaq")}</a>
        <a class="xtra" href="#/help">${t("navHelp")}</a>
        ${langBtn}
        <button class="sqbtn" type="button" onclick="openRoomPicker()">${t("navRoom")}</button>
        <a class="gsbtn pig naventer" href="#/app/classroom">${t("L_btnEnter")}</a>
      </div>
      <button class="gsnav-burger" type="button" aria-expanded="false" aria-controls="gsmenu" aria-label="${t("menuOpen")}" onclick="toggleMenu()"><span></span><span></span><span></span></button>
      <div class="gsmenu" id="gsmenu" hidden>
        <a href="#features" onclick="toggleMenu(true)">${t("navFeatures")}</a>
        <a href="#how" onclick="toggleMenu(true)">${t("navHow")}</a>
        <a href="#screen-show" onclick="toggleMenu(true)">${t("navScreen")}</a>
        <a href="#privacy" onclick="toggleMenu(true)">${t("navPrivacy")}</a>
        <a href="#faq" onclick="toggleMenu(true)">${t("navFaq")}</a>
        <a href="#/help" onclick="toggleMenu(true)">${t("navHelp")}</a>
        <a href="#/app/classroom" onclick="toggleMenu(true)">${t("navClass")}</a>
        <button class="sqbtn" type="button" onclick="toggleMenu(true);openRoomPicker()">${t("navRoom")}</button>
        ${langBtn}
      </div>
    </nav>
    <main id="gsmain">

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
          <button class="gsbtn rv" type="button" onclick="tryDemo();location.hash='#/app/classroom'">${t("tryDemo")}</button>
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
            <div class="rv"><dt>${t("L_dlGrowth")}</dt><dd>${t("L_dlGrowthD")}</dd><dd class="valdd"><span class="val num">0 – 160 pts</span></dd></div>
            <div class="rv"><dt>${t("L_dlStars")}</dt><dd>${t("L_dlStarsD")}</dd><dd class="valdd"><span class="val num">1 ★ = 1 pt</span></dd></div>
            <div class="rv"><dt>${t("L_dlApproval")}</dt><dd>${t("L_dlApprovalD")}</dd><dd class="valdd"><span class="val">${t("L_valAlways")}</span></div>
          </dl>
        </div>
        <figure class="figwrap rv">
          ${figureSVG()}
          <figcaption class="fignote">${t("L_figNote")}</figcaption>
        </figure>
      </div>
    </section>

    <section class="gsec gsfeats" id="features">
      <span class="eyebrow rv">${t("navFeatures")}</span>
      <h2 class="rv">${t("featT")}</h2>
      <div class="feat-grid" data-stagger>
        <div class="feat-card rv"><span class="ficon" aria-hidden="true">${FI.plus}</span><h3>${t("feat1T")}</h3><p>${t("feat1D")}</p></div>
        <div class="feat-card rv"><span class="ficon" aria-hidden="true">${FI.screen}</span><h3>${t("feat2T")}</h3><p>${t("feat2D")}</p></div>
        <div class="feat-card rv"><span class="ficon" aria-hidden="true">${FI.gift}</span><h3>${t("feat3T")}</h3><p>${t("feat3D")}</p></div>
        <div class="feat-card rv"><span class="ficon" aria-hidden="true">${FI.chart}</span><h3>${t("feat4T")}</h3><p>${t("feat4D")}</p></div>
        <div class="feat-card rv"><span class="ficon" aria-hidden="true">${FI.undo}</span><h3>${t("feat5T")}</h3><p>${t("feat5D")}</p></div>
        <div class="feat-card rv"><span class="ficon" aria-hidden="true">${FI.globe}</span><h3>${t("feat6T")}</h3><p>${t("feat6D")}</p></div>
      </div>
    </section>

    <section class="gsec gshow" id="how">
      <span class="eyebrow rv">${t("navHow")}</span>
      <h2 class="rv">${t("howT")}</h2>
      <div class="steps" data-stagger>
        <div class="step-card rv"><span class="stepn num">1</span><h3>${t("s1T")}</h3><p>${t("s1D")}</p></div>
        <div class="step-card rv"><span class="stepn num">2</span><h3>${t("s2T")}</h3><p>${t("s2D")}</p></div>
        <div class="step-card rv"><span class="stepn num">3</span><h3>${t("s3T")}</h3><p>${t("s3D")}</p></div>
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

    <section class="nightband" id="screen-show">
      <div class="nb-in">
        <span class="eyebrow rv">${t("navScreen")}</span>
        <h2 class="rv">${t("scrShowT")}</h2>
        <p class="seclede rv">${t("scrShowD")}</p>
        <div class="chips" data-stagger>
          <span class="chip rv">${t("scrC1")}</span><span class="chip rv">${t("scrC2")}</span>
          <span class="chip rv">${t("scrC3")}</span><span class="chip rv">${t("scrC4")}</span>
        </div>
        <div class="nbmock rv" aria-hidden="true">${SCREEN_MOCK_SVG}</div>
        <div class="ctas"><a class="gsbtn pig rv" href="#/screen">${t("navScreen")} \u2192</a></div>
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
          <div class="rv"><span class="k">${t("L_d1")}</span><span class="num">${t("demoNames").split(/[,，]\s*/).length}</span></div>
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

    <section class="gsec gspriv" id="privacy">
      <span class="eyebrow rv">${t("navPrivacy")}</span>
      <h2 class="rv">${t("privT")}</h2>
      <p class="seclede rv">${t("privD")}</p>
      <div class="priv-grid" data-stagger>
        <div class="feat-card rv"><span class="ficon" aria-hidden="true">${FI.lock}</span><h3>${t("privC1")}</h3></div>
        <div class="feat-card rv"><span class="ficon" aria-hidden="true">${FI.download}</span><h3>${t("privC2")}</h3></div>
        <div class="feat-card rv"><span class="ficon" aria-hidden="true">${FI.offline}</span><h3>${t("privC3")}</h3></div>
      </div>
      <p class="fine rv">${t("privNote")}</p>
    </section>

    <section class="gsec gsfaq" id="faq">
      <span class="eyebrow rv">${t("navFaq")}</span>
      <h2 class="rv">${t("faqT")}</h2>
      <div class="faqlist" data-stagger>
        ${faqData().slice(0,6).map((f,i)=>`<details class="faq-item rv"${i===0?" open":""}><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join("")}
      </div>
      <p class="fine rv"><a href="#/help">${t("navHelp")} \u2192</a></p>
    </section>

    <footer class="gsclose gsfooter">
      <span class="eyebrow rv">${t("L_closeEyebrow")}</span>
      <h2 class="rv">${t("L_closeHeadA")} <em class="it">${t("L_closeHeadB")}</em></h2>
      <p class="fine rv">${t("L_fine")}</p>
      <div class="ctas">
        <button class="gsbtn rv" type="button" onclick="openRoomPicker()">${t("L_closeBtnA")}</button>
        <a class="gsbtn pig rv" href="#/app/classroom">${t("L_closeBtnB")}</a>
      </div>
      <div class="footlinks" data-stagger>
        <div class="rv"><span class="k">${t("footProd")}</span><a href="#features">${t("navFeatures")}</a><a href="#screen-show">${t("navScreen")}</a><a href="#/app/classroom">${t("L_btnEnter")}</a></div>
        <div class="rv"><span class="k">${t("footHelp2")}</span><a href="#/help">${t("helpTitle")}</a><a href="#faq">${t("navFaq")}</a></div>
        <div class="rv"><span class="k">${t("footAbout")}</span><button class="flink" type="button" onclick="openLicense()">${t("footLicense")}</button><a href="#privacy">${t("navPrivacy")}</a></div>
        <div class="rv"><span class="k">\u00a0</span><a href="#gsmain">${t("footTop")} \u2191</a></div>
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
  modal(`<div class="card stk" style="max-width:420px"><h2 style="font-family:var(--font-round)">${t("roomPickTitle")}</h2>
  <p style="margin:8px 0 14px;color:var(--ink-soft)">${t("nameHint")}</p>
  <input id="rp-name" placeholder="${t("yourName")}" style="width:100%;padding:12px 14px;border:var(--bd);border-radius:12px;font-size:16px" aria-label="${t("yourName")}">
  <div class="btns" style="margin-top:14px"><button class="btn ghost" onclick="closeOverlays()">${t("cancel")}</button><button class="btn primary" id="rp-go">${t("openMyRoom")}</button></div></div>`);
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
  modal(`<div class="card stk" style="max-width:560px;max-height:80vh;overflow:auto"><h2 style="font-family:var(--font-round)">${t("aboutGift")}</h2>
  <div style="font-size:14.5px;line-height:1.65;margin-top:10px">
  <p><b>Gifted Scholars</b> — classroom points &amp; virtual gifts.<br>© 2026 Mohammed Shehzad Khan. All rights reserved.</p>
  <p style="margin-top:10px">${t("createdBy")}<b>Mohammed Shehzad Khan</b> ("Teacher Mo") ${t("licSum")}</p>
  <p style="margin-top:10px">${t("licOwn")}</p>
  <p style="margin-top:10px">${t("licenseBody")}</p>
  <p style="margin-top:10px">${t("licFonts")}</p>
  </div>
  <div class="btns" style="margin-top:14px"><button class="btn primary" onclick="closeOverlays()">${t("close")}</button></div></div>`);
}

/* ---- remake program: icons, mock, faq data, menu, help ---- */
const FI={
 plus:'<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>',
 screen:'<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/></svg>',
 gift:'<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="4" y="9" width="16" height="11" rx="1.5"/><path d="M12 9v11M4 13h16M12 9c-2.5 0-4-1.2-4-2.7C8 5 9 4.4 10 4.7c1.2.4 2 2 2 4.3 0-2.3.8-3.9 2-4.3 1-.3 2 .3 2 1.6C16 7.8 14.5 9 12 9z"/></svg>',
 chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 19V5M4 19h16"/><path d="M8 15l3-4 3 2 4-6"/></svg>',
 undo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 10a8 8 0 1 1 2.3 6.3"/><path d="M4 5v5h5"/></svg>',
 globe:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14 0 18-3-4-3-14.5 0-18z"/></svg>',
 lock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="5" y="10" width="14" height="10" rx="1.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
 download:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 4v11M7 11l5 5 5-5"/><path d="M4 20h16"/></svg>',
 offline:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 12a10 10 0 0 1 14 0"/><path d="M8.5 15.5a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1"/></svg>'
};
const SCREEN_MOCK_SVG = `<svg viewBox="0 0 520 300" role="img">
 <rect x="2" y="2" width="516" height="296" rx="10" fill="#241F17"/>
 <rect x="18" y="16" width="200" height="10" rx="5" fill="#E88654" opacity=".9"/>
 <rect x="18" y="34" width="120" height="8" rx="4" fill="#4A443A"/>
 <rect x="360" y="18" width="140" height="34" rx="8" fill="#1A1917"/>
 <rect x="368" y="26" width="86" height="18" rx="4" fill="#2E7D5B" opacity=".85"/>
 <text x="380" y="40" font-family="Azeret Mono,monospace" font-size="12" fill="#F0EDE4">36/60</text>
 ${[0,1,2,3,4,5].map(r=>[0,1,2,3,4,5].map(c=>`<rect x="${18+c*82}" y="${64+r*37}" width="74" height="30" rx="6" fill="#2B261E"/>`).join("")).join("")}
 <rect x="26" y="72" width="58" height="6" rx="3" fill="#F2B84B"/><rect x="26" y="84" width="40" height="5" rx="2.5" fill="#6E6659"/>
 <rect x="190" y="146" width="74" height="30" rx="6" fill="#9B3418"/>
 <circle cx="227" cy="161" r="3" fill="#F0EDE4"/><circle cx="215" cy="155" r="2" fill="#F0EDE4" opacity=".8"/><circle cx="238" cy="167" r="2" fill="#F0EDE4" opacity=".6"/>
</svg>`;
function faqData(){return [
 [t("faq1Q"),t("faq1A")],[t("faq2Q"),t("faq2A")],[t("faq3Q"),t("faq3A")],
 [t("faq4Q"),t("faq4A")],[t("faq5Q"),t("faq5A")],[t("faq6Q"),t("faq6A")],
 [t("h1Q"),t("h1A")],[t("h2Q"),t("h2A")],[t("h3Q"),t("h3A")],[t("h4Q"),t("h4A")]
];}
function toggleMenu(forceClose){
  const b=document.querySelector(".gsnav-burger"), m=document.getElementById("gsmenu");
  if(!b||!m) return;
  const open=(forceClose===true)?false:!!m.hidden;
  m.hidden=!open;
  b.setAttribute("aria-expanded",open?"true":"false");
  b.setAttribute("aria-label",open?t("menuClose"):t("menuOpen"));
}
if(!window._gsMenuKey){
  window._gsMenuKey=true;
  document.addEventListener("keydown",e=>{if(e&&e.key==="Escape")toggleMenu(true);});
}
function helpFilterCount(q,items){
  const n=String(q||"").trim().toLowerCase();
  let hidden=0;
  for(const it of items){
    const hit=!n||it.keys.toLowerCase().indexOf(n)>=0;
    it.el.style.display=hit?"":"none";
    if(!hit)hidden++;
  }
  return hidden;
}
function renderHelp(){
  applyLangDoc();
  const langBtn='<button class="sqbtn" type="button" onclick="setLang(\''+(LANG==='en'?'zh':'en')+'\')" aria-label="'+(LANG==='en'?'中文':'EN')+' - switch language">'+(LANG==='en'?'中文':'EN')+'</button>';
  document.querySelector("#view").innerHTML=`
  <div class="gs-page gshelp">
    <nav class="gsnav">
      <a class="brand" href="#/">gifted scholars<i>.</i></a>
      <div class="links"><a href="#/">${t("helpBack")}</a>${langBtn}</div>
    </nav>
    <main id="gsmain" class="helpwrap">
      <span class="eyebrow">${t("navHelp")}</span>
      <h1>${t("helpTitle")}</h1>
      <p class="seclede">${t("helpSub")}</p>
      <input id="help-q" class="helpq" type="search" placeholder="${t("helpSearch")}" aria-label="${t("helpSearch")}">
      <div class="faqlist" id="help-list">
        ${helpData().map(f=>`<details class="faq-item" data-k="${f[2]}"><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join("")}
      </div>
      <p class="none gsnone hide" id="help-none">${t("helpNone")}</p>
      <p class="fine"><a href="#/">${t("helpBack")}</a> · <button class="flink" type="button" onclick="openLicense()">${t("footLicense")}</button></p>
    </main>
  </div>`;
  const inp=document.getElementById("help-q");
  const wire=()=>{
    const items=[...document.querySelectorAll("#help-list .faq-item")].map(el=>({el,keys:el.getAttribute("data-k")||""}));
    const none=document.getElementById("help-none");
    return ()=>{const q=inp.value||"";
      let vis=0;
      for(const it of items){const hit=!q.trim()||it.keys.toLowerCase().indexOf(q.trim().toLowerCase())>=0;it.el.classList.toggle("gs-hide",!hit);if(hit)vis++;}
      if(none)none.classList.toggle("hide",vis>0);
    };
  };
  try{inp.addEventListener("input",wire());}catch(_){}
}
function helpData(){return [
 [t("h1Q"),t("h1A"),t("h1Q")+" "+t("h1A")+" students add"],
 [t("h2Q"),t("h2A"),t("h2Q")+" "+t("h2A")+" undo撤销"],
 [t("h3Q"),t("h3A"),t("h3Q")+" "+t("h3A")+" box盲盒 mystery"],
 [t("h4Q"),t("h4A"),t("h4Q")+" "+t("h4A")+" negative负分"],
 [t("faq1Q"),t("faq1A"),t("faq1Q")+" "+t("faq1A")+" backup备份 storage local"],
 [t("faq2Q"),t("faq2A"),t("faq2Q")+" "+t("faq2A")+" free免费 price"],
 [t("faq3Q"),t("faq3A"),t("faq3Q")+" "+t("faq3A")+" level等级 wallet钱包"],
 [t("faq4Q"),t("faq4A"),t("faq4Q")+" "+t("faq4A")+" screen大屏 fullscreen F A"],
 [t("faq5Q"),t("faq5A"),t("faq5Q")+" "+t("faq5A")+" backup导出 export json"],
 [t("faq6Q"),t("faq6A"),t("faq6Q")+" "+t("faq6A")+" phone手机 mobile PWA"]
];}

/* ============ init (must run last) ============ */
if(!load())S=emptyState();
save();
applyMotion();
try{matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change",applyMotion);}catch(_){}
route();
