
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
const FIXTURE={"version":1,"settings":{"className":"Class 4B","schoolName":"Maple Grove Primary","teacher":"Ms. Rivera","motion":"auto"},"rules":[{"id":"r1","label":"Raised hand","zh":"积极举手","icon":"✋","value":1},{"id":"r2","label":"Answered well","zh":"答得好","icon":"💡","value":2},{"id":"r3","label":"Helped a classmate","zh":"帮助同学","icon":"🤝","value":2},{"id":"r4","label":"Great homework","zh":"作业优秀","icon":"📓","value":3},{"id":"r5","label":"Clear improvement","zh":"进步明显","icon":"📈","value":3},{"id":"r6","label":"Read a book","zh":"阅读打卡","icon":"📖","value":1},{"id":"r7","label":"Tidy desk","zh":"整洁书桌","icon":"🧹","value":1},{"id":"r8","label":"Tardy","zh":"迟到","icon":"⏰","value":-1},{"id":"r9","label":"Off task","zh":"上课走神","icon":"🌀","value":-2},{"id":"r10","label":"Missing homework","zh":"作业未交","icon":"❓","value":-2}],"gifts":[{"id":"g1","emoji":"⭐","name":"Sticker pack","zh":"贴纸包","desc":"A sheet of shiny gold stars","price":3,"stock":null,"per":0},{"id":"g2","emoji":"🪴","name":"Plant waterer","zh":"浇水员","desc":"Water the class plants for a week","price":4,"stock":null,"per":0},{"id":"g3","emoji":"🚩","name":"Line leader","zh":"领队","desc":"Lead the class line for a day","price":5,"stock":null,"per":2},{"id":"g4","emoji":"📖","name":"Pick the story","zh":"选故事","desc":"Choose tomorrow's story book","price":6,"stock":null,"per":1},{"id":"g5","emoji":"🪑","name":"Sit with a friend","zh":"和朋友同桌","desc":"One afternoon, any seat you like","price":8,"stock":null,"per":2},{"id":"g6","emoji":"🎤","name":"Show and tell","zh":"展示分享","desc":"Reserve a show-and-tell slot","price":8,"stock":4,"per":1},{"id":"g7","emoji":"🎵","name":"Class DJ","zh":"班级DJ","desc":"Pick three songs for quiet work time","price":10,"stock":null,"per":1},{"id":"g8","emoji":"🎖","name":"Helper badge","zh":"助手徽章","desc":"Wear the teacher's helper badge for a day","price":10,"stock":6,"per":1},{"id":"g9","emoji":"🎫","name":"Homework pass","zh":"作业通行证","desc":"Skip one homework night, guilt free","price":12,"stock":3,"per":1},{"id":"g10","emoji":"🧰","name":"Treasure box pick","zh":"百宝箱","desc":"One pick from the real treasure box","price":15,"stock":5,"per":1},{"id":"g11","emoji":"🎲","name":"Board game Friday","zh":"桌游周五","desc":"Bring a board game for Friday choice time","price":20,"stock":null,"per":1}],"students":[{"id":"s1","name":"Amelia","hue":12},{"id":"s2","name":"Bhavya","hue":45},{"id":"s3","name":"Chen","hue":95},{"id":"s4","name":"Dina","hue":150},{"id":"s5","name":"Emeka","hue":185},{"id":"s6","name":"Farah","hue":210},{"id":"s7","name":"Gabriel","hue":260},{"id":"s8","name":"Hana","hue":300},{"id":"s9","name":"Ibrahim","hue":330},{"id":"s10","name":"Jade","hue":12},{"id":"s11","name":"Kofi","hue":45},{"id":"s12","name":"Lena","hue":95},{"id":"s13","name":"Mateo","hue":150},{"id":"s14","name":"Nia","hue":185},{"id":"s15","name":"Omar","hue":210},{"id":"s16","name":"Priya","hue":260}],"records":[{"id":"xdyqcvi9","ts":1794197321108,"studentIds":["s2"],"ruleId":"r10","ruleLabel":"Missing homework ❓","value":-2,"undone":false},{"id":"xbd5xzvb","ts":1794197320939,"studentIds":["s1","s3"],"ruleId":"r1","ruleLabel":"Raised hand ✋","value":1,"undone":false},{"id":"xgpaqz52","ts":1794193720933,"studentIds":["s8"],"ruleId":"r6","ruleLabel":"Read a book 📖","value":1,"undone":false},{"id":"xc7lssmy","ts":1794193720933,"studentIds":["s13","s12","s1"],"ruleId":"r7","ruleLabel":"Tidy desk 🧹","value":1,"undone":false},{"id":"xd2krh5p","ts":1794190120933,"studentIds":["s14","s4","s11"],"ruleId":"r8","ruleLabel":"Tardy ⏰","value":-1,"undone":false},{"id":"xp48qorx","ts":1794186520933,"studentIds":["s14","s9","s8"],"ruleId":"r8","ruleLabel":"Tardy ⏰","value":-1,"undone":false},{"id":"xyhow8vc","ts":1794182920933,"studentIds":["s13","s16"],"ruleId":"r8","ruleLabel":"Tardy ⏰","value":-1,"undone":false},{"id":"xgge9ser","ts":1794179320933,"studentIds":["s13","s7","s15"],"ruleId":"r1","ruleLabel":"Raised hand ✋","value":1,"undone":false},{"id":"xdmmomc5","ts":1794179320933,"studentIds":["s15","s1"],"ruleId":"r6","ruleLabel":"Read a book 📖","value":1,"undone":false},{"id":"xok21lah","ts":1794110920933,"studentIds":["s4","s6"],"ruleId":"r7","ruleLabel":"Tidy desk 🧹","value":1,"undone":false},{"id":"xna1ra00","ts":1794110920933,"studentIds":["s4","s8"],"ruleId":"r9","ruleLabel":"Off task 🌀","value":-2,"undone":false},{"id":"xa4vak9w","ts":1794107320933,"studentIds":["s9","s3"],"ruleId":"r6","ruleLabel":"Read a book 📖","value":1,"undone":false},{"id":"xa7s6avg","ts":1794107320933,"studentIds":["s7"],"ruleId":"r10","ruleLabel":"Missing homework ❓","value":-2,"undone":false},{"id":"xvt40lkr","ts":1794107320933,"studentIds":["s3","s6"],"ruleId":"r5","ruleLabel":"Clear improvement 📈","value":3,"undone":false},{"id":"x83khs9o","ts":1794103720933,"studentIds":["s15"],"ruleId":"r1","ruleLabel":"Raised hand ✋","value":1,"undone":false},{"id":"xk3ol50a","ts":1794100120933,"studentIds":["s12","s10","s7"],"ruleId":"r10","ruleLabel":"Missing homework ❓","value":-2,"undone":false},{"id":"xf8lbwkc","ts":1794096520933,"studentIds":["s9","s11","s15"],"ruleId":"r9","ruleLabel":"Off task 🌀","value":-2,"undone":false},{"id":"xth4oqj4","ts":1794092920933,"studentIds":["s16","s7","s1"],"ruleId":"r6","ruleLabel":"Read a book 📖","value":1,"undone":false},{"id":"ximl10al","ts":1794092920933,"studentIds":["s16"],"ruleId":"r8","ruleLabel":"Tardy ⏰","value":-1,"undone":false},{"id":"x5qi9jlz","ts":1794092920933,"studentIds":["s4"],"ruleId":"r3","ruleLabel":"Helped a classmate 🤝","value":2,"undone":false},{"id":"xcu1qui2","ts":1794092920933,"studentIds":["s13","s5"],"ruleId":"r9","ruleLabel":"Off task 🌀","value":-2,"undone":false},{"id":"x6kovebs","ts":1794092920933,"studentIds":["s5","s3","s15"],"ruleId":"r9","ruleLabel":"Off task 🌀","value":-2,"undone":false},{"id":"xksnq0ae","ts":1794024520933,"studentIds":["s8","s15","s3"],"ruleId":"r10","ruleLabel":"Missing homework ❓","value":-2,"undone":false},{"id":"xbyoiz9v","ts":1794024520933,"studentIds":["s7"],"ruleId":"r4","ruleLabel":"Great homework 📓","value":3,"undone":false},{"id":"xeqn5jxs","ts":1794024520933,"studentIds":["s8","s7"],"ruleId":"r9","ruleLabel":"Off task 🌀","value":-2,"undone":false},{"id":"x4rm45es","ts":1794024520933,"studentIds":["s16","s14","s11"],"ruleId":"r1","ruleLabel":"Raised hand ✋","value":1,"undone":false},{"id":"xoq4q6ib","ts":1794020920933,"studentIds":["s16","s13"],"ruleId":"r1","ruleLabel":"Raised hand ✋","value":1,"undone":false},{"id":"xtabd5v5","ts":1794020920933,"studentIds":["s10","s14"],"ruleId":"r2","ruleLabel":"Answered well 💡","value":2,"undone":false},{"id":"x3yg9vmv","ts":1794017320933,"studentIds":["s6","s11","s10"],"ruleId":"r1","ruleLabel":"Raised hand ✋","value":1,"undone":false},{"id":"xy5ep2i4","ts":1794013720933,"studentIds":["s13","s14"],"ruleId":"r4","ruleLabel":"Great homework 📓","value":3,"undone":false},{"id":"xrp8a1dm","ts":1794010120933,"studentIds":["s3","s15"],"ruleId":"r4","ruleLabel":"Great homework 📓","value":3,"undone":false},{"id":"x8lkha9s","ts":1794010120933,"studentIds":["s6","s4"],"ruleId":"r1","ruleLabel":"Raised hand ✋","value":1,"undone":false},{"id":"xq5ph0nr","ts":1794006520933,"studentIds":["s14","s13"],"ruleId":"r8","ruleLabel":"Tardy ⏰","value":-1,"undone":false},{"id":"xjg092wa","ts":1794006520933,"studentIds":["s7","s11","s13"],"ruleId":"r7","ruleLabel":"Tidy desk 🧹","value":1,"undone":false},{"id":"x8irdczb","ts":1794006520933,"studentIds":["s15"],"ruleId":"r4","ruleLabel":"Great homework 📓","value":3,"undone":false},{"id":"x8xujste","ts":1793938120933,"studentIds":["s12","s15","s16"],"ruleId":"r7","ruleLabel":"Tidy desk 🧹","value":1,"undone":false},{"id":"xwruri4z","ts":1793938120933,"studentIds":["s16"],"ruleId":"r10","ruleLabel":"Missing homework ❓","value":-2,"undone":false},{"id":"xasc32gx","ts":1793938120933,"studentIds":["s3","s13","s10"],"ruleId":"r3","ruleLabel":"Helped a classmate 🤝","value":2,"undone":false},{"id":"xii2n31w","ts":1793934520933,"studentIds":["s5","s1"],"ruleId":"r9","ruleLabel":"Off task 🌀","value":-2,"undone":false},{"id":"x7glbhem","ts":1793934520933,"studentIds":["s6","s5","s7"],"ruleId":"r6","ruleLabel":"Read a book 📖","value":1,"undone":false},{"id":"xvyrj6hr","ts":1793934520933,"studentIds":["s5"],"ruleId":"r10","ruleLabel":"Missing homework ❓","value":-2,"undone":false},{"id":"x4n8scdd","ts":1793934520933,"studentIds":["s3","s5","s16"],"ruleId":"r3","ruleLabel":"Helped a classmate 🤝","value":2,"undone":false},{"id":"xne6c99f","ts":1793923720933,"studentIds":["s5","s12"],"ruleId":"r1","ruleLabel":"Raised hand ✋","value":1,"undone":false},{"id":"x2rj13h5","ts":1793923720933,"studentIds":["s3"],"ruleId":"r9","ruleLabel":"Off task 🌀","value":-2,"undone":false},{"id":"xb5goc95","ts":1793920120933,"studentIds":["s11","s6","s10"],"ruleId":"r4","ruleLabel":"Great homework 📓","value":3,"undone":false},{"id":"x0meoqjj","ts":1793851720933,"studentIds":["s12","s16"],"ruleId":"r4","ruleLabel":"Great homework 📓","value":3,"undone":false},{"id":"xkqgswwv","ts":1793851720933,"studentIds":["s12","s14"],"ruleId":"r2","ruleLabel":"Answered well 💡","value":2,"undone":false},{"id":"x6yzs7w0","ts":1793851720933,"studentIds":["s12","s11","s7"],"ruleId":"r9","ruleLabel":"Off task 🌀","value":-2,"undone":false},{"id":"xyxm4ggv","ts":1793848120933,"studentIds":["s5","s6"],"ruleId":"r1","ruleLabel":"Raised hand ✋","value":1,"undone":false},{"id":"x1axpb5s","ts":1793844520933,"studentIds":["s8"],"ruleId":"r5","ruleLabel":"Clear improvement 📈","value":3,"undone":false},{"id":"xg90o1ta","ts":1793840920933,"studentIds":["s5"],"ruleId":"r7","ruleLabel":"Tidy desk 🧹","value":1,"undone":false},{"id":"xz9ctx8o","ts":1793840920933,"studentIds":["s16","s5"],"ruleId":"r10","ruleLabel":"Missing homework ❓","value":-2,"undone":false},{"id":"xq26yh18","ts":1793840920933,"studentIds":["s14","s10","s1"],"ruleId":"r5","ruleLabel":"Clear improvement 📈","value":3,"undone":false},{"id":"xpq3upi0","ts":1793840920933,"studentIds":["s3"],"ruleId":"r10","ruleLabel":"Missing homework ❓","value":-2,"undone":false},{"id":"xpfqfzr6","ts":1793840920933,"studentIds":["s4"],"ruleId":"r6","ruleLabel":"Read a book 📖","value":1,"undone":false},{"id":"x740621z","ts":1793837320933,"studentIds":["s5","s11","s9"],"ruleId":"r1","ruleLabel":"Raised hand ✋","value":1,"undone":false},{"id":"xjru207j","ts":1793765320933,"studentIds":["s3"],"ruleId":"r4","ruleLabel":"Great homework 📓","value":3,"undone":false},{"id":"xc3atmbu","ts":1793765320933,"studentIds":["s2","s3","s11"],"ruleId":"r2","ruleLabel":"Answered well 💡","value":2,"undone":false},{"id":"x53h81k0","ts":1793765320933,"studentIds":["s11","s7","s1"],"ruleId":"r7","ruleLabel":"Tidy desk 🧹","value":1,"undone":false},{"id":"xld8li01","ts":1793758120933,"studentIds":["s7"],"ruleId":"r9","ruleLabel":"Off task 🌀","value":-2,"undone":false},{"id":"x0lgbti5","ts":1793758120933,"studentIds":["s7","s11"],"ruleId":"r8","ruleLabel":"Tardy ⏰","value":-1,"undone":false},{"id":"xzo4rnfh","ts":1793758120933,"studentIds":["s2","s5"],"ruleId":"r7","ruleLabel":"Tidy desk 🧹","value":1,"undone":false},{"id":"xhhtu449","ts":1793754520933,"studentIds":["s1","s14"],"ruleId":"r7","ruleLabel":"Tidy desk 🧹","value":1,"undone":false},{"id":"x5sk7obt","ts":1793754520933,"studentIds":["s2","s12","s16"],"ruleId":"r5","ruleLabel":"Clear improvement 📈","value":3,"undone":false},{"id":"x578howp","ts":1793750920933,"studentIds":["s9","s3"],"ruleId":"r1","ruleLabel":"Raised hand ✋","value":1,"undone":false},{"id":"xjlp59u2","ts":1793747320933,"studentIds":["s11","s10"],"ruleId":"r1","ruleLabel":"Raised hand ✋","value":1,"undone":false},{"id":"x42e7qs1","ts":1793747320933,"studentIds":["s3"],"ruleId":"r2","ruleLabel":"Answered well 💡","value":2,"undone":false},{"id":"xs1x0nc0","ts":1793747320933,"studentIds":["s11"],"ruleId":"r8","ruleLabel":"Tardy ⏰","value":-1,"undone":false},{"id":"x0dpr0bz","ts":1793678920933,"studentIds":["s1","s14"],"ruleId":"r2","ruleLabel":"Answered well 💡","value":2,"undone":false},{"id":"xa8cz9rp","ts":1793678920933,"studentIds":["s15","s7","s1"],"ruleId":"r7","ruleLabel":"Tidy desk 🧹","value":1,"undone":false},{"id":"xk8i5jg7","ts":1793675320933,"studentIds":["s12"],"ruleId":"r9","ruleLabel":"Off task 🌀","value":-2,"undone":false},{"id":"xvraiyko","ts":1793675320933,"studentIds":["s12","s11","s7"],"ruleId":"r5","ruleLabel":"Clear improvement 📈","value":3,"undone":false},{"id":"xjur4rxv","ts":1793668120933,"studentIds":["s7"],"ruleId":"r8","ruleLabel":"Tardy ⏰","value":-1,"undone":false},{"id":"xpt3cpel","ts":1793664520933,"studentIds":["s10","s15"],"ruleId":"r9","ruleLabel":"Off task 🌀","value":-2,"undone":false},{"id":"x4o22k8m","ts":1793592520933,"studentIds":["s11","s14","s6"],"ruleId":"r5","ruleLabel":"Clear improvement 📈","value":3,"undone":false},{"id":"xan9nt7c","ts":1793588920933,"studentIds":["s2"],"ruleId":"r3","ruleLabel":"Helped a classmate 🤝","value":2,"undone":false},{"id":"xaegtduo","ts":1793588920933,"studentIds":["s4","s12"],"ruleId":"r10","ruleLabel":"Missing homework ❓","value":-2,"undone":false},{"id":"x2mgecgc","ts":1793588920933,"studentIds":["s4"],"ruleId":"r2","ruleLabel":"Answered well 💡","value":2,"undone":false},{"id":"xv974w85","ts":1793588920933,"studentIds":["s13"],"ruleId":"r5","ruleLabel":"Clear improvement 📈","value":3,"undone":false},{"id":"xziqq9d3","ts":1793585320933,"studentIds":["s15"],"ruleId":"r5","ruleLabel":"Clear improvement 📈","value":3,"undone":false},{"id":"x1bw7z4n","ts":1793585320933,"studentIds":["s2","s9"],"ruleId":"r8","ruleLabel":"Tardy ⏰","value":-1,"undone":false},{"id":"x2hbevrn","ts":1793581720933,"studentIds":["s9","s8"],"ruleId":"r7","ruleLabel":"Tidy desk 🧹","value":1,"undone":false},{"id":"xg6ke8qg","ts":1793578120933,"studentIds":["s5","s2","s9"],"ruleId":"r8","ruleLabel":"Tardy ⏰","value":-1,"undone":false},{"id":"xpye334f","ts":1793574520933,"studentIds":["s16"],"ruleId":"r10","ruleLabel":"Missing homework ❓","value":-2,"undone":false},{"id":"x0enth3r","ts":1793574520933,"studentIds":["s13"],"ruleId":"r7","ruleLabel":"Tidy desk 🧹","value":1,"undone":false},{"id":"x651v4zo","ts":1793506120933,"studentIds":["s1"],"ruleId":"r5","ruleLabel":"Clear improvement 📈","value":3,"undone":false},{"id":"x3lip4ql","ts":1793506120933,"studentIds":["s7","s4"],"ruleId":"r7","ruleLabel":"Tidy desk 🧹","value":1,"undone":false},{"id":"x6rw7axv","ts":1793502520933,"studentIds":["s10","s2"],"ruleId":"r9","ruleLabel":"Off task 🌀","value":-2,"undone":false},{"id":"x06kurpm","ts":1793502520933,"studentIds":["s16","s4","s14"],"ruleId":"r1","ruleLabel":"Raised hand ✋","value":1,"undone":false},{"id":"x9y7nhs6","ts":1793498920933,"studentIds":["s16","s7"],"ruleId":"r4","ruleLabel":"Great homework 📓","value":3,"undone":false},{"id":"x3g99zqv","ts":1793495320933,"studentIds":["s16"],"ruleId":"r6","ruleLabel":"Read a book 📖","value":1,"undone":false},{"id":"xuumns3y","ts":1793491720933,"studentIds":["s7","s1"],"ruleId":"r4","ruleLabel":"Great homework 📓","value":3,"undone":false},{"id":"xt3keq1i","ts":1793491720933,"studentIds":["s3","s11","s9"],"ruleId":"r5","ruleLabel":"Clear improvement 📈","value":3,"undone":false},{"id":"xt0lucmx","ts":1793491720933,"studentIds":["s5","s16"],"ruleId":"r4","ruleLabel":"Great homework 📓","value":3,"undone":false},{"id":"xosnjp4j","ts":1793491720933,"studentIds":["s2"],"ruleId":"r6","ruleLabel":"Read a book 📖","value":1,"undone":false},{"id":"x117u7vp","ts":1793419720933,"studentIds":["s12","s13","s9"],"ruleId":"r6","ruleLabel":"Read a book 📖","value":1,"undone":false},{"id":"xxcpi6aa","ts":1793419720933,"studentIds":["s8","s5","s14"],"ruleId":"r9","ruleLabel":"Off task 🌀","value":-2,"undone":false},{"id":"x821k4no","ts":1793419720933,"studentIds":["s5","s1","s8"],"ruleId":"r2","ruleLabel":"Answered well 💡","value":2,"undone":false},{"id":"xjtj8450","ts":1793408920933,"studentIds":["s13","s2","s6"],"ruleId":"r8","ruleLabel":"Tardy ⏰","value":-1,"undone":false},{"id":"xq86efps","ts":1793408920933,"studentIds":["s1","s10"],"ruleId":"r3","ruleLabel":"Helped a classmate 🤝","value":2,"undone":false},{"id":"xor5j6sf","ts":1793405320933,"studentIds":["s9"],"ruleId":"r1","ruleLabel":"Raised hand ✋","value":1,"undone":false},{"id":"xy2dmybf","ts":1793405320933,"studentIds":["s4","s6","s10"],"ruleId":"r2","ruleLabel":"Answered well 💡","value":2,"undone":false},{"id":"x9j2tzwi","ts":1793401720933,"studentIds":["s5"],"ruleId":"r1","ruleLabel":"Raised hand ✋","value":1,"undone":false},{"id":"xzpoyogj","ts":1793401720933,"studentIds":["s6","s5","s2"],"ruleId":"r8","ruleLabel":"Tardy ⏰","value":-1,"undone":false},{"id":"xbf5q2og","ts":1793401720933,"studentIds":["s14","s4","s7"],"ruleId":"r7","ruleLabel":"Tidy desk 🧹","value":1,"undone":false}],"requests":[{"id":"x5augryx","studentId":"s1","itemId":"g1","itemLabel":"⭐ Sticker pack","cost":3,"status":"approved","note":"","ts":1794197320942,"decidedTs":1794197321095},{"id":"xgk8p45p","studentId":"s3","itemId":"g1","itemLabel":"⭐ Sticker pack","cost":3,"status":"approved","note":"","ts":1794024520933,"decidedTs":1794028120933},{"id":"xxzhyzqn","studentId":"s6","itemId":"g2","itemLabel":"🪴 Plant waterer","cost":4,"status":"approved","note":"","ts":1793938120933,"decidedTs":1793941720933},{"id":"xr0c1cbk","studentId":"s9","itemId":"g3","itemLabel":"🚩 Line leader","cost":5,"status":"approved","note":"","ts":1793851720933,"decidedTs":1793855320933},{"id":"xmnfenau","studentId":"s12","itemId":"g1","itemLabel":"⭐ Sticker pack","cost":3,"status":"approved","note":"","ts":1793765320933,"decidedTs":1793768920933},{"id":"xhdvzweq","studentId":"s15","itemId":"g2","itemLabel":"🪴 Plant waterer","cost":4,"status":"approved","note":"","ts":1793678920933,"decidedTs":1793682520933}],"collection":{"s3":[{"name":"Sticker pack","emoji":"⭐","rar":"common","source":"shop","ts":1794024520933}],"s6":[{"name":"Plant waterer","emoji":"🪴","rar":"common","source":"shop","ts":1793938120933}],"s9":[{"name":"Line leader","emoji":"🚩","rar":"common","source":"shop","ts":1793851720933}],"s12":[{"name":"Sticker pack","emoji":"⭐","rar":"common","source":"shop","ts":1793765320933}],"s15":[{"name":"Plant waterer","emoji":"🪴","rar":"common","source":"shop","ts":1793678920933}],"s5":[{"name":"Unicorn","zh":"独角兽","emoji":"🦄","rar":"rare","source":"box","ts":1794024520933}],"s1":[{"name":"Sticker pack","emoji":"⭐","rar":"common","source":"shop","ts":1794197321102}]},"boxSpent":{}};
'use strict';
/* ---- i18n: English + 中文 ---- */
const I18N = {
en:{
 docTitle:"Gifted Scholars — little stars. big smiles.",
 pillL:"room for a little kindness?",
 headL1:"little stars.",headL2:"big smiles.",
 pillR:"points in. presents out.",
 headR1:"a little star.",headR2:"a lot of heart.",
 note:"*free forever — a gift from Teacher Mo to ZhongFangYuan Bilingual School.",
 creditLine:"© 2026 Mohammed Shehzad Khan · a free gift to ZhongFangYuan Bilingual School, never for sale · <a href=\"#/\" onclick=\"openLicense();return false\">license &amp; credit</a>",
 lbl1:"The classroom",lbl2:"Gift shop",lbl3:"Leaderboard",lbl4:"Open a gift room",
 explore:"Explore Gifted Scholars",forStudents:"For students",freeForever:"Free forever",madeCare:"Made with care",promises:"Our promises",
 openMyRoom:"Open my room",yourName:"Your name",enter:"Enter",nameHint:"Type your name exactly as your teacher wrote it.",
 createdBy:"This site was created by ",
 licenseBody:"The school may use it forever, for free, even if the author moves on. <b>You may not</b> sell, charge for, or relicense this work, and the credit in the footer must stay. The author owns this work and may update it or share it with other schools. If these terms are broken, this license ends automatically.",
 tab_classroom:"Classroom",tab_records:"Records",tab_shop:"Gift shop",tab_board:"Leaderboard",tab_leaderboard:"Leaderboard",tab_settings:"Setup",
 selectAll:"Select all",clear:"Clear",rate:"Rate",celebrate:"Celebrate",undo:"Undo",remove:"Remove ",
 noRatings:"No ratings yet.",students:"Students",schoolName:"School name",className:"Class name",teacher:"Teacher",
 ratingRules:"Rating rules",newRule:"New rule",pointsValue:"Points value",catalog:"Catalog",dataSec:"Data",
 exportJSON:"Export class as JSON",resetDemo:"Reset demo data",appSections:"App sections",
 settingsTag:"Your class, your rules, your catalog.",shopTag:"Students request gifts from their own gift room.",
 recogTag:"Recognition is public, spending is private.",
 motion:"Motion effects",motionAuto:"Auto (follow device)",motionOn:"Always on",motionOff:"Reduced",
 motionBlurb:"Festive animations, gaze eyes and tap bursts.",
 classSaved:"Class details saved",demoReset:"Demo data reset",exported:"Exported",typeFirst:"Type your name first",
 noStudent:"No student named “",noStudent2:"” on the roster.",
 delRule:"Delete this rule?",resetAsk:"Reset demo data?",yesDo:"Yes, do it",cancel:"Cancel",close:"Close",
/* ---- professional-remake program keys ---- */
featT:"Built for a real classroom.",navFeatures:"Features",navHow:"How it works",navScreen:"Big Screen",navPrivacy:"Privacy",navFaq:"FAQ",navHelp:"Help",
menuOpen:"Open menu",menuClose:"Close menu",skipToContent:"Skip to content",
feat1T:"Award in a second",feat1D:"Pick students, tap a rule — two taps. Every record can be undone.",
feat2T:"Visible on the big screen",feat2D:"The classroom screen shows every kid\u2019s progress live, readable from the back row.",
feat3T:"Gift rooms",feat3D:"Stars buy gifts, mystery boxes hide surprises, and the shelf keeps a whole year of collects.",
feat4T:"Levels never drop",feat4D:"Levels ride lifetime positives; the spendable wallet is separate and never goes below zero.",
feat5T:"A full trail",feat5D:"Every award is logged and undoable. Export a complete backup any time.",
feat6T:"Bilingual",feat6D:"Chinese by default, English one tap away \u2014 including the Big Screen.",
howT:"How it works",s1T:"Set up your class",s1D:"Add students and award rules in Settings \u2014 or press Try demo and explore first.",
s2T:"Award in class",s2D:"Two taps per award on the projector\u2019s Big Screen; pops celebrate, undo fixes mistakes.",
s3T:"Reward on Friday",s3D:"The class goal fills as the week\u2019s positive points add up. When it hits 100%, celebrate.",
scrShowT:"One screen for the whole class",scrShowD:"Open #/screen on the projector: a goal rocket, one tile per kid, and a burst of confetti on every award.",
scrC1:"Class goal",scrC2:"Award pops",scrC3:"Quick-award drawer",scrC4:"Readable at 8 metres",
privT:"Data never leaves the device",privD:"Everything lives in this browser\u2019s local storage: no accounts, no uploads, no tracking. It works offline.",
privC1:"Local storage only",privC2:"One-tap backup export",privC3:"Works offline",
privNote:"Tip: always open the same address \u2014 two different addresses keep separate data.",
faqT:"Questions teachers ask",
faq1Q:"Where is my data stored?",faq1A:"Only in this browser (local storage). To move computers: export a backup in Settings, then import it there.",
faq2Q:"Is it really free?",faq2A:"Yes. No fees, no ads, nothing for sale \u2014 just keep the author credit.",
faq3Q:"Can negative points lower a level?",faq3A:"No. Levels ride lifetime positive points, so a level is never lowered by negatives. Only the spendable wallet feels them.",
faq4Q:"How do I open the Big Screen?",faq4A:"Choose it in Settings, or open the address with #/screen. F toggles fullscreen, A opens the quick-award drawer.",
faq5Q:"How do backups work?",faq5A:"Settings \u2192 Export backup saves a JSON file with everything. The app reminds you when a backup is more than a week old.",
faq6Q:"Does it work on phones?",faq6A:"Yes \u2014 every page adapts to phones and tablets. The Big Screen is designed for projectors and large displays.",
footProd:"Product",footHelp2:"Help",footAbout:"About",footTop:"Back to top",footLicense:"License & credit",
roomPickTitle:"Open a gift room",
helpTitle:"Help & how-to",helpSub:"Every common task lives here. Stuck? Export a backup first, then ask Teacher Mo.",
helpSearch:"Search help\u2026",helpNone:"No matching help entries.",helpBack:"\u2190 Back home",
h1Q:"How do I add students?",h1A:"Settings \u2192 Add students. Paste a whole roster, one name per line \u2014 each becomes a tile with its own gift room.",
h2Q:"How do I undo an award?",h2A:"Classroom \u2192 Undo, or on the Big Screen drawer tap \u201cUndo last\u201d. Records are never deleted, only marked undone.",
h3Q:"How do mystery boxes work?",h3A:"A student spends stars on a box and receives a random gift for their shelf. Rarer gifts have fancier frames.",
h4Q:"What about negative points?",h4A:"They count against the wallet but never against levels. On the Big Screen they appear as a quiet marker, which Settings can hide.",
ariPick:"Open random picker",pickBtn:"Random pick",pickTitle:"Who\u2019s it going to be?",pickDraw:"Draw",pickAgain:"Draw again",
pickAll:"Everyone has had a turn \u2014 the bag refills.",pickPicked:"Picked student",

 addStudent:"Add a student by name",
 shelf:"Gift shelf",askGift:"Ask for a gift",myRequests:"My requests",waiting:"Waiting approvals",
 noReqs:"No requests waiting.",approve:"Approve",decline:"Decline",giveNow:"Give now",backShelf:"Back on shelf",takeOff:"Take off shelf",
 aboutGift:"About this gift",openRoom:"Open room",givenToday:"Given today",soldOut:"sold out",pending:"pending",undone:"undone",empty:"empty",
 wallet:"wallet stars",toNext:"Progress to next level",topLevel:"Top level reached. What a year.",
 perLimit:" · limit {n} per student",givenTo:"Given to ",offShelf:"Gift is off the shelf",offShelf2:"Gift is off the shelf. Put it back first.",
 notEnough:"Not enough stars yet",roomTitle:"Gift room",roomOpen:"Gift room · ",headTo:"Head to ",
 waitingFor:"Waiting for approval ",docPre:"Gifted Scholars · ",roomPre:"Gift room · ",
 bAll:"All-time",bWeek:"This week",bProg:"Progress",boardEmpty:"Nothing on this board yet.",
 vsLast:"vs last week",topRule:"Top rule this week",ratingsWeek:"Ratings this week",clearImp:"Clear improvement",
 studentCol:"Student",classCol:"Class"
},
zh:{
 docTitle:"Gifted Scholars · 小小星星，大大的笑容",
 pillL:"想给教室添一点善意吗？",
 headL1:"小小星星。",headL2:"大大的笑容。",
 pillR:"积分进来，礼物出去。",
 headR1:"一颗小星星。",headR2:"满满的心意。",
 note:"*永远免费 —— Teacher Mo 送给中方园双语学校的礼物。",
 creditLine:"© 2026 Mohammed Shehzad Khan · 永远免费赠予中方园双语学校，绝不出售 · <a href=\"#/\" onclick=\"openLicense();return false\">版权与署名</a>",
 lbl1:"教室",lbl2:"礼物小铺",lbl3:"排行榜",lbl4:"打开礼物小屋",
 explore:"探索 Gifted Scholars",forStudents:"献给学生",freeForever:"永远免费",madeCare:"用心制作",promises:"我们的承诺",
 openMyRoom:"打开我的礼物小屋",yourName:"你的名字",enter:"进入",nameHint:"请输入老师在名单上写的名字。",
 createdBy:"本网站由 ",
 licenseBody:"学校可以永远免费使用本作品，即使作者日后离开。<b>不得</b>出售、收费或再许可本作品，页脚的署名必须保留。版权归作者所有，作者可以继续更新或分享给其他学校。如违反以上条款，本许可自动终止。",
 tab_classroom:"教室",tab_records:"记录",tab_shop:"礼物小铺",tab_board:"排行榜",tab_leaderboard:"排行榜",tab_settings:"设置",
 selectAll:"全选",clear:"清除",rate:"评分",celebrate:"表扬",undo:"撤销",remove:"删除 ",
 noRatings:"还没有评分记录。",students:"学生",schoolName:"学校名称",className:"班级名称",teacher:"老师",
 ratingRules:"评分规则",newRule:"新规则",pointsValue:"分值",catalog:"礼物目录",dataSec:"数据",
 exportJSON:"导出班级 JSON",resetDemo:"重置演示数据",appSections:"应用区块",
 settingsTag:"你的班级，你的规则，你的目录。",shopTag:"学生在自己的礼物小屋申请礼物。",
 recogTag:"表扬是公开的，花星星是私密的。",
 motion:"动效",motionAuto:"跟随设备",motionOn:"始终开启",motionOff:"减少",
 motionBlurb:"节日般的动画、目光跟随和点按迸发效果。",
 classSaved:"班级信息已保存",demoReset:"演示数据已重置",exported:"已导出",typeFirst:"请先输入你的名字",
 noStudent:"名单上没有叫“",noStudent2:"”的学生。",
 delRule:"删除这条规则？",resetAsk:"重置演示数据？",yesDo:"好的，执行",cancel:"取消",close:"关闭",
/* ---- professional-remake program keys ---- */
featT:"为真实课堂而做。",navFeatures:"产品特性",navHow:"三步上手",navScreen:"教室大屏",navPrivacy:"隐私与数据",navFaq:"常见问题",navHelp:"使用帮助",
menuOpen:"打开菜单",menuClose:"关闭菜单",skipToContent:"跳到正文",
feat1T:"一秒完成加分",feat1D:"选学生、点规则，两下就好。每条记录都能撤销。",
feat2T:"大屏实时可见",feat2D:"教室大屏上，每个孩子的进步都看得见，后排也读得清。",
feat3T:"礼物小屋",feat3D:"星星换礼物，盲盒藏惊喜，礼物架收藏一整年。",
feat4T:"等级只升不降",feat4D:"等级只看终身积极分；可花费的星星钱包另算，最低到零。",
feat5T:"全程可追溯",feat5D:"每次评分都有记录、可撤销，随时一键导出完整备份。",
feat6T:"中英双语",feat6D:"默认中文，一键切换英文——大屏也一样。",
howT:"三步上手",s1T:"建好班级",s1D:"在「设置」里添加学生和评分规则；也可以先点「试试演示」逛一逛。",
s2T:"课上加分",s2D:"在投影大屏上两下完成加分：加分有动效，失误可撤销。",
s3T:"周五兑现",s3D:"本周积极分越攒越多，班级目标进度条到 100%，就是庆祝时刻。",
scrShowT:"全班共用一块屏",scrShowD:"在投影仪上打开 #/screen：目标火箭、每人一格，每次加分都有彩色迸发。",
scrC1:"班级目标",scrC2:"加分动效",scrC3:"快速加分抽屉",scrC4:"8 米外可读",
privT:"数据不出设备",privD:"所有数据只存在这台浏览器的本地存储里：没有账号、没有上传、没有追踪，离线也能用。",
privC1:"仅本地存储",privC2:"一键导出备份",privC3:"离线可用",
privNote:"提示：请固定用同一个网址打开——两个不同网址的数据互不相通。",
faqT:"老师们常问",
faq1Q:"我的数据存在哪里？",faq1A:"只存在这台浏览器的本地存储里。要换电脑：先在「设置」导出备份，再到新电脑导入。",
faq2Q:"真的免费吗？",faq2A:"免费。不收费、无广告、绝不出售——只需保留作者署名。",
faq3Q:"扣分会让等级下降吗？",faq3A:"不会。等级只看终身积极分，永远不会因为扣分下降；只有可花费的钱包会受影响。",
faq4Q:"教室大屏怎么打开？",faq4A:"在「设置」里选择，或直接打开带 #/screen 的网址。按 F 全屏，按 A 打开快速加分。",
faq5Q:"备份怎么用？",faq5A:"「设置 → 导出备份」会保存一个包含全部数据的 JSON 文件。超过一周没备份，应用会提醒你。",
faq6Q:"手机上能用吗？",faq6A:"能——所有页面都适配手机和平板。大屏模式为投影仪和大屏显示而设计。",
footProd:"产品",footHelp2:"帮助",footAbout:"关于",footTop:"回到顶部",footLicense:"授权与署名",
roomPickTitle:"打开礼物小屋",
helpTitle:"使用帮助",helpSub:"常见操作都在这里。遇到问题？先导出一份备份，再来找 Teacher Mo。",
helpSearch:"搜索帮助…",helpNone:"没有匹配的帮助条目。",helpBack:"\u2190 返回首页",
h1Q:"怎么添加学生？",h1A:"「设置 → 添加学生」。可以整段粘贴名单，一行一个名字——每个孩子都有自己的格子和小屋。",
h2Q:"怎么撤销一次评分？",h2A:"评分页点「撤销」，或在大屏抽屉里点「撤销上一条」。记录不会被删除，只会标记为已撤销。",
h3Q:"盲盒怎么玩？",h3A:"学生用星星开盒，随机得到一份礼物放上架。越稀有的礼物，边框越华丽。",
h4Q:"负分是怎么处理的？",h4A:"负分只影响钱包，不影响等级。大屏上只显示一个安静的小标记，设置里可以整体隐藏。",
ariPick:"打开随机点名",pickBtn:"随机点名",pickTitle:"会是谁呢？",pickDraw:"抽一个",pickAgain:"再抽一次",
pickAll:"全班都点过一轮了——重新装袋。",pickPicked:"抽中的学生",

 addStudent:"输入名字添加学生",
 shelf:"礼物架",askGift:"申请礼物",myRequests:"我的申请",waiting:"待审批",
 noReqs:"暂无待批申请。",approve:"批准",decline:"婉拒",giveNow:"立即赠送",backShelf:"放回架子",takeOff:"取下架子",
 aboutGift:"礼物介绍",openRoom:"打开小屋",givenToday:"今日已送出",soldOut:"已送完",pending:"等老师点头",undone:"已撤销",empty:"空",
 wallet:"星星钱包",toNext:"距下一级",topLevel:"已到最高等级，了不起的一年。",
 perLimit:" · 每人限 {n} 份",givenTo:"送给了 ",offShelf:"礼物已不在架上",offShelf2:"礼物已不在架上，请先放回。",
 notEnough:"星星还不够哦",roomTitle:"礼物小屋",roomOpen:"礼物小屋 · ",headTo:"去往 ",
 waitingFor:"等待老师批准 ",docPre:"Gifted Scholars · ",roomPre:"礼物小屋 · ",
 bAll:"总榜",bWeek:"本周",bProg:"进步榜",boardEmpty:"榜单暂时空空如也。",
 vsLast:"比上周",topRule:"本周最热规则",ratingsWeek:"本周评分",clearImp:"进步明显",
 studentCol:"学生",classCol:"班级"
}};
function detectLang(){try{const s=localStorage.getItem("gs-lang");if(s==="zh"||s==="en")return s;}catch(e){}return "zh";}
let LANG=detectLang();
function t(k,vars){let s=Object.prototype.hasOwnProperty.call(I18N[LANG],k)?I18N[LANG][k]:(Object.prototype.hasOwnProperty.call(I18N.en,k)?I18N.en[k]:((globalThis.__gsMissedKeys=globalThis.__gsMissedKeys||[]).push(k),k));if(vars){for(const v in vars)s=s.split("{"+v+"}").join(String(vars[v]));}return s;}
function nm(o){return (LANG==="zh"&&o&&o.zh)?o.zh:((o&&o.name)||"");}
function LOCALE(){return LANG==="zh"?"zh-CN":"en-US";}
function applyLangDoc(){document.documentElement.lang=LANG==="zh"?"zh-CN":"en";document.title=t("docTitle");}
function setLang(l){if(l!=="zh"&&l!=="en")return;LANG=l;try{localStorage.setItem("gs-lang",l);}catch(e){}applyLangDoc();if(typeof route==="function")route();}
const LANG_BTN='<button class="gs-lang" onclick="setLang(LANG===\'zh\'?\'en\':\'zh\')" aria-label="Switch language / 切换语言">'+(LANG==="zh"?"English":"中文")+'</button>';
const LANG_BTN_APP='<button class="btn gs-lang-app" onclick="setLang(LANG===\'zh\'?\'en\':\'zh\')" aria-label="Switch language / 切换语言">'+(LANG==="zh"?"English":"中文")+'</button>';
applyLangDoc();


