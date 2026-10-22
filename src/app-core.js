"use strict";
/* ================================================================
   Gifted Scholars: single-file classroom points & virtual gifts app
   Data model adapted from reverse-engineering learn-fun.cn (see
   rea-learnfun/REPORT.md): dual ledger, approval queue, mystery box,
   level curve [0,5,12,22,35,50,70,95,125,160], undoable records.
   ================================================================ */


/* ============ state & persistence ============ */
const LS_KEY = "gifted-scholars-v1";
const LEVELS = [
  {min:0,  name:"Ribbon Rookie",zh:"缎带新秀",   badge:"🎀"},
  {min:5,  name:"Star Wrapper",zh:"包裹新星",    badge:"⭐"},
  {min:12, name:"Bright Giver",zh:"闪亮馈赠者",    badge:"🎖"},
  {min:22, name:"Silver Bow",zh:"银蝴蝶结",      badge:"🥈"},
  {min:35, name:"Gold Bow",zh:"金蝴蝶结",        badge:"🥇"},
  {min:50, name:"Gem Giver",zh:"宝石馈赠者",       badge:"💎"},
  {min:70, name:"Crown Collector",zh:"王冠收藏家", badge:"👑"},
  {min:95, name:"Rocket Giver",zh:"火箭馈赠者",    badge:"🚀"},
  {min:125,name:"Rainbow Patron",zh:"彩虹守护者",  badge:"🌈"},
  {min:160,name:"Hall of Gifts",zh:"礼物殿堂",   badge:"🏆"}
];
const BOX_POOL = [
  {name:"Cap",zh:"棒球帽",emoji:"🧢",rar:"common"},{name:"Top hat",emoji:"🎩",rar:"common"},
  {name:"Lollipop",zh:"棒棒糖",emoji:"🍭",rar:"common"},{name:"Balloon",emoji:"🎈",rar:"common"},
  {name:"Puzzle",zh:"拼图",emoji:"🧩",rar:"common"},
  {name:"Unicorn",zh:"独角兽",emoji:"🦄",rar:"rare"},{name:"Rocket ride",emoji:"🚀",rar:"rare"},
  {name:"Air guitar",zh:"空气吉他",emoji:"🎸",rar:"rare"},{name:"Magic wand",emoji:"🪄",rar:"rare"},
  {name:"Royal crown",zh:"皇冠",emoji:"👑",rar:"epic"},{name:"Double rainbow",emoji:"🌈",rar:"epic"},
  {name:"Baby dragon",zh:"宝宝龙",emoji:"🐉",rar:"epic"}
];
const BOX_PRICE = 12;
const DEFAULT_RULES = [
  {id:"r1",label:"Raised hand",zh:"积极举手",icon:"✋",value:1},
  {id:"r2",label:"Answered well",zh:"答得好",icon:"💡",value:2},
  {id:"r3",label:"Helped a classmate",zh:"帮助同学",icon:"🤝",value:2},
  {id:"r4",label:"Great homework",zh:"作业优秀",icon:"📓",value:3},
  {id:"r5",label:"Clear improvement",zh:"进步明显",icon:"📈",value:3},
  {id:"r6",label:"Read a book",zh:"阅读打卡",icon:"📖",value:1},
  {id:"r7",label:"Tidy desk",zh:"整洁书桌",icon:"🧹",value:1},
  {id:"r8",label:"Tardy",zh:"迟到",icon:"⏰",value:-1},
  {id:"r9",label:"Off task",zh:"上课走神",icon:"🌀",value:-2},
  {id:"r10",label:"Missing homework",zh:"作业未交",icon:"❓",value:-2}
];
const DEFAULT_GIFTS = [
  {id:"g1", emoji:"⭐",name:"Sticker pack",zh:"贴纸包",      desc:"A sheet of shiny gold stars",price:3, stock:null,per:0},
  {id:"g2", emoji:"🪴",name:"Plant waterer",zh:"浇水员",     desc:"Water the class plants for a week",price:4,stock:null,per:0},
  {id:"g3", emoji:"🚩",name:"Line leader",zh:"领队",       desc:"Lead the class line for a day",price:5,stock:null,per:2},
  {id:"g4", emoji:"📖",name:"Pick the story",zh:"选故事",    desc:"Choose tomorrow's story book",price:6,stock:null,per:1},
  {id:"g5", emoji:"🪑",name:"Sit with a friend",zh:"和朋友同桌", desc:"One afternoon, any seat you like",price:8,stock:null,per:2},
  {id:"g6", emoji:"🎤",name:"Show and tell",zh:"展示分享",     desc:"Reserve a show-and-tell slot",price:8,stock:4,per:1},
  {id:"g7", emoji:"🎵",name:"Class DJ",zh:"班级DJ",          desc:"Pick three songs for quiet work time",price:10,stock:null,per:1},
  {id:"g8", emoji:"🎖",name:"Helper badge",zh:"助手徽章",      desc:"Wear the teacher's helper badge for a day",price:10,stock:6,per:1},
  {id:"g9", emoji:"🎫",name:"Homework pass",zh:"作业通行证",     desc:"Skip one homework night, guilt free",price:12,stock:3,per:1},
  {id:"g10",emoji:"🧰",name:"Treasure box pick",zh:"百宝箱", desc:"One pick from the real treasure box",price:15,stock:5,per:1},
  {id:"g11",emoji:"🎲",name:"Board game Friday",zh:"桌游周五", desc:"Bring a board game for Friday choice time",price:20,stock:null,per:1}
];
const SEED_STUDENTS = ["Amelia","Bhavya","Chen","Dina","Emeka","Farah","Gabriel","Hana","Ibrahim","Jade","Kofi","Lena","Mateo","Nia","Omar","Priya"];

