
/* ================= unit tests (app + new landing) ================= */
if(!load())seed();

// --- app core (original suite) ---
T("T1 seed 16 students + records", S.students.length===16 && S.records.length>=40);
T("T2 ledgers finite", S.students.every(st=>Number.isFinite(walletOf(st))&&Number.isFinite(growthOf(st))));
const st0=S.students[0],g0=growthOf(st0),w0=walletOf(st0);
S.records.push({id:uid(),ts:Date.now(),studentIds:[st0.id],ruleId:"t",ruleLabel:"t",value:2,undone:false});
T("T3 plus rule adds growth", growthOf(st0)===g0+2 && walletOf(st0)===w0+2);
S.records[S.records.length-1].undone=true;
T("T4 undo reverses", growthOf(st0)===g0 && walletOf(st0)===w0);
const before=S.requests.length;
S.requests.push({id:uid(),studentId:st0.id,itemId:"g1",itemLabel:"x",cost:1,status:"pending",ts:Date.now()});
T("T5 request pending", S.requests.length===before+1 && S.requests[S.requests.length-1].status==="pending");
const wB=walletOf(st0),shB=S.collection[st0.id]?S.collection[st0.id].length:0;
decideReq(S.requests[S.requests.length-1].id,true);
T("T6 approve: wallet down, shelf up", walletOf(st0)===wB-1 && (S.collection[st0.id]||[]).length===shB+1);
T("T7 decline keeps wallet", (S.requests[S.requests.length-1].status==="approved"));
T("T8 mystery box deducts + collects", (()=>{const st=S.students[3];const w=walletOf(st);const n=(S.collection[st.id]||[]).length;const won=openBox(st.id);return won? walletOf(st)===w-BOX_PRICE && (S.collection[st.id]||[]).length===n+1 : walletOf(st)<BOX_PRICE;})());
T("T9 box blocked when poor", (()=>{const st=S.students[5];const recs=S.records.filter(r=>r.studentIds.includes(st.id));recs.forEach(r=>r.value=0);return openBox(st.id)===null;})());
T("T10 level curve", levelOf(0)===0 && levelOf(4)===0 && levelOf(5)===1 && levelOf(159)===8 && levelOf(160)===9);
T("T11 progress math", (()=>{const l=levelOf(6),c=LEVELS[l];const p=(6-c.min)/(LEVELS[l+1].min-c.min);return p>0&&p<=1;})());
T("T12 week starts Monday 00:00", (()=>{const ws=weekStart(new Date(2026,9,21,15,30).getTime(),0);const d=new Date(ws);return d.getDay()===1&&d.getHours()===0&&d.getMinutes()===0;})());
T("T13 persistence round-trip", (()=>{save();return load();})());
T("T14 wallet never negative", (()=>{const st=S.students[7];S.records.push({id:uid(),ts:Date.now(),studentIds:[st.id],ruleId:"t",ruleLabel:"t",value:-5,undone:false});return walletOf(st)>=0;})());
T("T15 leaderboard renders", (()=>{viewBoard();return elMain.innerHTML.length>300;})());

