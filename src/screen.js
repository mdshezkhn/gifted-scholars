/* ============ Big Screen mode (#/screen) — WP5 ============ */
/* Task 8 slice: shell, top bar, class goal. Tiles upgrade in Task 9; pops Task 10;
   drawer Task 11; keyboard Task 12. */

function classPosSince(fromTs){
  let n=0;
  for(const r of S.records){
    if(r.undone||r.value<=0)continue;
    if(fromTs&&r.ts<fromTs)continue;
    n+=r.value;
  }
  return n;
}

/* goalState — earned = lifetime-positive rules since Monday weekStart.
   Weekly basis (spec §6.1 flagged call): goal resets every Monday. */
function goalState(){
  const g=S.settings.goal||{};
  const enabled=g.enabled===true&&(+g.target>0);
  const ws=weekStart(Date.now(),0);
  const earned=classPosSince(ws);
  const target=+g.target||0;
  const pct=target>0?Math.min(100,Math.round(earned/target*100)):0;
  return {enabled,label:g.label||t("goalDefault"),target,earned,pct,left:Math.max(0,target-earned)};
}

function setSound(on){
  withState(()=>{S.settings.sound=on?"on":"off";});
  if(location.hash==="#/screen")renderScreen();
}

function toggleFullscreen(){
  try{
    if(document.fullscreenElement){if(document.exitFullscreen)document.exitFullscreen();}
    else if(document.documentElement&&document.documentElement.requestFullscreen)document.documentElement.requestFullscreen();
  }catch(_){}
}

function saveHideNeg(v){withState(()=>{S.settings.hideNeg=v===true;});}
function saveGoal(){
  withState(()=>{
    S.settings.goal=S.settings.goal||{};
    S.settings.goal.enabled=!!($("#goalEn")&&$("#goalEn").checked);
    S.settings.goal.label=(($("#goalLabel")&&$("#goalLabel").value)||"").trim();
    S.settings.goal.target=Math.max(0,parseInt(($("#goalTarget")&&$("#goalTarget").value)||"0",10)||0);
  });
  toast(t("goalSaved"));
  if(location.hash==="#/app/settings")viewSettings();
}

/* Task 11 fills this in; stub exists so the button is never a dead link. */
function openDrawer(){/* quick-award drawer (Task 11) */}

/* Task 9: student tile - binding type scale only (--scr-*), one-line names. */
function tileHTML(st){
  const g=growthOf(st),lp=lvlProgress(g),w=walletOf(st);
  const pct=lp.next?lp.pct:100;
  return `<div class="scr-tile" id="tile-${esc(st.id)}" style="--h:${st.hue||200}">
    <div class="scr-row1"><span class="scr-av" aria-hidden="true">${esc(initialOf(st.name))}</span><span class="scr-lv num" id="scrlv-${esc(st.id)}">${esc(LEVELS[lp.i].badge)} Lv ${lp.i+1}</span></div>
    <span class="scr-name" id="scrname-${esc(st.id)}">${esc(st.name)}</span>
    <span class="scr-pts num" id="scrpts-${esc(st.id)}">★ ${w}</span>
    <div class="scr-bar" role="progressbar" aria-label="${t("toNext")}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}" id="scrbar-${esc(st.id)}"><i style="width:${pct}%"></i></div>
  </div>`;
}