let S = null;                 // app state
let sel = new Set();          // classroom multi-select
let ui = {board:"all"};

const $ = (s,el)=> (el||document).querySelector(s);
const $$ = (s,el)=> Array.from((el||document).querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const uid = () => "x"+Math.random().toString(36).slice(2,9);
const HUES = [12,45,95,150,185,210,260,300,330];

function hueOf(str){let h=0;for(const c of str)h=(h*31+c.charCodeAt(0))%997;return HUES[h%HUES.length];}
function fmtDT(ts){const d=new Date(ts);return d.toLocaleDateString(LOCALE(),{month:"short",day:"numeric"})+" "+d.toLocaleTimeString(LOCALE(),{hour:"2-digit",minute:"2-digit"});}
function weekStart(ts,back){const d=new Date(ts);const day=(d.getDay()+6)%7;d.setHours(0,0,0,0);d.setDate(d.getDate()-day-(back||0)*7);return d.getTime();}

/* ---- derived ledgers ---- */
function netOf(st,fromTs){let n=0;for(const r of S.records){if(r.undone)continue;if(fromTs&&r.ts<fromTs)continue;if(r.studentIds.includes(st.id))n+=r.value;}return n;}
function growthOf(st){return netOf(st);}
function spentOf(st){let sp=0;for(const q of S.requests){if(q.status!=="approved")continue;if(q.studentId!==st.id)continue;sp+=q.cost;}return sp;}
function walletOf(st){return Math.max(0,growthOf(st)-spentOf(st)-(S.boxSpent[st.id]||0));}
function levelOf(g){let i=0;for(let k=0;k<LEVELS.length;k++){if(g>=LEVELS[k].min)i=k;}return i;}
function lvlProgress(g){const i=levelOf(g);if(i>=LEVELS.length-1)return {i,pct:100,next:null};const a=LEVELS[i].min,b=LEVELS[i+1].min;return {i,pct:Math.min(100,Math.round(((g-a)/(b-a))*100)),next:LEVELS[i+1]};}
function collectionOf(id){return S.collection[id]||[];}

/* ---- persistence ---- */
function save(){localStorage.setItem(LS_KEY,JSON.stringify(S));}
function load(){
  try{const raw=localStorage.getItem(LS_KEY);if(raw){S=JSON.parse(raw);if(S&&S.students&&S.rules&&S.gifts&&S.records)return true;}}catch(e){}
  return false;
}
function seed(){
  // deterministic demo history so leaderboards and shelves have shape
  let rngState=42;const rng=()=>{rngState=(rngState*1103515245+12345)%2147483648;return rngState/2147483648;};
  S={version:1,
    settings:{className:"Class 4B",schoolName:"Maple Grove Primary",teacher:"Ms. Rivera",motion:"auto"},
    rules:DEFAULT_RULES.map(r=>({...r})),
    gifts:DEFAULT_GIFTS.map(g=>({...g})),
    students:[],records:[],requests:[],collection:{},boxSpent:{}};
  SEED_STUDENTS.forEach((n,i)=>S.students.push({id:"s"+(i+1),name:n,hue:HUES[i%HUES.length]}));
  const now=Date.now(),day=864e5;
  for(let d=9;d>=0;d--){                       // ten school days of history
    const nEv=6+Math.floor(rng()*8);
    for(let e=0;e<nEv;e++){
      const rule=S.rules[Math.floor(rng()*S.rules.length)];
      const howMany=1+Math.floor(rng()*3);
      const picked=[];
      while(picked.length<howMany){const st=S.students[Math.floor(rng()*S.students.length)];if(!picked.includes(st.id))picked.push(st.id);}
      S.records.push({id:uid(),ts:now-d*day-Math.floor(rng()*6)*36e5,studentIds:picked,ruleId:rule.id,ruleLabel:(LANG==="zh"&&rule.zh?rule.zh:rule.label)+" "+rule.icon,value:rule.value,undone:false});
    }
  }
  const gifters=[S.students[2],S.students[5],S.students[8],S.students[11],S.students[14]];
  gifters.forEach((st,i)=>{
    const g=S.gifts[i%3];
    S.requests.push({id:uid(),studentId:st.id,itemId:g.id,itemLabel:g.emoji+" "+g.name,cost:g.price,status:"approved",note:"",ts:now-(i+2)*day,decidedTs:now-(i+2)*day+36e5});
    S.collection[st.id]=S.collection[st.id]||[];
    S.collection[st.id].push({name:g.name,emoji:g.emoji,rar:"common",source:"shop",ts:now-(i+2)*day});
  });
  S.collection[S.students[4].id]=[{name:"Unicorn",zh:"独角兽",emoji:"🦄",rar:"rare",source:"box",ts:now-2*day}];
  S.records.sort((a,b)=>b.ts-a.ts);
  save();
}

/* ---- mutations ---- */
function byId(id){return S.students.find(s=>s.id===id);}
function giftById(id){return S.gifts.find(g=>g.id===id);}
function applyRule(rule,ids){
  const prev={};ids.forEach(id=>prev[id]=levelOf(growthOf(byId(id))));
  S.records.unshift({id:uid(),ts:Date.now(),studentIds:[...ids],ruleId:rule.id,ruleLabel:(LANG==="zh"&&rule.zh?rule.zh:rule.label)+" "+rule.icon,value:rule.value,undone:false});
  save();
  ids.forEach(id=>{const now=lvlProgress(growthOf(byId(id))).i;if(now>prev[id])queueLevelUp(byId(id),now);});
}
function undoRecord(rec){rec.undone=true;save();}
function requestGift(stId,gift){
  S.requests.unshift({id:uid(),studentId:stId,itemId:gift.id,itemLabel:gift.emoji+" "+(LANG==="zh"&&gift.zh?gift.zh:gift.name),cost:gift.price,status:"pending",note:"",ts:Date.now()});
  save();
}
function decide(req,ok){
  if(req.status!=="pending")return;
  if(ok){
    req.status="approved";req.decidedTs=Date.now();
    const g=giftById(req.itemId);
    if(g){g.stock=(g.stock==null)?null:g.stock-1;S.collection[req.studentId]=S.collection[req.studentId]||[];S.collection[req.studentId].push({name:(LANG==="zh"&&g.zh?g.zh:g.name),emoji:g.emoji,rar:"common",source:"shop",ts:Date.now()});}
  }else{req.status="declined";req.decidedTs=Date.now();}
  save();
}
function openBox(stId){
  const st=byId(stId);
  if(walletOf(st)<BOX_PRICE)return null;
  const roll=Math.random();
  const pool=roll<.6?BOX_POOL.filter(x=>x.rar==="common"):roll<.9?BOX_POOL.filter(x=>x.rar==="rare"):BOX_POOL.filter(x=>x.rar==="epic");
  const won=pool[Math.floor(Math.random()*pool.length)];
  S.boxSpent[stId]=(S.boxSpent[stId]||0)+BOX_PRICE;
  S.collection[stId]=S.collection[stId]||[];
  S.collection[stId].push({...won,source:"box",ts:Date.now()});
  save();return won;
}

/* ============ router ============ */
function route(){
  const h=location.hash||"#/";
  closeOverlays();
  if(window._gsLandCleanup)window._gsLandCleanup();
  if(h.startsWith("#/room/")){const id=decodeURIComponent(h.slice(7));renderRoom(byId(id)?id:null);return;}
  if(h.startsWith("#/app")){
    const tab=(h.split("/")[2]||"classroom");
    renderShell(["classroom","records","shop","leaderboard","settings"].includes(tab)?tab:"classroom");
    return;
  }
  renderLanding();
}
window.addEventListener("hashchange",route);

function go(hash){location.hash=hash;}

/* ============ toasts / overlays ============ */
function toast(msg){
  const t=document.createElement("div");t.className="toast";t.textContent=msg;
  $("#toasts").appendChild(t);
  setTimeout(()=>{t.style.opacity="0";t.style.transition="opacity .3s";},1900);
  setTimeout(()=>t.remove(),2300);
}
function applyMotion(){
  const m=(S.settings&&S.settings.motion)||"auto";
  const rm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.toggle("gs-motion", m==="on"||(m==="auto"&&!rm));
}
function saveMotion(v){S.settings.motion=v;save();applyMotion();}
window.addEventListener("error",function(e){
  if(window.__gsErrShown)return; window.__gsErrShown=true;
  try{toast("Something went wrong, but your data is safe. (Details in browser console.)");}catch(_){}
});
function closeOverlays(){$("#modals").innerHTML="";$$(".burst,.lvlup").forEach(e=>e.remove());}
function modal(html){
  $("#modals").innerHTML='<div class="overlay" role="dialog" aria-modal="true">'+html+'</div>';
  const ov=$("#modals .overlay");
  ov.addEventListener("click",e=>{if(e.target===ov)closeOverlays();});
  const f=ov.querySelector("button,input,select,a");if(f)f.focus();
}
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeOverlays();});