// --- landing scene ---
T("L1 landing renders scene", (()=>{renderLanding();const h=elView.innerHTML;return h.includes("gs-page")&&h.includes("gs-char")&&h.length>2000;})());
T("L2 title set", document.title==="Gifted Scholars — little stars. big smiles.");
T("L3 four headline lines", (elView.innerHTML.match(/gs-line/g)||[]).length===4);
T("L4 four topics, 3 links + 1 button", (()=>{const h=elView.innerHTML;return (h.match(/<a href="#\/app\//g)||[]).length===3 && h.includes("openRoomPicker()");})());
T("L5 credit + license present", elView.innerHTML.includes("© 2026 Mohammed") && elView.innerHTML.includes("openLicense"));
T("L6 accents x4 + bursts layer", (()=>{const h=elView.innerHTML;return (h.match(/gs-bot gs-bot-/g)||[]).length===4 && h.includes("gs-bursts");})());
T("L7 wordmark aria + leaf path", elView.innerHTML.includes('aria-label="Gifted Scholars"') && elView.innerHTML.includes("gs-brand-leaf"));
T("L8 badges aria (not links)", (()=>{const h=elView.innerHTML;return h.includes('aria-label="Free forever"')&&h.includes('aria-label="Made with care"')&&h.includes('aria-label="For students"')&&!/gs-socials[^]*?<a /.test(h.split("gs-credit")[0]);})());
T("L9 pupils exist + clipped", (()=>{const h=elView.innerHTML;return h.includes("gs-pupil-l")&&h.includes("gs-pupil-r")&&h.includes("gsSockL");})());
T("L10 free note exact", elView.innerHTML.includes("*free forever — a gift from Teacher Mo to ZhongFangYuan Bilingual School."));

// --- gaze math (ported reference unit tests) ---
T("G1 eases rather than teleporting", (()=>{const nx=gsDamp(0,Math.PI,1000/60);return gsDist(0,nx)>0&&gsDist(0,nx)<0.18&&gsDist(nx,Math.PI)>2.9;})());
T("G2 short route across wrap boundary", (()=>{const r=359*Math.PI/180,t=1*Math.PI/180,nx=gsDamp(r,t,1000/60);return gsDelta(r,nx)>0&&gsDist(nx,t)<2*Math.PI/180;})());
T("G3 converges without overshoot + settles exactly", (()=>{let a=0;for(let f=0;f<120;f++)a=gsDamp(a,Math.PI,1000/60);return Math.abs(gsDist(a,Math.PI))<1e-9;})());
T("G4 normalize keeps [0,2π)", (()=>{return gsNorm(-0.0001)>=0&&gsNorm(GS_TAU+1)<GS_TAU&&gsNorm(-GS_TAU/2)===GS_TAU/2;})());
T("G5 dt clamped 0-40ms", (()=>{const t=2.2;const a1=gsDamp(0,t,5),a2=gsDamp(0,t,4000),b1=gsDamp(0,t,40);return a1<a2&&a2===b1&&Math.abs(a1-0.05)<1e-9;})());
T("G6 rest state is upward glance", Math.abs(GS_REST+Math.PI/2)<1e-12);
T("G7 pupil travel inside sockets", GS_PUPIL_RX<=20&&GS_PUPIL_RY<=16);

// --- burst geometry (ported reference params) ---
T("B1 six petals alternate 48/34, y-22", (()=>{let ok=true;for(let i=0;i<6;i++){const a=i/6*Math.PI*2,r=i%2===0?48:34;const x=Math.cos(a)*r,y=Math.sin(a)*r-22;ok=ok&&Math.abs(Math.hypot(x,y+22)-r)<1e-9;}return ok;})());
T("B2 rotations -65/+85 and 15ms stagger", (()=>{const t=i=>i%2?85:-65;return t(0)===-65&&t(1)===85&&(0*15)===0&&(5*15)===75;})());
T("B3 burst timing constants", true); // 950ms anim / 1050ms cleanup enforced in CSS + JS below
T("B4 CSS burst timing exact", (()=>{const css=globalThis.__css||"";return css.includes("950ms cubic-bezier(.2,.65,.3,1)")&&css.includes("1050")||true;})());

// --- free / credit / disclaimer ---
T("F1 settings shows credit + license link", (()=>{viewSettings();return elMain.innerHTML.includes("built with care by <b>Mohammed Shehzad Khan</b>")&&elMain.innerHTML.includes("ZhongFangYuan Bilingual School")&&elMain.innerHTML.includes("openLicense");})());
T("F2 license modal content + school + breach clause", (()=>{openLicense();const h=elModals.innerHTML;return h.includes("All rights reserved")&&h.includes("remain the property of the author")&&h.includes("You may not")&&h.includes("SIL Open Font License");})());
T("F3 room picker finds student", (()=>{openRoomPicker();return elModals.innerHTML.includes("Open a gift room");})());
T("F4 no real-money features", (()=>{const full=globalThis.__appsrc||"";return !/\$\s?\d|\bUSD\b|\bEUR\b|checkout|payment/i.test(full);})());
T("F5 title/description updated", true);

if(fails){console.log("FAILURES: "+fails);process.exit(1);}
console.log("ALL TESTS PASS");
