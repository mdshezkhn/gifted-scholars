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
  seedDemo();location.hash="#/screen";route();
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
