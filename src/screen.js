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

/* Task 11 fills this in; stub exists so the button is never a dead link. */
function openDrawer(){/* quick-award drawer (Task 11) */}

function renderScreen(){
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
        <button class="scr-btn" id="scrMute" aria-pressed="${soundOn}" aria-label="${t("ariSound")}" onclick="setSound(${!soundOn})">${soundOn?"🔊":"🔇"}</button>
        <button class="scr-btn" id="scrFull" aria-pressed="${full}" aria-label="${t("ariFull")}" onclick="toggleFullscreen()">⛶</button>
        <button class="scr-btn" id="scrDrawer" aria-label="${t("ariDrawer")}" onclick="openDrawer()">✨ ${t("screenDrawer")}</button>
        <a class="scr-btn" href="#/app/classroom" aria-label="${t("screenExit")}">✕ ${t("screenExit")}</a>
      </div>
    </header>
    <main class="scr-grid" id="scrGrid">${S.students.map(st=>`
      <div class="scr-tile" style="--h:${st.hue||200}">
        <span class="scr-name">${esc(st.name)}</span>
        <span class="scr-lv" id="scrlv-${esc(st.id)}"></span>
        <span class="scr-pts num" id="scrpts-${esc(st.id)}"></span>
        <div class="scr-bar"><i></i></div>
      </div>`).join("")}</main>
    <div id="scrLive" aria-live="polite" class="visually-hidden"></div>
    <div id="scrChip" hidden><button id="scrChipBtn" class="scr-btn"></button></div>
  </div>`;
}

try{
  document.addEventListener("fullscreenchange",()=>{
    if(location.hash==="#/screen"){const b=$("#scrFull");if(b)b.setAttribute("aria-pressed",document.fullscreenElement?"true":"false");}
  });
}catch(_){}
