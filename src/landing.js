/* ======================================================================
   Gifted Scholars — landing scene controller
   Gaze math and burst engine are faithful ports of the supplied reference
   (lib/gaze.ts + GardenPlay.tsx, checkpoint b9635744): same dead zone,
   damping constants, settle threshold, burst geometry and limits. The
   reference drives video seeks; here the same smoothed angle drives the
   character's inset pupils (necessary adaptation: this brand's character
   is an original SVG, not the reference video).
   ====================================================================== */
const GS_LEAF = '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M7 24C2 12 11 5 26 5C28 20 19 29 7 24Z" fill="currentColor" fill-opacity=".28"/><path d="M7 24C2 12 11 5 26 5C28 20 19 29 7 24ZM5 28L22 10M12 21L11 14M16 17L23 17" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const GS_SPARKLE = '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 3C16 12 12 16 3 16C12 16 16 20 16 29C16 20 20 16 29 16C20 16 16 12 16 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';
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

const GS_WORDMARK = `
<svg viewBox="0 0 560 116" role="img" aria-label="Gifted Scholars">
  <text x="6" y="88" font-family="Epilogue, sans-serif" font-weight="900" font-size="94"
    letter-spacing="-2.5" fill="currentColor" textLength="540" lengthAdjust="spacingAndGlyphs">gifted scholars</text>
  <g class="gs-brand-leaf"><path d="M84 22C70 20 65 10 70 1c13 1 21 10 14 21Z" fill="currentColor"/></g>
</svg>`;

function gsAccents(){
  return '<div class="gs-accents" aria-hidden="true">'
    +'<span class="gs-bot gs-bot-a">'+GS_LEAF+'</span>'
    +'<span class="gs-bot gs-bot-b">'+GS_SPARKLE+'</span>'
    +'<span class="gs-bot gs-bot-c">'+GS_LEAF+'</span>'
    +'<span class="gs-bot gs-bot-d">'+GS_SPARKLE+'</span>'
    +'</div>';
}
function gsBadges(){
  return '<div class="gs-socials" aria-label="Our promises">'
    +'<span role="img" aria-label="Free forever"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="2.4" stroke="currentColor" stroke-width="1.8"/><path d="M4 13.4h16M12 10v10" stroke="currentColor" stroke-width="1.8"/><path d="M12 10C8.2 10 6.6 7.6 8 6c1.4-1.6 3.4-.4 4 4 .6-4.4 2.6-5.6 4-4 1.4 1.6-.2 4-4 4Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></span>'
    +'<span role="img" aria-label="Made with care"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20s-7-4.4-9-9c-1.2-2.8.6-6 3.8-6C9 5 10.8 6.3 12 8c1.2-1.7 3-3 5.2-3 3.2 0 5 3.2 3.8 6-2 4.6-9 9-9 9Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg></span>'
    +'<span role="img" aria-label="For students"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3.5l2.6 5.3 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.8L12 3.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg></span>'
    +'</div>';
}

function renderLanding(){
  document.title="Gifted Scholars — little stars. big smiles.";
  if(window._gsGazeCleanup)window._gsGazeCleanup();
  if(window._gsBurstCleanup)window._gsBurstCleanup();
  $("#view").innerHTML=`
  <footer class="gs-page" aria-label="Gifted Scholars brand experience">
    <div class="gs-scene" aria-hidden="true">${GS_CHAR_SVG}${gsAccents()}</div>
    <div class="gs-bursts" aria-hidden="true"></div>
    <div class="gs-brand" role="img" aria-label="Gifted Scholars">
      <div class="gs-brand-reveal">${GS_WORDMARK}</div>
    </div>
    <div class="gs-left">
      <span class="gs-pill">room for a little kindness?</span>
      <h1 class="gs-headline"><span class="gs-line"><span>little stars.</span></span><span class="gs-line"><span>big smiles.</span></span></h1>
      <nav class="gs-topics" aria-label="Explore Gifted Scholars">
        <a href="#/app/classroom"><span>The classroom</span></a>
        <a href="#/app/shop"><span>Gift shop</span></a>
        <a href="#/app/leaderboard"><span>Leaderboard</span></a>
        <button type="button" onclick="openRoomPicker()"><span>Open a gift room</span></button>
      </nav>
    </div>
    <div class="gs-right">
      <span class="gs-pill">points in. presents out.</span>
      <h2 class="gs-headline"><span class="gs-line"><span>a little star.</span></span><span class="gs-line"><span>a lot of heart.</span></span></h2>
      <p class="gs-note">*free forever — a gift from Teacher Mo to ZhongFangYuan Bilingual School.</p>
      ${gsBadges()}
    </div>
    <p class="gs-credit">© 2026 Mohammed Shehzad Khan · a free gift to ZhongFangYuan Bilingual School, never for sale · <a href="#/" onclick="openLicense();return false">license &amp; credit</a></p>
  </footer>`;
  initGaze();
  initBursts();
  window.scrollTo(0,0);
}

