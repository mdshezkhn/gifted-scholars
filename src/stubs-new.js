// fake DOM elements sufficient for render functions
function noop2(){}
function fakeEl(){const e={innerHTML:"",textContent:"",style:{},value:"",checked:true,disabled:false,
  setAttribute:noop2,getAttribute:()=>null,appendChild:noop2,remove:noop2,addEventListener:noop2,
  click:noop2,focus:noop2,
  classList:{toggle:noop2,add:noop2,remove:noop2,contains:()=>false},
  querySelector:()=>fakeEl(),querySelectorAll:()=>[],parentElement:null,
  getBoundingClientRect:()=>({left:0,top:0,width:520,height:560})};return e;}
const elView=fakeEl(),elMain=fakeEl(),elModals=fakeEl(),elToasts=fakeEl();
const store={};
globalThis.localStorage={getItem:k=>store[k]||null,setItem:(k,v)=>store[k]=v,removeItem:k=>delete store[k]};
const mq=q=>({matches:false,addEventListener:noop2,removeEventListener:noop2});
globalThis.matchMedia=mq;
globalThis.ResizeObserver=class{observe(){}disconnect(){}unobserve(){}};
globalThis.document={querySelector:s=>s==="#view"?elView:(s==="#main"?elMain:(s==="#modals"?elModals:(s==="#toasts"?elToasts:fakeEl()))),
  querySelectorAll:()=>[],createElement:()=>fakeEl(),addEventListener:noop2,getElementById:()=>fakeEl(),body:{appendChild:noop2},title:"",hidden:false};
globalThis.window={addEventListener:noop2,removeEventListener:noop2,scrollTo:noop2};
globalThis.location={hash:"#/"};
globalThis.setTimeout=fn=>0;globalThis.clearTimeout=()=>{};globalThis.cancelAnimationFrame=()=>{};
globalThis.requestAnimationFrame=()=>0;
globalThis.Blob=class{constructor(){}};globalThis.URL={createObjectURL:()=>"blob:x",revokeObjectURL:noop2};
globalThis.confirmModal=(t,b,y)=>{y();};
let fails=0;const T=(n,c,i)=>{console.log((c?"PASS":"FAIL")+" "+n+(c?"":" | "+i));if(!c)fails++;};