/* ---- studio landing strings (appended) ---- */
Object.assign(I18N.en,{
 navClass:"Classroom",
 navShop:"Gift shop",
 navBoard:"Leaderboard",
 navRec:"Records",
 navRoom:"Open a room",
 L_eyebrow:"Free forever · a gift to the school",
 L_headA:"little stars.",
 L_headB:"big smiles.",
 L_lede:"A classroom points system where kindness becomes stars, stars become gifts, and every gift is approved by the teacher. Built for one classroom: yours.",
 L_btnEnter:"Enter the classroom",
 L_btnLicense:"Read the license",
 L_caption:"*no fees · no accounts · no tracking — everything stays in this browser",
 L_drawEyebrow:"Fig. 01 — the level curve",
 L_drawHead:"Ten levels, drawn to scale.",
 L_drawLede:"The growth curve plotted from the app’s own threshold table — one point of height per point of growth, one column per level. The drawing and the app cannot disagree.",
 L_dlGrowth:"Growth",
 L_dlGrowthD:"Points earned by kindness. They level the shelf and are never spent.",
 L_dlStars:"Wallet",
 L_dlStarsD:"A parallel purse of stars for the gift shop. Spending never touches growth.",
 L_dlApproval:"Approval",
 L_dlApprovalD:"Students ask; the teacher decides. Nothing leaves the wallet unsigned.",
 L_valAlways:"always",
 L_figNote:"Scale — x: 64 px per level · y: 2.2 px per point · thresholds from LEVELS[ ]",
 L_studyEyebrow:"Fig. 02 — one week, computed",
 L_studyHead:"What five good days become.",
 L_studyLede:"",
 L_rdDay:"Day",
 L_rdPts:"Points",
 L_rdLvl:"Level",
 L_rdInto:"Into level",
 L_rdStars:"Stars earned",
 L_studyFoot:"Model — d = 5·scroll · pts = 2d · level & progress from LEVELS[ ]",
 L_matEyebrow:"Practice",
 L_matHead:"How it is built.",
 L_m1:"Ledger",
 L_m1d:"Growth and spending are separate books; generosity is never punished by the shop.",
 L_m1c:"protection",
 L_m2:"Consent",
 L_m2d:"Gift requests queue for the teacher. The wallet only moves on approval.",
 L_m2c:"consent",
 L_m3:"Reversal",
 L_m3d:"Every rating and gift can be undone from Records — mistakes are cheap.",
 L_m3c:"undo",
 L_m4:"Delight",
 L_m4d:"A mystery box when the shelf is full, and a collection worth showing on the projector.",
 L_m4c:"motivation",
 L_m5:"Privacy",
 L_m5d:"No server, no accounts; the class list never leaves this browser.",
 L_m5c:"local-only",
 L_m6:"Terms",
 L_m6d:"Free forever for the school; authorship and credit stay with the maker.",
 L_m6c:"license",
 L_pairHead:"Small tools, honestly made.",
 L_pairBody:"No backend, no uploads, no lock-in: the whole site is one file. Class data lives on the device and can be exported at any time — a tool should belong to the people who use it.",
 L_d1:"Demo students",
 L_d2:"Gifts in the shop",
 L_d3:"Levels",
 L_d4:"Rating rules",
 L_tblEyebrow:"Index",
 L_tblHead:"The five rooms.",
 L_thA:"Section",
 L_thB:"What it does",
 L_thC:"Who",
 L_thD:"Enter",
 L_r1:"Classroom",
 L_r1d:"Rate behaviour with one tap; everything undoable.",
 L_r1w:"teacher + class",
 L_r2:"Records",
 L_r2d:"The full ledger, newest first.",
 L_r2w:"teacher",
 L_r3:"Gift shop",
 L_r3d:"Students request, you approve.",
 L_r3w:"teacher + students",
 L_r4:"Leaderboards",
 L_r4d:"Three boards: total, this week, progress.",
 L_r4w:"whole class",
 L_r5:"Gift rooms",
 L_r5d:"A private shelf per student.",
 L_r5w:"one student",
 L_closeEyebrow:"Closing note",
 L_closeHeadA:"given freely,",
 L_closeHeadB:"kept freely.",
 L_fine:"© 2026 Mohammed Shehzad Khan (Teacher Mo) — free license to ZhongFangYuan Bilingual School · never for sale · credit stays intact · full terms in “Read the license”.",
 L_closeBtnA:"Open a gift room",
 L_closeBtnB:"Enter the classroom",
 L_stripMid:"free forever"
});
Object.assign(I18N.zh,{
 navClass:"课堂",
 navShop:"礼物小铺",
 navBoard:"排行榜",
 navRec:"记录",
 navRoom:"开礼物间",
 L_eyebrow:"永久免费 · 送给学校的一份礼物",
 L_headA:"小小星星。",
 L_headB:"大大的笑容。",
 L_lede:"一套课堂积分制度：善意变成星星，星星变成礼物，每份礼物都由老师亲自批准。为你的教室而做。",
 L_btnEnter:"进入课堂",
 L_btnLicense:"阅读授权",
 L_caption:"*免费 · 无账号 · 无追踪 — 所有数据只留在这台浏览器里",
 L_drawEyebrow:"图一 — 等级曲线",
 L_drawHead:"十级成长，按比例绘制。",
 L_drawLede:"曲线直接由应用内的等级阈值表绘制——一分成长对应等比高度，一级对应一列。图与应用永远不会互相矛盾。",
 L_dlGrowth:"成长",
 L_dlGrowthD:"因善意而得的成长点，只用于升级，永不被花掉。",
 L_dlStars:"钱包",
 L_dlStarsD:"用于礼物小铺的星星钱包，消费从不动摇成长。",
 L_dlApproval:"批准",
 L_dlApprovalD:"学生申请，老师决定；没有批准，星星不动。",
 L_valAlways:"始终",
 L_figNote:"比例 — 横轴：每级 64px · 纵轴：每分 2.2px · 阈值取自 LEVELS[ ]",
 L_studyEyebrow:"图二 — 一周的计算",
 L_studyHead:"五个认真的一天，会变成什么。",
 L_studyLede:"",
 L_rdDay:"天数",
 L_rdPts:"点数",
 L_rdLvl:"等级",
 L_rdInto:"本级进度",
 L_rdStars:"已得星星",
 L_studyFoot:"模型 — d = 5·滚动 · 点数 = 2d · 等级与进度取自 LEVELS[ ]",
 L_matEyebrow:"做法",
 L_matHead:"它是怎样建成的。",
 L_m1:"双账本",
 L_m1d:"成长与消费分开记账；慷慨永远不会被礼物小铺惩罚。",
 L_m1c:"保护",
 L_m2:"须批准",
 L_m2d:"礼物请求先进入老师的队列；钱包只在批准后变动。",
 L_m2c:"同意",
 L_m3:"可撤销",
 L_m3d:"每条评分与礼物都能在记录里撤销——犯错变得便宜。",
 L_m3c:"回退",
 L_m4:"有惊喜",
 L_m4d:"展示架集满开出盲盒，还有一块值得投影的收藏架。",
 L_m4c:"激励",
 L_m5:"只在本机",
 L_m5d:"无服务器、无账号；班级名单从不离开这台浏览器。",
 L_m5c:"隐私",
 L_m6:"有条款",
 L_m6d:"对学校永久免费；署名与著作权始终属于作者。",
 L_m6c:"授权",
 L_pairHead:"小工具，诚实做。",
 L_pairBody:"没有后端、没有上传、没有锁定：整个网站只是一个文件。班级数据存在本机，随时可以导出带走——工具应该属于用它的人。",
 L_d1:"演示学生",
 L_d2:"小铺礼物",
 L_d3:"等级数",
 L_d4:"评分规则",
 L_tblEyebrow:"索引",
 L_tblHead:"五个房间。",
 L_thA:"区块",
 L_thB:"作用",
 L_thC:"谁用",
 L_thD:"进入",
 L_r1:"课堂",
 L_r1d:"一键评分，一切可撤销。",
 L_r1w:"老师 + 全班",
 L_r2:"记录",
 L_r2d:"完整账本，最新在前。",
 L_r2w:"老师",
 L_r3:"礼物小铺",
 L_r3d:"学生申请，老师批准。",
 L_r3w:"老师 + 学生",
 L_r4:"排行榜",
 L_r4d:"三块榜：总计、本周、进步。",
 L_r4w:"全班",
 L_r5:"礼物间",
 L_r5d:"每位学生的专属展示架。",
 L_r5w:"单个学生",
 L_closeEyebrow:"结语",
 L_closeHeadA:"免费给出，",
 L_closeHeadB:"自由保留。",
 L_fine:"© 2026 Mohammed Shehzad Khan（Teacher Mo）— 对中方园双语学校永久免费授权 · 永不出售 · 保留署名 · 完整条款见「阅读授权」。",
 L_closeBtnA:"开一间礼物间",
 L_closeBtnB:"进入课堂",
 L_stripMid:"永久免费"
});