let levelUpQueue=[];
function queueLevelUp(st,lv){levelUpQueue.push({st,lv});}
function flushLevelUps(){
  if(!levelUpQueue.length)return;
  const {st,lv}=levelUpQueue.shift();
  const L=LEVELS[lv];
  const el=document.createElement("div");el.className="lvlup";
  el.innerHTML='<div class="card stk"><span class="medal">'+L.badge+'</span><h2 style="font-family:var(--font-round)">Level '+(lv+1)+'!</h2><p style="margin-top:6px"><b>'+esc(st.name)+'</b> reached <b>'+esc(nm(L))+'</b></p><div class="btns" style="justify-content:center"><button class="btn gold" onclick="this.closest(\'.lvlup\').remove();flushLevelUps()">${t("celebrate")}</button></div></div>';
  el.addEventListener("click",e=>{if(e.target===el){el.remove();flushLevelUps();}});
  document.body.appendChild(el);
}
function giftBurst(won,after){
  const el=document.createElement("div");el.className="burst";
  const cols=["#E9A93D","#186F65","#D95A3F","#FBF0DA"];
  let conf="";for(let i=0;i<16;i++){const x=(Math.random()*60-30),d=(Math.random()*.3);conf+='<i class="conf" style="left:calc(50% + '+x+'px);top:38%;background:'+cols[i%4]+';animation-delay:'+(0.8+d)+'s"></i>';}
  el.innerHTML='<div class="box">🎁</div><div class="gift">'+won.emoji+'</div>'+conf;
  el.addEventListener("click",()=>{el.remove();if(after)after();});
  document.body.appendChild(el);
  setTimeout(()=>{el.remove();if(after)after();},2600);
}

/* ============ landing: see landing.js (renderLanding) ============ */

