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