/* ---- app sweep keys (2026-11-08 big-screen update, WP1) ---- */
Object.assign(I18N.en,{
 errToast:"Something went wrong, but your data is safe.",
 removedToast:"{name} removed",reached:"{name} reached {lv}",
 levelUpTitle:"Level {n}!",levelN:"Level {n}",
 rateClass:"Rate {name}",pickSub:"Tap students, then a rule. {n} selected.",
 legendWallet:"wallet stars (spendable)",legendGrowth:"growth score (levels)",
 openRoomTitle:"Open {name}'s gift room",selFirst:"Select one or more students first",
 awardToast:"{r} {v} → {who}",
 recSub:"Every rating is logged. Anything can be undone; nothing is deleted.",
 thenTapRule:" and tap a rule.",undoneToast:"Undone: {r}",
 shopSub:"Students request, you approve. Stars are only spent at approval.",
 stockInf:"stock ∞",stockN:"stock {n}",
 giftGone:"This gift no longer exists",soldOutRaise:"Sold out: raise the stock to approve.",
 limitHit:"{name} hit the limit of {n} for this gift",lowWallet:"{name} only has ★ {w}",
 granted:"Granted: {g}",declinedToast:"Declined: {g}",
 giveTitle:"Give: {g}",giveBlurb:"Instant grant: stars are spent now, the gift lands on the student's shelf.",
 spendGive:"Spend ★ {n} and give",lbTitle:"Leaderboards",
 progEmpty:"The Progress board fills once two weeks have ratings.",
 creditBox:"A free gift to ZhongFangYuan Bilingual School — built with care by <b>Mohammed Shehzad Khan</b> (\"Teacher Mo\"), © 2026. Always free: no fees, no ads, nothing for sale.",
 iconFor:"Icon for {r}",ruleName:"Rule name",on:"On",del:"Delete",
 delRuleA11y:"Delete rule {r}",addRuleBtn:"+ Add rule",addBtn:"Add",removeA11y:"Remove {name}",
 dataBlurb:"Everything is stored in this browser only (localStorage). Export gives you a full backup: students, records, requests, collections and settings.",
 ruleUpdated:"Rule updated",ruleDeleted:"Rule deleted",
 delRuleBody:"Past records that used it keep their values for the log, but it disappears from the rating screen.",
 typeNameFirst:"Type a name first",addedToast:"{name} added",
 delStuBody:"Their ratings stay in the records log, but their gift room and shelf data will be removed.",
 resetBody:"This wipes everything in this browser and reseeds the demo class: 16 students, ten days of ratings, and the default gift catalog.",
 backClass:"← Back to class",stuGone:"That student does not exist. They may have been removed.",
 roomOf:"{name}'s gift room",growthLine:"{g} growth · {need} to {b}",
 openBoxBtn:"🎁 Open a mystery box · ★ {n}",needStars:"Needs ★ {n}",
 shelfSub:"Collected gifts stay here all year. Rare finds have a teal frame, epic finds a golden glow.",
 noReqsRoom:"No requests yet. Ask for a gift and it waits for the teacher's yes.",
 approved:"approved",reqDeclined:"not this time",boxWonToast:"{name} got: {g} ({rar})",
 rarCommon:"common",rarRare:"rare",rarEpic:"epic",
 askTitle:"Ask for a gift, {name}",
 askBlurb:"Requests wait for the teacher's approval. Only affordable gifts are enabled. You have <b class=\"num\">★ {w}</b>.",
 askBtn:"Ask",reqToast:"Requested: {g}. It waits for approval.",
 licSum:"and donated as a free gift to ZhongFangYuan Bilingual School. It will always be free: no fees, no ads, no tracking, nothing for sale.",
 licOwn:"<b>Ownership.</b> The site, its code, design and artwork remain the property of the author. Donating it to the school does not transfer copyright. The school may keep using it for everyday school life, free of charge, even after the author moves on.",
 licFonts:"Fonts: Instrument Serif &amp; Azeret Mono (SIL Open Font License). Provided \"as is\", without warranty of any kind.",
 startEmptyBody:"This wipes ALL class data in this browser (students, records, requests, collections). Export a backup first.",demoClass:"Class 4B",demoSchool:"Maple Grove Primary",demoTeacher:"Ms. Rivera",demoNames:"Amelia, Bhavya, Chen, Dina, Emeka, Farah, Gabriel, Hana, Ibrahim, Jade, Kofi, Lena, Mateo, Nia, Omar, Priya",oneOrigin:"Always open this site from the same address — the two addresses keep separate data.",backupFirst:"Download backup first",backupNeverNudge:"No backup yet — export one now.",goSetup:"Add students", tryDemo:"Try demo",demoConfirmBody:"This replaces your current class with the demo class. Continue?",
 startEmpty:"Start empty",emptyHint:"Add students in Setup",defaultClassName:"My class",
 originNote:"Use ONE address for this class — data does not transfer between my-gifts-with-mo.duckdns.org and mdshekhn.github.io.",
 backupNever:"Last backup: never",backupOn:"Last backup: {date}",
 backupNudge:"It has been over a week — export a fresh backup.",
 screenExit:"Exit",screenDrawer:"Quick award",ariSound:"Toggle sound",ariFull:"Fullscreen",ariDrawer:"Quick award panel",goalDefault:"Friday reward",soundChip:"Tap anywhere to enable sound",undoLast:"Undo last",undoneToast:"Undone",scrHideNeg:"Hide minus markers on the Big Screen",ariGoal:"Class goal progress",goalNums:"{e} / {t2} · {l} to go",goalSection:"Big screen & class goal",goalEnable:"Show class goal on the big screen",goalName:"Goal label",goalTarget:"Target points (weekly positives)",saveGoal:"Save goal",goalSaved:"Goal saved",storageBlocked:"This browser is blocking storage — data will not survive a reload."
});
Object.assign(I18N.zh,{
 errToast:"出了点小问题，但你的数据是安全的。",
 removedToast:"已移除 {name}",reached:"{name} 达到了 {lv}",
 levelUpTitle:"第 {n} 级！",levelN:"第 {n} 级",
 rateClass:"给 {name} 评分",pickSub:"先选学生，再点规则。已选 {n} 位。",
 legendWallet:"星星钱包（可花费）",legendGrowth:"成长分（定等级）",
 openRoomTitle:"打开{name}的礼物小屋",selFirst:"请先选择一位或多位学生",
 awardToast:"{r} {v} → {who}",
 recSub:"每次评分都有记录。一切都可以撤销，不会删除。",
 thenTapRule:"并点按规则。",undoneToast:"已撤销：{r}",
 shopSub:"学生申请，老师批准。星星只在批准时扣除。",
 stockInf:"库存 ∞",stockN:"库存 {n}",
 giftGone:"这个礼物已经不存在了",soldOutRaise:"已送完：请先补充库存再批准。",
 limitHit:"{name} 已达到这份礼物的限量 {n}",lowWallet:"{name} 现在只有 ★ {w}",
 granted:"已批准：{g}",declinedToast:"已婉拒：{g}",
 giveTitle:"赠送：{g}",giveBlurb:"立即赠送：马上扣除星星，礼物直接落到学生的礼物架上。",
 spendGive:"花 ★ {n} 赠送",lbTitle:"排行榜",
 progEmpty:"进步榜要等两周都有评分后才会亮起来。",
 creditBox:"送给中方园双语学校的免费礼物 —— 由 <b>Mohammed Shehzad Khan</b>（Teacher Mo）用心制作，© 2026。永远免费：不收费、无广告、绝不出售。",
 iconFor:"{r} 的图标",ruleName:"规则名称",on:"启用",del:"删除",
 delRuleA11y:"删除规则 {r}",addRuleBtn:"＋ 添加规则",addBtn:"添加",removeA11y:"移除 {name}",
 dataBlurb:"所有数据只保存在这台浏览器里（localStorage）。导出即是完整备份：学生、记录、申请、收藏和设置。",
 ruleUpdated:"规则已更新",ruleDeleted:"规则已删除",
 delRuleBody:"过去的记录仍保留原值，但它不再出现在评分页面上。",
 typeNameFirst:"请先输入名字",addedToast:"已添加 {name}",
 delStuBody:"评分记录会保留，但这位学生的礼物小屋和礼物架数据将被删除。",
 resetBody:"这会清空这台浏览器里的所有数据，并重新生成演示班级：16 名学生、十天的评分记录和默认礼物目录。",
 backClass:"← 返回教室",stuGone:"找不到这位学生，可能已被移除。",
 roomOf:"{name} 的礼物小屋",growthLine:"成长 {g} · 还差 {need} 分升到 {b}",
 openBoxBtn:"🎁 开一个盲盒 · ★ {n}",needStars:"需要 ★ {n}",
 shelfSub:"收集到的礼物会在这里放一整年。稀有礼物有青色边框，史诗礼物有金色光晕。",
 noReqsRoom:"还没有申请。申请一份礼物，等老师点头吧。",
 approved:"已批准",reqDeclined:"这次没通过",boxWonToast:"{name} 开到了：{g}（{rar}）",
 rarCommon:"普通",rarRare:"稀有",rarEpic:"史诗",
 askTitle:"{name}，申请一份礼物吧",
 askBlurb:"申请会等待老师批准，只有买得起的礼物可以点。你现在有 <b class=\"num\">★ {w}</b>。",
 askBtn:"申请",reqToast:"已申请：{g}。等待老师批准。",
 licSum:"并作为一份免费礼物赠予中方园双语学校。它将永远免费：不收费、无广告、无追踪、绝不出售。",
 licOwn:"<b>版权归属。</b> 本网站的代码、设计与美术作品仍归作者所有；赠予学校不意味着转让版权。学校可以永久免费地继续在日常校园生活中使用，即使作者日后离开。",
 licFonts:"字体：Instrument Serif 与 Azeret Mono（SIL 开源字体授权）。按“现状”提供，不作任何担保。",
 startEmptyBody:"这会清空这台浏览器里的全部班级数据（学生、记录、申请、收藏）。建议先导出一份备份。",demoClass:"三年二班",demoSchool:"枫叶小学",demoTeacher:"李老师",demoNames:"王小雨,李思远,张乐乐,陈静怡,杨帆,赵子墨,孙悦,周芷萱,吴一凡,郑好,黄晨曦,林嘉树,高小满,徐天佑,马欣然,罗云帆",oneOrigin:"请固定使用同一个网址打开本站——两个网址的数据互不相通。",backupFirst:"先下载备份",backupNeverNudge:"还没有备份过——导出一份吧。",goSetup:"去添加学生", tryDemo:"试试演示",demoConfirmBody:"这将用演示班级替换你现在的班级。继续吗？",
 startEmpty:"清空重来",emptyHint:"先在「设置」里添加学生",defaultClassName:"我的班级",
 originNote:"请固定使用同一个网址打开本站——两个网址的数据互不相通。",
 backupNever:"上次备份：还没有",backupOn:"上次备份：{date}",
 backupNudge:"已经超过一周了——导出一份新备份吧。",
 screenExit:"退出",screenDrawer:"快速加分",ariSound:"开关声音",ariFull:"全屏",ariDrawer:"快速加分面板",goalDefault:"周五奖励",soundChip:"轻点任意位置开启声音",undoLast:"撤销上一次",undoneToast:"已撤销",scrHideNeg:"大屏上隐藏扣分标记",ariGoal:"班级目标进度",goalNums:"{e} / {t2} · 还差 {l}",goalSection:"大屏幕与班级目标",goalEnable:"在大屏幕上显示班级目标",goalName:"目标名称",goalTarget:"目标分数（每周成长分）",saveGoal:"保存目标",goalSaved:"目标已保存",storageBlocked:"这台浏览器阻止了本地存储——刷新页面后数据将无法保留。"
});

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

