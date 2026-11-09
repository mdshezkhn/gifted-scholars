const fs=require('fs');
function noop(){}
function fakeEl(){const e={innerHTML:"",textContent:"",style:{setProperty:noop,removeProperty:noop},value:"",checked:true,disabled:false,setAttribute:noop,getAttribute:()=>null,appendChild:noop,remove:noop,addEventListener:noop,click:noop,focus:noop,dataset:{},classList:{toggle:noop,add:noop,remove:noop,contains:()=>false},querySelector:()=>fakeEl(),querySelectorAll:()=>[],parentElement:null};return e;}
globalThis.localStorage={_s:{},getItem(k){return this._s[k]||null},setItem(k,v){this._s[k]=String(v)},removeItem(k){delete this._s[k]}};
globalThis.document={addEventListener:noop,createElement:()=>fakeEl(),querySelector:()=>fakeEl(),querySelectorAll:()=>[],documentElement:{classList:{contains:()=>false,add:noop,remove:noop},lang:""}};
globalThis.window=globalThis;globalThis.addEventListener=noop;globalThis.location={hash:""};
globalThis.__write=(p,d)=>fs.writeFileSync(p,d);
const src=fs.readFileSync('i18n.js','utf8')+"\n"+fs.readFileSync('app-core.js','utf8')+`
;seed();
sel=new Set(["s1","s3"]);applyRule(S.rules[0],[...sel]);
const st=S.students[0];
const g=S.gifts.find(g=>g.active!==false&&g.price<=walletOf(st)&&g.stock!==0);
doReq(st.id,g.id);
decide(S.requests[0],true);
sel=new Set(["s2"]);applyRule(S.rules[S.rules.length-1],[...sel]);
__write(process.argv[2],JSON.stringify(S));
console.log("students",S.students.length,"records",S.records.length,"requests",S.requests.length,"collection",Object.keys(S.collection).length);
`;
(0,eval)(src);