function renderScreen(){
  seenInit();
  const G=goalState();
  const soundOn=(S.settings.sound||"off")==="on";
  const full=typeof document!=="undefined"&&document.fullscreenElement?"true":"false";
  const cls=S.settings.className||t("defaultClassName");
  const goal=G.enabled?`
    <div class="scr-goal">
      <div class="scr-goal-head"><span class="scr-goal-label">${esc(G.label)}</span><span class="scr-goal-nums num">${t("goalNums",{e:G.earned,t2:G.target,l:G.left})}</span></div>
      <div class="scr-track" role="progressbar" aria-label="${t("ariGoal")}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${G.pct}"><i style="width:${G.pct}%"></i><b class="scr-rocket" style="left:calc(${G.pct}% - 20px)">🚀</b></div>
    </div>`:"";
  $("#view").innerHTML=`
  <div class="screen-root">
    <header class="scr-top">
      <div class="scr-id"><b class="scr-class">${esc(cls)}</b>${goal}</div>
      <div class="scr-btns">
        <span id="scrSoundChip" class="scr-chip" style="display:none">🔊 ${t("soundChip")}</span><button class="scr-btn" id="scrMute" aria-pressed="${soundOn}" aria-label="${t("ariSound")}" onclick="setSound(${!soundOn})">${soundOn?"🔊":"🔇"}</button>
        <button class="scr-btn" id="scrFull" aria-pressed="${full}" aria-label="${t("ariFull")}" onclick="toggleFullscreen()">⛶</button>
        <button class="scr-btn" id="scrDrawer" aria-label="${t("ariDrawer")}" onclick="openDrawer()">✨ ${t("screenDrawer")}</button>
        <button class="scr-btn" id="scrPick" onclick="pickOpen()">${t("pickBtn")}</button>
        <a class="scr-btn" href="#/app/classroom" aria-label="${t("screenExit")}">✕ ${t("screenExit")}</a>
      </div>
    </header>
    <main class="scr-grid" id="scrGrid">${S.students.map(tileHTML).join("")}</main>
    ${PICK_OPEN?`<div class="drw" id="pickOverlay"><div class="drw-card pickcard" role="dialog" aria-label="${t("pickTitle")}">
      <div class="drw-head"><strong>${t("pickTitle")}</strong><button class="scr-btn" onclick="pickClose()" aria-label="${t("close")}">✕</button></div>
      <div class="pickname num" id="pickName">${(byId(PICK_LAST)||{name:"—"}).name}</div>
      <div class="btns"><button class="btn primary" onclick="pickDraw()">${t("pickDraw")}</button></div>
    </div></div>`:""}
    <div id="scrLive" aria-live="polite" class="visually-hidden"></div>
    <div id="scrChip" hidden><button id="scrChipBtn" class="scr-btn"></button></div>
  </div>`;
  refreshSoundChip();
  ensureScreenListener();
}

try{
  document.addEventListener("fullscreenchange",()=>{
    if(location.hash==="#/screen"){const b=$("#scrFull");if(b)b.setAttribute("aria-pressed",document.fullscreenElement?"true":"false");}
  });
}catch(_){}

/* ---- Task 10: award pops (record-id driven) ---- */
let SCREEN_SEEN=null, LIVE_PARTICLES=0, AUDIO_OK=false, SCR_AUDIO=null, SCR_LISTENER=false;
const POP_FRESH_MS=10000, PARTICLE_CAP=150;

function seenInit(){
  if(SCREEN_SEEN)return;
  SCREEN_SEEN=new Set();
  for(const r of S.records){ if(!r.undone)SCREEN_SEEN.add(r.id); }
}
function popCandidates(){
  const now=Date.now(), out=[];
  for(const r of S.records){
    if(SCREEN_SEEN.has(r.id))continue;
    SCREEN_SEEN.add(r.id);
    if(r.undone)continue;                    /* undo never pops */
    if(now-r.ts>POP_FRESH_MS)continue;       /* too old: consumed silently */
    out.push(r);
  }
  return out;
}
function reserveParticles(n){
  const g=Math.min(n, Math.max(0, PARTICLE_CAP-LIVE_PARTICLES));
  LIVE_PARTICLES+=g; return g;
}
function releaseParticles(n){ LIVE_PARTICLES=Math.max(0, LIVE_PARTICLES-n); }
function motionOK(){ try{return document.documentElement.classList.contains("gs-motion");}catch(_){return false;} }

/* audio: browsers require a user gesture in the tab before WebAudio sounds */
function unlockAudio(){
  if(AUDIO_OK)return;
  try{
    const AC=window.AudioContext||window.webkitAudioContext;
    if(!AC)return;
    SCR_AUDIO=new AC();
    if(SCR_AUDIO.state==="suspended"&&SCR_AUDIO.resume)SCR_AUDIO.resume();
    AUDIO_OK=true;
  }catch(_){AUDIO_OK=false;}
  refreshSoundChip();
}
function soundChipNeeded(){ return (S.settings.sound||"off")==="on" && !AUDIO_OK; }
function chime(){
  try{
    if(!AUDIO_OK||!SCR_AUDIO||(S.settings.sound||"off")!=="on")return;
    const ctx=SCR_AUDIO, t0=ctx.currentTime||0;
    const o=ctx.createOscillator(), g=ctx.createGain();
    o.type="sine"; o.frequency.setValueAtTime(880,t0);
    o.frequency.setValueAtTime(1174,t0+0.09);
    g.gain.setValueAtTime(0.0001,t0);
    g.gain.exponentialRampToValueAtTime(0.18,t0+0.02);
    g.gain.exponentialRampToValueAtTime(0.0001,t0+0.5);
    o.connect(g); g.connect(ctx.destination);
    o.start(t0); o.stop(t0+0.55);
  }catch(_){}
}
function refreshSoundChip(){
  const el=document.querySelector("#scrSoundChip");
  if(el)el.style.display=soundChipNeeded()?"":"none";
}
function ensureScreenListener(){
  if(SCR_LISTENER)return; SCR_LISTENER=true;
  try{document.addEventListener("pointerdown",function(){ if(location.hash==="#/screen")unlockAudio(); },{passive:true});}catch(_){}
}