function logoSVG(){return '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><rect x="3" y="10" width="18" height="11" rx="2.5" fill="#F3E7D0"/><rect x="10.6" y="10" width="2.8" height="11" fill="#D9A64E"/><rect x="1.5" y="6" width="21" height="5" rx="2.5" fill="#EFE0C2"/><circle cx="12" cy="4.5" r="2.6" fill="#D9A64E"/></svg>';}
const TABS=[{id:"classroom",label:t("tab_classroom"),icon:"\uD83C\uDF93"},{id:"records",label:t("tab_records"),icon:"\uD83D\uDCDC"},{id:"shop",label:t("tab_shop"),icon:"\uD83C\uDF81"},{id:"leaderboard",label:t("tab_board"),icon:"\uD83C\uDFC6"},{id:"settings",label:t("tab_settings"),icon:"\u2699\uFE0F"}];
function renderShell(tab){
  document.title=t("docPre")+t("tab_"+tab);
  $("#view").innerHTML=`
  <div class="shell">
    <nav class="rail" aria-label="${t("appSections")}">
      <a class="logo" href="#/">${logoSVG()} Gifted Scholars</a>
      ${TABS.map(tb=>'<a class="tab" href="#/app/'+t.id+'"'+(t.id===tab?' aria-current="page"':'')+'><span>'+t.icon+'</span>'+t("tab_"+tb.id)+'</a>').join("")}
      <div class="foot">${esc(S.settings.className)}<br>${esc(S.settings.schoolName)}</div>
    </nav>
    <main class="main" id="main"></main>
  </div>`;
  if(tab==="classroom")viewClassroom();
  if(tab==="records")viewRecords();
  if(tab==="shop")viewShop();
  if(tab==="leaderboard")viewBoard();
  if(tab==="settings")viewSettings();
  window.scrollTo(0,0);
}

/* ============ classroom view ============ */
function viewClassroom(){
  const rules=S.rules.filter(r=>r.active!==false);
  $("#main").innerHTML=`
  <div class="pagehead"><h1>Rate ${esc(S.settings.className)}</h1><span class="sub">Tap students, then a rule. ${sel.size} selected.</span></div>
  <div class="toolbar">
    <button class="btn sm" onclick="selAll(true)">${t("selectAll")}</button>
    <button class="btn sm" onclick="selAll(false)">${t("clear")}</button>
    <span class="rail-legend">
      <span class="legend"><b class="num">★</b> wallet stars (spendable)</span>
      <span class="legend"><b class="num">#</b> growth score (levels)</span>
    </span>
  </div>
  <div class="grid" id="stuGrid">${S.students.map(stuCard).join("")}</div>
  <div style="margin-top:22px;display:flex;gap:8px;flex-wrap:wrap" id="ruleChips">
    ${rules.map(r=>'<button class="chip '+(r.value>0?"plus":"minus")+'" onclick="rate(\''+r.id+'\')" aria-label="'+esc(r.zh&&LANG==="zh"?r.zh:r.label)+" "+(r.value>0?"+":"")+r.value+'">'+r.icon+" "+esc(r.zh&&LANG==="zh"?r.zh:r.label)+" <b class='num'>"+(r.value>0?"+":"")+r.value+'</b></button>').join("")}
  </div>`;
}
function stuCard(st){
  const g=growthOf(st),w=walletOf(st),lp=lvlProgress(g),L=LEVELS[lp.i];
  return `<div class="card stk${sel.has(st.id)?" sel":""}" id="card-${st.id}" onclick="pick('${st.id}')" role="button" tabindex="0" aria-pressed="${sel.has(st.id)}" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();pick('${st.id}')}">
    <span class="pick" aria-hidden="true">${sel.has(st.id)?"✓":""}</span>
    <div class="av" style="background:hsl(${st.hue},55%,82%)">${esc(st.name.slice(0,1))}</div>
    <div class="nm">${esc(st.name)}</div>
    <div class="lv">${L.badge} Lv${lp.i+1} · ${esc(nm(L))}</div>
    <div class="pts"><span class="net num${g<0?" neg":""}"># ${g}</span><span class="wallet num">★ ${w}</span></div>
    <a class="roomlink" href="#/room/${st.id}" onclick="event.stopPropagation()" title="Open ${esc(st.name)}'s gift room">${t("openRoom")}</a>
  </div>`;
}
function pick(id){
  if(sel.has(id))sel.delete(id);else sel.add(id);
  const el=document.getElementById("card-"+id);
  if(el){el.classList.toggle("sel",sel.has(id));el.setAttribute("aria-pressed",sel.has(id));$(".pick",el).textContent=sel.has(id)?"✓":"";}
  const sub=document.querySelector(".pagehead .sub");if(sub)sub.textContent="Tap students, then a rule. "+sel.size+" selected.";
}
function selAll(on){sel=on?new Set(S.students.map(s=>s.id)):new Set();viewClassroom();}
function rate(ruleId){
  const rule=S.rules.find(r=>r.id===ruleId);if(!rule)return;
  if(!sel.size){toast("Select one or more students first");return;}
  applyRule(rule,[...sel]);
  const ids=[...sel];
  ids.forEach(id=>{const el=document.getElementById("card-"+id);if(el){const chip=document.createElement("span");chip.className="float";chip.style.color=rule.value>0?"var(--teal)":"var(--coral)";chip.textContent=(rule.value>0?"+":"")+rule.value;el.appendChild(chip);setTimeout(()=>chip.remove(),1000);}});
  toast(rule.label+" "+(rule.value>0?"+":"")+rule.value+" → "+ids.map(i=>byId(i).name).slice(0,3).join(", ")+(ids.length>3?" +"+(ids.length-3):""));
  // refresh numbers without rebuilding grid (keeps selection + floats smooth)
  ids.forEach(id=>{const st=byId(id),el=document.getElementById("card-"+id);if(el){const g=growthOf(st),lp=lvlProgress(g);$(".net",el).textContent="# "+g;$(".net",el).classList.toggle("neg",g<0);$(".wallet",el).textContent="★ "+walletOf(st);$(".lv",el).textContent=LEVELS[lp.i].badge+" Lv"+(lp.i+1)+" · "+nm(LEVELS[lp.i]);}});
  flushLevelUps();
}

