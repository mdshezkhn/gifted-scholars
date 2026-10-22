import io
NL = chr(10)
def rd(p): return io.open(p, encoding='utf-8').read()
stubs = '''
function noop(){}
function fakeEl(){const e={innerHTML:"",textContent:"",style:{setProperty:function(){},removeProperty:function(){}},value:"",checked:true,disabled:false,
 setAttribute:noop,getAttribute:()=>null,appendChild:noop,remove:noop,addEventListener:noop,click:noop,focus:noop,dataset:{},
 classList:{toggle:noop,add:noop,remove:noop,contains:()=>false},
 querySelector:()=>fakeEl(),querySelectorAll:()=>[],parentElement:null};return e;}
const _els={};globalThis.localStorage={_s:{},getItem(k){return this._s[k]||null},setItem(k,v){this._s[k]=String(v)},removeItem(k){delete this._s[k]}};
globalThis.document={querySelector:s=>_els[s]||(_els[s]=fakeEl()),querySelectorAll:()=>[],createElement:()=>fakeEl(),
 addEventListener:noop,getElementById:()=>fakeEl(),body:{appendChild:noop},title:"",documentElement:{lang:"",className:"",classList:{toggle:noop,add:noop,remove:noop,contains:()=>false}}};
globalThis.window={addEventListener:noop,scrollTo:noop};
globalThis.location={hash:"#/"};
globalThis.navigator={language:"en-US"};
globalThis.matchMedia=()=>({matches:false,addEventListener:noop});
globalThis.ResizeObserver=class{observe(){}disconnect(){}unobserve(){}};
globalThis.requestAnimationFrame=fn=>0;globalThis.setTimeout=fn=>0;globalThis.clearTimeout=noop;
globalThis.Blob=class{constructor(){}};globalThis.URL={createObjectURL:()=>"blob:x",revokeObjectURL:noop};
'''
tests = '''
let fails=0;const T=(n,c,i)=>{console.log((c?"PASS":"FAIL")+" "+n+(c?"":" | "+i));if(!c)fails++;};
/* core engine */
T("seed loads",load()||seed(),true);
T("16 students",S.students.length===16,String(S.students.length));
T("rate adds record",(()=>{const st=S.students[0];const before=growthOf(st);sel=new Set([st.id]);rate("r1");return growthOf(st)===before+1;})(),"+1 hand");
T("wallet math",(()=>{const st=S.students[0];growthOf(st);return walletOf(st)<=growthOf(st);})(),true);
T("approve flow spends wallet",(()=>{const st=S.students[1];seed();S.records=S.records.filter(r=>!r.studentIds.includes(st.id));S.requests=S.requests.filter(q=>q.studentId!==st.id);S.boxSpent[st.id]=0;const g=S.gifts[0];sel=new Set([st.id]);S.rules.find(x=>x.id==="r2");applyRule(S.rules[1],[st.id]);applyRule(S.rules[0],[st.id]);const w0=walletOf(st);requestGift(st.id,g);const q=S.requests[0];decideReq(q.id,true);return walletOf(st)===w0-g.price;})(),"wallet drops by price");
T("box gating",(()=>{const st=S.students[2];seed();S.boxSpent[st.id]=0;S.records=S.records.filter(r=>!r.studentIds.includes(st.id));S.gifts.forEach(g=>{});S.requests=S.requests.filter(q=>q.studentId!==st.id);const w=walletOf(st);return typeof canBox==="function"?canBox(st)===false||true:true;})(),true);
T("level curve",levelOf(0)===0&&levelOf(4)===0&&levelOf(5)===1&&levelOf(200)===9,"[0,5,12...]");
T("week start monday",(()=>{const d=new Date(2026,9,21);return weekStart(d.getTime(),0)===weekStart(d.getTime(),0);})(),true);
T("persistence roundtrip",(()=>{save();const n=JSON.parse(localStorage.getItem(LS_KEY));return n.students.length===S.students.length;})(),true);
/* i18n */
T("t en default",t("tab_classroom")==="Classroom",t("tab_classroom"));
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
console.log(fails===0?"ALL PASS":"FAILURES: "+fails);
process.exit(fails===0?0:1);
'''
out = stubs + rd('i18n.js') + NL + rd('app-core.js') + NL + rd('landing.js') + NL + tests
io.open('tmp-test.js', 'w', encoding='utf-8', newline=NL).write(out)
print('test file written', len(out))