function spawnConfetti(tile,n){
  try{
    for(let i=0;i<n;i++){
      const d=document.createElement("i");
      d.className="scr-confetti";
      d.style.setProperty("--cx",(Math.random()*100)+"%");
      d.style.setProperty("--dx",((Math.random()*160-80))+"px");
      d.style.setProperty("--rot",((Math.random()*520-260))+"deg");
      d.style.setProperty("--dur",(0.9+Math.random()*0.9)+"s");
      d.style.setProperty("--hue",(Math.random()*60+20)+"");
      tile.appendChild(d);
      setTimeout(function(){ try{d.remove();}catch(_){} releaseParticles(1); },2400);
    }
  }catch(_){}
}

function applyPop(stId,rec){
  const pos=rec.value>0;
  if(!pos&&(S.settings.hideNeg===true))return null;   /* marker fully hidden */
  const tile=document.querySelector('[data-stu="'+stId+'"]');
  let particles=0, badge=false;
  if(pos){
    if(motionOK()){
      const want=24;
      particles=reserveParticles(want);
      if(particles<want)badge=true;                   /* over cap: badge carries the news */
      if(particles>0&&tile)spawnConfetti(tile,particles);
    }else badge=true;                                 /* reduced motion: badge only */
  }
  if(tile){
    try{
      tile.classList.add(pos?"pop-pos":"pop-neg");
      if(!pos)tile.setAttribute("data-popn",String(Math.abs(rec.value||1)));
      if(badge)tile.classList.add("pop-badge");
      setTimeout(function(){try{tile.classList.remove("pop-pos","pop-neg","pop-badge");}catch(_){}},2600);
    }catch(_){}
  }
  if(pos)chime();
  return {stId, sign:pos?"pos":"neg", particles, badge, quiet:!pos, sound:pos};
}

/* same-tab path: render + attach pops synchronously; returns descriptors (tests) */
function screenAfterChange(){
  ensureScreenListener();
  if(location.hash!=="#/screen"){ popCandidates(); return []; }
  const recs=popCandidates();
  renderScreen();
  const out=[];
  for(const r of recs){ for(const stId of (r.studentIds||[])){ const d=applyPop(stId,r); if(d)out.push(d); } }
  return out;
}

/* cross-tab path: onStorage re-renders AFTER callbacks, so attach pops one tick later */
onSync(function(){
  const recs=popCandidates();
  if(location.hash!=="#/screen")return;               /* ids consumed; no pops off-screen */
  setTimeout(function(){
    for(const r of recs){ for(const stId of (r.studentIds||[]))applyPop(stId,r); }
  },0);
});