/* ============ records view ============ */
function viewRecords(){
  const recs=S.records;
  $("#main").innerHTML=`
  <div class="pagehead"><h1>${t("tab_records")}</h1><span class="sub">Every rating is logged. Anything can be undone; nothing is deleted.</span></div>
  ${recs.length?`<div class="list">${recs.map(recRow).join("")}</div>`:
  `<div class="empty stk"><span class="big">🧾</span>${t("noRatings")}<br>${t("headTo")}<a href="#/app/classroom">${t("rate")}</a> and tap a rule.</div>`}`;
}
function recRow(r){
  const names=r.studentIds.map(i=>byId(i)?byId(i).name:"?").join(", ");
  return `<div class="row stk${r.undone?" undone":""}">
    <span class="val num${r.value<0?" neg":""}">${r.value>0?"+":""}${r.value}</span>
    <span class="who"><b>${esc(r.ruleLabel)}</b><br>${esc(names)}</span>
    <span class="meta num">${fmtDT(r.ts)}</span>
    ${r.undone?'<span class="pill declined">${t("undone")}</span>':'<button class="btn sm" onclick="doUndo(\''+r.id+'\')">${t("undo")}</button>'}
  </div>`;
}
function doUndo(id){
  const r=S.records.find(x=>x.id===id);if(!r||r.undone)return;
  undoRecord(r);toast("Undone: "+r.ruleLabel);viewRecords();
}

/* ============ gift shop view ============ */
function pendingCount(){return S.requests.filter(q=>q.status==="pending").length;}
function approvedCountFor(stId,giftId){return S.requests.filter(q=>q.status==="approved"&&q.studentId===stId&&q.itemId===giftId).length;}

function viewShop(){
  const pend=S.requests.filter(q=>q.status==="pending");
  $("#main").innerHTML=`
  <div class="pagehead"><h1>${t("tab_shop")}</h1><span class="sub">Students request, you approve. Stars are only spent at approval.</span></div>
  <div class="queue">
    <h2 style="font-size:19px;margin-bottom:10px">${t("waitingFor")}<span class="tag">${pend.length}</span></h2>
    ${pend.length?`<div class="list">${pend.map(reqRow).join("")}</div>`:
      `<div class="empty stk"><span class="big">✅</span>${t("noReqs")}<br>${t("shopTag")}</div>`}
  </div>
  <h2 style="font-size:19px;margin-bottom:10px">${t("catalog")}</h2>
  <div class="shopgrid">
    ${S.gifts.map(itemCard).join("")}
  </div>`;
}
function reqRow(q){
  const st=byId(q.studentId);
  return `<div class="row stk reqrow">
    <span class="st-who">${st?esc(st.name):"?"}</span>
    <span class="st-gift">${esc(q.itemLabel)} · <b class="num">★ ${q.cost}</b></span>
    <span class="meta num">${fmtDT(q.ts)}</span>
    <span class="pill pending">${t("pending")}</span>
    <button class="btn sm primary" onclick="decideReq('${q.id}',true)">${t("approve")}</button>
    <button class="btn sm" onclick="decideReq('${q.id}',false)">${t("decline")}</button>
  </div>`;
}
function itemCard(g){
  const off=g.active===false;
  const stock=g.stock==null?'<span class="pill approved">'+(LANG==="zh"?"库存 ∞":"stock ∞")+'</span>':(g.stock>0?'<span class="pill approved">'+(LANG==="zh"?"库存 "+g.stock:"stock "+g.stock)+'</span>':'<span class="pill declined">'+t("soldOut")+'</span>');
  return `<div class="item stk${off?" off":""}">
    <div class="top"><span class="emoji">${g.emoji}</span>${stock}</div>
    <h3>${esc(nm(g))}</h3>
    <p class="desc">${esc(g.desc)}${g.per?`${t("perLimit",{n:g.per})}`:""}</p>
    <div class="row-b">
      <span class="price num">★ ${g.price}</span>
      <button class="btn sm gold" onclick="openGive('${g.id}')" ${off?"disabled":""}>${t("giveNow")}</button>
      <button class="btn sm ghost" onclick="toggleItem('${g.id}')" aria-pressed="${off}">${off?t("backShelf"):t("takeOff")}</button>
    </div>
  </div>`;
}
function toggleItem(id){const g=giftById(id);g.active=g.active===false;save();viewShop();}
function decideReq(id,ok){
  const q=S.requests.find(x=>x.id===id);if(!q||q.status!=="pending")return;
  if(ok){
    const st=byId(q.studentId),g=giftById(q.itemId);
    if(!st||!g){toast("This gift no longer exists");return;}
    if(g.active===false){toast(t("offShelf2"));return;}
    if(g.stock!=null&&g.stock<=0){toast("Sold out: raise the stock to approve.");return;}
    if(g.per&&approvedCountFor(st.id,g.id)>=g.per){toast(st.name+" hit the limit of "+g.per+" for this gift");return;}
    if(walletOf(st)<q.cost){toast(st.name+" only has ★ "+walletOf(st)+" now. Ratings first, then approve.");return;}
  }
  decide(q,ok);
  toast(ok?("Granted: "+q.itemLabel):("Declined: "+q.itemLabel));
  viewShop();
}
/* "Give now" modal: pick a student */
function openGive(giftId){
  const g=giftById(giftId);if(!g)return;
  modal(`<h2>Give: ${esc(g.emoji+" "+g.name)}</h2>
    <p style="font-size:14px;color:var(--ink-soft)">Instant grant: stars are spent now, the gift lands on the student's shelf.</p>
    <label for="giveSel">${t("studentCol")}</label>
    <select id="giveSel" style="margin-top:6px">${S.students.map(s=>'<option value="'+s.id+'">'+esc(s.name)+" (★ "+walletOf(s)+")</option>").join("")}</select>
    <div class="btns"><button class="btn ghost" onclick="closeOverlays()">Cancel</button><button class="btn gold" onclick="doGive('${giftId}')">Spend ★ ${g.price} and give</button></div>`);
}
function doGive(giftId){
  const selId=$("#giveSel").value,g=giftById(giftId),st=byId(selId);
  closeOverlays();
  if(!st||!g)return;
  if(g.active===false){toast(t("offShelf"));return;}
  if(g.stock!=null&&g.stock<=0){toast("Sold out");return;}
  if(g.per&&approvedCountFor(st.id,g.id)>=g.per){toast(st.name+" already hit the limit for this gift");return;}
  if(walletOf(st)<g.price){toast(st.name+" only has ★ "+walletOf(st));return;}
  const q={id:uid(),studentId:st.id,itemId:g.id,itemLabel:g.emoji+" "+g.name,cost:g.price,status:"pending",note:"given by teacher",ts:Date.now()};
  S.requests.unshift(q);
  decide(q,true);
  toast(t("givenTo")+st.name+": "+g.name);
  viewShop();
}

