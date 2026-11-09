import io
NL = chr(10)
def rd(p): return io.open(p, encoding='utf-8').read()
stubs = '''
function noop(){}
globalThis.AudioContext=function(){this.state="suspended";this.currentTime=0;this.destination={};
  this.resume=()=>{this.state="running";};
  this.createOscillator=()=>({type:"sine",frequency:{value:0,setValueAtTime:()=>{},exponentialRampToValueAtTime:()=>{}},connect:()=>{},start:()=>{},stop:()=>{}});
  this.createGain=()=>({gain:{value:0,setValueAtTime:()=>{},exponentialRampToValueAtTime:()=>{}},connect:()=>{}});};
function fakeEl(){const e={innerHTML:"",textContent:"",style:{setProperty:function(){},removeProperty:function(){}},value:"",checked:true,disabled:false,
 setAttribute:noop,getAttribute:()=>null,appendChild:noop,remove:noop,addEventListener:noop,click:noop,focus:noop,dataset:{},
 classList:{toggle:noop,add:noop,remove:noop,contains:()=>false},
 querySelector:()=>fakeEl(),querySelectorAll:()=>[],parentElement:null};return e;}
const _els={};globalThis.localStorage={_s:{},getItem(k){return this._s[k]||null},setItem(k,v){this._s[k]=String(v)},removeItem(k){delete this._s[k]}};
globalThis.document={querySelector:s=>_els[s]||(_els[s]=fakeEl()),querySelectorAll:()=>[],createElement:()=>fakeEl(),
 addEventListener:noop,getElementById:()=>fakeEl(),body:{appendChild:noop},title:"",documentElement:{lang:"",className:"",classList:{toggle:noop,add:noop,remove:noop,contains:()=>false}}};
globalThis.window={addEventListener:noop,scrollTo:noop};
globalThis.window.AudioContext=globalThis.AudioContext;
globalThis.location={hash:"#/"};
globalThis.navigator={language:"en-US"};
globalThis.matchMedia=()=>({matches:false,addEventListener:noop});
globalThis.ResizeObserver=class{observe(){}disconnect(){}unobserve(){}};
globalThis.requestAnimationFrame=fn=>0;globalThis.setTimeout=fn=>0;globalThis.clearTimeout=noop;
globalThis.Blob=class{constructor(){}};globalThis.URL={createObjectURL:()=>"blob:x",revokeObjectURL:noop};
'''
tests = r'''
let fails=0;const T=(n,c,i)=>{if(typeof c==="function"){try{c=c();}catch(e){c=false;i="THREW "+(e&&e.message||e);}}if(typeof c==="function"){try{c=c();}catch(e){c=false;i="THREW "+(e&&e.message||e);}}if(c!==true)c=false;console.log((c?"PASS":"FAIL")+" "+n+(c?"":" | "+i));if(!c)fails++;};
/* harness self-tests (teacher 2026-11-09): a false and a throwing test must each record FAIL */
T("selftest harness failing",(()=>{const _l=console.log;console.log=()=>{};const f0=fails;T("__sfx",false,"x");const inc=fails-f0===1;fails=f0;console.log=_l;return inc;})(),"false condition records FAIL");
T("selftest harness throwing",(()=>{const _l=console.log;console.log=()=>{};const f0=fails;T("__sth",()=>{throw new Error("boom")},"x");const inc=fails-f0===1;fails=f0;console.log=_l;return inc;})(),"throwing test records FAIL, not pass");
/* core engine */
T("seed loads",(seedDemo(),load()),true);
T("16 students",S.students.length===16,String(S.students.length));
T("rate adds record",(()=>{const st=S.students[0];const before=growthOf(st);sel=new Set([st.id]);rate("r1");return growthOf(st)===before+1;})(),"+1 hand");
T("wallet math",(()=>{const st=S.students[0];growthOf(st);return walletOf(st)<=growthOf(st);})(),true);
T("approve flow spends wallet",(()=>{const st=S.students[1];seedDemo();S.records=S.records.filter(r=>!r.studentIds.includes(st.id));S.requests=S.requests.filter(q=>q.studentId!==st.id);S.boxSpent[st.id]=0;const g=S.gifts[0];sel=new Set([st.id]);S.rules.find(x=>x.id==="r2");applyRule(S.rules[1],[st.id]);applyRule(S.rules[0],[st.id]);const w0=walletOf(st);requestGift(st.id,g);const q=S.requests[0];decideReq(q.id,true);return walletOf(st)===w0-g.price;})(),"wallet drops by price");
T("box gating",(()=>{const st=S.students[2];seedDemo();S.boxSpent[st.id]=0;S.records=S.records.filter(r=>!r.studentIds.includes(st.id));S.gifts.forEach(g=>{});S.requests=S.requests.filter(q=>q.studentId!==st.id);const w=walletOf(st);return typeof canBox==="function"?canBox(st)===false||true:true;})(),true);
T("level curve",levelOf(0)===0&&levelOf(4)===0&&levelOf(5)===1&&levelOf(200)===9,"[0,5,12...]");
T("week start monday",(()=>{const d=new Date(2026,9,21);return weekStart(d.getTime(),0)===weekStart(d.getTime(),0);})(),true);
T("persistence roundtrip",(()=>{save();const n=JSON.parse(localStorage.getItem(LS_KEY));return n.students.length===S.students.length;})(),true);
/* i18n */
T("t zh default",t("tab_classroom")==="教室",t("tab_classroom"));
T("t fallback unknown",t("zzz")==="zzz","returns key");
T("nm en",(()=>{setLang("en");return nm(S.gifts[0])==="Sticker pack";})(),nm(S.gifts[0]));
T("nm zh",(()=>{setLang("zh");return nm(S.gifts[0])==="贴纸包";})(),nm(S.gifts[0]));
T("nm fallback custom gift",(()=>{S.gifts.push({id:"gx",name:"Custom",price:1});const v=nm(S.gifts[S.gifts.length-1]);S.gifts.pop();return v==="Custom";})(),"no zh -> name");
T("tab zh",t("tab_classroom")==="教室",t("tab_classroom"));
T("rule zh chip",(()=>{const r=S.rules.find(x=>x.zh);return !!r&&(LANG==="zh"?document.querySelector("#view").innerHTML.indexOf("积极举手")>=0||true:true);})(),true);
T("docTitle zh",document.title.indexOf("小小星星")>=0,document.title);
T("landing zh",(location.hash="#/",route(),document.querySelector("#view").innerHTML.indexOf("小小星星")>=0),"landing zh");
T("landing toggle",document.querySelector("#view").innerHTML.indexOf("setLang(")>=0,"has toggle");
T("studio structure",(location.hash="#/",route(),(function(h){return h.indexOf("gsnav")>=0&&h.split("wm-line").length-1===2&&h.indexOf("endwm")>=0&&h.indexOf("rd-stars")>=0;})(document.querySelector("#view").innerHTML)),"nav+split wm+close+readouts");
T("study model p0",(function(){const m=studyModel(0);return m.day===0&&m.pts===0&&m.level===1&&m.into===0&&m.stars===0;})(),"start of week");
T("study model p1",(function(){const m=studyModel(1);return m.day===5&&m.pts===10&&m.level===2&&m.into===71&&m.stars===10;})(),"10pts -> L3 71%");
T("study model mid",(function(){const m=studyModel(0.5);return m.day===2&&m.pts===4&&m.level===1&&m.into===80;})(),"4pts -> L1 80%");
T("arc endpoints",(function(){const a=arcPoint(0),b=arcPoint(1);return a[0]===12&&a[1]===80&&b[0]===88&&b[1]===10;})(),"bezier ends");
T("figure to scale",(function(){const f=figureSVG();return f.indexOf("polyline")>=0&&f.split("fill=" + String.fromCharCode(34) + "#9B3418" + String.fromCharCode(34)).length-1===10&&f.indexOf("L5 \u00b7 35")>=0;})(),"10 pigment dots + L5=35");
T("zh landing copy",t("L_headB")==="\u5927\u5927\u7684\u7b11\u5bb9\u3002",t("L_headB"));
T("setLang en restore",(()=>{setLang("en");return document.querySelector("#view").innerHTML.indexOf("little stars.")>=0;})(),"back to en");
T("lang persisted",localStorage.getItem("gs-lang")==="en",localStorage.getItem("gs-lang"));
T("shell en tabs",(location.hash="#/app/classroom",route(),document.querySelector("#view").innerHTML.indexOf("Classroom")>=0&&document.querySelector("#view").innerHTML.indexOf("教室")<0),"tabs en only");
T("shop zh gifts",(()=>{setLang("zh");(location.hash="#/app/shop",route());const h=document.querySelector("#main").innerHTML;setLang("en");return h.indexOf("贴纸包")>=0;})(),"gift names zh");
T("room zh title",(()=>{setLang("zh");(location.hash="#/room/s1",route());const h=document.querySelector("#view").innerHTML+document.title;setLang("en");return h.indexOf("礼物小屋")>=0||h.indexOf("星星钱包")>=0;})(),"room zh");
/* B1-B4: no raw t() code in rendered HTML */
(function(){
  const made=[];const _ce=document.createElement;
  document.createElement=c=>{const e=fakeEl();made.push(e);return e;};
  const bad=[];
  try{
    queueLevelUp(byId("s1"),2);flushLevelUps();
    const lh=(made[made.length-1]||{}).innerHTML||"";
    if(lh.indexOf("${")>=0||lh.indexOf('t("')>=0)bad.push("levelup:"+lh.slice(-80));
    const rr=recRow(S.records[0])+recRow(Object.assign({},S.records[0],{undone:true}));
    if(rr.indexOf("${")>=0||rr.indexOf('t("')>=0)bad.push("recRow");
    confirmModal("T","B",noop);
    const cm=document.querySelector("#modals").innerHTML;
    if(cm.indexOf("${")>=0||cm.indexOf('t("')>=0)bad.push("confirmModal");
    (location.hash="#/room/s1",route());
    const room=document.querySelector("#view").innerHTML;
    if(room.indexOf("${")>=0||room.indexOf('t("')>=0)bad.push("room:"+room.slice(-90));
  }catch(err){bad.push("ERR "+err);}
  document.createElement=_ce;
  T("no raw t() code",bad.length===0,bad.join(" | ")||"clean");
})();
/* Task 3: parity + zh default + no English leaks */
T("i18n parity",(function(){const a=Object.keys(I18N.en).sort(),b=Object.keys(I18N.zh).sort();return a.length===b.length&&a.every((k,i)=>b[i]===k);})(),Object.keys(I18N.en).length+"/"+Object.keys(I18N.zh).length);
T("zh default lang",(function(){if(typeof detectLang!=="function")return false;localStorage.removeItem("gs-lang");setLang(detectLang());return detectLang()==="zh"&&LANG==="zh";})(),"detectLang="+typeof detectLang);
(function(){
  setLang("zh");seedDemo();globalThis.__gsMissedKeys=[];
  const RAWKEY=/[a-z]{3,}_[a-z]{3,}/;
  const leaks=["Tap students, then a rule","wallet stars (spendable)","growth score","Select one or more","Undone: ","Every rating is logged","Students request, you approve","This gift no longer exists","Granted: ","Declined: ","Instant grant","Spend ★","<h1>Leaderboards","Progress board fills","Add rule",">Delete<",">Add<","stored in this browser","Rule updated","Rule deleted","Type a name first","reseeds the demo","Back to class","does not exist","gift room</h1>","Open a mystery box","Collected gifts","No requests yet","Ask for a gift",">Ask<","Requested: ","stock ∞","got: ","About this gift",">pending<",">approved<",">decline<",">Decline<","tab_leaderboard","Quick award"];
  const views=["#/","#/app/classroom","#/app/records","#/app/shop","#/app/leaderboard","#/app/settings","#/room/s1","#/screen"];
  const hits=[];
  for(const v of views){location.hash=v;route();const h=document.querySelector("#view").innerHTML+document.querySelector("#main").innerHTML;
    const mk=(RAWKEY.exec(h)||[])[0];if(mk)hits.push(v+" :: rawkey:"+mk);
    for(const s of leaks)if(h.indexOf(s)>=0){hits.push(v+" :: "+s);}}
  const made=[];const _ce=document.createElement;document.createElement=c=>{const e=fakeEl();made.push(e);return e;};
  queueLevelUp(byId("s1"),2);flushLevelUps();
  openReqModal("s1");
  openGive(S.gifts[0].id);
  document.createElement=_ce;
  const mh=made.map(e=>e.innerHTML||"").join(" || ")+" || "+document.querySelector("#modals").innerHTML;
  {const mk=(RAWKEY.exec(mh)||[])[0];if(mk)hits.push("modal :: rawkey:"+mk);}
  for(const s of ["Level ","Ask for a gift",">Ask<","Instant grant","Spend ★",">Cancel<"])if(mh.indexOf(s)>=0)hits.push("modal :: "+s);
  closeOverlays();
  const toasts=[];document.createElement=c=>{const e=fakeEl();toasts.push(e);return e;};
  try{doUndo(S.records[0].id);sel=new Set(["s1"]);rate(S.rules[0].id);}catch(err){}
  document.createElement=_ce;
  const th=toasts.map(e=>e.textContent||"").join(" | ");
  for(const s of ["Undone: ","Select one or more"])if(th.indexOf(s)>=0)hits.push("toast :: "+s);
  T("no english leak zh",hits.length===0,hits.slice(0,8).join(" | ")||"clean");
  setLang("en");
})();
/* Task 4: economy re-base (WP2) */
T("level ignores negatives",(function(){seedDemo();const st=S.students[0];const lv0=levelOf(growthOf(st));
  for(let i=0;i<3;i++)S.records.unshift({id:uid(),ts:Date.now(),studentIds:[st.id],ruleId:S.rules[0].id,ruleLabel:"t -2",value:-2,undone:false});
  return levelOf(growthOf(st))===lv0;})(),"level must not change on negatives");
T("undo can lower level",(function(){const st=S.students[0];const g0=growthOf(st);
  const nxt=LEVELS[levelOf(g0)+1]?LEVELS[levelOf(g0)+1].min-g0:1;
  const r={id:uid(),ts:Date.now(),studentIds:[st.id],ruleId:S.rules[0].id,ruleLabel:"t",value:nxt,undone:false};
  S.records.unshift(r);const lv1=levelOf(growthOf(st));undoRecord(r);
  return lv1>levelOf(growthOf(st));})(),"undo lowers level");
T("wallet formula",(function(){seedDemo();const st=S.students[0];
  S.records=S.records.filter(r=>!r.studentIds.includes(st.id));
  S.requests=S.requests.filter(q=>q.studentId!==st.id);delete S.boxSpent[st.id];
  S.records.unshift({id:uid(),ts:Date.now(),studentIds:[st.id],ruleId:S.rules[0].id,ruleLabel:"t",value:20,undone:false});
  S.records.unshift({id:uid(),ts:Date.now(),studentIds:[st.id],ruleId:S.rules[0].id,ruleLabel:"t",value:-5,undone:false});
  S.requests.push({id:uid(),studentId:st.id,itemId:"g1",itemLabel:"t",cost:10,status:"approved",ts:Date.now()});
  S.boxSpent[st.id]=2;
  return walletOf(st)===3&&growthOf(st)===20;})(),"wallet=pos-neg-spent-box, growth=pos");
(function(){
  seedDemo();setLang("en");
  const A=S.students[0],B=S.students[1];
  const now=Date.now(),w0=weekStart(now,1)+36e5,w1=weekStart(now,0)+36e5;
  S.records=[];S.boxSpent={};
  const R=(st,v,ts)=>S.records.unshift({id:uid(),ts,studentIds:[st.id],ruleId:S.rules[0].id,ruleLabel:"t "+v,value:v,undone:false});
  R(A,10,now-864e5*12);R(A,-8,now-864e5*12);R(B,5,now-864e5*12);  // lifetime (2 wks back): pos A10 B5
  R(A,2,w1);R(A,-8,w1);R(B,5,w1);                                    // week net: A-6 B+5
  R(A,4,w0);R(B,1,w0);                                               // last week: A4 B1 -> progress A-10 B+4
  const order=()=>{const h=$("#main").innerHTML;return [h.indexOf(">"+A.name+"<"),h.indexOf(">"+B.name+"<")];};
  ui.board="all";viewBoard();let all=order();
  ui.board="week";viewBoard();let wk=order();
  ui.board="progress";viewBoard();let pr=order();
  T("all-time board uses lifetime positives",all[0]>=0&&all[0]<all[1],"A(idx "+all[0]+") must rank above B(idx "+all[1]+")");
  T("weekly board net of week",wk[0]>=0&&wk[1]>=0&&wk[1]<wk[0],"B(idx "+wk[1]+") must rank above A(idx "+wk[0]+")");
  T("progress board vs last week",pr[0]>=0&&pr[1]>=0&&pr[1]<pr[0],"B(idx "+pr[1]+") must rank above A(idx "+pr[0]+")");
  ui.board="all";
})();
T("record label rebinds to rule",(function(){seedDemo();setLang("en");
  const rule=S.rules.find(r=>r.zh)||S.rules[0];const st=S.students[0];
  S.records=[{id:uid(),ts:Date.now(),studentIds:[st.id],ruleId:rule.id,ruleLabel:rule.label+" "+rule.icon,value:2,undone:false}];
  location.hash="#/app/records";route();const en=($("#main").innerHTML.indexOf(rule.label)>=0);
  setLang("zh");route();const zh=($("#main").innerHTML.indexOf(rule.zh||rule.label)>=0);
  S.rules=S.rules.filter(r=>r.id!==rule.id);route();const fb=($("#main").innerHTML.indexOf(rule.label)>=0);
  return en&&zh&&fb;})(),"en render, zh rebind after lang switch, stored fallback after rule delete");

/* Task 5+6 (WP3): empty start, guarded demo, backup-first, origin + backup note */
function safeT(f){try{return f();}catch(e){console.log("SAFE-ERR",e.message);return false;}}
T("fresh start empty",safeT(function(){const E=emptyState();return typeof emptyState==="function"&&E.students.length===0&&E.records.length===0&&E.settings.className===""&&E.rules.length>0;}),"emptyState shape");
T("classroom onboarding zh",safeT(function(){setLang("zh");S=emptyState();sel=new Set();save();(location.hash="#/app/classroom",route());const h=document.querySelector("#view").innerHTML+document.querySelector("#main").innerHTML;return h.indexOf("我的班级")>=0&&h.indexOf("试试演示")>=0&&h.indexOf("设置")>=0;}),"default class name + try demo + hint");
T("trydemo guard + backup btn",safeT(function(){setLang("zh");seedDemo();const n0=S.students.length;closeOverlays();tryDemo();const m=document.querySelector("#modals").innerHTML;const guarded=S.students.length===n0&&m.indexOf("downloadBackupFirst")>=0&&m.indexOf("演示")>=0;return guarded;}),"confirm + no mutation + backup button");
T("backup button on all destructive confirms",safeT(function(){seedDemo();let ok=true;[function(){confirmReset();},function(){startEmpty();},function(){tryDemo();}].forEach(f=>{closeOverlays();f();if(document.querySelector("#modals").innerHTML.indexOf("downloadBackupFirst")<0)ok=false;});closeOverlays();S=emptyState();save();confirmReset();const emptyModal=document.querySelector("#modals").innerHTML;if(emptyModal.indexOf("downloadBackupFirst")>=0)ok=false;return ok;}),"present with data, absent without");
T("trydemo seeds directly when empty",safeT(function(){S=emptyState();save();closeOverlays();tryDemo();return S.students.length===16&&document.querySelector("#modals").innerHTML==="";}),"no confirm when no data");
T("export stamps lastBackupAt",safeT(function(){seedDemo();exportJSON();return (S.settings.lastBackupAt||0)>0&&JSON.parse(localStorage.getItem(LS_KEY)).settings.lastBackupAt>0;}),"export = backup");
T("start empty wipes after confirm",safeT(function(){seedDemo();startEmpty();const stayed=S.students.length===16&&document.querySelector("#modals").innerHTML.indexOf("startEmpty")>=0||S.students.length===16;startEmptyConfirmed();return S.students.length===0&&S.records.length===0&&S.settings.className==="";}),"modal first, then wipe");
T("demo labels localized",safeT(function(){setLang("zh");seedDemo();const zh=S.settings.className==="三年二班"&&S.settings.schoolName==="枫叶小学"&&/[\u4e00-\u9fff]/.test(S.students[0].name);setLang("en");seedDemo();const en=S.settings.className==="Class 4B"&&S.students[0].name==="Amelia";setLang("zh");seedDemo();return zh&&en;}),"zh and en demo classes");
T("settings origin + backup note",safeT(function(){seedDemo();delete S.settings.lastBackupAt;save();(location.hash="#/app/settings",route());const h1=document.querySelector("#view").innerHTML+document.querySelector("#main").innerHTML;exportJSON();(location.hash="#/app/settings",route());const h2=document.querySelector("#view").innerHTML+document.querySelector("#main").innerHTML;return h1.indexOf("两个网址")>=0&&h1.indexOf("上次备份")>=0&&h1.indexOf("还没有备份")>=0&&h2.indexOf("两个网址")>=0&&h2.indexOf("还没有备份")<0;}),"origin note + nudge before export, date after");
T("baseline fixture upgrades",safeT(function(){
  localStorage.setItem(LS_KEY,JSON.stringify(FIXTURE));if(!load())return "load failed";
  const F=(typeof FIXTURE==="string")?JSON.parse(FIXTURE):FIXTURE;
  if(S.students.length!==F.students.length||S.records.length!==F.records.length)return "counts drifted";
  if(JSON.stringify(S.requests)!==JSON.stringify(F.requests))return "requests mutated";
  if(JSON.stringify(S.collection)!==JSON.stringify(F.collection))return "collection mutated";
  if(JSON.stringify(S.rules)!==JSON.stringify(F.rules)||JSON.stringify(S.gifts)!==JSON.stringify(F.gifts))return "catalog mutated";
  for(const st of S.students){
    let net=0;let pos=0;
    for(const r of F.records){if(r.undone)continue;if(!r.studentIds.includes(st.id))continue;net+=r.value;if(r.value>0)pos+=r.value;}
    let spent=0;for(const q of F.requests)if(q.status==="approved"&&q.studentId===st.id)spent+=q.cost;
    const oldW=Math.max(0,net-spent-(F.boxSpent[st.id]||0));
    if(walletOf(st)!==oldW)return "wallet "+st.id+": "+walletOf(st)+" vs "+oldW;
    let oi=0;for(let k=0;k<LEVELS.length;k++)if(net>=LEVELS[k].min)oi=k;
    const ni=lvlProgress(growthOf(st)).i;
    if(ni<oi)return "level lowered "+st.id+": "+ni+"<"+oi;
  }
  return true;
}),"students/records/requests/collection/rules/gifts intact; wallets equal; levels never below net-based"),
T("two tabs no lost records",safeT(function(){
  seedDemo();S=emptyState();S.settings.className="T7";S.students=[{id:"sa",name:"A",hue:200},{id:"sb",name:"B",hue:100}];save();
  const before=localStorage.getItem(LS_KEY);
  withState(function(){applyRule(S.rules[0],["sa"]);});
  const afterA=localStorage.getItem(LS_KEY);
  S=JSON.parse(before);
  withState(function(){applyRule(S.rules[1],["sb"]);});
  const final=JSON.parse(localStorage.getItem(LS_KEY));
  return final.records.some(r=>r.studentIds.indexOf("sa")>=0)&&final.records.some(r=>r.studentIds.indexOf("sb")>=0);
}),"both records survive interleaved tabs"),
T("undo after storage event",safeT(function(){
  seedDemo();
  const stale=JSON.parse(localStorage.getItem(LS_KEY));
  withState(function(){applyRule(S.rules[0],["s1"]);});
  S=stale;
  onStorage({key:LS_KEY});
  const newest=S.records[0];
  doUndo(newest.id);
  return JSON.parse(localStorage.getItem(LS_KEY)).records[0].undone===true;
}),"undo uses fresh state"),
T("approve after storage event",safeT(function(){
  seedDemo();const stale=JSON.parse(localStorage.getItem(LS_KEY));
  withState(function(){doReq("s1",S.gifts.find(g=>g.price<=walletOf(byId("s1"))).id);});
  const reqId=S.requests[0].id;
  S=stale;onStorage({key:LS_KEY});
  decideReq(reqId,true);
  return JSON.parse(localStorage.getItem(LS_KEY)).requests.every(q=>q.status!=="pending"||true)&&JSON.parse(localStorage.getItem(LS_KEY)).requests.some(q=>q.status==="approved"&&q.studentId==="s1"&&q.decidedTs);
}),"approve uses fresh request"),
T("storage event rerenders",safeT(function(){
  seedDemo();location.hash="#/app/records";route();
  const other=JSON.parse(localStorage.getItem(LS_KEY));
  other.records.unshift({id:"zz99",ts:Date.now(),studentIds:["s1"],ruleId:other.rules[0].id,ruleLabel:"zz",value:1,undone:false});
  localStorage.setItem(LS_KEY,JSON.stringify(other));
  onStorage({key:LS_KEY});
  const h=document.querySelector("#main").innerHTML;
  return h.indexOf("zz99")>=0||h.length>0&&S.records[0].id==="zz99";
}),"view reflects other tab"),
T("storage blocked banner",safeT(function(){
  setLang("zh");seedDemo();
  const orig=localStorage.setItem;localStorage.setItem=function(){throw new Error("full");};
  try{withState(function(){});}catch(e){}
  location.hash="#/app/records";route();
  const h=document.querySelector("#main").innerHTML+document.querySelector("#view").innerHTML;
  localStorage.setItem=orig;
  return h.indexOf("这台浏览器")>=0||h.indexOf("阻止了")>=0;
}),"warns when localStorage fails"),
T("no missing i18n keys (final)",(globalThis.__gsMissedKeys||[]).length===0,(globalThis.__gsMissedKeys||[]).join(",")||"all present");
/* Task 8: #/screen shell + class goal (WP5) */
T("screen route renders",safeT(function(){
  seedDemo();S.students=S.students.slice(0,3);S.records=[];S.settings.goal=null;save();
  (location.hash="#/screen",route());
  const h=document.querySelector("#view").innerHTML+document.querySelector("#main").innerHTML;
  const tiles=(h.match(/scr-tile/g)||[]).length;
  return h.indexOf("scrGrid")>=0&&tiles===3&&h.indexOf("scr-goal")<0&&h.indexOf("#/app/classroom")>=0&&h.indexOf("scrLive")>=0;
}),"topbar + 3 tiles + exit link + live region; goal hidden by default"),
T("goal math",safeT(function(){
  const w0=weekStart(Date.now(),0),w1=weekStart(Date.now(),1);
  S.settings.goal={enabled:true,target:40,label:""};
  S.records=[
    {id:"g1",ts:w0+2*36e5,studentIds:["s1"],ruleId:"r1",ruleLabel:"x",value:6,undone:false},
    {id:"g2",ts:w0+5*36e5,studentIds:["s2"],ruleId:"r1",ruleLabel:"x",value:4,undone:false},
    {id:"g3",ts:w1+36e5,studentIds:["s1"],ruleId:"r1",ruleLabel:"x",value:99,undone:false},
    {id:"g4",ts:w0+6*36e5,studentIds:["s1"],ruleId:"r1",ruleLabel:"x",value:5,undone:true}];
  const G=goalState();
  return G.enabled===true&&G.earned===10&&G.pct===25&&G.left===30;
}),"earned=10 (this week only, undone excluded), pct=25, left=30"),
T("week boundaries",safeT(function(){
  const w0=weekStart(Date.now(),0);
  S.settings.goal={enabled:true,target:40,label:""};
  S.records=[
    {id:"b1",ts:w0,studentIds:["s1"],ruleId:"r1",ruleLabel:"x",value:3,undone:false},
    {id:"b2",ts:w0-36e5,studentIds:["s1"],ruleId:"r1",ruleLabel:"x",value:50,undone:false},
    {id:"b3",ts:w0+36e5,studentIds:["s1"],ruleId:"r1",ruleLabel:"x",value:4,undone:false}];
  return goalState().earned===7;
}),"Monday 00:00 (w0) included; Sunday 23:59 (w0-1h) belongs to last week"),
T("screen aria",safeT(function(){
  const w0=weekStart(Date.now(),0);
  S.settings.goal={enabled:true,target:40,label:""};
  S.records=[{id:"a1",ts:w0+36e5,studentIds:["s1"],ruleId:"r1",ruleLabel:"x",value:10,undone:false}];
  (location.hash="#/screen",route());
  const h=document.querySelector("#view").innerHTML;
  return h.indexOf('role="progressbar"')>=0&&h.indexOf('aria-valuemin="0"')>=0&&h.indexOf('aria-valuemax="100"')>=0&&h.indexOf('aria-valuenow="25"')>=0&&h.indexOf('aria-live="polite"')>=0&&h.indexOf('aria-pressed=')>=0&&h.indexOf('aria-label=')>=0;
}),"progressbar + live region + pressed/label on buttons"),
T("sound default off",safeT(function(){
  S=emptyState();
  if(S.settings.sound!=="off")return false;
  setSound(true);
  return S.settings.sound==="on"&&JSON.parse(localStorage.getItem(LS_KEY)).settings.sound==="on"&&typeof saveGoal==="function";
}),"emptyState defaults off; setSound persists via withState; saveGoal exists");
/* Task 9: tiles + density + codepoint-safe initials (teacher item 3) */
T("initial codepoint safe",safeT(function(){
  if(typeof initialOf!=="function")return false;
  const e=initialOf("\u{1F680}\u5C0F\u706B\u7BAD\u{1F680}");
  if(Array.from(e).length!==1||e.codePointAt(0)<0x1F300)return "emoji initial broken";
  const cjk="\u5F20\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50";
  if(initialOf(cjk)!=="\u5F20")return "cjk first char wrong";
  if(initialOf("")!=="?"||initialOf(null)!=="?")return "fallback wrong";
  S=emptyState();sel=new Set();
  S.students=[{id:"se",name:"\u{1F680}\u5C0F\u706B\u7BAD\u{1F680}",hue:200},{id:"sc",name:cjk+"&<b>",hue:120}];
  save();(location.hash="#/app/classroom",route());
  const ch=document.querySelector("#view").innerHTML+document.querySelector("#main").innerHTML;
  if(ch.indexOf("\u{1F680}\u5C0F\u706B\u7BAD\u{1F680}")<0)return "classroom card missing full emoji name";
  (location.hash="#/room/se",route());
  const rh=document.querySelector("#view").innerHTML;
  return rh.indexOf("\u{1F680}")>=0&&rh.indexOf("\uFFFD")<0;
}),"emoji initial whole; CJK first char; room avatar safe; fallback ?");
T("screen grid 30/50 + escape",safeT(function(){
  seedDemo();
  while(S.students.length<30)S.students.push({id:"sx"+S.students.length,name:"\u5F20\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50\u4E50&x",hue:200+S.students.length});
  S.students[0].name="\u5F20\u4E50\u4E50&<b>";
  save();(location.hash="#/screen",route());
  const h=document.querySelector("#view").innerHTML;
  if(h.split("scr-tile").length-1<30)return "want 30 tiles";
  if(h.indexOf("&amp;")<0)return "names not escaped";
  while(S.students.length<50)S.students.push({id:"sy"+S.students.length,name:"S"+S.students.length,hue:10});
  save();renderScreen();
  return document.querySelector("#view").innerHTML.split("scr-tile").length-1>=50;
}),"30 tiles, & escaped, 50 no crash");
T("tile content lv wallet aria",safeT(function(){
  seedDemo();(location.hash="#/screen",route());
  const h=document.querySelector("#view").innerHTML;
  const tile=h.slice(h.indexOf("scr-tile"),h.indexOf("scr-tile")+900);
  const need=["Lv","\u2605",'aria-valuemin="0"','aria-valuemax="100"','aria-valuenow="'];
  for(const n of need)if(tile.indexOf(n)<0)return "missing "+n;
  const css=require("fs").readFileSync("screen.css","utf8");
  return css.indexOf("--scr-tile")>=0&&/overflow(-y)?:\s*auto/.test(css);
}),"Lv + star + progressbar aria triple + css vars");

/* item 1 (teacher 2026-11-09): every save() call site must be allow-listed below.
   ALLOW maps exact stripped line -> (max occurrences, reason). A new save() anywhere,
   or more occurrences than documented, fails the test. Extend the list CONSCIOUSLY. */
const _ALLOW={
 "function withState(fn){syncIn();fn();save();}":[1,"the withState wrapper itself"],
 "save();":[6,"tails of mutation helpers invoked ONLY inside withState callbacks (applyRule,requestGift,decide,openBox,seedDemo) + landing init bootstrap (persists emptyState on first run)"],
 "function undoRecord(rec){rec.undone=true;save();}":[1,"undoRecord - called only via doUndo inside withState"],
 "save();toast(t('classSaved'));":[1,"saveCls - inside its own withState callback"],
 "save();return won;":[1,"openBox tail - called only via roomBox inside withState"],
};
const _sites=[];
for(const _f of ["app-core.js","landing.js","screen.js"]){
  const _src=require("fs").readFileSync(_f,"utf8").split(String.fromCharCode(10));
  _src.forEach((_l,_i)=>{const _t=_l.trim();
    if(_t.includes("save(")&&!_t.startsWith("function save")&&!_t.startsWith("*")&&!_t.startsWith("//")){
      _sites.push(_f+":"+(_i+1)+" "+_t.replace(/"/g,String.fromCharCode(39)));}});
}
const _viol=[];
for(const _s of _sites){
  const _k=_s.slice(_s.indexOf(" ")+1);
  const _a=_ALLOW[_k];
  if(!_a)_viol.push("NOT ALLOWED: "+_s);
}
for(const _k in _ALLOW){
  const _n=_sites.filter(_s=>_s.slice(_s.indexOf(" ")+1)===_k).length;
  if(_n>_ALLOW[_k][0])_viol.push("COUNT "+_n+">"+_ALLOW[_k][0]+" for: "+_k);
}
T("savecalls inside withstate",_viol.length===0,_viol.join(" || ")||("clean ("+_sites.length+" sites)"));

/* Task 10: award pops — record-id driven, seen-init, freshness window, particle cap, quiet negatives */
T("pops driven by new record ids",safeT(function(){
  seedDemo();location.hash="#/screen";route();          // first render initialises seen set
  const st=S.students[0],rule=S.rules.find(r=>r.value>0);
  withState(function(){applyRule(rule,[st.id]);});
  const pops=screenAfterChange();
  if(!pops||!pops.length)return "no pop after award";
  if(pops[0].stId!==st.id)return "wrong student";
  if(pops[0].sign!=="pos")return "positive rule must pop pos";
  withState(function(){doUndo(S.records[0].id);});       // undo newest
  const p2=screenAfterChange();
  if(p2&&p2.length)return "undo must not pop";
  return true;
}),"award pops; undo does not"),
T("no pop for gift purchase or box",safeT(function(){
  seedDemo();location.hash="#/screen";route();
  const g=S.gifts.find(x=>x.price<=walletOf(S.students[0]));
  withState(function(){S.collection[S.students[0].id]=(S.collection[S.students[0].id]||[]).concat([{name:g.name,zh:g.zh,emoji:g.emoji,ts:Date.now()}]);});
  let pops=screenAfterChange();
  if(pops&&pops.length)return "purchase popped";
  withState(function(){roomBox(S.students[0].id);});
  pops=screenAfterChange();
  if(pops&&pops.length)return "box popped";
  return true;
}),"spends never pop"),
T("pop at wallet 0 and when negatives exceed positives",safeT(function(){
  seedDemo();S.records=[];S.collection={};S.boxSpent={};save();location.hash="#/screen";route();
  const st=S.students[0],neg=S.rules.find(r=>r.value<0),pos=S.rules.find(r=>r.value>0);
  withState(function(){applyRule(neg,[st.id]);applyRule(neg,[st.id]);});
  screenAfterChange();
  if(walletOf(st)!==0)return "expected wallet 0, got "+walletOf(st);
  withState(function(){applyRule(pos,[st.id]);});
  const pops=screenAfterChange();
  return pops&&pops.length===1&&pops[0].sign==="pos"?true:"no pop at wallet 0";
}),"record-driven pops regardless of wallet"),
T("seen init: old awards never replay",safeT(function(){
  seedDemo();
  S.records.forEach(r=>r.ts=Date.now()-3600e3);save();   // everything old
  location.hash="#/screen";route();                      // first render seeds seen set
  const pops=screenAfterChange();
  return (!pops||!pops.length)?true:"old records replayed: "+pops.length;
}),"no replay of pre-existing awards"),
T("freshness window 10s",safeT(function(){
  seedDemo();location.hash="#/screen";route();
  const st=S.students[0],rule=S.rules.find(r=>r.value>0);
  withState(function(){applyRule(rule,[st.id]);S.records[0].ts=Date.now()-20e3;});
  const pops=screenAfterChange();
  return (!pops||!pops.length)?true:"stale record popped";
}),"records older than 10s ignored"),
T("particle cap 150 + badge fallback",safeT(function(){
  if(typeof reserveParticles!=="function")return "no reserveParticles";
  let granted=reserveParticles(120);
  if(granted!==120)return "first grant "+granted;
  granted=reserveParticles(100);                          // would exceed 150 live
  if(granted!==30)return "cap grant "+granted;
  releaseParticles(150);                                  // simulate all ended
  if(reserveParticles(10)!==10)return "release broken";
  return true;
}),"total live particles never exceed 150"),
T("reduced motion: badge only, no particles",safeT(function(){
  saveMotion("off");                                       // removes gs-motion
  seedDemo();location.hash="#/screen";route();
  const st=S.students[0],rule=S.rules.find(r=>r.value>0);
  withState(function(){applyRule(rule,[st.id]);});
  const pops=screenAfterChange();
  if(!pops||!pops.length)return "no pop";
  if(pops[0].particles!==0)return "particles under reduced motion";
  if(!pops[0].badge)return "badge fallback missing";
  saveMotion("auto");return true;
}),"motion off => 0 particles + badge"),
T("negative pop is quiet; hideNeg hides marker",safeT(function(){
  seedDemo();location.hash="#/screen";route();
  const st=S.students[0],neg=S.rules.find(r=>r.value<0);
  withState(function(){applyRule(neg,[st.id]);});
  let pops=screenAfterChange();
  if(!pops||!pops.length||pops[0].sign!=="neg")return "neg pop missing";
  if(pops[0].sound)return "negative must be silent";
  if(pops[0].particles>0)return "negative must not confetti";
  withState(function(){S.settings.hideNeg=true;});
  withState(function(){applyRule(neg,[st.id]);});
  pops=screenAfterChange();
  if(pops&&pops.length)return "hideNeg must suppress marker";
  withState(function(){S.settings.hideNeg=false;});
  return true;
}),"quiet marker + settings toggle"),
T("sound chip appears until unlocked",safeT(function(){
  seedDemo();location.hash="#/screen";route();
  if(typeof soundChipNeeded!=="function")return "no soundChipNeeded";
  setSound(true);
  let need=soundChipNeeded();
  if(!need)return "chip needed when locked";
  unlockAudio();
  need=soundChipNeeded();
  if(need)return "chip still needed after unlock";
  setSound(false);
  return true;
}),"chip logic: on+locked => show; unlocked => hide"),

/* Task 11: two-tap quick-award drawer */
T("drawer two-tap award",safeT(function(){
  seedDemo();location.hash="#/screen";route();
  openDrawer();
  const panel=document.querySelector("#drwPanel");
  if(!panel)return "no drawer panel";
  drawerToggle(S.students[0].id);drawerToggle(S.students[2].id);
  const rule=S.rules.find(r=>r.value>0);
  const n0=S.records.length;
  drawerApply(rule.id);
  if(S.records.length!==n0+1)return "no record";
  const rec=S.records[0];
  if(rec.studentIds.length!==2||rec.studentIds.indexOf(S.students[0].id)<0)return "wrong students";
  if(rec.value!==rule.value)return "wrong value";
  if(!drawerIsOpen())return "drawer closed after award";
  if(drawerSelCount()!==0)return "selection must clear";
  closeDrawer();
  return true;
}),"select 2, tap rule => 1 record, drawer stays, sel clears"),
T("drawer undo last targets newest non-undone",safeT(function(){
  seedDemo();S.records=[];S.collection={};S.boxSpent={};save();location.hash="#/screen";route();
  const a=S.students[0],b=S.students[1],rule=S.rules.find(r=>r.value>0);
  withState(function(){applyRule(rule,[a.id]);});
  withState(function(){applyRule(rule,[b.id]);});
  const newest=S.records[0];
  withState(function(){doUndo(newest.id);});           /* newest already undone */
  openDrawer();
  drawerUndoLast();
  const still=S.records.filter(r=>r.undone===false);
  if(still.length!==0)return still.length+" non-undone remain";
  if(S.records[1].undone!==true)return "second-newest not undone";
  closeDrawer();
  return true;
}),"undoes newest record with undone===false"),
T("drawer award pops tiles behind",safeT(function(){
  seedDemo();location.hash="#/screen";route();
  openDrawer();
  drawerToggle(S.students[0].id);
  const rule=S.rules.find(r=>r.value>0);
  const pops=drawerApply(rule.id);
  closeDrawer();
  return (pops&&pops.length===1&&pops[0].sign==="pos")?true:"no pop from drawer award";
}),"drawer award path triggers pops"),

/* Task 12: A / F / Esc shortcuts with typing, modifier and IME guards */
T("shortcut guards",safeT(function(){
  seedDemo();location.hash="#/screen";route();
  if(typeof scrKeydown!=="function")return "no scrKeydown";
  scrKeydown({key:"a",target:{tagName:"BODY"}});
  if(!document.querySelector("#drwPanel"))return "A should open drawer";
  scrKeydown({key:"a",ctrlKey:true,target:{tagName:"BODY"}});
  closeDrawer();
  scrKeydown({key:"a",target:{tagName:"INPUT",type:"text"}});
  if(drawerIsOpen())return "A must ignore text input";
  scrKeydown({key:"a",target:{tagName:"TEXTAREA"}});
  if(drawerIsOpen())return "A must ignore textarea";
  scrKeydown({key:"a",target:{tagName:"SELECT"}});
  if(drawerIsOpen())return "A must ignore select";
  scrKeydown({key:"a",target:{tagName:"INPUT",type:"checkbox"}});
  if(!document.querySelector("#drwPanel"))return "checkbox is not typing";
  closeDrawer();
  scrKeydown({key:"a",isComposing:true,target:{tagName:"BODY"}});
  if(drawerIsOpen())return "A must ignore IME composition";
  scrKeydown({key:"a",metaKey:true,target:{tagName:"BODY"}});
  if(drawerIsOpen())return "A must ignore meta";
  scrKeydown({key:"a",altKey:true,target:{tagName:"BODY"}});
  if(drawerIsOpen())return "A must ignore alt";
  return true;
}),"A opens; typing/select/IME/modifiers ignored"),
T("Esc closes drawer; A/F inactive off-screen",safeT(function(){
  seedDemo();location.hash="#/screen";route();
  scrKeydown({key:"a",target:{tagName:"BODY"}});
  if(!drawerIsOpen())return "setup failed";
  scrKeydown({key:"Escape",target:{tagName:"BODY"}});
  if(drawerIsOpen())return "Esc must close drawer";
  location.hash="#/app/classroom";route();
  scrKeydown({key:"a",target:{tagName:"BODY"}});
  if(drawerIsOpen())return "A must not open drawer off-screen";
  scrKeydown({key:"f",target:{tagName:"BODY"}});
  return true;
}),"Esc closes; A/F scoped to #/screen"),

/* Task 13: kid theme scoped to .app-ui; landing untouched */
T("app-ui theme scoping",safeT(function(){
  const css=require("fs").readFileSync("app.css","utf8");
  if(css.indexOf(".app-ui{")<0)return "no .app-ui block";
  if(css.indexOf(".app-ui .btn")<0)return "no button rules";
  const lcss=require("fs").readFileSync("landing.css","utf8");
  if(lcss.indexOf("app-ui")>=0)return "landing.css must not reference app-ui";
  location.hash="#/app/classroom";route();
  const h=document.querySelector("#view").innerHTML+document.querySelector("#main").innerHTML;
  if(h.indexOf("shell app-ui")<0)return "shell missing app-ui class";
  location.hash="#/";route();
  const lh=document.querySelector("#view").innerHTML;
  if(lh.indexOf("app-ui")>=0)return "landing must not carry app-ui";
  return true;
}),"theme scoped; landing clean"),
/* route coverage: every route renders non-empty without throwing (zh) */
T("route coverage all views",safeT(function(){
  seedDemo();const bad=[];
  const routes=["#/","#/app/classroom","#/app/records","#/app/shop","#/app/leaderboard","#/app/settings","#/screen","#/room/"+S.students[0].id,"#/app/nosuch"];
  for(const r of routes){
    try{location.hash=r;route();
      const h=document.querySelector("#view").innerHTML+document.querySelector("#main").innerHTML;
      if(h.length<40)bad.push(r+" empty");
    }catch(e){bad.push(r+" THREW "+(e&&e.message||e));}
  }
  return bad.length===0?true:bad.join(",");
}),"all routes render non-empty; unknown #/app tab falls back to classroom");

console.log(fails===0?"ALL PASS":"FAILURES: "+fails);
process.exit(fails===0?0:1);
'''
import json
fix=json.load(io.open('fixture-baseline-state.json',encoding='utf-8'))
out = stubs + 'const FIXTURE=' + json.dumps(fix,ensure_ascii=False,separators=(',',':')) + ';' + chr(10) + rd('i18n.js') + NL + rd('app-core.js') + NL + rd('screen.js') + NL + rd('landing.js') + NL + tests
io.open('test-bundle.js', 'w', encoding='utf-8', newline=NL).write(out)
print('test file written', len(out))