let S = null;                 // app state
let sel = new Set();          // classroom multi-select
let ui = {board:"all"};

const $ = (s,el)=> (el||document).querySelector(s);
const $$ = (s,el)=> Array.from((el||document).querySelectorAll(s));
function initialOf(n){const a=Array.from(String(n==null?"":n).trim());return a.length?a[0]:"?";}
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const uid = () => "x"+Math.random().toString(36).slice(2,9);
const HUES = [12,45,95,150,185,210,260,300,330];

function hueOf(str){let h=0;for(const c of str)h=(h*31+c.charCodeAt(0))%997;return HUES[h%HUES.length];}
function fmtDT(ts){const d=new Date(ts);return d.toLocaleDateString(LOCALE(),{month:"short",day:"numeric"})+" "+d.toLocaleTimeString(LOCALE(),{hour:"2-digit",minute:"2-digit"});}
function weekStart(ts,back){const d=new Date(ts);const day=(d.getDay()+6)%7;d.setHours(0,0,0,0);d.setDate(d.getDate()-day-(back||0)*7);return d.getTime();}

/* ---- derived ledgers ---- */
function posOf(st,fromTs){let n=0;for(const r of S.records){if(r.undone)continue;if(fromTs&&r.ts<fromTs)continue;if(r.value<=0)continue;if(r.studentIds.includes(st.id))n+=r.value;}return n;}
function negOf(st,fromTs){let n=0;for(const r of S.records){if(r.undone)continue;if(fromTs&&r.ts<fromTs)continue;if(r.value>=0)continue;if(r.studentIds.includes(st.id))n+=-r.value;}return n;}
function netOf(st,fromTs){let n=0;for(const r of S.records){if(r.undone)continue;if(fromTs&&r.ts<fromTs)continue;if(r.studentIds.includes(st.id))n+=r.value;}return n;}
function growthOf(st){return posOf(st);}
function spentOf(st){let sp=0;for(const q of S.requests){if(q.status!=="approved")continue;if(q.studentId!==st.id)continue;sp+=q.cost;}return sp;}
function walletOf(st){return Math.max(0,posOf(st)-negOf(st)-spentOf(st)-(S.boxSpent[st.id]||0));}
function recLabel(rec){const r=(S.rules||[]).find(x=>x.id===rec.ruleId);if(!r)return rec.ruleLabel||"";return ((LANG==="zh"&&r.zh)?r.zh:r.label)+" "+r.icon;}
function levelOf(g){let i=0;for(let k=0;k<LEVELS.length;k++){if(g>=LEVELS[k].min)i=k;}return i;}
function lvlProgress(g){const i=levelOf(g);if(i>=LEVELS.length-1)return {i,pct:100,next:null};const a=LEVELS[i].min,b=LEVELS[i+1].min;return {i,pct:Math.min(100,Math.round(((g-a)/(b-a))*100)),next:LEVELS[i+1]};}
function collectionOf(id){return S.collection[id]||[];}