/* ---- Task 11: two-tap quick-award drawer ---- */
let DRW_SEL=new Set(), DRW_OPEN=false;
function drawerIsOpen(){return DRW_OPEN===true;}
function drawerSelCount(){return DRW_SEL.size;}
function drawerToggle(id){
  const st=byId(id);if(!st)return;
  if(DRW_SEL.has(id))DRW_SEL.delete(id);else DRW_SEL.add(id);
  const el=document.querySelector('[data-drw="'+id+'"]');
  if(el)el.setAttribute("aria-pressed",DRW_SEL.has(id)?"true":"false");
  if(el)el.classList[DRW_SEL.has(id)?"add":"remove"]("drw-on");
  const hint=document.querySelector("#drwHint");
  if(hint)hint.textContent=t("pickSub",{n:DRW_SEL.size});
}
function drawerApply(ruleId){
  /* award even if drawer was closed programmatically */
  withState(function(){
    const rule=S.rules.find(r=>r.id===ruleId);          /* id re-lookup inside */
    if(!rule||!DRW_SEL.size)return;
    applyRule(rule,[...DRW_SEL]);
  });
  DRW_SEL=new Set();
  const pops=screenAfterChange();                        /* pops behind the drawer */
  if(location.hash==="#/screen"&&DRW_OPEN)openDrawer(true);
  return pops||[];
}
function drawerUndoLast(){
  withState(function(){
    const r=S.records.find(x=>x.undone===false);
    if(r)undoRecord(r);
  });
  toast(t("undoneToast"));
  screenAfterChange();
  if(location.hash==="#/screen"&&document.querySelector("#drwPanel"))openDrawer(true);
}
function closeDrawer(){
  const el=document.querySelector("#drwPanel");
  if(el)try{el.remove();}catch(_){}
  DRW_SEL=new Set();DRW_OPEN=false;
}
function openDrawer(keepSel){
  closeDrawer();
  DRW_OPEN=true;
  const rules=S.rules.filter(r=>r.active!==false);
  const wrap=document.createElement("div");
  wrap.id="drwPanel";
  wrap.className="drw";
  wrap.setAttribute("role","dialog");
  wrap.setAttribute("aria-label",t("screenDrawer"));
  wrap.innerHTML=`
    <div class="drw-card stk">
      <div class="drw-head">
        <b>✨ ${t("screenDrawer")}</b>
        <span class="sub" id="drwHint">${t("pickSub",{n:DRW_SEL.size})}</span>
        <button class="scr-btn" aria-label="${t("close")}" onclick="closeDrawer()">✕</button>
      </div>
      <div class="drw-stus" role="group" aria-label="${t("students")}">
        ${S.students.map(st=>`<button type="button" class="drw-stu${DRW_SEL.has(st.id)?" drw-on":""}" data-drw="${st.id}"
          aria-pressed="${DRW_SEL.has(st.id)?"true":"false"}" onclick="drawerToggle('${st.id}')">
          <span class="drw-av" style="background:hsl(${st.hue},55%,82%)">${esc(initialOf(st.name))}</span>
          <span class="drw-nm">${esc(st.name)}</span><span class="drw-pt">★${walletOf(st)}</span>
        </button>`).join("")}
      </div>
      <div class="drw-rules" role="group" aria-label="${t("rate")}">
        ${rules.map(r=>`<button type="button" class="drw-rule${r.value<0?" drw-neg":""}" onclick="drawerApply('${r.id}')">
          <span class="drw-ic">${r.icon}</span><span>${esc(nm(r))}</span><b>${r.value>0?"+":""}${r.value}</b>
        </button>`).join("")}
      </div>
      <div class="drw-foot">
        <button type="button" class="drw-undo" onclick="drawerUndoLast()">↩︎ ${t("undoLast")}</button>
      </div>
    </div>`;
  try{document.querySelector("#view").appendChild(wrap);}catch(_){}
}

/* ---- random picker (fair bag) ---- */
let PICK_OPEN=false, PICK_BAG=null, PICK_LAST=null;
function pickIsOpen(){return PICK_OPEN===true;}
function shuffleBag(){const b=S.students.map(x=>x.id);for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}
function pickOpen(){PICK_OPEN=true;PICK_BAG=shuffleBag();PICK_LAST=null;renderScreen();}
function pickClose(){PICK_OPEN=false;renderScreen();}
function pickDraw(silent){
  if(!PICK_BAG||!PICK_BAG.length){PICK_BAG=shuffleBag();if(!silent)toast(t("pickAll"));}
  const id=PICK_BAG.pop();const st=byId(id);PICK_LAST=id;
  const nm=document.getElementById("pickName");
  if(nm&&st)nm.textContent=st.name;
  const lv=document.getElementById("scrLive");
  if(lv&&st)lv.textContent=t("pickPicked")+": "+st.name;
  return id;
}
/* ---- Task 12: keyboard shortcuts A / F / Esc (guarded) ---- */
function isTyping(el){
  if(!el||!el.tagName)return false;
  const tg=String(el.tagName).toUpperCase();
  if(tg==="TEXTAREA"||tg==="SELECT")return true;
  if(tg==="INPUT"){
    const ty=String(el.type||"text").toLowerCase();
    return ["checkbox","radio","button","submit","reset","file","range","color","image"].indexOf(ty)<0;
  }
  return el.isContentEditable===true;
}
function scrKeydown(e){
  if(!e)return;
  if(e.ctrlKey||e.metaKey||e.altKey)return;   /* plain keys only */
  if(e.isComposing)return;                    /* IME mid-composition */
  if(isTyping(e.target))return;               /* typing in a field wins */
  const key=String(e.key||"");
  if(location.hash==="#/screen"){
    if(key==="a"||key==="A"){openDrawer();if(e.preventDefault)e.preventDefault();return;}
    if(key==="f"||key==="F"){toggleFullscreen();if(e.preventDefault)e.preventDefault();return;}
  }
  if(key==="Escape"){if(PICK_OPEN){pickClose();if(e.preventDefault)e.preventDefault();return;}if(drawerIsOpen()){closeDrawer();if(e.preventDefault)e.preventDefault();}}
}
try{document.addEventListener("keydown",scrKeydown);}catch(_){}