/* ---------- open a gift room by student name ---------- */
function openRoomPicker(){
  modal(`<div class="card stk" style="max-width:420px"><h2 style="font-family:var(--font-round)">Open a gift room</h2>
  <p style="margin:8px 0 14px;color:var(--ink-soft)">Type your name exactly as your teacher wrote it.</p>
  <input id="rp-name" placeholder="Your name" style="width:100%;padding:12px 14px;border:var(--bd);border-radius:12px;font-size:16px" aria-label="Your name">
  <div class="btns" style="margin-top:14px"><button class="btn ghost" onclick="closeOverlays()">Cancel</button><button class="btn primary" id="rp-go">Open my room</button></div></div>`);
  const openIt=()=>{
    const q=($("#rp-name").value||"").trim().toLowerCase();
    if(!q){toast("Type your name first");return;}
    const st=S.students.find(x=>x.name.toLowerCase()===q)||S.students.find(x=>x.name.toLowerCase().startsWith(q));
    if(!st){toast("No student named \u201C"+$("#rp-name").value.trim()+"\u201D in the demo class");return;}
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
  <p style="margin-top:10px">This site was created by <b>Mohammed Shehzad Khan</b> ("Teacher Mo") and donated as a free gift to ZhongFangYuan Bilingual School. It will always be free: no fees, no ads, no tracking, nothing for sale.</p>
  <p style="margin-top:10px"><b>Ownership.</b> The site, its code, design and artwork remain the property of the author. Donating it to the school does not transfer copyright. The school may keep using it for everyday school life, free of charge, even after the author moves on.</p>
  <p style="margin-top:10px">The school may use it forever, for free, even if the author moves on. <b>You may not</b> sell, charge for, or relicense this work, and the credit in the footer must stay. The author owns this work and may update it or share it with other schools. If these terms are broken, this license ends automatically.</p>
  <p style="margin-top:10px">Fonts: Epilogue &amp; DM Sans (SIL Open Font License). Provided “as is”, without warranty of any kind.</p>
  </div>
  <div class="btns" style="margin-top:14px"><button class="btn primary" onclick="closeOverlays()">Close</button></div></div>`);
}

/* ---------- gaze: smoothed cursor-following pupils (ported math) ---------- */
const GS_TAU=Math.PI*2;
const gsNorm=a=>((a%GS_TAU)+GS_TAU)%GS_TAU;
const gsDelta=(from,to)=>gsNorm(to-from+Math.PI)-Math.PI;
const gsDist=(a,b)=>Math.abs(gsDelta(a,b));
function gsDamp(current,target,elapsedMs){
  const delta=gsDelta(current,target);
  if(Math.abs(delta)<0.003)return gsNorm(target);
  const dt=Math.max(0,Math.min(elapsedMs,40));
  const amount=Math.min(Math.abs(delta)*-Math.expm1(-dt/85),dt*0.01);
  return gsNorm(current+Math.sign(delta)*amount);
}
const GS_REST=-Math.PI/2;            // a gentle upward glance at rest
const GS_PUPIL_RX=13,GS_PUPIL_RY=10; // travel inside the sculpted sockets

function initGaze(){
  const char=$("#gs-char");if(!char)return;
  const pupils=[char.querySelector("#gs-pupil-l"),char.querySelector("#gs-pupil-r")];
  const narrow=matchMedia("(max-width: 700px)");
  const reduced=matchMedia("(prefers-reduced-motion: reduce)");
  const fine=matchMedia("(hover: hover) and (pointer: fine)");
  let raf=0,disposed=false,mode="",pointer=null,eye=null,geoDirty=true;
  let targetAngle=null,easedAngle=null,lastTick=0;
  const apply=(x=0,y=-6)=>pupils.forEach(p=>p&&p.setAttribute("transform","translate("+x.toFixed(2)+","+y.toFixed(2)+")"));
  const currentMode=()=> (reduced.matches||narrow.matches||!fine.matches)?"still":"gaze";
  const schedule=()=>{if(!disposed&&!document.hidden&&!raf&&mode==="gaze")raf=requestAnimationFrame(tick);};
  function tick(now){
    raf=0;
    if(disposed||document.hidden||mode!=="gaze")return;
    const elapsed=lastTick?now-lastTick:1000/60;lastTick=now;
    if(pointer){
      if(geoDirty||!eye){
        const rect=char.getBoundingClientRect();       // svg keeps its viewBox aspect, so scale is uniform
        const scale=rect.width/520;
        eye={x:rect.left+260*scale,y:rect.top+330*scale}; // eye midpoint in viewBox coordinates
        geoDirty=false;
      }
      const dx=pointer.x-eye.x,dy=pointer.y-eye.y;
      // Ignore jitter immediately between the eyes, where angle is unstable.
      if(Math.hypot(dx,dy)>22)targetAngle=Math.atan2(dy,dx);
    }
    if(targetAngle===null){easedAngle=null;apply();return;}
    if(easedAngle===null)easedAngle=GS_REST;
    easedAngle=gsDamp(easedAngle,targetAngle,elapsed);
    apply(Math.cos(easedAngle)*GS_PUPIL_RX,Math.sin(easedAngle)*GS_PUPIL_RY-6);
    if(gsDist(easedAngle,targetAngle)>0.00001)schedule();
    else{easedAngle=gsNorm(targetAngle);apply(Math.cos(easedAngle)*GS_PUPIL_RX,Math.sin(easedAngle)*GS_PUPIL_RY-6);}
  }
  const onPointer=event=>{if(event.pointerType==="touch"||mode!=="gaze")return;pointer={x:event.clientX,y:event.clientY};schedule();};
  const onGeometry=()=>{geoDirty=true;if(mode==="gaze")schedule();};
  const applyMode=()=>{
    const next=currentMode();
    if(next!==mode){targetAngle=null;easedAngle=null;lastTick=0;geoDirty=true;apply();}
    mode=next;schedule();
  };
  const onVisibility=()=>{lastTick=0;if(document.hidden){cancelAnimationFrame(raf);raf=0;}else applyMode();};
  window.addEventListener("pointermove",onPointer,{passive:true});
  window.addEventListener("resize",onGeometry,{passive:true});
  window.addEventListener("scroll",onGeometry,{passive:true});
  document.addEventListener("visibilitychange",onVisibility);
  narrow.addEventListener("change",applyMode);reduced.addEventListener("change",applyMode);fine.addEventListener("change",applyMode);
  const observer=new ResizeObserver(onGeometry);observer.observe(char);
  applyMode();
  window._gsGazeCleanup=()=>{
    disposed=true;cancelAnimationFrame(raf);raf=0;observer.disconnect();
    window.removeEventListener("pointermove",onPointer);window.removeEventListener("resize",onGeometry);
    window.removeEventListener("scroll",onGeometry);document.removeEventListener("visibilitychange",onVisibility);
    narrow.removeEventListener("change",applyMode);reduced.removeEventListener("change",applyMode);fine.removeEventListener("change",applyMode);
  };
}

/* ---------- click / tap leaf bursts (ported from GardenPlay) ---------- */
function initBursts(){
  const page=$(".gs-page"),layer=$(".gs-bursts");if(!page||!layer)return;
  const reduced=matchMedia("(prefers-reduced-motion: reduce)");
  let down=null,sequence=0;
  const timers=new Map();
  const onDown=event=>{if(event.button!==0||!event.isPrimary)return;down={x:event.clientX,y:event.clientY,id:event.pointerId};};
  const cancel=()=>{down=null;};
  const onUp=event=>{
    const origin=down;down=null;
    if(!origin||event.pointerId!==origin.id||reduced.matches||Math.hypot(event.clientX-origin.x,event.clientY-origin.y)>10)return;
    if(event.target&&event.target.closest&&event.target.closest("a,button,input,textarea,select"))return;
    const rect=layer.getBoundingClientRect();
    const id=++sequence;
    const bloom=document.createElement("div");bloom.className="gs-bloom";
    bloom.style.left=(event.clientX-rect.left)+"px";bloom.style.top=(event.clientY-rect.top)+"px";
    for(let index=0;index<6;index++){
      const angle=index/6*Math.PI*2;
      const radius=index%2===0?48:34;
      const petal=document.createElement("span");petal.className="gs-petal";
      petal.style.setProperty("--petal-x",(Math.cos(angle)*radius).toFixed(2)+"px");
      petal.style.setProperty("--petal-y",(Math.sin(angle)*radius-22).toFixed(2)+"px");
      petal.style.setProperty("--petal-turn",(index%2?85:-65)+"deg");
      petal.style.setProperty("--petal-delay",(index*15)+"ms");
      petal.innerHTML=GS_LEAF;
      bloom.appendChild(petal);
    }
    while(layer.children.length>=4)layer.firstElementChild.remove();  // at most four simultaneous bursts
    layer.appendChild(bloom);
    timers.set(id,setTimeout(()=>{bloom.remove();timers.delete(id);},1050));
  };
  const clearIfReduced=()=>{
    if(!reduced.matches)return;
    timers.forEach(clearTimeout);timers.clear();layer.innerHTML="";down=null;
  };
  page.addEventListener("pointerdown",onDown,{passive:true});
  page.addEventListener("pointerup",onUp,{passive:true});
  page.addEventListener("pointercancel",cancel,{passive:true});
  reduced.addEventListener("change",clearIfReduced);
  window._gsBurstCleanup=()=>{
    timers.forEach(clearTimeout);timers.clear();
    page.removeEventListener("pointerdown",onDown);
    page.removeEventListener("pointerup",onUp);
    page.removeEventListener("pointercancel",cancel);
    reduced.removeEventListener("change",clearIfReduced);
  };
}