/* ============ leaderboard view ============ */
function viewBoard(){
  const mode=ui.board;
  const w0=weekStart(Date.now(),1),w1=weekStart(Date.now(),0);
  let rows;
  if(mode==="week"){rows=S.students.map(s=>({s,v:netOf(s,w1)})).sort((a,b)=>b.v-a.v);}
  else if(mode==="progress"){rows=S.students.map(s=>({s,v:netOf(s,w1)-netOf(s,w0)})).filter(r=>r.v!==0).sort((a,b)=>b.v-a.v);}
  else{rows=S.students.map(s=>({s,v:netOf(s)})).sort((a,b)=>b.v-a.v);}
  const today=weekStart(Date.now(),0)+864e5*(((new Date().getDay())+6)%7);
  const givenToday=S.records.filter(r=>!r.undone&&r.ts>=today).reduce((a,r)=>a+r.value*r.studentIds.length,0);
  const weekRecs=S.records.filter(r=>!r.undone&&r.ts>=w1);
  const ruleCount={};weekRecs.forEach(r=>ruleCount[r.ruleLabel]=(ruleCount[r.ruleLabel]||0)+1);
  const topRule=Object.entries(ruleCount).sort((a,b)=>b[1]-a[1])[0];
  $("#main").innerHTML=`
  <div class="pagehead"><h1>Leaderboards</h1><span class="sub">${t("recogTag")}</span></div>
  <div class="statline">
    <div class="stat stk"><div class="k">${t("givenToday")}</div><div class="v num">${givenToday>0?"+":""}${givenToday}</div></div>
    <div class="stat stk"><div class="k">${t("ratingsWeek")}</div><div class="v num">${weekRecs.length}</div></div>
    <div class="stat stk"><div class="k">${t("topRule")}</div><div class="v" style="font-size:15px">${topRule?esc(topRule[0]):"-"}</div></div>
    <div class="stat stk"><div class="k">${t("waiting")}</div><div class="v num">${pendingCount()}</div></div>
  </div>
  <div class="tabs" role="tablist">
    <button class="chip" aria-pressed="${mode==="all"}" onclick="ui.board='all';viewBoard()">${t("bAll")}</button>
    <button class="chip" aria-pressed="${mode==="week"}" onclick="ui.board='week';viewBoard()">${t("bWeek")}</button>
    <button class="chip" aria-pressed="${mode==="progress"}" onclick="ui.board='progress';viewBoard()">${t("bProg")}</button>
  </div>
  ${rows.length?`
  <div class="podium">${[0,1,2].map(i=>rows[i]?`
    <div class="pod stk">
      <span class="medal">${["🥇","🥈","🥉"][i]}</span>
      <div class="nm">${esc(rows[i].s.name)}</div>
      <div class="sc num">${rows[i].v>0?"+":""}${rows[i].v} ${mode==="progress"?t("vsLast"):""}</div>
    </div>`:"").join("")}
  </div>
  <div class="list">${rows.slice(3).map((r,i)=>`
    <div class="row stk">
      <span class="val num" style="min-width:34px">${i+4}</span>
      <span class="who">${esc(r.s.name)}</span>
      <span class="val num${r.v<0?" neg":""}" style="min-width:60px">${r.v>0?"+":""}${r.v}</span>
    </div>`).join("")}</div>`:
  `<div class="empty stk"><span class="big">🏁</span>${t("boardEmpty")}<br>The Progress board fills once two weeks have ratings.</div>`}`;
}