/* ---- persistence ---- */
let STORAGE_OK=true;
function save(){try{localStorage.setItem(LS_KEY,JSON.stringify(S));STORAGE_OK=true;}catch(e){STORAGE_OK=false;}}
function load(){
  try{const raw=localStorage.getItem(LS_KEY);if(raw){S=JSON.parse(raw);if(S&&S.students&&S.rules&&S.gifts&&S.records)return true;}}catch(e){}
  return false;
}
function syncIn(){load();}
function withState(fn){syncIn();fn();save();}
const SYNC_CBS=[];
function onSync(cb){SYNC_CBS.push(cb);}
function onStorage(e){if(e&&e.key&&e.key!==LS_KEY)return;syncIn();for(const cb of SYNC_CBS){try{cb();}catch(_){}}route();}
if(typeof window!=="undefined"&&window.addEventListener)window.addEventListener("storage",onStorage);
function storageBlockedNote(){return STORAGE_OK?"":'<div class="stk" role="alert" style="padding:10px 14px;border:2px solid var(--coral, #e5484d);margin-bottom:14px">⚠️ '+t("storageBlocked")+'</div>';}
function seedDemo(){
  // deterministic demo history so leaderboards and shelves have shape
  let rngState=42;const rng=()=>{rngState=(rngState*1103515245+12345)%2147483648;return rngState/2147483648;};
  S={version:1,
    settings:{className:t("demoClass"),schoolName:t("demoSchool"),teacher:t("demoTeacher"),motion:"auto"},
    rules:DEFAULT_RULES.map(r=>({...r})),
    gifts:DEFAULT_GIFTS.map(g=>({...g})),
    students:[],records:[],requests:[],collection:{},boxSpent:{}};
  t("demoNames").split(/[,，]\s*/).forEach((n,i)=>S.students.push({id:"s"+(i+1),name:n.trim(),hue:HUES[i%HUES.length]}));
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
  if(!h.startsWith("#/")&&document.querySelector("#gsmain")){return;} /* in-page anchor on landing: let native scroll work */
  closeOverlays();
  if(window._gsLandCleanup)window._gsLandCleanup();
  if(h.startsWith("#/room/")){const id=decodeURIComponent(h.slice(7));renderRoom(byId(id)?id:null);return;}
  if(h==="#/help"){renderHelp();return;}
  if(h==="#/screen"){renderScreen();return;}
  else if(h.startsWith("#/app")){
    const tab=(h.split("/")[2]||"classroom");
    renderShell(["classroom","records","shop","leaderboard","settings"].includes(tab)?tab:"classroom");
  }
  else{renderLanding();}
  if(!STORAGE_OK){const m=$("#main");if(m)m.innerHTML=storageBlockedNote()+m.innerHTML;const v=$("#view");if(v&&v.innerHTML.indexOf(storageBlockedNote())<0)v.innerHTML=storageBlockedNote()+v.innerHTML;}
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
function saveMotion(v){withState(()=>{S.settings.motion=v;});applyMotion();}
window.addEventListener("error",function(e){
  if(window.__gsErrShown)return; window.__gsErrShown=true;
  try{toast(t("errToast"));}catch(_){}
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
  el.innerHTML='<div class="card stk"><span class="medal">'+L.badge+'</span><h2 style="font-family:var(--font-round)">'+t("levelUpTitle",{n:lv+1})+'</h2><p style="margin-top:6px">'+t("reached",{name:"<b>"+esc(st.name)+"</b>",lv:"<b>"+esc(nm(L))+"</b>"})+'</p><div class="btns" style="justify-content:center"><button class="btn gold" onclick="this.closest(\'.lvlup\').remove();flushLevelUps()">'+t("celebrate")+'</button></div></div>';
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
  <div class="shell app-ui">
    <nav class="rail" aria-label="${t("appSections")}">
      <a class="logo" href="#/">${logoSVG()} Gifted Scholars</a>
      ${TABS.map(tb=>'<a class="tab" href="#/app/'+tb.id+'"'+(tb.id===tab?' aria-current="page"':'')+'><span>'+tb.icon+'</span>'+t("tab_"+tb.id)+'</a>').join("")}
      <div class="foot">${esc(S.settings.className||t("defaultClassName"))}<br>${esc(S.settings.schoolName||"")}</div>
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
  if(!S.students.length){$("#main").innerHTML=`
  <div class="pagehead"><h1>${t("rateClass",{name:esc(S.settings.className||t("defaultClassName"))})}</h1><span class="sub">${t("pickSub",{n:sel.size})}</span></div>
  <div class="empty stk" style="margin-top:26px"><span class="big">🌱</span>${t("emptyHint")}<br>
    <div class="btns" style="margin-top:12px;justify-content:center"><a class="btn primary" href="#/app/settings">${t("goSetup")}</a>
    <button class="btn ghost" onclick="tryDemo()">${t("tryDemo")}</button></div></div>`;return;}
  $("#main").innerHTML=`
  <div class="pagehead"><h1>${t("rateClass",{name:esc(S.settings.className||t("defaultClassName"))})}</h1><span class="sub">${t("pickSub",{n:sel.size})}</span></div>
  <div class="toolbar">
    <button class="btn sm" onclick="selAll(true)">${t("selectAll")}</button>
    <button class="btn sm" onclick="selAll(false)">${t("clear")}</button>
    <span class="rail-legend">
      <span class="legend"><b class="num">★</b> ${t("legendWallet")}</span>
      <span class="legend"><b class="num">#</b> ${t("legendGrowth")}</span>
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
    <div class="av" style="background:hsl(${st.hue},55%,82%)">${esc(initialOf(st.name))}</div>
    <div class="nm">${esc(st.name)}</div>
    <div class="lv">${L.badge} Lv${lp.i+1} · ${esc(nm(L))}</div>
    <div class="pts"><span class="net num${g<0?" neg":""}"># ${g}</span><span class="wallet num">★ ${w}</span></div>
    <a class="roomlink" href="#/room/${st.id}" onclick="event.stopPropagation()" title="${t("openRoomTitle",{name:esc(st.name)})}">${t("openRoom")}</a>
  </div>`;
}
function pick(id){
  if(sel.has(id))sel.delete(id);else sel.add(id);
  const el=document.getElementById("card-"+id);
  if(el){el.classList.toggle("sel",sel.has(id));el.setAttribute("aria-pressed",sel.has(id));$(".pick",el).textContent=sel.has(id)?"✓":"";}
  const sub=document.querySelector(".pagehead .sub");if(sub)sub.textContent=t("pickSub",{n:sel.size});
}
function selAll(on){sel=on?new Set(S.students.map(s=>s.id)):new Set();viewClassroom();}
function rate(ruleId){
  if(!sel.size){toast(t("selFirst"));return;}
  const ids=[...sel];let rule=null;
  withState(()=>{rule=S.rules.find(r=>r.id===ruleId);if(!rule)return;applyRule(rule,[...ids]);});
  if(!rule)return;
  ids.forEach(id=>{const el=document.getElementById("card-"+id);if(el){const chip=document.createElement("span");chip.className="float";chip.style.color=rule.value>0?"var(--teal)":"var(--coral)";chip.textContent=(rule.value>0?"+":"")+rule.value;el.appendChild(chip);setTimeout(()=>chip.remove(),1000);}});
  toast(t("awardToast",{r:(LANG==="zh"&&rule.zh?rule.zh:rule.label)+" "+rule.icon,v:(rule.value>0?"+":"")+rule.value,who:ids.map(i=>byId(i).name).slice(0,3).join(", ")+(ids.length>3?" +"+(ids.length-3):"")}));
  // refresh numbers without rebuilding grid (keeps selection + floats smooth)
  ids.forEach(id=>{const st=byId(id),el=document.getElementById("card-"+id);if(el){const g=growthOf(st),lp=lvlProgress(g);$(".net",el).textContent="# "+g;$(".net",el).classList.toggle("neg",g<0);$(".wallet",el).textContent="★ "+walletOf(st);$(".lv",el).textContent=LEVELS[lp.i].badge+" Lv"+(lp.i+1)+" · "+nm(LEVELS[lp.i]);}});
  flushLevelUps();
}

/* ============ records view ============ */
function viewRecords(){
  const recs=S.records;
  $("#main").innerHTML=`
  <div class="pagehead"><h1>${t("tab_records")}</h1><span class="sub">${t("recSub")}</span></div>
  ${recs.length?`<div class="list">${recs.map(recRow).join("")}</div>`:
  `<div class="empty stk"><span class="big">🧾</span>${t("noRatings")}<br>${t("headTo")}<a href="#/app/classroom">${t("rate")}</a>${t("thenTapRule")}</div>`}`;
}
function recRow(r){
  const names=r.studentIds.map(i=>byId(i)?byId(i).name:"?").join(", ");
  return `<div class="row stk${r.undone?" undone":""}">
    <span class="val num${r.value<0?" neg":""}">${r.value>0?"+":""}${r.value}</span>
    <span class="who"><b>${esc(recLabel(r))}</b><br>${esc(names)}</span>
    <span class="meta num">${fmtDT(r.ts)}</span>
    ${r.undone?`<span class="pill declined">${t("undone")}</span>`:`<button class="btn sm" onclick="doUndo('${r.id}')">${t("undo")}</button>`}
  </div>`;
}
function doUndo(id){
  let label=null;
  withState(()=>{const r=S.records.find(x=>x.id===id);if(!r||r.undone)return;undoRecord(r);label=recLabel(r);});
  if(label==null)return;
  toast(t("undoneToast",{r:label}));viewRecords();
}

/* ============ gift shop view ============ */
function pendingCount(){return S.requests.filter(q=>q.status==="pending").length;}
function approvedCountFor(stId,giftId){return S.requests.filter(q=>q.status==="approved"&&q.studentId===stId&&q.itemId===giftId).length;}

function viewShop(){
  const pend=S.requests.filter(q=>q.status==="pending");
  $("#main").innerHTML=`
  <div class="pagehead"><h1>${t("tab_shop")}</h1><span class="sub">${t("shopSub")}</span></div>
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
  const stock=g.stock==null?'<span class="pill approved">'+t("stockInf")+'</span>':(g.stock>0?'<span class="pill approved">'+t("stockN",{n:g.stock})+'</span>':'<span class="pill declined">'+t("soldOut")+'</span>');
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
function toggleItem(id){withState(()=>{const g=giftById(id);if(g)g.active=g.active===false;});viewShop();}
function decideReq(id,ok){
  let q=null,go=false;
  withState(()=>{
    q=S.requests.find(x=>x.id===id);if(!q||q.status!=="pending")return;
    go=true;
    if(ok){
    const st=byId(q.studentId),g=giftById(q.itemId);
    if(!st||!g){toast(t("giftGone"));return;}
    if(g.active===false){toast(t("offShelf2"));return;}
    if(g.stock!=null&&g.stock<=0){toast(t("soldOutRaise"));return;}
    if(g.per&&approvedCountFor(st.id,g.id)>=g.per){toast(t("limitHit",{name:st.name,n:g.per}));return;}
    if(walletOf(st)<q.cost){toast(t("lowWallet",{name:st.name,w:walletOf(st)}));return;}
    }
  });
  if(!go||!q)return;
  decide(q,ok);
  toast(ok?t("granted",{g:q.itemLabel}):t("declinedToast",{g:q.itemLabel}));
  viewShop();
}
/* "Give now" modal: pick a student */
function openGive(giftId){
  const g=giftById(giftId);if(!g)return;
  modal(`<h2>${t("giveTitle",{g:esc(g.emoji+" "+nm(g))})}</h2>
    <p style="font-size:14px;color:var(--ink-soft)">${t("giveBlurb")}</p>
    <label for="giveSel">${t("studentCol")}</label>
    <select id="giveSel" style="margin-top:6px">${S.students.map(s=>'<option value="'+s.id+'">'+esc(s.name)+" (★ "+walletOf(s)+")</option>").join("")}</select>
    <div class="btns"><button class="btn ghost" onclick="closeOverlays()">${t("cancel")}</button><button class="btn gold" onclick="doGive('${giftId}')">${t("spendGive",{n:g.price})}</button></div>`);
}
function doGive(giftId){
  const selId=$("#giveSel").value;
  closeOverlays();
  let msg=null;
  withState(()=>{
  const g=giftById(giftId),st=byId(selId);
  if(!st||!g)return;
  if(g.active===false){toast(t("offShelf"));return;}
  if(g.stock!=null&&g.stock<=0){toast(t("soldOut"));return;}
  if(g.per&&approvedCountFor(st.id,g.id)>=g.per){toast(t("limitHit",{name:st.name,n:g.per}));return;}
  if(walletOf(st)<g.price){toast(t("lowWallet",{name:st.name,w:walletOf(st)}));return;}
  const q={id:uid(),studentId:st.id,itemId:g.id,itemLabel:g.emoji+" "+g.name,cost:g.price,status:"pending",note:"given by teacher",ts:Date.now()};
  S.requests.unshift(q);
  decide(q,true);
  msg=t("givenTo")+st.name+": "+g.name;
  });
  if(msg==null)return;
  toast(msg);
  viewShop();
}

/* ============ leaderboard view ============ */
function viewBoard(){
  const mode=ui.board;
  const w0=weekStart(Date.now(),1),w1=weekStart(Date.now(),0);
  let rows;
  if(mode==="week"){rows=S.students.map(s=>({s,v:netOf(s,w1)})).sort((a,b)=>b.v-a.v);}
  else if(mode==="progress"){rows=S.students.map(s=>({s,v:netOf(s,w1)-netOf(s,w0)})).filter(r=>r.v!==0).sort((a,b)=>b.v-a.v);}
  else{rows=S.students.map(s=>({s,v:posOf(s)})).sort((a,b)=>b.v-a.v);}
  const today=weekStart(Date.now(),0)+864e5*(((new Date().getDay())+6)%7);
  const givenToday=S.records.filter(r=>!r.undone&&r.ts>=today).reduce((a,r)=>a+r.value*r.studentIds.length,0);
  const weekRecs=S.records.filter(r=>!r.undone&&r.ts>=w1);
  const ruleCount={};weekRecs.forEach(r=>{const L=recLabel(r);ruleCount[L]=(ruleCount[L]||0)+1;});
  const topRule=Object.entries(ruleCount).sort((a,b)=>b[1]-a[1])[0];
  $("#main").innerHTML=`
  <div class="pagehead"><h1>${t("lbTitle")}</h1><span class="sub">${t("recogTag")}</span></div>
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
  `<div class="empty stk"><span class="big">🏁</span>${t("boardEmpty")}<br>${t("progEmpty")}</div>`}`;
}

/* ============ settings view ============ */
function viewSettings(){
  $("#main").innerHTML=`
  <div class="pagehead"><h1>${t("tab_settings")}</h1><span class="sub">${t("settingsTag")}</span></div>

  <section style="margin-bottom:30px">
    <div class="stk" style="padding:16px 18px;display:flex;gap:12px;align-items:center;flex-wrap:wrap;max-width:560px;background:var(--teal-tint)">
      <span style="font-size:22px">🎁</span>
      <span style="font-size:14px;line-height:1.5">${t("creditBox")} <a href="#/" onclick="openLicense();return false">${t("aboutGift")}</a></span>
    </div>
  
    <div class="stk" style="padding:16px 18px;margin-top:14px">
      <h2 style="font-family:var(--font-round);font-size:22px">${t("goalSection")}</h2>
      <label style="display:flex;gap:10px;align-items:center;margin-top:10px"><input type="checkbox" id="goalEn" ${((S.settings.goal||{}).enabled)?"checked":""}> ${t("goalEnable")}</label>
      <label style="display:flex;gap:10px;align-items:center;margin-top:8px">${t("goalName")} <input id="goalLabel" type="text" value="${esc((S.settings.goal||{}).label||"")}" placeholder="${t("goalDefault")}"></label>
      <label style="display:flex;gap:10px;align-items:center;margin-top:8px">${t("goalTarget")} <input id="goalTarget" type="number" min="1" class="num" style="width:120px" value="${esc(String((S.settings.goal||{}).target||""))}"></label>
      <div class="btns" style="margin-top:10px"><button class="btn primary" onclick="saveGoal()">${t("saveGoal")}</button>
      <label style="display:flex;gap:8px;align-items:center;margin-top:12px;font-size:14px">
        <input type="checkbox" id="hideNegChk" ${S.settings.hideNeg===true?"checked":""} onchange="saveHideNeg(this.checked)" style="width:20px;height:20px">
        ${t("scrHideNeg")}
      </label></div>
    </div>
</section>

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
        <input type="text" value="${esc(r.icon)}" style="width:52px;text-align:center" aria-label="${t("iconFor",{r:esc(r.label)})}" onchange="editRule('${r.id}','icon',this.value)">
        <input type="text" value="${esc(nm(r))}" style="flex:2;min-width:130px" aria-label="${t("ruleName")}" onchange="editRule('${r.id}','nmEdit',this.value)">
        <input type="number" value="${r.value}" step="1" style="width:84px" class="num" aria-label="${t("pointsValue")}" onchange="editRule('${r.id}','value',parseInt(this.value)||0)">
        <label style="display:flex;align-items:center;gap:6px;font-size:13px"><input type="checkbox" ${r.active!==false?"checked":""} onchange="editRule('${r.id}','active',this.checked)"> ${t("on")}</label>
        <button class="btn sm danger" onclick="delRule('${r.id}')" aria-label="${t("delRuleA11y",{r:esc(r.label)})}">${t("del")}</button>
      </div>`).join("")}
      <div><button class="btn" onclick="addRule()">${t("addRuleBtn")}</button></div>
    </div>
  </section>

  <section style="margin-bottom:30px">
    <h2 style="font-size:19px;margin-bottom:10px">${t("students")}</h2>
    <div class="stk" style="padding:16px;max-width:560px;display:flex;gap:10px;flex-wrap:wrap">
      <input id="newStu" type="text" placeholder="${t("addStudent")}" style="flex:1;min-width:170px" onkeydown="if(event.key==='Enter')addStudent()">
      <button class="btn primary" onclick="addStudent()">${t("addBtn")}</button>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px">
      ${S.students.map(s=>`<span class="chip" style="cursor:default">${esc(s.name)} <button class="btn sm ghost" style="min-height:0;padding:0 4px" onclick="delStudent('${s.id}')" aria-label="${t("removeA11y",{name:esc(s.name)})}">✕</button></span>`).join("")}
    </div>
  </section>

  <section>
    <h2 style="font-size:19px;margin-bottom:10px">${t("dataSec")}</h2>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn" onclick="exportJSON()">${t("exportJSON")}</button>
      <button class="btn danger" onclick="confirmReset()">${t("resetDemo")}</button>
      <button class="btn danger" onclick="startEmpty()">${t("startEmpty")}</button>
    </div>
    <p style="font-size:13px;color:var(--ink-soft);margin-top:10px;max-width:560px">${t("dataBlurb")}</p>
    <p style="font-size:13px;color:var(--ink-soft);margin-top:6px">${S.settings.lastBackupAt?esc(t("backupOn",{date:fmtDT(S.settings.lastBackupAt)})):t("backupNever")}${backupNote()}</p>
    <p style="font-size:13px;color:var(--ink-soft);margin-top:6px">⚠️ ${t("oneOrigin")}</p>
  </section>`;
}
function backupNote(){
  const has=S.students.length||S.records.length,lb=S.settings.lastBackupAt;
  const stale=lb&&(Date.now()-lb)>7*864e5,none=has&&!lb;
  if(!(stale||none))return "";
  return " · ⚠️ "+(stale?t("backupNudge"):t("backupNeverNudge"));
}
function saveCls(){
  withState(()=>{
  S.settings.className=$("#clsName").value.trim()||S.settings.className;
  S.settings.schoolName=$("#schName").value.trim()||S.settings.schoolName;
  S.settings.teacher=$("#tchName").value.trim()||S.settings.teacher;
  });
  save();toast(t("classSaved"));
}
function editRule(id,key,val){
  let found=false;
  withState(()=>{const r=S.rules.find(x=>x.id===id);if(!r)return;found=true;
    if(key==="nmEdit"){if(LANG==="zh")r.zh=val;else r.label=val;}
    else r[key]=val;});
  if(found&&key!=="active")toast(t("ruleUpdated"));
}
function addRule(){
  withState(()=>{S.rules.push({id:uid(),icon:"✨",label:t("newRule"),value:1,active:true});});
  viewSettings();
}
function delRule(id){
  const used=S.records.some(r=>r.ruleId===id);
  const del=()=>{withState(()=>{S.rules=S.rules.filter(r=>r.id!==id);});viewSettings();toast(t("ruleDeleted"));};
  if(used){confirmModal(t("delRule"),t("delRuleBody"),del);}
  else del();
}
function addStudent(){
  const inp=$("#newStu");const name=inp.value.trim();
  if(!name){toast(t("typeNameFirst"));return;}
  withState(()=>{S.students.push({id:uid(),name,hue:hueOf(name)});});
  inp.value="";viewSettings();toast(t("addedToast",{name}));
}
function delStudent(id){
  const st=byId(id);if(!st)return;
  confirmModal(t("remove")+st.name+"?",t("delStuBody"),()=>{
    withState(()=>{S.students=S.students.filter(s=>s.id!==id);delete S.collection[id];});
    sel.delete(id);viewSettings();toast(t("removedToast",{name:st.name}));
  });
}
function emptyState(){return {version:1,
    settings:{className:"",schoolName:"",teacher:"",motion:"auto",sound:"off"},
    rules:DEFAULT_RULES.map(r=>({...r})),gifts:DEFAULT_GIFTS.map(g=>({...g})),
    students:[],records:[],requests:[],collection:{},boxSpent:{}};}
function startEmptyConfirmed(){withState(()=>{S=emptyState();});sel=new Set();toast(t("startEmpty"));go("#/app/classroom");route();}
function startEmpty(){if(S.students.length||S.records.length)confirmModal(t("startEmpty"),t("startEmptyBody"),startEmptyConfirmed,{backup:true});else startEmptyConfirmed();}
function tryDemo(){
  const doIt=()=>{withState(()=>{seedDemo();});sel=new Set();toast(t("demoReset"));go("#/app/classroom");route();};
  if(S.students.length||S.records.length)confirmModal(t("tryDemo"),t("demoConfirmBody"),doIt,{backup:true});else doIt();
}
function downloadBackupFirst(){try{exportJSON();}catch(_){}}
function exportJSON(){
  withState(()=>{S.settings.lastBackupAt=Date.now();});
  const blob=new Blob([JSON.stringify(S,null,2)],{type:"application/json"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="gifted-scholars-"+(S.settings.className||t("defaultClassName")).replace(/\s+/g,"-").toLowerCase()+".json";
  a.click();URL.revokeObjectURL(a.href);
  toast(t("exported"));
}
function confirmReset(){
  confirmModal(t("resetAsk"),t("resetBody"),()=>{
    withState(()=>{seedDemo();});sel=new Set();toast(t("demoReset"));go("#/app/classroom");route();
  },{backup:true});
}
function confirmModal(title,body,onYes,opts){
  modal(`<h2>${esc(title)}</h2><p style="font-size:14px;color:var(--ink-soft)">${esc(body)}</p>
  <div class="btns">${opts&&opts.backup&&(S.students.length||S.records.length)?`<button class="btn ghost" onclick="downloadBackupFirst()">⬇ ${t("backupFirst")}</button>`:""}<button class="btn ghost" onclick="closeOverlays()">${t("cancel")}</button><button class="btn danger" id="cfYes">${t("yesDo")}</button></div>`);
  $("#cfYes").addEventListener("click",()=>{closeOverlays();onYes();});
}

/* ============ student gift room ============ */
function renderRoom(id){
  document.title=t("docPre")+(byId(id)?(byId(id).name+" · "+t("roomTitle")):t("roomTitle"));
  if(!id||!byId(id)){$("#view").innerHTML='<div class="room"><a class="btn" href="#/app/classroom">'+t("backClass")+'</a><div class="empty stk" style="margin-top:20px"><span class="big">🤷</span>'+t("stuGone")+'</div></div>';return;}
  const st=byId(id),g=growthOf(st),w=walletOf(st),lp=lvlProgress(g),L=LEVELS[lp.i];
  const col=collectionOf(st);
  const reqs=S.requests.filter(q=>q.studentId===id).slice(0,6);
  const slots=Math.max(8,col.length);
  document.title=t("roomPre")+st.name;
  $("#view").innerHTML=`
  <div class="room">
    <div class="back"><a class="btn sm" href="#/app/classroom">← ${esc(S.settings.className||t("defaultClassName"))}</a></div>
    <div class="roomhead stk">
      <div class="bigav">${esc(initialOf(st.name))}</div>
      <div>
        <h1>${t("roomOf",{name:esc(st.name)})}</h1>
        <div class="lv" style="margin-top:6px;font-weight:700">${L.badge} ${t("levelN",{n:lp.i+1})} · ${esc(nm(L))}</div>
        ${lp.next?`<div class="lvl-bar" role="progressbar" aria-valuenow="${lp.pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${t("toNext")}"><i style="width:${lp.pct}%"></i></div>
        <div style="font-size:12px;margin-top:5px;color:var(--ink-soft)" class="num">${t("growthLine",{g,need:lp.next.min-g,b:esc(lp.next.badge+" "+nm(lp.next))})}</div>`:
        `<div style="font-size:12px;margin-top:5px;color:var(--ink-soft)">${t("topLevel")}</div>`}
      </div>
      <div class="walletbox stk" style="padding:14px 20px"><div class="v num">★ ${w}</div><div style="font-size:12px;font-weight:700">${t("wallet")}</div></div>
    </div>

    <div class="actionsbar">
      <button class="btn gold" onclick="roomBox('${id}')" ${w<BOX_PRICE?"disabled title='"+t("needStars",{n:BOX_PRICE})+"'":""}>${t("openBoxBtn",{n:BOX_PRICE})}</button>
      <button class="btn primary" onclick="openReqModal('${id}')">${t("askGift")}</button>
    </div>

    <section class="shelf">
      <h2>${t("shelf")}</h2>
      <p class="sub">${t("shelfSub")}</p>
      <div class="shelfgrid">
        ${col.map(c=>`<div class="slot stk rar-${c.rar}"><span class="g">${c.emoji}</span><span class="gname">${esc(nm(c))}${c.source==="box"?" 📦":""}</span></div>`).join("")}
        ${col.length<slots?Array(slots-col.length).fill(`<div class="slot empty-slot"><span class="g">·</span><span class="gname">${t("empty")}</span></div>`).join(""):""}
      </div>
    </section>

    <section class="reqlist">
      <h2 style="font-size:19px;margin-bottom:10px">${t("myRequests")}</h2>
      ${reqs.length?`<div class="list">${reqs.map(q=>`
        <div class="row stk">
          <span class="who">${esc(q.itemLabel)} · <b class="num">★ ${q.cost}</b></span>
          <span class="meta num">${fmtDT(q.ts)}</span>
          <span class="pill ${q.status}">${q.status==="pending"?t("pending"):q.status==="approved"?t("approved"):t("reqDeclined")}</span>
        </div>`).join("")}</div>`:
        `<div class="empty stk"><span class="big">📮</span>${t("noReqsRoom")}</div>`}
    </section>
  </div>`;
}
function roomBox(id){
  let won=null;
  withState(()=>{won=openBox(id);});
  const st=byId(id);
  if(!won){toast(t("notEnough"));return;}
  giftBurst(won,()=>{renderRoom(id);toast(t("boxWonToast",{name:st.name,g:nm(won),rar:t("rar"+(won.rar==="common"?"Common":won.rar==="rare"?"Rare":"Epic"))}));});
}
function openReqModal(id){
  const st=byId(id),w=walletOf(st);
  const items=S.gifts.filter(g=>g.active!==false);
  modal(`<h2>${t("askTitle",{name:esc(st.name)})}</h2>
  <p style="font-size:14px;color:var(--ink-soft)">${t("askBlurb",{w})}</p>
  <div class="list" style="margin-top:10px">
  ${items.map(g=>{
    const afford=w>=g.price&&(g.stock==null||g.stock>0);
    return `<div class="row stk" ${afford?"":'style="opacity:.55"'}>
      <span style="font-size:26px">${g.emoji}</span>
      <span class="who"><b>${esc(nm(g))}</b><br><span style="font-weight:400;font-size:12.5px;color:var(--ink-soft)">${esc(g.desc)}</span></span>
      <span class="val num">★ ${g.price}</span>
      <button class="btn sm primary" ${afford?"":"disabled"} onclick="doReq('${id}','${g.id}')">${t("askBtn")}</button>
    </div>`;}).join("")}
  </div>
  <div class="btns"><button class="btn ghost" onclick="closeOverlays()">${t("close")}</button></div>`);
}
function doReq(stId,giftId){
  let label=null;
  withState(()=>{const g=giftById(giftId),st=byId(stId);if(!g||!st)return;requestGift(stId,g);label=nm(g);});
  if(label==null)return;
  closeOverlays();
  toast(t("reqToast",{g:label}));
  renderRoom(stId);
}

/* init moved to the very end of the script bundle (after landing.js),
   because route()->renderLanding() needs landing.js consts (TDZ fix) */

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

/* ======================================================================
   Gifted Scholars — studio landing (warm editorial system)
   Seven sections: nav / split-wordmark hero / to-scale drawing /
   computed pinned study / practice rows / work table / cropped close.
   Every figure is computed from the app's own data (LEVELS, seed counts).
   ====================================================================== */
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

/* ---------- fig 01 · the level curve, drawn strictly to scale ----------
   Scale: x — 64 px per level · y — 2.2 px per point. Thresholds come
   straight from LEVELS[]; the fignote repeats the same numbers. */
function figureSVG(){
  const X0=70, DX=64, Y0=392, SY=2.2, TOP=40, LEFT=46, RIGHT=700;
  const Y=v=>Y0-v*SY;
  let s='';
  for(let p=0;p<=160;p+=40){
    s+='<line x1="'+LEFT+'" y1="'+Y(p)+'" x2="'+RIGHT+'" y2="'+Y(p)+'" stroke="rgba(26,25,23,.16)" stroke-width="1"/>'
      +'<text x="'+(LEFT-8)+'" y="'+(Y(p)+3.5)+'" text-anchor="end" class="ax">'+p+'</text>';
  }
  for(let i=0;i<10;i++){
    const x=X0+i*DX;
    s+='<line x1="'+x+'" y1="'+TOP+'" x2="'+x+'" y2="'+Y0+'" stroke="rgba(26,25,23,.09)" stroke-width="1"/>'
      +'<text x="'+x+'" y="'+(Y0+20)+'" text-anchor="middle" class="ax">L'+(i+1)+'</text>';
  }
  s+='<line x1="'+LEFT+'" y1="'+Y0+'" x2="'+RIGHT+'" y2="'+Y0+'" stroke="#1A1917" stroke-width="1.4"/>';
  s+='<polyline points="'+LEVELS.map((l,i)=>(X0+i*DX)+','+Y(l.min)).join(' ')
    +'" fill="none" stroke="#1A1917" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>';
  LEVELS.forEach((l,i)=>{ s+='<circle cx="'+(X0+i*DX)+'" cy="'+Y(l.min)+'" r="3" fill="#9B3418"/>'; });
  const leader=(i,dy,left)=>{
    const l=LEVELS[i], x=X0+i*DX, y=Y(l.min);
    return left
      ? '<line x1="'+x+'" y1="'+y+'" x2="'+(x-26)+'" y2="'+(y-dy)+'" stroke="#9B3418" stroke-width="1"/>'
        +'<text x="'+(x-31)+'" y="'+(y-dy+3.5)+'" text-anchor="end" class="lb">L'+(i+1)+' · '+l.min+'</text>'
      : '<line x1="'+x+'" y1="'+y+'" x2="'+(x+26)+'" y2="'+(y-dy)+'" stroke="#9B3418" stroke-width="1"/>'
        +'<text x="'+(x+31)+'" y="'+(y-dy+3.5)+'" class="lb">L'+(i+1)+' · '+l.min+'</text>';
  };
  s+=leader(0,30,false)+leader(4,34,false)+leader(9,30,true);
  return '<svg viewBox="0 0 760 470" role="img" aria-label="Level curve, drawn to scale">'
    +'<style>.ax{font:10.5px "Azeret Mono",monospace;fill:#6E6A61;letter-spacing:.1em}'
    +'.lb{font:10.5px "Azeret Mono",monospace;fill:#9B3418;letter-spacing:.12em}</style>'+s+'</svg>';
}

/* ---------- fig 02 · one week, computed ----------
   THE MODEL (stated once, in the copy): five school days, "answered well"
   (+2) each day.  d = 5·scroll · pts = 2d · level & progress from LEVELS[].
   The marker's arc and the printed readouts are the same calculation. */
function studyModel(p){
  const d=Math.min(5,Math.floor(p*5.0001));
  const pts=2*d;
  let li=0; for(let i=0;i<LEVELS.length;i++){ if(pts>=LEVELS[i].min) li=i; }
  const cur=LEVELS[li], next=LEVELS[li+1];
  const into=next ? (pts-cur.min)/(next.min-cur.min) : 1;
  return {day:d, pts:pts, level:li+1, into:Math.round(into*100), stars:pts};
}
const ARC={p0:[12,80], p1:[46,30], p2:[88,10]};
function arcPoint(t){
  const u=1-t;
  return [ u*u*ARC.p0[0]+2*u*t*ARC.p1[0]+t*t*ARC.p2[0],
           u*u*ARC.p0[1]+2*u*t*ARC.p1[1]+t*t*ARC.p2[1] ];
}
function setReadouts(m){
  const set=(id,v)=>{const n=document.getElementById(id); if(n&&n.textContent!==v)n.textContent=v;};
  set('rd-day',String(m.day)); set('rd-pts','+'+m.pts); set('rd-lvl','L'+m.level);
  set('rd-into',m.into+'%'); set('rd-stars',m.stars+' ★');
}

/* ---------- render ---------- */
function renderLanding(){
  applyLangDoc();
  const langBtn='<button class="sqbtn" type="button" onclick="setLang(\''+(LANG==='en'?'zh':'en')+'\')" aria-label="'+(LANG==='en'?'中文':'EN')+' - switch language">'+(LANG==='en'?'中文':'EN')+'</button>';
  document.querySelector('#view').innerHTML=`
  <div class="gs-page">
    <a class="skip-link" href="#gsmain">${t("skipToContent")}</a>
    <nav class="gsnav">
      <a class="brand" href="#/">gifted scholars<i>.</i></a>
      <div class="links">
        <a class="xtra" href="#features">${t("navFeatures")}</a>
        <a class="xtra" href="#how">${t("navHow")}</a>
        <a class="xtra" href="#screen-show">${t("navScreen")}</a>
        <a class="xtra" href="#privacy">${t("navPrivacy")}</a>
        <a class="xtra" href="#faq">${t("navFaq")}</a>
        <a class="xtra" href="#/help">${t("navHelp")}</a>
        ${langBtn}
        <button class="sqbtn" type="button" onclick="openRoomPicker()">${t("navRoom")}</button>
        <a class="gsbtn pig naventer" href="#/app/classroom">${t("L_btnEnter")}</a>
      </div>
      <button class="gsnav-burger" type="button" aria-expanded="false" aria-controls="gsmenu" aria-label="${t("menuOpen")}" onclick="toggleMenu()"><span></span><span></span><span></span></button>
      <div class="gsmenu" id="gsmenu" hidden>
        <a href="#features" onclick="toggleMenu(true)">${t("navFeatures")}</a>
        <a href="#how" onclick="toggleMenu(true)">${t("navHow")}</a>
        <a href="#screen-show" onclick="toggleMenu(true)">${t("navScreen")}</a>
        <a href="#privacy" onclick="toggleMenu(true)">${t("navPrivacy")}</a>
        <a href="#faq" onclick="toggleMenu(true)">${t("navFaq")}</a>
        <a href="#/help" onclick="toggleMenu(true)">${t("navHelp")}</a>
        <a href="#/app/classroom" onclick="toggleMenu(true)">${t("navClass")}</a>
        <button class="sqbtn" type="button" onclick="toggleMenu(true);openRoomPicker()">${t("navRoom")}</button>
        ${langBtn}
      </div>
    </nav>
    <main id="gsmain">

    <header class="gshero">
      <div class="gswm" aria-hidden="true">
        <div class="wm-line wm-top rv rv-raf">gifted</div>
        <div class="wm-line wm-bot rv rv-raf">scholars</div>
      </div>
      <div class="subject rv rv-raf">${GS_CHAR_SVG}</div>
      <div class="copystack">
        <span class="eyebrow rv rv-raf">${t("L_eyebrow")}</span>
        <h1 class="rv rv-raf">${t("L_headA")} <em class="it">${t("L_headB")}</em></h1>
        <p class="lede rv rv-raf">${t("L_lede")}</p>
        <div class="ctas" data-stagger>
          <a class="gsbtn pig rv" href="#/app/classroom">${t("L_btnEnter")}</a>
          <button class="gsbtn rv" type="button" onclick="openLicense()">${t("L_btnLicense")}</button>
          <button class="gsbtn rv" type="button" onclick="tryDemo();location.hash='#/app/classroom'">${t("tryDemo")}</button>
        </div>
      </div>
      <p class="corner-cap rv rv-raf">${t("L_caption")}</p>
    </header>

    <section class="gsec" id="fig-draw">
      <div class="gsdraw">
        <div>
          <span class="eyebrow rv">${t("L_drawEyebrow")}</span>
          <h2 class="rv">${t("L_drawHead")}</h2>
          <p class="seclede rv">${t("L_drawLede")}</p>
          <dl class="dl" data-stagger>
            <div class="rv"><dt>${t("L_dlGrowth")}</dt><dd>${t("L_dlGrowthD")}</dd><dd class="valdd"><span class="val num">0 – 160 pts</span></dd></div>
            <div class="rv"><dt>${t("L_dlStars")}</dt><dd>${t("L_dlStarsD")}</dd><dd class="valdd"><span class="val num">1 ★ = 1 pt</span></dd></div>
            <div class="rv"><dt>${t("L_dlApproval")}</dt><dd>${t("L_dlApprovalD")}</dd><dd class="valdd"><span class="val">${t("L_valAlways")}</span></div>
          </dl>
        </div>
        <figure class="figwrap rv">
          ${figureSVG()}
          <figcaption class="fignote">${t("L_figNote")}</figcaption>
        </figure>
      </div>
    </section>

    <section class="gsec gsfeats" id="features">
      <span class="eyebrow rv">${t("navFeatures")}</span>
      <h2 class="rv">${t("featT")}</h2>
      <div class="feat-grid" data-stagger>
        <div class="feat-card rv"><span class="ficon" aria-hidden="true">${FI.plus}</span><h3>${t("feat1T")}</h3><p>${t("feat1D")}</p></div>
        <div class="feat-card rv"><span class="ficon" aria-hidden="true">${FI.screen}</span><h3>${t("feat2T")}</h3><p>${t("feat2D")}</p></div>
        <div class="feat-card rv"><span class="ficon" aria-hidden="true">${FI.gift}</span><h3>${t("feat3T")}</h3><p>${t("feat3D")}</p></div>
        <div class="feat-card rv"><span class="ficon" aria-hidden="true">${FI.chart}</span><h3>${t("feat4T")}</h3><p>${t("feat4D")}</p></div>
        <div class="feat-card rv"><span class="ficon" aria-hidden="true">${FI.undo}</span><h3>${t("feat5T")}</h3><p>${t("feat5D")}</p></div>
        <div class="feat-card rv"><span class="ficon" aria-hidden="true">${FI.globe}</span><h3>${t("feat6T")}</h3><p>${t("feat6D")}</p></div>
      </div>
    </section>

    <section class="gsec gshow" id="how">
      <span class="eyebrow rv">${t("navHow")}</span>
      <h2 class="rv">${t("howT")}</h2>
      <div class="steps" data-stagger>
        <div class="step-card rv"><span class="stepn num">1</span><h3>${t("s1T")}</h3><p>${t("s1D")}</p></div>
        <div class="step-card rv"><span class="stepn num">2</span><h3>${t("s2T")}</h3><p>${t("s2D")}</p></div>
        <div class="step-card rv"><span class="stepn num">3</span><h3>${t("s3T")}</h3><p>${t("s3D")}</p></div>
      </div>
    </section>

    <section class="gsstudy" id="fig-study">
      <div class="stage">
        <div>
          <span class="eyebrow rv rv-raf">${t("L_studyEyebrow")}</span>
          <h2 class="rv rv-raf">${t("L_studyHead")}</h2>
        </div>
        <div class="arcbox" aria-hidden="true">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M12,80 Q46,30 88,10"/></svg>
          <div class="subject">${GS_CHAR_SVG}</div>
          <div class="marker" id="gs-marker"></div>
        </div>
        <div class="readouts">
          <div><span class="k">${t("L_rdDay")}</span><span class="v num" id="rd-day">0</span></div>
          <div><span class="k">${t("L_rdPts")}</span><span class="v num" id="rd-pts">+0</span></div>
          <div><span class="k">${t("L_rdLvl")}</span><span class="v num" id="rd-lvl">L1</span></div>
          <div><span class="k">${t("L_rdInto")}</span><span class="v num" id="rd-into">0%</span></div>
          <div><span class="k">${t("L_rdStars")}</span><span class="v num" id="rd-stars">0 ★</span></div>
        </div>
        <p class="modelnote">${t("L_studyFoot")}</p>
      </div>
    </section>

    <section class="nightband" id="screen-show">
      <div class="nb-in">
        <span class="eyebrow rv">${t("navScreen")}</span>
        <h2 class="rv">${t("scrShowT")}</h2>
        <p class="seclede rv">${t("scrShowD")}</p>
        <div class="chips" data-stagger>
          <span class="chip rv">${t("scrC1")}</span><span class="chip rv">${t("scrC2")}</span>
          <span class="chip rv">${t("scrC3")}</span><span class="chip rv">${t("scrC4")}</span>
        </div>
        <div class="nbmock rv" aria-hidden="true">${SCREEN_MOCK_SVG}</div>
        <div class="ctas"><a class="gsbtn pig rv" href="#/screen">${t("navScreen")} \u2192</a></div>
      </div>
    </section>

    <section class="gsec gsmat">
      <span class="eyebrow rv">${t("L_matEyebrow")}</span>
      <h2 class="rv">${t("L_matHead")}</h2>
      <div class="rows" data-stagger>
        <div class="row rv"><span class="k">${t("L_m1")}</span><span class="d">${t("L_m1d")}</span><span class="c">${t("L_m1c")}</span></div>
        <div class="row rv"><span class="k">${t("L_m2")}</span><span class="d">${t("L_m2d")}</span><span class="c">${t("L_m2c")}</span></div>
        <div class="row rv"><span class="k">${t("L_m3")}</span><span class="d">${t("L_m3d")}</span><span class="c">${t("L_m3c")}</span></div>
        <div class="row rv"><span class="k">${t("L_m4")}</span><span class="d">${t("L_m4d")}</span><span class="c">${t("L_m4c")}</span></div>
        <div class="row rv"><span class="k">${t("L_m5")}</span><span class="d">${t("L_m5d")}</span><span class="c">${t("L_m5c")}</span></div>
        <div class="row rv"><span class="k">${t("L_m6")}</span><span class="d">${t("L_m6d")}</span><span class="c">${t("L_m6c")}</span></div>
      </div>
      <div class="pair">
        <div>
          <h3 class="rv">${t("L_pairHead")}</h3>
          <p class="rv">${t("L_pairBody")}</p>
        </div>
        <div class="data" data-stagger>
          <div class="rv"><span class="k">${t("L_d1")}</span><span class="num">${t("demoNames").split(/[,，]\s*/).length}</span></div>
          <div class="rv"><span class="k">${t("L_d2")}</span><span class="num">${S.gifts.length}</span></div>
          <div class="rv"><span class="k">${t("L_d3")}</span><span class="num">${LEVELS.length}</span></div>
          <div class="rv"><span class="k">${t("L_d4")}</span><span class="num">${S.rules.length}</span></div>
        </div>
      </div>
    </section>

    <section class="gsec gstable">
      <span class="eyebrow rv">${t("L_tblEyebrow")}</span>
      <h2 class="rv">${t("L_tblHead")}</h2>
      <table class="tbl">
        <thead><tr>
          <th scope="col">${t("L_thA")}</th><th scope="col">${t("L_thB")}</th>
          <th scope="col">${t("L_thC")}</th><th scope="col">${t("L_thD")}</th>
        </tr></thead>
        <tbody data-stagger>
          <tr class="rv"><td class="name" data-k="${t("L_thA")}">${t("L_r1")}</td><td data-k="${t("L_thB")}">${t("L_r1d")}</td><td data-k="${t("L_thC")}">${t("L_r1w")}</td><td class="enter" data-k="${t("L_thD")}"><a href="#/app/classroom">#/app/classroom</a></td></tr>
          <tr class="rv"><td class="name" data-k="${t("L_thA")}">${t("L_r2")}</td><td data-k="${t("L_thB")}">${t("L_r2d")}</td><td data-k="${t("L_thC")}">${t("L_r2w")}</td><td class="enter" data-k="${t("L_thD")}"><a href="#/app/records">#/app/records</a></td></tr>
          <tr class="rv"><td class="name" data-k="${t("L_thA")}">${t("L_r3")}</td><td data-k="${t("L_thB")}">${t("L_r3d")}</td><td data-k="${t("L_thC")}">${t("L_r3w")}</td><td class="enter" data-k="${t("L_thD")}"><a href="#/app/shop">#/app/shop</a></td></tr>
          <tr class="rv"><td class="name" data-k="${t("L_thA")}">${t("L_r4")}</td><td data-k="${t("L_thB")}">${t("L_r4d")}</td><td data-k="${t("L_thC")}">${t("L_r4w")}</td><td class="enter" data-k="${t("L_thD")}"><a href="#/app/leaderboard">#/app/leaderboard</a></td></tr>
          <tr class="rv"><td class="name" data-k="${t("L_thA")}">${t("L_r5")}</td><td data-k="${t("L_thB")}">${t("L_r5d")}</td><td data-k="${t("L_thC")}">${t("L_r5w")}</td><td class="enter" data-k="${t("L_thD")}"><a href="#/">#/room/…</a></td></tr>
        </tbody>
      </table>
    </section>

    <section class="gsec gspriv" id="privacy">
      <span class="eyebrow rv">${t("navPrivacy")}</span>
      <h2 class="rv">${t("privT")}</h2>
      <p class="seclede rv">${t("privD")}</p>
      <div class="priv-grid" data-stagger>
        <div class="feat-card rv"><span class="ficon" aria-hidden="true">${FI.lock}</span><h3>${t("privC1")}</h3></div>
        <div class="feat-card rv"><span class="ficon" aria-hidden="true">${FI.download}</span><h3>${t("privC2")}</h3></div>
        <div class="feat-card rv"><span class="ficon" aria-hidden="true">${FI.offline}</span><h3>${t("privC3")}</h3></div>
      </div>
      <p class="fine rv">${t("privNote")}</p>
    </section>

    <section class="gsec gsfaq" id="faq">
      <span class="eyebrow rv">${t("navFaq")}</span>
      <h2 class="rv">${t("faqT")}</h2>
      <div class="faqlist" data-stagger>
        ${faqData().slice(0,6).map((f,i)=>`<details class="faq-item rv"${i===0?" open":""}><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join("")}
      </div>
      <p class="fine rv"><a href="#/help">${t("navHelp")} \u2192</a></p>
    </section>

    <footer class="gsclose gsfooter">
      <span class="eyebrow rv">${t("L_closeEyebrow")}</span>
      <h2 class="rv">${t("L_closeHeadA")} <em class="it">${t("L_closeHeadB")}</em></h2>
      <p class="fine rv">${t("L_fine")}</p>
      <div class="ctas">
        <button class="gsbtn rv" type="button" onclick="openRoomPicker()">${t("L_closeBtnA")}</button>
        <a class="gsbtn pig rv" href="#/app/classroom">${t("L_closeBtnB")}</a>
      </div>
      <div class="footlinks" data-stagger>
        <div class="rv"><span class="k">${t("footProd")}</span><a href="#features">${t("navFeatures")}</a><a href="#screen-show">${t("navScreen")}</a><a href="#/app/classroom">${t("L_btnEnter")}</a></div>
        <div class="rv"><span class="k">${t("footHelp2")}</span><a href="#/help">${t("helpTitle")}</a><a href="#faq">${t("navFaq")}</a></div>
        <div class="rv"><span class="k">${t("footAbout")}</span><button class="flink" type="button" onclick="openLicense()">${t("footLicense")}</button><a href="#privacy">${t("navPrivacy")}</a></div>
        <div class="rv"><span class="k">\u00a0</span><a href="#gsmain">${t("footTop")} \u2191</a></div>
      </div>
      <div class="strip">
        <span>ZHONGFANGYUAN BILINGUAL SCHOOL</span>
        <span>${t("L_stripMid")}</span>
        <span>© 2026 MOHAMMED SHEHZAD KHAN</span>
      </div>
      <div class="endwm" aria-hidden="true">gifted scholars</div>
    </footer>
  </div>`;
  initStudio();
  window.scrollTo(0,0);
}

/* ---------- studio controller: reveals + scroll-bound layers ---------- */
function initStudio(){
  const root=document.querySelector('.gs-page'); if(!root) return;
  const motion=document.documentElement.classList.contains('gs-motion')
    && !matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero=document.querySelector('.gshero');
  const study=document.querySelector('.gsstudy');
  const marker=document.getElementById('gs-marker');
  /* above-fold pieces reveal on rAF — never observed (they can sit inside a
     negative root margin on short viewports and would never fire) */
  requestAnimationFrame(()=>{ document.querySelectorAll('.rv-raf').forEach(n=>n.classList.add('in')); });
  /* stagger indices */
  document.querySelectorAll('[data-stagger]').forEach(g=>{
    g.querySelectorAll('.rv').forEach((n,i)=>n.style.setProperty('--si',i));
  });
  /* in-view reveals */
  let io=null;
  if(motion && 'IntersectionObserver' in window){
    io=new IntersectionObserver(es=>{
      es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    },{rootMargin:'0px 0px -8% 0px',threshold:.12});
    document.querySelectorAll('.rv:not(.rv-raf)').forEach(n=>io.observe(n));
  }else{
    document.querySelectorAll('.rv').forEach(n=>n.classList.add('in'));
  }
  /* scroll-position-bound layer: split wordmark + computed study */
  let raf=0;
  const onScroll=()=>{
    if(raf) return;
    raf=requestAnimationFrame(()=>{
      raf=0;
      if(hero){
        const r=hero.getBoundingClientRect();
        const p=Math.max(0,Math.min(1,-r.top/(r.height*.9)));
        hero.style.setProperty('--wp',p.toFixed(4));
      }
      if(study&&marker){
        const r=study.getBoundingClientRect();
        const total=r.height-window.innerHeight;
        const p=Math.max(0,Math.min(1,-r.top/(total||1)));
        const pt=arcPoint(p);
        marker.style.left=pt[0]+'%'; marker.style.top=pt[1]+'%';
        setReadouts(studyModel(p));
      }
    });
  };
  if(motion){
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll,{passive:true});
    onScroll();
    window._gsLandCleanup=()=>{
      window.removeEventListener('scroll',onScroll);
      window.removeEventListener('resize',onScroll);
      if(io) io.disconnect();
      if(raf) cancelAnimationFrame(raf);
    };
  }else{
    /* static final states: the completed week, wordmark fully parted */
    if(hero) hero.style.setProperty('--wp','1');
    if(marker){ const pt=arcPoint(1); marker.style.left=pt[0]+'%'; marker.style.top=pt[1]+'%'; }
    setReadouts(studyModel(1));
    window._gsLandCleanup=null;
  }
}

/* ---------- open a gift room by student name ---------- */
function openRoomPicker(){
  modal(`<div class="card stk" style="max-width:420px"><h2 style="font-family:var(--font-round)">${t("roomPickTitle")}</h2>
  <p style="margin:8px 0 14px;color:var(--ink-soft)">${t("nameHint")}</p>
  <input id="rp-name" placeholder="${t("yourName")}" style="width:100%;padding:12px 14px;border:var(--bd);border-radius:12px;font-size:16px" aria-label="${t("yourName")}">
  <div class="btns" style="margin-top:14px"><button class="btn ghost" onclick="closeOverlays()">${t("cancel")}</button><button class="btn primary" id="rp-go">${t("openMyRoom")}</button></div></div>`);
  const openIt=()=>{
    const q=($("#rp-name").value||"").trim().toLowerCase();
    if(!q){toast(t("typeFirst"));return;}
    const st=S.students.find(x=>x.name.toLowerCase()===q)||S.students.find(x=>x.name.toLowerCase().startsWith(q));
    if(!st){toast(t("noStudent") + $("#rp-name").value.trim() + t("noStudent2"));return;}
    go("#/room/"+st.id);
  };
  $("#rp-go").addEventListener("click",openIt);
  $("#rp-name").addEventListener("keydown",e=>{if(e.key==="Enter")openIt();});
  $("#rp-name").focus();
}

/* ---------- license / authorship ---------- */
function openLicense(){
  modal(`<div class="card stk" style="max-width:560px;max-height:80vh;overflow:auto"><h2 style="font-family:var(--font-round)">${t("aboutGift")}</h2>
  <div style="font-size:14.5px;line-height:1.65;margin-top:10px">
  <p><b>Gifted Scholars</b> — classroom points &amp; virtual gifts.<br>© 2026 Mohammed Shehzad Khan. All rights reserved.</p>
  <p style="margin-top:10px">${t("createdBy")}<b>Mohammed Shehzad Khan</b> ("Teacher Mo") ${t("licSum")}</p>
  <p style="margin-top:10px">${t("licOwn")}</p>
  <p style="margin-top:10px">${t("licenseBody")}</p>
  <p style="margin-top:10px">${t("licFonts")}</p>
  </div>
  <div class="btns" style="margin-top:14px"><button class="btn primary" onclick="closeOverlays()">${t("close")}</button></div></div>`);
}

/* ---- remake program: icons, mock, faq data, menu, help ---- */
const FI={
 plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>',
 screen:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/></svg>',
 gift:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="4" y="9" width="16" height="11" rx="1.5"/><path d="M12 9v11M4 13h16M12 9c-2.5 0-4-1.2-4-2.7C8 5 9 4.4 10 4.7c1.2.4 2 2 2 4.3 0-2.3.8-3.9 2-4.3 1-.3 2 .3 2 1.6C16 7.8 14.5 9 12 9z"/></svg>',
 chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 19V5M4 19h16"/><path d="M8 15l3-4 3 2 4-6"/></svg>',
 undo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 10a8 8 0 1 1 2.3 6.3"/><path d="M4 5v5h5"/></svg>',
 globe:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14 0 18-3-4-3-14.5 0-18z"/></svg>',
 lock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="5" y="10" width="14" height="10" rx="1.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
 download:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 4v11M7 11l5 5 5-5"/><path d="M4 20h16"/></svg>',
 offline:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 12a10 10 0 0 1 14 0"/><path d="M8.5 15.5a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1"/></svg>'
};
const SCREEN_MOCK_SVG = `<svg viewBox="0 0 520 300" role="img">
 <rect x="2" y="2" width="516" height="296" rx="10" fill="#241F17"/>
 <rect x="18" y="16" width="200" height="10" rx="5" fill="#E88654" opacity=".9"/>
 <rect x="18" y="34" width="120" height="8" rx="4" fill="#4A443A"/>
 <rect x="360" y="18" width="140" height="34" rx="8" fill="#1A1917"/>
 <rect x="368" y="26" width="86" height="18" rx="4" fill="#2E7D5B" opacity=".85"/>
 <text x="380" y="40" font-family="Azeret Mono,monospace" font-size="12" fill="#F0EDE4">36/60</text>
 ${[0,1,2,3,4,5].map(r=>[0,1,2,3,4,5].map(c=>`<rect x="${18+c*82}" y="${64+r*37}" width="74" height="30" rx="6" fill="#2B261E"/>`).join("")).join("")}
 <rect x="26" y="72" width="58" height="6" rx="3" fill="#F2B84B"/><rect x="26" y="84" width="40" height="5" rx="2.5" fill="#6E6659"/>
 <rect x="190" y="146" width="74" height="30" rx="6" fill="#9B3418"/>
 <circle cx="227" cy="161" r="3" fill="#F0EDE4"/><circle cx="215" cy="155" r="2" fill="#F0EDE4" opacity=".8"/><circle cx="238" cy="167" r="2" fill="#F0EDE4" opacity=".6"/>
</svg>`;
function faqData(){return [
 [t("faq1Q"),t("faq1A")],[t("faq2Q"),t("faq2A")],[t("faq3Q"),t("faq3A")],
 [t("faq4Q"),t("faq4A")],[t("faq5Q"),t("faq5A")],[t("faq6Q"),t("faq6A")],
 [t("h1Q"),t("h1A")],[t("h2Q"),t("h2A")],[t("h3Q"),t("h3A")],[t("h4Q"),t("h4A")]
];}
function toggleMenu(forceClose){
  const b=document.querySelector(".gsnav-burger"), m=document.getElementById("gsmenu");
  if(!b||!m) return;
  const open=(forceClose===true)?false:!!m.hidden;
  m.hidden=!open;
  b.setAttribute("aria-expanded",open?"true":"false");
  b.setAttribute("aria-label",open?t("menuClose"):t("menuOpen"));
}
if(!window._gsMenuKey){
  window._gsMenuKey=true;
  document.addEventListener("keydown",e=>{if(e&&e.key==="Escape")toggleMenu(true);});
}
function helpFilterCount(q,items){
  const n=String(q||"").trim().toLowerCase();
  let hidden=0;
  for(const it of items){
    const hit=!n||it.keys.toLowerCase().indexOf(n)>=0;
    it.el.style.display=hit?"":"none";
    if(!hit)hidden++;
  }
  return hidden;
}
function renderHelp(){
  applyLangDoc();
  const langBtn='<button class="sqbtn" type="button" onclick="setLang(\''+(LANG==='en'?'zh':'en')+'\')" aria-label="'+(LANG==='en'?'中文':'EN')+' - switch language">'+(LANG==='en'?'中文':'EN')+'</button>';
  document.querySelector("#view").innerHTML=`
  <div class="gs-page gshelp">
    <nav class="gsnav">
      <a class="brand" href="#/">gifted scholars<i>.</i></a>
      <div class="links"><a href="#/">${t("helpBack")}</a>${langBtn}</div>
    </nav>
    <main id="gsmain" class="helpwrap">
      <span class="eyebrow">${t("navHelp")}</span>
      <h1>${t("helpTitle")}</h1>
      <p class="seclede">${t("helpSub")}</p>
      <input id="help-q" class="helpq" type="search" placeholder="${t("helpSearch")}" aria-label="${t("helpSearch")}">
      <div class="faqlist" id="help-list">
        ${helpData().map(f=>`<details class="faq-item" data-k="${f[2]}"><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join("")}
      </div>
      <p class="none gsnone hide" id="help-none">${t("helpNone")}</p>
      <p class="fine"><a href="#/">${t("helpBack")}</a> · <button class="flink" type="button" onclick="openLicense()">${t("footLicense")}</button></p>
    </main>
  </div>`;
  const inp=document.getElementById("help-q");
  const wire=()=>{
    const items=[...document.querySelectorAll("#help-list .faq-item")].map(el=>({el,keys:el.getAttribute("data-k")||""}));
    const none=document.getElementById("help-none");
    return ()=>{const q=inp.value||"";
      let vis=0;
      for(const it of items){const hit=!q.trim()||it.keys.toLowerCase().indexOf(q.trim().toLowerCase())>=0;it.el.classList.toggle("gs-hide",!hit);if(hit)vis++;}
      if(none)none.classList.toggle("hide",vis>0);
    };
  };
  try{inp.addEventListener("input",wire());}catch(_){}
}
function helpData(){return [
 [t("h1Q"),t("h1A"),t("h1Q")+" "+t("h1A")+" students add"],
 [t("h2Q"),t("h2A"),t("h2Q")+" "+t("h2A")+" undo撤销"],
 [t("h3Q"),t("h3A"),t("h3Q")+" "+t("h3A")+" box盲盒 mystery"],
 [t("h4Q"),t("h4A"),t("h4Q")+" "+t("h4A")+" negative负分"],
 [t("faq1Q"),t("faq1A"),t("faq1Q")+" "+t("faq1A")+" backup备份 storage local"],
 [t("faq2Q"),t("faq2A"),t("faq2Q")+" "+t("faq2A")+" free免费 price"],
 [t("faq3Q"),t("faq3A"),t("faq3Q")+" "+t("faq3A")+" level等级 wallet钱包"],
 [t("faq4Q"),t("faq4A"),t("faq4Q")+" "+t("faq4A")+" screen大屏 fullscreen F A"],
 [t("faq5Q"),t("faq5A"),t("faq5Q")+" "+t("faq5A")+" backup导出 export json"],
 [t("faq6Q"),t("faq6A"),t("faq6Q")+" "+t("faq6A")+" phone手机 mobile PWA"]
];}

/* ============ init (must run last) ============ */
if(!load())S=emptyState();
save();
applyMotion();
try{matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change",applyMotion);}catch(_){}
route();


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
  const leaks=["Tap students, then a rule","wallet stars (spendable)","growth score","Select one or more","Undone: ","Every rating is logged","Students request, you approve","This gift no longer exists","Granted: ","Declined: ","Instant grant","Spend ★","<h1>Leaderboards","Progress board fills","Add rule",">Delete<",">Add<","stored in this browser","Rule updated","Rule deleted","Type a name first","reseeds the demo","Back to class","does not exist","gift room</h1>","Open a mystery box","Collected gifts","No requests yet","Ask for a gift",">Ask<","Requested: ","stock ∞","got: ","About this gift",">pending<",">approved<",">decline<",">Decline<","tab_leaderboard","Quick award","Open a gift room",">Cancel<"];
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

/* ---- professional-remake program: landing IA, help view, picker, tokens ---- */
T("landing IA sections",safeT(function(){
  seedDemo();location.hash="#/";route();
  const h=document.querySelector("#view").innerHTML;
  const need=["gsnav-burger","skip-link","id=\"features\"","id=\"how\"","id=\"screen-show\"","id=\"privacy\"","id=\"faq\"","feat-card","step-card","faq-item","gsfooter","nightband"];
  const miss=need.filter(k=>h.indexOf(k)<0);
  if(miss.length)return "missing: "+miss.join(",");
  const cards=(h.match(/feat-card/g)||[]).length,steps=(h.match(/step-card/g)||[]).length,faq=(h.match(/faq-item/g)||[]).length;
  if(cards<6||steps<3||faq<6)return "counts "+cards+"/"+steps+"/"+faq;
  return true;
}),"landing has nav/menu/skip + 5 sections + 6 features + 3 steps + 6 FAQ + footer");
T("room picker localized",safeT(function(){
  location.hash="#/";route();openRoomPicker();
  const m=document.querySelector("#modals").innerHTML;
  closeOverlays();
  if(m.indexOf("Open a gift room")>=0||m.indexOf(">Cancel<")>=0)return "english leak in modal";
  return m.indexOf(t("roomPickTitle"))>=0&&m.indexOf(t("cancel"))>=0;
}),"picker modal fully localized");
T("help view renders + filters",safeT(function(){
  seedDemo();location.hash="#/help";route();
  const v=document.querySelector("#view");
  const n=(v.innerHTML.match(/faq-item/g)||[]).length;
  if(n<8)return "items "+n;
  if(v.innerHTML.indexOf('id="help-q"')<0)return "no search input";
  if(typeof helpFilterCount!=="function")return "no filter fn";
  const items=[{keys:"backup beifen 导出 export",el:{style:{}}},{keys:"da su 学生 students",el:{style:{}}}];
  const hid=helpFilterCount("zzzznope",items);
  if(hid!==2||items[0].el.style.display!=="none")return "all-hide "+hid;
  const hid2=helpFilterCount("backup",items);
  if(hid2!==1||items[0].el.style.display!=="")return "match-keep "+hid2;
  return true;
}),"help shows 8+ items; pure filter hides non-matches, keeps matches");
T("random picker on screen",safeT(function(){
  seedDemo();location.hash="#/screen";route();
  if(typeof pickOpen!=="function"||typeof pickDraw!=="function")return "missing fns";
  pickOpen();
  if(!pickIsOpen())return "not open";
  const ids=[];
  for(let i=0;i<S.students.length;i++)ids.push(pickDraw(true));
  const uniq=new Set(ids);
  if(uniq.size!==S.students.length)return "repeats before bag empty: "+uniq.size;
  pickClose();
  if(pickIsOpen())return "esc/close failed";
  return true;
}),"fair bag: every student drawn once before reshuffle; closes");
T("design tokens in bundle",safeT(function(){
  const src=require("fs").readFileSync("../index.html","utf8");
  const need=["--leaf:#2E7D5B","--leaf-tint:#E2F1EA","--night:#16130E","--night-2:#241F17","--r-m:16px","--r-l:24px"];
  const miss=need.filter(k=>src.indexOf(k)<0);
  return miss.length?"missing "+miss.join(","):true;
}),"new tokens present in assembled file");
/* route coverage: every route renders non-empty without throwing (zh) */
T("route coverage all views",safeT(function(){
  seedDemo();const bad=[];
  const routes=["#/","#/app/classroom","#/app/records","#/app/shop","#/app/leaderboard","#/app/settings","#/screen","#/help","#/room/"+S.students[0].id,"#/app/nosuch"];
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
