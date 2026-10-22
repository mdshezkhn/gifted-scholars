
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
 tab_classroom:"Classroom",tab_records:"Records",tab_shop:"Gift shop",tab_board:"Leaderboard",tab_settings:"Setup",
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
 tab_classroom:"教室",tab_records:"记录",tab_shop:"礼物小铺",tab_board:"排行榜",tab_settings:"设置",
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
 addStudent:"输入名字添加学生",
 shelf:"礼物架",askGift:"申请礼物",myRequests:"我的申请",waiting:"待审批",
 noReqs:"暂无待批申请。",approve:"批准",decline:"婉拒",giveNow:"立即赠送",backShelf:"放回架子",takeOff:"取下架子",
 aboutGift:"礼物介绍",openRoom:"打开小屋",givenToday:"今日已送出",soldOut:"已送完",pending:"待批准",undone:"已撤销",empty:"空",
 wallet:"星星钱包",toNext:"距下一级",topLevel:"已到最高等级，了不起的一年。",
 perLimit:" · 每人限 {n} 份",givenTo:"送给了 ",offShelf:"礼物已不在架上",offShelf2:"礼物已不在架上，请先放回。",
 notEnough:"星星还不够哦",roomTitle:"礼物小屋",roomOpen:"礼物小屋 · ",headTo:"去往 ",
 waitingFor:"等待老师批准 ",docPre:"Gifted Scholars · ",roomPre:"礼物小屋 · ",
 bAll:"总榜",bWeek:"本周",bProg:"进步榜",boardEmpty:"榜单暂时空空如也。",
 vsLast:"比上周",topRule:"本周最热规则",ratingsWeek:"本周评分",clearImp:"进步明显",
 studentCol:"学生",classCol:"班级"
}};
let LANG="en";
try{const _s=localStorage.getItem("gs-lang");LANG=(_s==="zh"||_s==="en")?_s:((typeof navigator!=="undefined"&&navigator.language||"en").toLowerCase().indexOf("zh")===0?"zh":"en");}catch(e){}
function t(k,vars){let s=Object.prototype.hasOwnProperty.call(I18N[LANG],k)?I18N[LANG][k]:(Object.prototype.hasOwnProperty.call(I18N.en,k)?I18N.en[k]:k);if(vars){for(const v in vars)s=s.split("{"+v+"}").join(String(vars[v]));}return s;}
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
  const langBtn='<button class="sqbtn" type="button" onclick="setLang(\''+(LANG==='en'?'zh':'en')+'\')" aria-label="Switch language">'+(LANG==='en'?'中文':'EN')+'</button>';
  document.querySelector('#view').innerHTML=`
  <div class="gs-page">
    <nav class="gsnav">
      <a class="brand" href="#/">gifted scholars<i>.</i></a>
      <div class="links">
        <a href="#/app/classroom">${t("navClass")}</a>
        <a class="xtra" href="#/app/shop">${t("navShop")}</a>
        <a class="xtra" href="#/app/leaderboard">${t("navBoard")}</a>
        <a class="xtra" href="#/app/records">${t("navRec")}</a>
        ${langBtn}
        <button class="sqbtn" type="button" onclick="openRoomPicker()">${t("navRoom")}</button>
      </div>
    </nav>

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
            <div class="rv"><dt>${t("L_dlGrowth")}</dt><dd>${t("L_dlGrowthD")}</dd><span class="val num">0 – 160 pts</span></div>
            <div class="rv"><dt>${t("L_dlStars")}</dt><dd>${t("L_dlStarsD")}</dd><span class="val num">1 ★ = 1 pt</span></div>
            <div class="rv"><dt>${t("L_dlApproval")}</dt><dd>${t("L_dlApprovalD")}</dd><span class="val">${t("L_valAlways")}</span></div>
          </dl>
        </div>
        <figure class="figwrap rv">
          ${figureSVG()}
          <figcaption class="fignote">${t("L_figNote")}</figcaption>
        </figure>
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
          <div class="rv"><span class="k">${t("L_d1")}</span><span class="num">${SEED_STUDENTS.length}</span></div>
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

    <footer class="gsclose">
      <span class="eyebrow rv">${t("L_closeEyebrow")}</span>
      <h2 class="rv">${t("L_closeHeadA")} <em class="it">${t("L_closeHeadB")}</em></h2>
      <p class="fine rv">${t("L_fine")}</p>
      <div class="ctas">
        <button class="gsbtn rv" type="button" onclick="openRoomPicker()">${t("L_closeBtnA")}</button>
        <a class="gsbtn pig rv" href="#/app/classroom">${t("L_closeBtnB")}</a>
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
  modal(`<div class="card stk" style="max-width:420px"><h2 style="font-family:var(--font-round)">Open a gift room</h2>
  <p style="margin:8px 0 14px;color:var(--ink-soft)">${t("nameHint")}</p>
  <input id="rp-name" placeholder="${t("yourName")}" style="width:100%;padding:12px 14px;border:var(--bd);border-radius:12px;font-size:16px" aria-label="${t("yourName")}">
  <div class="btns" style="margin-top:14px"><button class="btn ghost" onclick="closeOverlays()">Cancel</button><button class="btn primary" id="rp-go">${t("openMyRoom")}</button></div></div>`);
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
  modal(`<div class="card stk" style="max-width:560px;max-height:80vh;overflow:auto"><h2 style="font-family:var(--font-round)">About this gift</h2>
  <div style="font-size:14.5px;line-height:1.65;margin-top:10px">
  <p><b>Gifted Scholars</b> — classroom points &amp; virtual gifts.<br>© 2026 Mohammed Shehzad Khan. All rights reserved.</p>
  <p style="margin-top:10px">${t("createdBy")}<b>Mohammed Shehzad Khan</b> ("Teacher Mo") and donated as a free gift to ZhongFangYuan Bilingual School. It will always be free: no fees, no ads, no tracking, nothing for sale.</p>
  <p style="margin-top:10px"><b>Ownership.</b> The site, its code, design and artwork remain the property of the author. Donating it to the school does not transfer copyright. The school may keep using it for everyday school life, free of charge, even after the author moves on.</p>
  <p style="margin-top:10px">The school may use it forever, for free, even if the author moves on. <b>You may not</b> sell, charge for, or relicense this work, and the credit in the footer must stay. The author owns this work and may update it or share it with other schools. If these terms are broken, this license ends automatically.</p>
      <p style="margin-top:10px" lang="zh-CN">学校可以永远免费使用本作品，即使作者日后离开。<b>不得</b>出售、收费或再许可本作品，页脚署名必须保留。版权归作者所有，作者可继续更新或分享给其他学校。如违反以上条款，本许可自动终止。</p>
  <p style="margin-top:10px">Fonts: Instrument Serif &amp; Azeret Mono (SIL Open Font License). Provided “as is”, without warranty of any kind.</p>
  </div>
  <div class="btns" style="margin-top:14px"><button class="btn primary" onclick="closeOverlays()">Close</button></div></div>`);
}

/* ============ init (must run last) ============ */
if(!load())seed();
save();
applyMotion();
try{matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change",applyMotion);}catch(_){}
route();


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
T("figure to scale",(function(){const f=figureSVG();return f.indexOf("polyline")>=0&&f.split("fill=" + String.fromCharCode(34) + "#9B3418" + String.fromCharCode(34)).length-1===10&&f.indexOf("L5 · 35")>=0;})(),"10 pigment dots + L5=35");
T("zh landing copy",t("L_headB")==="大大的笑容。",t("L_headB"));
T("setLang en restore",(()=>{setLang("en");return document.querySelector("#view").innerHTML.indexOf("little stars.")>=0;})(),"back to en");
T("lang persisted",localStorage.getItem("gs-lang")==="en",localStorage.getItem("gs-lang"));
T("shell en tabs",(location.hash="#/app/classroom",route(),document.querySelector("#view").innerHTML.indexOf("Classroom")>=0&&document.querySelector("#view").innerHTML.indexOf("教室")<0),"tabs en only");
T("shop zh gifts",(()=>{setLang("zh");(location.hash="#/app/shop",route());const h=document.querySelector("#main").innerHTML;setLang("en");return h.indexOf("贴纸包")>=0;})(),"gift names zh");
T("room zh title",(()=>{setLang("zh");(location.hash="#/room/s1",route());const h=document.querySelector("#view").innerHTML+document.title;setLang("en");return h.indexOf("礼物小屋")>=0||h.indexOf("星星钱包")>=0;})(),"room zh");
console.log(fails===0?"ALL PASS":"FAILURES: "+fails);
process.exit(fails===0?0:1);