/* ============ settings view ============ */
function viewSettings(){
  $("#main").innerHTML=`
  <div class="pagehead"><h1>Setup</h1><span class="sub">Your class, your rules, your catalog.</span></div>

  <section style="margin-bottom:30px">
    <div class="stk" style="padding:16px 18px;display:flex;gap:12px;align-items:center;flex-wrap:wrap;max-width:560px;background:var(--teal-tint)">
      <span style="font-size:22px">🎁</span>
      <span style="font-size:14px;line-height:1.5">A free gift to ZhongFangYuan Bilingual School — built with care by <b>Mohammed Shehzad Khan</b> ("Teacher Mo"), © 2026. Always free: no fees, no ads, nothing for sale. <a href="#/" onclick="openLicense();return false">${t("aboutGift")}</a></span>
    </div>
  </section>

  <div class="pagehead"><h1>Setup</h1><span class="sub">Your class, your rules, your catalog.</span></div>

  <section style="margin-bottom:30px">
    <h2 style="font-size:19px;margin-bottom:10px">${t("classCol")}</h2>
    <div class="stk" style="padding:18px;display:grid;gap:12px;max-width:560px">
      <div><label for="clsName">${t("className")}</label><input id="clsName" type="text" value="${esc(S.settings.className)}" onchange="saveCls()"></div>
      <div><label for="schName">${t("schoolName")}</label><input id="schName" type="text" value="${esc(S.settings.schoolName)}" onchange="saveCls()"></div>
      <div><label for="motionSel">${t("motion")}</label><select id="motionSel" onchange="saveMotion(this.value)"><option value="auto"${(S.settings.motion||"auto")==="auto"?" selected":""}>${t("motionAuto")}</option><option value="on"${S.settings.motion==="on"?" selected":""}>${t("motionOn")}</option><option value="off"${S.settings.motion==="off"?" selected":""}>${t("motionOff")}</option></select><small>${t("motionBlurb")}</small></div>
      <div><label for="tchName">${t("teacher")}</label><input id="tchName" type="text" value="${esc(S.settings.teacher)}" onchange="saveCls()"></div>
    </div>
  </section>

  <section style="margin-bottom:30px">
    <h2 style="font-size:19px;margin-bottom:10px">${t("ratingRules")}</h2>
    <div class="list" style="max-width:760px">
      ${S.rules.map(r=>`
      <div class="row stk">
        <input type="text" value="${esc(r.icon)}" style="width:52px;text-align:center" aria-label="Icon for ${esc(r.label)}" onchange="editRule('${r.id}','icon',this.value)">
        <input type="text" value="${esc(r.label)}" style="flex:2;min-width:130px" aria-label="Rule name" onchange="editRule('${r.id}','label',this.value)">
        <input type="number" value="${r.value}" step="1" style="width:84px" class="num" aria-label="${t("pointsValue")}" onchange="editRule('${r.id}','value',parseInt(this.value)||0)">
        <label style="display:flex;align-items:center;gap:6px;font-size:13px"><input type="checkbox" ${r.active!==false?"checked":""} onchange="editRule('${r.id}','active',this.checked)"> On</label>
        <button class="btn sm danger" onclick="delRule('${r.id}')" aria-label="Delete rule ${esc(r.label)}">Delete</button>
      </div>`).join("")}
      <div><button class="btn" onclick="addRule()">+ Add rule</button></div>
    </div>
  </section>

  <section style="margin-bottom:30px">
    <h2 style="font-size:19px;margin-bottom:10px">${t("students")}</h2>
    <div class="stk" style="padding:16px;max-width:560px;display:flex;gap:10px;flex-wrap:wrap">
      <input id="newStu" type="text" placeholder="Add a student by name" style="flex:1;min-width:170px" onkeydown="if(event.key==='Enter')addStudent()">
      <button class="btn primary" onclick="addStudent()">Add</button>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px">
      ${S.students.map(s=>`<span class="chip" style="cursor:default">${esc(s.name)} <button class="btn sm ghost" style="min-height:0;padding:0 4px" onclick="delStudent('${s.id}')" aria-label="Remove ${esc(s.name)}">✕</button></span>`).join("")}
    </div>
  </section>

  <section>
    <h2 style="font-size:19px;margin-bottom:10px">${t("dataSec")}</h2>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn" onclick="exportJSON()">${t("exportJSON")}</button>
      <button class="btn danger" onclick="confirmReset()">${t("resetDemo")}</button>
    </div>
    <p style="font-size:13px;color:var(--ink-soft);margin-top:10px;max-width:560px">Everything is stored in this browser only (localStorage). Export gives you a full backup: students, records, requests, collections and settings.</p>
  </section>`;
}
function saveCls(){
  S.settings.className=$("#clsName").value.trim()||S.settings.className;
  S.settings.schoolName=$("#schName").value.trim()||S.settings.schoolName;
  S.settings.teacher=$("#tchName").value.trim()||S.settings.teacher;
  save();toast(t("classSaved"));
}
function editRule(id,key,val){
  const r=S.rules.find(x=>x.id===id);if(!r)return;
  r[key]=val;save();
  if(key!=="active")toast("Rule updated");
}
function addRule(){
  S.rules.push({id:uid(),icon:"✨",label:t("newRule"),value:1,active:true});
  save();viewSettings();
}
function delRule(id){
  const used=S.records.some(r=>r.ruleId===id);
  const del=()=>{S.rules=S.rules.filter(r=>r.id!==id);save();viewSettings();toast("Rule deleted");};
  if(used){confirmModal(t("delRule"),"Past records that used it keep their values for the log, but it disappears from the rating screen.",del);}
  else del();
}
function addStudent(){
  const inp=$("#newStu");const name=inp.value.trim();
  if(!name){toast("Type a name first");return;}
  S.students.push({id:uid(),name,hue:hueOf(name)});
  inp.value="";save();viewSettings();toast(name+" added");
}
function delStudent(id){
  const st=byId(id);if(!st)return;
  confirmModal(t("remove")+st.name+"?","Their ratings stay in the records log, but their gift room and shelf data will be removed.",()=>{
    S.students=S.students.filter(s=>s.id!==id);
    delete S.collection[id];sel.delete(id);
    save();viewSettings();toast(st.name+" removed");
  });
}
function exportJSON(){
  const blob=new Blob([JSON.stringify(S,null,2)],{type:"application/json"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="gifted-scholars-"+S.settings.className.replace(/\s+/g,"-").toLowerCase()+".json";
  a.click();URL.revokeObjectURL(a.href);
  toast(t("exported"));
}
function confirmReset(){
  confirmModal(t("resetAsk"),"This wipes everything in this browser and reseeds the demo class: 16 students, ten days of ratings, and the default gift catalog.",()=>{
    seed();sel=new Set();toast(t("demoReset"));go("#/app/classroom");route();
  });
}
function confirmModal(title,body,onYes){
  modal(`<h2>${esc(title)}</h2><p style="font-size:14px;color:var(--ink-soft)">${esc(body)}</p>
  <div class="btns"><button class="btn ghost" onclick="closeOverlays()">Cancel</button><button class="btn danger" id="cfYes">t("yesDo")</button></div>`);
  $("#cfYes").addEventListener("click",()=>{closeOverlays();onYes();});
}

/* ============ student gift room ============ */
function renderRoom(id){
  document.title=t("docPre")+(byId(id)?(byId(id).name+" · "+t("roomTitle")):t("roomTitle"));
  if(!id||!byId(id)){$("#view").innerHTML='<div class="room"><a class="btn" href="#/app/classroom">← Back to class</a><div class="empty stk" style="margin-top:20px"><span class="big">🤷</span>That student does not exist. They may have been removed.</div></div>';return;}
  const st=byId(id),g=growthOf(st),w=walletOf(st),lp=lvlProgress(g),L=LEVELS[lp.i];
  const col=collectionOf(st);
  const reqs=S.requests.filter(q=>q.studentId===id).slice(0,6);
  const slots=Math.max(8,col.length);
  document.title=t("roomPre")+st.name;
  $("#view").innerHTML=`
  <div class="room">
    <div class="back"><a class="btn sm" href="#/app/classroom">← ${esc(S.settings.className)}</a></div>
    <div class="roomhead stk">
      <div class="bigav">${esc(st.name.slice(0,1))}</div>
      <div>
        <h1>${esc(st.name)}'s gift room</h1>
        <div class="lv" style="margin-top:6px;font-weight:700">${L.badge} Level ${lp.i+1} · ${esc(nm(L))}</div>
        ${lp.next?`<div class="lvl-bar" role="progressbar" aria-valuenow="${lp.pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${t("toNext")}"><i style="width:${lp.pct}%"></i></div>
        <div style="font-size:12px;margin-top:5px;color:var(--ink-soft)" class="num">${g} growth · ${lp.next.min-g} to ${lp.next.badge} ${esc(lp.next.name)}</div>`:
        `<div style="font-size:12px;margin-top:5px;color:var(--ink-soft)">${t("topLevel")}</div>`}
      </div>
      <div class="walletbox stk" style="padding:14px 20px"><div class="v num">★ ${w}</div><div style="font-size:12px;font-weight:700">${t("wallet")}</div></div>
    </div>

    <div class="actionsbar">
      <button class="btn gold" onclick="roomBox('${id}')" ${w<BOX_PRICE?"disabled title='Needs ★ "+BOX_PRICE+"'":""}>🎁 Open a mystery box · ★ ${BOX_PRICE}</button>
      <button class="btn primary" onclick="openReqModal('${id}')">${t("askGift")}</button>
    </div>

    <section class="shelf">
      <h2>${t("shelf")}</h2>
      <p class="sub">Collected gifts stay here all year. Rare finds have a teal frame, epic finds a golden glow.</p>
      <div class="shelfgrid">
        ${col.map(c=>`<div class="slot stk rar-${c.rar}"><span class="g">${c.emoji}</span><span class="gname">${esc(nm(c))}${c.source==="box"?" 📦":""}</span></div>`).join("")}
        ${col.length<slots?Array(slots-col.length).fill('<div class="slot empty-slot"><span class="g">·</span><span class="gname">${t("empty")}</span></div>').join(""):""}
      </div>
    </section>

    <section class="reqlist">
      <h2 style="font-size:19px;margin-bottom:10px">${t("myRequests")}</h2>
      ${reqs.length?`<div class="list">${reqs.map(q=>`
        <div class="row stk">
          <span class="who">${esc(q.itemLabel)} · <b class="num">★ ${q.cost}</b></span>
          <span class="meta num">${fmtDT(q.ts)}</span>
          <span class="pill ${q.status}">${q.status}</span>
        </div>`).join("")}</div>`:
        `<div class="empty stk"><span class="big">📮</span>No requests yet. Ask for a gift and it waits for the teacher's yes.</div>`}
    </section>
  </div>`;
}
function roomBox(id){
  const st=byId(id);
  const won=openBox(id);
  if(!won){toast(t("notEnough"));return;}
  giftBurst(won,()=>{renderRoom(id);toast(st.name+" got: "+won.name+" ("+won.rar+")");});
}
function openReqModal(id){
  const st=byId(id),w=walletOf(st);
  const items=S.gifts.filter(g=>g.active!==false);
  modal(`<h2>Ask for a gift, ${esc(st.name)}</h2>
  <p style="font-size:14px;color:var(--ink-soft)">Requests wait for the teacher's approval. Only affordable gifts are enabled. You have <b class="num">★ ${w}</b>.</p>
  <div class="list" style="margin-top:10px">
  ${items.map(g=>{
    const afford=w>=g.price&&(g.stock==null||g.stock>0);
    return `<div class="row stk" ${afford?"":'style="opacity:.55"'}>
      <span style="font-size:26px">${g.emoji}</span>
      <span class="who"><b>${esc(nm(g))}</b><br><span style="font-weight:400;font-size:12.5px;color:var(--ink-soft)">${esc(g.desc)}</span></span>
      <span class="val num">★ ${g.price}</span>
      <button class="btn sm primary" ${afford?"":"disabled"} onclick="doReq('${id}','${g.id}')">Ask</button>
    </div>`;}).join("")}
  </div>
  <div class="btns"><button class="btn ghost" onclick="closeOverlays()">${t("close")}</button></div>`);
}
function doReq(stId,giftId){
  const g=giftById(giftId),st=byId(stId);
  if(!g||!st)return;
  requestGift(stId,g);
  closeOverlays();
  toast("Requested: "+g.name+". It waits for approval.");
  renderRoom(stId);
}

/* init moved to the very end of the script bundle (after landing.js),
   because route()->renderLanding() needs landing.js consts (TDZ fix) */
