# Task 10 implementation: pops, particles, sound, chip, hideNeg (atomic writes)
import io, os

def aw(p, s):
    io.open(p + ".tmp", "w", encoding="utf-8", newline="").write(s)
    os.replace(p + ".tmp", p)

# ---------- screen.js: pop engine ----------
p = "screen.js"
s = io.open(p, encoding="utf-8").read()

# 1) renderScreen initialises the seen set on first render (reload-safe)
a = "function renderScreen(){\n  const G=goalState();"
assert s.count(a) == 1
s = s.replace(a, "function renderScreen(){\n  seenInit();\n  const G=goalState();")

# 2) engine appended at end
s += """
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
"""

# 3) top bar: sound chip element (hidden unless needed) + init listener
a2 = '<button class="scr-btn" id="scrMute"'
assert s.count(a2) == 1
s = s.replace(a2, '<span id="scrSoundChip" class="scr-chip" style="display:none">🔊 '+ '"+t("soundChip")+"'+ '</span>' + a2, 1)

aw(p, s)
print("screen.js patched")

# ---------- app-core.js: settings hideNeg + saveHideNeg ----------
p = "app-core.js"
s = io.open(p, encoding="utf-8").read()
a = "function saveGoal(){"
assert s.count(a) == 1
s = s.replace(a, "function saveHideNeg(v){withState(()=>{S.settings.hideNeg=v===true;});}\n" + a)
aw(p, s)
print("app-core patched (saveHideNeg)")
